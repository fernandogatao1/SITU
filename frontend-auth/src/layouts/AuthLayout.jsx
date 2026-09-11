import { Outlet } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import Logo from '@/components/brand/Logo'
import ThemeBackground from '@/components/brand/ThemeBackground'

/**
 * Split screen: painel de branding escuro (desktop) + área do formulário clara.
 * Mobile/tablet (<1024px): só o formulário, centralizado, sem scroll horizontal.
 */
export default function AuthLayout() {
  return (
    <div className="flex min-h-dvh bg-canvas">
      {/* Branding — visível a partir de lg */}
      <aside className="relative hidden w-[46%] max-w-[620px] flex-col justify-between overflow-hidden bg-[#08130D] p-12 text-white lg:flex">
        {/* Foto aérea do território */}
        <img
          src="/serra-1.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        {/* Overlay verde-escuro para contraste e identidade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(160deg, rgba(6,18,12,0.82) 0%, rgba(8,22,14,0.72) 40%, rgba(6,26,17,0.92) 100%)',
          }}
        />
        <ThemeBackground />

        <div className="relative">
          <Logo size={30} tone="dark" />
        </div>

        <div className="relative max-w-md">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-300">
            Inteligência Territorial — Tianguá, CE
          </p>
          <h1 className="mt-4 font-display text-[34px] font-semibold leading-[1.1] tracking-tight text-white">
            Decisões urbanas guiadas por dados reais.
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-white/70">
            Mapas, indicadores e concentração urbana em um só lugar — para
            planejar a cidade com evidências, não com achismo.
          </p>
        </div>

        <div className="relative flex items-center justify-between text-white/70">
          <span className="inline-flex items-center gap-2 text-[13px]">
            <ShieldCheck size={16} className="text-emerald-300" aria-hidden="true" />
            Dados protegidos e criptografados
          </span>
          <span className="font-mono text-[11px] text-emerald-300/70">-3.7314, -40.9917</span>
        </div>
      </aside>

      {/* Formulário */}
      <main className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-[400px]">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
