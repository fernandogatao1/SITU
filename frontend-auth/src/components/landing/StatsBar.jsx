import { Building, Activity, History, Database, RefreshCw } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { useCountUp } from '@/hooks/useCountUp'
import { int } from '@/utils/format'

/**
 * Faixa de indicadores resumidos com contadores animados (dispara ao entrar em vista).
 * @param {{ municipio: import('@/data/municipios').Municipio }} props
 */
export default function StatsBar({ municipio }) {
  const [ref, inView] = useInView({ threshold: 0.4 })

  const bairros = useCountUp(municipio.bairros, inView)
  const indicadores = useCountUp(municipio.indicadores, inView)
  const anos = useCountUp(municipio.popSerie.length, inView)
  const fontes = useCountUp(municipio.fontes, inView)

  const items = [
    { icon: Building, value: int(bairros), label: 'Bairros' },
    { icon: Activity, value: int(indicadores), label: 'Indicadores' },
    { icon: History, value: `${int(anos)} anos`, label: 'Histórico' },
    { icon: Database, value: int(fontes), label: 'Fontes de dados' },
    { icon: RefreshCw, value: 'Diária', label: 'Atualização' },
  ]

  return (
    <section className="bg-canvas px-5 pb-4 sm:px-8">
      <div
        ref={ref}
        className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-[var(--shadow-card)] sm:grid-cols-3 lg:grid-cols-5"
      >
        {items.map((it) => (
          <div key={it.label} className="flex items-center gap-3 bg-surface px-5 py-5">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <it.icon size={17} aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-xl font-semibold tracking-tight text-ink tabular-nums">{it.value}</p>
              <p className="text-[12.5px] text-muted">{it.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
