import type { Locator } from "@playwright/test";
import { plainText } from "./page-checks";

/** What a CMS module puts on the page: its texts, link targets, image/file names and dates. */
export interface ModuleContent {
  texts: string[];
  links: string[];
  media: string[];
  dates: string[];
}

// Bookkeeping, styling and layout settings: configuration, not content.
const SKIPPED_KEY =
  /^(__component|id|documentId|createdAt|updatedAt|publishedAt|locale|localizations|slug|variant|align|text_size|size|type|target|layout|priority|order|items_on_row|batch_size|display_images|bg_color|fg_color)$|_color$|^youtube_|_position_|^(listing_|private_)/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}(T[\d:.]+Z)?$/;
const LINK = /^(https?:\/\/|\/|mailto:|tel:)/;
const TOKEN = /^#?[0-9a-f]{3,8}$|^[a-z0-9_.:-]+$/;
const TEXT_PREFIX_LENGTH = 60;

/** Letters and digits only: rendering may add or drop spaces, punctuation and table separators. */
function comparable(value: string): string {
  return plainText(value)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "");
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function collect(value: unknown, content: ModuleContent, ignore: readonly string[]): void {
  if (Array.isArray(value)) {
    value.forEach((item) => {
      collect(item, content, ignore);
    });
    return;
  }
  if (isObject(value)) {
    if (typeof value.url === "string" && typeof value.mime === "string") {
      // Match on the file's base name, so resized variants and image-proxy URLs count.
      const baseName = (value.url.split("/").pop() ?? "").replace(/\.[a-z0-9]+$/i, "");
      if (baseName !== "") content.media.push(baseName);
      return;
    }
    if (typeof value.documentId === "string") return; // a related entry of another type has its own page
    for (const [key, field] of Object.entries(value)) {
      if (!SKIPPED_KEY.test(key) && !ignore.includes(key)) collect(field, content, ignore);
    }
    return;
  }
  if (typeof value !== "string" || value.trim() === "") return;
  const text = value.trim();
  if (ISO_DATE.test(text)) content.dates.push(text);
  else if (LINK.test(text)) content.links.push(text.replace(/\/$/, ""));
  else if (/[\p{L}\p{N}]/u.test(text) && !TOKEN.test(text)) {
    const searchable = comparable(text).slice(0, TEXT_PREFIX_LENGTH);
    if (searchable !== "") content.texts.push(searchable);
  }
}

/** Everything a module's own CMS fields put on the page (related entries, settings and `ignore` excluded). */
export function moduleContent(module: unknown, ignore: readonly string[] = []): ModuleContent {
  const content: ModuleContent = { texts: [], links: [], media: [], dates: [] };
  collect(module, content, ignore);
  return content;
}

/** The parts of `content` missing from the rendered component, one line each. */
export async function missingContent(component: Locator, content: ModuleContent): Promise<string[]> {
  return component.evaluate((element, expected) => {
    // textContent (so inactive carousel slides count) plus alt/aria-label/title, which carry logo names.
    const attributes = [...element.querySelectorAll("[alt], [aria-label], [title]")].map((node) =>
      ["alt", "aria-label", "title"].map((name) => node.getAttribute(name) ?? "").join(" "),
    );
    const text = [element.textContent, ...attributes]
      .join(" ")
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, "");
    const hrefs = [...element.querySelectorAll("a[href]")].map((anchor) => {
      const href = anchor.getAttribute("href") ?? "";
      return href.replace(/\/$/, "");
    });
    const absolute = [...element.querySelectorAll("a[href]")].map((anchor) =>
      (anchor as HTMLAnchorElement).href.replace(/\/$/, ""),
    );
    const html = element.innerHTML;
    const dates = [...element.querySelectorAll("time")].map((time) => time.getAttribute("datetime") ?? "");
    return [
      ...expected.texts.filter((part) => !text.includes(part)).map((part) => `text ${part}`),
      ...expected.links
        .filter((link) => !hrefs.includes(link) && !absolute.includes(link))
        .map((link) => `link ${link}`),
      ...expected.media.filter((name) => !html.includes(name)).map((name) => `image or file ${name}`),
      ...expected.dates.filter((date) => !dates.includes(date)).map((date) => `date ${date}`),
    ];
  }, content);
}
