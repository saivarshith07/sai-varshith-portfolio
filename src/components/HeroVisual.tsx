import { useEffect, useRef, useState } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from 'motion/react'
import { shipsTo } from '../data/content'

/**
 * The hero's focal point: a mock browser the visitor can actually drag to
 * resize, with the layout reflowing across breakpoints as they do it.
 *
 * A static diagram would only claim the responsive work. This performs it.
 */

const ease = [0.22, 0.68, 0.2, 1] as const

const MIN = 26
const MAX = 100

type Mode = 'desktop' | 'tablet' | 'mobile'

const modeFor = (w: number): Mode => (w > 70 ? 'desktop' : w > 44 ? 'tablet' : 'mobile')
const widthFor: Record<Mode, string> = { desktop: '1440', tablet: '768', mobile: '390' }

function Bar({ className = '', accent = false }: { className?: string; accent?: boolean }) {
  return (
    <motion.div
      layout
      className={`rounded-[3px] ${accent ? 'bg-mint/70' : 'bg-surface-2'} ${className}`}
      transition={{ duration: 0.35, ease }}
    />
  )
}

export default function HeroVisual() {
  const reduce = useReducedMotion()
  const [dragging, setDragging] = useState(false)
  const [touched, setTouched] = useState(false)
  const track = useRef<HTMLDivElement>(null)

  // The width lives in a motion value, not in state. Driving it through
  // setState re-rendered this whole tree on every animation frame, which is
  // what made the resize stutter. Now only a breakpoint crossing re-renders.
  const w = useMotionValue(100)
  const widthPct = useTransform(w, (v) => `${v}%`)
  const [mode, setMode] = useState<Mode>('desktop')

  useMotionValueEvent(w, 'change', (v) => {
    const next = modeFor(v)
    setMode((prev) => (prev === next ? prev : next))
  })

  // Loops through the breakpoints on its own, so the frame reads as a live
  // demo rather than a still. Stops for good once the visitor takes over.
  useEffect(() => {
    if (reduce || touched) return

    let cancelled = false
    let running: { stop: () => void } | null = null
    let timer = 0

    const hold = (ms: number) =>
      new Promise<void>((done) => {
        timer = window.setTimeout(done, ms)
      })

    // Animating the motion value directly keeps this off the React render path.
    const glideTo = (to: number) =>
      new Promise<void>((done) => {
        running = animate(w, to, { duration: 1.1, ease, onComplete: () => done() })
      })

    const run = async () => {
      await hold(1200)
      while (!cancelled) {
        for (const stop of [58, 34, 100]) {
          if (cancelled) return
          await glideTo(stop)
          if (cancelled) return
          await hold(1250)
        }
      }
    }
    void run()

    return () => {
      cancelled = true
      running?.stop()
      window.clearTimeout(timer)
    }
  }, [reduce, touched, w])

  const setFromPointer = (clientX: number) => {
    const el = track.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const pct = ((clientX - r.left) / r.width) * 100
    w.set(Math.max(MIN, Math.min(MAX, pct)))
  }

  useEffect(() => {
    if (!dragging) return
    const move = (e: PointerEvent) => setFromPointer(e.clientX)
    const up = () => setDragging(false)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [dragging])

  return (
    <div className="relative mx-auto w-full max-w-[400px] select-none">
      <div
        aria-hidden
        className="absolute left-1/2 top-[38%] h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint/20 blur-[90px]"
      />

      {/* ---------------- interface ---------------- */}
      <motion.div
        className="relative rounded-2xl border border-mint/30 bg-surface p-4 shadow-[0_18px_50px_-24px_color-mix(in_oklab,var(--color-mint)_55%,transparent)] ring-1 ring-mint/10"
        initial={reduce ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
      >
        <div className="mb-3 flex items-baseline justify-between gap-3">
          <span className="mono-label text-mint">Interface</span>
          <span className="truncate font-mono text-[10.5px] text-ink-3">
            React · Next.js · Tailwind
          </span>
        </div>

        <div ref={track} className="relative flex h-[168px] items-stretch gap-1.5">
          {/* the resizable viewport */}
          <motion.div
            className="overflow-hidden rounded-lg border border-mint/25 bg-bg/40"
            style={{ width: widthPct }}
          >
            <div className="flex items-center gap-1 border-b border-line px-2 py-1.5">
              {['bg-coral/60', 'bg-ink-3/40', 'bg-mint/60'].map((c) => (
                <span key={c} className={`h-1.5 w-1.5 shrink-0 rounded-full ${c}`} />
              ))}
              <span className="ml-1.5 h-1.5 min-w-0 flex-1 rounded-full bg-surface-2" />
            </div>

            <motion.div layout className="flex gap-2 p-2.5" transition={{ duration: 0.35, ease }}>
              {/* the sidebar is the first thing to go */}
              {mode === 'desktop' && (
                <motion.div
                  layout
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="w-[26%] shrink-0 space-y-1.5 overflow-hidden"
                  transition={{ duration: 0.3, ease }}
                >
                  <Bar className="h-1.5" accent />
                  <Bar className="h-1.5" />
                  <Bar className="h-1.5 w-2/3" />
                </motion.div>
              )}

              <motion.div layout className="min-w-0 flex-1 space-y-2" transition={{ duration: 0.35, ease }}>
                <Bar className="h-1.5 w-3/4" accent={mode === 'mobile'} />
                {/* cards sit side by side until there is no room */}
                <motion.div
                  layout
                  className={`flex gap-1.5 ${mode === 'mobile' ? 'flex-col' : 'flex-row'}`}
                  transition={{ duration: 0.35, ease }}
                >
                  <Bar className={mode === 'mobile' ? 'h-7 w-full' : 'h-12 flex-1'} />
                  <Bar className={mode === 'mobile' ? 'h-7 w-full' : 'h-12 flex-1'} />
                </motion.div>
                <Bar className="h-1.5 w-1/2" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* drag handle */}
          <div
            role="slider"
            tabIndex={0}
            aria-label="Resize the preview"
            aria-valuemin={MIN}
            aria-valuemax={MAX}
            aria-valuenow={Math.round(w.get())}
            aria-valuetext={`${widthFor[mode]} pixels wide`}
            onPointerDown={(e) => {
              e.preventDefault()
              setTouched(true)
              setDragging(true)
              setFromPointer(e.clientX)
            }}
            onKeyDown={(e) => {
              if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
              e.preventDefault()
              setTouched(true)
              w.set(Math.max(MIN, Math.min(MAX, w.get() + (e.key === 'ArrowRight' ? 6 : -6))))
            }}
            className={`group flex w-3 shrink-0 cursor-ew-resize items-center justify-center rounded-full transition-colors ${
              dragging ? 'bg-mint/25' : 'bg-mint/5 hover:bg-mint/15'
            }`}
          >
            <span
              className={`h-10 w-[3px] rounded-full transition-colors ${
                dragging ? 'bg-mint' : 'bg-mint/60 group-hover:bg-mint'
              }`}
            />
          </div>
        </div>

        {/* readouts */}
        <div className="mt-3 space-y-1.5 border-t border-line pt-3">
          <div className="mono-label flex items-center gap-2 text-[10px]">
            <span className="text-mint">{dragging || touched ? 'Resizing' : 'Drag to resize'}</span>
            <span className="h-px flex-1 bg-line" />
            {(['desktop', 'tablet', 'mobile'] as Mode[]).map((m, i) => (
              <span key={m} className="flex items-center gap-2">
                <span
                  className={
                    mode === m
                      ? 'rounded bg-mint/15 px-1.5 py-0.5 text-mint'
                      : 'px-1.5 py-0.5 text-ink-3/60'
                  }
                >
                  {widthFor[m]}
                </span>
                {i < 2 && <span className="text-ink-3/40">/</span>}
              </span>
            ))}
          </div>
          <div className="mono-label flex flex-wrap items-center gap-x-1.5 text-[10px]">
            <span>Ships to</span>
            <span className="mx-1 h-px w-4 bg-line" />
            {shipsTo.map((t, i) => (
              <span key={t} className={i === shipsTo.length - 1 ? 'text-mint' : undefined}>
                {t}
                {i < shipsTo.length - 1 && <span className="text-ink-3/50"> ·</span>}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* connector */}
      <div aria-hidden className="relative mx-auto h-4 w-px bg-line">
        {!reduce && (
          <motion.span
            className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-mint"
            initial={{ top: 0, opacity: 0 }}
            animate={{ top: [0, 14], opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: 1.2, repeatDelay: 1.6, ease: 'easeInOut' }}
          />
        )}
      </div>

      {/* ---------------- services and data ---------------- */}
      <motion.div
        className="relative rounded-2xl border border-line bg-surface p-4 shadow-xl shadow-black/20"
        initial={reduce ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15, ease }}
      >
        <div className="mb-3 flex items-baseline justify-between gap-3">
          <span className="mono-label">Services &amp; data</span>
          <span className="truncate font-mono text-[10.5px] text-ink-3">NestJS · Node · SQL</span>
        </div>

        {[
          ['GET', '/api/orders', '200'],
          ['POST', '/api/checkout', '201'],
        ].map(([verb, path, code], i) => (
          <motion.div
            key={path}
            className="flex items-center gap-2.5 py-0.5 font-mono text-[11px]"
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 + i * 0.12 }}
          >
            <span className="rounded border border-line bg-surface-2 px-1.5 py-0.5 text-mint">
              {verb}
            </span>
            <span className="min-w-0 flex-1 truncate text-ink-2">{path}</span>
            <span className="text-ink-3">{code}</span>
          </motion.div>
        ))}

        <div className="mt-3 flex flex-wrap gap-1.5 border-t border-line pt-3">
          {['MySQL', 'MongoDB', 'SQLite'].map((db, i) => (
            <motion.span
              key={db}
              className="rounded border border-line bg-surface-2 px-2 py-0.5 font-mono text-[10.5px] text-ink-3"
              initial={{ opacity: 0, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.7 + i * 0.07 }}
            >
              {db}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
