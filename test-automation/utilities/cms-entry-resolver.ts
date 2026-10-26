import { COLLECTION_ROUTES, SINGLE_TYPE_ROUTES } from "../configs/cms-content";
import type { StrapiClient, StrapiQuery } from "./strapi-client";

export interface CmsEntry {
  /** Strapi API ID, e.g. "articles" or "home-page". */
  type: string;
  data: Record<string, unknown>;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/** Finds the Strapi entry behind a site page: by route for single types, by section + slug for collections. */
export class CmsEntryResolver {
  constructor(private readonly strapi: StrapiClient) {}

  /**
   * Like `resolve`, but fails with a readable message when the page has no published entry.
   * `T` declares the fields the caller reads; Strapi responses are not validated beyond that.
   */
  async require<T = Record<string, unknown>>(path: string): Promise<T> {
    const entry = await this.resolve(path);
    if (entry === undefined) throw new Error(`No published CMS entry found for ${path}`);
    return entry.data as T;
  }

  async resolve(path: string): Promise<CmsEntry | undefined> {
    const singleType = SINGLE_TYPE_ROUTES[path];
    if (singleType !== undefined) {
      const data = await this.fetchWithNestedContent((query) => this.strapi.getSingleType(singleType, query));
      return data === undefined ? undefined : { type: singleType, data };
    }

    const slugStart = path.lastIndexOf("/");
    const collection = COLLECTION_ROUTES[path.slice(0, slugStart)];
    if (collection === undefined) return undefined;
    const slug = path.slice(slugStart + 1);
    const data = await this.fetchWithNestedContent((query) => this.strapi.findOne(collection, "slug", slug, query));
    return data === undefined ? undefined : { type: collection, data };
  }

  /**
   * `populate=*` only loads one level, so the first request discovers the entry's
   * components/media/relations and the second loads each of them one level deeper.
   */
  private async fetchWithNestedContent(
    load: (query: StrapiQuery) => Promise<Record<string, unknown> | undefined>,
  ): Promise<Record<string, unknown> | undefined> {
    const shallow = await load({ populate: "*" });
    if (shallow === undefined) return undefined;
    const nested = Object.keys(shallow).filter((key) => key !== "localizations" && isObject(shallow[key]));
    return load(Object.fromEntries(nested.map((key) => [`populate[${key}][populate]`, "*"])));
  }
}
