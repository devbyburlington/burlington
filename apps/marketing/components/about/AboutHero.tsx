import { SectionLabel } from '@burlington/ui'

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-dark-base px-5 pt-[120px] pb-16 sm:px-10 sm:pb-20 lg:px-20 lg:pb-[clamp(100px,12vw,160px)]">
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_80px,rgba(45,212,191,.015)_80px,rgba(45,212,191,.015)_81px)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(13,148,136,.08),transparent)]" />

      <div className="relative z-[1] mx-auto max-w-[720px] text-center">
        <div className="mb-5">
          <SectionLabel variant="dark" centered>About Burlington Consult</SectionLabel>
        </div>
        <h1 className="section-heading-dark mb-6 text-[clamp(1.8rem,3.5vw,2.6rem)]">
          We did it ourselves. Then we built a firm around doing it for others.
        </h1>
        <p className="section-body-dark mx-auto max-w-[600px]">
          Burlington Consult is an immigration strategy and advisory firm led by a Harvard Law School-trained strategist who filed and obtained approval on his own EB-1A petition, then built a team around doing it for others. The firm works with professionals across technology, law, medicine, finance, the arts, and public policy.
        </p>
      </div>
    </section>
  )
}
