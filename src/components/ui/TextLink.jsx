import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import Icon from './Icon';

const tones = {
  light: 'text-brand-600 decoration-aqua-400 hover:text-brand-800 hover:decoration-brand-800',
  inverse: 'text-aqua-300 decoration-aqua-300/60 hover:text-white hover:decoration-white',
};

/** Inline link. Underline is a hairline in aqua that thickens and darkens on hover. `tone="inverse"` for dark surfaces. */
export default function TextLink({ href, external = false, tone = 'light', className, children, ...rest }) {
  return (
    <a
      href={href}
      className={cn(
        'inline-flex min-h-6 items-center gap-1 font-medium underline decoration-1 underline-offset-4', // min-h-6: 24px touch target (WCAG 2.2)
        'transition-[color,text-decoration-color] duration-200 hover:decoration-2',
        tones[tone],
        className,
      )}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      {...rest}
    >
      {children}
      {external && (
        <>
          <Icon as={ArrowUpRight} size="sm" />
          <span className="sr-only">(opens in a new tab)</span>
        </>
      )}
    </a>
  );
}
