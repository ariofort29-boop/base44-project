import { PackageSearch, Search, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import ProductCard from '../components/ProductCard'
import { categories, products } from '../data/catalog'
import { useShop } from '../lib/store'

const categoryTitle = (slug) => categories.find((item) => item.slug === slug)?.title ?? ''

export default function Products() {
  const [params, setParams] = useSearchParams()
  const { wishlist } = useShop()
  const q = params.get('q') ?? ''
  const category = params.get('category') ?? 'all'
  const isWishlist = params.get('view') === 'wishlist'
  const [sort, setSort] = useState('featured')
  const [draft, setDraft] = useState(q)

  useEffect(() => {
    setDraft(q)
  }, [q])

  const updateParam = (key, value) => {
    const next = new URLSearchParams(params)
    if (value && value !== 'all') next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const clearFilters = () => setParams(new URLSearchParams(), { replace: true })

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    const list = products.filter((product) => {
      if (category !== 'all' && product.category !== category) return false
      if (isWishlist && !wishlist.includes(product.id)) return false
      if (!term) return true
      return [product.name, product.subcategory, product.supplier, product.country, categoryTitle(product.category)]
        .join(' ')
        .toLowerCase()
        .includes(term)
    })

    if (sort === 'rating') return [...list].sort((a, b) => b.rating - a.rating)
    if (sort === 'name') return [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [q, category, sort, isWishlist, wishlist])

  const activeCategory = categories.find((item) => item.slug === category)

  return (
    <>
      <PageHeader
        eyebrow={isWishlist ? 'Saved for later' : 'Product catalogue'}
        title={isWishlist ? 'Your wishlist' : activeCategory ? activeCategory.title : 'Wholesale products'}
        description={
          isWishlist
            ? 'Products you saved while browsing. Request a quote on any item to start a conversation with the supplier.'
            : activeCategory
              ? activeCategory.blurb
              : 'Explore export-ready products from verified manufacturers across cosmetics, FMCG and organic categories.'
        }
      />

      <section className="bg-mist py-8">
        <div className="container-page">
          <div className="flex flex-col gap-4 rounded-2xl border border-ink/8 bg-white p-4 lg:flex-row lg:items-center">
            <form
              onSubmit={(event) => {
                event.preventDefault()
                updateParam('q', draft.trim())
              }}
              className="flex flex-1 items-center gap-2 rounded-full border border-ink/12 bg-mist px-3 py-1.5 focus-within:border-forest focus-within:bg-white"
            >
              <Search size={16} className="text-ink/45" />
              <label className="sr-only" htmlFor="catalogue-search">
                Search the catalogue
              </label>
              <input
                id="catalogue-search"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Search by product, supplier, country or brand"
                className="min-w-0 flex-1 bg-transparent py-1.5 text-sm focus:outline-none"
              />
              {draft && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => {
                    setDraft('')
                    updateParam('q', '')
                  }}
                  className="grid h-6 w-6 place-items-center rounded-full text-ink/40 hover:bg-white hover:text-forest"
                >
                  <X size={13} />
                </button>
              )}
              <button type="submit" className="rounded-full bg-forest px-4 py-1.5 text-xs font-semibold text-white">
                Search
              </button>
            </form>

            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-xs text-ink/50">
                Sort
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="rounded-full border border-ink/12 bg-white px-3 py-2 text-xs font-medium text-ink focus:border-forest focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="rating">Top rated</option>
                <option value="name">Name A–Z</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const next = new URLSearchParams(params)
                next.delete('category')
                next.delete('view')
                setParams(next, { replace: true })
              }}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                category === 'all' && !isWishlist
                  ? 'bg-forest text-white'
                  : 'border border-ink/12 bg-white text-ink/70 hover:border-forest hover:text-forest'
              }`}
            >
              All products
            </button>
            {categories.map((item) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => updateParam('category', item.slug)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  category === item.slug
                    ? 'bg-forest text-white'
                    : 'border border-ink/12 bg-white text-ink/70 hover:border-forest hover:text-forest'
                }`}
              >
                {item.short}
              </button>
            ))}
            {isWishlist && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-mint px-3 py-1.5 text-xs font-semibold text-forest">
                Wishlist only
                <button type="button" onClick={() => updateParam('view', '')} aria-label="Leave wishlist view">
                  <X size={12} />
                </button>
              </span>
            )}
          </div>

          <p className="mt-5 text-xs text-ink/50">
            {results.length} {results.length === 1 ? 'product' : 'products'}
            {q && (
              <>
                {' '}
                for “<span className="font-semibold text-forest">{q}</span>”
              </>
            )}
          </p>

          {results.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-ink/15 bg-white p-12 text-center">
              <PackageSearch size={36} className="mx-auto text-forest/40" />
              <h2 className="mt-4 font-display text-xl text-forest">No products match these filters</h2>
              <p className="mx-auto mt-2 max-w-sm text-sm text-ink/55">
                {isWishlist
                  ? 'Save products with the heart icon to build a shortlist for your next order.'
                  : 'Try a broader search term or browse all three industries.'}
              </p>
              <button type="button" onClick={clearFilters} className="btn-primary mt-5">
                Show all products
              </button>
            </div>
          ) : (
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
