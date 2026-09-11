import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Seletor de município em pill com setas (reprodução do material urbdash).
 * @param {{ options: {id:string, nome:string}[], value: string, onChange: (id:string)=>void }} props
 */
export default function CitySelector({ options, value, onChange }) {
  const idx = Math.max(0, options.findIndex((o) => o.id === value))
  const go = (dir) => onChange(options[(idx + dir + options.length) % options.length].id)

  return (
    <div className="glass flex items-center justify-between gap-2 rounded-full px-2 py-1.5">
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Município anterior"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <ChevronLeft size={18} aria-hidden="true" />
      </button>
      <span className="font-display text-[16px] font-semibold text-white" aria-live="polite">
        {options[idx].nome}
      </span>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Próximo município"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <ChevronRight size={18} aria-hidden="true" />
      </button>
    </div>
  )
}
