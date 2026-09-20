'use client';

import { useState } from 'react';
import { Button } from '@base-ui/react/button';
import { Input } from '@base-ui/react/input';
import { Cluster } from '@/ui/Cluster';

export function TodoComposer({
  onAdd,
  isPending,
}: {
  onAdd: (label: string) => void;
  isPending?: boolean;
}) {
  const [draft, setDraft] = useState('');

  function submit() {
    const text = draft.trim();
    if (!text || isPending) {
      return;
    }
    onAdd(text);
    setDraft('');
  }

  return (
    <Cluster className="w-full">
      <Input
        placeholder="Add a todo"
        value={draft}
        onValueChange={(value) => setDraft(value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            submit();
          }
        }}
        data-testid="todo-input"
        className="min-w-0 flex-1 rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-indigo-400"
      />
      <Button
        onClick={submit}
        data-testid="todo-add"
        className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-400"
      >
        Add
      </Button>
    </Cluster>
  );
}
