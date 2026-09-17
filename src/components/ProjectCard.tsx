import type { MouseEvent } from 'react'
import { motion } from 'motion/react'
import type { Project } from '../data/content'
import CountUp from './ui/CountUp'
import ProjectGlyph from './ProjectGlyph'

/** Moves the radial sheen to follow the pointer across a card. */
function trackPointer(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

function OrgBadge({ label, tone }: { label: string; tone: 'mint' | 'coral' }) {
  const cls =
    tone === 'mint'
      ? 'border-mint/30 bg-mint/10 text-mint'
      : 'border-coral/30 bg-coral/10 text-coral'
  return (
    <span className={`rounded-full border px-2.5 py-1 font-mono text-[10.5px] tracking-wider uppercase ${cls}`}>
      {label}
    </span>
  )
}

function Stack({ items }: { items: string[] }) {
  return (
    <motion.ul
      className="mt-6 flex flex-wrap gap-1.5"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{ show: { transition: { staggerChildren: 0.035, delayChildren: 0.15 } } }}
    >
      {items.map((s) => (
        <motion.li
          key={s}
          variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}
          className="rounded-md border border-line bg-surface-2 px-2.5 py-1 font-mono text-[11.5px] text-ink-2 transition-colors hover:border-mint/40 hover:text-ink"
        >
          {s}
        </motion.li>
      ))}
    </motion.ul>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <motion.ul
      className="mt-6 space-y-3"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={{ show: { transition: { staggerChildren: 0.075, delayChildren: 0.1 } } }}
    >
      {items.map((b) => (
        <motion.li
          key={b}
          variants={{
            hidden: { opacity: 0, x: -10 },
            show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 0.68, 0.2, 1] } },
          }}
          className="flex gap-3 text-[15px] leading-relaxed text-ink-2"
        >
          <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-mint" />
          {b}
        </motion.li>
      ))}
    </motion.ul>
  )
}

const accentText = { mint: 'text-mint', coral: 'text-coral' } as const
const accentGlow = { mint: 'bg-mint/10', coral: 'bg-coral/10' } as const

/** The two headline products: wide, with the metric pulled out as a display number. */
export function FeaturedProject({ project }: { project: Project }) {
  return (
    <article
      onMouseMove={trackPointer}
      className="group relative overflow-hidden rounded-card border border-line bg-surface transition-colors duration-300 hover:border-line-2"
    >
      <div className="card-sheen pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full blur-[90px] ${accentGlow[project.accent]}`}
      />

      <div className="relative grid gap-8 p-7 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-12 md:p-10">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <OrgBadge label="Vyapar" tone="mint" />
            <span className="mono-label">{project.year}</span>
          </div>

          <h3 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">{project.name}</h3>
          <p className="mt-2 font-serif text-xl italic text-ink-2">{project.tagline}</p>

          {project.metric && (
            <div className="mt-8 border-t border-line pt-6">
              <CountUp
                value={project.metric.value}
                className={`block font-serif text-5xl leading-none ${accentText[project.accent]}`}
              />
              <div className="mono-label mt-2.5">{project.metric.label}</div>
            </div>
          )}

          <div className="mono-label mt-8">{project.role}</div>

          <ProjectGlyph id={project.id} accent={project.accent} className="mt-7 h-16 w-32 opacity-80" />
        </div>

        <div className="md:border-l md:border-line md:pl-12">
          <p className="text-[16.5px] leading-[1.7] text-ink">{project.summary}</p>
          <Bullets items={project.bullets} />
          <Stack items={project.stack} />
        </div>
      </div>
    </article>
  )
}

/** Everything else, same anatomy in one column. */
export function CompactProject({ project }: { project: Project }) {
  return (
    <article
      onMouseMove={trackPointer}
      className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface p-7 transition-colors duration-300 hover:border-line-2"
    >
      <div className="card-sheen pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <OrgBadge label="Vyapar" tone="mint" />
            <span className="mono-label">{project.year}</span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight">{project.name}</h3>
          <p className="mt-1.5 font-serif text-lg italic text-ink-2">{project.tagline}</p>
        </div>
        {project.metric && (
          <div className="shrink-0 text-right">
            <CountUp
              value={project.metric.value}
              className={`block font-serif text-3xl leading-none ${accentText[project.accent]}`}
            />
            <div className="mono-label mt-1.5 text-[10px]">{project.metric.label}</div>
          </div>
        )}
      </div>

      <ProjectGlyph id={project.id} accent={project.accent} className="relative mt-6 h-14 w-28 opacity-75" />

      <p className="relative mt-5 text-[15.5px] leading-relaxed text-ink-2">{project.summary}</p>
      <div className="relative">
        <Bullets items={project.bullets} />
      </div>
      <div className="relative mt-auto">
        <Stack items={project.stack} />
      </div>
    </article>
  )
}

/** Side projects, flagged as code you can actually go read. */
export function OpenSourceProject({ project }: { project: Project }) {
  return (
    <article
      onMouseMove={trackPointer}
      className="group relative flex h-full flex-col overflow-hidden rounded-card border border-dashed border-line-2 bg-surface/60 p-7 transition-colors duration-300 hover:border-mint/50"
    >
      <div className="card-sheen pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative mb-4 flex items-center gap-2.5">
        <OrgBadge label="Personal" tone="coral" />
        <span className="mono-label">Open source</span>
      </div>

      <div className="relative flex items-center justify-between gap-4">
        <h3 className="text-2xl font-semibold tracking-tight">{project.name}</h3>
        {project.link && (
          <a
            href={project.link.href}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-[11.5px] text-ink-2 transition hover:border-mint hover:text-mint"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
              <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.33C3.81 14.36 3.35 12.8 3.35 12.8c-.36-.92-.88-1.16-.88-1.16-.72-.49.05-.48.05-.48.8.06 1.22.82 1.22.82.71 1.21 1.86.86 2.31.66.07-.52.28-.86.5-1.06-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
            {project.link.label}
          </a>
        )}
      </div>

      <p className="relative mt-1.5 font-serif text-lg italic text-ink-2">{project.tagline}</p>

      <ProjectGlyph id={project.id} accent={project.accent} className="relative mt-6 h-14 w-28 opacity-75" />

      <p className="relative mt-5 text-[15.5px] leading-relaxed text-ink-2">{project.summary}</p>
      <div className="relative">
        <Bullets items={project.bullets} />
      </div>
      <div className="relative mt-auto">
        <Stack items={project.stack} />
      </div>
    </article>
  )
}
