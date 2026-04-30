'use client'

import { useState } from 'react'
import { SectionLabel } from '@burlington/ui'
import { FadeIn } from '../shared/FadeIn'

const VALUES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-teal stroke-[1.5]">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'Bias toward action',
    body: 'You don&apos;t wait for instructions. You see a problem, figure out a solution, and ship it.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-teal stroke-[1.5]">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
    ),
    title: 'Depth over breadth',
    body: 'We want specialists who have gone deep on something — anything. That rigour transfers.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-teal stroke-[1.5]">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: 'No ego, just work',
    body: 'Small team. Big mandate. Everyone does whatever needs doing. The best idea wins.',
  },
]

const ROLES = [
  {
    category: 'Legal & Case Strategy',
    description: 'Immigration case architects, compliance specialists, and petition drafters who build the evidentiary backbone of every filing.',
    examples: ['Case Strategist', 'Legal Analyst', 'Petition Drafter', 'Compliance Researcher'],
  },
  {
    category: 'Engineering & Product',
    description: 'Full-stack and front-end engineers, product managers, and designers building the client platform, internal tools, and AI-powered systems.',
    examples: ['Full-Stack Engineer', 'Front-End Engineer', 'Product Manager', 'Product Designer'],
  },
  {
    category: 'Growth & Marketing',
    description: 'Content strategists, SEO specialists, and growth marketers who tell the Burlington story to professionals across the world.',
    examples: ['Content Strategist', 'SEO Lead', 'Growth Marketer', 'Partnership Manager'],
  },
  {
    category: 'Research & Due Diligence',
    description: 'Evidence sourcers, credential verification specialists, and documentation experts who ensure every claim in a petition is bulletproof.',
    examples: ['Research Analyst', 'Due Diligence Specialist', 'Evidence Coordinator'],
  },
  {
    category: 'Operations & Client Success',
    description: 'Engagement managers, pipeline coordinators, and client communications specialists who keep the machine running.',
    examples: ['Client Success Manager', 'Operations Coordinator', 'Engagement Manager'],
  },
  {
    category: 'Something else entirely',
    description: 'Exceptional people don\'t always fit a predefined box. If you\'re outstanding at what you do and believe you can contribute, we want to hear from you.',
    examples: [],
  },
]

export function CareersBody() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section className="bg-off-white px-5 py-14 sm:px-10 sm:py-16 lg:px-20 lg:py-[clamp(80px,10vw,140px)]">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* Left — values */}
          <div>
            <FadeIn className="mb-6">
              <div className="mb-5">
                <SectionLabel>What we value</SectionLabel>
              </div>
              <h2 className="section-heading">
                Three things that matter more than your CV.
              </h2>
            </FadeIn>

            <div className="flex flex-col gap-4">
              {VALUES.map((value, i) => (
                <FadeIn key={value.title} delay={i * 120}>
                <div
                  className="group flex items-start gap-4 rounded-xl border border-burl-gray-100 bg-white p-5 transition-all hover:border-teal/20 hover:shadow-[0_4px_24px_rgba(13,148,136,0.06)]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-teal/15 bg-teal/[.06] transition-colors group-hover:border-teal/25 group-hover:bg-teal/[.1]">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="mb-1 font-serif text-[0.92rem] font-semibold text-burl-gray-900">
                      {value.title}
                    </h3>
                    <p className="text-[0.78rem] leading-[1.65] text-burl-gray-400">
                      {value.body}
                    </p>
                  </div>
                </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Mobile divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent lg:hidden" />

          {/* Right — open roles */}
          <div>
            <FadeIn className="mb-6">
              <div className="mb-5">
                <SectionLabel>Open roles</SectionLabel>
              </div>
              <h2 className="section-heading">
                Where you might fit.
              </h2>
            </FadeIn>

            <div className="flex flex-col gap-3">
              {ROLES.map((role, i) => {
                const isExpanded = expandedIndex === i

                return (
                  <button
                    key={role.category}
                    type="button"
                    onClick={() => setExpandedIndex(isExpanded ? null : i)}
                    className={`group w-full rounded-xl border text-left transition-all ${
                      isExpanded
                        ? 'border-teal/25 bg-teal/[.03]'
                        : 'border-burl-gray-100 bg-white hover:border-teal/15 hover:shadow-[0_2px_12px_rgba(13,148,136,0.04)]'
                    }`}
                  >
                    <div className="flex items-center justify-between px-5 py-4">
                      <h3 className="font-serif text-[0.92rem] font-medium text-burl-gray-900 sm:text-[1rem]">
                        {role.category}
                      </h3>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        className={`shrink-0 text-burl-gray-300 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>

                    <div
                      className={`grid transition-all duration-300 ${
                        isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="border-t border-burl-gray-100 px-5 pb-4 pt-3">
                          <p className="text-[0.8rem] leading-[1.7] text-burl-gray-400">
                            {role.description}
                          </p>
                          {role.examples.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {role.examples.map((example) => (
                                <span
                                  key={example}
                                  className="rounded-full border border-teal/15 bg-teal/[.06] px-3 py-1 text-[0.72rem] font-medium text-teal-dark"
                                >
                                  {example}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
