import { Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import manifest from '@/content/imageManifest.json';
import Icon from './Icon';

const ratios = {
  '1/1': 'aspect-square',
  '4/3': 'aspect-[4/3]',
  '3/4': 'aspect-[3/4]',
  '4/5': 'aspect-[4/5]',
  '16/9': 'aspect-video',
  '21/9': 'aspect-[21/9]',
};

/**
 * Shapes:
 *   rect → 16px radius, the everyday crop
 *   soft → 28px radius, for large feature images
 *   arch → fully rounded top edge. The brand's signature shape; use it for hero and about imagery only.
 */
const shapes = { rect: 'rounded-lg', soft: 'rounded-xl', arch: 'rounded-t-full' };

/**
 * `src` is either a key from the image pipeline (e.g. 'hero', see scripts/optimize-images.mjs), which renders a
 * responsive <picture> (AVIF, WebP, JPEG) with its real dimensions and a placeholder colour, or a plain URL.
 *
 * Every image goes through here so alt text is never forgotten.
 * Informative image → write an alt. Purely decorative → pass `decorative` (renders alt="").
 * With no `src` it draws a quiet placeholder (or your `fallback` node) until the clinic's photography arrives.
 */
// Arch imagery never renders wider than ~27rem, so the browser can pick a small file.
const ARCH_SIZES = '(min-width: 1024px) 432px, (min-width: 768px) 46vw, min(100vw, 416px)';

export default function Media({ src, alt, decorative = false, ratio = '4/3', shape = 'rect', priority = false, caption, fallback, sizes, className, ...img }) {
  if (import.meta.env.DEV && src && !decorative && !alt) {
    console.warn('[Media] Missing alt text for', src);
  }
  const entry = src ? manifest[src] : null;
  return (
    <figure className={cn('m-0', className)}>
      <div className={cn('relative overflow-hidden bg-slate-100', ratios[ratio], shapes[shape])} style={entry?.color ? { backgroundColor: entry.color } : undefined}>
        {entry ? (
          <picture>
            {entry.sources.map((source) => (
              <source key={source.type} type={source.type} srcSet={source.srcSet} sizes={sizes ?? (shape === 'arch' ? ARCH_SIZES : '100vw')} />
            ))}
            <img
              src={entry.src}
              srcSet={entry.srcSet || undefined}
              sizes={sizes ?? (shape === 'arch' ? ARCH_SIZES : '100vw')}
              width={entry.width}
              height={entry.height}
              alt={decorative ? '' : alt}
              loading={priority ? 'eager' : 'lazy'}
              decoding={priority ? 'sync' : 'async'}
              fetchPriority={priority ? 'high' : 'low'}
              style={{ objectPosition: entry.position }}
              className="h-full w-full object-cover"
              {...img}
            />
          </picture>
        ) : src ? (
          <img
            src={src}
            alt={decorative ? '' : alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'low'}
            className="h-full w-full object-cover"
            {...img}
          />
        ) : fallback ? (
          fallback
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full w-full flex-col items-center justify-center gap-2 text-slate-500"
            style={{ backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 14px, rgb(148 165 176 / 0.16) 14px 15px)' }}
          >
            <Icon as={ImageIcon} size="xl" />
            {import.meta.env.DEV && <span className="text-caption">Photo to be supplied</span>}
          </div>
        )}
      </div>
      {caption && <figcaption className="mt-3 text-caption text-slate-600">{caption}</figcaption>}
    </figure>
  );
}
