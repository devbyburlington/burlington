import { SectionLabel } from '@burlington/ui'

interface LegalPageProps {
  tag: string
  title: string
  effectiveDate: string
  children: React.ReactNode
}

export function LegalPage({ tag, title, effectiveDate, children }: LegalPageProps) {
  return (
    <>
      <section className="legal-hero">
        <div className="legal-hero-texture" />
        <div className="legal-hero-glow" />
        <div className="relative z-[1] mx-auto max-w-[720px] text-center">
          <div className="mb-5">
            <SectionLabel variant="dark" centered>{tag}</SectionLabel>
          </div>
          <h1 className="section-heading-dark mb-4 text-[clamp(1.8rem,3.5vw,2.6rem)]">
            {title}
          </h1>
          <p className="text-[0.82rem] text-white/35">
            Effective {effectiveDate}
          </p>
        </div>
      </section>

      <section className="legal-body">
        <div className="legal-content">
          {children}
        </div>
      </section>
    </>
  )
}
