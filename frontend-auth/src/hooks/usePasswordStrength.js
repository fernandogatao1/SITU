import { useMemo } from 'react'

/**
 * Avalia a força da senha por critérios simples e legíveis.
 * (Para produção, considere zxcvbn — ver DESIGN.md, melhorias futuras.)
 *
 * @param {string} password
 * @returns {{ score: 0|1|2|3|4, label: string, tone: 'idle'|'weak'|'medium'|'strong', checks: Record<string, boolean> }}
 */
export function usePasswordStrength(password = '') {
  return useMemo(() => {
    const checks = {
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /\d/.test(password),
      symbol: /[^A-Za-z0-9]/.test(password),
    }

    if (!password) {
      return { score: 0, label: 'Digite uma senha', tone: 'idle', checks }
    }

    const passed = Object.values(checks).filter(Boolean).length
    const score = /** @type {0|1|2|3|4} */ (Math.min(4, Math.max(1, passed - 1)))

    const map = {
      1: { label: 'Fraca', tone: 'weak' },
      2: { label: 'Razoável', tone: 'medium' },
      3: { label: 'Boa', tone: 'medium' },
      4: { label: 'Forte', tone: 'strong' },
    }

    return { score, ...map[score], checks }
  }, [password])
}
