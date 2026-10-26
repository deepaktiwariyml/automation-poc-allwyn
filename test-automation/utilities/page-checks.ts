import { expect, type Locator, type Page } from "@playwright/test";
import { normaliseText } from "./text";

/** Values that a template should render: present and not just whitespace. */
export function present<T>(value: T | null | undefined): T[] {
  if (value === null || value === undefined) return [];
  if (typeof value === "string" && value.trim() === "") return [];
  return [value];
}

/** Markdown/HTML stripped to the plain text a reader sees, for comparing rich-text fields. */
export function plainText(markdown: string): string {
  return normaliseText(
    markdown
      .replace(/<[^>]+>/g, " ")
      .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/^#+\s*/gm, "")
      .replace(/[*_`>]+/g, ""),
  );
}

/** First paragraph of a rich-text field, as rendered text. */
export function firstParagraph(markdown: string): string {
  const paragraph = markdown.split(/\n\s*\n/).find((block) => plainText(block) !== "") ?? "";
  return plainText(paragraph);
}

/** A page has exactly one `<h1>` and, when given, it reads `heading` (ALW-129, ALW-194, ALW-211). */
export async function expectSingleHeading(page: Page, heading?: string): Promise<void> {
  const headings = page.locator("h1");
  await expect(headings, "page should have exactly one <h1>").toHaveCount(1);
  for (const text of present(heading)) {
    await expect(headings).toHaveText(normaliseText(text));
  }
}

/** Rich text is rendered, not shown as raw Markdown or escaped HTML (ALW-303, ALW-306). */
export async function expectNoRawMarkup(region: Locator): Promise<void> {
  const text = await region.innerText();
  expect(text, "rendered text should not contain raw Markdown or HTML").not.toMatch(
    /\*\*\S|\]\(https?:\/\/|<\/?(sup|br|p|strong)>/i,
  );
}

/** A CMS date is rendered as a `<time>` element carrying the CMS value (ALW-112). */
export async function expectDate(region: Locator, date: string): Promise<void> {
  await expect(region.locator(`time[datetime="${date}"]`).first(), `date ${date}`).toBeVisible();
}
