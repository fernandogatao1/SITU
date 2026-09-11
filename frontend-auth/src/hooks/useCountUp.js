import { useEffect, useRef, useState } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * Anima um número até `end` sempre que `end` muda (ex.: ao trocar de município)
 * ou quando `active` passa a verdadeiro. Anima do valor atual para o novo.
 * Respeita prefers-reduced-motion.
 * @param {number} end
 * @param {boolean} active
 * @param {number} [duration] ms
 * @returns {number}
 */
export function useCountUp(end, active, duration = 1200) {
  const [value, setValue] = useState(0)
  const fromRef = useRef(0)

  useEffect(() => {
    if (!active) return
    if (prefersReducedMotion()) {
      fromRef.current = end
      setValue(end)
      return
    }
    const from = fromRef.current
    const start = performance.now()
    let raf
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      const v = from + (end - from) * eased
      fromRef.current = v
      setValue(v)
      if (p < 1) raf = requestAnimationFrame(tick)
      else setValue(end)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, end, duration])

  return value
}
