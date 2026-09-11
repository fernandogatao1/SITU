import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'

/**
 * Chamada final para ação — painel claro com leve tinta verde.
 */
export default function CTA() {
  const navigate = useNavigate()
  return (
    <section id="plataforma" className="bg-canvas px-5 pb-24 sm:px-8">
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-primary-soft/70 to-surface px-6 py-14 text-center shadow-[var(--shadow-card)] sm:px-12">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Planeje a cidade com evidências, não com achismo
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-muted">
            Acesse a plataforma e comece a cruzar mapas, indicadores e dados
            territoriais de Tianguá em minutos.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="primary" fullWidth={false} className="w-full sm:w-auto" onClick={() => navigate('/signup')}>
              Criar conta gratuita <ArrowRight size={18} aria-hidden="true" />
            </Button>
            <Button variant="outline" fullWidth={false} className="w-full sm:w-auto" onClick={() => navigate('/login')}>
              Já tenho conta
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
