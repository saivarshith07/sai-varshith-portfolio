import { experience } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

export default function Experience() {
  return (
    <section id="work" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading index="02" title="Experience" accent="Three years at Vyapar." />

        <div className="relative md:pl-10">
          {/* the spine */}
          <div aria-hidden className="absolute left-0 top-3 bottom-3 hidden w-px bg-line md:block" />

          <div className="space-y-16">
            {experience.map((job, i) => (
              <Reveal key={`${job.title}-${job.period}`} delay={i * 0.05}>
                <div className="relative grid gap-6 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:gap-14">
                  <span
                    aria-hidden
                    className={`absolute -left-10 top-2.5 hidden h-2.5 w-2.5 rounded-full ring-4 ring-bg md:block ${
                      job.kind === 'education' ? 'bg-line-2' : 'bg-mint'
                    }`}
                  />

                  <div>
                    <div className="mono-label">
                      {job.kind === 'education' ? 'Education' : 'Role'}
                    </div>
                    <h3 className="mt-3 text-[22px] font-semibold leading-snug tracking-tight md:text-2xl">
                      {job.title}
                    </h3>
                    <p className="mt-2 text-[15px] text-ink-2">{job.company}</p>
                    <p className="mono-label mt-3">{job.period}</p>
                    <p className="mono-label mt-1.5">{job.location}</p>
                  </div>

                  <div>
                    <p className="text-[16.5px] leading-relaxed text-ink">{job.blurb}</p>

                    <ul className="mt-6 space-y-3">
                      {job.points.map((p) => (
                        <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-ink-2">
                          <span
                            aria-hidden
                            className={`mt-2.5 h-1 w-1 shrink-0 rounded-full ${
                              job.kind === 'education' ? 'bg-line-2' : 'bg-mint'
                            }`}
                          />
                          {p}
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-6 flex flex-wrap gap-1.5">
                      {job.stack.map((t) => (
                        <li
                          key={t}
                          className="rounded-md border border-line bg-surface-2 px-2.5 py-1 font-mono text-[11.5px] text-ink-2"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
