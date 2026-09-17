import { highlights } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading index="01" title="About" accent="A bit about me." />

        <div className="grid gap-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-20">
          <div>
            <Reveal>
              <div className="space-y-5 text-[17px] leading-[1.72] text-ink-2">
                <p>
                  I like the part of this job where a rough idea turns into something a shop owner
                  picks up and uses without reading a manual. Most of my work lives in the frontend,
                  so React and TypeScript architecture, design systems other teams build on, and
                  desktop apps packaged with Electron and RSPack.
                </p>
                <p>
                  When a feature needs it I go the rest of the way: REST APIs in{' '}
                  <span className="text-ink">NestJS</span>, payments through Razorpay, live updates
                  over SSE, and the CI/CD that puts the build in front of users. I like owning a
                  problem from the empty repo to the release note.
                </p>
                <p>
                  I have spent three years on software that people run their livelihood on, which
                  changes how you think about a bug. I would rather ship something narrow that holds
                  up than something broad that needs babysitting.
                </p>
              </div>
            </Reveal>
          </div>

          <div>
            <ul className="space-y-px overflow-hidden rounded-card border border-line bg-line">
              {highlights.map((h, i) => (
                <Reveal key={h.title} delay={i * 0.05} className="bg-bg">
                  <li className="flex gap-5 p-6">
                    <span className="mono-label mt-1 w-20 shrink-0 text-mint">{h.tag}</span>
                    <div>
                      <h3 className="text-[16px] font-semibold leading-snug text-ink">{h.title}</h3>
                      <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-3">{h.detail}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
