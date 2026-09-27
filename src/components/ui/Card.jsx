import { cn } from '@/lib/cn';

/**
 * Cards are the exception, not the default layout. Prefer ruled lists, split layouts and
 * tinted bands. When a card is right, pick the quietest variant that works.
 */
const variants = {
  outline: 'border border-slate-200 bg-white',
  tint: 'bg-slate-50',
  inverse: 'surface-inverse bg-brand-900',
  floating: 'border border-slate-200/70 bg-white shadow-md', // only for things that float
};
const paddings = { none: '', md: 'p-6 md:p-8', lg: 'p-8 md:p-12' };

export default function Card({ as: Comp = 'div', variant = 'outline', padding = 'md', interactive = false, className, ...rest }) {
  return (
    <Comp
      className={cn(
        'rounded-lg',
        variants[variant],
        paddings[padding],
        interactive && 'transition-[border-color] duration-200 hover:border-brand-300',
        className,
      )}
      {...rest}
    />
  );
}
