import { Button } from '../shared/Button'
import { FadeIn } from '../shared/FadeIn'

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-dark-base px-5 py-16 text-center sm:px-10 sm:py-20 lg:px-20 lg:py-[clamp(100px,12vw,160px)]">
      <div className="absolute inset-0 z-0 bg-[url('/cta-skyline.jpg')] bg-cover bg-center brightness-[.12] saturate-[.3]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(13,148,136,.12),transparent)]" />

      <FadeIn className="relative z-[1] mx-auto max-w-[540px]" direction="none" duration={800}>
        <div className="mb-5 text-[0.78rem] font-medium tracking-wide text-teal-light">
          100% approval rate across all petitions filed
        </div>

        <h2 className="section-heading-dark mb-4">
          Ready to start?
        </h2>
        <p className="section-body-dark mx-auto mb-10 max-w-[440px]">
          A 15-minute assessment is all it takes. We review your record, identify the strongest pathway, and tell you exactly where you stand.
        </p>

        <div className="flex flex-col items-center gap-3.5 sm:flex-row sm:justify-center sm:gap-4">
          <Button href="/pricing" className="w-full max-w-[320px] sm:w-auto">
            View Pricing &rarr;
          </Button>
          <Button href="/assess" variant="ghost" className="w-full max-w-[320px] sm:w-auto">
            Take Free Assessment
          </Button>
        </div>
      </FadeIn>
    </section>
  )
}
