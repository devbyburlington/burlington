import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ALL_MEMBERS, getInitials } from '../../../../components/team/data'

export function generateStaticParams() {
  return ALL_MEMBERS.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const member = ALL_MEMBERS.find((m) => m.slug === slug)
  if (!member) return {}
  return {
    title: member.name,
    description: member.bio[0],
  }
}

function getAdjacentMembers(slug: string) {
  const idx = ALL_MEMBERS.findIndex((m) => m.slug === slug)
  const prev = idx > 0 ? ALL_MEMBERS[idx - 1] : null
  const next = idx < ALL_MEMBERS.length - 1 ? ALL_MEMBERS[idx + 1] : null
  return { prev, next }
}

function credentialCount(m: typeof ALL_MEMBERS[number]) {
  let n = 0
  if (m.education?.length) n++
  if (m.experience?.length) n++
  if (m.expertise?.length) n++
  return n
}

function NavThumb({ member }: { member: typeof ALL_MEMBERS[number] }) {
  const initials = getInitials(member.name)
  return (
    <div className="profile-nav-thumb">
      {member.photo ? (
        <Image src={member.photo} alt="" fill className="object-cover" />
      ) : (
        <span className="text-[0.5rem] font-semibold text-teal-light/50">{initials}</span>
      )}
    </div>
  )
}

export default async function TeamProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const member = ALL_MEMBERS.find((m) => m.slug === slug)
  if (!member) notFound()

  const initials = getInitials(member.name)
  const hasCredentials = member.education || member.experience || member.expertise
  const { prev, next } = getAdjacentMembers(slug)
  const cols = credentialCount(member)

  return (
    <main>
      {/* Hero */}
      <section className="profile-hero">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(13,148,136,.08),transparent)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_400px_at_30%_80%,rgba(13,148,136,.04),transparent)]" />

        <div className="relative z-[1] mx-auto max-w-[960px]">
          <Link href="/team" className="profile-back-link group">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:-translate-x-0.5">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to team
          </Link>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-12">
            <div className="profile-photo-wrap">
              {member.photo ? (
                <Image src={member.photo} alt={member.name} fill className="object-cover" priority />
              ) : (
                <div className="profile-avatar">
                  <div className="profile-avatar-ring" />
                  <div className="profile-avatar-circle">{initials}</div>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <h1 className="profile-name">{member.name}</h1>
              <p className="profile-role">{member.role}</p>
              {member.pills && member.pills.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {member.pills.map((pill) => (
                    <span key={pill} className="profile-pill">{pill}</span>
                  ))}
                </div>
              )}
              {member.leads && member.leads.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {member.leads.map((lead) => (
                    <span key={lead} className="profile-lead-tag">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-light/50" />
                      {lead}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bio + Quote */}
      <section className="bg-white px-5 py-14 sm:px-10 sm:py-16 lg:px-20 lg:py-[clamp(60px,8vw,100px)]">
        <div className="mx-auto max-w-[720px]">
          <h2 className="profile-section-label">Background</h2>
          <div className="mt-6 space-y-5">
            {member.bio.map((paragraph, i) => (
              <p key={i} className="profile-bio-text">{paragraph}</p>
            ))}
          </div>

          {member.quote && (
            <blockquote className="profile-quote">
              <div className="profile-quote-deco">
                <svg width="24" height="18" viewBox="0 0 24 18" fill="currentColor">
                  <path d="M0 18V10.71C0 7.49 .67 4.97 2.01 3.15 3.35 1.33 5.42.18 8.22 0l.78 2.49c-1.74.36-3.06 1.11-3.96 2.25C4.14 5.88 3.66 7.23 3.6 8.79H7.2V18H0zm13.2 0V10.71c0-3.22.67-5.74 2.01-7.56C16.55 1.33 18.62.18 21.42 0l.78 2.49c-1.74.36-3.06 1.11-3.96 2.25-.9 1.14-1.38 2.49-1.44 4.05h3.6V18H13.2z"/>
                </svg>
              </div>
              <p className="profile-quote-text">{member.quote}</p>
            </blockquote>
          )}
        </div>
      </section>

      {/* Credentials */}
      {hasCredentials && (
        <section className="profile-credentials-section">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(13,148,136,.06),transparent)]" />
          <div className="relative z-[1] mx-auto max-w-[960px]">
            <h2 className="profile-section-label-dark">Credentials</h2>
            <div className={`profile-credentials-grid ${cols === 2 ? 'lg:grid-cols-2' : cols === 1 ? 'lg:grid-cols-1 max-w-[480px]' : 'lg:grid-cols-3'}`}>
              {member.education && member.education.length > 0 && (
                <div className="profile-credential-card">
                  <h3 className="profile-credentials-title-dark">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                      <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5"/>
                    </svg>
                    Education
                  </h3>
                  <ul className="profile-credentials-list-dark">
                    {member.education.map((ed) => (
                      <li key={ed.institution} className="profile-credential-item-dark">
                        <span className="profile-credential-primary-dark">{ed.institution}</span>
                        <span className="profile-credential-secondary-dark">{ed.credential}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {member.experience && member.experience.length > 0 && (
                <div className="profile-credential-card">
                  <h3 className="profile-credentials-title-dark">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                    </svg>
                    Experience
                  </h3>
                  <ul className="profile-credentials-list-dark">
                    {member.experience.map((ex) => (
                      <li key={ex.org} className="profile-credential-item-dark">
                        <span className="profile-credential-primary-dark">{ex.org}</span>
                        <span className="profile-credential-secondary-dark">{ex.role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {member.expertise && member.expertise.length > 0 && (
                <div className="profile-credential-card">
                  <h3 className="profile-credentials-title-dark">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    Expertise
                  </h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {member.expertise.map((tag) => (
                      <span key={tag} className="profile-expertise-tag-dark">{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Prev / Next navigation */}
            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {prev ? (
                <Link href={`/team/${prev.slug}`} className="profile-nav-card group">
                  <div className="profile-nav-card-inner">
                    <div className="profile-nav-arrow profile-nav-arrow-prev">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <NavThumb member={prev} />
                    <div className="min-w-0">
                      <span className="profile-nav-label">Previous</span>
                      <span className="profile-nav-name">{prev.name}</span>
                    </div>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link href={`/team/${next.slug}`} className="profile-nav-card profile-nav-card-next group">
                  <div className="profile-nav-card-inner flex-row-reverse">
                    <div className="profile-nav-arrow profile-nav-arrow-next">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <NavThumb member={next} />
                    <div className="min-w-0 text-right">
                      <span className="profile-nav-label">Next</span>
                      <span className="profile-nav-name">{next.name}</span>
                    </div>
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
