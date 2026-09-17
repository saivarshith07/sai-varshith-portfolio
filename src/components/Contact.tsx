import { useState } from 'react'
import { profile } from '../data/content'
import Reveal from './ui/Reveal'

const links = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, copy: profile.email },
  { label: 'LinkedIn', value: 'in/saivarshithp', href: profile.linkedin },
  { label: 'GitHub', value: '@saivarshith07', href: profile.github },
  { label: 'Phone', value: profile.phone, href: profile.phoneHref },
  { label: 'Resume', value: 'Download PDF', href: profile.resume },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked, the mailto link still works */
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-24 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-mint/12 blur-[130px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="mono-label flex items-center gap-3">
            <span className="text-mint">06</span>
            <span className="h-px w-10 bg-line-2" />
            <span>Contact</span>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="mt-6 max-w-3xl text-[clamp(2.4rem,6vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
            Let's build something{' '}
            <span className="font-serif font-normal italic text-mint">worth using.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-2">
            I'm open to frontend and full-stack roles, and always up for a conversation about
            building products. Email is the fastest way to reach me.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-mint px-5 py-3 text-[15px] font-semibold text-on-accent transition-colors duration-200 hover:bg-mint-deep"
            >
              Email me
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-full border border-line-2 px-5 py-3 text-[15px] font-semibold text-ink transition-colors duration-200 hover:border-ink hover:bg-surface-2"
            >
              {copied ? 'Copied ✓' : 'Copy address'}
            </button>
          </div>
        </Reveal>

        <div className="mt-16 overflow-hidden rounded-card border border-line">
          {links.map((l, i) => (
            <Reveal key={l.label} delay={i * 0.04}>
              <a
                href={l.href}
                target={l.href.startsWith('http') || l.href.endsWith('.pdf') ? '_blank' : undefined}
                rel="noopener"
                className="group flex items-center justify-between gap-4 border-b border-line px-6 py-5 transition-colors last:border-b-0 hover:bg-surface"
              >
                <span className="mono-label w-24 shrink-0">{l.label}</span>
                <span className="flex-1 truncate text-[15.5px] text-ink">{l.value}</span>
                <span className="text-ink-3 transition-all group-hover:translate-x-0.5 group-hover:text-mint">
                  ↗
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
