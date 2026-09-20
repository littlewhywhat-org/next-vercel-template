import type { HTMLAttributes } from 'react';
import { cx } from '@/ui/cx';

export function Title({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={cx('text-4xl font-bold tracking-tight', className)} {...props} />;
}

export function Body({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx('text-base leading-6', className)} {...props} />;
}

export function Muted({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx('text-sm text-zinc-400', className)} {...props} />;
}

export function Label({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cx('text-xs font-medium text-zinc-300', className)} {...props} />;
}
