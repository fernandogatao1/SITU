import { useEffect, useRef } from 'react'

/**
 * Parallax sutil baseado no mouse para o fundo do hero.
 * Escreve em variáveis CSS (--px / --py) via rAF — sem re-render do React.
 * Só ativa em ponteiro fino e com movimento permitido.
 * @param {number} [strength] deslocamento máximo em px
 * @returns {React.RefObject<any>}
 */
export function useParallax(strength = 14) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const finePointer = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduce) return

    let raf = 0
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--px', `${(-x * strength).toFixed(2)}px`)
        el.style.setProperty('--py', `${(-y * strength).toFixed(2)}px`)
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [strength])

  return ref
}
