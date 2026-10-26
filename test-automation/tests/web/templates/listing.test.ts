import { LISTING_PAGES } from "../../../testdata/templates";
import type { CmsHeader, CmsListingItem } from "../../../utilities/cms-types";
import { expectNoRawMarkup, expectSingleHeading, present } from "../../../utilities/page-checks";
import { normaliseText } from "../../../utilities/text";
import { expect, test } from "../../fixtures";

// Listing template (E-015: ALW-176, ALW-198, ALW-199, ALW-200, ALW-201, ALW-246, ALW-270).
test.describe.configure({ mode: "parallel" });

type Listing = (typeof LISTING_PAGES)[number];

/** Links of the listed items: to the item's detail page under the listing path, or to its file. */
function itemLinkSelector(listing: Listing): string {
  return listing.items === "detail" ? `a[href^="${listing.path}/"]` : 'a[href^="https://cdn.allwyn.com/"]';
}

function itemTarget(listing: Listing, item: CmsListingItem): string | undefined {
  return listing.items === "detail" ? `${listing.path}/${item.slug ?? ""}` : item.file?.url;
}

for (const listing of LISTING_PAGES) {
  test(`listing ${listing.path}`, { tag: ["@regression", "@cms"] }, async ({ poManager, cmsResolver, strapi }) => {
    const { simple_header } = await cmsResolver.require<{ simple_header?: CmsHeader | null }>(listing.path);
    const { entries } = await strapi.getCollection<CmsListingItem>(listing.collection, {
      sort: listing.sort,
      populate: "*",
      "pagination[pageSize]": "100",
    });
    const page = poManager.getContentPage(listing.path);

    const response = await page.open();

    expect(response?.status()).toBe(200);
    // ALW-270: the CMS header's heading and intro are shown (soft, so the item checks below still run).
    await expectSingleHeading(page.page);
    for (const heading of present(simple_header?.title?.heading)) {
      await expect.soft(page.heading, "CMS header heading (ALW-270)").toHaveText(normaliseText(heading));
    }
    // The first page lists the collection's first items, in the specified order, each linking to its page or file.
    const itemLinks = page.main.locator(itemLinkSelector(listing));
    const shown = [...new Set(await itemLinks.evaluateAll((links) => links.map((link) => link.getAttribute("href"))))];
    expect(shown.length, "listing should show items").toBeGreaterThan(0);
    const expected = entries.slice(0, shown.length).map((item) => itemTarget(listing, item));
    expect(shown).toEqual(expected);
    for (const item of entries.slice(0, shown.length)) {
      await expect.soft(page.main).toContainText(normaliseText(item.title ?? item.heading ?? ""));
    }
    await expectNoRawMarkup(page.main);
  });
}
