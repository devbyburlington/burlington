import { SectionLabel } from '@burlington/ui'
import { DiffCard } from '../shared/DiffCard'
import { ArrowLink } from '../shared/ArrowLink'
import { StatStrip } from '../shared/StatStrip'
import { FadeIn } from '../shared/FadeIn'

const STATS = [
  { value: '2', label: 'Petitions filed' },
  { value: '12', label: 'Letters per case' },
  { value: '15', label: 'Day processing' },
  { value: '1', label: 'Priority date' },
]

const DIFFERENTIATORS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-none stroke-teal stroke-[1.5]">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: 'Dual Petition Strategy',
    desc: 'EB-1A and EB-2 NIW filed simultaneously. Two pathways, one priority date, one evidence record.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-none stroke-teal stroke-[1.5]">
        <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    title: 'Field of Endeavour',
    desc: 'Every case starts with the specific articulation of what you propose to do in the United States and why it matters.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-none stroke-teal stroke-[1.5]">
        <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: '12 Letters, From Scratch',
    desc: 'Every recommendation letter drafted by our team. Mapped to USCIS criteria. No templates.',
  },
]

export function Pitch() {
  return (
    <section className="bg-off-white px-5 py-14 sm:px-10 sm:py-16 lg:px-20 lg:py-[clamp(80px,10vw,140px)]">
      <div className="mx-auto max-w-[1200px]">
        {/* Intro */}
        <FadeIn className="mb-8 max-w-[600px] md:mb-10">
          <div className="mb-5">
            <SectionLabel>What we do</SectionLabel>
          </div>
          <h2 className="section-heading mb-4">
            We build the case that gets you a U.S. green card.
          </h2>
          <p className="section-body mb-5">
            Burlington Consult develops and files Einstein Visa (EB-1A) and EB-2 NIW petitions for high-achieving professionals, enabling permanent U.S. residency without an employer sponsor. No lottery. No corporate sponsorship. No waiting list.
          </p>
          <ArrowLink href="/pricing">View pricing</ArrowLink>
        </FadeIn>

        {/* Differentiator cards */}
        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:mb-10 lg:grid-cols-3">
          {DIFFERENTIATORS.map((item, i) => (
            <FadeIn key={item.title} delay={i * 120}>
              <DiffCard
                icon={item.icon}
                title={item.title}
                description={item.desc}
              />
            </FadeIn>
          ))}
        </div>

        {/* Stat strip */}
        <FadeIn delay={200} direction="none">
          <StatStrip stats={STATS} />
        </FadeIn>
      </div>
    </section>
  )
}
