/**
 * Separador com rótulo central ("ou"). Decorativo — a linha é aria-hidden.
 * @param {{ label?: string }} props
 */
export default function Divider({ label = 'ou' }) {
  return (
    <div className="flex items-center gap-3" role="separator" aria-orientation="horizontal">
      <span className="h-px flex-1 bg-line" aria-hidden="true" />
      <span className="font-mono text-[11px] uppercase tracking-wider text-subtle">{label}</span>
      <span className="h-px flex-1 bg-line" aria-hidden="true" />
    </div>
  )
}
