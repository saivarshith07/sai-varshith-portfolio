import { motion } from 'motion/react'
import Reveal from './Reveal'


type Props = {
  index: string
  title: string
  accent?: string
  lead?: string
}

export default function SectionHeading({ index, title, accent, lead }: Props) {
  return (
    <div className="mb-12 md:mb-16">
      <Reveal>
        <div className="mono-label flex items-center gap-3">
          <span className="text-mint">{index}</span>
          <span className="h-px w-10 bg-line-2" />
          <span>{title}</span>
        </div>
      </Reveal>
      {accent && (
        <motion.h2
          className="mt-5 max-w-2xl text-4xl leading-[1.08] tracking-tight text-ink md:text-5xl"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
          variants={{ show: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } } }}
        >
          {accent.split(' ').map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: '0.4em' },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 0.68, 0.2, 1] } },
              }}
            >
              {word}&nbsp;
            </motion.span>
          ))}
        </motion.h2>
      )}
      {lead && (
        <Reveal delay={0.12}>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-2">{lead}</p>
        </Reveal>
      )}
    </div>
  )
}
