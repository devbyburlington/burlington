import Link from 'next/link'
import { SectionLabel } from '@burlington/ui'
import { ServicesGrid } from './ServicesGrid'

export function ServicesList() {
  return (
    <>
      <div className="bg-dark-base px-5 pt-[clamp(72px,12vw,120px)] pb-[clamp(16px,3vw,40px)] sm:px-10 lg:px-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-[600px]">
            <div className="mb-3">
              <SectionLabel variant="dark">What we offer</SectionLabel>
            </div>
            <h2 className="section-heading-dark hidden sm:block">
              Three practices. One standard.
            </h2>
          </div>
        </div>
      </div>

      <section className="bg-off-white px-5 py-[clamp(20px,5vw,64px)] sm:px-10 lg:px-20">
        <div className="mx-auto max-w-[1200px]">
          <ServicesGrid />

          <div className="sv-fallback-strip">
            <p className="sv-fallback-text">
              Not sure which service is right for you?
            </p>
            <div className="flex items-center gap-4">
              <Link href="/assess" className="sv-fallback-link">
                Take the free assessment
              </Link>
              <span className="h-4 w-px bg-burl-gray-200" />
              <Link href="/apply" className="sv-fallback-link">
                Book a consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
