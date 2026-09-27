import { colors as c } from '@/design/tokens';

/**
 * Placeholder hero artwork, used until the clinic's photography exists (see site.heroImage).
 * A quiet interior: an arched window, light on the floor, a pendant lamp and a plant.
 * Drawn only in brand tokens. It fills its container (4:5) and is cropped by the arch.
 * Its label describes what it depicts, and nothing more.
 */
export const HERO_VISUAL_LABEL = 'Illustration of a calm, bright room with an arched window, a pendant lamp and a plant, in navy and aqua tones';

export default function HeroVisual({ label = HERO_VISUAL_LABEL }) {
  return (
    <svg viewBox="0 0 480 600" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label} className="absolute inset-0 h-full w-full">
      {/* wall and floor */}
      <rect width="480" height="600" fill={c.brand[100]} />
      <rect y="440" width="480" height="160" fill={c.brand[200]} />
      <rect y="436" width="480" height="4" fill={c.brand[300]} />

      {/* light from the window, falling across the floor */}
      <polygon points="130,440 330,440 292,600 44,600" fill="#fff" opacity="0.6" />
      <polygon points="222,440 238,440 196,600 160,600" fill={c.brand[300]} opacity="0.4" />

      {/* arched window */}
      <path d="M118 402V206a112 112 0 0 1 224 0v196z" fill={c.brand[800]} />
      <path d="M130 402V208a100 100 0 0 1 200 0v194z" fill={c.aqua[50]} />
      <path d="M130 402V300L250 402z" fill="#fff" opacity="0.55" />
      <path d="M230 108v294M130 262h200" stroke={c.brand[800]} strokeWidth="5" />
      <rect x="106" y="402" width="248" height="12" rx="2" fill={c.brand[400]} />

      {/* pendant lamp */}
      <path d="M86 0v168" stroke={c.brand[800]} strokeWidth="2" />
      <path d="M62 196a24 24 0 0 1 48 0z" fill={c.brand[800]} />
      <ellipse cx="86" cy="200" rx="17" ry="4.5" fill={c.aqua[300]} />

      {/* plant */}
      <ellipse cx="395" cy="588" rx="44" ry="6" fill={c.brand[400]} opacity="0.45" />
      <g transform="translate(295 0)">
        <path d="M100 520C88 470 88 420 100 372C112 420 112 470 100 520Z" fill={c.aqua[600]} />
        <path d="M100 520C70 490 48 450 46 408C78 428 96 470 100 520Z" fill={c.aqua[500]} />
        <path d="M100 520C130 495 150 460 156 424C124 438 104 476 100 520Z" fill={c.aqua[400]} />
        <path d="M100 520C66 512 34 490 22 462C56 466 88 486 100 520Z" fill={c.aqua[700]} />
        <path d="M100 520C132 516 160 500 176 476C144 476 114 490 100 520Z" fill={c.aqua[500]} />
        <path d="M70 520h60l-7 64H77z" fill={c.brand[700]} />
      </g>
    </svg>
  );
}
