import { FadeIn } from '../shared/FadeIn'

interface CriterionItem {
  num: string
  title: string
  description: string
}

interface PathwayCriteriaProps {
  heading: string
  subtitle: string
  items: CriterionItem[]
  columns?: 1 | 2
}

export function PathwayCriteria({ heading, subtitle, items, columns = 2 }: PathwayCriteriaProps) {
  return (
    <section className="pw-criteria">
      <div className="pw-criteria-texture" />
      <div className="relative z-[1] mx-auto max-w-[1200px]">
        <FadeIn direction="none">
          <h2 className="section-heading-dark mb-3">{heading}</h2>
          <p className="pw-criteria-sub">{subtitle}</p>
        </FadeIn>
        <div className={columns === 2 ? 'pw-criteria-grid pw-criteria-grid--2' : 'pw-criteria-grid pw-criteria-grid--1'}>
          {items.map((item, i) => (
            <FadeIn key={item.num} delay={i * 100}>
            <div className="pw-criteria-item">
              <span className="pw-criteria-num">{item.num}</span>
              <div>
                <div className="pw-criteria-title">{item.title}</div>
                <div className="pw-criteria-desc">{item.description}</div>
              </div>
            </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
