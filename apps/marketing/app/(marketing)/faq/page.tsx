import type { Metadata } from 'next'
import { SectionLabel } from '@burlington/ui'
import { FaqAccordion } from '../../../components/faq/FaqAccordion'
import { Button } from '../../../components/shared/Button'

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Common questions on EB-1A, EB-2 NIW, and the current U.S. immigration processing environment.',
}

export default function FaqPage() {
  return (
    <>
      <section className="fq-hero">
        <div className="fq-hero-texture" />
        <div className="fq-hero-glow" />
        <div className="relative z-[1] mx-auto max-w-[780px] text-center">
          <div className="mb-5">
            <SectionLabel variant="dark" centered>Support</SectionLabel>
          </div>
          <h1 className="mb-5 font-serif text-[clamp(1.8rem,4vw,2.8rem)] font-medium leading-[1.1] tracking-tight text-white">
            Frequently asked{' '}
            <span className="relative inline bg-gradient-to-br from-teal to-teal-light bg-clip-text text-transparent">
              questions.
              <span className="absolute bottom-0.5 left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-teal to-teal-light opacity-30" />
            </span>
          </h1>
          <p className="section-body-dark mx-auto max-w-[540px]">
            Common questions on EB-1A, EB-2 NIW, and the current U.S. immigration
            processing environment.
          </p>
        </div>
      </section>

      <section className="fq-body">
        <div className="mx-auto max-w-[840px]">
          <FaqAccordion />
        </div>
      </section>

      <section className="fq-cta">
        <div className="fq-cta-texture" />
        <div className="fq-cta-glow" />
        <div className="relative z-[1] mx-auto max-w-[680px] text-center">
          <h2 className="section-heading-dark mb-4">Still have questions?</h2>
          <p className="section-body-dark mx-auto mb-10 max-w-[460px]">
            Book a consultation and get direct answers from our advisory team,
            or start with a free profile assessment.
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
