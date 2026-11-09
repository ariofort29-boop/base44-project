import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Icon from '../components/icons.jsx'
import PageHeader from '../components/layout/PageHeader.jsx'
import ProductCard from '../components/marketplace/ProductCard.jsx'
import Button from '../components/ui/Button.jsx'
import { PRODUCTS, CATEGORIES } from '../data/catalog.js'

const moqBuckets = [
  { id: 'any', label: 'Any quantity' },
  { id: 'low', label: 'Under 500 units', test: (n) => n < 500 },
  { id: 'mid', label: '500 – 1,000 units', test: (n) => n >= 500 && n <= 1000 },
  { id: 'high', label: 'Over 1,000 units', test: (n) => n > 1000 },
]

const countries = ['All countries', ...new Set(PRODUCTS.map((p) => p.country))]

const parseQty = (moq) => Number(moq.replace(/[^\d]/g, ''))
const parsePrice = (price) => Number(price.replace(/[^\d.]/g, '').slice(0, 6)) || 0

export default function Products() {
  const [params, setParams] = useSearchParams()
  const category = params.get('category') || 'all'
  const initialQ = params.get('q') || ''
  const [q, setQ] = useState(initialQ)
  const [moq, setMoq] = useState('any')
  const [country, setCountry] = useState('All countries')
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [sort, setSort] = useState('relevance')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    setQ(params.get('q') || '')
  }, [params])

  const updateParam = (key, value) => {
    const next = new URLSearchParams(params)
    if (!value || value === 'all') next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  const results = useMemo(() => {
    const bucket = moqBuckets.find((b) => b.id === moq)
    let list = PRODUCTS.filter((p) => {
      const matchesCategory = category === 'all' || p.category === category
      const haystack = `${p.name} ${p.subcategory} ${p.supplier} ${p.country} ${p.category}`.toLowerCase()
      const matchesQuery = !q.trim() || haystack.includes(q.trim().toLowerCase())
      const matchesMoq = !bucket?.test || bucket.test(parseQty(p.moq))
      const matchesCountry = country === 'All countries' || p.country === country
      const matchesVerified = !verifiedOnly || p.verified
      return matchesCategory && matchesQuery && matchesMoq && matchesCountry && matchesVerified
    })
    if (sort === 'price-asc') list = [...list].sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
    if (sort === 'moq-asc') list = [...list].sort((a, b) => parseQty(a.moq) - parseQty(b.moq))
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [category, q, moq, country, verifiedOnly, sort])

  const activeFilters =
    (category !== 'all' ? 1 : 0) + (moq !== 'any' ? 1 : 0) + (country !== 'All countries' ? 1 : 0) + (verifiedOnly ? 1 : 0)

  const reset = () => {
    setMoq('any')
    setCountry('All countries')
    setVerifiedOnly(false)
    setSort('relevance')
    setQ('')
    setParams(new URLSearchParams(), { replace: true })
  }

  const FilterPanel = (
    <div className="space-y-7">
      <div>
        <h3 className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-ink">Category</h3>
        <ul className="mt-3 space-y-1">
          <li>
            <button
              type="button"
              onClick={() => updateParam('category', 'all')}
              className={`w-full rounded-lg px-2.5 py-2 text-left text-[13px] font-semibold transition ${
                category === 'all' ? 'bg-brand-50 text-brand-900' : 'text-muted hover:bg-mist'
              }`}
            >
              All categories
              <span className="float-right text-[11px] font-bold text-muted">{PRODUCTS.length}</span>
            </button>
          </li>
          {CATEGORIES.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => updateParam('category', c.id)}
                className={`w-full rounded-lg px-2.5 py-2 text-left text-[13px] font-semibold transition ${
                  category === c.id ? 'bg-brand-50 text-brand-900' : 'text-muted hover:bg-mist'
                }`}
              >
                {c.short}
                <span className="float-right text-[11px] font-bold text-muted">
                  {PRODUCTS.filter((p) => p.category === c.id).length}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-ink">Minimum order</h3>
        <div className="mt-3 space-y-1.5">
          {moqBuckets.map((b) => (
            <label key={b.id} className="flex cursor-pointer items-center gap-2.5 text-[13px] font-medium text-muted">
              <input
                type="radio"
                name="moq"
                checked={moq === b.id}
                onChange={() => setMoq(b.id)}
                className="h-3.5 w-3.5 accent-brand-700"
              />
              {b.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="country" className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-ink">
          Origin
        </label>
        <select
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="field mt-2 text-[13px]"
        >
          {countries.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <label className="flex cursor-pointer items-center gap-2.5 rounded-xl bg-mist px-3 py-2.5 text-[13px] font-semibold text-ink">
        <input
          type="checkbox"
          checked={verifiedOnly}
          onChange={(e) => setVerifiedOnly(e.target.checked)}
          className="h-4 w-4 rounded accent-brand-700"
        />
        Verified suppliers only
      </label>

      <button
        type="button"
        onClick={reset}
        className="text-[12.5px] font-bold text-brand-800 underline-offset-4 hover:underline"
      >
        Clear all filters
      </button>
    </div>
  )

  return (
    <>
      <PageHeader
        eyebrow="Wholesale catalogue"
        title="Cosmetics, FMCG and organic products ready for export"
        text="Filter by category, origin and order quantity, then request comparable quotations from verified manufacturers."
        crumbs={['Products']}
      />

      <section className="bg-white py-10 lg:py-12">
        <div className="shell">
          <div className="flex flex-col gap-4 border-b border-line pb-6 lg:flex-row lg:items-center">
            <div className="flex flex-1 items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5">
              <Icon name="search" className="h-4 w-4 text-muted" />
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value)
                  updateParam('q', e.target.value)
                }}
                placeholder="Search within results — product, supplier or origin"
                aria-label="Search products"
                className="min-w-0 flex-1 bg-transparent text-sm focus:outline-none"
              />
              {q && (
                <button type="button" onClick={() => { setQ(''); updateParam('q', '') }} aria-label="Clear search">
                  <Icon name="close" className="h-4 w-4 text-muted hover:text-ink" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowFilters((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-[12.5px] font-bold text-ink lg:hidden"
              >
                <Icon name="filter" className="h-4 w-4" />
                Filters {activeFilters > 0 && `(${activeFilters})`}
              </button>
              <label htmlFor="sort" className="sr-only">Sort by</label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-full border border-line bg-white px-4 py-2.5 text-[12.5px] font-semibold text-ink focus:outline-none"
              >
                <option value="relevance">Sort: Recommended</option>
                <option value="price-asc">Price: low to high</option>
                <option value="moq-asc">Lowest MOQ</option>
                <option value="name">Name: A–Z</option>
              </select>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[248px_1fr] lg:gap-10">
            <aside className="hidden lg:block">
              <div className="sticky top-44">{FilterPanel}</div>
            </aside>

            {showFilters && (
              <div className="rounded-2xl border border-line bg-white p-5 shadow-card lg:hidden">{FilterPanel}</div>
            )}

            <div>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
                <p className="text-[13px] font-semibold text-muted">
                  <span className="font-extrabold text-ink">{results.length}</span> products
                  {q && <> for “{q}”</>}
                </p>
                {activeFilters > 0 && (
                  <p className="text-[12px] font-semibold text-brand-800">{activeFilters} filter(s) active</p>
                )}
              </div>

              {results.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-line bg-mist p-12 text-center">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white text-brand-700 shadow-sm">
                    <Icon name="search" className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg">No products match those filters</h3>
                  <p className="mx-auto mt-2 max-w-sm text-[13.5px] text-muted">
                    Try a broader search, or send us the specification and we will source it for you.
                  </p>
                  <div className="mt-5 flex justify-center gap-3">
                    <Button onClick={reset} variant="secondary" size="sm">Clear filters</Button>
                    <Button to="/wholesale" size="sm">Request sourcing</Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:gap-5 xl:grid-cols-3">
                  {results.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}

              <div className="mt-10 flex flex-col items-center gap-3 rounded-xl2 bg-brand-50 px-6 py-8 text-center">
                <h3 className="text-lg">Can’t find your specification?</h3>
                <p className="max-w-md text-[13.5px] text-muted">
                  Send us your formulation, packaging or private-label brief and our trade desk will match
                  it with audited factories.
                </p>
                <Button to="/wholesale" icon="arrowRight" className="mt-1">
                  Submit a sourcing request
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
