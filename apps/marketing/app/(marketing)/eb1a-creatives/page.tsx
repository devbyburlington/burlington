import type { Metadata } from 'next'
import { PathwayHero } from '../../../components/pathways/PathwayHero'
import { PathwaySection } from '../../../components/pathways/PathwaySection'
import { PathwayCriteria } from '../../../components/pathways/PathwayCriteria'
import { PathwayLeads } from '../../../components/pathways/PathwayLeads'
import { PathwayCTA } from '../../../components/pathways/PathwayCTA'
import { SectionBridge } from '../../../components/shared/SectionBridge'

export const metadata: Metadata = {
  title: 'EB-1A for Artists & Creatives',
  description:
    'The U.S. Einstein Visa for artists, musicians, and creatives. No employer, no lottery, no relocation required.',
}

const HERO_STATS = [
  { value: 'No sponsor', label: 'Self-petitioned' },
  { value: 'No relocation', label: 'Stay where you are' },
  { value: 'Your record', label: 'Is your qualification' },
]

const OPPORTUNITY_FACTS = [
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    title: 'No relocation required',
    description: "You don't have to move to the U.S. to qualify.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: 'Your record is your qualification',
    description: 'Awards, streaming numbers, media coverage — criteria you already meet.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: 'The window is now',
    description: '2026 rule changes will raise the bar. File under current standards.',
  },
]

const CRITERIA = [
  {
    num: 'i',
    title: 'Awards and recognition',
    description:
      'Grammy nominations, BET, AFRIMA, Headies, MOBO, or other nationally or internationally recognised awards in the performing arts.',
  },
  {
    num: 'iii',
    title: 'Published material about the artist',
    description:
      'Features in Rolling Stone, Billboard, Variety, The Guardian, Pulse Nigeria, or equivalent major media.',
  },
  {
    num: 'ix',
    title: 'Commercial success',
    description: 'Streaming numbers, concert revenue, album sales, international distribution deals.',
  },
  {
    num: 'vii',
    title: 'Critical role at a distinguished organisation',
    description:
      'Headlining a major festival, leading a record label, or holding a creative director role.',
  },
]

const ADVANTAGE_FACTS = [
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10" />
      </svg>
    ),
    title: 'Global career mobility',
    description: 'No employer ties. Tour, record, and collaborate freely.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    title: 'U.S. banking and tax advantages',
    description: 'Structure international revenue through a U.S. entity.',
  },
]

const TEAM_LEADS = [
  {
    name: 'Paschal Ucheagwu',
    role: 'Head of Creative Partnerships',
    image: '/team-pascal.jpg',
    href: '/team/paschal',
  },
  {
    name: 'Michael Aromolaran',
    role: 'Chief Writing Officer',
    href: '/team/michael',
  },
]

export default function EB1ACreativesPage() {
  return (
    <>
      <PathwayHero
        tag="For Artists, Musicians & Creatives"
        title="You might qualify for<br/>a U.S. Green Card."
        description="No employer. No lottery. No relocation required. The U.S. Einstein Visa is available to artists, musicians, and creatives with exactly the kind of career you've been building."
        stats={HERO_STATS}
      />
      <SectionBridge variant="dark-to-white" />

      <PathwaySection
        tag="The opportunity"
        heading="The EB-1A is not just for scientists."
        paragraphs={[
          "Most successful African artists don't know this: the U.S. Einstein Visa is available to artists, musicians, and creatives with exactly the kind of career you've been building.",
          "You don't have to quit your current work. You don't have to move to America. You don't need an American employer, a visa lottery result, or a sponsor. <strong>You need your professional record, and the right team to document it.</strong>",
        ]}
        facts={OPPORTUNITY_FACTS}
      />
      <SectionBridge variant="white-to-dark" />

      <PathwayCriteria
        heading="How artists typically qualify."
        subtitle="The EB-1A requires at least 3 of 10 regulatory criteria. For artists with a strong record, Burlington typically identifies the following:"
        items={CRITERIA}
        columns={2}
      />
      <SectionBridge variant="dark-to-warm" />

      <PathwaySection
        variant="alt"
        tag="What a green card means"
        heading="Six practical advantages."
        paragraphs={[
          '<strong>U.S. touring without visa anxiety.</strong> No more B-1/B-2 applications, no tour dates at risk.',
          '<strong>Direct label and management deals.</strong> Work directly with U.S. labels, publishers, and streaming platforms as a permanent resident.',
          '<strong>U.S. business formation.</strong> Open a U.S. entity, receive payments directly, structure international revenue.',
          '<strong>Family sponsorship.</strong> Bring your spouse and children as permanent residents.',
        ]}
        facts={ADVANTAGE_FACTS}
      />

      <PathwayLeads leads={TEAM_LEADS} />
      <SectionBridge variant="light-to-dark" />

      <PathwayCTA
        heading="A 30-minute conversation is all it takes."
        description="Burlington will assess whether your case is strong before any engagement. We will be direct."
      />
    </>
  )
}
