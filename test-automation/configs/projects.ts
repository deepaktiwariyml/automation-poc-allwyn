import { devices, type Project } from "@playwright/test";

const WEB_TEST_DIR = "./tests/web";
const DESKTOP_VIEWPORT = { width: 1920, height: 1080 };

const chromium: Project = {
  name: "chromium",
  testDir: WEB_TEST_DIR,
  use: { ...devices["Desktop Chrome"], viewport: DESKTOP_VIEWPORT },
};

const firefox: Project = {
  name: "firefox",
  testDir: WEB_TEST_DIR,
  use: { ...devices["Desktop Firefox"], viewport: DESKTOP_VIEWPORT },
};

const webkit: Project = {
  name: "webkit",
  testDir: WEB_TEST_DIR,
  use: { ...devices["Desktop Safari"], viewport: DESKTOP_VIEWPORT },
};

const edge: Project = {
  name: "edge",
  testDir: WEB_TEST_DIR,
  use: {
    ...devices["Desktop Edge"],
    channel: "msedge",
    viewport: DESKTOP_VIEWPORT,
  },
};

/** Project groups selectable through the PROJECT environment variable. */
export const projectGroups = {
  chromium: [chromium],
  firefox: [firefox],
  webkit: [webkit],
  edge: [edge],
  "all-browsers": [chromium, firefox, webkit, edge],
  default: [chromium],
} as const satisfies Record<string, readonly Project[]>;

export type ProjectGroup = keyof typeof projectGroups;

function isProjectGroup(value: string): value is ProjectGroup {
  return Object.hasOwn(projectGroups, value);
}

export function resolveProjectGroup(value: string | undefined): ProjectGroup {
  if (value === undefined || value === "") return "default";
  if (!isProjectGroup(value)) {
    throw new Error(`Unsupported PROJECT "${value}". Expected one of: ${Object.keys(projectGroups).join(", ")}.`);
  }
  return value;
}
