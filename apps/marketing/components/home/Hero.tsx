import { SectionLabel } from '@burlington/ui'
import { Button } from '../shared/Button'
import { CountUp } from '../shared/CountUp'

const STATS = [
  { value: '99%', label: 'EB-1A approval rate' },
  { value: '<5%', label: 'Of green cards are EB-1A' },
  { value: '15 Days', label: 'Premium processing' },
]

function HeroGraphic() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 600 600"
        className="absolute left-1/2 top-[45%] h-[min(110vh,900px)] w-auto -translate-x-1/2 -translate-y-1/2"
      >
        <defs>
          <linearGradient id="hg-arc" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0" />
            <stop offset="30%" stopColor="#2DD4BF" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#2DD4BF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="hg-glow">
            <stop offset="0%" stopColor="#0D9488" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0D9488" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Slow clockwise group */}
        <g style={{ transformOrigin: '300px 300px', animation: 'orbit-spin 90s linear infinite' }}>
          <ellipse cx="300" cy="300" rx="270" ry="155" fill="none" stroke="url(#hg-arc)" strokeWidth="0.6" transform="rotate(-22 300 300)" />
          <ellipse cx="300" cy="300" rx="190" ry="110" fill="none" stroke="url(#hg-arc)" strokeWidth="0.6" strokeDasharray="6 10" transform="rotate(12 300 300)" />
          {/* Nodes on outer orbit */}
          <circle cx="568" cy="278" r="3.5" fill="#2DD4BF" style={{ animation: 'node-pulse 3s ease-in-out infinite' }} />
          <circle cx="95" cy="368" r="2.5" fill="#2DD4BF" opacity="0.5" />
          <circle cx="440" cy="170" r="2" fill="#2DD4BF" opacity="0.4" />
        </g>

        {/* Slow counter-clockwise group */}
        <g style={{ transformOrigin: '300px 300px', animation: 'orbit-spin-reverse 120s linear infinite' }}>
          <ellipse cx="300" cy="300" rx="125" ry="72" fill="none" stroke="url(#hg-arc)" strokeWidth="0.6" transform="rotate(-8 300 300)" />
          {/* Nodes on inner orbit */}
          <circle cx="195" cy="246" r="2.5" fill="#2DD4BF" opacity="0.6" style={{ animation: 'node-pulse 4s ease-in-out 1s infinite' }} />
          <circle cx="420" cy="330" r="2" fill="#2DD4BF" opacity="0.35" />
        </g>

        {/* Static center glow */}
        <circle cx="300" cy="300" r="50" fill="url(#hg-glow)" />
        <circle cx="300" cy="300" r="4" fill="#0D9488" opacity="0.7" />
        <circle cx="300" cy="300" r="8" fill="none" stroke="#0D9488" strokeWidth="0.5" opacity="0.3" />
      </svg>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-dark-base px-5 pt-[90px] text-center sm:px-10 lg:px-20">
      {/* Background image */}
      <div className="absolute inset-0 z-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center brightness-[.18] contrast-[1.1] saturate-[.3]" />

      {/* Subtle gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_45%,rgba(13,148,136,.08)_0%,transparent_70%)]" />

      {/* Orbital graphic */}
      <HeroGraphic />

      {/* Content */}
      <div className="relative z-[2] flex flex-1 w-full max-w-[820px] flex-col items-center justify-center animate-hero-fade-up [animation-delay:.15s]">
        <div className="mb-6">
          <SectionLabel variant="dark" centered>EB-1A &amp; EB-2 NIW Petitions</SectionLabel>
        </div>

        <h1 className="mb-5 font-serif text-[clamp(1.8rem,5.2vw,4.2rem)] font-medium leading-[1.1] tracking-tight text-white sm:text-[clamp(2.6rem,5.2vw,4.2rem)]">
          The fastest path to a{' '}
          <span className="relative inline bg-gradient-to-br from-teal to-teal-light bg-clip-text text-transparent">
            U.S. green card
            <span className="absolute bottom-0.5 left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-teal to-teal-light opacity-40" />
          </span>{' '}
          for exceptional professionals.
        </h1>

        <p className="mx-auto mb-9 max-w-[90%] text-[0.92rem] font-normal leading-[1.75] text-white/50 sm:max-w-[540px]">
          We develop and file Einstein Visa and NIW petitions for professionals across law, STEM, finance, the arts, and public policy. Permanent U.S. residency without an employer sponsor.
        </p>

        <div className="flex w-full flex-col items-center gap-3.5 animate-hero-fade-up [animation-delay:.5s] sm:flex-row sm:justify-center sm:gap-4">
          <Button href="/pricing" className="group w-full sm:w-auto">
            View Pricing
            <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
          </Button>
          <Button href="/assess" variant="ghost" className="w-full sm:w-auto">
            Take Free Assessment
          </Button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-[2] flex w-full justify-center border-t border-teal-light/[.04] py-4 animate-hero-fade-up [animation-delay:.7s]">
        <div className="grid w-full max-w-[800px] grid-cols-3 gap-2 px-5 sm:flex sm:gap-0 sm:px-0">
          {STATS.map((stat, i) => (
            <div key={i} className="relative px-0 text-center sm:px-12">
              {i > 0 && (
                <span className="absolute top-1 bottom-1 left-0 hidden w-px bg-gradient-to-b from-transparent via-teal/20 to-transparent sm:block" />
              )}
              <div className="bg-gradient-to-br from-white via-white to-teal-light bg-clip-text font-serif text-[1.1rem] font-medium tracking-tight text-transparent sm:text-[1.6rem] lg:text-[1.8rem]">
                <CountUp value={stat.value} duration={2000} />
              </div>
              <div className="mt-1 text-[0.6rem] uppercase tracking-[.04em] text-white/55 sm:text-[0.68rem] lg:text-[0.73rem]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
