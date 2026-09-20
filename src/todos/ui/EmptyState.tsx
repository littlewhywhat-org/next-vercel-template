'use client';

import { emptyCopy, useTodoUi } from '@/todos/store';
import { Muted } from '@/ui/type';

export function EmptyState() {
  const filter = useTodoUi((state) => state.filter);
  return <Muted data-testid="todo-empty">{emptyCopy(filter)}</Muted>;
}
