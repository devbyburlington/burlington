import { Button } from '../shared/Button'
import { FadeIn } from '../shared/FadeIn'

interface PathwayCTAProps {
  heading: string
  description: string
  primaryHref?: string
  primaryLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
}

export function PathwayCTA({
  heading,
  description,
  primaryHref = '/assess',
  primaryLabel = 'Take Free Assessment',
  secondaryHref = '/pricing',
  secondaryLabel = 'View Pricing',
}: PathwayCTAProps) {
  return (
    <section className="pw-cta">
      <div className="pw-cta-bg" style={{ backgroundImage: "url('/cta-skyline.jpg')" }} />
      <div className="pw-cta-glow" />
      <FadeIn className="relative z-[2] mx-auto max-w-[680px] text-center" direction="none" duration={800}>
        <h2 className="section-heading-dark mb-4 lg:whitespace-nowrap">{heading}</h2>
        <p className="section-body-dark mx-auto mb-10 max-w-[440px]">{description}</p>
        <div className="flex flex-col items-center gap-3.5 sm:flex-row sm:justify-center sm:gap-4">
          <Button href={primaryHref} className="w-full max-w-[320px] sm:w-auto">
            {primaryLabel} &rarr;
          </Button>
          <Button href={secondaryHref} variant="ghost" className="w-full max-w-[320px] sm:w-auto">
            {secondaryLabel}
          </Button>
        </div>
      </FadeIn>
    </section>
  )
}
