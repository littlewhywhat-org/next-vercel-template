# Next.js + Supabase todo template

Anonymous Auth, RLS `todos`, Gherkin + Cucumber, Preview → staging / tag → production.

## Prerequisites

- Node 24 (`.nvmrc`)
- npm

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
npm run ci                 # lint + typecheck + gherkin
npm run validate:gherkin
npm run test:e2e           # Cucumber + Playwright (needs running app + Anonymous)
```

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
