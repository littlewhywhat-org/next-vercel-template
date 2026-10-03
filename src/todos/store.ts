'use client';

import { create } from 'zustand';
import type { Todo } from '@/todos/api';

export type TodoFilter = 'all' | 'open' | 'done';

type TodoUiState = {
  filter: TodoFilter;
  setFilter: (filter: TodoFilter) => void;
};

export const useTodoUi = create<TodoUiState>((set) => ({
  filter: 'all',
  setFilter: (filter) => set({ filter }),
}));

export function isTodoFilter(value: string): value is TodoFilter {
  return value === 'all' || value === 'open' || value === 'done';
}

export function visibleTodos(todos: Todo[], filter: TodoFilter): Todo[] {
  if (filter === 'open') {
    return todos.filter((todo) => !todo.done_at);
  }
  if (filter === 'done') {
    return todos.filter((todo) => Boolean(todo.done_at));
  }
  return todos;
}

export function openCount(todos: Todo[]): number {
  return todos.filter((todo) => !todo.done_at).length;
}

export function emptyCopy(filter: TodoFilter): string {
  if (filter === 'open') {
    return 'No open todos';
  }
  if (filter === 'done') {
    return 'No done todos';
  }
  return 'No todos yet';
}
