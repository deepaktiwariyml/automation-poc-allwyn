import { randomInt } from "node:crypto";
import { promises as fs } from "node:fs";
import * as path from "node:path";

/**
 * Waits until a file exists, e.g. after triggering a download.
 * @throws when the file does not appear within `timeoutMs`.
 */
export async function waitForFile(
  folderPath: string,
  fileName: string,
  intervalMs = 1_000,
  timeoutMs = 30_000,
): Promise<string> {
  const filePath = path.join(folderPath, fileName);
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    try {
      await fs.access(filePath);
      return filePath;
    } catch {
      // Not there yet; poll again after the interval.
      await new Promise((resolve) => setTimeout(resolve, intervalMs));
    }
  }
  throw new Error(`File ${filePath} not found after ${timeoutMs / 1_000}s`);
}

/** Shallow-merges `newData` into the JSON object stored at `filePath`. */
export async function updateJsonFile(filePath: string, newData: Record<string, unknown>): Promise<void> {
  const current = JSON.parse(await fs.readFile(filePath, "utf-8")) as Record<string, unknown>;
  await fs.writeFile(filePath, JSON.stringify({ ...current, ...newData }, null, 2));
}

/**
 * Generates a random string containing at least one uppercase, lowercase,
 * numeric and special character — suitable for password-policy test data.
 */
export function generateCustomRandomString(length: number): string {
  if (length < 4) throw new Error("Length must be at least 4 to include all required character types.");

  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const special = "@#$%^&*()_+-=[]{}|;:',.?";
  const allChars = uppercase + lowercase + numbers + special;
  const pick = (chars: string): string => chars.charAt(randomInt(chars.length));

  const chars = [pick(uppercase), pick(lowercase), pick(numbers), pick(special)];
  while (chars.length < length) chars.push(pick(allChars));

  // Fisher–Yates shuffle so the guaranteed characters are not always at the start.
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j] ?? "", chars[i] ?? ""];
  }
  return chars.join("");
}

export function isStringEqualsWithIgnoreCaseSpaces(str1: string, str2: string): boolean {
  const normalize = (str: string): string => str.replace(/\s+/g, "").toLowerCase();
  return normalize(str1) === normalize(str2);
}
