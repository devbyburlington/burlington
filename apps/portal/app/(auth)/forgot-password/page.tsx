import type { Metadata } from 'next'
import { BrandPanel } from '../../../components/auth/BrandPanel'
import { ForgotPasswordForm } from '../../../components/auth/ForgotPasswordForm'

export const metadata: Metadata = {
  title: 'Reset Password',
}

export default function ForgotPasswordPage() {
  return (
    <div className="auth-layout">
      <BrandPanel />
      <ForgotPasswordForm />
    </div>
  )
}
