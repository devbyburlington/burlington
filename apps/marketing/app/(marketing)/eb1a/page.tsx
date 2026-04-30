import type { Metadata } from 'next'
import { PathwayHero } from '../../../components/pathways/PathwayHero'
import { PathwaySection } from '../../../components/pathways/PathwaySection'
import { PathwayCriteria } from '../../../components/pathways/PathwayCriteria'
import { PathwayLeads } from '../../../components/pathways/PathwayLeads'
import { PathwayCTA } from '../../../components/pathways/PathwayCTA'
import { SectionBridge } from '../../../components/shared/SectionBridge'

export const metadata: Metadata = {
  title: 'Einstein Visa',
  description:
    'The most distinguished employment-based visa the United States issues. EB-1A extraordinary ability — no employer sponsor required.',
}

const HERO_STATS = [
  { value: '<5%', label: 'Of employment-based green cards' },
  { value: '15 days', label: 'Premium processing' },
  { value: 'No sponsor', label: 'Self-petitioned' },
]

const OVERVIEW_FACTS = [
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Self-petitioned',
    description: 'No employer, no sponsor, no PERM. The green card is yours.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: 'Priority date on filing',
    description: 'Queue position established the day USCIS receives your I-140.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: 'Current standards apply',
    description: 'Proposed rule changes are not yet in effect. File now.',
  },
]

const CRITERIA = [
  { num: 'i', title: 'Awards', description: 'Nationally or internationally recognised prizes for excellence' },
  { num: 'ii', title: 'Membership', description: 'In associations requiring outstanding achievement' },
  { num: 'iii', title: 'Published material', description: 'About the petitioner in professional or major publications' },
  { num: 'iv', title: 'Judging', description: "Participation as a judge of others' work" },
  { num: 'v', title: 'Original contributions', description: 'Of major significance in the field' },
  { num: 'vi', title: 'Scholarly articles', description: 'In professional or major publications' },
  { num: 'vii', title: 'Critical role', description: 'In distinguished organisations' },
  { num: 'viii', title: 'High salary', description: 'Relative to peers in the field in relevant country' },
  { num: 'ix', title: 'Commercial success', description: 'In the performing arts' },
  { num: 'x', title: 'Display of work', description: 'At artistic exhibitions or showcases' },
]

const APPROACH_FACTS = [
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
      </svg>
    ),
    title: 'No job offer required',
    description: 'The green card is tied to your expertise, not to any employer.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: 'Priority date is set on filing',
    description: 'Every month of delay is a month later in the queue.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 12h18" />
      </svg>
    ),
    title: 'Current standards are most favourable',
    description: 'Proposed changes would raise the bar. File now.',
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
    name: 'Efezino Onyeke',
    role: 'Legal Analyst',
    image: '/team-efezino.jpg',
    href: '/team/efezino',
  },
]

export default function EB1APage() {
  return (
    <>
      <PathwayHero
        tag="Immigration Pathway"
        title="The Einstein Visa (EB-1A).<br/>Extraordinary Ability."
        description="The most distinguished employment-based visa the United States issues. Same statutory classification as Nobel laureates, Pulitzer recipients, and Olympic champions."
        stats={HERO_STATS}
      />
      <SectionBridge variant="dark-to-white" />

      <PathwaySection
        tag="Overview"
        heading="What is the Einstein Visa (EB-1A)?"
        paragraphs={[
          'Reserved for individuals who demonstrate <strong>sustained national or international acclaim</strong> for extraordinary ability. Same classification as the highest achievers in sciences, arts, education, business, or athletics.',
          '<strong>Fewer than 5% of all employment-based green cards carry this classification annually.</strong> No job offer. No employer sponsor. No U.S. labour market test.',
        ]}
        facts={OVERVIEW_FACTS}
      />
      <SectionBridge variant="white-to-dark" />

      <PathwayCriteria
        heading="The ten regulatory criteria."
        subtitle="USCIS requires at least three of ten. Meeting three is necessary but not sufficient — the final merits determination is where petitions succeed or fail."
        items={CRITERIA}
        columns={2}
      />
      <SectionBridge variant="dark-to-warm" />

      <PathwaySection
        variant="alt"
        tag="Burlington's approach"
        heading="How we build your case."
        paragraphs={[
          'Burlington Consult does not apply a template. The most consequential decision is the <strong>field of endeavour</strong> — the specific articulation of what you propose to pursue in the United States.',
          'We analyse your full professional record, identify the strongest available field of endeavour, test it against all three Dhanasar prongs, and confirm alignment with your evidence base.',
        ]}
        facts={APPROACH_FACTS}
        pullquote="Burlington Consult's lead adviser is a self-petitioned, first-submission EB-1A holder — direct practitioner knowledge of the exact system your petition enters."
      />

      <PathwayLeads leads={TEAM_LEADS} />
      <SectionBridge variant="light-to-dark" />

      <PathwayCTA
        heading="Think you qualify for the Einstein Visa?"
        description="Our free assessment maps your profile against the EB-1A criteria. No commitment. No cost. Just clarity."
      />
    </>
  )
}
