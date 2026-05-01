import type { Metadata } from 'next'
import { BrandPanel } from '../../../components/auth/BrandPanel'
import { ResetPasswordForm } from '../../../components/auth/ResetPasswordForm'

export const metadata: Metadata = {
  title: 'Set New Password',
}

export default function ResetPasswordPage() {
  return (
    <div className="auth-layout">
      <BrandPanel />
      <ResetPasswordForm />
    </div>
  )
}
