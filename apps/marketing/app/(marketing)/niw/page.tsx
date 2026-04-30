import type { Metadata } from 'next'
import { PathwayHero } from '../../../components/pathways/PathwayHero'
import { PathwaySection } from '../../../components/pathways/PathwaySection'
import { PathwayCriteria } from '../../../components/pathways/PathwayCriteria'
import { PathwayLeads } from '../../../components/pathways/PathwayLeads'
import { PathwayCTA } from '../../../components/pathways/PathwayCTA'
import { SectionBridge } from '../../../components/shared/SectionBridge'

export const metadata: Metadata = {
  title: 'NIW Petition',
  description:
    'The self-petitioned pathway for professionals whose proposed work serves a demonstrable U.S. national interest. No employer sponsor. No PERM labour certification.',
}

const HERO_STATS = [
  { value: 'Dhanasar', label: '3-prong framework' },
  { value: '15 days', label: 'Premium processing' },
  { value: 'No PERM', label: 'No labour certification' },
]

const OVERVIEW_FACTS = [
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Self-petitioned',
    description: 'No employer, no PERM, no labour certification.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: 'Filed with EB-1A',
    description: 'Same priority date. Single evidence record. Strategic redundancy.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6" />
      </svg>
    ),
    title: 'Dhanasar framework',
    description: 'All three prongs must be satisfied.',
  },
]

const PRONGS = [
  {
    num: '1',
    title: 'Substantial merit and national importance',
    description:
      'The proposed endeavour must have substantial merit and national importance. Merit may be established across business, science, technology, health, culture, or education.',
  },
  {
    num: '2',
    title: 'Well positioned to advance the endeavour',
    description:
      'USCIS considers education, skills, knowledge, record of success, a plan for future activities, and interest from relevant third parties.',
  },
  {
    num: '3',
    title: 'On balance, beneficial to waive',
    description:
      'USCIS must find that the national interest benefit outweighs the standard procedural requirement of a job offer and labour certification.',
  },
]

const APPROACH_FACTS = [
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 12h18" />
      </svg>
    ),
    title: 'Filed simultaneously with EB-1A',
    description: 'One evidence record. Two pathways. One priority date.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: 'Strategic redundancy',
    description: 'If one petition gets an RFE, the other continues independently.',
  },
]

const TEAM_LEADS = [
  {
    name: 'Afiong Ibio, Esq.',
    role: 'Director and Head of Legal, Nigeria',
    image: '/team-afiong.jpg',
    href: '/team/afiong',
  },
  {
    name: 'Efezino Onyeke',
    role: 'Legal Analyst',
    image: '/team-efezino.jpg',
    href: '/team/efezino',
  },
]

export default function NIWPage() {
  return (
    <>
      <PathwayHero
        tag="Immigration Pathway"
        title="The NIW Petition (EB-2).<br/>National Interest Waiver."
        description="The self-petitioned pathway for professionals whose proposed work serves a demonstrable U.S. national interest. No employer sponsor. No PERM labour certification."
        stats={HERO_STATS}
      />
      <SectionBridge variant="dark-to-white" />

      <PathwaySection
        tag="Overview"
        heading="What is the NIW (EB-2)?"
        paragraphs={[
          'The NIW allows advanced degree professionals and those with exceptional ability to self-petition for permanent residency <strong>without employer sponsorship or PERM labour certification</strong>.',
          'The petitioner must demonstrate that their proposed work is in the U.S. national interest — assessed under the three-prong test established in <strong>Matter of Dhanasar</strong> (2016).',
        ]}
        facts={OVERVIEW_FACTS}
      />
      <SectionBridge variant="white-to-dark" />

      <PathwayCriteria
        heading="Three prongs. All must be satisfied."
        subtitle="The Dhanasar three-prong test governs every NIW petition. Burlington Consult maps each prong to your specific evidentiary record."
        items={PRONGS}
        columns={1}
      />
      <SectionBridge variant="dark-to-warm" />

      <PathwaySection
        variant="alt"
        tag="Burlington's approach"
        heading="The proposed endeavour is everything."
        paragraphs={[
          'The most critical single decision in the NIW petition is the <strong>proposed endeavour</strong> — the specific framework that satisfies all three Dhanasar prongs.',
          'Burlington Consult develops the proposed endeavour from your specific documented record, connecting it to documented U.S. federal priorities. This is not a generic statement — it is a bespoke legal argument.',
        ]}
        facts={APPROACH_FACTS}
        pullquote="Errors at the proposed endeavour stage are not correctable by adding stronger evidence later. Burlington stress-tests every framework before drafting begins."
      />

      <PathwayLeads leads={TEAM_LEADS} />
      <SectionBridge variant="light-to-dark" />

      <PathwayCTA
        heading="Ready to build your proposed endeavour?"
        description="Our free assessment maps your profile against the Dhanasar framework and identifies the strongest field of endeavour."
      />
    </>
  )
}
