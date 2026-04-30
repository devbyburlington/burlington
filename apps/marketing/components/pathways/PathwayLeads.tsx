import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FadeIn } from '../shared/FadeIn'

interface TeamLead {
  name: string
  role: string
  image?: string
  href: string
}

interface PathwayLeadsProps {
  leads: TeamLead[]
}

export function PathwayLeads({ leads }: PathwayLeadsProps) {
  return (
    <section className="pw-leads">
      <FadeIn className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 sm:gap-5" direction="none">
        <span className="pw-leads-label">Key leads on your case</span>
        <div className="flex items-center gap-5 sm:gap-10">
        {leads.map((lead, i) => (
          <Fragment key={lead.name}>
            {i > 0 && <span className="h-8 w-px bg-burl-gray-200" />}
            <Link href={lead.href} className="pw-lead">
              <div className="pw-lead-avatar">
                {lead.image ? (
                  <Image
                    src={lead.image}
                    alt={lead.name}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center bg-teal/10 text-[0.85rem] font-semibold text-teal">
                    {lead.name.split(' ').map(n => n[0]).join('')}
                  </span>
                )}
              </div>
              <div>
                <div className="pw-lead-name">{lead.name}</div>
                <div className="pw-lead-role">{lead.role}</div>
              </div>
            </Link>
          </Fragment>
        ))}
        </div>
      </FadeIn>
    </section>
  )
}
