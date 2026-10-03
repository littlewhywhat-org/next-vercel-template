'use client';

import {
  useAddTodo,
  useDeleteTodo,
  useSession,
  useTodos,
  useToggleTodo,
} from '@/todos/queries';
import { openCount, useTodoUi, visibleTodos } from '@/todos/store';
import { FilterBar } from '@/todos/ui/FilterBar';
import { TodoComposer } from '@/todos/ui/TodoComposer';
import { TodoList } from '@/todos/ui/TodoList';
import { Cluster } from '@/ui/Cluster';
import { cx } from '@/ui/cx';
import { Stack } from '@/ui/Stack';
import { Surface } from '@/ui/Surface';
import { Heading, Label } from '@/ui/type';

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
  const error =
    session.error ?? todos.error ?? add.error ?? toggle.error ?? remove.error;

  if (error) {
    return (
      <Surface className={cx('max-w-md')}>
        <p className={cx('text-danger text-sm')} data-testid='todo-error'>
          {message(error)}
        </p>
      </Surface>
    );
  }

  if (!session.isSuccess || todos.isPending) {
    return (
      <Cluster className={cx('text-muted text-sm')}>
        <span
          className={cx(
            'size-4 animate-spin rounded-full border-2 border-border-strong border-t-fg',
          )}
        />
        Signing in…
      </Cluster>
    );
  }

  const rows = todos.data ?? [];
  const open = openCount(rows);

  return (
    <Surface className={cx('max-w-md')}>
      <Stack>
        <Cluster className={cx('w-full justify-between')}>
          <Heading>Todos</Heading>
          <Label data-testid='todo-open-count'>{open} open</Label>
        </Cluster>
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
    </Surface>
  );
}
