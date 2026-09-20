# Next.js + Supabase todo template

Anonymous Auth, RLS `todos`, Gherkin + Cucumber, Preview → staging / tag → production.

Copy this layout on the next app. `features/` is Cucumber only.

## Layout

```
src/
  app/              routes, Providers (QueryClient)
  ui/               layout + type atoms (no product names)
  lib/supabase/     browser/server/middleware clients
  todos/            one product slice (data + UI for that capability)
docs/flows/         Gherkin specs
features/support/   Cucumber + Playwright glue
```

A **slice** is a user-facing capability with its own data (`todos`, later `board`). Not a component (`TodoItem`). Keep them in the low single digits.

| Import | From |
|---|---|
| Slice → | `@/ui`, `@/lib/*` |
| Slice → sibling slice | never |
| Two slices need the same thing | extract to `lib/` or `ui/`, or merge the slices |

Do not add `src/features/`. Next product folder is `src/<name>/`.

## State

| Kind | Tool | Here |
|---|---|---|
| Server / async | TanStack Query | session, `todos` list, mutations |
| UI shared by sibling components in the slice | Zustand | `all / open / done` filter |
| UI local to one component | `useState` | composer draft |

Do not put fetched rows in Zustand. Filter is view-only (does not write rows). Optimistic updates live in Query (`onMutate`).

## UI

Tailwind CSS **v4** (`4.3.x`) + Base UI (`@base-ui/react` `1.8.x`). Not Radix Themes. Not shadcn. There is no official Tailwind v5.

| | Role |
|---|---|
| Tailwind | layout, type, color |
| Base UI | interactive controls: `Button`, `Input`, `Checkbox`, `ToggleGroup` |
| `src/ui` | `Page`, `Stack`, `Cluster`, `Title`, `Body`, `Muted`, `Label`, `Badge` |

Do not wrap Base UI Button/Checkbox/Input. Style them with `className` at the call site. Landing (Astro) stays Tailwind + Starwind; this Next app is Tailwind + Base UI.

## Gherkin

- Specs: `docs/flows/*.feature`. Glue: `features/support/`.
- `Background` / `Given` = state. `When` = one action. `Then` = what the user sees.
- `npm run ci` runs `cucumber --dry-run` (bind steps, no browser). No custom gherkin parser.
- Full e2e: PR label `e2e`, `supabase start` on the runner. Not staging/prod (that floods `auth.users`).
- `data-testid`s live on the slice UI (`todo-list`, `todo-filter-open`, …).

## Prerequisites

- Node 24 (`.nvmrc`)
- npm
- Docker (for local Supabase / e2e)

## Development

```bash
cp .env.example .env.local
npm install
npm run dev
```

Enable **Anonymous** on both Supabase projects: Authentication → Providers → Anonymous.

| Env var | Preview | Production |
|---|---|---|
| `NEXT_PUBLIC_ENV` | `preview` | `production` |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://cwmzjcppchjydaboycje.supabase.co` | `https://mhvcyahudzacdgnqiams.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | staging anon | prod anon |

Projects: `pets-staging` (`cwmzjcppchjydaboycje`), `pets-prod` (`mhvcyahudzacdgnqiams`). Org Pets. Region `eu-central-1`.

## Scripts

```bash
npx supabase start         # local API http://127.0.0.1:54321, applies supabase/migrations
npm run ci                 # lint + typecheck + cucumber --dry-run
npm run test:e2e:dry       # parse features and bind steps, no browser
npm run test:e2e           # Cucumber + Playwright against local Supabase, not staging
```

E2E on GitHub Actions (PR label `e2e`) also runs `supabase start`. Anonymous users and todos stay on the runner and die with the job. Preview/production still use pets-staging / pets-prod.

## GitHub secrets

| Secret | Used by |
|---|---|
| `GH_PAT` | Release Prepare (`contents: write`) |
| `VERCEL_TOKEN` | Deploy Production on `v*` tags |
| `VERCEL_ORG_ID` | Deploy Production |
| `VERCEL_PROJECT_ID` | Deploy Production |
| `SUPABASE_ACCESS_TOKEN` | optional `db push` later |
| `STAGING_PROJECT_REF` | `cwmzjcppchjydaboycje` |
| `PROD_PROJECT_REF` | `mhvcyahudzacdgnqiams` |

Vercel Preview env vars = staging. Production env vars = prod. Never Preview → prod.

## Deploy

- PR → Vercel Preview (staging keys)
- `main` git deploys are off. **Release Prepare** then **Deploy Production** on the `vX.Y.Z` tag
