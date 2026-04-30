import { SectionLabel } from '@burlington/ui'

const STATS = [
  { value: 'Remote', label: 'All positions' },
  { value: '13+', label: 'Team members' },
  { value: '3', label: 'Continents' },
]

export function CareersHero() {
  return (
    <section className="relative overflow-hidden bg-dark-base px-5 pt-[120px] pb-16 sm:px-10 sm:pb-20 lg:px-20 lg:pb-[clamp(100px,12vw,160px)]">
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_80px,rgba(45,212,191,.015)_80px,rgba(45,212,191,.015)_81px)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(13,148,136,.08),transparent)]" />

      <div className="relative z-[1] mx-auto max-w-[720px] text-center">
        <div className="mb-5">
          <SectionLabel variant="dark" centered>Careers</SectionLabel>
        </div>
        <h1 className="section-heading-dark mb-6 text-[clamp(1.8rem,3.5vw,2.6rem)]">
          Build something that actually matters.
        </h1>
        <p className="section-body-dark mx-auto max-w-[560px]">
          Burlington Consult is a small team doing serious work. We help extraordinary professionals get to the United States — and we need people who can move as fast as the people we serve.
        </p>

        <div className="mx-auto mt-10 flex max-w-[460px] items-center justify-center gap-6 sm:gap-10">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-6 sm:gap-10">
              {i > 0 && <span className="h-8 w-px bg-white/[.08]" />}
              <div className="text-center">
                <div className="font-serif text-[1.4rem] font-semibold tracking-tight text-teal-light sm:text-[1.6rem]">
                  {stat.value}
                </div>
                <div className="mt-1 text-[0.65rem] uppercase tracking-[.1em] text-white/35">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
