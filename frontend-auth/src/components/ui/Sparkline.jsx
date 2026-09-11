import { useId } from 'react'

/**
 * Sparkline de série única (dataviz: hue única, marca fina 2px, ponto final ≥ 8px,
 * sem eixo). Decorativa/acessória — descreva o dado no texto ao lado.
 * @param {{ data: number[], width?: number, height?: number, className?: string }} props
 */
export default function Sparkline({ data = [], width = 96, height = 28, className }) {
  const gid = useId()
  if (data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const span = max - min || 1
  const pad = 3
  const x = (i) => pad + (i / (data.length - 1)) * (width - pad * 2)
  const y = (v) => height - pad - ((v - min) / span) * (height - pad * 2)

  const line = data.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')
  const area = `${line} L${x(data.length - 1).toFixed(1)},${height} L${x(0).toFixed(1)},${height} Z`
  const lastX = x(data.length - 1)
  const lastY = y(data[data.length - 1])

  return (
    <svg width={width} height={height} className={className} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <path d={line} stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lastX} cy={lastY} r="2.6" fill="var(--color-primary)" />
    </svg>
  )
}
