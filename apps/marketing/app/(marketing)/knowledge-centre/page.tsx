import type { Metadata } from 'next'
import { SectionLabel } from '@burlington/ui'
import { ResourcesFilter } from '../../../components/resources/ResourcesFilter'
import { NewsletterForm } from '../../../components/resources/NewsletterForm'

export const metadata: Metadata = {
  title: 'Knowledge Centre',
  description:
    'Regulatory analysis, case strategy frameworks, and practitioner intelligence from Burlington Consult.',
}

const STATS = [
  { value: '7', label: 'Published articles' },
  { value: '40+', label: 'Countries reading' },
  { value: 'Fortnightly', label: 'Burlington Brief' },
]

export default function ResourcesPage() {
  return (
    <>
      <section className="kc-hero">
        <div className="kc-hero-texture" />
        <div className="kc-hero-glow" />
        <div className="relative z-[1] mx-auto max-w-[780px] text-center">
          <div className="mb-5">
            <SectionLabel variant="dark" centered>Knowledge Centre</SectionLabel>
          </div>
          <h1 className="mb-5 font-serif text-[clamp(1.8rem,4vw,2.8rem)] font-medium leading-[1.1] tracking-tight text-white">
            Immigration strategy,{' '}
            <span className="relative inline bg-gradient-to-br from-teal to-teal-light bg-clip-text text-transparent">
              not immigration noise.
              <span className="absolute bottom-0.5 left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-teal to-teal-light opacity-30" />
            </span>
          </h1>
          <p className="section-body-dark mx-auto mb-10 max-w-[540px]">
            Regulatory analysis, case strategy frameworks, and practitioner intelligence.
            Written by people who file these petitions.
          </p>

          <div className="mx-auto grid max-w-[520px] grid-cols-3">
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

      <section className="bg-off-white px-5 py-[clamp(48px,8vw,72px)] sm:px-10 lg:px-20">
        <div className="mx-auto max-w-[1200px]">
          <ResourcesFilter />
        </div>
      </section>

      <section className="kc-nl">
        <div className="kc-nl-texture" />
        <div className="kc-nl-glow" />
        <div className="relative z-[1] mx-auto max-w-[640px]">
          <div className="kc-nl-card">
            <div className="mb-6 text-center sm:mb-0 sm:text-left">
              <h2 className="mb-3 font-serif text-[1.3rem] font-medium text-white sm:text-[1.5rem]">
                The Burlington Brief
              </h2>
              <p className="text-[0.82rem] leading-[1.7] text-white/40">
                A private intelligence update on U.S. immigration strategy for senior professionals.
                Regulatory developments, adjudication trends, and case strategy insights.
              </p>
              <p className="mt-3 text-[0.7rem] text-white/20">
                Read by immigration attorneys, HR leaders, and senior professionals across 40+ countries.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  )
}
