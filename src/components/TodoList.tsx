'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button, Card, Checkbox, Flex, Heading, Spinner, Text, TextField } from '@radix-ui/themes';
import { createClient } from '@/lib/supabase/client';

type Todo = {
  id: string;
  label: string;
  done_at: string | null;
  sort: number;
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [label, setLabel] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data, error: queryError } = await supabase
      .from('todos')
      .select('id, label, done_at, sort')
      .order('sort', { ascending: true })
      .order('created_at', { ascending: true });
    if (queryError) {
      setError(queryError.message);
      return;
    }
    setTodos(data ?? []);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const supabase = createClient();
        const { data: sessionData } = await supabase.auth.getSession();
        if (!sessionData.session) {
          const { error: authError } = await supabase.auth.signInAnonymously();
          if (authError) {
            if (!cancelled) {
              setError(authError.message);
            }
            return;
          }
        }
        if (!cancelled) {
          await load();
          setReady(true);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to start');
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [load]);

  async function addTodo() {
    const text = label.trim();
    if (!text) {
      return;
    }
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setError('Not signed in');
      return;
    }
    const nextSort = (todos[todos.length - 1]?.sort ?? -1) + 1;
    const { error: insertError } = await supabase.from('todos').insert({
      user_id: user.id,
      label: text,
      sort: nextSort,
    });
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setLabel('');
    await load();
  }

  async function toggleTodo(todo: Todo) {
    const supabase = createClient();
    const { error: updateError } = await supabase
      .from('todos')
      .update({ done_at: todo.done_at ? null : new Date().toISOString() })
      .eq('id', todo.id);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    await load();
  }

  async function deleteTodo(id: string) {
    const supabase = createClient();
    const { error: deleteError } = await supabase.from('todos').delete().eq('id', id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    await load();
  }

  if (error) {
    return (
      <Card size="3">
        <Text color="red" data-testid="todo-error">
          {error}
        </Text>
      </Card>
    );
  }

  if (!ready) {
    return (
      <Flex align="center" justify="center" gap="2">
        <Spinner />
        <Text>Signing in…</Text>
      </Flex>
    );
  }

  return (
    <Card size="3" style={{ width: '100%', maxWidth: '28rem' }}>
      <Flex direction="column" gap="4">
        <Heading size="6">Todos</Heading>
        <Flex gap="2">
          <TextField.Root
            placeholder="Add a todo"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                void addTodo();
              }
            }}
            data-testid="todo-input"
            style={{ flex: 1 }}
          />
          <Button onClick={() => void addTodo()} data-testid="todo-add">
            Add
          </Button>
        </Flex>
        <Flex direction="column" gap="2" data-testid="todo-list">
          {todos.length === 0 ? (
            <Text color="gray" data-testid="todo-empty">
              No todos yet
            </Text>
          ) : (
            todos.map((todo) => (
              <Flex key={todo.id} align="center" gap="3" data-testid="todo-item">
                <Checkbox
                  checked={Boolean(todo.done_at)}
                  onCheckedChange={() => void toggleTodo(todo)}
                  data-testid="todo-toggle"
                />
                <Text
                  style={{ flex: 1, textDecoration: todo.done_at ? 'line-through' : undefined }}
                  data-testid="todo-label"
                >
                  {todo.label}
                </Text>
                <Button
                  size="1"
                  variant="soft"
                  color="red"
                  onClick={() => void deleteTodo(todo.id)}
                  data-testid="todo-delete"
                >
                  Delete
                </Button>
              </Flex>
            ))
          )}
        </Flex>
      </Flex>
    </Card>
  );
}
