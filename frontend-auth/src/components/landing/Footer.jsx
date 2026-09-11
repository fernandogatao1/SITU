import { Link } from 'react-router-dom'
import Logo from '@/components/brand/Logo'

const COLS = [
  {
    title: 'Plataforma',
    links: [
      { label: 'Funcionalidades', href: '#funcionalidades' },
      { label: 'Dados', href: '#dados' },
      { label: 'Entrar', href: '/login', route: true },
      { label: 'Criar conta', href: '/signup', route: true },
    ],
  },
  {
    title: 'Institucional',
    links: [
      { label: 'Sobre o S.I.T.U', href: '#topo' },
      { label: 'Fontes de dados', href: '#dados' },
      { label: 'Contato', href: '#topo' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface px-5 py-14 sm:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo size={28} />
          <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-muted">
            Inteligência territorial urbana para cidades do interior e médio porte.
          </p>
          <p className="mt-4 font-mono text-[11px] text-subtle">-3.7314, -40.9917 · Tianguá, CE</p>
        </div>

        {COLS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-[13px] font-semibold text-ink">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  {l.route ? (
                    <Link className="text-[14px] text-muted transition-colors hover:text-ink" to={l.href}>
                      {l.label}
                    </Link>
                  ) : (
                    <a className="text-[14px] text-muted transition-colors hover:text-ink" href={l.href}>
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-line pt-6 text-[13px] text-subtle sm:flex-row">
        <span>© {new Date().getFullYear()} S.I.T.U · Sistema de Inteligência Territorial Urbana</span>
        <span>Dados: IBGE 2022 · Tianguá, Ceará · Brasil</span>
      </div>
    </footer>
  )
}
