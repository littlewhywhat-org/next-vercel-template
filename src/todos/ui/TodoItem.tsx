'use client';

import { Button } from '@base-ui/react/button';
import { Checkbox } from '@base-ui/react/checkbox';
import type { Todo } from '@/todos/api';
import { Cluster } from '@/ui/Cluster';
import { cx } from '@/ui/cx';

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
    <Cluster className="w-full gap-3" data-testid="todo-item">
      <Checkbox.Root
        checked={Boolean(todo.done_at)}
        onCheckedChange={() => onToggle(todo)}
        data-testid="todo-toggle"
        className="flex size-5 shrink-0 items-center justify-center rounded border border-zinc-500 data-[checked]:border-indigo-400 data-[checked]:bg-indigo-500"
      >
        <Checkbox.Indicator className="text-[10px] leading-none text-white">✓</Checkbox.Indicator>
      </Checkbox.Root>
      <span
        className={cx('flex-1 text-sm', todo.done_at && 'text-zinc-500 line-through')}
        data-testid="todo-label"
      >
        {todo.label}
      </span>
      <Button
        onClick={() => onDelete(todo.id)}
        data-testid="todo-delete"
        className="rounded-md bg-red-500/15 px-2 py-1 text-xs font-medium text-red-300 hover:bg-red-500/25"
      >
        Delete
      </Button>
    </Cluster>
  );
}
