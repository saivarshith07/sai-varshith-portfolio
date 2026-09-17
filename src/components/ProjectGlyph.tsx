import { motion, useReducedMotion } from 'motion/react'

/**
 * A small diagram per project that draws itself as the card enters view.
 * Each one echoes what the project actually does, so the visual carries
 * meaning rather than decoration.
 */

const stroke = { fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

function draw(delay = 0) {
  return {
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1.1, delay, ease: [0.22, 0.68, 0.2, 1] as const },
  }
}

function grow(delay = 0) {
  return {
    initial: { scaleX: 0 },
    whileInView: { scaleX: 1 },
    viewport: { once: true },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  }
}

function Glyphs({ id }: { id: string }) {
  switch (id) {
    // Flyy: a broadcast going out to many recipients.
    case 'flyy':
      return (
        <>
          <motion.circle cx="18" cy="36" r="7" className="fill-current" {...draw(0)} />
          {[14, 28, 42, 56].map((y, i) => (
            <motion.rect
              key={y}
              x="38"
              y={y - 3}
              width={54 - i * 6}
              height="5"
              rx="2.5"
              className="fill-current opacity-70"
              style={{ originX: 0 }}
              {...grow(0.15 + i * 0.1)}
            />
          ))}
        </>
      )

    // Vyapar Network: a document travelling between two connected businesses.
    case 'network':
      return (
        <>
          <motion.circle cx="14" cy="36" r="8" strokeWidth="2" className="stroke-current" {...stroke} {...draw(0)} />
          <motion.circle cx="98" cy="36" r="8" strokeWidth="2" className="stroke-current" {...stroke} {...draw(0.1)} />
          <motion.path d="M24 36 H88" strokeWidth="2" strokeDasharray="4 5" className="stroke-current opacity-50" {...stroke} {...draw(0.25)} />
          <motion.rect
            x="48" y="26" width="16" height="20" rx="3"
            className="fill-current"
            initial={{ opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </>
      )

    // Retail POS: a receipt, and the sale closing.
    case 'pos':
      return (
        <>
          <motion.path
            d="M20 8 H72 V58 L64 52 L56 58 L48 52 L40 58 L32 52 L20 58 Z"
            strokeWidth="2" className="stroke-current" {...stroke} {...draw(0)}
          />
          {[20, 30, 40].map((y, i) => (
            <motion.rect key={y} x="29" y={y} width={34 - i * 8} height="3.5" rx="1.75"
              className="fill-current opacity-60" style={{ originX: 0 }} {...grow(0.4 + i * 0.1)} />
          ))}
          <motion.path d="M84 34 l7 7 l13 -15" strokeWidth="3" className="stroke-current" {...stroke} {...draw(0.8)} />
        </>
      )

    // Referral: one user bringing in several more.
    case 'referral':
      return (
        <>
          <motion.circle cx="16" cy="36" r="8" className="fill-current" {...draw(0)} />
          {[12, 36, 60].map((y, i) => (
            <motion.path key={y} d={`M26 36 C48 36, 56 ${y}, 78 ${y}`} strokeWidth="2"
              className="stroke-current opacity-45" {...stroke} {...draw(0.2 + i * 0.12)} />
          ))}
          {[12, 36, 60].map((y, i) => (
            <motion.circle key={y} cx="88" cy={y} r="6" strokeWidth="2" className="stroke-current"
              {...stroke} {...draw(0.55 + i * 0.12)} />
          ))}
        </>
      )

    // Astro Vyapar: a crescent and a few stars.
    case 'astro':
      return (
        <>
          <motion.path
            /* outer circle minus an offset inner circle, so evenodd leaves a crescent */
            d="M50 34 m-24 0 a24 24 0 1 0 48 0 a24 24 0 1 0 -48 0 M62 32 m-21 0 a21 21 0 1 0 42 0 a21 21 0 1 0 -42 0"
            fillRule="evenodd"
            className="fill-current"
            initial={{ opacity: 0, scale: 0.8, rotate: -25 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: '50%', originY: '50%' }}
          />
          {[[88, 18], [102, 40], [84, 54]].map(([cx, cy], i) => (
            <motion.path key={i} d={`M${cx} ${cy - 6} l1.6 4.4 l4.4 1.6 l-4.4 1.6 l-1.6 4.4 l-1.6 -4.4 l-4.4 -1.6 l4.4 -1.6 Z`}
              className="fill-current" {...draw(0.4 + i * 0.15)} />
          ))}
        </>
      )

    // Dashboards: bars rising out of raw data.
    case 'dashboards':
      return (
        <>
          <motion.path d="M14 58 H108" strokeWidth="2" className="stroke-current opacity-40" {...stroke} {...draw(0)} />
          {[[26, 22], [46, 34], [66, 14], [86, 28]].map(([x, h], i) => (
            <motion.rect key={x} x={x} y={56 - h} width="12" height={h} rx="2.5"
              className="fill-current"
              style={{ originY: 1 }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </>
      )

    // Crash reporting: a spiking error rate that settles down.
    case 'reliability':
      return (
        <>
          <motion.path d="M12 56 H110" strokeWidth="2" className="stroke-current opacity-40" {...stroke} {...draw(0)} />
          <motion.path
            d="M14 48 L28 20 L36 44 L48 12 L58 42 L70 30 L82 44 L96 42 L108 44"
            strokeWidth="2.5" className="stroke-current" {...stroke} {...draw(0.15)}
          />
          <motion.circle cx="48" cy="12" r="4.5" className="fill-current"
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.85 }} />
        </>
      )

    // Sketch Board: a freehand stroke on a canvas.
    case 'sketch-board':
      return (
        <>
          <motion.rect x="12" y="10" width="96" height="50" rx="6" strokeWidth="2"
            className="stroke-current opacity-40" {...stroke} {...draw(0)} />
          <motion.path
            d="M26 46 C36 20, 46 50, 56 30 S74 18, 84 40 S94 30, 98 24"
            strokeWidth="3" className="stroke-current" {...stroke} {...draw(0.25)}
          />
        </>
      )

    // HN Scraper: rows streaming in on a schedule.
    case 'hn-scraper':
      return (
        <>
          <motion.circle cx="20" cy="36" r="11" strokeWidth="2" className="stroke-current" {...stroke} {...draw(0)} />
          <motion.path d="M20 30 V36 L25 39" strokeWidth="2" className="stroke-current" {...stroke} {...draw(0.35)} />
          {[16, 30, 44, 58].map((y, i) => (
            <motion.rect key={y} x="42" y={y - 3} width={38 + (i % 2) * 18} height="5" rx="2.5"
              className="fill-current opacity-70" style={{ originX: 0 }} {...grow(0.4 + i * 0.1)} />
          ))}
        </>
      )

    default:
      return null
  }
}

export default function ProjectGlyph({
  id,
  accent,
  className = '',
}: {
  id: string
  accent: 'mint' | 'coral'
  className?: string
}) {
  const reduce = useReducedMotion()
  const tone = accent === 'mint' ? 'text-mint' : 'text-coral'

  return (
    <svg
      viewBox="0 0 120 68"
      role="presentation"
      aria-hidden
      className={`${tone} ${className}`}
      style={reduce ? { opacity: 1 } : undefined}
    >
      <Glyphs id={id} />
    </svg>
  )
}
