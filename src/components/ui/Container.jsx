import { cn } from '@/lib/cn';

/** 1200px of content, centred, with breakpoint-aware gutters (16 / 24 / 32 / 40px). */
export default function Container({ as: Comp = 'div', narrow = false, className, ...rest }) {
  return <Comp className={cn('container-site', narrow && 'max-w-[calc(45rem+2*var(--gutter))]', className)} {...rest} />;
}
