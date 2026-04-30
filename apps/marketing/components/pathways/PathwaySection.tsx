import { SectionLabel } from '@burlington/ui'
import type { ReactNode } from 'react'
import { FadeIn } from '../shared/FadeIn'

interface FactCard {
  icon: ReactNode
  title: string
  description: string
}

interface PathwaySectionProps {
  tag: string
  heading: string
  paragraphs: string[]
  facts: FactCard[]
  pullquote?: string
  variant?: 'light' | 'alt' | 'dark'
}

export function PathwaySection({
  tag,
  heading,
  paragraphs,
  facts,
  pullquote,
  variant = 'light',
}: PathwaySectionProps) {
  const isDark = variant === 'dark'
  const sectionClass = isDark
    ? 'pw-section pw-section--dark'
    : variant === 'alt'
      ? 'pw-section pw-section--alt'
      : 'pw-section'

  return (
    <section className={sectionClass}>
      <div className="mx-auto max-w-[1200px]">
        <div className="pw-two-col">
          <FadeIn>
            <div className="mb-5">
              <SectionLabel variant={isDark ? 'dark' : 'light'}>{tag}</SectionLabel>
            </div>
            <h2 className={isDark ? 'section-heading-dark mb-4' : 'section-heading mb-4'}>
              {heading}
            </h2>
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className={`${isDark ? 'section-body-dark' : 'section-body'} mb-4 last:mb-0`}
                dangerouslySetInnerHTML={{ __html: p }}
              />
            ))}
            {pullquote && (
              <blockquote className="pw-pullquote">
                <p>{pullquote}</p>
              </blockquote>
            )}
          </FadeIn>
          <div className="flex flex-col gap-3">
            {facts.map((fact, i) => (
              <FadeIn key={fact.title} delay={i * 120} direction="right">
              <div className="pw-fact">
                <div className="pw-fact-icon">{fact.icon}</div>
                <div>
                  <h4 className="pw-fact-title">{fact.title}</h4>
                  <p className="pw-fact-desc">{fact.description}</p>
                </div>
              </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
