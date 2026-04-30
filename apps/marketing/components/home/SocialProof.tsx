import { SectionLabel } from '@burlington/ui'
import { FadeIn } from '../shared/FadeIn'

const CREDENTIALS = [
  'Harvard Law',
  'Harvard Business',
  'Cambridge',
  'Rotman',
  'PwC',
  'Meta',
  'Microsoft',
]

const TESTIMONIALS = [
  {
    quote:
      "Burlington didn’t just file the petition. They built an argument I couldn’t have constructed myself. The field of endeavour framework completely changed how I understood my own record.",
    name: 'Senior Technology Executive',
    detail: 'EB-1A approved, first submission',
  },
  {
    quote:
      "I had been told by two other firms that my profile wasn’t strong enough. Burlington identified criteria I didn’t know I met and built the evidence architecture from scratch.",
    name: 'Physician & Researcher',
    detail: 'EB-1A and EB-2 NIW approved',
  },
  {
    quote:
      'The dual petition strategy gave me two shots at approval with one priority date. Every recommendation letter was precisely mapped to USCIS criteria. Nothing was generic.',
    name: 'Finance Director',
    detail: 'EB-1A approved, premium processing',
  },
]

export function SocialProof() {
  return (
    <section className="bg-white px-5 py-14 sm:px-10 sm:py-16 lg:px-20 lg:py-[clamp(80px,10vw,140px)]">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <FadeIn className="mb-10 text-center md:mb-14">
          <div className="mb-5">
            <SectionLabel centered>Why clients trust us</SectionLabel>
          </div>
          <h2 className="section-heading mb-8">
            Built by a team that has been where you are.
          </h2>

          <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
            <div className="flex w-max gap-2.5 animate-[ticker-scroll_28s_linear_infinite]">
              {Array.from({ length: 4 }, () => CREDENTIALS).flat().map((cred, i) => (
                <span key={i} className="credential-badge whitespace-nowrap">{cred}</span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Testimonials */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name} delay={i * 150}>
              <div className="testimonial-card">
                <div className="testimonial-mark">&ldquo;</div>
                <p className="testimonial-quote">{t.quote}</p>
                <div className="testimonial-footer">
                  <div className="testimonial-attr-name">{t.name}</div>
                  <div className="testimonial-attr-detail">{t.detail}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
