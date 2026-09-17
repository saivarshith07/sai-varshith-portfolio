import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

type Lock = { w: number; h: number; r: number } | null

const INTERACTIVE = 'a[href], button:not(:disabled), [role="button"], [role="slider"]'

/** How far an element leans toward the pointer, and its ceiling in px. */
const PULL = 0.18
const MAX_PULL = 14

/** Segments in the trail. More reads as a longer tail. */
const SEGMENTS = 14
/** How hard each point chases the one ahead of it. Lower drags further. */
const CHASE = 0.44

/**
 * A custom cursor: a thin line that trails the pointer and tapers away to
 * nothing, plus a ring that snaps onto interactive elements and pulls them
 * gently toward the pointer.
 *
 * The trail is written straight to the DOM inside a rAF loop, so none of it
 * touches React's render path. The loop parks itself once the tail has caught
 * up and nothing is moving.
 *
 * Only mounted for a fine pointer with motion allowed, so touch and
 * reduced-motion visitors keep the native cursor untouched.
 */
export default function Cursor() {
  const [on, setOn] = useState(false)
  const [lock, setLock] = useState<Lock>(null)
  const [down, setDown] = useState(false)

  const held = useRef<HTMLElement | null>(null)
  const base = useRef({ cx: 0, cy: 0 })
  const segs = useRef<(SVGLineElement | null)[]>([])
  const pts = useRef(Array.from({ length: SEGMENTS + 1 }, () => ({ x: -200, y: -200 })))
  const target = useRef({ x: -200, y: -200 })

  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const rx = useSpring(x, { stiffness: 900, damping: 45, mass: 0.35 })
  const ry = useSpring(y, { stiffness: 900, damping: 45, mass: 0.35 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setOn(true)
    document.documentElement.dataset.cursor = 'custom'

    let frame = 0

    const tick = () => {
      const p = pts.current
      p[0].x = target.current.x
      p[0].y = target.current.y

      let moved = 0
      for (let i = 1; i < p.length; i++) {
        const dx = p[i - 1].x - p[i].x
        const dy = p[i - 1].y - p[i].y
        p[i].x += dx * CHASE
        p[i].y += dy * CHASE
        moved += Math.abs(dx) + Math.abs(dy)
      }

      for (let i = 0; i < SEGMENTS; i++) {
        const el = segs.current[i]
        if (!el) continue
        el.setAttribute('x1', String(p[i].x))
        el.setAttribute('y1', String(p[i].y))
        el.setAttribute('x2', String(p[i + 1].x))
        el.setAttribute('y2', String(p[i + 1].y))
      }

      // Nothing left to interpolate: stop burning frames until the next move.
      if (moved < 0.4) {
        frame = 0
        return
      }
      frame = requestAnimationFrame(tick)
    }

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

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
      target.current = { x: e.clientX, y: e.clientY }
      wake()

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
      if (frame) cancelAnimationFrame(frame)
      delete document.documentElement.dataset.cursor
      drop()
    }
  }, [x, y])

  if (!on) return null

  return (
    <>
      {/* the trail, tapering and fading toward the tail */}
      <svg
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[69] hidden h-full w-full text-mint md:block"
      >
        {Array.from({ length: SEGMENTS }, (_, i) => {
          const t = 1 - i / SEGMENTS
          return (
            <line
              key={i}
              ref={(el) => {
                segs.current[i] = el
              }}
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth={t * 1.8 + 0.3}
              opacity={lock ? 0 : t * t * 0.75}
              style={{ transition: 'opacity 220ms ease' }}
            />
          )
        })}
      </svg>

      {/* the ring, which also wraps whatever it snaps onto */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden md:block"
        style={{ x: rx, y: ry }}
      >
        <motion.span
          className="block -translate-x-1/2 -translate-y-1/2 border border-ink"
          initial={false}
          animate={{
            width: lock ? lock.w : 22,
            height: lock ? lock.h : 22,
            borderRadius: lock ? lock.r : 999,
            opacity: lock ? 1 : 0.75,
            scale: down ? 0.94 : 1,
          }}
          transition={{ type: 'spring', stiffness: 560, damping: 38, mass: 0.5 }}
        />
      </motion.div>
    </>
  )
}
