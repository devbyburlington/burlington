import type { Metadata } from 'next'
import { PathwayHero } from '../../../components/pathways/PathwayHero'
import { PathwaySection } from '../../../components/pathways/PathwaySection'
import { PathwayCriteria } from '../../../components/pathways/PathwayCriteria'
import { PathwayLeads } from '../../../components/pathways/PathwayLeads'
import { PathwayCTA } from '../../../components/pathways/PathwayCTA'
import { SectionBridge } from '../../../components/shared/SectionBridge'

export const metadata: Metadata = {
  title: 'Dual Petition Strategy',
  description:
    'EB-1A and NIW filed simultaneously. One priority date. One evidence record. Strategic redundancy.',
}

const HERO_STATS = [
  { value: '2 petitions', label: 'Filed simultaneously' },
  { value: '1 priority date', label: 'Shared across both' },
  { value: '12 months', label: 'RFE retainer included' },
]

const WHY_DUAL_FACTS = [
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 12h18" />
      </svg>
    ),
    title: 'One evidence record',
    description: 'Built once, deployed across both petitions with distinct legal arguments.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'One priority date',
    description: 'Applies to whichever pathway is approved first.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: 'Independent processing',
    description: 'An RFE on one does not affect the other.',
  },
]

const FRAMEWORKS = [
  {
    num: 'EB-1A',
    title: 'Kazarian two-step framework',
    description:
      'Satisfying at least three of ten criteria, then demonstrating through a final merits determination that you are among the small percentage at the very top.',
  },
  {
    num: 'NIW',
    title: 'Dhanasar three-prong test',
    description:
      'Substantial merit and national importance, strong positioning to advance the endeavour, and net benefit to the U.S. from waiving the job offer requirement.',
  },
]

const TIMING_FACTS = [
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: '~$20,000',
    description: 'Full dual petition. Comparable firms: $35,000-$55,000.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: '12-month RFE retainer',
    description: 'Included at no additional charge.',
  },
]

const TEAM_LEADS = [
  {
    name: 'Chris Ogbodo',
    role: 'Founder & Lead Adviser',
    image: '/ebuka.png',
    href: '/team/chris',
  },
  {
    name: 'Chibuike Onyia, ACA',
    role: 'Salary Criterion Lead',
    image: '/team-onyia.jpg',
    href: '/team/chibuike',
  },
]

export default function DualPetitionPage() {
  return (
    <>
      <PathwayHero
        tag="Strategy"
        title="The dual petition strategy."
        description="Burlington Consult files the EB-1A and NIW simultaneously — preserving a single priority date, creating strategic redundancy, and building one unified evidence record."
        stats={HERO_STATS}
      />
      <SectionBridge variant="dark-to-white" />

      <PathwaySection
        tag="Why dual filing"
        heading="Two pathways. One strategy."
        paragraphs={[
          'The EB-1A and NIW are complementary pathways that draw from the same professional record but are assessed under different legal frameworks.',
          '<strong>Same priority date.</strong> Both petitions are receipted on the same day, establishing a single queue position.',
          '<strong>Strategic redundancy.</strong> If one petition receives an RFE, the other continues processing independently.',
        ]}
        facts={WHY_DUAL_FACTS}
      />
      <SectionBridge variant="white-to-dark" />

      <PathwayCriteria
        heading="One record. Two arguments."
        subtitle="Burlington builds a single unified evidence record and deploys it across both petitions with distinct legal arguments."
        items={FRAMEWORKS}
        columns={2}
      />
      <SectionBridge variant="dark-to-warm" />

      <PathwaySection
        variant="alt"
        tag="The numbers"
        heading="Why timing matters."
        paragraphs={[
          '<strong>15 business days</strong> — premium processing decision on the I-140.',
          '<strong>20-22 months</strong> — standard processing. Every month of delay extends the timeline by the same period.',
          '<strong>41-49%</strong> — RFE issuance rates in early 2026. Dual filing ensures one RFE does not stall everything.',
        ]}
        facts={TIMING_FACTS}
        pullquote="Proposed regulatory changes (RIN 1615-AC85) would raise evidentiary thresholds. Petitions filed now are assessed against current, more favourable standards."
      />

      <PathwayLeads leads={TEAM_LEADS} />
      <SectionBridge variant="light-to-dark" />

      <PathwayCTA
        heading="File both. Preserve one priority date."
        description="Our free assessment evaluates whether your profile supports a dual EB-1A and NIW filing."
      />
    </>
  )
}
