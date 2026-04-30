import type { ReactNode } from 'react'

interface SocialLink {
  href: string
  label: string
  icon: ReactNode
}

const SOCIALS: SocialLink[] = [
  {
    href: 'https://x.com/burlingtonconsult',
    label: 'Twitter',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: 'https://instagram.com/burlingtonconsult',
    label: 'Instagram',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    href: 'https://linkedin.com/company/burlingtonconsult',
    label: 'LinkedIn',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: 'mailto:hello@burlingtonconsult.com',
    label: 'Email',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
]

interface SocialLinksProps {
  className?: string
}

export function SocialLinks({ className = '' }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {SOCIALS.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target={social.href.startsWith('mailto') ? undefined : '_blank'}
          rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
          aria-label={social.label}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-teal-light/20 bg-teal/[.05] text-white/60 transition-all hover:border-teal-light/40 hover:bg-teal/[.12] hover:text-teal-light"
        >
          {social.icon}
        </a>
      ))}
    </div>
  )
}
