import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, UserPlus } from 'lucide-react'
import Logo from '@/components/brand/Logo'
import Button from '@/components/ui/Button'
import { cn } from '@/utils/cn'

const NAV_LINKS = [
  { label: 'Funcionalidades', href: '#funcionalidades' },
  { label: 'Plataforma', href: '#plataforma' },
  { label: 'Dados', href: '#dados' },
]

/**
 * Navbar sticky clara com glassmorphism que aparece ao rolar.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-out',
        scrolled
          ? 'border-b border-line bg-canvas/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#topo" className="flex items-center gap-2.5" aria-label="S.I.T.U — início">
          <Logo size={28} />
          <span className="hidden text-[13px] text-muted sm:inline">
            Sistema de Inteligência Territorial Urbana
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-[14px] text-muted transition-colors duration-150 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth={false}
            className="hidden sm:inline-flex"
            onClick={() => navigate('/login')}
          >
            <LogIn size={16} aria-hidden="true" /> Login
          </Button>
          <Button variant="primary" size="sm" fullWidth={false} onClick={() => navigate('/signup')}>
            <UserPlus size={16} aria-hidden="true" /> Cadastrar
          </Button>
        </div>
      </nav>
    </header>
  )
}
