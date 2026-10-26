import { DOCUMENT_LISTING_PAGES } from "../../../testdata/templates";
import type { CmsDocumentRecord, CmsHeader } from "../../../utilities/cms-types";
import { expectNoRawMarkup, expectSingleHeading, present } from "../../../utilities/page-checks";
import { normaliseText } from "../../../utilities/text";
import { expect, test } from "../../fixtures";

// Investor document listings (E-015: ALW-200, ALW-244, ALW-247): the archive is shown complete.
test.describe.configure({ mode: "parallel" });

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/** Every document a record links to: CMS files (`file`, `file_*`) and external links (`url_*`). */
function documentUrls(record: CmsDocumentRecord): string[] {
  return Object.entries(record).flatMap(([field, value]) => {
    if (/^file(_|$)/.test(field) && isRecord(value) && typeof value.url === "string") return [value.url];
    if (field.startsWith("url_") && typeof value === "string" && value !== "") return [value];
    return [];
  });
}

/** Dates in page order for ordered listings; as a sorted set where order is not specified. */
function comparableDates(dates: readonly string[], ordered: boolean): string[] {
  return ordered ? [...dates] : [...dates].sort();
}

function groupHeading(record: CmsDocumentRecord, groupField: string): string[] {
  const group = record[groupField];
  return isRecord(group) && typeof group.heading === "string" ? [group.heading] : [];
}

for (const listing of DOCUMENT_LISTING_PAGES) {
  test(`documents ${listing.path}`, { tag: ["@regression", "@cms"] }, async ({ poManager, cmsResolver, strapi }) => {
    const { simple_header } = await cmsResolver.require<{ simple_header?: CmsHeader | null }>(listing.path);
    const records = await strapi.getAllEntries<CmsDocumentRecord>(listing.collection, {
      sort: "date:desc",
      populate: "*",
    });
    const page = poManager.getContentPage(listing.path);

    const response = await page.open();

    expect(response?.status()).toBe(200);
    await expectSingleHeading(page.page);
    for (const heading of present(simple_header?.title?.heading)) {
      await expect.soft(page.heading, "CMS header heading (ALW-270)").toHaveText(normaliseText(heading));
    }

    // Every record is listed exactly once: one <time> per record, carrying its CMS date.
    const shownDates = await page.main
      .locator("time")
      .evaluateAll((times) => times.map((time) => time.getAttribute("datetime") ?? ""));
    const cmsDates = records.flatMap((record) => present(record.date));
    expect(shownDates, "one dated entry per CMS record").toHaveLength(cmsDates.length);
    expect(comparableDates(shownDates, listing.ordered), "record dates (newest first where ordered)").toEqual(
      comparableDates(cmsDates, listing.ordered),
    );

    // Each record's heading and every document it links to are on the page (reported as one list each).
    const pageText = normaliseText(await page.main.innerText());
    const pageLinks = new Set(
      await page.main.locator("a[href]").evaluateAll((links) => links.map((link) => link.getAttribute("href") ?? "")),
    );
    const missingHeadings = records
      .flatMap((record) => present(record.heading).map(normaliseText))
      .filter((heading) => !pageText.includes(heading));
    const missingDocuments = records.flatMap((record) =>
      documentUrls(record)
        .filter((url) => !pageLinks.has(url))
        .map((url) => `${normaliseText(record.heading)}: ${url}`),
    );
    expect.soft(missingHeadings, "record headings not shown").toEqual([]);
    expect.soft(missingDocuments, "record documents not linked").toEqual([]);
    const missingGroups = [...new Set(records.flatMap((record) => groupHeading(record, listing.groupField ?? "")))]
      .map(normaliseText)
      .filter((heading) => !pageText.includes(heading));
    expect.soft(missingGroups, "group headings not shown (ALW-247)").toEqual([]);
    await expectNoRawMarkup(page.main);
  });
}
