import dotenv from "dotenv";

// Values already exported in the shell/CI take precedence over the local .env file.
dotenv.config({ override: false, quiet: true });

export const TEST_ENVIRONMENTS = ["dev", "qa", "stage", "prod"] as const;
export type TestEnvironment = (typeof TEST_ENVIRONMENTS)[number];

interface EnvironmentSettings {
  /** Per-test timeout in milliseconds. */
  testTimeout: number;
}

const environmentSettings: Record<TestEnvironment, EnvironmentSettings> = {
  dev: { testTimeout: 60_000 },
  qa: { testTimeout: 30_000 },
  stage: { testTimeout: 60_000 },
  prod: { testTimeout: 60_000 },
};

function isTestEnvironment(value: string): value is TestEnvironment {
  return (TEST_ENVIRONMENTS as readonly string[]).includes(value);
}

function resolveTestEnvironment(): TestEnvironment {
  const value = process.env.ENV ?? "qa";
  if (!isTestEnvironment(value)) {
    throw new Error(`Unsupported ENV "${value}". Expected one of: ${TEST_ENVIRONMENTS.join(", ")}.`);
  }
  return value;
}

function readOptional(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value === undefined || value === "" ? undefined : value;
}

/**
 * Reads an environment variable that a suite cannot run without.
 * Call it where the value is consumed so that unrelated commands
 * (e.g. `playwright test --list`) keep working without it.
 */
export function requireEnv(name: string): string {
  const value = readOptional(name);
  if (value === undefined) {
    throw new Error(
      `Missing required environment variable ${name}. Set it in the shell, CI secrets or a local .env file (see .env.example).`,
    );
  }
  return value;
}

export const testEnvironment = resolveTestEnvironment();
export const settings = environmentSettings[testEnvironment];

export const allwyn = {
  baseUrl: readOptional("ALLWYN_BASE_URL"),
  /** Strapi CMS origin, e.g. https://cms.example.com (without the /api prefix). */
  strapiUrl: readOptional("ALLWYN_STRAPI_URL"),
  /** Strapi API token (Settings → API Tokens); a read-only token is sufficient. */
  strapiToken: readOptional("ALLWYN_STRAPI_TOKEN"),
  /**
   * True for development/preview builds (e.g. the C&T Vercel staging), where the frontend deliberately
   * shows "Unsupported module" placeholders (VERCEL_ENV=preview); production-build checks are skipped there.
   */
  previewBuild: readOptional("ALLWYN_PREVIEW_BUILD") === "true",
  /** Vercel Deployment Protection password for the web app; omit for unprotected environments. */
  sitePassword: readOptional("ALLWYN_SITE_PASSWORD"),
} as const;
