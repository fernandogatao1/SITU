import { cn } from '@/utils/cn'

/**
 * Logo urbdash: contorno do estado do Ceará + wordmark "urb" (bold) / "dash" (leve).
 *
 * ⚠️ PLACEHOLDER: o contorno abaixo é uma APROXIMAÇÃO do Ceará. Substituir pelo
 * SVG oficial do designer (basta trocar o <path> do mapa mantendo o wordmark).
 *
 * @param {{ size?: number, withWordmark?: boolean, withTagline?: boolean, className?: string, tone?: 'light'|'dark' }} props
 */
export default function Logo({ size = 30, withWordmark = true, withTagline = false, className, tone = 'light' }) {
  const color = tone === 'dark' ? '#0A2A52' : '#ffffff'

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        {/* Aproximação do contorno do Ceará — trocar pelo SVG oficial */}
        <path
          d="M7 3.5 L15 4 L17.5 6.5 L22 6 L24.5 9 L23 13 L25 16.5 L21 20 L20.5 24 L16.5 27.5 L14 24.5 L12.5 26 L10 22 L11 18 L8 15 L9.5 11 L6.5 8 Z"
          stroke={color}
          strokeWidth="1.6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>

      {withWordmark && (
        <span className="leading-none" style={{ color }}>
          <span
            className="font-display tracking-tight"
            style={{ fontSize: `${Math.round(size * 0.72)}px`, lineHeight: 1 }}
          >
            <span className="font-extrabold">urb</span>
            <span className="font-medium opacity-90">dash</span>
          </span>
          {withTagline && (
            <span
              className="mt-1 block font-medium leading-tight opacity-60"
              style={{ fontSize: `${Math.max(10, Math.round(size * 0.24))}px` }}
            >
              Inteligência Territorial
              <br />& Geolocalização
            </span>
          )}
        </span>
      )}
    </span>
  )
}
