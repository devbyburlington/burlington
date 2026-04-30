import Link from 'next/link'
import { FadeIn } from '../shared/FadeIn'

export function HiringCta() {
  return (
    <section className="relative overflow-hidden bg-dark-base px-5 py-16 text-center sm:px-10 sm:py-20 lg:px-20 lg:py-[clamp(80px,10vw,120px)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(13,148,136,.08),transparent)]" />

      <FadeIn className="relative z-[1] mx-auto max-w-[480px]" direction="none" duration={800}>
        <h2 className="section-heading-dark mb-4">
          We&apos;re hiring.
        </h2>
        <p className="section-body-dark mx-auto mb-10 max-w-[400px]">
          Burlington Consult is growing across three continents. If you&apos;re ready to build something that matters, we want to hear from you.
        </p>
        <Link
          href="/careers"
          className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-br from-teal to-teal-light px-[34px] py-[15px] text-[0.88rem] font-medium text-white shadow-[0_4px_20px_rgba(13,148,136,0.25),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(13,148,136,0.35)]"
        >
          View open roles &rarr;
        </Link>
      </FadeIn>
    </section>
  )
}
