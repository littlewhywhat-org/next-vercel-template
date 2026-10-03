'use client';

import { Button } from '@base-ui/react/button';
import { Checkbox } from '@base-ui/react/checkbox';
import type { Todo } from '@/todos/api';
import { Cluster } from '@/ui/Cluster';
import { cx } from '@/ui/cx';
import { Check, Trash } from '@phosphor-icons/react';

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
    <Cluster className={cx('w-full gap-3')} data-testid="todo-item">
      <Checkbox.Root
        checked={Boolean(todo.done_at)}
        onCheckedChange={() => onToggle(todo)}
        data-testid="todo-toggle"
        className={cx(
          'flex size-5 shrink-0 items-center justify-center rounded-control border border-border-strong bg-surface data-[checked]:border-accent data-[checked]:bg-accent',
        )}
      >
        <Checkbox.Indicator className={cx('text-on-accent')}>
          <Check aria-hidden className={cx('size-3')} />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <span
        className={cx('flex-1 text-sm text-fg', todo.done_at && 'text-faint line-through')}
        data-testid="todo-label"
      >
        {todo.label}
      </span>
      <Button
        onClick={() => onDelete(todo.id)}
        data-testid="todo-delete"
        className={cx(
          'inline-flex items-center gap-1 rounded-control bg-danger-soft px-2 py-1 text-xs font-medium text-danger hover:bg-danger hover:text-on-accent',
        )}
      >
        <Trash aria-hidden className={cx('size-3')} />
        Delete
      </Button>
    </Cluster>
  );
}
