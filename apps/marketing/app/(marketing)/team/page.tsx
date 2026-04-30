import type { Metadata } from 'next'
import { TeamHero } from '../../../components/team/TeamHero'
import { Leadership } from '../../../components/team/Leadership'
import { TeamGrid } from '../../../components/team/TeamGrid'
import { HiringCta } from '../../../components/team/HiringCta'
import { SectionBridge } from '../../../components/shared/SectionBridge'

export const metadata: Metadata = {
  title: 'Our Team',
}

export default function TeamPage() {
  return (
    <main>
      <TeamHero />
      <SectionBridge variant="dark-to-light" />
      <Leadership />
      <TeamGrid />
      <SectionBridge variant="white-to-dark" />
      <HiringCta />
    </main>
  )
}
