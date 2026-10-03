import type { HTMLAttributes } from 'react';
import { cx } from '@/ui/cx';

export function Surface({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx('w-full rounded-card border border-border bg-surface p-6 shadow-sm', className)}
      {...props}
    />
  );
}
