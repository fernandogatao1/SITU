import { useNavigate } from 'react-router-dom'
import { UserPlus } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Quem somos', href: '#' },
  { label: 'Nossos serviços', href: '#' },
  { label: 'Tutoriais', href: '#' },
  { label: 'Contato', href: '#' },
]

/**
 * Navbar branca — reprodução fiel do material urbdash: links centrais em
 * caixa-alta + botão "Faça seu cadastro" (pill navy) à direita.
 */
export default function Navbar() {
  const navigate = useNavigate()
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center px-5 sm:px-8">
        <div className="hidden flex-1 items-center justify-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[13px] font-semibold uppercase tracking-wide text-[color:var(--color-canvas)]/70 transition-colors duration-150 hover:text-[color:var(--color-canvas)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="ml-auto">
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-canvas)] px-5 py-2.5 text-[13px] font-semibold uppercase tracking-wide text-white shadow-sm transition-[background-color,transform] duration-150 ease-out hover:bg-[color:var(--color-canvas-deep)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
          >
            <UserPlus size={16} aria-hidden="true" /> Faça seu cadastro
          </button>
        </div>
      </nav>
    </header>
  )
}
