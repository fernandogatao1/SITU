import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

const VARIANTS = {
  primary:
    'bg-primary text-white hover:bg-primary-hover shadow-[0_1px_2px_rgba(16,35,27,0.12)]',
  outline:
    'bg-surface text-ink border border-line hover:border-ink/25 hover:bg-black/[0.015]',
  ghost: 'bg-transparent text-muted hover:text-ink hover:bg-black/[0.03]',
  // Landing (tema escuro)
  gradient:
    'text-white bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-600 shadow-[0_8px_24px_-8px_rgba(16,185,129,0.6)] hover:shadow-[0_10px_30px_-8px_rgba(16,185,129,0.7)] focus-visible:ring-emerald-400/40',
  glass:
    'text-white border border-white/15 bg-white/[0.06] backdrop-blur-md hover:bg-white/[0.12] hover:border-white/25 focus-visible:ring-white/30',
}

const SIZES = {
  sm: 'h-9 px-3.5 text-[13px]',
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-5 text-[15px]',
}

/**
 * Botão base reutilizável (auth + landing).
 * Movimento: feedback de press (transform) + transição de sombra/cor, curto e gated.
 * @param {{
 *   variant?: keyof typeof VARIANTS,
 *   size?: keyof typeof SIZES,
 *   fullWidth?: boolean,
 * } & React.ButtonHTMLAttributes<HTMLButtonElement>} props
 */
const Button = forwardRef(function Button(
  { variant = 'primary', size = 'lg', fullWidth = true, className, type = 'button', children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium',
        'transition-[background,background-color,border-color,color,transform,box-shadow] duration-150 ease-out',
        'active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-soft',
        'disabled:cursor-not-allowed disabled:opacity-55 disabled:active:scale-100',
        fullWidth ? 'w-full' : 'w-auto',
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})

export default Button
