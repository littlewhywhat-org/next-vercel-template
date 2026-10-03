import type { HTMLAttributes } from 'react';
import { cx } from '@/ui/cx';

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cx(
        'rounded-pill border border-border bg-sunken px-2.5 py-0.5 text-xs font-medium text-muted',
        className,
      )}
      {...props}
    />
  );
}
