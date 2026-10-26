import { test as base } from "@playwright/test";
import { allwyn, requireEnv } from "../configs/environment";
import { siteStorageState } from "../configs/site-auth";
import { POManager } from "../pageobjects/POManager";
import { CmsEntryResolver } from "../utilities/cms-entry-resolver";
import { LinkStatus } from "../utilities/link-status";
import { StrapiClient } from "../utilities/strapi-client";

interface TestFixtures {
  poManager: POManager;
}

interface WorkerFixtures {
  strapi: StrapiClient;
  cmsResolver: CmsEntryResolver;
  linkStatus: LinkStatus;
}

/** Shared fixtures. Strapi access is created once per worker and reused by its tests. */
export const test = base.extend<TestFixtures, WorkerFixtures>({
  poManager: async ({ page }, use) => {
    await use(new POManager(page));
  },

  strapi: [
    async ({ playwright }, use) => {
      const context = await playwright.request.newContext();
      await use(new StrapiClient(context, requireEnv("ALLWYN_STRAPI_URL"), allwyn.strapiToken));
      await context.dispose();
    },
    { scope: "worker" },
  ],

  cmsResolver: [
    async ({ strapi }, use) => {
      await use(new CmsEntryResolver(strapi));
    },
    { scope: "worker" },
  ],

  linkStatus: [
    async ({ playwright }, use) => {
      const context = await playwright.request.newContext({
        baseURL: requireEnv("ALLWYN_BASE_URL"),
        storageState: siteStorageState(),
      });
      await use(new LinkStatus(context));
      await context.dispose();
    },
    { scope: "worker" },
  ],
});

export { expect } from "@playwright/test";
