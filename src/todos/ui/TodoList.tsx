'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { Todo } from '@/todos/api';
import { EmptyState } from '@/todos/ui/EmptyState';
import { TodoItem } from '@/todos/ui/TodoItem';
import { cx } from '@/ui/cx';
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
  const reduce = useReducedMotion();

  return (
    <Stack className={cx('w-full gap-2')} data-testid='todo-list'>
      <AnimatePresence initial={false}>
        {todos.map((todo) => (
          <motion.div
            key={todo.id}
            className={cx('w-full')}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.16 }}
          >
            <TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} />
          </motion.div>
        ))}
      </AnimatePresence>
      {todos.length === 0 ? <EmptyState /> : null}
    </Stack>
  );
}
