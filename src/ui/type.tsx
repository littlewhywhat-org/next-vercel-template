import type { HTMLAttributes } from 'react';
import { cx } from '@/ui/cx';

export function Title({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cx('font-bold text-4xl text-fg tracking-tight', className)}
      {...props}
    />
  );
}

export function Heading({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cx('font-semibold text-fg text-xl', className)} {...props} />
  );
}

export function Body({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cx('text-base text-fg leading-6', className)} {...props} />
  );
}

export function Muted({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx('text-muted text-sm', className)} {...props} />;
}

export function Label({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cx('font-medium text-muted text-xs', className)}
      {...props}
    />
  );
}
