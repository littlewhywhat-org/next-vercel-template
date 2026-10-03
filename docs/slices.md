# Slice contracts

A field is writable only on the row that names it.

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
