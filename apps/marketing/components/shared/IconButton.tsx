import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'light' | 'dark'
  children: ReactNode
}

const styles = {
  light:
    'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-burl-gray-300 text-burl-gray-500 transition-colors hover:border-burl-gray-400 hover:text-burl-gray-700',
  dark:
    'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-teal text-teal-light transition-colors hover:border-teal-light hover:bg-teal/10 hover:text-white',
}

export function IconButton({
  variant = 'light',
  children,
  className = '',
  ...props
}: IconButtonProps) {
  return (
    <button className={`${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
