import { LayoutGrid, BarChart3, Database, RefreshCw } from 'lucide-react'
import { useCountUp } from '@/hooks/useCountUp'
import { int, relativeDay } from '@/utils/format'

/**
 * Quatro widgets de indicadores do município selecionado (área direita do topo).
 * @param {{ municipio: import('@/data/municipios').Municipio }} props
 */
export default function DashboardCards({ municipio }) {
  const bairros = useCountUp(municipio.bairros, true)
  const indicadores = useCountUp(municipio.indicadores, true)
  const fontes = useCountUp(municipio.fontes, true)

  const cards = [
    { icon: LayoutGrid, value: int(bairros), label: 'Bairros mapeados' },
    { icon: BarChart3, value: int(indicadores), label: 'Indicadores disponíveis' },
    { icon: Database, value: int(fontes), label: 'Fontes de dados' },
    { icon: RefreshCw, value: relativeDay(municipio.atualizadoEm), label: 'Última atualização', small: true },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="glass rounded-2xl p-5 shadow-[var(--shadow-card)] transition-transform duration-200 ease-out hover:-translate-y-0.5"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary ring-1 ring-inset ring-primary/15">
            <c.icon size={19} aria-hidden="true" />
          </span>
          <p className={`mt-4 font-display font-semibold tracking-tight text-ink tabular-nums ${c.small ? 'text-2xl' : 'text-[32px] leading-none'}`}>
            {c.value}
          </p>
          <p className="mt-1.5 text-[13px] text-muted">{c.label}</p>
        </div>
      ))}
    </div>
  )
}
