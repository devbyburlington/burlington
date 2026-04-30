import type { Metadata } from 'next'
import { BrandPanel } from '../../../components/auth/BrandPanel'
import { NdaForm } from '../../../components/auth/NdaForm'

export const metadata: Metadata = {
  title: 'Non-Disclosure Agreement',
  description:
    'Review and sign Burlington Consult\'s non-disclosure agreement to proceed with your application.',
}

export default function NdaPage() {
  return (
    <div className="auth-layout">
      <BrandPanel
        heading={
          <>
            Your information is{' '}
            <em className="font-medium italic text-teal-light" style={{ textShadow: '0 0 24px rgba(45,212,191,.25)' }}>
              protected
            </em>
            .
          </>
        }
        body="Before we review your application, both parties sign a mutual non-disclosure agreement. This ensures your professional details remain confidential."
        quote="Confidentiality isn't a formality — it's the foundation of the trust our clients place in us."
      />
      <NdaForm />
    </div>
  )
}
