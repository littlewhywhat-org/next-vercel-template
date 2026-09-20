'use client';

import { SegmentedControl } from '@radix-ui/themes';
import { isTodoFilter, useTodoUi, type TodoFilter } from '@/features/todos/store';

const items: { value: TodoFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'open', label: 'Open' },
  { value: 'done', label: 'Done' },
];

export function FilterBar() {
  const filter = useTodoUi((state) => state.filter);
  const setFilter = useTodoUi((state) => state.setFilter);

  return (
    <SegmentedControl.Root
      value={filter}
      onValueChange={(value) => {
        if (isTodoFilter(value)) {
          setFilter(value);
        }
      }}
      data-testid="todo-filter"
    >
      {items.map((item) => (
        <SegmentedControl.Item key={item.value} value={item.value} data-testid={`todo-filter-${item.value}`}>
          {item.label}
        </SegmentedControl.Item>
      ))}
    </SegmentedControl.Root>
  );
}
