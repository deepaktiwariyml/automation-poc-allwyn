import type { Reporter } from "@playwright/test/reporter";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { REPORT_PATHS } from "./reporting";

const REPORT_NAME = "Allwyn Web Automation Report";

interface AllureSummary {
  reportName?: string;
}

/** Links the Allure report back to the Azure DevOps run when executed in a pipeline. */
function writeExecutorInfo(resultsDir: string): void {
  const { BUILD_BUILDID, SYSTEM_COLLECTIONURI, SYSTEM_TEAMPROJECT } = process.env;
  if (BUILD_BUILDID === undefined) return;

  const host = SYSTEM_COLLECTIONURI === undefined ? undefined : new URL(SYSTEM_COLLECTIONURI).host;
  const pipelineUrl =
    host === undefined || SYSTEM_TEAMPROJECT === undefined
      ? ""
      : `https://${host}/${SYSTEM_TEAMPROJECT}/_build/results?buildId=${BUILD_BUILDID}`;

  const executor = {
    name: "Azure DevOps pipeline",
    type: "ci",
    url: pipelineUrl,
    buildName: "allwyn-web-pipeline",
    buildUrl: pipelineUrl,
  };
  fs.mkdirSync(resultsDir, { recursive: true });
  fs.writeFileSync(path.join(resultsDir, "executor.json"), JSON.stringify(executor, null, 2));
}

function renameReport(reportDir: string): void {
  const summaryFile = path.join(reportDir, "widgets", "summary.json");
  const summary = JSON.parse(fs.readFileSync(summaryFile, "utf-8")) as AllureSummary;
  summary.reportName = REPORT_NAME;
  fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2));
}

/**
 * Generates the Allure report at the end of the run. It must be listed after `allure-playwright`
 * in the config: Playwright calls reporters' `onEnd` in order, and allure-playwright writes
 * `environment.properties` in its own `onEnd`, which global teardown would run before.
 */
export default class AllureReportGenerator implements Reporter {
  private testsRun = 0;

  onTestEnd(): void {
    this.testsRun++;
  }

  onEnd(): void {
    // `--list` and filtered-out runs execute no tests; keep the previous report as it is.
    if (this.testsRun === 0) return;
    const { resultsDir, reportDir } = REPORT_PATHS;

    if (!fs.existsSync(resultsDir)) {
      console.warn(`No Allure results found in ${resultsDir}; skipping report generation.`);
      return;
    }

    writeExecutorInfo(resultsDir);
    try {
      execFileSync("npx", ["--no-install", "allure", "generate", resultsDir, "--clean", "--output", reportDir], {
        stdio: "inherit",
      });
      renameReport(reportDir);
      console.log("Allure report generated. Open it with: npm run report:open");
    } catch (error) {
      // Reporting must not mask the test outcome; surface the failure without failing the run.
      console.error("Failed to generate the Allure report:", error);
    }
  }

  printsToStdio(): boolean {
    return false;
  }
}
