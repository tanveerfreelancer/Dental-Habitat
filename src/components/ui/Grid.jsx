import { cn } from '@/lib/cn';

/**
 * The layout grid: 4 columns on phones, 8 on tablets, 12 from 1024px.
 * Gaps: 16 → 24 → 32px. Place children with col-span classes, e.g.
 *   col-span-4 md:col-span-8 lg:col-span-5
 */
export default function Grid({ as: Comp = 'div', className, ...rest }) {
  return (
    <Comp
      className={cn('grid grid-cols-4 gap-x-4 gap-y-8 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12 lg:gap-x-8', className)}
      {...rest}
    />
  );
}
