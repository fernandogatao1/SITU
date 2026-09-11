import { useNavigate } from 'react-router-dom'
import { ArrowRight, LogIn, MapPin } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import HeroBackdrop from '@/components/brand/HeroBackdrop'
import HeroSlideshow from './HeroSlideshow'

const SERRA = [
  { src: '/serra-1.webp', alt: 'Vale verde da Serra da Ibiapaba, Tianguá' },
  { src: '/serra-2.webp', alt: 'Cachoeira na Serra da Ibiapaba' },
  { src: '/serra-3.webp', alt: 'Mirante da Serra da Ibiapaba' },
  { src: '/serra-4.webp', alt: 'Vista noturna a partir da serra' },
]

/**
 * Hero claro (layout white). Texto centralizado + slideshow com crossfade
 * das fotos reais da Serra da Ibiapaba.
 */
export default function Hero() {
  const navigate = useNavigate()
  return (
    <section id="topo" className="relative isolate overflow-hidden bg-canvas">
      <HeroBackdrop />

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-16 pt-36 sm:px-8 sm:pt-40">
        <div className="mx-auto max-w-3xl text-center">
          <Badge tone="neutral" icon={<MapPin size={13} aria-hidden="true" />}>
            Inteligência Territorial — Tianguá, CE
          </Badge>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[56px]">
            Sistema de Inteligência <span className="text-primary">Territorial Urbana</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-[16px] leading-relaxed text-muted sm:text-[17px]">
            Planejamento urbano de cidades do interior e médio porte, fundamentado na
            integração de indicadores de infraestrutura e vulnerabilidade socioespacial
            para criar ambientes urbanos mais eficientes e inclusivos.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="primary" fullWidth={false} className="w-full sm:w-auto" onClick={() => navigate('/login')}>
              <LogIn size={18} aria-hidden="true" /> Entrar na plataforma
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
            <Button variant="outline" fullWidth={false} className="w-full sm:w-auto" onClick={() => navigate('/signup')}>
              Criar conta
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <HeroSlideshow images={SERRA} />
        </div>
      </div>
    </section>
  )
}
