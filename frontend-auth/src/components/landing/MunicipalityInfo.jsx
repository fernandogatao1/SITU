import { TrendingUp, Users, Ruler, Gauge } from 'lucide-react'
import Sparkline from '@/components/ui/Sparkline'
import Meter from '@/components/ui/Meter'
import Reveal from '@/components/ui/Reveal'
import Badge from '@/components/ui/Badge'
import { int, dec, pct } from '@/utils/format'

/**
 * Seção de informações do município (dados MOCK — ver src/data/municipios.js).
 * Preparada para substituição pela API mantendo o mesmo formato de dados.
 * @param {{ municipio: import('@/data/municipios').Municipio }} props
 */
export default function MunicipalityInfo({ municipio }) {
  const m = municipio
  return (
    <section id="municipio" className="bg-canvas px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {m.nome} <span className="text-subtle">— {m.uf}</span>
            </h2>
            <p className="mt-2 text-[15px] text-muted">Indicadores territoriais · ano-base {m.anoBase}</p>
          </div>
          <Badge tone="neutral">Dados demonstrativos</Badge>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* População + série */}
          <Reveal className="sm:col-span-2 lg:col-span-1">
            <article className="flex h-full flex-col justify-between rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="flex items-center gap-1.5 text-[13px] text-muted">
                    <Users size={14} className="text-primary" aria-hidden="true" /> População estimada
                  </p>
                  <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink tabular-nums">
                    {int(m.populacao)}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2 py-1 text-[12px] font-semibold text-primary">
                  <TrendingUp size={13} aria-hidden="true" /> {pct(m.crescimentoAnual)}/ano
                </span>
              </div>
              <Sparkline data={m.popSerie} width={220} height={44} className="mt-4 w-full" />
            </article>
          </Reveal>

          {/* Densidade / Área urbana */}
          <Reveal delay={60}>
            <div className="grid h-full grid-rows-2 gap-4">
              <Stat icon={Gauge} label="Densidade demográfica" value={dec(m.densidade)} unit="hab/km²" />
              <Stat icon={Ruler} label="Área urbana" value={dec(m.areaUrbanaKm2)} unit="km²" />
            </div>
          </Reveal>

          {/* Medidores */}
          <Reveal delay={120}>
            <article className="flex h-full flex-col gap-5 rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)]">
              <Meter label="Cobertura de saneamento" value={m.saneamento} />
              <Meter label="Índice de arborização" value={m.arborizacao} />
              <p className="mt-auto text-[12px] text-subtle">
                Fontes: IBGE, SNIS, IPECE · atualização diária
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Stat({ icon: Icon, label, value, unit }) {
  return (
    <article className="rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)]">
      <p className="flex items-center gap-1.5 text-[13px] text-muted">
        <Icon size={14} className="text-primary" aria-hidden="true" /> {label}
      </p>
      <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink tabular-nums">
        {value} <span className="text-[13px] font-medium text-subtle">{unit}</span>
      </p>
    </article>
  )
}
