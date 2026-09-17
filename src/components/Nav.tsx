import { useEffect, useState } from 'react'
import { profile, navItems } from '../data/content'
import ThemeToggle from './ui/ThemeToggle'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el))

    const spy = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.6] },
    )

    sections.forEach((s) => spy.observe(s))
    return () => spy.disconnect()
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-line bg-bg/80 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-[68px] w-full max-w-6xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="group flex items-center gap-2.5 text-[15px] font-semibold tracking-tight">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-mint" />
          </span>
          {profile.short}
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                active === item.id ? 'bg-surface-2 text-ink' : 'text-ink-2 hover:text-ink'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener"
            className="hidden rounded-full bg-ink px-4 py-2 text-sm font-semibold text-bg transition-[transform,box-shadow] duration-300 ease-out hover:scale-[1.04] hover:shadow-lg active:scale-[0.98] sm:inline-flex"
          >
            Resume
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink md:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" fill="none">
              {open ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-bg px-5 pb-5 pt-2 md:hidden" aria-label="Sections, mobile">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className="block border-b border-line py-3 text-[15px] text-ink-2 last:border-0"
            >
              {item.label}
            </a>
          ))}
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener"
            className="mt-3 inline-flex rounded-full bg-ink px-4 py-2 text-sm font-semibold text-bg"
          >
            Resume
          </a>
        </nav>
      )}
    </header>
  )
}
