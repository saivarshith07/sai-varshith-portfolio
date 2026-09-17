import { motion, useReducedMotion } from 'motion/react'
import { profile, stats, marquee, coreStack } from '../data/content'
import CountUp from './ui/CountUp'
import HeroVisual from './HeroVisual'
import Avatar from './ui/Avatar'

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.07 * i, ease: [0.22, 0.68, 0.2, 1] as const },
  }),
}

const iconLinks = [
  {
    href: profile.github,
    label: 'GitHub',
    path: 'M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.33C3.81 14.36 3.35 12.8 3.35 12.8c-.36-.92-.88-1.16-.88-1.16-.72-.49.05-.48.05-.48.8.06 1.22.82 1.22.82.71 1.21 1.86.86 2.31.66.07-.52.28-.86.5-1.06-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z',
  },
  {
    href: profile.linkedin,
    label: 'LinkedIn',
    path: 'M13.6 0H2.4A2.4 2.4 0 0 0 0 2.4v11.2A2.4 2.4 0 0 0 2.4 16h11.2a2.4 2.4 0 0 0 2.4-2.4V2.4A2.4 2.4 0 0 0 13.6 0ZM5 13.3H2.8V6.2H5v7.1ZM3.9 5.2a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Zm9.4 8.1h-2.2V9.6c0-.9 0-2-1.2-2s-1.4 1-1.4 2v3.7H6.3V6.2h2.1v1h.03c.3-.56 1-1.15 2.1-1.15 2.2 0 2.7 1.5 2.7 3.4v3.85Z',
  },
]

export default function Hero() {
  const reduce = useReducedMotion()
  const animate = (i: number) =>
    reduce ? {} : { variants: rise, initial: 'hidden' as const, animate: 'show' as const, custom: i }

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0 opacity-50" />
        <div className="absolute -top-44 left-[18%] h-[480px] w-[620px] -translate-x-1/2 rounded-full bg-mint/10 blur-[130px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.85fr)] lg:gap-16">
          {/* ---- copy ---- */}
          <div>
            <motion.div {...animate(0)} className="flex items-center gap-4">
              <Avatar size={60} />
              <div className="mono-label flex flex-col gap-1.5">
                <span className="text-[13px] tracking-normal text-ink normal-case font-sans font-semibold">
                  {profile.name}
                </span>
                <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                  <span className="text-ink-2">{profile.role}</span>
                  <span className="h-1 w-1 rounded-full bg-mint" />
                  <span>{profile.location}</span>
                </span>
              </div>
            </motion.div>

            <motion.h1
              {...animate(1)}
              className="mt-6 text-[clamp(2.4rem,5.2vw,4rem)] font-semibold leading-[1.03] tracking-[-0.035em]"
            >
              I build interfaces people{' '}
              <span className="font-serif font-normal italic text-mint">rely on.</span>
            </motion.h1>

            <motion.p {...animate(2)} className="mt-6 max-w-xl text-[17.5px] leading-[1.7] text-ink-2">
              {profile.intro}
            </motion.p>

            <motion.div {...animate(3)} className="mt-8 flex flex-wrap items-center gap-2">
              <span className="mono-label mr-1">Core stack</span>
              {coreStack.map((t) => (
                <span
                  key={t.name}
                  className={`rounded-lg border px-3 py-1.5 font-mono text-[12.5px] transition-colors ${
                    t.lead
                      ? 'border-mint/40 bg-mint/10 text-mint'
                      : 'border-line bg-surface-2 text-ink-2'
                  }`}
                >
                  {t.name}
                </span>
              ))}
            </motion.div>

            <motion.div {...animate(4)} className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2 rounded-full bg-mint px-5 py-3 text-[15px] font-semibold text-on-accent transition-[transform,box-shadow,filter] duration-300 ease-out hover:scale-[1.03] hover:brightness-110 hover:shadow-[0_14px_38px_-12px_color-mix(in_oklab,var(--color-mint)_70%,transparent)] active:scale-[0.99]"
              >
                Get in touch
                <span className="transition-transform group-hover:translate-x-0.5">&#8594;</span>
              </a>
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full border border-line-2 px-5 py-3 text-[15px] font-semibold text-ink transition-[transform,border-color,background-color] duration-300 ease-out hover:scale-[1.03] hover:border-ink hover:bg-surface-2 active:scale-[0.99]"
              >
                Resume
              </a>

              <span aria-hidden className="mx-1 hidden h-6 w-px bg-line sm:block" />

              <span className="flex items-center gap-3">
              {iconLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={l.label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink-2 transition-[transform,border-color,color,background-color] duration-300 ease-out hover:scale-110 hover:border-ink hover:bg-surface-2 hover:text-ink active:scale-95"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d={l.path} />
                  </svg>
                </a>
              ))}
              </span>
            </motion.div>

            <motion.p {...animate(5)} className="mt-8 flex items-center gap-2.5 text-[13.5px] text-ink-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
              </span>
              {profile.available}
            </motion.p>
          </div>

          {/* ---- visual ---- */}
          <motion.div {...animate(4)} className="w-full">
            <HeroVisual />
          </motion.div>
        </div>

        <motion.dl
          {...animate(6)}
          className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-bg p-5 md:p-6">
              <dt>
                <CountUp
                  value={s.value}
                  className="block font-serif text-4xl leading-none tracking-tight text-ink md:text-[2.75rem]"
                />
              </dt>
              <dd className="mt-2.5 text-[13.5px] leading-snug text-ink-3">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.div {...animate(7)} className="relative mt-14 overflow-hidden border-y border-line py-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />
        <div className="flex w-max animate-marquee">
          {[...marquee, ...marquee].map((item, i) => (
            <span key={i} className="mono-label flex items-center gap-8 px-4 whitespace-nowrap">
              {item}
              <span className="h-1 w-1 rounded-full bg-mint/60" />
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
