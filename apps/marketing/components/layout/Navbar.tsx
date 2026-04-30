'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SocialLinks } from '@burlington/ui'
import { IconButton } from '../shared/IconButton'

const PORTAL_URL_FALLBACK = process.env.NEXT_PUBLIC_PORTAL_URL || 'https://app.burlingtonconsult.com'

function getPortalUrl() {
  if (window.location.hostname === 'localhost' || window.location.hostname.match(/^\d/)) {
    return `${window.location.protocol}//${window.location.hostname}:4001`
  }
  return PORTAL_URL_FALLBACK
}

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/team', label: 'Team' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/assess', label: 'Eligibility Assessment' },
]

const MOBILE_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/team', label: 'Team' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/assess', label: 'Eligibility Assessment' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isNavigatingToPortal, setIsNavigatingToPortal] = useState(false)
  const [portalUrl, setPortalUrl] = useState(PORTAL_URL_FALLBACK)
  const pathname = usePathname()

  useEffect(() => {
    setPortalUrl(getPortalUrl())
  }, [])

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const close = useCallback(() => setIsOpen(false), [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex h-[72px] items-center justify-between border-b bg-dark-base/95 px-5 backdrop-blur-xl transition-all duration-300 sm:px-10 lg:px-20 xl:px-[120px] ${
          hasScrolled
            ? 'border-white/[.06] shadow-[0_1px_20px_rgba(0,0,0,.3)]'
            : 'border-transparent'
        }`}
      >
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-[3px] font-serif text-[1.25rem] font-semibold text-white sm:text-[1.3rem]">
          Burlington
          <span className="inline-block h-[6px] w-[6px] rounded-full bg-teal-light shadow-[0_0_10px_rgba(45,212,191,0.5)] transition-shadow group-hover:shadow-[0_0_16px_rgba(45,212,191,0.7)] sm:h-[7px] sm:w-[7px]" />
          <span className="ml-2.5 hidden border-l border-white/[.12] pl-2.5 font-sans text-[0.58rem] font-normal uppercase tracking-[.1em] text-white/65 sm:inline">
            Immigration Advisory
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href} className="flex items-center">
              <Link
                href={link.href}
                className={`group relative px-4 py-2 text-[0.84rem] transition-colors lg:px-5 ${
                  pathname === link.href
                    ? 'font-medium text-white'
                    : 'font-normal text-white/60 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-teal to-teal-light origin-left transition-transform duration-500 ease-out lg:left-5 lg:right-5 ${
                    pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-hover:opacity-40'
                  }`}
                />
              </Link>
              {i < NAV_LINKS.length - 1 && (
                <span className="h-3 w-px shrink-0 bg-white/[.08]" />
              )}
            </li>
          ))}
          <li className="ml-3 lg:ml-5">
            <a
              href={`${portalUrl}/login`}
              onClick={() => setIsNavigatingToPortal(true)}
              className="inline-flex items-center rounded-full bg-gradient-to-br from-teal to-teal-light px-5 py-2.5 text-[0.84rem] font-medium leading-none text-white shadow-[0_2px_12px_rgba(13,148,136,0.2),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(13,148,136,0.35)] lg:px-6 lg:py-3 lg:text-[0.88rem]"
            >
              Client Login
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <IconButton
          variant="dark"
          className="flex-col gap-[5px] md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <span
            className={`block h-[1.5px] w-[18px] rounded-full bg-teal-light transition-all duration-300 ${
              isOpen ? 'translate-y-[6.5px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-[1.5px] w-[18px] rounded-full bg-teal-light transition-all duration-300 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block h-[1.5px] w-[18px] rounded-full bg-teal-light transition-all duration-300 ${
              isOpen ? '-translate-y-[6.5px] -rotate-45' : ''
            }`}
          />
        </IconButton>
      </nav>

      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[9999] flex w-[min(340px,88vw)] flex-col bg-[#050D14] transition-transform duration-300 ease-[cubic-bezier(.4,0,.2,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-7 pt-6 pb-5">
          <Link href="/" onClick={close} className="flex items-center gap-[3px] font-serif text-[1.15rem] font-semibold text-white">
            Burlington
            <span className="inline-block h-[5px] w-[5px] rounded-full bg-teal-light" />
          </Link>
          <IconButton variant="dark" onClick={close} aria-label="Close menu">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </IconButton>
        </div>

        {/* Divider */}
        <div className="mx-5 h-px bg-gradient-to-r from-transparent via-teal-light/25 to-transparent" />

        {/* Links */}
        <div className="flex flex-1 flex-col overflow-y-auto px-5 pt-5">
          {MOBILE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group flex items-center justify-between rounded-xl px-4 py-3.5 transition-all ${
                pathname === link.href
                  ? 'bg-gradient-to-r from-teal/15 to-transparent border-l-2 border-teal-light'
                  : 'border-l-2 border-transparent hover:bg-white/[.03]'
              }`}
              onClick={close}
            >
              <span
                className={`text-[0.95rem] tracking-wide transition-colors ${
                  pathname === link.href
                    ? 'font-medium text-teal-light'
                    : 'font-normal text-white/75 group-hover:text-white'
                }`}
              >
                {link.label}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-all ${
                  pathname === link.href
                    ? 'text-teal-light/60'
                    : 'text-white/20 group-hover:text-white/40 group-hover:translate-x-0.5'
                }`}
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="px-7 pb-6">
          <a
            href={`${portalUrl}/login`}
            onClick={() => setIsNavigatingToPortal(true)}
            className="flex w-full items-center justify-center rounded-full bg-gradient-to-br from-teal to-teal-light px-7 py-[14px] text-[0.88rem] font-medium text-white shadow-[0_4px_24px_rgba(13,148,136,0.25)]"
          >
            Client Login
          </a>
        </div>

        {/* Social footer */}
        <div className="border-t border-teal-light/15 px-7 py-5">
          <SocialLinks className="justify-center" />
        </div>
      </div>

      {/* Full-page loading overlay */}
      {isNavigatingToPortal && (
        <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-dark-base">
          <span className="flex items-center gap-[3px] font-serif text-[1.5rem] font-semibold text-white">
            Burlington
            <span className="inline-block h-[7px] w-[7px] animate-pulse rounded-full bg-teal-light shadow-[0_0_14px_rgba(45,212,191,0.6)]" />
          </span>
          <div className="mt-6 h-[2px] w-24 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-full animate-[shimmer_1.2s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-transparent via-teal-light to-transparent" />
          </div>
        </div>
      )}
    </>
  )
}
