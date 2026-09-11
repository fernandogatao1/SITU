/**
 * Utilidades de CPF: máscara de digitação e validação dos dígitos verificadores.
 */

/** Mantém apenas dígitos. @param {string} value */
export const onlyDigits = (value) => (value || '').replace(/\D/g, '')

/**
 * Aplica a máscara 000.000.000-00 progressivamente enquanto o usuário digita.
 * @param {string} value
 * @returns {string}
 */
export function maskCPF(value) {
  const d = onlyDigits(value).slice(0, 11)
  return d
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

/**
 * Valida CPF pelo algoritmo oficial dos dígitos verificadores.
 * @param {string} value
 * @returns {boolean}
 */
export function isValidCPF(value) {
  const cpf = onlyDigits(value)
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false

  const calcCheckDigit = (base) => {
    let sum = 0
    const factorStart = base.length + 1
    for (let i = 0; i < base.length; i++) {
      sum += Number(base[i]) * (factorStart - i)
    }
    const rest = (sum * 10) % 11
    return rest === 10 ? 0 : rest
  }

  const d1 = calcCheckDigit(cpf.slice(0, 9))
  const d2 = calcCheckDigit(cpf.slice(0, 10))
  return d1 === Number(cpf[9]) && d2 === Number(cpf[10])
}
