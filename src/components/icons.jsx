// Inline SVG icon set — keeps the bundle dependency-free and maps 1:1 to
// Elementor icon widgets when the design is rebuilt in WordPress.
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
}

const paths = {
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  heart: (
    <path d="M12 20s-7-4.35-7-9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7 3.5C19 15.65 12 20 12 20Z" />
  ),
  cart: (
    <>
      <path d="M3 4h2l2.4 10.5A2 2 0 0 0 9.35 16h7.9a2 2 0 0 0 1.95-1.55L21 8H6" />
      <circle cx="10" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.4 3.6 5.4 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.4-3.6-8.5S9.6 5.9 12 3.5Z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 5 6.2v5.3c0 4.2 2.9 7.3 7 9 4.1-1.7 7-4.8 7-9V6.2L12 3.5Z" />
      <path d="m9 12 2.2 2.2L15.4 10" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4c-8 0-13 3.6-13 9a5 5 0 0 0 5 5c5.4 0 8-5 8-14Z" />
      <path d="M4 20c1.5-5 5-8.5 10-10.5" />
    </>
  ),
  arrowRight: <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" />,
  arrowUpRight: <path d="M7 17 17 7m0 0H8m9 0v9" />,
  star: (
    <path
      d="m12 4 2.35 4.9 5.15.72-3.75 3.72.9 5.26L12 16.1l-4.65 2.5.9-5.26L4.5 9.62l5.15-.72L12 4Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  badgeCheck: (
    <>
      <path d="m12 2.8 2.3 1.7 2.85-.2 1 2.68 2.4 1.6-.62 2.8.62 2.8-2.4 1.6-1 2.68-2.85-.2L12 21.2l-2.3-1.7-2.85.2-1-2.68-2.4-1.6.62-2.8L3.45 9.8l2.4-1.6 1-2.68 2.85.2L12 2.8Z" />
      <path d="m9.2 12.1 1.9 1.9 3.9-4" />
    </>
  ),
  truck: (
    <>
      <path d="M3 7h9v9H3zM12 10h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="16.5" cy="18" r="1.6" />
    </>
  ),
  box: (
    <>
      <path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" />
      <path d="m4 7 8 4 8-4M12 11v10" />
    </>
  ),
  filter: <path d="M4 6h16M7 12h10M10 18h4" />,
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  plus: <path d="M12 5v14M5 12h14" />,
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  phone: (
    <path d="M6.5 3.5h2.2l1.6 3.9-1.9 1.4a11 11 0 0 0 5.3 5.3l1.4-1.9 3.9 1.6v2.2a2.5 2.5 0 0 1-2.7 2.5C10.6 18.1 5.4 12.9 4 6.2A2.5 2.5 0 0 1 6.5 3.5Z" />
  ),
  pin: (
    <>
      <path d="M12 21s6.5-5.6 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15.4 12 21 12 21Z" />
      <circle cx="12" cy="10.3" r="2.4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  sparkle: (
    <path d="M12 3.5 13.6 9 19 10.6 13.6 12.2 12 17.7 10.4 12.2 5 10.6 10.4 9 12 3.5Z" />
  ),
  doc: (
    <>
      <path d="M6 3.5h7l5 5v12H6z" />
      <path d="M13 3.5v5h5M9 13h6M9 16.5h4" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.3" />
      <path d="M3 19a6 6 0 0 1 12 0M16 6.2a3 3 0 0 1 0 5.9M17.5 19h3.5a4.8 4.8 0 0 0-3-4.4" />
    </>
  ),
}

export function Icon({ name, className = 'h-5 w-5', strokeWidth, ...rest }) {
  const glyph = paths[name]
  if (!glyph) return null
  return (
    <svg
      {...base}
      strokeWidth={strokeWidth ?? base.strokeWidth}
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {glyph}
    </svg>
  )
}

export default Icon
