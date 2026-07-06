'use client'

interface MarqueeProps {
  children: React.ReactNode
  speed?: number
  direction?: 'left' | 'right'
  className?: string
  gap?: string
}

export function Marquee({
  children,
  speed = 30,
  direction = 'left',
  className = '',
  gap = '4rem',
}: MarqueeProps) {
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="marquee-track"
        style={{
          '--marquee-duration': `${speed}s`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
          gap,
        } as React.CSSProperties}
      >
        {/* Duplicate content to create seamless loop */}
        <div className="flex shrink-0 items-center" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" aria-hidden="true" style={{ gap }}>
          {children}
        </div>
      </div>
    </div>
  )
}
