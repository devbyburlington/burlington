import { SectionLabel } from '@burlington/ui'

export function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-dark-base px-5 pt-[120px] pb-16 sm:px-10 sm:pb-20 lg:px-20 lg:pb-[clamp(100px,12vw,160px)]">
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_80px,rgba(45,212,191,.015)_80px,rgba(45,212,191,.015)_81px)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(13,148,136,.08),transparent)]" />

      <div className="relative z-[1] mx-auto max-w-[720px] text-center">
        <div className="mb-5">
          <SectionLabel variant="dark" centered>Services</SectionLabel>
        </div>
        <h1 className="section-heading-dark mb-6 text-[clamp(1.8rem,3.5vw,2.6rem)]">
          Every engagement is built around your specific record.
        </h1>
        <p className="section-body-dark mx-auto max-w-[600px]">
          Burlington Consult does not apply templates. The firm identifies the strongest available pathway, builds the evidentiary architecture, and files a case constructed for your specific professional record.
        </p>
      </div>
    </section>
  )
}
