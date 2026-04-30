import Link from 'next/link'
import { SocialLinks } from '@burlington/ui'

const PATHWAYS = [
  { href: '/eb1a', label: 'Einstein Visa (EB-1A)' },
  { href: '/niw', label: 'NIW Petition (EB-2)' },
  { href: '/dual-petition', label: 'Dual Petition Strategy' },
  { href: '/eb1a-creatives', label: 'EB-1A for Creatives' },
  { href: '/pathways', label: 'All Pathways' },
]

const RESOURCES = [
  { href: '/knowledge-centre', label: 'Knowledge Centre' },
  { href: '/assess', label: 'Eligibility Assessment' },
  { href: '/case-profiles', label: 'Case Profiles' },
  { href: '/faq', label: 'FAQ' },
]

const COMPANY = [
  { href: '/about', label: 'About' },
  { href: '/team', label: 'Team' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/careers', label: 'Careers' },
]

const LEGAL = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/disclaimer', label: 'Disclaimer' },
]

export function Footer() {
  return (
    <footer className="footer">
      <div className="mx-auto lg:max-w-[75%]">
        {/* Main row: brand left, nav right */}
        <div className="footer-main">
          <div className="footer-brand">
            <span className="footer-brand-name">
              Burlington
              <span className="footer-brand-dot" />
            </span>
            <p className="footer-brand-desc">
              Immigration strategy and advisory for high-achieving professionals seeking permanent U.S. residency.
            </p>
            <SocialLinks className="mt-7" />
          </div>

          <div className="footer-nav-cols">
            <div>
              <h4 className="footer-col-title">Pathways</h4>
              {PATHWAYS.map((link) => (
                <Link key={link.href} href={link.href} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </div>

            <div>
              <h4 className="footer-col-title">Resources</h4>
              {RESOURCES.map((link) => (
                <Link key={link.href} href={link.href} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </div>

            <div>
              <h4 className="footer-col-title">Company</h4>
              {COMPANY.map((link) => (
                <Link key={link.href} href={link.href} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="footer-legal">
            &copy; {new Date().getFullYear()} Burlington Consult, LLC &middot; Delaware &middot; Lagos
          </div>
          <div className="flex gap-6">
            {LEGAL.map((link) => (
              <Link key={link.href} href={link.href} className="footer-legal-link">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
