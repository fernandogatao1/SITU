import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import Input from '@/components/ui/Input'
import PasswordInput from '@/components/ui/PasswordInput'
import Checkbox from '@/components/ui/Checkbox'
import LoadingButton from '@/components/ui/LoadingButton'
import Divider from '@/components/ui/Divider'
import SocialButton from '@/components/ui/SocialButton'
import FormError from '@/components/ui/FormError'
import { loginSchema } from '@/utils/validators'
import { useAuth } from '@/hooks/useAuth'

export default function LoginForm() {
  const { signIn } = useAuth()
  const [rootError, setRootError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: { email: '', password: '', remember: false },
  })

  const onSubmit = async (values) => {
    setRootError('')
    try {
      await signIn(values)
      // Sucesso: aqui redirecionaria para a área logada (ex.: navigate('/app')).
    } catch (err) {
      setRootError(err?.message || 'Não foi possível entrar. Tente novamente.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <Input
        label="E-mail"
        type="email"
        autoComplete="email"
        placeholder="voce@exemplo.com"
        icon={<Mail size={18} aria-hidden="true" />}
        error={errors.email?.message}
        {...register('email')}
      />

      <PasswordInput
        label="Senha"
        labelAction={
          <Link
            to="/login"
            className="text-[13px] font-medium text-primary transition-colors hover:text-primary-hover"
          >
            Esqueci minha senha
          </Link>
        }
        autoComplete="current-password"
        placeholder="Sua senha"
        icon={<Lock size={18} aria-hidden="true" />}
        error={errors.password?.message}
        {...register('password')}
      />

      <Checkbox label="Manter conectado" {...register('remember')} />

      <FormError role="alert">{rootError}</FormError>

      <LoadingButton type="submit" loading={isSubmitting} loadingText="Entrando…" className="mt-1">
        Entrar
      </LoadingButton>

      <Divider />

      <SocialButton disabled type="button">
        Continuar com Google
      </SocialButton>

      <p className="mt-2 text-center text-[14px] text-muted">
        Não tem uma conta?{' '}
        <Link to="/signup" className="font-semibold text-primary transition-colors hover:text-primary-hover">
          Criar conta
        </Link>
      </p>
    </form>
  )
}
