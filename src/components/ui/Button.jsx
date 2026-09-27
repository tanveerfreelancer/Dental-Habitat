import { forwardRef } from 'react';
import { cn } from '@/lib/cn';
import Icon from './Icon';

const base =
  'inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-md text-button ' +
  'transition-[background-color,border-color,color] duration-200 ease-out-quart ' +
  'disabled:pointer-events-none disabled:opacity-50';

const variants = {
  primary: 'bg-brand-800 text-white hover:bg-brand-700 active:bg-brand-900',
  secondary: 'border border-slate-300 bg-white text-brand-800 hover:border-brand-800 hover:bg-slate-50 active:bg-slate-100',
  accent: 'bg-aqua-300 text-brand-950 hover:bg-aqua-200 active:bg-aqua-400',
  ghost: 'text-brand-800 hover:bg-brand-50 active:bg-brand-100',
  'outline-inverse': 'border border-white/30 text-white hover:border-white hover:bg-white/10',
};

// Heights are the touch targets: 40 / 48 / 56. Horizontal padding stays on the 8px grid.
const sizes = { sm: 'h-10 px-4', md: 'h-12 px-6', lg: 'h-14 px-8' };
const iconSize = { sm: 'sm', md: 'md', lg: 'md' };

/**
 * Renders <a> when `href` is given, otherwise <button>.
 * Icons are for function (phone, calendar), not decoration. No trailing arrows by default.
 * fullWidth: true | 'mobile' (full width below 430px only)
 */
const Button = forwardRef(function Button(
  { as, href, variant = 'primary', size = 'md', fullWidth = false, iconLeft, iconRight, external, className, children, type, ...rest },
  ref,
) {
  const Comp = as || (href ? 'a' : 'button');
  const extra = {
    ...(Comp === 'button' && { type: type || 'button' }),
    ...(external && { target: '_blank', rel: 'noopener noreferrer' }),
  };
  return (
    <Comp
      ref={ref}
      href={href}
      className={cn(
        base,
        variants[variant],
        sizes[size],
        fullWidth === true && 'w-full',
        fullWidth === 'mobile' && 'w-full sm:w-auto',
        className,
      )}
      {...extra}
      {...rest}
    >
      {iconLeft && <Icon as={iconLeft} size={iconSize[size]} />}
      <span>{children}</span>
      {iconRight && <Icon as={iconRight} size={iconSize[size]} />}
    </Comp>
  );
});

export default Button;
