import { useState } from 'react'
import { profile } from '../../data/content'

/**
 * Shows profile.photo when one is configured, otherwise a monogram.
 * Nothing is requested unless a photo is set, so the deployed site does
 * not log a 404 for a file that was never added.
 */
export default function Avatar({ size = 64 }: { size?: number }) {
  const [failed, setFailed] = useState(false)
  const src = profile.photo

  return (
    <span
      className="relative inline-grid shrink-0 place-items-center overflow-hidden rounded-full border border-line-2 bg-surface-2"
      style={{ width: size, height: size }}
    >
      {src && !failed ? (
        <img
          src={src}
          alt={profile.name}
          width={size}
          height={size}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="font-serif text-xl text-mint">SV</span>
      )}
    </span>
  )
}
