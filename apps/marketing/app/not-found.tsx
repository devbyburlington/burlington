import Link from 'next/link'

const NAV_LINKS = [
  {
    href: '/about',
    label: 'About',
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
    ),
  },
  {
    href: '/pricing',
    label: 'Pricing',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    href: '/team',
    label: 'Team',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
      </svg>
    ),
  },
  {
    href: '/knowledge-centre',
    label: 'Knowledge Centre',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
  },
  {
    href: '/faq',
    label: 'FAQ',
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
]

export default function NotFound() {
  return (
    <div className="nf-page">
      <div className="nf-texture" />
      <div className="nf-glow" />
      <div className="nf-scan" />
      <span className="nf-bg" aria-hidden="true">404</span>

      <div className="relative z-[1] mx-auto max-w-[600px] px-5 text-center">
        <span className="mb-5 inline-block rounded-full border border-teal/20 bg-teal/[.06] px-4 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[.12em] text-teal-light">
          Page not found
        </span>

        <h1 className="mb-5 font-serif text-[clamp(1.8rem,4vw,2.8rem)] font-medium leading-[1.1] tracking-tight text-white">
          This page doesn&rsquo;t exist.
        </h1>

        <p className="mx-auto mb-10 max-w-[440px] text-[0.88rem] leading-[1.8] text-white/40">
          The page you&rsquo;re looking for may have been moved, removed,
          or never existed in the first place.
        </p>

        <div className="mb-12 flex flex-col items-center gap-3.5 sm:flex-row sm:justify-center sm:gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-teal to-teal-light px-9 py-[15px] text-[0.88rem] font-medium text-white shadow-[0_4px_20px_rgba(13,148,136,0.25),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(13,148,136,0.35)]"
          >
            Back to Home &rarr;
          </Link>
          <Link
            href="/assess"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[.04] px-9 py-[15px] text-[0.88rem] font-normal text-white/70 backdrop-blur-sm transition-all hover:border-white/25 hover:text-white"
          >
            Take Free Assessment
          </Link>
        </div>

        <div className="nf-links">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href} className="nf-link group">
              <span className="nf-link-icon">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="nf-footer">
        <span>Burlington Consult, LLC</span>
        <span className="nf-footer-dot" />
        <Link href="/privacy" className="nf-footer-link">Privacy</Link>
        <Link href="/terms" className="nf-footer-link">Terms</Link>
      </div>
    </div>
  )
}
