import AuthCard from '@/components/auth/AuthCard'
import LoginForm from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <AuthCard title="Entrar" subtitle="Acesse o painel de inteligência territorial.">
      <LoginForm />
    </AuthCard>
  )
}
