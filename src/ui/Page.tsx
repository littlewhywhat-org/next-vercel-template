import type { ReactNode } from 'react';
import { cx } from '@/ui/cx';
import { Stack } from '@/ui/Stack';

export function Page({ children }: { children: ReactNode }) {
  return (
    <main className={cx('min-h-screen bg-canvas text-fg')}>
      <div className={cx('mx-auto max-w-xl px-4 py-16')}>
        <Stack className={cx('items-center gap-5')}>{children}</Stack>
      </div>
    </main>
  );
}
