# Slice contracts

A field is writable only on the row that names it. Sibling slices do not import each other.

Shared columns live in `src/api/`, one file per entity. Shared UI lives in `src/ui`. `src/lib` is the client and cache keys. Not entities. This app has one slice, so `Todo` is still written in `todos/api.ts`. A second slice that needs a column calls `src/api/todos.ts` and does not update it itself.

## Entities

| Entity | Table | Writes | Reads |
|---|---|---|---|
| Todo | `todos` | `todos/api.ts`: `label`, `sort`, `done_at` | `todos` |

## Access

Each layer sees less than the one above it.

| Layer | Sees |
|---|---|
| DB | rows where `user_id = auth.uid()` |
| `api.ts` | columns in `select`. Writable fields are named on this row |
| `queries.ts` | that type. Cache and optimistic updates. No new columns |
| screen | props it renders. Callbacks for the writes on its row |
| `store.ts` | view flags. It does not fetch |

## todos

`Todo` is `{ id: string, label: string, doneAt: string | null, sort: number }`. `doneAt === null` means open. `TodoFilter` is `'all' | 'open' | 'done'`.

| From | Read | Write |
|---|---|---|
| `app/page` | — | — |
| `TodoApp` | `Todo[]`, `filter: TodoFilter` | `add(label: string)`, `setDone(id: string, done: boolean)`, `remove(id: string)`, `filter: TodoFilter` |
| `queries.ts` | `Todo[]`, session | `insert`, `setDone`, `delete` |
| `api.ts` | rows | `id: string`, `sort: number`, `label: string`, `doneAt: string \| null` |
| `store.ts` | `filter: TodoFilter` | `filter: TodoFilter`, no row |
| `Providers` | — | — |
| `middleware` | session cookie | session cookie |
