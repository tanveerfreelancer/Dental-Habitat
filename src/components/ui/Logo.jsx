import { cn } from '@/lib/cn';
import { site } from '@/config/site';

/**
 * PLACEHOLDER MARK. No logo has been supplied. This is a simple arch with a smile line,
 * built to match the brand's signature shape. Replace with the clinic's real logo
 * (set `site.logo` and swap the contents of this file) when it is available.
 */
export function LogoMark({ className }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={cn('h-8 w-8 shrink-0', className)}>
      <rect width="32" height="32" rx="9" fill="#0E3B51" />
      <path d="M9.5 23v-8.5a6.5 6.5 0 0 1 13 0V23" stroke="#fff" strokeWidth="2.25" strokeLinecap="round" />
      <path d="M13 19.25c1.6 1.35 4.4 1.35 6 0" stroke="#7CDCC0" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({ tone = 'light', href = '#top', className }) {
  const [first, ...rest] = site.name.split(' ');
  return (
    <a href={href} className={cn('inline-flex shrink-0 items-center gap-3 whitespace-nowrap', className)} aria-label={`${site.name}, back to top`}>
      <LogoMark />
      <span className={cn('font-heading text-h4 font-bold', tone === 'dark' ? 'text-white' : 'text-brand-900')}>
        {first} <span className={cn('font-semibold', tone === 'dark' ? 'text-aqua-300' : 'text-brand-600')}>{rest.join(' ')}</span>
      </span>
    </a>
  );
}
