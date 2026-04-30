import type { Metadata } from 'next'
import { BrandPanel } from '../../../components/auth/BrandPanel'
import { StatusView } from '../../../components/auth/StatusView'

export const metadata: Metadata = {
  title: 'Application Status',
  description:
    'Check the status of your Burlington Consult application.',
}

export default function StatusPage() {
  return (
    <div className="auth-layout">
      <BrandPanel
        heading={
          <>
            We review every{' '}
            <em className="font-medium italic text-teal-light" style={{ textShadow: '0 0 24px rgba(45,212,191,.25)' }}>
              application
            </em>
            {' '}personally.
          </>
        }
        body="Burlington does not use automated screening. A member of our team reads your application and evaluates fit individually."
        quote="We'd rather take fewer clients and serve them exceptionally than scale at the expense of quality."
      />
      <StatusView />
    </div>
  )
}
