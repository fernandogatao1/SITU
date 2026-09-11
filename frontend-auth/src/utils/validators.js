import { z } from 'zod'
import { isValidCPF, onlyDigits } from './cpf'

/**
 * Schemas Zod — fonte única de verdade para validação e tipos.
 * Mensagens escritas na voz da interface: dizem o que corrigir.
 */

const email = z
  .string()
  .min(1, 'Informe seu e-mail.')
  .email('Digite um e-mail válido.')

const password = z
  .string()
  .min(8, 'A senha precisa de ao menos 8 caracteres.')
  .max(64, 'A senha pode ter no máximo 64 caracteres.')

export const loginSchema = z.object({
  email,
  password: z.string().min(1, 'Informe sua senha.'),
  remember: z.boolean().optional().default(false),
})

export const signupSchema = z
  .object({
    firstName: z.string().min(1, 'Informe seu nome.').max(60),
    lastName: z.string().min(1, 'Informe seu sobrenome.').max(60),
    email,
    cpf: z
      .string()
      .min(1, 'Informe seu CPF.')
      .refine((v) => onlyDigits(v).length === 11, 'O CPF deve ter 11 dígitos.')
      .refine(isValidCPF, 'CPF inválido. Confira os números.'),
    password: password.refine(
      (v) => /[A-Za-z]/.test(v) && /\d/.test(v),
      'Use letras e números na senha.'
    ),
    confirmPassword: z.string().min(1, 'Confirme sua senha.'),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: 'É preciso aceitar os termos para continuar.' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
  })

/** @typedef {z.infer<typeof loginSchema>} LoginValues */
/** @typedef {z.infer<typeof signupSchema>} SignupValues */
