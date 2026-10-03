import type { SVGProps } from 'react';
import { cx } from '@/ui/cx';

function Icon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cx('size-4 shrink-0', className)}
      {...props}
    />
  );
}

const stroke = {
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M8 3.5v9M3.5 8h9" {...stroke} />
    </Icon>
  );
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M3.5 8.2 6.4 11 12.5 4.8" {...stroke} />
    </Icon>
  );
}

export function TrashIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M3.5 4.5h9M6 4.5V3.5h4v1M5 4.5l.4 8h5.2l.4-8" {...stroke} />
    </Icon>
  );
}

export function ListIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M6 4.5h6.5M6 8h6.5M6 11.5h6.5M3.5 4.5h.01M3.5 8h.01M3.5 11.5h.01" {...stroke} />
    </Icon>
  );
}
