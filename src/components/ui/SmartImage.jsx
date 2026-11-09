import { useState } from 'react'

/**
 * Image with a designed fallback: if the remote photograph fails to load the
 * tile keeps its gradient + botanical watermark instead of collapsing.
 */
export default function SmartImage({ src, alt, className = '', imgClassName = '', children }) {
  const [failed, setFailed] = useState(!src)
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-brand-50 ${className}`}>
      <div
        className="absolute inset-0 bg-gradient-to-br from-brand-100 via-brand-50 to-mist"
        aria-hidden="true"
      />
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
            loaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
          } ${imgClassName}`}
        />
      )}
      {children}
    </div>
  )
}
