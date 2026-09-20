create table public.todos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  label text not null,
  done_at timestamptz,
  sort int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.todos enable row level security;

create policy todos_select on public.todos for select using (auth.uid() = user_id);
create policy todos_insert on public.todos for insert with check (auth.uid() = user_id);
create policy todos_update on public.todos for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy todos_delete on public.todos for delete using (auth.uid() = user_id);

grant select, insert, update, delete on table public.todos to authenticated;
