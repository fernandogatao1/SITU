/** Formatação numérica em pt-BR. */

const nf0 = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 })
const nf1 = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 })

export const int = (n) => nf0.format(Math.round(n || 0))
export const dec = (n) => nf1.format(n || 0)
export const pct = (n) => `${nf1.format(n || 0)}%`

/** Data ISO -> "há X dias" / "hoje" em pt-BR. */
export function relativeDay(iso) {
  const d = new Date(iso + 'T00:00:00')
  const days = Math.round((Date.now() - d.getTime()) / 86400000)
  if (days <= 0) return 'Hoje'
  if (days === 1) return 'Ontem'
  if (days < 30) return `Há ${days} dias`
  return d.toLocaleDateString('pt-BR')
}
