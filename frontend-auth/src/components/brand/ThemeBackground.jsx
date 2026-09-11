/**
 * Assinatura do painel de branding (auth): grade sutil + glow azul + curvas de
 * nível luminosas em azul, sobre fundo navy. Decorativo → aria-hidden;
 * o movimento é desativado por prefers-reduced-motion.
 */
export default function ThemeBackground() {
  const rings = [
    'M-40 320 C 120 180, 300 380, 520 240 S 860 120, 1040 300',
    'M-40 400 C 140 270, 320 450, 540 330 S 880 220, 1060 380',
    'M-40 240 C 100 120, 300 300, 500 160 S 840 40, 1040 220',
    'M-40 480 C 160 360, 340 520, 560 420 S 900 320, 1080 460',
    'M-40 160 C 90 60, 280 220, 480 90 S 820 -20, 1020 140',
  ]

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Grade sutil */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(120% 80% at 30% 20%, #000 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(120% 80% at 30% 20%, #000 40%, transparent 100%)',
        }}
      />
      {/* Glow radial azul (discreto) */}
      <div
        className="absolute -left-24 -top-24 h-[480px] w-[480px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(76,147,224,0.32) 0%, rgba(76,147,224,0.08) 45%, transparent 70%)',
        }}
      />
      {/* Curvas de nível luminosas (azul) */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid slice" fill="none">
        {rings.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="#8FBEF0"
            strokeOpacity={0.3}
            strokeWidth={1.25}
            strokeDasharray="1400"
            style={{
              filter: 'drop-shadow(0 0 4px rgba(76,147,224,0.4))',
              animation: 'contour-draw 1.6s var(--ease-out) both',
              animationDelay: `${i * 0.14}s`,
            }}
          />
        ))}
      </svg>
    </div>
  )
}
