import { expect, test } from "@playwright/test";
import { requireEnv } from "../../configs/environment";
import { POManager } from "../../pageobjects/POManager";

test.describe("Allwyn home page", () => {
  test.beforeAll(() => {
    requireEnv("ALLWYN_BASE_URL");
  });

  test("loads successfully", { tag: ["@smoke", "@regression"] }, async ({ page }) => {
    const homePage = new POManager(page).getHomePage();
    const response = await homePage.open();
    expect(response, "navigation should produce a document response").not.toBeNull();
    expect(response?.ok(), `unexpected HTTP status ${String(response?.status())}`).toBe(true);
    await expect(homePage.body).toBeVisible();
    await expect(page).toHaveTitle(/\S/);
  });
});
