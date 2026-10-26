import { requireEnv } from "../../configs/environment";
import { ALL_PAGES } from "../../testdata/templates";
import { auditPage, recordNetwork } from "../../utilities/page-audit";
import { expect, test } from "../fixtures";

// Checks every page gets (Allwyn-staging-FE-test-scope.xlsx, sheet 1: checks 1, 3, 5, 6 and 8).
test.describe.configure({ mode: "parallel" });

for (const path of ALL_PAGES) {
  test(`page health ${path}`, { tag: ["@regression"] }, async ({ poManager, linkStatus }) => {
    const page = poManager.getContentPage(path);
    const network = recordNetwork(page.page, new URL(requireEnv("ALLWYN_BASE_URL")).origin);

    const response = await page.open();
    const audit = await auditPage(page.page);
    const brokenLinks = await linkStatus.findProblems(audit.checkableLinks);

    // 1. Loads with real content and a page-specific title.
    expect(response?.status()).toBe(200);
    await expect(page.main).not.toBeEmpty();
    const title = (await page.page.title()).trim();
    expect.soft(title, "title should name the page, not just the brand").not.toMatch(/^(Allwyn)?$/);
    // 3. No console errors or failed first-party requests.
    expect.soft(network.consoleErrors, "console errors").toEqual([]);
    expect.soft(network.failedRequests, "failed requests").toEqual([]);
    // 5. Images load.
    expect.soft(audit.brokenImages, "images that did not load").toEqual([]);
    // 6. No empty headings, lists or landmarks.
    expect.soft(audit.emptyHeadings, "empty headings").toEqual([]);
    expect.soft(audit.emptyLists, "empty lists").toEqual([]);
    expect.soft(audit.emptyLandmarks, "empty landmarks").toEqual([]);
    // 8. Links are valid, external links open safely, and pages and downloads resolve.
    expect.soft(audit.invalidLinks, "links with no usable href").toEqual([]);
    expect
      .soft(audit.unsafeExternalLinks, 'external links without target="_blank" and rel noopener/noreferrer')
      .toEqual([]);
    expect.soft(brokenLinks, "links that do not resolve, or downloads that are not files").toEqual([]);
  });
}
