/**
 * Cabeçalho + moldura do formulário de auth (dentro do card de vidro do AuthLayout).
 * @param {{ title: string, subtitle?: string, children: React.ReactNode }} props
 */
export default function AuthCard({ title, subtitle, children }) {
  return (
    <section className="animate-rise">
      <header className="mb-7">
        <h2 className="font-display text-[26px] font-semibold tracking-tight text-ink">
          {title}
        </h2>
        {subtitle && <p className="mt-1.5 text-[14.5px] text-muted">{subtitle}</p>}
      </header>

      {children}
    </section>
  )
}
