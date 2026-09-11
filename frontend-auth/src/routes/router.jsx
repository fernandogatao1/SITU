import { createBrowserRouter, Navigate } from 'react-router-dom'
import AuthLayout from '@/layouts/AuthLayout'
import Home from '@/pages/Home'
import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'

/**
 * Rotas da aplicação.
 * - `/`          → landing page (Home)
 * - `/login`,`/signup` → área de auth (AuthLayout: branding + formulário)
 * Estrutura pronta para rotas protegidas (ex.: /app) no futuro.
 */
export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  {
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])
