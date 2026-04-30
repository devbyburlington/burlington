import Image from 'next/image'
import { SectionLabel } from '@burlington/ui'
import { FadeIn } from '../shared/FadeIn'

const TEAM_PHOTOS = [
  { src: '/ebuka.png', alt: 'Chris Ogbodo' },
  { src: '/team-onyia.jpg', alt: 'Chibuike Onyia' },
  { src: '/team-efezino.jpg', alt: 'Efezino Onyeke' },
]

const PROGRAMMES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-teal-light stroke-[1.5]">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: 'AI Policy Fellowship',
    desc: '12-month programme for emerging AI policy leaders across Africa. Governance roundtables and research output.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-teal-light stroke-[1.5]">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: 'Career Training',
    desc: 'Free programmes helping professionals identify and secure high-paying remote roles with global companies.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-teal-light stroke-[1.5]">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10" />
      </svg>
    ),
    title: 'Governance Roundtables',
    desc: 'Global convenings on digital rights, AI regulation, and responsible technology development.',
  },
]

export function BeyondTheFirm() {
  return (
    <section className="relative overflow-hidden bg-dark-base px-5 py-14 sm:px-10 sm:py-16 lg:px-20 lg:py-[clamp(80px,10vw,140px)]">
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_80px,rgba(45,212,191,.015)_80px,rgba(45,212,191,.015)_81px)]" />

      <div className="relative z-[1] mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* Left */}
          <FadeIn>
            <div className="mb-5">
              <SectionLabel variant="dark">Beyond the firm</SectionLabel>
            </div>
            <h2 className="section-heading-dark mb-5">
              For-profit with a public mission.
            </h2>
            <div className="space-y-4">
              <p className="section-body-dark">
                Burlington Consult is a commercial advisory practice. It also funds and operates programmes designed to make high-quality careers more accessible to talent in Nigeria and across Africa.
              </p>
              <p className="section-body-dark">
                This work is led through TAI Advisory, our impact-focused arm operating at the intersection of AI governance, digital rights, and workforce development.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="about-team-mosaic">
                {TEAM_PHOTOS.map((photo) => (
                  <div key={photo.src} className="about-team-mosaic-item">
                    <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
                  </div>
                ))}
                <div className="about-team-mosaic-count">+9</div>
              </div>
              <span className="text-[0.72rem] text-white/35">12 professionals, 5 countries</span>
            </div>

            <a
              href="https://taiadvisory.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="arrow-link mt-6 inline-flex border-teal-light/20 bg-teal-light/[.06] text-teal-light hover:border-teal-light/30 hover:bg-teal-light/[.1]"
            >
              Learn more about TAI Advisory
              <span className="arrow-link-icon">&rarr;</span>
            </a>
          </FadeIn>

          {/* Right */}
          <div className="flex flex-col gap-4 lg:pt-8">
            {PROGRAMMES.map((item, i) => (
              <FadeIn key={item.title} delay={i * 150} direction="right">
              <div className="flex items-start gap-5 rounded-xl border border-white/[.06] bg-white/[.02] p-5 sm:p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-teal/20 bg-teal/[.08]">
                  {item.icon}
                </div>
                <div>
                  <h4 className="mb-1 font-serif text-[0.92rem] font-medium text-white">{item.title}</h4>
                  <p className="text-[0.78rem] leading-[1.65] text-white/40">{item.desc}</p>
                </div>
              </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
