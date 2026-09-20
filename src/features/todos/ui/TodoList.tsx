'use client';

import { Flex } from '@radix-ui/themes';
import type { Todo } from '@/features/todos/api';
import { EmptyState } from '@/features/todos/ui/EmptyState';
import { TodoItem } from '@/features/todos/ui/TodoItem';

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
    <Flex direction="column" gap="2" width="100%" data-testid="todo-list">
      {todos.length === 0 ? (
        <EmptyState />
      ) : (
        todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
        ))
      )}
    </Flex>
  );
}
