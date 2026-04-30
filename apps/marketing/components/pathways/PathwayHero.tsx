import { SectionLabel } from '@burlington/ui'

interface HeroStat {
  value: string
  label: string
}

interface PathwayHeroProps {
  tag: string
  title: string
  description: string
  stats: HeroStat[]
  backgroundImage?: string
}

export function PathwayHero({ tag, title, description, stats, backgroundImage = '/hero-bg.jpg' }: PathwayHeroProps) {
  return (
    <section className="pw-hero">
      <div className="pw-hero-bg" style={{ backgroundImage: `url('${backgroundImage}')` }} />
      <div className="pw-hero-glow" />
      <div className="pw-hero-texture" />
      <div className="relative z-[2] mx-auto max-w-[1200px]">
        <div className="mb-5">
          <SectionLabel variant="dark">{tag}</SectionLabel>
        </div>
        <h1
          className="pw-hero-title"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p className="pw-hero-desc">{description}</p>
        <div className="pw-hero-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="pw-hero-stat">
              <div className="pw-hero-stat-val">{stat.value}</div>
              <div className="pw-hero-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
