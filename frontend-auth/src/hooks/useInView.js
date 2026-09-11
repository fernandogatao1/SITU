import { useEffect, useRef, useState } from 'react'

/**
 * Observa quando o elemento entra na viewport (uma vez).
 * Base para reveal-on-scroll e contadores animados.
 * @param {{ threshold?: number, rootMargin?: string }} [options]
 * @returns {[React.RefObject<any>, boolean]}
 */
export function useInView({ threshold = 0.2, rootMargin = '0px 0px -10% 0px' } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || inView) return

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [inView, threshold, rootMargin])

  return [ref, inView]
}
