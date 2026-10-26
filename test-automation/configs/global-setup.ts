import fs from "node:fs";
import { allwyn, requireEnv } from "./environment";
import { REPORT_PATHS } from "./reporting";
import { authenticateProtectedSite } from "./site-auth";

export default async function globalSetup(): Promise<void> {
  // Start every run with empty Allure results so reports reflect only the current execution.
  fs.rmSync(REPORT_PATHS.resultsDir, { recursive: true, force: true });

  if (allwyn.sitePassword !== undefined) {
    await authenticateProtectedSite(requireEnv("ALLWYN_BASE_URL"), allwyn.sitePassword);
  }
}
