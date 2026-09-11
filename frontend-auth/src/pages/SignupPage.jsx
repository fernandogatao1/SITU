import AuthCard from '@/components/auth/AuthCard'
import SignupForm from '@/components/auth/SignupForm'

export default function SignupPage() {
  return (
    <AuthCard title="Criar conta" subtitle="Leva menos de um minuto para começar.">
      <SignupForm />
    </AuthCard>
  )
}
