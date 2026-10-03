# Design system

Bright gray theme. One neutral accent, one danger color. Tokens live in `src/app/globals.css`. Screens use role utilities (`bg-canvas`, `text-fg`).

## Layers

| Layer | Where | Example |
|---|---|---|
| Raw | `--raw-*` on `:root` | `--raw-neutral-100` `#f4f4f5` |
| Roles | `@theme inline` | `--color-canvas` → `bg-canvas` |
| UI | `src/ui` and slice `className` | `bg-surface text-fg` |

New brand: change `--raw-*`. Roles point at raw. Components stay on role names.

## Color roles

| Role | Use |
|---|---|
| `canvas` | page background |
| `surface` | cards, pressed filter |
| `sunken` | inputs, filter track, badge fill |
| `fg` | primary text |
| `muted` | secondary text, badge |
| `faint` | placeholder, completed todo |
| `border` | hairline |
| `border-strong` | checkbox edge |
| `accent` / `accent-hover` / `on-accent` | primary action (Add, checked) |
| `danger` / `danger-soft` | delete, error |

## Type

| Atom | Use |
|---|---|
| `Title` | page heading |
| `Heading` | section inside a surface |
| `Body` | paragraph |
| `Muted` | secondary copy |
| `Label` | meta (`3 open`) |

## Layout

| Atom | Use |
|---|---|
| `Page` | canvas, centered column |
| `Stack` | vertical, 16px gap |
| `Cluster` | horizontal wrap, 8px gap |
| `Surface` | card: white, border, radius, shadow |
| `Badge` | small status chip |

Space step is Tailwind's 4px (`gap-2` = 8px, `gap-4` = 16px). Radius: `rounded-control`, `rounded-card`, `rounded-pill`. Elevation is `shadow-sm` on `Surface` and the pressed filter.

## Classes

Every `className` goes through `cx` (`src/ui/cx.ts`), including a single static string. ESLint rule `tailwindcss/classnames-order` sorts classes inside `cx` and `className`. `npm run lint` fails when the order is wrong; `eslint --fix` rewrites it.

## Icons

`@phosphor-icons/react`. Root exports: `Plus`, `Check`, `Trash`, `ListBullets`. Color is `currentColor`. Size is a Tailwind class (`size-4`, `size-3`). `aria-hidden` on decorative icons. Favicon stays `public/favicon.svg`.

## Controls

Base UI `Button`, `Input`, `Checkbox`, `Toggle`, `ToggleGroup`. No wrappers. `className` at the call site uses roles.

## Screen

`Page` → `Badge` + `Title` + `Muted` → `Surface` → `Heading` row → composer → filter → list or `EmptyState`.
