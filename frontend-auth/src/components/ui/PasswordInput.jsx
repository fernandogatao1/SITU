import { forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import Input from './Input'

/**
 * Campo de senha com alternância mostrar/ocultar.
 * O botão de toggle tem aria-label dinâmico e aria-pressed.
 * @param {React.ComponentProps<typeof Input>} props
 */
const PasswordInput = forwardRef(function PasswordInput(props, ref) {
  const [visible, setVisible] = useState(false)

  return (
    <Input
      ref={ref}
      type={visible ? 'text' : 'password'}
      rightSlot={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
          aria-pressed={visible}
          tabIndex={0}
          className="flex h-9 w-9 items-center justify-center rounded-md text-subtle transition-colors duration-150 ease-out hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {visible ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
        </button>
      }
      {...props}
    />
  )
})

export default PasswordInput
