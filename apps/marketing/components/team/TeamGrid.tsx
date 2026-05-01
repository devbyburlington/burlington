import Image from 'next/image'
import Link from 'next/link'
import { TEAM, getInitials } from './data'
import { FadeIn } from '../shared/FadeIn'

export function TeamGrid() {
  return (
    <section className="bg-white px-5 py-14 sm:px-10 sm:py-16 lg:px-20 lg:py-[clamp(80px,10vw,140px)]">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {TEAM.map((member, i) => (
            <FadeIn key={member.slug} delay={i * 100} className="h-full">
            <Link href={`/team/${member.slug}`} className="team-card">
              <div className="team-card-photo">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className={`object-cover${member.grayscale ? ' grayscale' : ''}`}
                    style={member.photoPosition ? { objectPosition: member.photoPosition.replace('_', ' ').replace('center top', 'center 20%') } : undefined}
                  />
                ) : (
                  <div className="team-card-avatar">
                    <div className="team-card-avatar-circle">
                      {getInitials(member.name)}
                    </div>
                  </div>
                )}
              </div>
              <div className="team-card-body">
                <div className="team-card-name">{member.name}</div>
                <div className="team-card-role">{member.role}</div>
                {member.pills && member.pills.length > 0 && (
                  <div className="team-card-pills">
                    {member.pills.map((pill) => (
                      <span key={pill} className="team-card-pill">{pill}</span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
