import { onlyDigits } from '@/utils/cpf'
// import { apiRequest, tokenStore } from './api'

/**
 * Camada de serviço de autenticação.
 *
 * A integração real com o backend (Spring Boot + JWT) está pronta, porém
 * COMENTADA de propósito — o desafio pede a estrutura preparada, sem chamadas
 * falsas. Ao ligar o backend, descomente as linhas `apiRequest` e remova os
 * `throw` de "não implementado".
 */

/**
 * @param {import('@/utils/validators').LoginValues} credentials
 * @returns {Promise<import('@/types/auth').AuthResponse>}
 */
export async function login(credentials) {
  const payload = { email: credentials.email, password: credentials.password }

  // return apiRequest('/auth/login', {
  //   method: 'POST',
  //   body: JSON.stringify(payload),
  // }).then((res) => {
  //   tokenStore.set(res.token)
  //   return res
  // })

  // eslint-disable-next-line no-console
  console.info('[auth.service] login payload pronto para o backend:', payload)
  throw new Error('Integração com o backend ainda não configurada (VITE_API_URL).')
}

/**
 * @param {import('@/utils/validators').SignupValues} values
 * @returns {Promise<import('@/types/auth').AuthResponse>}
 */
export async function register(values) {
  /** @type {import('@/types/auth').RegisterDTO} */
  const dto = {
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    email: values.email,
    cpf: onlyDigits(values.cpf),
    password: values.password,
  }

  // return apiRequest('/auth/register', {
  //   method: 'POST',
  //   body: JSON.stringify(dto),
  // })

  // eslint-disable-next-line no-console
  console.info('[auth.service] register DTO pronto para o backend:', dto)
  throw new Error('Integração com o backend ainda não configurada (VITE_API_URL).')
}

export function logout() {
  // tokenStore.clear()
}
