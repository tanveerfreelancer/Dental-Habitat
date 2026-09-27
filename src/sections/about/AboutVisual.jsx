import { colors as c } from '@/design/tokens';

/**
 * Placeholder About artwork, used until the clinic's photography exists (see site.aboutImage).
 * A calm seating corner: an arched doorway, an armchair, and a side table with a lamp.
 * Brand tokens only. Fills its container (4:5) and is cropped by the arch.
 */
export const ABOUT_VISUAL_LABEL = 'Illustration of a calm seating corner with an armchair, a side table lamp and an arched doorway, in navy and aqua tones';

export default function AboutVisual({ label = ABOUT_VISUAL_LABEL }) {
  return (
    <svg viewBox="0 0 480 600" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label} className="absolute inset-0 h-full w-full">
      {/* wall and floor */}
      <rect width="480" height="600" fill={c.brand[100]} />
      <rect y="470" width="480" height="130" fill={c.brand[200]} />
      <rect y="466" width="480" height="4" fill={c.brand[300]} />

      {/* arched doorway with soft light beyond */}
      <path d="M138 466V214a102 102 0 0 1 204 0v252z" fill={c.brand[800]} />
      <path d="M150 466V216a90 90 0 0 1 180 0v250z" fill={c.aqua[50]} />
      <path d="M150 466V330L330 250V466z" fill="#fff" opacity="0.6" />
      <path d="M150 300V216a90 90 0 0 1 22-59" stroke={c.aqua[200]} strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.8" />

      {/* rug and floor shadows */}
      <ellipse cx="236" cy="566" rx="210" ry="20" fill={c.brand[300]} opacity="0.45" />

      {/* armchair */}
      <rect x="74" y="500" width="9" height="46" rx="3" fill={c.brand[900]} />
      <rect x="206" y="500" width="9" height="46" rx="3" fill={c.brand[900]} />
      <rect x="72" y="336" width="146" height="128" rx="34" fill={c.brand[700]} />
      <rect x="44" y="404" width="40" height="104" rx="18" fill={c.brand[800]} />
      <rect x="206" y="404" width="40" height="104" rx="18" fill={c.brand[800]} />
      <rect x="62" y="438" width="166" height="58" rx="20" fill={c.brand[600]} />

      {/* side table and lamp */}
      <ellipse cx="392" cy="566" rx="34" ry="6" fill={c.brand[400]} opacity="0.5" />
      <rect x="388" y="492" width="8" height="70" rx="3" fill={c.brand[800]} />
      <ellipse cx="392" cy="490" rx="46" ry="9" fill={c.brand[800]} />
      <circle cx="392" cy="420" r="46" fill={c.aqua[100]} opacity="0.7" />
      <rect x="390" y="440" width="4" height="46" rx="2" fill={c.brand[800]} />
      <path d="M368 448L376 396H408L416 448Z" fill={c.aqua[300]} />
      <path d="M376 396h32l2 12h-36z" fill={c.aqua[200]} />
    </svg>
  );
}
