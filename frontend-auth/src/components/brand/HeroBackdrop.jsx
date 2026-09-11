/**
 * Fundo claro e discreto do hero: curvas de nível em traço sage muito sutil +
 * grade técnica leve, ambos esmaecidos nas bordas. Puramente decorativo.
 */
export default function HeroBackdrop() {
  const rings = [
    'M-40 300 C 140 200, 320 360, 540 250 S 880 140, 1080 300',
    'M-40 370 C 160 280, 340 430, 560 330 S 900 230, 1080 370',
    'M-40 230 C 120 150, 300 290, 520 180 S 860 80, 1080 230',
  ]
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(16,35,27,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(16,35,27,0.035) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(120% 70% at 50% 0%, #000 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(120% 70% at 50% 0%, #000 30%, transparent 80%)',
        }}
      />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 480"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        style={{
          maskImage: 'radial-gradient(100% 80% at 50% 0%, #000 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(100% 80% at 50% 0%, #000 40%, transparent 85%)',
        }}
      >
        {rings.map((d, i) => (
          <path key={i} d={d} stroke="var(--color-primary)" strokeOpacity={0.1} strokeWidth={1.25} />
        ))}
      </svg>
    </div>
  )
}
