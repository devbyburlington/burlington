import { SectionLabel } from '@burlington/ui'
import { FadeIn } from '../shared/FadeIn'

const STEPS = [
  {
    num: '01',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-teal-light stroke-[1.5]">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: 'Profile Assessment',
    desc: 'Written evaluation of your record against all ten EB-1A criteria and the three-prong Dhanasar test.',
  },
  {
    num: '02',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-teal-light stroke-[1.5]">
        <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    title: 'Field of Endeavour',
    desc: 'Define and stress-test the specific field that anchors the narrative of both petitions.',
  },
  {
    num: '03',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-teal-light stroke-[1.5]">
        <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: 'Evidence Architecture',
    desc: '12 recommendation letters, citations, press, and awards — mapped to every applicable USCIS criterion.',
  },
  {
    num: '04',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-teal-light stroke-[1.5]">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Filing & Approval',
    desc: 'Dual I-140 petitions filed to USCIS with premium processing. Decision within 15 business days.',
  },
]

export function Process() {
  return (
    <section className="border-t border-burl-gray-100 bg-off-white px-5 py-14 sm:px-10 sm:py-16 lg:px-20 lg:py-[clamp(80px,10vw,140px)]">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-5">
          <SectionLabel centered>Our Process</SectionLabel>
        </div>
        <h2 className="mb-2 text-center font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-medium leading-[1.15] tracking-tight text-burl-gray-700">
          From assessment to approval.
        </h2>
        <p className="mx-auto mb-10 max-w-[580px] text-center text-[0.88rem] leading-[1.75] text-burl-gray-400">
          A structured, four-phase engagement designed around USCIS adjudication standards and the Kazarian two-step framework.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <FadeIn key={step.num} delay={i * 120}>
              <div className="flex h-full flex-col items-center rounded-2xl border border-burl-gray-100 bg-white px-6 pb-7 pt-6 text-center shadow-[0_2px_12px_rgba(0,0,0,.04)]">
                <div className="mb-3 text-[0.62rem] font-medium uppercase tracking-[.14em] text-teal">{step.num}</div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-teal/10 bg-teal/[.08]">
                  {step.icon}
                </div>
                <h4 className="mb-2 font-serif text-[0.95rem] font-medium text-burl-gray-700">{step.title}</h4>
                <p className="mt-auto text-[0.8rem] leading-[1.6] text-burl-gray-400 sm:text-[0.82rem]">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
