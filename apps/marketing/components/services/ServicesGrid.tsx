'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { ServiceCard } from './ServiceCard'
import { ServiceModal } from './ServiceModal'
import { CheckItem } from './CheckItem'

export function ServicesGrid() {
  const [openModal, setOpenModal] = useState<string | null>(null)
  const [activeCard, setActiveCard] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const close = useCallback(() => setOpenModal(null), [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const cards = Array.from(el.children) as HTMLElement[]
    if (!cards.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const idx = cards.indexOf(entry.target as HTMLElement)
            if (idx !== -1) setActiveCard(idx)
          }
        })
      },
      { root: el, threshold: 0.5 }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div ref={scrollRef} className="sv-cards-row flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:items-center md:gap-4 md:overflow-visible md:pb-0">

        <ServiceCard
          num="01"
          title="Immigration Advisory"
          tag="Primary"
          priceRange="$20,000 – $50,000"
          priceNote="2 tiers"
          description="EB-1A and EB-2 NIW petitions filed simultaneously. Shared priority date, single evidence record, and the case architecture that determines approval."
          onViewDetails={() => setOpenModal('01')}
          featured
          className="w-[85vw] shrink-0 snap-center md:w-auto md:shrink md:order-2"
        />

        <ServiceCard
          num="02"
          title="Admissions & Scholarship"
          tag="Education"
          priceRange="$1,500 – $5,000"
          priceNote="3 tiers"
          description="Scholarship-optimised application strategy guided by practitioners who secured $500,000+ in scholarships."
          onViewDetails={() => setOpenModal('02')}
          className="w-[85vw] shrink-0 snap-center md:w-auto md:shrink md:order-1"
        />

        <ServiceCard
          num="03"
          title="Career Advisory"
          tag="Professional"
          priceRange="$300 – $2,500"
          priceNote="2 tiers"
          description="Strategic career positioning for professionals transitioning into or advancing within the U.S. market."
          onViewDetails={() => setOpenModal('03')}
          className="w-[85vw] shrink-0 snap-center md:w-auto md:shrink md:order-3"
        />

      </div>

      <div className="flex items-center justify-center gap-2 pt-1 md:hidden">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeCard === i ? 'w-5 bg-teal' : 'w-1.5 bg-burl-gray-300'
            }`}
          />
        ))}
      </div>

      {/* ── Modals ── */}

      <ServiceModal
        title="Immigration Advisory"
        tag="Primary"
        priceRange="$20,000 – $50,000"
        isOpen={openModal === '01'}
        onClose={close}
        featured
      >
        <p className="sv-detail-label">What&apos;s included</p>
        <div className="space-y-1.5 sm:space-y-2">
          <CheckItem>Proposed endeavour — stress-tested</CheckItem>
          <CheckItem>Full EB-1A petition</CheckItem>
          <CheckItem>Full EB-2 NIW petition</CheckItem>
          <CheckItem>Up to 12 letters from scratch</CheckItem>
          <CheckItem>Evidence architecture + legal review</CheckItem>
          <CheckItem>12-month RFE and NOID retainer</CheckItem>
        </div>

        <div className="sv-detail-divider" />
        <p className="sv-detail-label hidden sm:block">Pricing options</p>

        <div className="sv-tier">
          <p className="sv-tier-name">Standard</p>
          <p className="sv-tier-price">~$20,000</p>
          <p className="sv-tier-note">4 milestone payments &middot; $5,000 each</p>
        </div>

        <div className="sv-tier sv-tier-highlight">
          <div className="flex items-center justify-between gap-2">
            <p className="sv-tier-name">Full Protection</p>
            <span className="sv-tier-badge">Money-Back Guarantee</span>
          </div>
          <p className="sv-tier-price">$50,000</p>
          <p className="sv-tier-note">Paid upfront before drafting begins</p>
          <p className="sv-tier-note">If denied after RFE: Burlington refiles at no fee, or 60% refund. If second filing denied: 100% refund.</p>
        </div>
      </ServiceModal>

      <ServiceModal
        title="Admissions & Scholarship"
        tag="Education"
        priceRange="$1,500 – $5,000"
        isOpen={openModal === '02'}
        onClose={close}
      >
        <p className="sv-detail-label">What&apos;s included</p>
        <div className="space-y-1.5 sm:space-y-2">
          <CheckItem>Personal statement — full drafting</CheckItem>
          <CheckItem>Resume rewrite for grad school</CheckItem>
          <CheckItem>School selection + positioning</CheckItem>
          <CheckItem>Scholarship negotiation</CheckItem>
          <CheckItem>Mock interviews with feedback</CheckItem>
        </div>

        <div className="sv-detail-divider" />
        <p className="sv-detail-label hidden sm:block">Tiers</p>

        <div className="sv-tier">
          <p className="sv-tier-name">Essentials</p>
          <p className="sv-tier-price">$1,500</p>
          <p className="sv-tier-note">1 target school</p>
        </div>

        <div className="sv-tier">
          <p className="sv-tier-name">Core</p>
          <p className="sv-tier-price">$3,000</p>
          <p className="sv-tier-note">Up to 3 schools</p>
        </div>

        <div className="sv-tier sv-tier-highlight">
          <div className="flex items-center justify-between gap-2">
            <p className="sv-tier-name">Signature</p>
            <span className="sv-tier-badge">Recommended</span>
          </div>
          <p className="sv-tier-price">$5,000</p>
          <p className="sv-tier-note">Up to 5 schools &middot; Full application management</p>
        </div>
      </ServiceModal>

      <ServiceModal
        title="Career Advisory"
        tag="Professional"
        priceRange="$300 – $2,500"
        isOpen={openModal === '03'}
        onClose={close}
      >
        <p className="sv-detail-label">What&apos;s included</p>
        <div className="space-y-1.5 sm:space-y-2">
          <CheckItem>Career trajectory review</CheckItem>
          <CheckItem>Resume architecture — U.S. format</CheckItem>
          <CheckItem>LinkedIn optimisation</CheckItem>
          <CheckItem>Mock interviews + salary negotiation</CheckItem>
        </div>

        <div className="sv-detail-divider" />
        <p className="sv-detail-label hidden sm:block">Tiers</p>

        <div className="sv-tier">
          <p className="sv-tier-name">Career Strategy Session</p>
          <p className="sv-tier-price">$300</p>
          <p className="sv-tier-note">90 minutes &middot; Written action plan</p>
        </div>

        <div className="sv-tier sv-tier-highlight">
          <div className="flex items-center justify-between gap-2">
            <p className="sv-tier-name">Career Accelerator</p>
            <span className="sv-tier-badge">Comprehensive</span>
          </div>
          <p className="sv-tier-price">$2,500</p>
          <p className="sv-tier-note">4 weeks &middot; Resume, LinkedIn, interviews, salary negotiation</p>
        </div>
      </ServiceModal>
    </>
  )
}
