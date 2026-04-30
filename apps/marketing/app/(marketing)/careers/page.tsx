import type { Metadata } from 'next'
import { CareersHero } from '../../../components/careers/CareersHero'
import { CareersBody } from '../../../components/careers/CareersBody'
import { CareersForm } from '../../../components/careers/CareersForm'
import { SectionBridge } from '../../../components/shared/SectionBridge'

export const metadata: Metadata = {
  title: { absolute: 'Careers at Burlington Consult' },
  description:
    'Join Burlington Consult. We are hiring across legal strategy, engineering, growth, research, and operations. Remote positions across three continents.',
}

export default function CareersPage() {
  return (
    <main>
      <CareersHero />
      <SectionBridge variant="dark-to-light" />
      <CareersBody />
      <SectionBridge variant="light-to-dark" />
      <CareersForm />
    </main>
  )
}
