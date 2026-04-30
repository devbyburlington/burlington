import Link from 'next/link'
import type { ReactNode } from 'react'

interface ButtonProps {
  href: string
  children: ReactNode
  variant?: 'primary' | 'ghost'
  className?: string
  onClick?: () => void
}

const styles = {
  primary:
    'bg-gradient-to-br from-teal to-teal-light font-medium text-white shadow-[0_4px_20px_rgba(13,148,136,0.25),inset_0_1px_0_rgba(255,255,255,0.1)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(13,148,136,0.35)]',
  ghost:
    'border border-white/25 bg-white/[.06] font-normal text-white/75 backdrop-blur-sm hover:border-white/40 hover:bg-white/[.1] hover:text-white',
} as const

export function Button({ href, children, variant = 'primary', className = '', onClick }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-9 py-[15px] text-[0.88rem] transition-all ${styles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
