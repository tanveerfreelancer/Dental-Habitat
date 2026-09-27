/**
 * A simple, original phone-in-a-chat-bubble glyph (not a reproduction of any brand's logo artwork), used to
 * signal "message us" wherever the WhatsApp button appears. Single colour, inherits currentColor.
 */
export default function WhatsAppIcon({ size = 28, className }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M16 4.5c6.35 0 11.5 5.15 11.5 11.5 0 6.35-5.15 11.5-11.5 11.5-2.02 0-3.98-.52-5.7-1.52L4.5 27.5l1.55-5.62A11.44 11.44 0 0 1 4.5 16C4.5 9.65 9.65 4.5 16 4.5Z"
        fill="currentColor"
        fillOpacity="0.001"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M11.6 10.9c.3-.62.55-.63.85-.64.23-.01.5-.01.72.01.24.02.58-.09.9.7.35.85 1.18 2.93 1.28 3.14.1.21.17.46.03.73-.13.27-.2.43-.4.66-.2.23-.42.51-.6.68-.2.2-.41.41-.18.8.24.4 1.05 1.72 2.24 2.78 1.54 1.37 2.84 1.8 3.24 2 .4.2.63.17.87-.1.24-.28 1-1.16 1.27-1.56.27-.4.53-.33.9-.2.36.13 2.3 1.08 2.7 1.28.4.2.66.3.76.47.1.17.1.98-.23 1.93-.34.95-1.96 1.87-2.7 1.97-.72.1-1.35.28-4.55-.95-3.85-1.49-6.28-5.43-6.47-5.68-.19-.26-1.55-2.06-1.55-3.94 0-1.88.99-2.8 1.34-3.18Z"
        fill="currentColor"
      />
    </svg>
  );
}
