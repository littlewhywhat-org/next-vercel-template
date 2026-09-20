'use client';

import { FilterBar } from '@/todos/ui/FilterBar';
import { TodoComposer } from '@/todos/ui/TodoComposer';
import { TodoList } from '@/todos/ui/TodoList';
import { useAddTodo, useDeleteTodo, useSession, useTodos, useToggleTodo } from '@/todos/queries';
import { openCount, useTodoUi, visibleTodos } from '@/todos/store';
import { Cluster } from '@/ui/Cluster';
import { Label } from '@/ui/type';
import { Stack } from '@/ui/Stack';

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
      <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <p className="text-sm text-red-400" data-testid="todo-error">
          {message(error)}
        </p>
      </div>
    );
  }

  if (!session.isSuccess || todos.isPending) {
    return (
      <Cluster className="text-sm text-zinc-400">
        <span className="size-4 animate-spin rounded-full border-2 border-zinc-600 border-t-zinc-200" />
        Signing in…
      </Cluster>
    );
  }

  const rows = todos.data ?? [];
  const open = openCount(rows);

  return (
    <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <Stack>
        <Cluster className="w-full justify-between">
          <h2 className="text-xl font-semibold">Todos</h2>
          <Label data-testid="todo-open-count">{open} open</Label>
        </Cluster>
        <TodoComposer isPending={add.isPending} onAdd={(label) => add.mutate(label)} />
        <FilterBar />
        <TodoList
          todos={visibleTodos(rows, filter)}
          onToggle={(todo) => toggle.mutate(todo)}
          onDelete={(id) => remove.mutate(id)}
        />
      </Stack>
    </div>
  );
}
