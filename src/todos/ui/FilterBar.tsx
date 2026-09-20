'use client';

import { Toggle } from '@base-ui/react/toggle';
import { ToggleGroup } from '@base-ui/react/toggle-group';
import { isTodoFilter, useTodoUi, type TodoFilter } from '@/todos/store';

const items: { value: TodoFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'open', label: 'Open' },
  { value: 'done', label: 'Done' },
];

export function FilterBar() {
  const filter = useTodoUi((state) => state.filter);
  const setFilter = useTodoUi((state) => state.setFilter);

  return (
    <ToggleGroup
      value={[filter]}
      onValueChange={(groupValue) => {
        const next = groupValue[0];
        if (isTodoFilter(next)) {
          setFilter(next);
        }
      }}
      data-testid="todo-filter"
      className="flex rounded-lg bg-zinc-800 p-1"
    >
      {items.map((item) => (
        <Toggle
          key={item.value}
          value={item.value}
          data-testid={`todo-filter-${item.value}`}
          className="rounded-md px-3 py-1 text-xs font-medium text-zinc-400 data-[pressed]:bg-zinc-700 data-[pressed]:text-zinc-100"
        >
          {item.label}
        </Toggle>
      ))}
    </ToggleGroup>
  );
}
