import { forwardRef, useId } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/utils/cn'

/**
 * Checkbox acessível com rótulo clicável. Usa o input nativo (peer) para estado
 * e foco; o quadrado visual é desenhado por cima.
 * @param {{ label: React.ReactNode, error?: string } & React.InputHTMLAttributes<HTMLInputElement>} props
 */
const Checkbox = forwardRef(function Checkbox({ label, id, className, error, ...props }, ref) {
  const autoId = useId()
  const inputId = id || autoId

  return (
    <label htmlFor={inputId} className={cn('group flex cursor-pointer items-start gap-2.5', className)}>
      <span className="relative mt-0.5 inline-flex">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          aria-invalid={Boolean(error)}
          className="peer h-[18px] w-[18px] shrink-0 appearance-none rounded-[6px] border border-line bg-surface transition-[background-color,border-color] duration-150 ease-out checked:border-primary checked:bg-primary hover:border-ink/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-soft"
          {...props}
        />
        <Check
          size={13}
          strokeWidth={3}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity duration-150 ease-out peer-checked:opacity-100"
        />
      </span>
      <span className="select-none text-[13.5px] leading-snug text-muted">{label}</span>
    </label>
  )
})

export default Checkbox
