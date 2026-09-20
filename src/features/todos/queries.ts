'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteTodo,
  insertTodo,
  listTodos,
  setTodoDone,
  type Todo,
} from '@/features/todos/api';
import { ensureAnonymousSession } from '@/features/todos/session';

export const todoKeys = {
  all: ['todos'] as const,
  list: () => [...todoKeys.all, 'list'] as const,
};

export const sessionKey = ['session'] as const;

export function useSession() {
  return useQuery({
    queryKey: sessionKey,
    queryFn: ensureAnonymousSession,
    staleTime: Infinity,
    retry: 1,
  });
}

export function useTodos() {
  const session = useSession();
  return useQuery({
    queryKey: todoKeys.list(),
    queryFn: listTodos,
    enabled: session.isSuccess,
  });
}

export function useAddTodo() {
  const queryClient = useQueryClient();
  const session = useSession();
  const todos = useTodos();
  return useMutation({
    mutationFn: (label: string) => {
      const userId = session.data?.user.id;
      if (!userId) {
        throw new Error('Not signed in');
      }
      const nextSort = (todos.data?.[todos.data.length - 1]?.sort ?? -1) + 1;
      return insertTodo({ userId, label, sort: nextSort });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: todoKeys.list() }),
  });
}

export function useToggleTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (todo: Todo) => setTodoDone(todo.id, todo.done_at ? null : new Date().toISOString()),
    onMutate: async (todo) => {
      await queryClient.cancelQueries({ queryKey: todoKeys.list() });
      const prev = queryClient.getQueryData<Todo[]>(todoKeys.list());
      const doneAt = todo.done_at ? null : new Date().toISOString();
      queryClient.setQueryData<Todo[]>(todoKeys.list(), (rows = []) =>
        rows.map((row) => (row.id === todo.id ? { ...row, done_at: doneAt } : row)),
      );
      return { prev };
    },
    onError: (_error, _todo, ctx) => {
      queryClient.setQueryData(todoKeys.list(), ctx?.prev);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: todoKeys.list() }),
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: todoKeys.list() });
      const prev = queryClient.getQueryData<Todo[]>(todoKeys.list());
      queryClient.setQueryData<Todo[]>(todoKeys.list(), (rows = []) => rows.filter((row) => row.id !== id));
      return { prev };
    },
    onError: (_error, _id, ctx) => {
      queryClient.setQueryData(todoKeys.list(), ctx?.prev);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: todoKeys.list() }),
  });
}
