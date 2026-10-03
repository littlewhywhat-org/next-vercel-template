'use client';

import { Toggle } from '@base-ui/react/toggle';
import { ToggleGroup } from '@base-ui/react/toggle-group';
import { isTodoFilter, useTodoUi, type TodoFilter } from '@/todos/store';
import { cx } from '@/ui/cx';

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
      className={cx('flex rounded-card bg-sunken p-1')}
    >
      {items.map((item) => (
        <Toggle
          key={item.value}
          value={item.value}
          data-testid={`todo-filter-${item.value}`}
          className={cx(
            'rounded-control px-3 py-1 text-xs font-medium text-muted data-[pressed]:bg-surface data-[pressed]:text-fg data-[pressed]:shadow-sm',
          )}
        >
          {item.label}
        </Toggle>
      ))}
    </ToggleGroup>
  );
}
