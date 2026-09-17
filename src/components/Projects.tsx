import { projects } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import ScrollStage from './ui/ScrollStage'
import { FeaturedProject, CompactProject, OpenSourceProject } from './ProjectCard'

export default function Projects() {
  const featured = projects.filter((p) => p.kind === 'product' && p.featured)
  const rest = projects.filter((p) => p.kind === 'product' && !p.featured)
  const oss = projects.filter((p) => p.kind === 'open-source')

  return (
    <section id="projects" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="03"
          title="Work at Vyapar"
          accent="Products I shipped, and the numbers they moved."
          lead="Every one of these is live, in front of real merchants running real businesses. The metric is the part I was accountable for."
        />

        <div className="space-y-6">
          {featured.map((p) => (
            <ScrollStage key={p.id}>
              <FeaturedProject project={p} />
            </ScrollStage>
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <CompactProject project={p} />
            </Reveal>
          ))}
        </div>

        <div className="mt-24">
          <Reveal>
            <div className="mono-label flex items-center gap-3">
              <span className="text-coral">04</span>
              <span className="h-px w-10 bg-line-2" />
              <span>Personal projects</span>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h3 className="mt-5 max-w-2xl text-3xl leading-tight tracking-tight md:text-4xl">
              Things I built on my own time, source included.
            </h3>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {oss.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.05}>
                <OpenSourceProject project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
