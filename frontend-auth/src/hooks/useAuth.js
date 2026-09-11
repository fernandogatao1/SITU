import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'

/**
 * Acesso tipado ao AuthContext.
 * @returns {{ user: any, token: string|null, isAuthenticated: boolean, signIn: Function, signOut: Function }}
 */
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth precisa estar dentro de <AuthProvider>.')
  return ctx
}
