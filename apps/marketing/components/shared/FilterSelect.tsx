'use client'

import { useState, useRef, useEffect } from 'react'

interface FilterSelectProps {
  label: string
  value: string
  options: readonly { slug: string; label: string }[]
  onChange: (slug: string) => void
  variant?: 'light' | 'dark'
}

export function FilterSelect({ label, value, options, onChange, variant = 'light' }: FilterSelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selected = options.find(o => o.slug === value)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  const isDark = variant === 'dark'

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`fs-trigger ${isDark ? 'fs-trigger-dark' : 'fs-trigger-light'}`}
      >
        <span className={`fs-label ${isDark ? 'text-white/30' : 'text-burl-gray-200'}`}>{label}</span>
        <span className={isDark ? 'text-white/80' : 'text-burl-gray-500'}>{selected?.label}</span>
        <svg
          viewBox="0 0 24 24"
          className={`fs-chevron ${open ? 'rotate-180' : ''} ${isDark ? 'stroke-white/30' : 'stroke-burl-gray-200'}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className={`fs-menu ${isDark ? 'fs-menu-dark' : 'fs-menu-light'}`}
        >
          {options.map(opt => (
            <li key={opt.slug} role="option" aria-selected={opt.slug === value}>
              <button
                type="button"
                className={`fs-option ${isDark ? 'fs-option-dark' : 'fs-option-light'} ${
                  opt.slug === value
                    ? isDark ? 'text-teal-light bg-teal/10' : 'text-teal-dark bg-teal/[.06]'
                    : ''
                }`}
                onClick={() => { onChange(opt.slug); setOpen(false) }}
              >
                {opt.label}
                {opt.slug === value && (
                  <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 shrink-0 fill-none stroke-[2.5] ${isDark ? 'stroke-teal-light' : 'stroke-teal-dark'}`}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
