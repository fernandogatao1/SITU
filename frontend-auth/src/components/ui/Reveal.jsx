import { cn } from '@/utils/cn'
import { useInView } from '@/hooks/useInView'

/**
 * Envolve conteúdo com reveal-on-scroll (fade + slide up).
 * `delay` permite efeito stagger. Respeita prefers-reduced-motion (via CSS).
 * @param {{ as?: any, delay?: number, className?: string, children: React.ReactNode }} props
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className, children, ...props }) {
  const [ref, inView] = useInView()
  return (
    <Tag
      ref={ref}
      style={{ '--reveal-delay': `${delay}ms` }}
      className={cn('reveal', inView && 'is-visible', className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
