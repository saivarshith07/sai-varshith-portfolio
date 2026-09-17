import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

type Lock = { w: number; h: number; r: number } | null

const INTERACTIVE = 'a[href], button:not(:disabled), [role="button"], [role="slider"]'

/** How far an element leans toward the pointer, and its ceiling in px. */
const PULL = 0.18
const MAX_PULL = 14

/**
 * A custom cursor: a dot pinned to the pointer, a ring just behind it, and
 * two softer ghosts further back. Move fast and they string out into a
 * smear; slow down and they collect back into one shape.
 *
 * It also snaps onto interactive elements and pulls them gently toward the
 * pointer. The pull is written to the `translate` CSS property rather than
 * `transform`, so it can never clobber a Tailwind transform utility.
 *
 * The native cursor is hidden only while this is mounted, and this is only
 * mounted for a fine pointer with motion allowed. Everyone else keeps the
 * system cursor exactly as it was.
 */
export default function Cursor() {
  const [on, setOn] = useState(false)
  const [lock, setLock] = useState<Lock>(null)
  const [down, setDown] = useState(false)

  const held = useRef<HTMLElement | null>(null)
  const base = useRef({ cx: 0, cy: 0 })

  const x = useMotionValue(-200)
  const y = useMotionValue(-200)

  // Four followers, each lagging a little more than the last.
  const ring = { x: useSpring(x, { stiffness: 900, damping: 45, mass: 0.35 }), y: useSpring(y, { stiffness: 900, damping: 45, mass: 0.35 }) }
  const g1 = { x: useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 }), y: useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 }) }
  const g2 = { x: useSpring(x, { stiffness: 130, damping: 22, mass: 0.8 }), y: useSpring(y, { stiffness: 130, damping: 22, mass: 0.8 }) }

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setOn(true)
    document.documentElement.dataset.cursor = 'custom'

    const drop = () => {
      const el = held.current
      if (el) {
        el.style.transition = 'translate 380ms cubic-bezier(.22,.68,.2,1)'
        el.style.translate = '0px 0px'
        window.setTimeout(() => {
          el.style.transition = ''
          el.style.translate = ''
        }, 420)
      }
      held.current = null
      setLock(null)
    }

    const grab = (el: HTMLElement) => {
      const r = el.getBoundingClientRect()
      base.current = { cx: r.left + r.width / 2, cy: r.top + r.height / 2 }
      held.current = el
      el.style.transition = 'translate 140ms cubic-bezier(.22,.68,.2,1)'
      setLock({
        w: r.width + 10,
        h: r.height + 10,
        r: (parseFloat(getComputedStyle(el).borderRadius) || 8) + 5,
      })
    }

    const clamp = (n: number) => Math.max(-MAX_PULL, Math.min(MAX_PULL, n))

    const move = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(INTERACTIVE)

      if (!el) {
        if (held.current) drop()
        x.set(e.clientX)
        y.set(e.clientY)
        return
      }

      if (el !== held.current) {
        if (held.current) drop()
        grab(el)
      }

      const dx = clamp((e.clientX - base.current.cx) * PULL)
      const dy = clamp((e.clientY - base.current.cy) * PULL)
      el.style.translate = `${dx}px ${dy}px`
      x.set(base.current.cx + dx)
      y.set(base.current.cy + dy)
    }

    // A captured centre is only valid until the page moves beneath it.
    const onScroll = () => {
      if (held.current) drop()
    }
    const press = () => setDown(true)
    const release = () => setDown(false)

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointerdown', press, { passive: true })
    window.addEventListener('pointerup', release, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointerdown', press)
      window.removeEventListener('pointerup', release)
      delete document.documentElement.dataset.cursor
      drop()
    }
  }, [x, y])

  if (!on) return null

  const layer = 'pointer-events-none fixed left-0 top-0 z-[70] hidden md:block'
  // `border-ink` flips with the theme, so it reads on cream and on near-black.
  // A difference blend looked right on dark but washed out on light.
  const shape = 'block -translate-x-1/2 -translate-y-1/2 border border-ink'

  return (
    <>
      {/* the smear: softer, slower, only while nothing is locked */}
      <motion.div aria-hidden className={layer} style={{ x: g2.x, y: g2.y }}>
        <motion.span
          className={`${shape} rounded-full`}
          initial={false}
          animate={{ width: 22, height: 22, opacity: lock ? 0 : 0.2 }}
          transition={{ duration: 0.25 }}
        />
      </motion.div>
      <motion.div aria-hidden className={layer} style={{ x: g1.x, y: g1.y }}>
        <motion.span
          className={`${shape} rounded-full`}
          initial={false}
          animate={{ width: 23, height: 23, opacity: lock ? 0 : 0.38 }}
          transition={{ duration: 0.25 }}
        />
      </motion.div>

      {/* the ring, which is also what wraps an element on hover */}
      <motion.div aria-hidden className={layer} style={{ x: ring.x, y: ring.y }}>
        <motion.span
          className={`${shape} border-2`}
          initial={false}
          animate={{
            width: lock ? lock.w : 24,
            height: lock ? lock.h : 24,
            borderRadius: lock ? lock.r : 999,
            opacity: lock ? 1 : 0.8,
            scale: down ? 0.94 : 1,
          }}
          transition={{ type: 'spring', stiffness: 560, damping: 38, mass: 0.5 }}
        />
      </motion.div>

      {/* the dot, pinned exactly where the pointer is */}
      <motion.div aria-hidden className={layer} style={{ x, y }}>
        <motion.span
          className="block -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
          initial={false}
          animate={{ width: lock ? 0 : 5, height: lock ? 0 : 5, opacity: lock ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  )
}
