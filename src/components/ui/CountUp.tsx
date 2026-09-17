import { useEffect, useMemo, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

/**
 * Counts a display figure up when it scrolls into view.
 * Handles the shapes used on this page: "50K+", "4.7%", "25K+".
 */
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  // No negative margin here: a figure sitting just above the fold on a short
  // window would never intersect the shrunken root and would stay frozen at 0.
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()

  // Parsed once per value. Recomputing it each render would restart the
  // animation on every state update and the number would never settle.
  const parsed = useMemo(() => {
    const m = value.match(/^([\d.]+)(.*)$/)
    if (!m) return null
    return { target: parseFloat(m[1]), suffix: m[2], decimals: m[1].includes('.') ? 1 : 0 }
  }, [value])

  const [display, setDisplay] = useState(() =>
    reduce || !parsed ? value : `0${parsed.suffix}`,
  )

  useEffect(() => {
    if (!inView || !parsed || reduce) return
    const { target, suffix, decimals } = parsed
    const controls = animate(0, target, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(`${v.toFixed(decimals)}${suffix}`),
      onComplete: () => setDisplay(value),
    })
    return () => controls.stop()
  }, [inView, parsed, reduce, value])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
