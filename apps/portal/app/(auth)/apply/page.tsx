import type { Metadata } from 'next'
import { BrandPanel } from '../../../components/auth/BrandPanel'
import { ApplyForm } from '../../../components/auth/ApplyForm'

export const metadata: Metadata = {
  title: 'Apply',
  description:
    'Begin your EB-1A or EB-2 NIW application with Burlington Consult.',
}

export default function ApplyPage() {
  return (
    <div className="auth-layout">
      <BrandPanel
        heading={
          <>
            Begin your path to a{' '}
            <em className="font-medium italic text-teal-light" style={{ textShadow: '0 0 24px rgba(45,212,191,.25)' }}>
              U.S. green card
            </em>
            .
          </>
        }
        body="Tell us about yourself and your professional background. Our team reviews every application within 48 hours."
        quote="Burlington doesn't take every case — but when we do, we bring the full weight of our research, writing, and legal strategy to bear."
      />
      <ApplyForm />
    </div>
  )
}
