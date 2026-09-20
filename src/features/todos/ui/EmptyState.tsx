'use client';

import { Text } from '@radix-ui/themes';
import { emptyCopy, useTodoUi } from '@/features/todos/store';

export function EmptyState() {
  const filter = useTodoUi((state) => state.filter);
  return (
    <Text color="gray" data-testid="todo-empty">
      {emptyCopy(filter)}
    </Text>
  );
}
