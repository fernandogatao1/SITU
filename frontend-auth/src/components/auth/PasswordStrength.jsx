import { usePasswordStrength } from '@/hooks/usePasswordStrength'
import { cn } from '@/utils/cn'

const TONE = {
  idle: { bar: 'bg-line', text: 'text-subtle' },
  weak: { bar: 'bg-danger', text: 'text-danger' },
  medium: { bar: 'bg-amber-500', text: 'text-amber-600' },
  strong: { bar: 'bg-success', text: 'text-success' },
}

/**
 * Medidor de força ao vivo. A barra anima por transform: scaleX (GPU),
 * origin à esquerda — evita animar largura.
 * @param {{ password: string }} props
 */
export default function PasswordStrength({ password }) {
  const { score, label, tone } = usePasswordStrength(password)
  const t = TONE[tone]
  const fill = score / 4

  return (
    <div className="mt-1" aria-live="polite">
      <div className="h-1 w-full overflow-hidden rounded-full bg-line">
        <div
          className={cn('h-full origin-left rounded-full transition-transform duration-200 ease-out', t.bar)}
          style={{ transform: `scaleX(${fill})` }}
        />
      </div>
      <p className={cn('mt-1.5 text-[12px] font-medium', t.text)}>
        Força da senha: {label}
      </p>
    </div>
  )
}
