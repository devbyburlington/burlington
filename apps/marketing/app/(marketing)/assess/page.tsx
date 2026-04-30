import type { Metadata } from 'next'
import { Assessment } from '@/components/assessment/Assessment'

export const metadata: Metadata = {
  title: 'Free EB-1A Eligibility Assessment',
  description:
    'Evaluate your EB-1A extraordinary ability visa eligibility across all ten USCIS criteria. Confidential, no account required.',
}

export default function AssessPage() {
  return <Assessment />
}
