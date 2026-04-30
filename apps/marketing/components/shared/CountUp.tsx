'use client'

import { useRef, useState, useEffect, useCallback } from 'react'

function parse(val: string): { prefix: string; num: number; suffix: string } {
  const m = val.match(/^([^0-9]*)(\d+)(.*)$/)
  if (!m) return { prefix: '', num: 0, suffix: val }
  return { prefix: m[1] ?? '', num: parseInt(m[2] ?? '0', 10), suffix: m[3] ?? '' }
}

interface CountUpProps {
  value: string
  duration?: number
}

export function CountUp({ value, duration = 1600 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const { prefix, num, suffix } = parse(value)
  const [current, setCurrent] = useState(0)
  const animated = useRef(false)

  const run = useCallback(() => {
    if (animated.current) return
    animated.current = true
    const start = performance.now()

    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setCurrent(Math.round(eased * num))
      if (t < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [num, duration])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          run()
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [run])

  return <span ref={ref}>{prefix}{current}{suffix}</span>
}
