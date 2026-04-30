'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
  once?: boolean
}

export function FadeIn({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 600,
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mq.matches)
    if (mq.matches) {
      setIsVisible(true)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(el)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once])

  const translate = {
    up: 'translate3d(0, 24px, 0)',
    down: 'translate3d(0, -24px, 0)',
    left: 'translate3d(24px, 0, 0)',
    right: 'translate3d(-24px, 0, 0)',
    none: 'translate3d(0, 0, 0)',
  }

  return (
    <div
      ref={ref}
      className={className}
      style={prefersReduced ? {} : {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : translate[direction],
        transition: `opacity ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
