# New app

Copy this repo into a new git repo. This repo stays the todo reference. The new app does not keep shipping `todos`.

Conventions stay in the [README](../README.md).

## Keep

- `src/app` shell: `layout.tsx`, `providers.tsx`, `globals.css`, `middleware.ts`
- `src/ui`
- `src/lib/supabase`
- `features/support` (replace the steps)
- `cucumber.cjs`, `biome.json`, `.github/workflows`, `vercel.json`
- `supabase/config.toml`
- Doc set: `flows`, `data-model`, `invariants`, `design-system`, `slices`

## Remove the sample product

- `src/todos/`
- `docs/flows/todos.feature`
- Todo steps in `features/support/steps.ts`
- The `TodoApp` render in `src/app/page.tsx`

## Rename

| Place | What |
|---|---|
| `package.json` `name` | app name |
| `src/app/layout.tsx` `metadata` | title and description |
| `supabase/config.toml` `project_id` | local project id |
| `biome.json` overrides | `todos` → each slice name |

`src/ui` must not import a slice or `src/app`. Each slice must not import `src/app` or a sibling slice. One `biome.json` override per slice, same shape as the `todos` override.

## Product code

One folder per slice: `src/<name>/`. A slice is a capability with its own data, not a component. Low single digits. Contract in `docs/slices.md`.

Queries use the browser client (`@/lib/supabase/client`), same as `src/todos/api.ts`. RLS is the authorization (`user_id = auth.uid()`). No product API routes. No `SERVICE_ROLE` in `NEXT_PUBLIC_*`. Middleware only refreshes the session cookie.

Replace the docs. Gherkin stays `docs/flows/*.feature`. Glue stays `features/support/`. `Background` / `Given` = state. `When` = one action. `Then` = what the user sees. Check with `pnpm test:e2e:dry`. No custom Gherkin parser. `data-testid`s live on the slice UI.

## Theme

Roles and components stay. Retheme by changing `--raw-*` in `src/app/globals.css`. Light is `color-scheme: light` and the current ramp. A darker theme is a second raw ramp and `color-scheme: dark`. Components keep `bg-canvas`, `text-fg`, `bg-accent`.

## Database

Anonymous sign-in on: hosted Authentication → Providers, and `enable_anonymous_sign_ins` in `supabase/config.toml`. Copy the RLS and grant pattern from `supabase/migrations`.

### Own projects

New staging project, new prod project. `supabase/migrations` in the new repo is the whole history. Preview env points at staging. Production env points at prod.

### Schema in the projects this template uses

`pets-staging` and `pets-prod` are one Postgres each. Add a schema, not a database. Expose it under API → Exposed schemas, and add it to `schemas` in `supabase/config.toml`. The client calls `.schema('<name>')`.

Do not copy the `todos` migration files. Those tables are already applied.

`auth.users` is shared. RLS still limits each row to `auth.uid()`.

Both repos share `supabase_migrations` history. This template does not `db push` from CI (`SUPABASE_ACCESS_TOKEN` is optional). One repo should own hosted pushes. Two repos pushing the same history will disagree on versions.

## Vercel

New project for the new git repo. `vercel.json` leaves `main` deploys off. A PR deploys Preview. Production is the `vX.Y.Z` tag workflow.

| Env | Preview | Production |
|---|---|---|
| `NEXT_PUBLIC_ENV` | `preview` | `production` |
| `NEXT_PUBLIC_SUPABASE_URL` | staging | prod |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | staging anon | prod anon |

GitHub Actions secrets on the new repo: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` (this project), `GH_PAT`. `STAGING_PROJECT_REF` and `PROD_PROJECT_REF` match the Supabase projects you chose.

## Local

```bash
cp .env.example .env.local
pnpm install
npx supabase start
pnpm dev
```

`pnpm run ci` is lint, typecheck, and cucumber dry-run.
