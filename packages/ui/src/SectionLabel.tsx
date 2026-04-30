interface SectionLabelProps {
  children: string
  centered?: boolean
  variant?: 'light' | 'dark'
}

export function SectionLabel({ children, centered = false, variant = 'light' }: SectionLabelProps) {
  const color = variant === 'dark' ? 'text-teal-light/70' : 'text-teal'
  const lineColor = variant === 'dark' ? 'bg-teal-light/30' : 'bg-teal'

  return (
    <div className={centered ? 'flex justify-center' : ''}>
      <span
        className={`inline-flex items-center gap-2.5 text-[0.72rem] font-medium uppercase tracking-[.12em] ${color}`}
      >
        <span className={`h-px w-5 ${lineColor}`} />
        {children}
        {centered && <span className={`h-px w-5 ${lineColor}`} />}
      </span>
    </div>
  )
}
