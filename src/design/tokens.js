/**
 * Dental Habitat design tokens — the single source of truth.
 *
 * Consumed by:
 *   - tailwind.config.js        (so every utility class comes from here)
 *   - src/design-system/*       (so the living style guide can never drift from the code)
 *
 * Pure data, no imports: safe to load from Node and from the browser.
 */

/* ------------------------------------------------------------------ colour */

export const colors = {
  transparent: 'transparent',
  current: 'currentColor',
  white: '#FFFFFF',

  /** Deep petrol navy-teal. Primary actions, deep surfaces, links. */
  brand: {
    50: '#EEF6F9',
    100: '#D9EAF0',
    200: '#B4D5E1',
    300: '#85B9CC',
    400: '#4F97B2',
    500: '#2A7A99',
    600: '#1B6180',
    700: '#144C66',
    800: '#0E3B51',
    900: '#092B3C',
    950: '#051C29',
  },

  /** Soft aqua-mint. The only accent. Used sparingly: rules, icon tiles, dark-surface highlights. */
  aqua: {
    50: '#EDFBF6',
    100: '#D4F5EA',
    200: '#AAEAD6',
    300: '#7CDCC0',
    400: '#4DC6A5',
    500: '#2CA986',
    600: '#218969',
    700: '#1B6C55',
    800: '#175845',
    900: '#134637',
  },

  /** Cool slate. Typography, hairlines and the very light cool-gray backgrounds. */
  slate: {
    50: '#F5F8FA',
    100: '#EDF2F5',
    200: '#DFE7EC',
    300: '#C9D4DB',
    400: '#94A5B0',
    500: '#62747F',
    600: '#4C5E6B',
    700: '#35454F',
    800: '#223039',
    900: '#131D25',
    950: '#0B1319',
  },

  /**
   * Champagne gold. A single restrained accent for small luxury details only: review stars, hairline
   * flourishes, tiny "featured" marks, and a whisper of colour on hover. Never a background, a button, or
   * body text. 500 is the exact brief colour; the other stops exist so the design system stays consistent,
   * not as an invitation to use more of them.
   */
  gold: {
    50: '#F9F6F0',
    100: '#F1E9DA',
    200: '#E3D3B5',
    300: '#D2B989',
    400: '#C4A466',
    500: '#C6A15B',
    600: '#A7813A',
    700: '#86682F',
    800: '#664F24',
    900: '#483819',
  },

  /** Rating stars. Champagne gold: a small luxury detail, not a primary colour. */
  star: '#C6A15B',

  /** Form errors only. */
  danger: {
    50: '#FEF3F2',
    100: '#FEE4E2',
    200: '#FECDCA',
    600: '#B42318',
    700: '#912018',
  },
};

/** What each colour is for. Rendered in the style guide. */
export const colorRoles = [
  { role: 'Primary action', token: 'brand-800', hover: 'brand-700', use: 'Buttons, key controls' },
  { role: 'Deep surface', token: 'brand-900', use: 'Dark bands, footer (brand-950)' },
  { role: 'Accent', token: 'aqua-300', use: 'Highlights on dark surfaces; aqua-700 for text on light' },
  { role: 'Links', token: 'brand-600', use: 'Inline links, underlines in aqua-400' },
  { role: 'Page background', token: 'white', use: 'Default sections' },
  { role: 'Alternate background', token: 'slate-50', use: 'Every second section, form panels' },
  { role: 'Hairlines', token: 'slate-200', use: 'Borders, dividers, ruled lists' },
  { role: 'Headings', token: 'slate-900', use: 'H1 to H4' },
  { role: 'Body text', token: 'slate-700', use: 'Paragraphs' },
  { role: 'Muted text', token: 'slate-600', use: 'Captions, hints, secondary copy' },
  { role: 'Gold accent (rare)', token: 'gold-500', use: 'Review stars, tiny flourishes and hover details only — never a background or button' },
];

/* -------------------------------------------------------------- typography */

const SYSTEM_SANS = [
  'ui-sans-serif', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif',
];

export const fontFamily = {
  heading: ['"Plus Jakarta Sans"', '"Plus Jakarta Sans Fallback"', ...SYSTEM_SANS],
  sans: ['Inter', '"Inter Fallback"', ...SYSTEM_SANS],
  mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
};

const rem = (px) => `${px / 16}rem`;

/**
 * Fluid type. Each step is clamp(min, base + vw, max), so it scales smoothly
 * between 320px and the point where it hits max — no jumps at breakpoints.
 * Line heights and letter-spacing tighten as size grows.
 */
export const typeScale = {
  h1: { label: 'H1', family: 'heading', minPx: 36, maxPx: 56, basePx: 24, vw: 2.6, lh: 1.08, weight: 700, tracking: '-0.035em', use: 'One per page. The hero headline.' },
  h2: { label: 'H2', family: 'heading', minPx: 28, maxPx: 44, basePx: 20.8, vw: 1.6, lh: 1.15, weight: 700, tracking: '-0.025em', use: 'Section headings.' },
  h3: { label: 'H3', family: 'heading', minPx: 20, maxPx: 24, basePx: 18.4, vw: 0.45, lh: 1.3, weight: 600, tracking: '-0.015em', use: 'Sub-sections, feature titles.' },
  h4: { label: 'H4', family: 'heading', minPx: 18, maxPx: 18, basePx: 18, vw: 0, lh: 1.4, weight: 600, tracking: '-0.01em', use: 'Small titles, accordion questions.' },
  lead: { label: 'Lead', family: 'sans', minPx: 17, maxPx: 20, basePx: 16, vw: 0.25, lh: 1.6, weight: 400, tracking: '0', use: 'Intro paragraph under a heading.' },
  body: { label: 'Body', family: 'sans', minPx: 16, maxPx: 16, basePx: 16, vw: 0, lh: 1.65, weight: 400, tracking: '0', use: 'Paragraphs. Never below 16px, which also stops iOS zooming into inputs.' },
  small: { label: 'Small', family: 'sans', minPx: 14, maxPx: 14, basePx: 14, vw: 0, lh: 1.55, weight: 400, tracking: '0', use: 'Hints, footer text, metadata.' },
  caption: { label: 'Caption', family: 'sans', minPx: 13, maxPx: 13, basePx: 13, vw: 0, lh: 1.4, weight: 500, tracking: '0.01em', use: 'Image captions, badges, labels.' },
  button: { label: 'Button', family: 'sans', minPx: 15, maxPx: 15, basePx: 15, vw: 0, lh: 1.25, weight: 600, tracking: '0.005em', use: 'Buttons and navigation links.' },
};

const clampFor = (t) =>
  t.vw === 0 ? rem(t.minPx) : `clamp(${rem(t.minPx)}, ${rem(t.basePx)} + ${t.vw}vw, ${rem(t.maxPx)})`;

/** Computed size in px at a given viewport width (used by the style guide table). */
export const sizeAt = (t, width) =>
  Math.round(Math.min(t.maxPx, Math.max(t.minPx, t.basePx + (t.vw * width) / 100)) * 10) / 10;

/** Shape Tailwind expects for theme.fontSize. */
export const fontSizeConfig = Object.fromEntries(
  Object.entries(typeScale).map(([key, t]) => [
    key,
    [clampFor(t), { lineHeight: String(t.lh), letterSpacing: t.tracking, fontWeight: String(t.weight) }],
  ]),
);

/* ------------------------------------------------------------- breakpoints */

/** Tailwind screens. Unprefixed classes = 320px and up. */
export const screens = {
  xs: '375px',
  sm: '430px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px',
};

/**
 * Not "shrink the desktop". Each row is a layout decision.
 * `cols` is the 12-column grid collapsing to 4 / 8 / 12.
 */
export const breakpoints = [
  { key: 'base', min: 320, device: 'Small phones', cols: 4, gutter: 16, layout: 'One column. Full-width buttons. Nothing side by side except icon and text. Sticky call / book bar at the bottom.' },
  { key: 'xs', min: 375, device: 'Standard phones', cols: 4, gutter: 24, layout: 'Same structure, more breathing room. Hero media drops below the actions in a 4:5 arch.' },
  { key: 'sm', min: 430, device: 'Large phones', cols: 4, gutter: 24, layout: 'Two buttons can sit side by side. Compact pairs (rating and review count) share a row.' },
  { key: 'md', min: 768, device: 'Tablets', cols: 8, gutter: 32, layout: 'Split layouts appear. Two-column lists. Header gains the booking button. Bottom bar retires.' },
  { key: 'lg', min: 1024, device: 'Small laptops', cols: 12, gutter: 40, layout: 'Inline navigation. Asymmetric 5 / 7 splits. Three-column lists. Ruled rows replace stacked blocks.' },
  { key: 'xl', min: 1280, device: 'Laptops and desktops', cols: 12, gutter: 40, layout: 'Content reaches its 1200px maximum. Section spacing steps up to 128px.' },
  { key: '2xl', min: 1440, device: 'Large displays', cols: 12, gutter: 40, layout: 'Container stops growing; the page gains margin, not width. Type is at its maximum. Tinted bands may run edge to edge.' },
];

/* ------------------------------------------------------------------ layout */

/** 8px system. Values in px. Half-steps (4px) are for optical fixes only. */
export const layout = {
  contentMax: 1200,
  proseMax: 720,
  gutters: { base: 16, xs: 24, md: 32, lg: 40 },
  sectionY: { base: 64, md: 96, xl: 128 },
  headerH: { base: 64, md: 72, xl: 72 },
  gridGap: { base: 16, md: 24, lg: 32 },
  cardPadding: { base: 24, md: 32 },
  control: { sm: 40, md: 48, lg: 56 },
  spaceScale: [8, 16, 24, 32, 40, 48, 64, 80, 96, 128],
};

/* ------------------------------------------------------------ shape & depth */

/**
 * Radius has a hierarchy: crisp controls, calm surfaces, generous media.
 * The arch (fully rounded top edge) is the brand's signature shape, reserved for imagery.
 */
export const radius = {
  none: '0',
  sm: '6px',
  md: '10px',
  lg: '16px',
  xl: '28px',
  full: '9999px',
};

/** Cool, navy-tinted. Shadows are for things that float (menus, sticky bar), not for every card. */
export const shadows = {
  xs: '0 1px 2px 0 rgb(9 43 60 / 0.06)',
  sm: '0 1px 2px 0 rgb(9 43 60 / 0.04), 0 4px 12px -2px rgb(9 43 60 / 0.06)',
  md: '0 2px 4px -1px rgb(9 43 60 / 0.04), 0 12px 24px -8px rgb(9 43 60 / 0.10)',
  lg: '0 4px 8px -2px rgb(9 43 60 / 0.04), 0 28px 56px -16px rgb(9 43 60 / 0.18)',
  focus: '0 0 0 4px rgb(42 122 153 / 0.20)',
  'focus-danger': '0 0 0 4px rgb(180 35 24 / 0.16)',
};

export const motion = {
  easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
  fast: '150ms',
  base: '200ms',
  slow: '300ms',
};
