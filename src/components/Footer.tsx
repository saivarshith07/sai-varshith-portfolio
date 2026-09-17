import { profile } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-5 text-[13.5px] text-ink-3 sm:flex-row sm:items-center md:px-8">
        <span>
          Built by <span className="text-ink-2">{profile.short}</span> in {profile.location} ·{' '}
          {new Date().getFullYear()}
        </span>
        <span className="font-mono text-[11.5px]">React · Vite · Tailwind · Motion</span>
      </div>
    </footer>
  )
}
