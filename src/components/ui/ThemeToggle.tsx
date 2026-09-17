import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

/** True only once the visitor has picked a theme themselves. */
function savedChoice(): Theme | null {
  try {
    const t = localStorage.getItem('theme')
    return t === 'dark' || t === 'light' ? t : null
  } catch {
    return null
  }
}

export default function ThemeToggle() {
  // The inline script in index.html has already resolved this before paint,
  // falling back to the OS preference when nothing is saved.
  const [theme, setTheme] = useState<Theme>(
    () => (document.documentElement.dataset.theme as Theme) || 'light',
  )

  // Keep following the OS until the visitor overrides it. Writing to storage
  // on mount would silently turn the system default into an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      if (savedChoice()) return
      const next: Theme = mq.matches ? 'dark' : 'light'
      document.documentElement.dataset.theme = next
      setTheme(next)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', next === 'dark' ? '#08090B' : '#F7F4EF')
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* private mode, so the choice just will not persist */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink-2 transition-colors duration-200 hover:border-line-2 hover:text-ink"
    >
      {theme === 'dark' ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="4" />
          <path strokeLinecap="round" d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
        </svg>
      )}
    </button>
  )
}
