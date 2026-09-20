import type { ReactNode } from 'react';
import { Stack } from '@/ui/Stack';

export function Page({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-xl px-4 py-16">
        <Stack className="items-center gap-5">{children}</Stack>
      </div>
    </main>
  );
}
