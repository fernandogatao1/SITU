import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { User, Mail, Lock, Fingerprint } from 'lucide-react'
import Input from '@/components/ui/Input'
import PasswordInput from '@/components/ui/PasswordInput'
import Checkbox from '@/components/ui/Checkbox'
import LoadingButton from '@/components/ui/LoadingButton'
import FormError from '@/components/ui/FormError'
import PasswordStrength from './PasswordStrength'
import { signupSchema } from '@/utils/validators'
import { maskCPF } from '@/utils/cpf'
import { register as registerUser } from '@/services/auth.service'

export default function SignupForm() {
  const [rootError, setRootError] = useState('')
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '', lastName: '', email: '', cpf: '',
      password: '', confirmPassword: '', acceptTerms: false,
    },
  })

  const password = watch('password')
  const cpfField = register('cpf')

  const onSubmit = async (values) => {
    setRootError('')
    try {
      await registerUser(values)
      // Sucesso: aqui redirecionaria para /login com aviso de conta criada.
    } catch (err) {
      setRootError(err?.message || 'Não foi possível criar sua conta. Tente novamente.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Nome" autoComplete="given-name" placeholder="Maria"
          icon={<User size={18} aria-hidden="true" />}
          error={errors.firstName?.message} {...register('firstName')}
        />
        <Input
          label="Sobrenome" autoComplete="family-name" placeholder="Silva"
          error={errors.lastName?.message} {...register('lastName')}
        />
      </div>

      <Input
        label="E-mail" type="email" autoComplete="email" placeholder="voce@exemplo.com"
        icon={<Mail size={18} aria-hidden="true" />}
        error={errors.email?.message} {...register('email')}
      />

      <Input
        label="CPF" inputMode="numeric" autoComplete="off" placeholder="000.000.000-00"
        maxLength={14} icon={<Fingerprint size={18} aria-hidden="true" />}
        error={errors.cpf?.message}
        {...cpfField}
        onChange={(e) => {
          e.target.value = maskCPF(e.target.value)
          cpfField.onChange(e)
        }}
      />

      <div>
        <PasswordInput
          label="Senha" autoComplete="new-password" placeholder="Crie uma senha forte"
          icon={<Lock size={18} aria-hidden="true" />}
          error={errors.password?.message} {...register('password')}
        />
        {!errors.password && <PasswordStrength password={password} />}
      </div>

      <PasswordInput
        label="Confirmar senha" autoComplete="new-password" placeholder="Repita a senha"
        icon={<Lock size={18} aria-hidden="true" />}
        error={errors.confirmPassword?.message} {...register('confirmPassword')}
      />

      <Checkbox
        label={
          <>
            Li e aceito os <a href="#" className="font-medium text-primary hover:text-primary-hover">Termos de Uso</a> e a{' '}
            <a href="#" className="font-medium text-primary hover:text-primary-hover">Política de Privacidade</a>.
          </>
        }
        error={errors.acceptTerms?.message}
        {...register('acceptTerms')}
      />
      <FormError>{errors.acceptTerms?.message}</FormError>

      <FormError role="alert">{rootError}</FormError>

      <LoadingButton type="submit" loading={isSubmitting} loadingText="Criando conta…" className="mt-1">
        Criar conta
      </LoadingButton>

      <p className="mt-2 text-center text-[14px] text-muted">
        Já tem uma conta?{' '}
        <Link to="/login" className="font-semibold text-primary transition-colors hover:text-primary-hover">
          Fazer login
        </Link>
      </p>
    </form>
  )
}
