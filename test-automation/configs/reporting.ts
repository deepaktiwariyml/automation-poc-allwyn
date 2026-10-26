/** Report locations shared by the Playwright config, global setup and teardown. */
export const REPORT_PATHS = {
  resultsDir: "reports/web/allure-results",
  reportDir: "reports/web/allure-report",
  junitFile: "reports/web/junit.xml",
} as const;
