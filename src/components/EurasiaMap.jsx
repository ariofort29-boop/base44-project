import { useMemo } from 'react'
import { eurasiaShapes } from '../data/eurasiaGeo'
import { marketsById } from '../data/markets'

/**
 * Albers equal-area conic projection fitted to the Eurasian target markets.
 * Boundaries are Natural Earth 1:110m country outlines, projected here so the
 * map stays geographically accurate at any rendered width.
 */
const DEG = Math.PI / 180
const PHI1 = 25 * DEG
const PHI2 = 62 * DEG
const PHI0 = 42 * DEG
const LAM0 = 68 * DEG

const N = 0.5 * (Math.sin(PHI1) + Math.sin(PHI2))
const C = Math.cos(PHI1) ** 2 + 2 * N * Math.sin(PHI1)
const RHO0 = Math.sqrt(C - 2 * N * Math.sin(PHI0)) / N

function project([lon, lat]) {
  const rho = Math.sqrt(C - 2 * N * Math.sin(lat * DEG)) / N
  const theta = N * (lon * DEG - LAM0)
  return [rho * Math.sin(theta), RHO0 - rho * Math.cos(theta)]
}

const PADDING = 14
const WIDTH = 1000

/* Frame the map on the Eurasian markets, not on Russia's Pacific outliers
   across the antimeridian (they would stretch the projection off-centre). */
const WINDOW = { lonMin: 20, lonMax: 115, latMin: 20, latMax: 84 }

const meanLon = (ring) => ring.reduce((sum, point) => sum + point[0], 0) / ring.length

const projected = eurasiaShapes
  .map((shape) => {
    const polygons = shape.polygons.filter((polygon) => meanLon(polygon[0]) > 0)
    return {
      ...shape,
      polygons,
      rings: polygons.map((polygon) => polygon.map((ring) => ring.map(project))),
      anchor: shape.label ? project(shape.label) : null,
    }
  })
  .filter((shape) => shape.rings.length > 0)

const inWindow = projected
  .flatMap((shape) => shape.polygons.flat(2))
  .filter(
    ([lon, lat]) =>
      lon >= WINDOW.lonMin &&
      lon <= WINDOW.lonMax &&
      lat >= WINDOW.latMin &&
      lat <= WINDOW.latMax,
  )
  .map(project)

const boundsPoints =
  inWindow.length > 0 ? inWindow : projected.flatMap((shape) => shape.rings.flat(2))

const minX = Math.min(...boundsPoints.map((point) => point[0]))
const maxX = Math.max(...boundsPoints.map((point) => point[0]))
const minY = Math.min(...boundsPoints.map((point) => point[1]))
const maxY = Math.max(...boundsPoints.map((point) => point[1]))
const scale = (WIDTH - PADDING * 2) / (maxX - minX)
const HEIGHT = Math.round((maxY - minY) * scale + PADDING * 2)

const toScreen = ([x, y]) => [(x - minX) * scale + PADDING, (y - minY) * scale + PADDING]

const shapes = projected.map((shape) => ({
  id: shape.id,
  name: shape.name,
  target: shape.target,
  anchor: shape.anchor ? toScreen(shape.anchor) : null,
  d: shape.rings
    .map((polygon) =>
      polygon
        .map(
          (ring) =>
            `M${ring
              .map((point) => {
                const [x, y] = toScreen(point)
                return `${x.toFixed(1)} ${y.toFixed(1)}`
              })
              .join('L')}Z`,
        )
        .join(''),
    )
    .join(''),
}))

const centre = Object.fromEntries(
  shapes.filter((shape) => shape.target && shape.anchor).map((shape) => [shape.id, shape.anchor]),
)

const ROUTE_PAIRS = [
  ['IRN', 'TUR'],
  ['TUR', 'GEO'],
  ['GEO', 'ARM'],
  ['ARM', 'AZE'],
  ['AZE', 'IRN'],
  ['IRN', 'TKM'],
  ['TKM', 'UZB'],
  ['UZB', 'KAZ'],
  ['KAZ', 'RUS'],
  ['UZB', 'KGZ'],
  ['KGZ', 'TJK'],
  ['TJK', 'AFG'],
  ['AFG', 'PAK'],
  ['IRN', 'IRQ'],
  ['IRN', 'AFG'],
]

function arcPath(a, b, bend = 0.18) {
  const [x1, y1] = a
  const [x2, y2] = b
  const dx = x2 - x1
  const dy = y2 - y1
  const cx = (x1 + x2) / 2 - dy * bend
  const cy = (y1 + y2) / 2 + dx * bend
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`
}

const routes = ROUTE_PAIRS.filter(([from, to]) => centre[from] && centre[to]).map(
  ([from, to], index) => ({
    key: `${from}-${to}`,
    d: arcPath(centre[from], centre[to], index % 2 === 0 ? 0.16 : -0.14),
  }),
)

const mutedShapes = shapes.filter((shape) => !shape.target)
const targetShapes = shapes.filter((shape) => shape.target)

export default function EurasiaMap({ activeId, pinnedId, onHover, onSelect }) {
  const markers = useMemo(
    () => Object.entries(centre).map(([id, point]) => ({ id, point })),
    [],
  )

  return (
    <svg
      className="eurasia-map"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="group"
      aria-label="نقشه بازارهای هدف MR Store در اوراسیا"
    >
      <g className="eurasia-routes" aria-hidden="true">
        {routes.map((route) => (
          <path key={route.key} className="eurasia-route" d={route.d} />
        ))}
      </g>

      <g aria-hidden="true">
        {mutedShapes.map((shape) => (
          <path key={shape.id} className="eurasia-country is-muted" d={shape.d} />
        ))}
      </g>

      <g>
        {targetShapes.map((shape) => {
          const market = marketsById[shape.id]
          const isActive = activeId === shape.id
          const isPinned = pinnedId === shape.id
          return (
            <path
              key={shape.id}
              d={shape.d}
              className={`eurasia-country is-target ${isActive ? 'is-active' : ''} ${
                isPinned ? 'is-selected' : ''
              }`}
              role="button"
              tabIndex={0}
              aria-label={`${market?.nameFa ?? shape.name} — نمایش اطلاعات بازار`}
              aria-pressed={isPinned}
              onMouseEnter={() => onHover(shape.id)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(shape.id)}
              onBlur={() => onHover(null)}
              onClick={() => onSelect(shape.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  onSelect(shape.id)
                }
              }}
            />
          )
        })}
      </g>

      <g className="eurasia-markers" aria-hidden="true">
        {markers.map(({ id, point }) => (
          <circle
            key={id}
            cx={point[0]}
            cy={point[1]}
            r={activeId === id ? 3.6 : 2.4}
            className={`eurasia-marker ${activeId === id ? 'is-active' : ''}`}
          />
        ))}
      </g>
    </svg>
  )
}
