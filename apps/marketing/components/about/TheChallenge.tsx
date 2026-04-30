import Image from 'next/image'
import { SectionLabel } from '@burlington/ui'
import { FadeIn } from '../shared/FadeIn'

const STATS = [
  { value: '100%', label: 'Approval rate across all petitions filed' },
  { value: '41-49%', label: 'RFE issuance rate across EB-1A and NIW petitions in early 2026' },
  { value: '12 mo.', label: 'RFE and NOID retainer included at no additional charge' },
]

export function TheChallenge() {
  return (
    <section className="bg-off-white px-5 py-14 sm:px-10 sm:py-16 lg:px-20 lg:py-[clamp(80px,10vw,140px)]">
      <div className="mx-auto max-w-[1200px]">
        {/* Photo band */}
        <div className="about-challenge-photo mb-10 lg:mb-14">
          <Image
            src="/about-documents.jpg"
            alt="Professional reviewing petition documents"
            fill
            className="object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-off-white via-transparent to-transparent" />
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px] lg:gap-16">
          {/* Left — narrative */}
          <FadeIn>
            <div className="mb-5">
              <SectionLabel>The challenge</SectionLabel>
            </div>
            <h2 className="section-heading mb-6">
              World-class credentials, lost in translation.
            </h2>
            <div className="space-y-4">
              <p className="section-body">
                Professionals from Nigeria, Ghana, Kenya, South Africa, and across the continent frequently have records that are world-class by any objective measure, but are not automatically legible in the format USCIS expects.
              </p>
              <p className="section-body">
                A Partner-level role at a Tier 1 law firm, a senior position at an NSE-listed institution, a decade at a Big Four firm in Lagos. These carry the same weight as the equivalent in London or New York. Burlington Consult&apos;s job is to make that equivalence unmistakably clear to a USCIS adjudicator.
              </p>

              <blockquote className="my-8 border-l-2 border-teal/30 pl-5">
                <p className="font-serif text-[1.05rem] font-medium italic leading-[1.6] text-burl-gray-700">
                  USCIS doesn&apos;t deny weak candidates. It denies weak arguments.
                </p>
              </blockquote>

              <p className="section-body">
                Whether your record is built on publications or creative work, corporate leadership or independent practice, traditional credentials or unconventional ones, the approach is the same: identify the strongest field of endeavour, build the evidentiary architecture, and file a case that doesn&apos;t come back.
              </p>
            </div>
          </FadeIn>

          {/* Right — stats */}
          <div className="flex flex-col gap-4 lg:pt-14">
            {STATS.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 120} direction="right">
              <div className="rounded-xl border border-burl-gray-100 bg-white p-5">
                <div className="mb-1.5 font-serif text-[1.5rem] font-semibold tracking-tight text-teal-dark">
                  {stat.value}
                </div>
                <div className="text-[0.78rem] leading-[1.6] text-burl-gray-400">
                  {stat.label}
                </div>
              </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
