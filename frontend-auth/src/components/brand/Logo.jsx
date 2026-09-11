import { cn } from '@/utils/cn'

/**
 * Marca do SITU: um "pin" cartográfico formado por uma curva de nível + ponto.
 * @param {{ size?: number, withWordmark?: boolean, className?: string, tone?: 'ink'|'invert'|'dark' }} props
 */
export default function Logo({ size = 28, withWordmark = true, className, tone = 'ink' }) {
  const mark = tone === 'invert' ? '#ffffff' : tone === 'dark' ? '#34D399' : 'var(--color-primary)'
  const text = tone === 'ink' ? 'var(--color-ink)' : '#ffffff'

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        role="img"
      >
        <path
          d="M16 3C10.2 3 5.5 7.6 5.5 13.3 5.5 21 16 29 16 29s10.5-8 10.5-15.7C26.5 7.6 21.8 3 16 3Z"
          stroke={mark}
          strokeWidth="2"
        />
        <path
          d="M16 8.4c-2.7 0-4.9 2.2-4.9 4.9S13.3 18.2 16 18.2"
          stroke={mark}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="16" cy="13.3" r="2.1" fill={mark} />
      </svg>
      {withWordmark && (
        <span
          className="font-display text-[19px] font-bold tracking-tight"
          style={{ color: text }}
        >
          SITU
        </span>
      )}
    </span>
  )
}
