import { useEffect, useRef, useState } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * Anima um número de 0 até `end` quando `active` fica verdadeiro.
 * Respeita prefers-reduced-motion (mostra o valor final direto).
 * @param {number} end
 * @param {boolean} active
 * @param {number} [duration] ms
 * @returns {number}
 */
export function useCountUp(end, active, duration = 1400) {
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!active || started.current) return
    started.current = true

    if (prefersReducedMotion()) {
      setValue(end)
      return
    }

    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      setValue(Math.round(end * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, end, duration])

  return value
}
