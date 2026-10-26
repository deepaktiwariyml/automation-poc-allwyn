# Allwyn Test Automation

Playwright + TypeScript web automation for Allwyn that checks pages against their Strapi CMS content, reporting to Allure and JUnit.
The package is self-contained (`allwyn-test-automation`) so it can sit as a workspace in the QA monorepo.

## Structure

```
├── configs/
│   ├── environment.ts             # ENV profile, .env loading, required-variable checks
│   ├── projects.ts                # Browser/API project groups selected by PROJECT
│   ├── reporting.ts               # Report locations shared by config, setup and teardown
│   ├── cms-content.ts             # Slug collection types, single-type routes, date format
│   ├── global-setup.ts            # Clears old results, unlocks the protected site
│   ├── allure-report-generator.ts # Reporter that builds the Allure report at the end of the run
│   └── application-constants.json # Shared timeout constants for tests
├── docs/automation-scope.md       # Regression scope and CMS → page mapping
├── pageobjects/                   # Page Object Model (BasePage, ContentPage, POManager)
├── testdata/templates.ts          # Pages exercised by each template test
├── scripts/notify-slack.mjs       # Optional Slack summary from the Allure report
├── tests/
│   ├── fixtures.ts                # Shared fixtures: poManager, strapi, cmsResolver
│   └── web/                       # Browser tests: page-health (every page), interactions (component
│                                  # behaviour), homepage smoke, and templates/ (one file per page template)
├── utilities/                     # Strapi client and resolver, page audit, link status, component order and content checks
├── .env.example                   # Template for local configuration
└── playwright.config.ts
```

## Setup

Requires Node.js 22.13+ and Java 8+ (for the Allure CLI).

```bash
npm ci
npx playwright install --with-deps chromium   # add firefox webkit msedge for cross-browser runs
cp .env.example .env                          # then fill in values; never commit .env
```

## Configuration

No URLs or credentials are stored in the repository. Everything comes from the environment (CI variables/secrets or a local `.env`):

| Variable               | Required for       | Purpose                                                          |
| ---------------------- | ------------------ | ---------------------------------------------------------------- |
| `ALLWYN_BASE_URL`      | web tests          | Base URL of the Allwyn web app                                   |
| `ALLWYN_SITE_PASSWORD` | protected web envs | Vercel Deployment Protection password (staging)                  |
| `ALLWYN_STRAPI_URL`    | CMS tests          | Strapi CMS origin, without the `/api` prefix                     |
| `ALLWYN_STRAPI_TOKEN`  | —                  | Strapi API token (use a read-only token)                         |
| `ENV`                  | —                  | `dev` \| `qa` \| `stage` \| `prod` (default `qa`); sets timeouts |
| `PROJECT`              | —                  | `chromium`, `firefox`, `webkit`, `edge`, `all-browsers`          |
| `HEADLESS`             | —                  | `false` to watch the browser locally (always headless when `CI`) |
| `MOBILE_MODE`          | —                  | `true` to emulate `DEVICE_NAME` (default `Pixel 7`)              |
| `PW_WS_ENDPOINT`       | —                  | Remote browser grid websocket endpoint                           |

When `ALLWYN_SITE_PASSWORD` is set, global setup unlocks the Vercel-protected site once per run and saves the session to `.auth/allwyn-site.json` (gitignored), which every web test reuses. A wrong password stops the run before any test starts.

Without `PROJECT`, the run uses `chromium`. Suites fail immediately with a clear message when a variable they need is missing.

## Commands

```bash
npm run validate              # lint + format check + type check + config/test discovery
npm run test:smoke            # @smoke tests
npm run test:regression       # @regression tests
npm run test:web              # web tests on chromium
npm run test:web:all-browsers # web tests on chromium, firefox, webkit, edge
ENV=dev npm run test:smoke    # target a different environment profile
npm run report:open           # open the generated Allure report
```

From the monorepo root, run any script against this workspace with `npm run <script> -w allwyn-test-automation`.

Reports are written to `reports/web/`: Allure results, the generated Allure report and `junit.xml`.

## Writing tests

- Add page objects under `pageobjects/` extending `BasePage`, and expose them through `POManager`.
- Import `test`/`expect` from `tests/fixtures.ts` to get `poManager`, `strapi`, `cmsResolver` and `linkStatus` (cached link checks).
- `tests/web/templates/` has one test file per page template (detail, article, listing, investor document listings, config, legal, investors hub, news and insights, composed, CMS components, Feel It All), following the frontend's route helpers and the template epics' acceptance criteria. Each runs against the pages listed for it in `testdata/templates.ts`; expected values come from the page's Strapi entry (by URL section + slug for collections, by route for single types; both in `configs/cms-content.ts`). To cover another page, add it to its template's list. English pages only.
- Tag tests with `@smoke` and/or `@regression` so the suite scripts pick them up.
- Compare UI with CMS content through `StrapiClient` (`utilities/strapi-client.ts`), which wraps the Strapi Content API and logs each call to Allure:

  ```ts
  const strapi = new StrapiClient(request, requireEnv("ALLWYN_STRAPI_URL"), allwyn.strapiToken);
  const page = await strapi.findOne<{ title: string }>("pages", "slug", "home", { populate: "*" });
  const articles = await strapi.getAllEntries<{ title: string }>("articles", { locale: "en" });
  ```

  Query parameters use Strapi's bracket notation (`filters[...]`, `populate`, `sort`, `locale`, `status`). Responses are returned in the Strapi v5 (flat) shape; v4 `attributes` are flattened automatically.

- Read configuration through `configs/environment.ts`; use `requireEnv()` for values a suite cannot run without.
