import { cn } from '@/utils/cn'

/**
 * Badge/pill reutilizável. `tone` cobre uso claro e sobre fundo escuro.
 * @param {{ tone?: 'emerald'|'dark'|'neutral', icon?: React.ReactNode, className?: string, children: React.ReactNode }} props
 */
export default function Badge({ tone = 'emerald', icon, className, children }) {
  const tones = {
    emerald: 'bg-emerald-500/10 text-emerald-300 ring-1 ring-inset ring-emerald-400/20',
    dark: 'bg-white/[0.06] text-white/80 ring-1 ring-inset ring-white/10 backdrop-blur',
    neutral: 'bg-primary-soft text-primary ring-1 ring-inset ring-primary/15',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wider',
        tones[tone],
        className
      )}
    >
      {icon}
      {children}
    </span>
  )
}
