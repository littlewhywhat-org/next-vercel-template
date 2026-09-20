'use client';

import { Card, Flex, Heading, Spinner, Text } from '@radix-ui/themes';
import { Stack } from '@/ui/Stack';
import { Label } from '@/ui/type';
import { FilterBar } from '@/todos/ui/FilterBar';
import { TodoComposer } from '@/todos/ui/TodoComposer';
import { TodoList } from '@/todos/ui/TodoList';
import { useAddTodo, useDeleteTodo, useSession, useTodos, useToggleTodo } from '@/todos/queries';
import { openCount, useTodoUi, visibleTodos } from '@/todos/store';

function message(error: unknown): string {
  return error instanceof Error ? error.message : 'Failed to start';
}

export function TodoApp() {
  const session = useSession();
  const todos = useTodos();
  const add = useAddTodo();
  const toggle = useToggleTodo();
  const remove = useDeleteTodo();
  const filter = useTodoUi((state) => state.filter);
  const error = session.error ?? todos.error ?? add.error ?? toggle.error ?? remove.error;

  if (error) {
    return (
      <Card size="3">
        <Text color="red" data-testid="todo-error">
          {message(error)}
        </Text>
      </Card>
    );
  }

  if (!session.isSuccess || todos.isPending) {
    return (
      <Flex align="center" justify="center" gap="2">
        <Spinner />
        <Text>Signing in…</Text>
      </Flex>
    );
  }

  const rows = todos.data ?? [];
  const open = openCount(rows);

  return (
    <Card size="3" style={{ width: '100%', maxWidth: '28rem' }}>
      <Stack gap="4">
        <Flex align="center" justify="between" gap="3" wrap="wrap">
          <Heading size="6">Todos</Heading>
          <Label data-testid="todo-open-count">{open} open</Label>
        </Flex>
        <TodoComposer
          isPending={add.isPending}
          onAdd={(label) => add.mutate(label)}
        />
        <FilterBar />
        <TodoList
          todos={visibleTodos(rows, filter)}
          onToggle={(todo) => toggle.mutate(todo)}
          onDelete={(id) => remove.mutate(id)}
        />
      </Stack>
    </Card>
  );
}
