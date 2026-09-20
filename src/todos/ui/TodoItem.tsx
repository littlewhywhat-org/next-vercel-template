'use client';

import { Button, Checkbox, Flex, Text } from '@radix-ui/themes';
import type { Todo } from '@/todos/api';

export function TodoItem({
  todo,
  onToggle,
  onDelete,
}: {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <Flex align="center" gap="3" data-testid="todo-item">
      <Checkbox
        checked={Boolean(todo.done_at)}
        onCheckedChange={() => onToggle(todo)}
        data-testid="todo-toggle"
      />
      <Text
        style={{ flex: 1, textDecoration: todo.done_at ? 'line-through' : undefined }}
        data-testid="todo-label"
      >
        {todo.label}
      </Text>
      <Button size="1" variant="soft" color="red" onClick={() => onDelete(todo.id)} data-testid="todo-delete">
        Delete
      </Button>
    </Flex>
  );
}
