import { forwardRef, useId } from 'react'
import { cn } from '@/utils/cn'
import FormError from './FormError'

/**
 * Campo de texto acessível: label associado, estados de foco/erro/sucesso,
 * slot de ícone à esquerda e adorno opcional à direita.
 *
 * @param {{
 *   label?: string,
 *   labelAction?: React.ReactNode,
 *   error?: string,
 *   hint?: string,
 *   icon?: React.ReactNode,
 *   rightSlot?: React.ReactNode,
 *   success?: boolean,
 *   containerClassName?: string,
 * } & React.InputHTMLAttributes<HTMLInputElement>} props
 */
const Input = forwardRef(function Input(
  { label, labelAction, error, hint, icon, rightSlot, success, id, className, containerClassName, ...props },
  ref
) {
  const autoId = useId()
  const inputId = id || autoId
  const errorId = `${inputId}-error`
  const hintId = `${inputId}-hint`

  return (
    <div className={cn('flex flex-col gap-1.5', containerClassName)}>
      {(label || labelAction) && (
        <div className="flex items-center justify-between gap-2">
          {label ? (
            <label htmlFor={inputId} className="text-[13px] font-medium text-ink">
              {label}
            </label>
          ) : (
            <span />
          )}
          {labelAction}
        </div>
      )}

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={cn(error && errorId, hint && hintId) || undefined}
          className={cn(
            'h-11 w-full rounded-md border bg-surface text-[15px] text-ink',
            'placeholder:text-subtle',
            'transition-[border-color,box-shadow] duration-150 ease-out',
            'focus:outline-none focus:border-primary focus:shadow-[var(--shadow-focus)]',
            'disabled:cursor-not-allowed disabled:bg-black/[0.02] disabled:text-muted',
            icon ? 'pl-10' : 'pl-3.5',
            rightSlot ? 'pr-11' : 'pr-3.5',
            error
              ? 'border-danger focus:border-danger focus:shadow-[0_0_0_4px_var(--color-danger-soft)]'
              : success
                ? 'border-success'
                : 'border-line hover:border-ink/20',
            className
          )}
          {...props}
        />
        {rightSlot && (
          <span className="absolute right-1 top-1/2 -translate-y-1/2">{rightSlot}</span>
        )}
      </div>

      {hint && !error && (
        <p id={hintId} className="text-[12.5px] text-muted">
          {hint}
        </p>
      )}
      <FormError id={errorId}>{error}</FormError>
    </div>
  )
})

export default Input
