'use client'

import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { IconButton } from '../shared/IconButton'

interface ServiceModalProps {
  title: string
  tag?: string
  priceRange: string
  isOpen: boolean
  onClose: () => void
  featured?: boolean
  children: ReactNode
}

export function ServiceModal({
  title,
  tag,
  priceRange,
  isOpen,
  onClose,
  featured,
  children,
}: ServiceModalProps) {
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className="sv-modal-backdrop" onClick={onClose}>
      <div
        className="sv-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${title} details`}
      >
        {/* Header */}
        <div className="sv-modal-header">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="font-serif text-[1.35rem] font-medium text-burl-gray-700 sm:text-[1.5rem]">{title}</h2>
              {tag && <span className="sv-card-tag hidden sm:inline-block">{tag}</span>}
            </div>
            <p className="mt-1 text-[1rem] font-semibold text-teal-dark">{priceRange}</p>
          </div>
          <IconButton onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </IconButton>
        </div>

        {/* Body */}
        <div className="sv-modal-body">
          {children}
        </div>

        {/* Footer */}
        <div className="sv-modal-footer">
          <p className="mb-4 hidden text-center text-[0.75rem] leading-[1.6] text-burl-gray-400 sm:block">
            Burlington Consult does not apply templates. Every case is built around your specific professional record.
          </p>
          <Link
            href="/apply"
            className={featured ? 'sv-card-cta sv-card-cta-featured' : 'sv-card-cta'}
            onClick={onClose}
          >
            Get Started &rarr;
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  )
}
