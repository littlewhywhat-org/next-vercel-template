import { createClient } from '@/lib/supabase/client';

export type Todo = {
  id: string;
  label: string;
  done_at: string | null;
  sort: number;
};

export async function listTodos(): Promise<Todo[]> {
  const { data, error } = await createClient()
    .from('todos')
    .select('id, label, done_at, sort')
    .order('sort', { ascending: true })
    .order('created_at', { ascending: true });
  if (error) {
    throw error;
  }
  return data ?? [];
}

export async function insertTodo(input: { userId: string; label: string; sort: number }): Promise<void> {
  const { error } = await createClient().from('todos').insert({
    user_id: input.userId,
    label: input.label,
    sort: input.sort,
  });
  if (error) {
    throw error;
  }
}

export async function setTodoDone(id: string, done_at: string | null): Promise<void> {
  const { error } = await createClient().from('todos').update({ done_at }).eq('id', id);
  if (error) {
    throw error;
  }
}

export async function deleteTodo(id: string): Promise<void> {
  const { error } = await createClient().from('todos').delete().eq('id', id);
  if (error) {
    throw error;
  }
}
