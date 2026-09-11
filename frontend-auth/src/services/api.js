/**
 * Cliente HTTP fino sobre fetch, preparado para o backend Spring Boot + JWT.
 * - Base URL vem de VITE_API_URL (.env).
 * - Injeta Authorization: Bearer <token> quando houver.
 * - Normaliza erros de rede/HTTP.
 */

const BASE_URL = import.meta.env.VITE_API_URL ?? '/api'
const TOKEN_KEY = 'situ.auth.token'

export const tokenStore = {
  get: () => {
    try {
      return localStorage.getItem(TOKEN_KEY)
    } catch {
      return null
    }
  },
  set: (token) => {
    try {
      localStorage.setItem(TOKEN_KEY, token)
    } catch {
      /* storage indisponível — ignora */
    }
  },
  clear: () => {
    try {
      localStorage.removeItem(TOKEN_KEY)
    } catch {
      /* ignora */
    }
  },
}

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

/**
 * @param {string} path
 * @param {RequestInit} [options]
 */
export async function apiRequest(path, options = {}) {
  const token = tokenStore.get()
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  let response
  try {
    response = await fetch(`${BASE_URL}${path}`, { ...options, headers })
  } catch {
    throw new ApiError('Não foi possível conectar ao servidor.', 0, null)
  }

  const isJson = response.headers.get('content-type')?.includes('application/json')
  const data = isJson ? await response.json().catch(() => null) : null

  if (!response.ok) {
    if (response.status === 401) tokenStore.clear()
    const message = data?.message || 'Ocorreu um erro. Tente novamente.'
    throw new ApiError(message, response.status, data)
  }

  return data
}
