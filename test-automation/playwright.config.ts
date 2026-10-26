import { defineConfig, devices, type Project } from "@playwright/test";
import * as os from "node:os";
import { allwyn, settings, testEnvironment } from "./configs/environment";
import { projectGroups, resolveProjectGroup } from "./configs/projects";
import { REPORT_PATHS } from "./configs/reporting";
import { siteStorageState } from "./configs/site-auth";

const isCI = process.env.CI !== undefined && process.env.CI !== "false";
const projectGroup = resolveProjectGroup(process.env.PROJECT);

function resolveMobileDevice(): Project["use"] {
  if (process.env.MOBILE_MODE !== "true") return {};
  const deviceName = process.env.DEVICE_NAME ?? "Pixel 7";
  const device = devices[deviceName];
  if (device === undefined) {
    throw new Error(`Unknown DEVICE_NAME "${deviceName}". Use a name from Playwright's device registry.`);
  }
  return device;
}

const mobileDevice = resolveMobileDevice();

// Created by global setup when the web app sits behind Vercel password protection.
const storageState = siteStorageState();
const siteAuth: Project["use"] = storageState === undefined ? {} : { storageState };

const projects: Project[] = projectGroups[projectGroup].map((project) => ({
  ...project,
  use: { ...project.use, ...mobileDevice, ...siteAuth },
}));

// Optional remote browser grid (Sauce Labs, BrowserStack, self-hosted, ...).
// Credentials belong in the endpoint secret, never in this file.
const wsEndpoint = process.env.PW_WS_ENDPOINT;

export default defineConfig({
  timeout: settings.testTimeout,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  reporter: [
    ["list"],
    ["junit", { outputFile: REPORT_PATHS.junitFile }],
    [
      "allure-playwright",
      {
        resultsDir: REPORT_PATHS.resultsDir,
        suiteTitle: true,
        environmentInfo: {
          Project: "Allwyn",
          "Test Environment": testEnvironment,
          "Project Group": projectGroup,
          "Base URL": allwyn.baseUrl ?? "not set",
          // "Strapi URL": allwyn.strapiUrl ?? "not set",
          os_platform: os.platform(),
          os_release: os.release(),
          node_version: process.version,
          architecture: os.arch(),
        },
      },
    ],
    // Must stay after allure-playwright so the report includes its environment info.
    ["./configs/allure-report-generator.ts"],
  ],
  use: {
    baseURL: allwyn.baseUrl,
    headless: isCI || process.env.HEADLESS !== "false",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
    ...(wsEndpoint === undefined ? {} : { connectOptions: { wsEndpoint } }),
  },
  outputDir: "./test-results",
  globalSetup: "./configs/global-setup.ts",
  projects,
});
