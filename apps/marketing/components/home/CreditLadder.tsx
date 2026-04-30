import Link from 'next/link'
import { SectionLabel } from '@burlington/ui'
import { FadeIn } from '../shared/FadeIn'

const STEPS = [
  {
    num: '01',
    title: 'Profile Assessment',
    desc: 'Your record evaluated against all ten EB-1A criteria and the Dhanasar three-prong test.',
  },
  {
    num: '02',
    title: 'Field of Endeavour',
    desc: 'Define the specific field that anchors the narrative of both petitions.',
  },
  {
    num: '03',
    title: 'Evidence Architecture',
    desc: '12 recommendation letters, citations, and awards, all mapped to every USCIS criterion.',
  },
  {
    num: '04',
    title: 'Filing & Approval',
    desc: 'Dual I-140 petitions filed with premium processing. Decision within 15 business days.',
  },
]

export function CreditLadder() {
  return (
    <section className="relative overflow-hidden bg-dark-base px-5 py-14 sm:px-10 sm:py-16 lg:px-20 lg:py-[clamp(80px,10vw,120px)]">
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_80px,rgba(45,212,191,.015)_80px,rgba(45,212,191,.015)_81px)]" />

      <div className="relative z-[1] mx-auto max-w-[1000px]">
        <FadeIn className="mx-auto max-w-[700px] text-center" direction="none">
          <div className="mb-5">
            <SectionLabel variant="dark" centered>How it works</SectionLabel>
          </div>
          <h2 className="section-heading-dark mb-5 lg:whitespace-nowrap">
            Four phases. Every fee credits toward the next.
          </h2>
          <p className="section-body-dark mx-auto mb-0 max-w-[520px]">
            Start with a free assessment. If you move forward, every dollar you&apos;ve already paid rolls into the engagement. Nothing is wasted.
          </p>
        </FadeIn>

        <div className="process-grid">
          {STEPS.map((step, i) => (
            <FadeIn key={step.num} delay={i * 150} direction="up">
              <div className="process-step-wrap">
                <div className="process-step">
                  <span className="process-step-num">{step.num}</span>
                  <h4 className="process-step-title">{step.title}</h4>
                  <p className="process-step-desc">{step.desc}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="process-connector" aria-hidden="true" />
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={400} direction="none">
          <div className="mt-14 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-br from-teal to-teal-light px-[34px] py-[15px] text-[0.88rem] font-medium text-white shadow-[0_4px_20px_rgba(13,148,136,0.25),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(13,148,136,0.35)]"
            >
              View Pricing &rarr;
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
