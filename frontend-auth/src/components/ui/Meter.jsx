import { pct } from '@/utils/format'
import { cn } from '@/utils/cn'

/**
 * Medidor de progresso (0–100%). Barra anima por scaleX (GPU), origin à esquerda.
 * Acessível: role=progressbar + aria-valuenow.
 * @param {{ label: string, value: number, className?: string }} props
 */
export default function Meter({ label, value = 0, className }) {
  const v = Math.max(0, Math.min(100, value))
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex items-baseline justify-between">
        <span className="text-[13px] text-muted">{label}</span>
        <span className="font-display text-[14px] font-semibold text-ink tabular-nums">{pct(v)}</span>
      </div>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-label={label}
        aria-valuenow={Math.round(v)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full origin-left rounded-full bg-primary transition-transform duration-700 ease-out"
          style={{ transform: `scaleX(${v / 100})` }}
        />
      </div>
    </div>
  )
}
