import type { CmsContactPage, CmsHeader } from "../../../utilities/cms-types";
import { expectNoRawMarkup, expectSingleHeading, present } from "../../../utilities/page-checks";
import { normaliseText } from "../../../utilities/text";
import { expect, test } from "../../fixtures";

// Config pages (renderConfigPage, E-015: ALW-201, ALW-270).
test("config /contact-us", { tag: ["@regression", "@cms"] }, async ({ poManager, cmsResolver }) => {
  const contact = await cmsResolver.require<CmsContactPage>("/contact-us");
  const page = poManager.getContentPage("/contact-us");

  const response = await page.open();

  expect(response?.status()).toBe(200);
  await expectSingleHeading(page.page, contact.simple_header?.title?.heading ?? undefined);
  for (const heading of [contact.emails_heading, contact.offices_heading, contact.gdpr_heading].flatMap(present)) {
    await expect(page.main).toContainText(normaliseText(heading));
  }
  for (const { email } of contact.emails) {
    await expect(page.main.locator(`a[href="mailto:${email}"]`)).toBeVisible();
  }
  for (const card of contact.contact_cards) await expect(page.main).toContainText(normaliseText(card.heading));
  // ALW-201: no enquiry form until a submission endpoint exists.
  await expect(page.main.locator("form, input, textarea, select")).toHaveCount(0);
  await expectNoRawMarkup(page.main);
});

test("config /email-alerts", { tag: ["@regression", "@cms"] }, async ({ poManager, cmsResolver }) => {
  const { simple_header } = await cmsResolver.require<{ simple_header?: CmsHeader | null }>("/email-alerts");
  const page = poManager.getContentPage("/email-alerts");

  const response = await page.open();

  expect(response?.status()).toBe(200);
  await expectSingleHeading(page.page, simple_header?.title?.heading ?? undefined);
  for (const intro of present(simple_header?.title?.text)) await expect(page.main).toContainText(normaliseText(intro));
  await expectNoRawMarkup(page.main);
});
