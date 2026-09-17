import { skills } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 border-y border-line bg-surface/40 py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading index="05" title="Toolkit" accent="What I reach for." />

        <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal key={group.group} delay={i * 0.05} className="bg-bg">
              <div className="h-full p-7">
                <h3 className="mono-label text-mint">{group.group}</h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-[13.5px] text-ink-2 transition hover:border-mint/40 hover:text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
