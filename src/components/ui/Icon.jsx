import { cn } from '@/lib/cn';

/** One icon size scale, one stroke weight. Pass any lucide-react icon as `as`. */
export const ICON_PX = { sm: 16, md: 20, lg: 24, xl: 32 };

export default function Icon({ as: Glyph, size = 'md', className, ...rest }) {
  return (
    <Glyph
      size={ICON_PX[size]}
      strokeWidth={1.75}
      aria-hidden="true"
      focusable="false"
      className={cn('shrink-0', className)}
      {...rest}
    />
  );
}
