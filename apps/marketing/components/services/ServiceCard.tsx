import Link from 'next/link'

interface ServiceCardProps {
  num: string
  title: string
  tag?: string
  priceRange: string
  priceNote: string
  description: string
  onViewDetails: () => void
  featured?: boolean
  className?: string
}

export function ServiceCard({
  num,
  title,
  tag,
  priceRange,
  priceNote,
  description,
  onViewDetails,
  featured,
  className = '',
}: ServiceCardProps) {
  const base = featured ? 'sv-card sv-card-featured' : 'sv-card'

  return (
    <div className={`${base} ${className}`}>
      {featured && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(13,148,136,.04),transparent)]" />
      )}

      <div className="relative z-[1] flex flex-1 flex-col gap-4">
        {/* Top row */}
        <div className="flex min-h-[34px] items-center gap-3">
          <span className={featured ? 'sv-card-num sv-card-num-featured' : 'sv-card-num'}>{num}</span>
          {tag && <span className={featured ? 'sv-card-tag sv-card-tag-featured' : 'sv-card-tag'}>{tag}</span>}
        </div>

        {/* Title */}
        <h3 className={featured ? 'sv-card-title sv-card-title-featured' : 'sv-card-title'}>{title}</h3>

        {/* Price */}
        <div>
          <p className={featured ? 'sv-card-price sv-card-price-featured' : 'sv-card-price'}>{priceRange}</p>
          <p className="sv-card-note">{priceNote}</p>
        </div>

        {/* Description */}
        <p className={featured ? 'sv-card-desc sv-card-desc-featured' : 'sv-card-desc'}>{description}</p>

        {/* Actions */}
        <div className="mt-auto flex flex-col gap-3 pt-2">
          <button onClick={onViewDetails} className={featured ? 'sv-card-toggle sv-card-toggle-featured' : 'sv-card-toggle'}>
            <span>View details</span>
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[2]">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <Link href="/apply" className={featured ? 'sv-card-cta sv-card-cta-featured' : 'sv-card-cta'}>
            Get Started &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
