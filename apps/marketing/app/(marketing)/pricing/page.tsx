import type { Metadata } from 'next'
import { ServicesList } from '../../../components/services/ServicesList'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Immigration advisory, elite graduate admissions, and career strategy. Burlington Consult develops and files EB-1A and NIW petitions for exceptional professionals.',
}

export default function ServicesPage() {
  return (
    <main>
      <ServicesList />
    </main>
  )
}
