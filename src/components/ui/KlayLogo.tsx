interface KlayLogoProps {
  className?: string
  style?: React.CSSProperties
}

export function KlayLogo({ className = '', style }: KlayLogoProps) {
  return (
    <svg
      viewBox="0 0 120 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-7 w-auto ${className}`}
      style={style}
      aria-label="KLAY Interiors"
    >
      {/* K */}
      <path d="M2 4h3v8l7-8h4l-8 8.5L18 24h-4l-6-8.5-3 3V24H2V4z" fill="currentColor" />
      {/* L */}
      <path d="M21 4h3v17h9v3H21V4z" fill="currentColor" />
      {/* A */}
      <path d="M44 4h3l8 20h-3.2l-1.8-4.5h-9l-1.8 4.5H36L44 4zm3.5 12.5-3.5-9-3.5 9h7z" fill="currentColor" />
      {/* Y */}
      <path d="M66 4l-7 11v9h-3v-9L49 4h3.5L58 12l5.5-8H66z" fill="currentColor" />
      {/* Dot accent */}
      <circle cx="72" cy="22" r="2" fill="#C1592E" />
    </svg>
  )
}
