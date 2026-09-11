import { createContext, useCallback, useMemo, useState } from 'react'
import { tokenStore } from '@/services/api'
import * as authService from '@/services/auth.service'

/**
 * Contexto de autenticação — guarda usuário/token e expõe ações.
 * Estrutura pronta para proteger rotas e trocar por cookie httpOnly no futuro.
 */
export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => tokenStore.get())

  const signIn = useCallback(async (credentials) => {
    const res = await authService.login(credentials)
    setUser(res.user)
    setToken(res.token)
    return res
  }, [])

  const signOut = useCallback(() => {
    authService.logout()
    setUser(null)
    setToken(null)
  }, [])

  const value = useMemo(
    () => ({ user, token, isAuthenticated: Boolean(token), signIn, signOut }),
    [user, token, signIn, signOut]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
