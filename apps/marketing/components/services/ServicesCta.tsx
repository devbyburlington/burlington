import { Button } from '../shared/Button'

export function ServicesCta() {
  return (
    <section className="relative overflow-hidden border-t border-teal/15 bg-dark-base px-5 py-16 text-center sm:px-10 sm:py-20 lg:px-20 lg:py-[clamp(100px,12vw,160px)]">
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_80px,rgba(45,212,191,.015)_80px,rgba(45,212,191,.015)_81px)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(13,148,136,.1),transparent)]" />

      <div className="relative z-[1] mx-auto max-w-[520px]">
        <h2 className="section-heading-dark mb-4">
          Ready to get started?
        </h2>
        <p className="section-body-dark mx-auto mb-10 max-w-[440px]">
          Create an account to begin your application, book a consultation, or speak with our team about the right service for you.
        </p>

        <div className="flex flex-col items-center gap-3.5 sm:flex-row sm:justify-center sm:gap-4">
          <Button href="/assess" className="w-full max-w-[320px] sm:w-auto">
            Free Assessment &rarr;
          </Button>
          <Button href="/apply" variant="ghost" className="w-full max-w-[320px] sm:w-auto">
            Apply Now &rarr;
          </Button>
        </div>
      </div>
    </section>
  )
}
