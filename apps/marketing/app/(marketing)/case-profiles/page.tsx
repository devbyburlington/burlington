import type { Metadata } from 'next'
import { SectionLabel } from '@burlington/ui'
import { CaseFilter } from '../../../components/cases/CaseFilter'
import { Button } from '../../../components/shared/Button'

export const metadata: Metadata = {
  title: 'Case Profiles',
  description:
    'Anonymised profiles illustrating the types of professionals Burlington Consult advises and the petition strategies developed for each.',
}

const STATS = [
  { value: '8', label: 'Representative profiles' },
  { value: '6', label: 'Professional fields' },
  { value: '5', label: 'Regions represented' },
]

export default function CasesPage() {
  return (
    <>
      <section className="cs-hero">
        <div className="cs-hero-texture" />
        <div className="cs-hero-glow" />
        <div className="relative z-[1] mx-auto max-w-[780px] text-center">
          <div className="mb-5">
            <SectionLabel variant="dark" centered>Case Profiles</SectionLabel>
          </div>
          <h1 className="mb-5 font-serif text-[clamp(1.8rem,4vw,2.8rem)] font-medium leading-[1.1] tracking-tight text-white">
            Representative{' '}
            <span className="relative inline bg-gradient-to-br from-teal to-teal-light bg-clip-text text-transparent">
              case profiles.
              <span className="absolute bottom-0.5 left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-teal to-teal-light opacity-30" />
            </span>
          </h1>
          <p className="section-body-dark mx-auto mb-6 max-w-[560px]">
            Anonymised profiles illustrating the types of professionals Burlington Consult
            advises and the petition strategies developed for each.
          </p>
          <div className="cs-disclaimer">
            These are representative profiles — not descriptions of specific client engagements.
            Details have been generalised. Past outcomes do not guarantee future results.
          </div>

          <div className="mx-auto mt-10 grid max-w-[460px] grid-cols-3">
            {STATS.map((stat, i) => (
              <div key={i} className="relative px-4 text-center">
                {i > 0 && (
                  <span className="absolute top-1 bottom-1 left-0 w-px bg-gradient-to-b from-transparent via-teal/20 to-transparent" />
                )}
                <div className="bg-gradient-to-br from-white via-white to-teal-light bg-clip-text font-serif text-[1.3rem] font-medium tracking-tight text-transparent sm:text-[1.5rem]">
                  {stat.value}
                </div>
                <div className="mt-1 text-[0.62rem] uppercase tracking-[.06em] text-white/40 sm:text-[0.68rem]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-body">
        <div className="mx-auto max-w-[1200px]">
          <CaseFilter />
        </div>
      </section>

      <section className="cs-cta">
        <div className="cs-cta-texture" />
        <div className="cs-cta-glow" />
        <div className="relative z-[1] mx-auto max-w-[680px] text-center">
          <h2 className="section-heading-dark mb-4">See yourself in these profiles?</h2>
          <p className="section-body-dark mx-auto mb-10 max-w-[480px]">
            Start with a profile assessment. Burlington Consult reviews your record and
            advises on the strongest available pathway.
          </p>
          <div className="flex flex-col items-center gap-3.5 sm:flex-row sm:justify-center sm:gap-4">
            <Button href="/assess" className="w-full max-w-[320px] sm:w-auto">
              Take Free Assessment &rarr;
            </Button>
            <Button href="/pricing" variant="ghost" className="w-full max-w-[320px] sm:w-auto">
              View Pricing
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
