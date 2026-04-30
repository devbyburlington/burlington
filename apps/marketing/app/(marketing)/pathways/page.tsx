import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionLabel } from '@burlington/ui'
import { Button } from '../../../components/shared/Button'
import { FadeIn } from '../../../components/shared/FadeIn'
import { SectionBridge } from '../../../components/shared/SectionBridge'

export const metadata: Metadata = {
  title: 'Immigration Pathways',
  description:
    'Four self-petitioned pathways to U.S. permanent residency. EB-1A, NIW, Dual Petition, and EB-1A for Creatives.',
}

const COLUMNS = [
  {
    name: 'EB-1A',
    subtitle: 'Einstein Visa',
    href: '/eb1a',
    featured: false,
  },
  {
    name: 'NIW (EB-2)',
    subtitle: 'National Interest Waiver',
    href: '/niw',
    featured: false,
  },
  {
    name: 'EB-1A Creatives',
    subtitle: 'Artists & Musicians',
    href: '/eb1a-creatives',
    featured: false,
  },
  {
    name: 'Dual Petition',
    subtitle: 'EB-1A + NIW combined',
    href: '/dual-petition',
    featured: true,
  },
]

const COMPARISON = [
  { label: 'Employer sponsor', values: ['Not required', 'Not required', 'Not required', 'Not required'], allSame: true },
  { label: 'Legal framework', values: ['Kazarian two-step', 'Dhanasar 3-prong', 'Kazarian two-step', 'Both frameworks'] },
  { label: 'Criteria', values: ['3 of 10', '3 prongs (all)', '3-4 from public record', 'Both standards'] },
  { label: 'Premium processing', values: ['15 business days', '15 business days', '15 business days', '15 business days'], allSame: true },
  { label: 'Priority date', values: ['Set on filing', 'Set on filing', 'Set on filing', 'Shared across both'] },
  { label: 'RFE retainer', values: ['12 months', '12 months', '12 months', '12 months'], allSame: true },
  { label: 'Best for', values: ['Senior professionals', 'Advanced degree holders', 'Artists, musicians', 'Strongest overall'] },
]

const MOBILE_CARDS = COLUMNS.map((col, colIndex) => ({
  ...col,
  rows: COMPARISON.map((row) => ({
    label: row.label,
    value: row.values[colIndex],
  })),
}))

export default function PathwaysPage() {
  return (
    <>
      {/* Hero */}
      <section className="pw-hero">
        <div className="pw-hero-bg" style={{ backgroundImage: "url('/hero-bg.jpg')" }} />
        <div className="pw-hero-glow" />
        <div className="pw-hero-texture" />
        <div className="relative z-[2] mx-auto max-w-[1200px]">
          <div className="mb-5">
            <SectionLabel variant="dark">Immigration Pathways</SectionLabel>
          </div>
          <h1 className="pw-hero-title">Four pathways. One destination.</h1>
          <p className="pw-hero-desc">
            Burlington Consult identifies the strongest available route to U.S. permanent residency based on your specific professional record. Every pathway below is self-petitioned. No employer sponsor required.
          </p>
        </div>
      </section>
      <SectionBridge variant="dark-to-light" />

      {/* Comparison */}
      <section className="bg-off-white px-5 py-[clamp(48px,8vw,80px)] sm:px-10 lg:px-20">
        <div className="mx-auto max-w-[1200px]">

          {/* Desktop table */}
          <FadeIn className="hidden lg:block">
            <div className="overflow-hidden rounded-2xl border border-burl-gray-100 bg-white shadow-[0_4px_24px_rgba(0,0,0,.06)]">
              <table className="ap-table">
                <thead>
                  <tr className="!border-b-2 !border-burl-gray-100">
                    <th className="!border-0 !bg-transparent" />
                    {COLUMNS.map((col) => (
                      <th key={col.name} className={col.featured ? 'ap-table-featured !py-5' : '!py-5'}>
                        <span className="font-serif text-[0.88rem] font-semibold normal-case tracking-normal">
                          {col.name}
                        </span>
                        <div className="mt-1 text-[0.68rem] font-normal normal-case tracking-normal text-burl-gray-400">
                          {col.subtitle}
                        </div>
                        {col.featured && (
                          <span className="mt-2 inline-block rounded-full bg-teal/15 px-2 py-0.5 text-[0.5rem] font-bold uppercase tracking-[.1em] text-teal">
                            Recommended
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 1 ? '!bg-burl-gray-100/20' : ''}>
                      <td>{row.label}</td>
                      {row.values.map((val, j) => (
                        <td key={j} className={COLUMNS[j]?.featured ? 'ap-table-featured' : ''}>
                          {row.allSame ? (
                            <span className="inline-flex items-center gap-1.5">
                              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 fill-none stroke-teal stroke-[2.5]">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              <span>{val}</span>
                            </span>
                          ) : (
                            val
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* CTA row */}
                  <tr className="!border-t-2 !border-burl-gray-100">
                    <td className="!border-0" />
                    {COLUMNS.map((col) => (
                      <td key={col.name} className={`!py-5 text-center ${col.featured ? 'ap-table-featured' : ''}`}>
                        <Link
                          href={col.href}
                          className={`inline-flex items-center justify-center rounded-full px-5 py-2 text-[0.78rem] font-medium transition-all ${
                            col.featured
                              ? 'bg-teal text-white shadow-[0_2px_8px_rgba(13,148,136,.3)] hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(13,148,136,.4)]'
                              : 'border border-burl-gray-200 bg-white text-burl-gray-700 hover:border-teal/30 hover:text-teal hover:shadow-[0_2px_12px_rgba(13,148,136,.1)]'
                          }`}
                        >
                          View pathway &rarr;
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </FadeIn>

          {/* Mobile stacked cards */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
            {MOBILE_CARDS.map((card, i) => (
              <FadeIn key={card.name} delay={i * 100}>
              <Link
                href={card.href}
                className={`ap-compare-card ${card.featured ? 'ap-compare-card--featured' : ''}`}
              >
                <div className="mb-1">
                  <h3 className={`font-serif text-[1rem] font-medium ${card.featured ? 'text-teal-dark' : 'text-burl-gray-700'}`}>
                    {card.name}
                  </h3>
                  <span className="text-[0.7rem] text-burl-gray-400">{card.subtitle}</span>
                  {card.featured && (
                    <span className="mt-2 block w-fit rounded-full bg-teal/10 px-2 py-0.5 text-[0.54rem] font-semibold uppercase tracking-[.08em] text-teal">
                      Recommended
                    </span>
                  )}
                </div>
                <div className="my-3 h-px bg-burl-gray-100" />
                {card.rows.map((row) => (
                  <div key={row.label} className="ap-compare-row">
                    <span className="ap-compare-label">{row.label}</span>
                    <span className="ap-compare-value">{row.value}</span>
                  </div>
                ))}
                <div className="mt-4 text-center">
                  <span className={`inline-flex items-center justify-center rounded-full px-5 py-2 text-[0.78rem] font-medium transition-all ${
                    card.featured
                      ? 'bg-teal text-white'
                      : 'border border-burl-gray-200 text-burl-gray-700'
                  }`}>
                    View pathway &rarr;
                  </span>
                </div>
              </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      <SectionBridge variant="light-to-dark" />

      {/* Not Sure CTA */}
      <section className="pw-cta">
        <div className="pw-cta-bg" style={{ backgroundImage: "url('/cta-skyline.jpg')" }} />
        <div className="pw-cta-glow" />
        <FadeIn className="relative z-[2] mx-auto max-w-[680px] text-center" direction="none" duration={800}>
          <h2 className="section-heading-dark mb-4">Not sure which pathway fits?</h2>
          <p className="section-body-dark mx-auto mb-10 max-w-[440px]">
            Burlington Consult identifies the strongest available route based on your specific record. Start with a free assessment. We will tell you exactly where you stand.
          </p>
          <div className="flex flex-col items-center gap-3.5 sm:flex-row sm:justify-center sm:gap-4">
            <Button href="/assess" className="w-full max-w-[320px] sm:w-auto">
              Take Free Assessment &rarr;
            </Button>
            <Button href="/pricing" variant="ghost" className="w-full max-w-[320px] sm:w-auto">
              View Pricing
            </Button>
          </div>
        </FadeIn>
      </section>
    </>
  )
}
