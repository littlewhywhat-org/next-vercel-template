'use client';

import { Button } from '@base-ui/react/button';
import { Input } from '@base-ui/react/input';
import { Plus } from '@phosphor-icons/react';
import { useState } from 'react';
import { Cluster } from '@/ui/Cluster';
import { cx } from '@/ui/cx';

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
    <Cluster className={cx('w-full')}>
      <Input
        placeholder='Add a todo'
        value={draft}
        onValueChange={(value) => setDraft(value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            submit();
          }
        }}
        data-testid='todo-input'
        className={cx(
          'min-w-0 flex-1 rounded-control border border-border bg-sunken px-3 py-2 text-fg text-sm outline-none placeholder:text-faint focus:border-accent',
        )}
      />
      <Button
        onClick={submit}
        data-testid='todo-add'
        className={cx(
          'inline-flex items-center gap-1.5 rounded-control bg-accent px-3 py-2 font-medium text-on-accent text-sm hover:bg-accent-hover',
        )}
      >
        <Plus aria-hidden className={cx('size-4')} />
        Add
      </Button>
    </Cluster>
  );
}
