import { CountUp } from './CountUp'

interface Stat {
  value: string
  label: string
}

interface StatStripProps {
  stats: Stat[]
}

export function StatStrip({ stats }: StatStripProps) {
  return (
    <div className="stat-strip">
      {stats.map((stat, i) => (
        <div key={stat.label} className="stat-strip-item">
          {i > 0 && <span className="stat-strip-divider" />}
          <div className="stat-strip-value">
            <CountUp value={stat.value} />
          </div>
          <div className="stat-strip-label">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
