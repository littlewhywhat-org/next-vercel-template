'use client';

import { emptyCopy, useTodoUi } from '@/todos/store';
import { Cluster } from '@/ui/Cluster';
import { cx } from '@/ui/cx';
import { ListIcon } from '@/ui/icons';
import { Muted } from '@/ui/type';

export function EmptyState() {
  const filter = useTodoUi((state) => state.filter);
  return (
    <Cluster>
      <ListIcon className={cx('text-faint')} />
      <Muted data-testid="todo-empty">{emptyCopy(filter)}</Muted>
    </Cluster>
  );
}
