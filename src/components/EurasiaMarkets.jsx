import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, Compass, Globe2, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { marketCountries, marketsById } from '../data/markets'
import BotanicalFrame from './BotanicalFrame'
import EurasiaMap from './EurasiaMap'
import SectionHeading from './SectionHeading'

const flagUrl = (iso2) => `https://flagcdn.com/w80/${iso2}.png`

function useReveal() {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { rootMargin: '-8% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return [ref, shown]
}

function VineDivider() {
  return (
    <svg
      className="mt-5 h-6 w-44 text-emerald-soft/70"
      viewBox="0 0 176 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 13C34 5 62 20 90 12S146 4 174 12"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {[22, 58, 96, 132, 166].map((x, index) => (
        <path
          key={x}
          d="M0 0C2.2-2.6 2.6-6.4 0-9.8C-2.6-6.4-2.2-2.6 0 0Z"
          fill="currentColor"
          opacity={0.55 + (index % 2) * 0.25}
          transform={`translate(${x} ${index % 2 === 0 ? 11 : 14}) rotate(${index % 2 === 0 ? -28 : 152})`}
        />
      ))}
    </svg>
  )
}

function MarketDetails({ market, pinned }) {
  if (!market) {
    return (
      <div className="relative flex h-full min-h-[280px] flex-col items-center justify-center gap-3 rounded-3xl border border-line/15 bg-surface p-6 text-center">
        <BotanicalFrame seed="market-placeholder" radius={24} density={18} />
        <span className="grid h-11 w-11 place-items-center rounded-full border border-emerald-soft/30 bg-mint text-emerald-soft">
          <Globe2 size={20} />
        </span>
        <p className="text-sm font-semibold text-ivory">یک بازار را انتخاب کنید</p>
        <p className="max-w-[32ch] text-[12px] leading-[1.95] text-sage/55">
          نشانگر را روی کشورهای سبز نقشه ببرید یا از فهرست پایین انتخاب کنید تا اطلاعات بازار نمایش
          داده شود.
        </p>
      </div>
    )
  }

  return (
    <div className="relative h-full overflow-hidden rounded-3xl border border-line/15 bg-surface p-5">
      <BotanicalFrame seed={`market-${market.id}`} radius={24} density={18} />
      <div className="relative">
        <div className="flex items-start gap-3">
          <img
            src={flagUrl(market.iso2)}
            alt={`پرچم ${market.nameFa}`}
            loading="lazy"
            className="h-9 w-12 shrink-0 rounded-md object-cover ring-1 ring-white/25"
            onError={(event) => {
              event.currentTarget.style.visibility = 'hidden'
            }}
          />
          <div className="min-w-0">
            <h3 className="font-display text-lg font-semibold leading-tight text-ivory">
              {market.name}
            </h3>
            <p className="mt-1 text-[12px] text-sage/60">
              {market.nameFa} · {market.regionFa}
            </p>
          </div>
          <span className="ms-auto shrink-0 rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-ivory/70">
            {pinned ? 'انتخاب‌شده' : 'پیش‌نمایش'}
          </span>
        </div>

        <p className="mt-4 text-[13px] leading-[1.95] text-sage/70">{market.introFa}</p>

        <dl className="mt-4 space-y-3 border-t border-line/15 pt-4">
          <div>
            <dt className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-soft">
              <Compass size={12} />
              جایگاه در شبکه بازارها
            </dt>
            <dd className="mt-1 text-[12px] leading-[1.9] text-sage/60">{market.roleFa}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-[11px] font-semibold text-gold-soft">
              <MapPin size={12} />
              اطلاعات تجاری
            </dt>
            <dd className="mt-1 rounded-xl border border-dashed border-line/40 bg-surface-2/60 px-3 py-2 text-[11.5px] leading-[1.9] text-sage/55">
              {market.businessFa ??
                'اطلاعات تجاری این بازار هنوز ثبت نشده است؛ این بخش برای تکمیل توسط تیم بازرگانی MR Store آماده است.'}
            </dd>
          </div>
        </dl>

        <Link
          to="/contact"
          className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-emerald-soft transition hover:text-botanical"
        >
          استعلام برای این بازار <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  )
}

export default function EurasiaMarkets() {
  const [hovered, setHovered] = useState(null)
  const [pinned, setPinned] = useState('IRN')
  const [sectionRef, shown] = useReveal()

  const activeId = hovered ?? pinned
  const activeMarket = activeId ? marketsById[activeId] : null

  const select = (id) => setPinned((current) => (current === id ? null : id))

  const chips = useMemo(() => marketCountries, [])

  return (
    <section
      id="eurasia-markets"
      ref={sectionRef}
      className="relative overflow-hidden bg-surface-2 py-14 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-16 h-72 w-72 rounded-full bg-emerald-brand/12 blur-[130px]" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-botanical/15 blur-[140px]" />
      </div>

      <div className="container-page relative">
        <div
          className={`transition-all duration-700 ease-out ${
            shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <SectionHeading
            eyebrow="بازارهای هدف · TARGET MARKETS"
            title={
              <span className="font-display tracking-tight">Our Markets Across Eurasia</span>
            }
            description="Connecting markets, building partnerships, and creating opportunities across the Eurasian region."
          />
          <p
            lang="fa"
            className="mt-3 max-w-2xl text-sm leading-[1.95] text-sage/60"
          >
            بازارهای هدف ما در سراسر اوراسیا؛ اتصال بازارها، ساخت شراکت‌های بلندمدت و آفرینش فرصت
            برای واردکنندگان و توزیع‌کنندگان منطقه.
          </p>
          <VineDivider />
        </div>

        <div
          className={`mt-8 grid gap-5 transition-all delay-100 duration-700 ease-out lg:grid-cols-[1.65fr_1fr] lg:items-stretch ${
            shown ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
          }`}
        >
          <div className="relative rounded-3xl border border-line/15 bg-navy-deep/55 p-2 shadow-card sm:p-3">
            <BotanicalFrame seed="eurasia-map-panel" radius={26} density={34} inset={4} />
            <div className="relative overflow-hidden rounded-[1.4rem] border border-white/5 bg-[#08190f]">
              <EurasiaMap
                activeId={activeId}
                pinnedId={pinned}
                onHover={setHovered}
                onSelect={select}
              />
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/8 px-4 py-3 text-[10.5px] text-sage/55">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-emerald-brand ring-1 ring-emerald-soft/70" />
                  بازار هدف
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-[#0e2a1e] ring-1 ring-[#1c4030]" />
                  بازارهای همسایه
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-px w-5 border-t border-dashed border-emerald-soft/70" />
                  مسیرهای شبکه تجاری
                </span>
              </div>
            </div>
          </div>

          <MarketDetails market={activeMarket} pinned={Boolean(pinned && activeId === pinned)} />
        </div>

        <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {chips.map((country) => {
            const isPinned = pinned === country.id
            const isHovered = hovered === country.id
            return (
              <li key={country.id}>
                <button
                  type="button"
                  onClick={() => select(country.id)}
                  onMouseEnter={() => setHovered(country.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(country.id)}
                  onBlur={() => setHovered(null)}
                  aria-pressed={isPinned}
                  className={`flex w-full items-center gap-2 rounded-xl border px-2.5 py-2 text-start transition duration-300 ${
                    isPinned
                      ? 'border-emerald-soft/60 bg-mint text-ivory'
                      : 'border-line/15 bg-surface text-ivory hover:border-emerald-soft/40'
                  } ${isHovered && !isPinned ? 'border-emerald-soft/40' : ''}`}
                >
                  <img
                    src={flagUrl(country.iso2)}
                    alt=""
                    loading="lazy"
                    className="h-4 w-6 shrink-0 rounded-[3px] object-cover ring-1 ring-white/20"
                    onError={(event) => {
                      event.currentTarget.style.visibility = 'hidden'
                    }}
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-[11px] font-semibold leading-tight">
                      {country.name}
                    </span>
                    <span lang="fa" className="block truncate text-[10px] leading-tight text-sage/50">
                      {country.nameFa}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        <p className="mt-4 text-[11px] text-sage/40">
          این فهرست قابل گسترش است؛ بازارهای همسایه جدید می‌توانند به همین شبکه اضافه شوند.
        </p>
      </div>
    </section>
  )
}
