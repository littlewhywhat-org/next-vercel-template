import type { HTMLAttributes } from 'react';
import { cx } from '@/ui/cx';

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cx(
        'rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-300',
        className,
      )}
      {...props}
    />
  );
}
