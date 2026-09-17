import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

/**
 * Scroll-linked entrance: the card settles into place as it travels up
 * the viewport, and eases back out as it leaves. Tied to scroll position
 * rather than a one-shot trigger, so it tracks the user's scrubbing.
 */
export default function ScrollStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.28, 0.78, 1], [0.955, 1, 1, 0.985])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0.35, 1, 1, 0.55])
  const y = useTransform(scrollYProgress, [0, 0.28], [42, 0])

  if (reduce) return <div ref={ref}>{children}</div>

  return (
    <motion.div ref={ref} style={{ scale, opacity, y }} className="will-change-transform">
      {children}
    </motion.div>
  )
}
