// Posts an execution summary from a generated Allure report to Slack.
// Usage: node scripts/notify-slack.mjs --test-type smoke
// Requires SLACK_TOKEN and SLACK_CHANNEL; REPORT_URL is optional.
import { WebClient } from "@slack/web-api";
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    "test-type": { type: "string", default: "regression" },
  },
});
const testType = values["test-type"];

const { SLACK_TOKEN, SLACK_CHANNEL, REPORT_URL, GITHUB_REPOSITORY, GITHUB_RUN_ID } = process.env;
if (!SLACK_TOKEN || !SLACK_CHANNEL) {
  throw new Error("SLACK_TOKEN and SLACK_CHANNEL must be set to send the summary.");
}

const summaryFile = path.resolve("reports/web/allure-report/widgets/summary.json");
if (!fs.existsSync(summaryFile)) {
  throw new Error(`Allure summary not found at ${summaryFile}. Generate the report first.`);
}

/** @type {{ statistic: Record<"total" | "passed" | "failed" | "broken" | "skipped", number>, time: { start: number, stop: number, duration: number } }} */
const summary = JSON.parse(fs.readFileSync(summaryFile, "utf-8"));
const { statistic, time } = summary;

const formatDate = (timestamp) =>
  new Date(timestamp).toLocaleString("en-US", { dateStyle: "full", timeStyle: "medium" });

const formatDuration = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  return [Math.floor(totalSeconds / 3600), Math.floor((totalSeconds % 3600) / 60), totalSeconds % 60]
    .map((part) => String(part).padStart(2, "0"))
    .join(":");
};

const lines = [
  `The ${testType} automation run for Allwyn is complete.`,
  `- Total: ${statistic.total}`,
  `- ✅ Passed: ${statistic.passed}`,
  `- ❌ Failed: ${statistic.failed}`,
  `- 💔 Broken: ${statistic.broken}`,
  `- ⚠️ Skipped: ${statistic.skipped}`,
  `- Start: ${formatDate(time.start)}`,
  `- Stop: ${formatDate(time.stop)}`,
  `- Duration: ${formatDuration(time.duration)}`,
];
if (REPORT_URL) lines.push(`Report: ${REPORT_URL}`);
if (GITHUB_REPOSITORY && GITHUB_RUN_ID) {
  lines.push(`Pipeline: https://github.com/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}`);
}

await new WebClient(SLACK_TOKEN).chat.postMessage({ channel: SLACK_CHANNEL, text: lines.join("\n") });
console.log("Summary sent to Slack.");
