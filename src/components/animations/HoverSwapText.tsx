import Link from 'next/link'

interface HoverSwapLinkProps {
  href: string
  children: string
  className?: string
  onClick?: () => void
  style?: React.CSSProperties
}

export function HoverSwapLink({ href, children, className = '', onClick, style }: HoverSwapLinkProps) {
  return (
    <Link href={href} className={`hover-swap group ${className}`} onClick={onClick} style={style}>
      <span className="hover-swap__inner">{children}</span>
      <span className="hover-swap__alt text-terracotta-500">{children}</span>
    </Link>
  )
}

interface HoverSwapButtonProps {
  children: string
  className?: string
  onClick?: () => void
}

export function HoverSwapButton({ children, className = '', onClick }: HoverSwapButtonProps) {
  return (
    <button className={`hover-swap ${className}`} onClick={onClick}>
      <span className="hover-swap__inner">{children}</span>
      <span className="hover-swap__alt text-terracotta-500">{children}</span>
    </button>
  )
}
