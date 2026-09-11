import { useNavigate } from 'react-router-dom'
import { MapPin, BarChart3, Building2, Network, ArrowRight } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'

const MODULES = [
  {
    icon: MapPin,
    title: 'Mapeamento Geoespacial',
    desc: 'Camadas de infraestrutura, vulnerabilidade e uso do solo em um único painel interativo.',
  },
  {
    icon: BarChart3,
    title: 'Indicadores Socioespaciais',
    desc: 'Cruzamento de dados demográficos, de renda e acesso a serviços por setor.',
  },
  {
    icon: Building2,
    title: 'Planejamento Urbano',
    desc: 'Suporte à decisão para gestores públicos com base em evidências territoriais.',
  },
  {
    icon: Network,
    title: 'Infraestrutura Integrada',
    desc: 'Saneamento, mobilidade, saúde e educação monitorados de forma coordenada.',
  },
]

function ModuleCard({ icon: Icon, title, desc, onOpen }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] transition-[transform,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-primary/25">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary ring-1 ring-inset ring-primary/15 transition-transform duration-200 ease-out group-hover:scale-105">
        <Icon size={24} aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-display text-[18px] font-semibold tracking-tight text-ink">{title}</h3>
      <p className="mt-2 flex-1 text-[14px] leading-relaxed text-muted">{desc}</p>
      <button
        type="button"
        onClick={onOpen}
        className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary transition-colors hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        Acessar
        <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </button>
    </article>
  )
}

export default function FeatureGrid() {
  const navigate = useNavigate()
  return (
    <section id="modulos" className="bg-canvas px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Eixos do sistema
          </h2>
          <p className="mt-2 text-[15px] text-muted">
            Quatro frentes de análise territorial, integradas na mesma plataforma.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MODULES.map((m, i) => (
            <Reveal key={m.title} delay={i * 70} className="h-full">
              <ModuleCard {...m} onOpen={() => navigate('/login')} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
