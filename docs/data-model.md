# Data model (Supabase)

Postgres. Auth via Supabase Auth (anonymous). Table RLS: `user_id = auth.uid()`.

Never put `SERVICE_ROLE` in `NEXT_PUBLIC_*`.

## Env

| Vercel target | Project |
|---|---|
| Preview | `pets-staging` (`cwmzjcppchjydaboycje`) |
| Production | `pets-prod` (`mhvcyahudzacdgnqiams`) |

`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` per target.

Anonymous must be on in Authentication → Providers for both projects.

## Tables

**todos**
- `id uuid pk`
- `user_id uuid not null` → `auth.users`
- `label text not null`
- `sort int not null`
- `done_at timestamptz` (null = open)
- `created_at timestamptz`
