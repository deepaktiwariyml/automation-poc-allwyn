import { LEGAL_PAGES } from "../../../testdata/templates";
import type { CmsComplianceEntry } from "../../../utilities/cms-types";
import { expectNoRawMarkup, expectSingleHeading, firstParagraph } from "../../../utilities/page-checks";
import { expect, test } from "../../fixtures";

// Legal pages: `compliances` entries rendered with the detail template (ALW-248).
for (const path of LEGAL_PAGES) {
  test(`legal ${path}`, { tag: ["@regression", "@cms"] }, async ({ poManager, cmsResolver }) => {
    const legal = await cmsResolver.require<CmsComplianceEntry>(path);
    const page = poManager.getContentPage(path);

    const response = await page.open();

    expect(response?.status()).toBe(200);
    await expectSingleHeading(page.page, legal.heading);
    await expect(page.page).toHaveTitle(`${legal.heading} | Allwyn`);
    await expect(page.main).toContainText(firstParagraph(legal.content));
    await expectNoRawMarkup(page.main);
  });
}
