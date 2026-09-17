import { useState } from 'react'

/**
 * Shows public/profile.jpg once it exists; until then, a monogram.
 * No code change needed when the photo is dropped in.
 */
export default function Avatar({ size = 64 }: { size?: number }) {
  const [failed, setFailed] = useState(false)

  return (
    <span
      className="relative inline-grid shrink-0 place-items-center overflow-hidden rounded-full border border-line-2 bg-surface-2"
      style={{ width: size, height: size }}
    >
      {!failed ? (
        <img
          src="profile.jpg"
          alt="Sai Varshith Pachipulusu"
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
