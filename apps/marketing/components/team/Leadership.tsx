import Image from 'next/image'
import Link from 'next/link'
import { SectionLabel } from '@burlington/ui'
import { LEADERSHIP } from './data'
import { FadeIn } from '../shared/FadeIn'

export function Leadership() {
  return (
    <section className="bg-off-white px-5 py-14 sm:px-10 sm:py-16 lg:px-20 lg:py-[clamp(80px,10vw,140px)]">
      <div className="mx-auto max-w-[960px]">
        <FadeIn className="mb-8 text-center md:mb-10">
          <SectionLabel centered>Leadership</SectionLabel>
        </FadeIn>

        <FadeIn delay={150}>
        <Link href={`/team/${LEADERSHIP.slug}`} className="team-card-featured">
          <div className="team-card-photo">
            <Image
              src={LEADERSHIP.photo!}
              alt={LEADERSHIP.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="team-card-body">
            <h3 className="team-card-name">{LEADERSHIP.name}</h3>
            <div className="team-card-role">{LEADERSHIP.role}</div>
            <p className="team-card-featured-creds">
              {LEADERSHIP.bio[0]}
            </p>
            {LEADERSHIP.pills && (
              <div className="team-card-pills mt-4">
                {LEADERSHIP.pills.map((pill) => (
                  <span key={pill} className="team-card-pill">{pill}</span>
                ))}
              </div>
            )}
          </div>
        </Link>
        </FadeIn>
      </div>
    </section>
  )
}
