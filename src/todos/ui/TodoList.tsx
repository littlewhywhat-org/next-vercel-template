'use client';

import type { Todo } from '@/todos/api';
import { EmptyState } from '@/todos/ui/EmptyState';
import { TodoItem } from '@/todos/ui/TodoItem';
import { Stack } from '@/ui/Stack';

export function TodoList({
  todos,
  onToggle,
  onDelete,
}: {
  todos: Todo[];
  onToggle: (todo: Todo) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <Stack className="w-full gap-2" data-testid="todo-list">
      {todos.length === 0 ? (
        <EmptyState />
      ) : (
        todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
        ))
      )}
    </Stack>
  );
}
