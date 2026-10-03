'use client';

import { ListBullets } from '@phosphor-icons/react';
import { emptyCopy, useTodoUi } from '@/todos/store';
import { Cluster } from '@/ui/Cluster';
import { cx } from '@/ui/cx';
import { Muted } from '@/ui/type';

export function EmptyState() {
  const filter = useTodoUi((state) => state.filter);
  return (
    <Cluster>
      <ListBullets aria-hidden className={cx('size-4 text-faint')} />
      <Muted data-testid='todo-empty'>{emptyCopy(filter)}</Muted>
    </Cluster>
  );
}
