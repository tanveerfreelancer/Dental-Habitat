import plugin from 'tailwindcss/plugin';
import { colors, screens, fontFamily, fontSizeConfig, radius, shadows, layout, motion } from './src/design/tokens.js';

const rem = (px) => `${px / 16}rem`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './design-system.html', './src/**/*.{js,jsx}'],
  theme: {
    // Curated, not extended: the default Tailwind palette and type scale are switched off
    // on purpose so nothing off-system can slip in.
    screens,
    colors,
    fontFamily,
    fontSize: fontSizeConfig,
    borderRadius: radius,
    boxShadow: { none: 'none', ...shadows },
    extend: {
      borderColor: { DEFAULT: colors.slate[200] },
      spacing: {
        section: 'var(--section-y)',
        header: 'var(--header-h)',
        gutter: 'var(--gutter)',
      },
      transitionTimingFunction: { 'out-quart': motion.easing },
      // The one orchestrated page-load moment (hero). Global reduced-motion rules in index.css collapse these to instant.
      keyframes: {
        rise: { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'none' } },
        'arch-in': { from: { opacity: '0', transform: 'translateY(24px) scale(0.985)' }, to: { opacity: '1', transform: 'none' } },
        float: { from: { transform: 'translateY(0)' }, to: { transform: 'translateY(-6px)' } },
        'pulse-ring': { '0%': { transform: 'scale(0.7)', opacity: '0.9' }, '80%, 100%': { transform: 'scale(2.4)', opacity: '0' } },
      },
      animation: {
        rise: `rise 700ms ${motion.easing} both`,
        'arch-in': `arch-in 900ms ${motion.easing} both`,
        float: 'float 7s ease-in-out infinite alternate',
        'pulse-ring': 'pulse-ring 2.8s ease-out infinite',
      },
      maxWidth: { content: rem(layout.contentMax), prose: rem(layout.proseMax) },
    },
  },
  plugins: [
    // Layout tokens become CSS variables that step at the same breakpoints as the screens above.
    plugin(({ addBase }) => {
      addBase({
        ':root': {
          '--gutter': rem(layout.gutters.base),
          '--section-y': rem(layout.sectionY.base),
          '--header-h': rem(layout.headerH.base),
          '--content-max': rem(layout.contentMax),
          '--focus': colors.brand[500],
        },
        [`@media (min-width: ${screens.xs})`]: { ':root': { '--gutter': rem(layout.gutters.xs) } },
        [`@media (min-width: ${screens.md})`]: {
          ':root': {
            '--gutter': rem(layout.gutters.md),
            '--section-y': rem(layout.sectionY.md),
            '--header-h': rem(layout.headerH.md),
          },
        },
        [`@media (min-width: ${screens.lg})`]: { ':root': { '--gutter': rem(layout.gutters.lg) } },
        [`@media (min-width: ${screens.xl})`]: {
          ':root': { '--section-y': rem(layout.sectionY.xl), '--header-h': rem(layout.headerH.xl) },
        },
      });
    }),
  ],
};
