import type { APIRequestContext } from "@playwright/test";
import { ApiHelper } from "./api-helper";

/**
 * Strapi REST query parameters in bracket notation, e.g.
 * `{ "filters[slug][$eq]": "home", populate: "*", locale: "en" }`.
 */
export type StrapiQuery = Record<string, string>;

/** A Strapi entry with the system fields present in both v4 and v5 responses. */
export type StrapiEntry<T> = T & { id: number; documentId?: string };

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface StrapiCollectionResult<T> {
  entries: StrapiEntry<T>[];
  pagination: StrapiPagination | undefined;
}

const MAX_PAGE_SIZE = "100";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Flattens Strapi v4's `{ id, attributes }` shape so callers see the v5 shape either way. */
function normaliseEntry<T>(raw: unknown): StrapiEntry<T> {
  if (!isRecord(raw) || typeof raw.id !== "number") {
    throw new Error(`Unexpected Strapi entry: ${JSON.stringify(raw)}`);
  }
  const { attributes, ...rest } = raw;
  return (isRecord(attributes) ? { ...rest, ...attributes } : raw) as StrapiEntry<T>;
}

function readPagination(meta: unknown): StrapiPagination | undefined {
  if (!isRecord(meta) || !isRecord(meta.pagination)) return undefined;
  return meta.pagination as unknown as StrapiPagination;
}

/**
 * Reads content from the Strapi Content API (`/api/...`) so tests can compare
 * what the CMS publishes with what the Allwyn site renders.
 */
export class StrapiClient {
  private readonly api: ApiHelper;
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext, strapiUrl: string, token?: string) {
    this.request = request;
    this.api = new ApiHelper(strapiUrl, token);
  }

  /** Fetches a single page of a collection type, e.g. `getCollection("articles")`. */
  async getCollection<T>(pluralApiId: string, query: StrapiQuery = {}): Promise<StrapiCollectionResult<T>> {
    const body = await this.getContent(`/api/${pluralApiId}`, query);
    if (!Array.isArray(body.data)) {
      throw new Error(`Expected an array from /api/${pluralApiId}; is "${pluralApiId}" a single type?`);
    }
    return { entries: body.data.map((entry) => normaliseEntry<T>(entry)), pagination: readPagination(body.meta) };
  }

  /** Fetches every entry of a collection type, following Strapi pagination. */
  async getAllEntries<T>(pluralApiId: string, query: StrapiQuery = {}): Promise<StrapiEntry<T>[]> {
    const entries: StrapiEntry<T>[] = [];
    let page = 1;
    let pageCount: number;
    do {
      const result = await this.getCollection<T>(pluralApiId, {
        "pagination[pageSize]": MAX_PAGE_SIZE,
        ...query,
        "pagination[page]": String(page),
      });
      entries.push(...result.entries);
      pageCount = result.pagination?.pageCount ?? 1;
      page++;
    } while (page <= pageCount);
    return entries;
  }

  /** Fetches the first entry matching a field value, e.g. `findOne("pages", "slug", "home")`. */
  async findOne<T>(
    pluralApiId: string,
    field: string,
    value: string,
    query: StrapiQuery = {},
  ): Promise<StrapiEntry<T> | undefined> {
    const { entries } = await this.getCollection<T>(pluralApiId, {
      ...query,
      [`filters[${field}][$eq]`]: value,
      "pagination[pageSize]": "1",
    });
    return entries[0];
  }

  /** Fetches a single type, e.g. `getSingleType("global", { populate: "*" })`. */
  async getSingleType<T>(singularApiId: string, query: StrapiQuery = {}): Promise<StrapiEntry<T>> {
    const body = await this.getContent(`/api/${singularApiId}`, query);
    return normaliseEntry<T>(body.data);
  }

  private async getContent(endpoint: string, query: StrapiQuery): Promise<Record<string, unknown>> {
    const response = await this.api.get(this.request, endpoint, { params: query });
    if (!response.ok()) {
      throw new Error(`Strapi GET ${endpoint} failed with HTTP ${response.status()}: ${await response.text()}`);
    }
    const body: unknown = await response.json();
    if (!isRecord(body) || !("data" in body)) {
      throw new Error(`Unexpected Strapi response from ${endpoint}: ${JSON.stringify(body)}`);
    }
    return body;
  }
}
