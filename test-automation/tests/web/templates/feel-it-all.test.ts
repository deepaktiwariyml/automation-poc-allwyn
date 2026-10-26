import { expectSingleHeading } from "../../../utilities/page-checks";
import { REDESIGNED_SURFACES } from "../../../testdata/templates";
import { expect, test } from "../../fixtures";

// Feel It All: app-owned page with no CMS content (E-021: ALW-220).
test("feel it all /feel-it-all", { tag: ["@regression"] }, async ({ poManager }) => {
  test.skip(!REDESIGNED_SURFACES.feelItAll, "net-new page; switched on in testdata/templates.ts when developed");
  const page = poManager.getContentPage("/feel-it-all");

  const response = await page.open();

  expect(response?.status()).toBe(200);
  await expectSingleHeading(page.page, "Home of all feelings");
  await expect(page.main.locator("#fia-quiz")).toBeAttached();
});
