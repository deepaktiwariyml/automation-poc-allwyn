import { COMPOSED_PAGES } from "../../../testdata/templates";
import { expectNoRawMarkup, expectSingleHeading } from "../../../utilities/page-checks";
import { expect, test } from "../../fixtures";

// Composed page template (E-013: ALW-185, ALW-186): rules shared by every composed page.
const HEADER_COMPONENTS = [
  "SimpleHeader",
  "ExtendedHeader",
  "OverlayHeader",
  "DetailPageHeader",
  "HomeHero",
  "AboutHeroSequence",
  "VideoHero",
]
  .map((name) => `[data-name="${name}"]`)
  .join(", ");
test.describe.configure({ mode: "parallel" });

for (const path of COMPOSED_PAGES) {
  test(`composed ${path}`, { tag: ["@regression", "@cms"] }, async ({ poManager, cmsResolver }) => {
    await cmsResolver.require(path);
    const page = poManager.getContentPage(path);

    const response = await page.open();

    expect(response?.status()).toBe(200);
    await expectSingleHeading(page.page);
    // Sheet 2/3: every composed page opens with a header component.
    await expect(page.main.locator(HEADER_COMPONENTS).first(), "a header component").toBeAttached();
    await expectNoRawMarkup(page.main);
  });
}
