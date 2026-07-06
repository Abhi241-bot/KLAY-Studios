import { ArrowDown } from 'lucide-react'

export function ScrollDownCue() {
  return (
    <div className="flex flex-col items-center gap-3" aria-hidden="true">
      <span className="text-label tracking-label text-white/60 font-display">SCROLL</span>
      <div className="relative w-px h-10 bg-white/20 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full bg-terracotta-300"
          style={{
            height: '100%',
            animation: 'scrollDownLine 1.8s ease-in-out infinite',
            transformOrigin: 'top',
          }}
        />
      </div>
    </div>
  )
}
