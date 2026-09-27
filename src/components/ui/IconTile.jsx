import { cn } from '@/lib/cn';
import Icon from './Icon';

const tones = {
  aqua: 'bg-aqua-100 text-aqua-800',
  brand: 'bg-brand-800 text-aqua-300',
  outline: 'border border-slate-200 bg-white text-brand-700',
  // For use inside a parent with the `group` class: inverts to navy and aqua when the group is hovered or focused.
  interactive: 'bg-aqua-100 text-aqua-800 ring-1 ring-gold-400/0 transition-[background-color,color,box-shadow] duration-300 group-hover:bg-brand-800 group-hover:text-aqua-300 group-hover:ring-gold-400/70 group-focus-within:bg-brand-800 group-focus-within:text-aqua-300 group-focus-within:ring-gold-400/70',
  // For dark surfaces, inside a parent with the `group` class: outlined aqua glyph that fills aqua on hover or focus.
  onDark: 'border border-white/20 text-aqua-300 ring-1 ring-gold-400/0 transition-[border-color,background-color,color,box-shadow] duration-300 group-hover:border-aqua-300 group-hover:bg-aqua-300 group-hover:text-brand-950 group-hover:ring-gold-400/60 group-focus-within:border-aqua-300 group-focus-within:bg-aqua-300 group-focus-within:text-brand-950 group-focus-within:ring-gold-400/60',
};
const sizes = { md: 'h-12 w-12', lg: 'h-14 w-14' };

export default function IconTile({ icon, tone = 'aqua', size = 'md', className }) {
  return (
    <span className={cn('inline-flex items-center justify-center rounded-md', tones[tone], sizes[size], className)}>
      <Icon as={icon} size="lg" />
    </span>
  );
}
