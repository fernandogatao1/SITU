import { Loader2 } from 'lucide-react'
import Button from './Button'

/**
 * Button com estado de carregamento acessível (aria-busy + spinner).
 * @param {{ loading?: boolean, loadingText?: string } & React.ComponentProps<typeof Button>} props
 */
export default function LoadingButton({
  loading = false,
  loadingText,
  disabled,
  children,
  ...props
}) {
  return (
    <Button aria-busy={loading} disabled={disabled || loading} {...props}>
      {loading && <Loader2 size={18} className="animate-spin" aria-hidden="true" />}
      <span>{loading && loadingText ? loadingText : children}</span>
    </Button>
  )
}
