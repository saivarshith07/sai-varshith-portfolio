import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

/** Fades and lifts its children into view once, the first time they are scrolled to. */
export default function Reveal({ children, delay = 0, y = 22, className }: Props) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 0.68, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}
