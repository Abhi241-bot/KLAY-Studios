'use client'

import { useEffect, useRef, useState } from 'react'

type CursorMode = 'default' | 'view' | 'play' | 'drag'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<CursorMode>('default')
  const [isVisible, setIsVisible] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const rafId = useRef<number>(0)

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n

    function loop() {
      current.current.x = lerp(current.current.x, pos.current.x, 0.12)
      current.current.y = lerp(current.current.y, pos.current.y, 0.12)

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`
      }
      if (pillRef.current) {
        pillRef.current.style.transform = `translate(${current.current.x - 40}px, ${current.current.y - 40}px)`
      }
      rafId.current = requestAnimationFrame(loop)
    }

    rafId.current = requestAnimationFrame(loop)

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)
    }

    const onEnterView = () => setMode('view')
    const onEnterPlay = () => setMode('play')
    const onEnterDrag = () => setMode('drag')
    const onLeave = () => setMode('default')

    document.addEventListener('mousemove', onMove)

    // Wire up data-cursor attributes
    const attach = () => {
      document.querySelectorAll('[data-cursor="view"]').forEach(el => {
        el.addEventListener('mouseenter', onEnterView)
        el.addEventListener('mouseleave', onLeave)
      })
      document.querySelectorAll('[data-cursor="play"]').forEach(el => {
        el.addEventListener('mouseenter', onEnterPlay)
        el.addEventListener('mouseleave', onLeave)
      })
      document.querySelectorAll('[data-cursor="drag"]').forEach(el => {
        el.addEventListener('mouseenter', onEnterDrag)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    attach()
    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(rafId.current)
      document.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [isVisible])

  const isExpanded = mode !== 'default'
  const label = mode === 'view' ? 'VIEW' : mode === 'play' ? 'PLAY' : mode === 'drag' ? 'DRAG' : ''

  return (
    <>
      {/* Small instant dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-2 h-2 rounded-full bg-terracotta-500 transition-opacity duration-300"
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      {/* Lerped pill */}
      <div
        ref={pillRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9997] flex items-center justify-center transition-all duration-300 ease-expo-out"
        style={{
          width: isExpanded ? '80px' : '2px',
          height: isExpanded ? '80px' : '2px',
          borderRadius: isExpanded ? '40px' : '1px',
          backgroundColor: isExpanded ? 'var(--color-terracotta-500)' : 'transparent',
          opacity: isVisible ? 1 : 0,
        }}
      >
        {isExpanded && (
          <span className="text-white text-label tracking-label font-display font-medium">
            {label}
          </span>
        )}
      </div>
    </>
  )
}
