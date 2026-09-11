import { useEffect, useState } from 'react'
import { cn } from '@/utils/cn'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * Slideshow com crossfade suave (só opacidade) das fotos da Serra da Ibiapaba.
 * Sem zoom/parallax. Pausa em hover; respeita prefers-reduced-motion.
 * @param {{ images: {src:string, alt:string}[], interval?: number }} props
 */
export default function HeroSlideshow({ images, interval = 5000 }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || prefersReducedMotion() || images.length <= 1) return
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), interval)
    return () => clearInterval(id)
  }, [paused, images.length, interval])

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="group"
      aria-roledescription="carrossel"
      aria-label="Fotos da Serra da Ibiapaba, Tianguá"
    >
      <div className="relative aspect-[16/9]">
        {images.map((img, i) => (
          <img
            key={img.src}
            src={img.src}
            alt={i === index ? img.alt : ''}
            aria-hidden={i !== index}
            loading={i === 0 ? 'eager' : 'lazy'}
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-out',
              i === index ? 'opacity-100' : 'opacity-0'
            )}
          />
        ))}

        {/* Legenda + fade inferior */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />
        <span className="absolute bottom-3 left-4 font-mono text-[11px] tracking-wide text-white/90">
          Serra da Ibiapaba · Tianguá, CE
        </span>

        {/* Indicadores */}
        <div className="absolute bottom-3 right-4 flex gap-1.5">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ver imagem ${i + 1}`}
              aria-current={i === index}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70',
                i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
