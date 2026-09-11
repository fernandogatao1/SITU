import { AlertCircle } from 'lucide-react'
import { cn } from '@/utils/cn'

/**
 * Mensagem de erro (campo ou formulário). Comunica por texto + ícone (não só cor)
 * e anuncia via aria-live para leitores de tela.
 * @param {{ id?: string, children?: React.ReactNode, className?: string, role?: string }} props
 */
export default function FormError({ id, children, className, role = 'alert' }) {
  if (!children) return null
  return (
    <p
      id={id}
      role={role}
      aria-live="polite"
      className={cn(
        'animate-rise flex items-start gap-1.5 text-[13px] font-medium text-danger',
        className
      )}
    >
      <AlertCircle size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}
