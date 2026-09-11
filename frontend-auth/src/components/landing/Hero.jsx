import { Navigation, LineChart, Database, Map, Gauge, Building2, Network } from 'lucide-react'
import Logo from '@/components/brand/Logo'
import CitySelector from './CitySelector'

const STATS = [
  { icon: Navigation, value: '12', label: 'bairros mapeados' },
  { icon: LineChart, value: '48', label: 'indicadores ativos' },
  { icon: Database, value: '5', label: 'anos de dados' },
]

const MODULES = [
  { icon: Map, title: 'Mapeamento\nGeoespacial', desc: 'Visualização interativa de dados territoriais com camadas de infraestrutura, vulnerabilidade e uso do solo integradas em um único painel.' },
  { icon: Gauge, title: 'Indicadores\nSocioespaciais', desc: 'Cruzamento de dados demográficos, de renda e acesso a serviços para identificar áreas de vulnerabilidade e priorizar intervenções.' },
  { icon: Building2, title: 'Planejamento\nUrbano', desc: 'Suporte à tomada de decisão para gestores públicos com base em evidências territoriais precisas e atualizadas.' },
  { icon: Network, title: 'Infraestrutura\nIntegrada', desc: 'Monitoramento de saneamento, mobilidade, saúde e educação em tempo real para gestão coordenada de recursos municipais.' },
]

// Vidro glossy (luz no topo) — como no material do designer
const glassCircle = {
  background: 'linear-gradient(180deg, rgba(255,255,255,0.17), rgba(255,255,255,0.04))',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.28), 0 12px 30px -12px rgba(0,0,0,0.5)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
}
const glassCard = {
  background: 'linear-gradient(180deg, rgba(255,255,255,0.11), rgba(255,255,255,0.03))',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 18px 44px -20px rgba(0,0,0,0.55)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
}

/** Hero urbdash — reprodução fiel do material do designer (uma dobra). */
export default function Hero({ municipio, municipios, onSelect }) {
  return (
    <section id="topo" className="relative isolate flex min-h-dvh flex-col justify-center overflow-hidden">
      {/* Fundo: cidade de dia, com duotone azul e brilho controlado */}
      <img src="/brand-hero.jpg" alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-50" />
      <div className="absolute inset-0 -z-10" style={{ background: 'linear-gradient(180deg, rgba(13,52,104,0.70) 0%, rgba(9,36,72,0.90) 100%)' }} />

      <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-24 sm:px-8 lg:pt-28">
        {/* Topo: logo + seletor / título + indicadores */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-8">
          <div className="animate-rise shrink-0 lg:w-72">
            <Logo size={46} withTagline className="items-start" />
            <div className="mt-7 max-w-[17rem]">
              <CitySelector options={municipios} value={municipio.id} onChange={onSelect} />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-center font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[44px]">
              Dados que <span className="font-extrabold">transformam</span> cidades
            </h1>

            <div className="mt-12 flex flex-wrap items-start justify-center gap-x-14 gap-y-8 sm:gap-x-20">
              {STATS.map((s) => (
                <div key={s.label} className="flex w-32 flex-col items-center text-center">
                  <span className="flex h-28 w-28 items-center justify-center rounded-full border border-white/25" style={glassCircle}>
                    <s.icon size={38} strokeWidth={1.6} className="text-white" aria-hidden="true" />
                  </span>
                  <p className="mt-5 text-[15px] leading-snug text-white/85">
                    <span className="font-display font-bold text-white">{s.value}</span> {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cartões de eixos */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MODULES.map((m) => (
            <article
              key={m.title}
              className="flex flex-col items-center rounded-[26px] border border-white/20 p-7 text-center transition-transform duration-200 ease-out hover:-translate-y-1"
              style={glassCard}
            >
              <m.icon size={42} strokeWidth={1.5} className="text-white" aria-hidden="true" />
              <h2 className="mt-5 whitespace-pre-line font-display text-[23px] font-bold leading-tight tracking-tight text-white">
                {m.title}
              </h2>
              <div className="mt-5 rounded-2xl border border-white/12 p-4" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <p className="text-[13.5px] leading-relaxed text-white/80">{m.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
