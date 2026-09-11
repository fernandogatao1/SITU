import { Map, Activity, CalendarRange } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { useCountUp } from '@/hooks/useCountUp'
import { cn } from '@/utils/cn'

const STATS = [
  { icon: Map, end: 12, label: 'Bairros mapeados' },
  { icon: Activity, end: 48, label: 'Indicadores ativos' },
  { icon: CalendarRange, end: 5, label: 'Anos de dados' },
]

function StatCard({ icon: Icon, end, label, active, delay }) {
  const value = useCountUp(end, active)
  return (
    <div
      style={{ '--reveal-delay': `${delay}ms` }}
      className={cn(
        'reveal rounded-xl border border-line bg-surface p-6 text-left shadow-[var(--shadow-card)]',
        'transition-[transform,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/25',
        active && 'is-visible'
      )}
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary ring-1 ring-inset ring-primary/15">
        <Icon size={20} aria-hidden="true" />
      </span>
      <p className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink tabular-nums">{value}</p>
      <p className="mt-1 text-[14px] text-muted">{label}</p>
    </div>
  )
}

export default function Stats() {
  const [ref, inView] = useInView({ threshold: 0.3 })
  return (
    <section id="dados" className="bg-canvas px-5 py-8 sm:px-8">
      <div ref={ref} className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
        {STATS.map((s, i) => (
          <StatCard key={s.label} {...s} active={inView} delay={i * 90} />
        ))}
      </div>
    </section>
  )
}
