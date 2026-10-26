import { request } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { allwyn } from "./environment";

/** Browser storage state holding the Vercel protection cookie. Contains a session token — never commit it. */
export const SITE_AUTH_STATE_FILE = ".auth/allwyn-site.json";

/** Storage state for contexts that talk to the protected site; undefined when the site is unprotected. */
export function siteStorageState(): string | undefined {
  return allwyn.sitePassword === undefined ? undefined : SITE_AUTH_STATE_FILE;
}

const VERCEL_PASSWORD_FIELD = "_vercel_password";
const VERCEL_SESSION_COOKIE = "_vercel_jwt";

/**
 * Unlocks a Vercel password-protected deployment once per run and saves the
 * resulting session cookie so every test context starts already authorised.
 */
export async function authenticateProtectedSite(baseUrl: string, password: string): Promise<void> {
  const context = await request.newContext({ baseURL: baseUrl });
  try {
    const response = await context.post("/", { form: { [VERCEL_PASSWORD_FIELD]: password } });
    const { cookies } = await context.storageState();
    if (response.status() === 401 || !cookies.some((cookie) => cookie.name === VERCEL_SESSION_COOKIE)) {
      throw new Error(
        `Vercel protection rejected ALLWYN_SITE_PASSWORD for ${baseUrl} (HTTP ${response.status()}). Check the value in .env or CI secrets.`,
      );
    }
    fs.mkdirSync(path.dirname(SITE_AUTH_STATE_FILE), { recursive: true });
    await context.storageState({ path: SITE_AUTH_STATE_FILE });
  } finally {
    await context.dispose();
  }
}
