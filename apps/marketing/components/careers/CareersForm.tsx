'use client'

import { useState, type FormEvent } from 'react'
import { SectionLabel } from '@burlington/ui'
import { FadeIn } from '../shared/FadeIn'

const AREAS_OF_INTEREST = [
  'Legal & Case Strategy',
  'Engineering & Product',
  'Growth & Marketing',
  'Research & Due Diligence',
  'Operations & Client Success',
  'Other',
]

export function CareersForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <section className="relative overflow-hidden bg-dark-base px-5 py-14 sm:px-10 sm:py-16 lg:px-20 lg:py-[clamp(80px,10vw,140px)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(13,148,136,.08),transparent)]" />
        <div className="relative z-[1] mx-auto max-w-[560px] text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-teal/20 bg-teal/[.08]">
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-teal-light stroke-[1.75]">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="section-heading-dark mb-4">Application received.</h2>
          <p className="section-body-dark mx-auto max-w-[440px]">
            Your application goes directly to the founder. No ATS, no black holes. If there is a fit, you will hear from us within two weeks.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden bg-dark-base px-5 py-14 sm:px-10 sm:py-16 lg:px-20 lg:py-[clamp(80px,10vw,140px)]">
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_80px,rgba(45,212,191,.015)_80px,rgba(45,212,191,.015)_81px)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(13,148,136,.08),transparent)]" />

      <div className="relative z-[1] mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* Left — pitch */}
          <FadeIn className="lg:pt-2">
            <div className="mb-5">
              <SectionLabel variant="dark">Apply</SectionLabel>
            </div>
            <h2 className="section-heading-dark mb-5">
              Drop your CV and tell us what makes you exceptional.
            </h2>
            <div className="space-y-4">
              <p className="section-body-dark">
                Your application goes directly to the founder. No applicant tracking system. No automated screening. No black holes.
              </p>
              <p className="section-body-dark">
                We read every application personally and respond within two weeks. If there is a fit, we will reach out to schedule a conversation.
              </p>
            </div>

            <blockquote className="my-8 border-l-2 border-teal/30 pl-5">
              <p className="font-serif text-[1.05rem] font-medium italic leading-[1.6] text-white/70">
                The best people we have hired had unconventional backgrounds. What they shared was an obsessive attention to craft.
              </p>
              <cite className="mt-3 block text-[0.75rem] not-italic text-white/30">
                Chris Ogbodo, Founder
              </cite>
            </blockquote>

            <div className="flex flex-wrap items-center gap-4 rounded-xl border border-white/[.06] bg-white/[.02] p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-teal/20 bg-teal/[.08]">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-teal-light stroke-[1.5]">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <div className="text-[0.78rem] text-white/35">Prefer email?</div>
                <a href="mailto:hello@burlingtonconsult.com" className="text-[0.84rem] font-medium text-teal-light transition-colors hover:text-white">
                  hello@burlingtonconsult.com
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Right — form */}
          <FadeIn delay={200} direction="right">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/[.08] bg-white p-6 shadow-[0_8px_40px_rgba(0,0,0,.3)] sm:p-8"
            >
              <div className="space-y-5">
                <div>
                  <label htmlFor="careers-name" className="mb-1.5 block text-[0.78rem] font-medium text-burl-gray-700">
                    Full name
                  </label>
                  <input
                    id="careers-name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-lg border border-burl-gray-200 bg-white px-4 py-3 text-[0.88rem] text-burl-gray-900 outline-none transition-colors placeholder:text-burl-gray-300 focus:border-teal/40 focus:ring-1 focus:ring-teal/20"
                    placeholder="Jane Adeyemi"
                  />
                </div>

                <div>
                  <label htmlFor="careers-email" className="mb-1.5 block text-[0.78rem] font-medium text-burl-gray-700">
                    Email
                  </label>
                  <input
                    id="careers-email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-lg border border-burl-gray-200 bg-white px-4 py-3 text-[0.88rem] text-burl-gray-900 outline-none transition-colors placeholder:text-burl-gray-300 focus:border-teal/40 focus:ring-1 focus:ring-teal/20"
                    placeholder="jane@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="careers-area" className="mb-1.5 block text-[0.78rem] font-medium text-burl-gray-700">
                    Area of interest
                  </label>
                  <select
                    id="careers-area"
                    name="area"
                    required
                    defaultValue=""
                    className="w-full appearance-none rounded-lg border border-burl-gray-200 bg-white px-4 py-3 text-[0.88rem] text-burl-gray-900 outline-none transition-colors focus:border-teal/40 focus:ring-1 focus:ring-teal/20"
                  >
                    <option value="" disabled>Select an area</option>
                    {AREAS_OF_INTEREST.map((area) => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="careers-linkedin" className="mb-1.5 block text-[0.78rem] font-medium text-burl-gray-700">
                    LinkedIn profile
                    <span className="ml-1 font-normal text-burl-gray-300">(optional)</span>
                  </label>
                  <input
                    id="careers-linkedin"
                    name="linkedin"
                    type="url"
                    className="w-full rounded-lg border border-burl-gray-200 bg-white px-4 py-3 text-[0.88rem] text-burl-gray-900 outline-none transition-colors placeholder:text-burl-gray-300 focus:border-teal/40 focus:ring-1 focus:ring-teal/20"
                    placeholder="linkedin.com/in/janeadeyemi"
                  />
                </div>

                <div>
                  <label htmlFor="careers-pitch" className="mb-1.5 block text-[0.78rem] font-medium text-burl-gray-700">
                    What makes you exceptional?
                  </label>
                  <textarea
                    id="careers-pitch"
                    name="pitch"
                    required
                    rows={4}
                    className="w-full resize-none rounded-lg border border-burl-gray-200 bg-white px-4 py-3 text-[0.88rem] leading-[1.6] text-burl-gray-900 outline-none transition-colors placeholder:text-burl-gray-300 focus:border-teal/40 focus:ring-1 focus:ring-teal/20"
                    placeholder="One paragraph. Be specific."
                  />
                </div>

                <div>
                  <label htmlFor="careers-cv" className="mb-1.5 block text-[0.78rem] font-medium text-burl-gray-700">
                    CV / Resume
                  </label>
                  <div className="relative rounded-lg border border-dashed border-burl-gray-200 bg-burl-gray-50 p-6 text-center transition-colors hover:border-teal/30 hover:bg-teal/[.02]">
                    <input
                      id="careers-cv"
                      name="cv"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      required
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />
                    <svg viewBox="0 0 24 24" className="mx-auto mb-2 h-6 w-6 fill-none stroke-burl-gray-300 stroke-[1.5]">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <p className="text-[0.78rem] text-burl-gray-400">
                      Drag and drop, or <span className="font-medium text-teal">browse</span>
                    </p>
                    <p className="mt-1 text-[0.68rem] text-burl-gray-300">
                      PDF or Word, up to 10 MB
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-7 flex w-full items-center justify-center rounded-full bg-gradient-to-br from-teal to-teal-light px-8 py-[15px] text-[0.88rem] font-medium text-white shadow-[0_4px_20px_rgba(13,148,136,0.25),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(13,148,136,0.35)] disabled:pointer-events-none disabled:opacity-60"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
