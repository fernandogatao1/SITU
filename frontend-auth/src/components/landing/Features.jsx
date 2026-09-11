import { MapPin, BarChart3, Building2, Network, Leaf, Users, Layers } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Reveal from '@/components/ui/Reveal'

const FEATURES = [
  {
    icon: MapPin,
    title: 'Mapeamento Geoespacial',
    desc: 'Visualização interativa de dados territoriais com camadas de infraestrutura, vulnerabilidade e uso do solo integradas em um único painel.',
    tag: 'GIS & Geolocalização',
  },
  {
    icon: BarChart3,
    title: 'Indicadores Socioespaciais',
    desc: 'Cruzamento de dados demográficos, de renda e acesso a serviços para identificar áreas de vulnerabilidade e priorizar intervenções.',
    tag: 'Análise de Dados',
  },
  {
    icon: Building2,
    title: 'Planejamento Urbano',
    desc: 'Suporte à tomada de decisão para gestores públicos com base em evidências territoriais precisas e atualizadas.',
    tag: 'Smart City',
  },
  {
    icon: Network,
    title: 'Infraestrutura Integrada',
    desc: 'Monitoramento de saneamento, mobilidade, saúde e educação em tempo real para gestão coordenada de recursos municipais.',
    tag: 'Conectividade',
  },
  {
    icon: Leaf,
    title: 'Sustentabilidade Ambiental',
    desc: 'Análise de áreas verdes, riscos ambientais e impactos das mudanças climáticas no território municipal.',
    tag: 'Meio Ambiente',
  },
  {
    icon: Users,
    title: 'Participação Comunitária',
    desc: 'Ferramentas para engajamento da população no planejamento urbano, promovendo cidades mais democráticas e inclusivas.',
    tag: 'Inclusão Social',
  },
]

function FeatureCard({ icon: Icon, title, desc, tag }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] transition-[transform,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-primary/25">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary ring-1 ring-inset ring-primary/15 transition-transform duration-200 ease-out group-hover:scale-105">
        <Icon size={22} aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-display text-[19px] font-semibold tracking-tight text-ink">{title}</h3>
      <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-muted">{desc}</p>
      <div className="mt-5">
        <Badge tone="neutral">{tag}</Badge>
      </div>
    </article>
  )
}

export default function Features() {
  return (
    <section id="funcionalidades" className="bg-canvas px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge tone="neutral" icon={<Layers size={13} aria-hidden="true" />}>
            Funcionalidades
          </Badge>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Dados que transformam cidades
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted">
            Ferramentas de análise geoespacial integradas para uma gestão urbana mais
            inteligente e baseada em evidências.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 80} className="h-full">
              <FeatureCard {...f} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
