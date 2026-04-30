import type { Metadata } from 'next'
import { BrandPanel } from '../../../components/auth/BrandPanel'
import { LoginForm } from '../../../components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'Sign In',
  description:
    'Access your case, documents, and progress on the Burlington Consult client portal.',
}

export default function LoginPage() {
  return (
    <div className="auth-layout">
      <BrandPanel />
      <LoginForm />
    </div>
  )
}
