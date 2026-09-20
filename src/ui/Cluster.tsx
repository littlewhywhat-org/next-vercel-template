import type { HTMLAttributes } from 'react';
import { cx } from '@/ui/cx';

export function Cluster({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('flex flex-wrap items-center gap-2', className)} {...props} />;
}
