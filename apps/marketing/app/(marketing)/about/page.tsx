import type { Metadata } from 'next'
import { AboutHero } from '../../../components/about/AboutHero'
import { TheChallenge } from '../../../components/about/TheChallenge'
import { BeyondTheFirm } from '../../../components/about/BeyondTheFirm'
import { FinalCta } from '../../../components/home/FinalCta'
import { SectionBridge } from '../../../components/shared/SectionBridge'

export const metadata: Metadata = {
  title: { absolute: 'About Burlington Consult' },
}

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <SectionBridge variant="dark-to-light" />
      <TheChallenge />
      <SectionBridge variant="light-to-dark" />
      <BeyondTheFirm />
      <FinalCta />
    </main>
  )
}
