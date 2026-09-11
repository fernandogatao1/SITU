import { Outlet } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import Logo from '@/components/brand/Logo'
import ThemeBackground from '@/components/brand/ThemeBackground'

/**
 * Escopo de tokens claros para o formulário (accent azul), dentro do app navy.
 * As classes text-ink/bg-surface/border-line/text-primary passam a resolver
 * para estes valores dentro deste container.
 */
const LIGHT_SCOPE = {
  '--color-canvas': '#fbfbfa',
  '--color-surface': '#ffffff',
  '--color-ink': '#10231b',
  '--color-muted': '#5b6b63',
  '--color-subtle': '#8a968f',
  '--color-line': '#e7e9e4',
  '--color-primary': '#2e6fb7',
  '--color-primary-hover': '#24588f',
  '--color-primary-soft': '#e7f0fa',
  '--color-danger': '#b42318',
  '--color-danger-soft': '#fef3f2',
  '--color-success': '#067647',
  '--shadow-card': '0 1px 2px rgba(16,35,27,0.04), 0 12px 32px -16px rgba(16,35,27,0.1)',
  '--shadow-focus': '0 0 0 4px var(--color-primary-soft)',
}

/**
 * Auth em split screen: painel de branding navy à esquerda + formulário claro à direita.
 */
export default function AuthLayout() {
  return (
    <div className="flex min-h-dvh">
      {/* Branding (navy) — visível a partir de lg */}
      <aside className="relative hidden w-[46%] max-w-[620px] flex-col justify-between overflow-hidden bg-[color:var(--color-canvas-deep)] p-12 text-white lg:flex">
        <img src="/serra-4.webp" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-[0.22]" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(8,32,63,0.82) 0%, rgba(10,42,82,0.72) 40%, rgba(6,24,48,0.94) 100%)' }} />
        <ThemeBackground />

        <div className="relative">
          <Logo size={30} withTagline />
        </div>

        <div className="relative max-w-md">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8FBEF0]">
            Inteligência Territorial — Tianguá, CE
          </p>
          <h1 className="mt-4 font-display text-[34px] font-semibold leading-[1.1] tracking-tight text-white">
            Decisões urbanas guiadas por dados reais.
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-white/70">
            Mapas, indicadores e concentração urbana da Serra da Ibiapaba em um só
            lugar — para planejar a cidade com evidências, não com achismo.
          </p>
        </div>

        <div className="relative flex items-center justify-between text-white/70">
          <span className="inline-flex items-center gap-2 text-[13px]">
            <ShieldCheck size={16} className="text-[#8FBEF0]" aria-hidden="true" />
            Dados protegidos e criptografados
          </span>
          <span className="font-mono text-[11px] text-[#8FBEF0]/70">-3.7314, -40.9917</span>
        </div>
      </aside>

      {/* Formulário (claro, accent azul) */}
      <main style={LIGHT_SCOPE} className="flex flex-1 flex-col items-center justify-center bg-canvas px-5 py-10 text-ink sm:px-8">
        <div className="w-full max-w-[400px]">
          <div className="mb-8 lg:hidden">
            <Logo size={28} tone="dark" />
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
