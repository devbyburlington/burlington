import { SectionLabel } from '@burlington/ui'

export function TeamHero() {
  return (
    <section className="relative overflow-hidden bg-dark-base px-5 pt-[120px] pb-16 sm:px-10 sm:pb-20 lg:px-20 lg:pb-[clamp(100px,12vw,160px)]">
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_80px,rgba(45,212,191,.015)_80px,rgba(45,212,191,.015)_81px)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(13,148,136,.08),transparent)]" />

      <div className="relative z-[1] mx-auto max-w-[720px] text-center">
        <div className="mb-5">
          <SectionLabel variant="dark" centered>Our Team</SectionLabel>
        </div>
        <h1 className="section-heading-dark mb-6 text-[clamp(1.8rem,3.5vw,2.6rem)]">
          The people behind every petition.
        </h1>
        <p className="section-body-dark mx-auto max-w-[560px]">
          Advisers, researchers, and case architects across three continents. Every engagement is led by practitioners who have been through the process themselves.
        </p>
      </div>
    </section>
  )
}
