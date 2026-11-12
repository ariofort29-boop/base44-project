import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

/**
 * Living botanical frame: a vine that draws itself around a card's perimeter
 * while leaves unfold one by one, then sway in a soft breeze.
 *
 * The frame is measured in CSS pixels and drawn as an absolutely positioned
 * SVG overlay, so stems and leaves keep their real proportions at any card
 * size (nothing is stretched by a viewBox). Growth and sway are pure CSS
 * animations; the only JavaScript is the one-off size measurement and an
 * IntersectionObserver that pauses work for off-screen cards.
 */

const TAU = Math.PI * 2

function toSeed(seed) {
  if (typeof seed === 'number') return Math.abs(seed) % 100000
  let hash = 0
  const text = String(seed)
  for (let i = 0; i < text.length; i += 1) hash = (hash * 31 + text.charCodeAt(i)) | 0
  return Math.abs(hash) % 100000
}

function mulberry32(input) {
  const seed = input
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Rounded-rectangle perimeter as line + arc segments we can walk by length. */
function buildPerimeter(width, height, radius, inset) {
  const x0 = inset
  const y0 = inset
  const x1 = width - inset
  const y1 = height - inset
  const r = Math.max(3, Math.min(radius, (x1 - x0) / 2, (y1 - y0) / 2))

  const segments = []
  const line = (x, y, dx, dy, len) => {
    if (len > 0.5) segments.push({ x, y, dx, dy, len })
  }
  const arc = (cx, cy, a0, a1) =>
    segments.push({ cx, cy, a0, a1, radius: r, len: Math.abs(a1 - a0) * r })

  line(x0 + r, y0, 1, 0, x1 - x0 - 2 * r)
  arc(x1 - r, y0 + r, -Math.PI / 2, 0)
  line(x1, y0 + r, 0, 1, y1 - y0 - 2 * r)
  arc(x1 - r, y1 - r, 0, Math.PI / 2)
  line(x1 - r, y1, -1, 0, x1 - x0 - 2 * r)
  arc(x0 + r, y1 - r, Math.PI / 2, Math.PI)
  line(x0, y1 - r, 0, -1, y1 - y0 - 2 * r)
  arc(x0 + r, y0 + r, Math.PI, Math.PI * 1.5)

  const total = segments.reduce((sum, segment) => sum + segment.len, 0)
  return { segments, total, radius: r }
}

function pointAt(segments, total, distance) {
  let rest = distance % total
  for (const segment of segments) {
    if (rest > segment.len) {
      rest -= segment.len
      continue
    }
    if (segment.a0 !== undefined) {
      const angle = segment.a0 + (segment.a1 - segment.a0) * (rest / segment.len)
      return {
        x: segment.cx + segment.radius * Math.cos(angle),
        y: segment.cy + segment.radius * Math.sin(angle),
        tx: -Math.sin(angle),
        ty: Math.cos(angle),
      }
    }
    return {
      x: segment.x + segment.dx * rest,
      y: segment.y + segment.dy * rest,
      tx: segment.dx,
      ty: segment.dy,
    }
  }
  return { x: 0, y: 0, tx: 1, ty: 0 }
}

function buildFrame(width, height, radius, inset, density, seed) {
  const rand = mulberry32(seed * 7919 + 13)
  const { segments, total } = buildPerimeter(width, height, radius, inset)

  // Stem: the perimeter with two slow waves so growth reads as organic.
  const step = 6
  const amplitude = 1.2 + rand() * 0.9
  const waveA = 0.03 + rand() * 0.018
  const waveB = 0.085 + rand() * 0.03
  const phase = rand() * TAU

  const points = []
  let length = 0
  let previous = null
  for (let distance = 0; distance <= total; distance += step) {
    const point = pointAt(segments, total, distance)
    const wobble =
      Math.sin(distance * waveA + phase) * amplitude + Math.sin(distance * waveB + phase * 1.7) * 0.55
    const x = point.x - point.ty * wobble
    const y = point.y + point.tx * wobble
    if (previous) length += Math.hypot(x - previous[0], y - previous[1])
    previous = [x, y]
    points.push([x, y])
  }

  const stem = `M${points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L')}`

  // Leaves: alternate sides of the stem, sized and angled with variation.
  const gap = Math.max(30, total / density)
  const leaves = []
  let cursor = gap * 0.4
  let index = 0
  while (cursor < total && leaves.length < density + 8) {
    const point = pointAt(segments, total, cursor)
    // Leaves lean into the card so their tips are never clipped by overflow.
    const nx = -point.ty
    const ny = point.tx
    const jitter = (rand() - 0.5) * 0.85
    const angle = (Math.atan2(nx, -ny) + jitter) * (180 / Math.PI)
    const scale = 0.62 + rand() * 0.55
    const delay = 0.18 + (cursor / total) * 1.55

    leaves.push({
      x: point.x.toFixed(1),
      y: point.y.toFixed(1),
      angle: angle.toFixed(1),
      scale: scale.toFixed(2),
      delay: delay.toFixed(2),
      sway: (2.2 + rand() * 3.2).toFixed(2),
      swayDelay: (1.6 + rand() * 2.4).toFixed(2),
      tone: index % 3 === 0 ? 'light' : 'dark',
    })

    cursor += gap * (0.78 + rand() * 0.5)
    index += 1
  }

  return { stem, stemLength: length, leaves }
}

const LEAF_PATH = 'M0 0 C 2.4 -3.1 3 -8 0 -12.6 C -3 -8 -2.4 -3.1 0 0 Z'

export default function BotanicalFrame({
  seed = 1,
  radius = 18,
  inset = 3,
  density = 22,
  className = '',
}) {
  const ref = useRef(null)
  const [size, setSize] = useState(null)
  const [active, setActive] = useState(false)

  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return undefined
    const measure = () => {
      const width = node.clientWidth
      const height = node.clientHeight
      if (width > 40 && height > 40) {
        setSize((current) =>
          current && current.width === width && current.height === height
            ? current
            : { width, height },
        )
      }
    }
    measure()
    if (typeof ResizeObserver === 'undefined') return undefined
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setActive(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: '80px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const seedNumber = toSeed(seed)

  const frame = useMemo(() => {
    if (!size) return null
    return buildFrame(size.width, size.height, radius, inset, density, seedNumber)
  }, [size, radius, inset, density, seedNumber])

  const gradientId = `vine-leaf-${seedNumber}`

  return (
    <svg
      ref={ref}
      className={`botanical-frame ${active ? 'is-active' : ''} ${className}`}
      viewBox={size ? `0 0 ${size.width} ${size.height}` : '0 0 1 1'}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#6fc494" />
          <stop offset="55%" stopColor="#3d9366" />
          <stop offset="100%" stopColor="#1a4f36" />
        </linearGradient>
      </defs>

      {frame && (
        <>
          <path className="vine-stem" d={frame.stem} style={{ '--vine-len': frame.stemLength }} />
          <path
            className="vine-stem__glint"
            d={frame.stem}
            style={{ '--vine-len': frame.stemLength }}
          />
          {frame.leaves.map((leaf, index) => (
            <g
              key={index}
              transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.angle})`}
              className="vine-leaf-group"
            >
              <g className="leaf-sway" style={{ '--sway-delay': `${leaf.swayDelay}s` }}>
                <g transform={`scale(${leaf.scale})`}>
                  <path
                    className="vine-leaf"
                    d={LEAF_PATH}
                    fill={leaf.tone === 'light' ? `url(#${gradientId})` : '#2a744f'}
                    style={{ '--leaf-delay': `${leaf.delay}s` }}
                  />
                  <path
                    className="vine-leaf__vein"
                    d="M0 0 L0 -11"
                    strokeWidth="0.45"
                    style={{ '--leaf-delay': `${leaf.delay + 0.3}s` }}
                  />
                </g>
              </g>
            </g>
          ))}
        </>
      )}
    </svg>
  )
}
