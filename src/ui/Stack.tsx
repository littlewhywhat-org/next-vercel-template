import type { HTMLAttributes } from 'react';
import { cx } from '@/ui/cx';

export function Stack({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('flex flex-col gap-4', className)} {...props} />;
}
