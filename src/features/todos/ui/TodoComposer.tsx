'use client';

import { useState } from 'react';
import { Button, TextField } from '@radix-ui/themes';
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
    <Cluster gap="2" width="100%">
      <TextField.Root
        placeholder="Add a todo"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            submit();
          }
        }}
        data-testid="todo-input"
        style={{ flex: 1 }}
      />
      <Button onClick={submit} data-testid="todo-add">
        Add
      </Button>
    </Cluster>
  );
}
