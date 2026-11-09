import { PackageSearch, Search, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import ProductCard from '../components/ProductCard'
import { categories, products } from '../data/catalog'
import { useShop } from '../lib/store'

const categoryTitle = (slug) => categories.find((item) => item.slug === slug)?.titleFa ?? ''

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
      return [
        product.name,
        product.nameFa,
        product.subcategory,
        product.subcategoryFa,
        product.descFa,
        product.supplier,
        product.country,
        product.countryFa,
        categoryTitle(product.category),
      ]
        .join(' ')
        .toLowerCase()
        .includes(term)
    })

    if (sort === 'rating') return [...list].sort((a, b) => b.rating - a.rating)
    if (sort === 'name') return [...list].sort((a, b) => a.nameFa.localeCompare(b.nameFa, 'fa'))
    return list
  }, [q, category, sort, isWishlist, wishlist])

  const activeCategory = categories.find((item) => item.slug === category)

  return (
    <>
      <PageHeader
        eyebrow={isWishlist ? 'فهرست ذخیره‌شده' : 'کاتالوگ عمده‌فروشی'}
        title={
          isWishlist
            ? 'فهرست محصولات شما'
            : activeCategory
              ? activeCategory.titleFa
              : 'محصولات عمده'
        }
        description={
          isWishlist
            ? 'محصولاتی که هنگام بررسی ذخیره کرده‌اید. برای هر قلم می‌توانید استعلام قیمت عمده ثبت کنید.'
            : activeCategory
              ? activeCategory.blurbFa
              : 'محصولات آماده صادرات از تولیدکنندگان تأییدشده در سه صنعت آرایشی و بهداشتی، کالاهای مصرفی و ارگانیک.'
        }
      />

      <section className="bg-mist py-8 lg:py-10">
        <div className="container-page">
          <div className="flex flex-col gap-4 rounded-2xl border border-navy/10 bg-white p-4 lg:flex-row lg:items-center">
            <form
              onSubmit={(event) => {
                event.preventDefault()
                updateParam('q', draft.trim())
              }}
              className="flex flex-1 items-center gap-2 rounded-full border border-navy/12 bg-mist px-3 py-1.5 focus-within:border-emerald-brand focus-within:bg-white"
            >
              <Search size={16} className="text-ink/40" />
              <label className="sr-only" htmlFor="catalogue-search">
                جستجو در کاتالوگ
              </label>
              <input
                id="catalogue-search"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="جستجو بر اساس محصول، تأمین‌کننده یا کشور"
                className="min-w-0 flex-1 bg-transparent py-1.5 text-[13px] focus:outline-none"
              />
              {draft && (
                <button
                  type="button"
                  aria-label="پاک کردن جستجو"
                  onClick={() => {
                    setDraft('')
                    updateParam('q', '')
                  }}
                  className="grid h-6 w-6 place-items-center rounded-full text-ink/40 hover:bg-white hover:text-emerald-brand"
                >
                  <X size={13} />
                </button>
              )}
              <button
                type="submit"
                className="rounded-full bg-emerald-brand px-4 py-1.5 text-[11px] font-semibold text-white"
              >
                جستجو
              </button>
            </form>

            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-[11px] text-ink/50">
                ترتیب
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="rounded-full border border-navy/12 bg-white px-3 py-2 text-[11px] font-medium text-ink focus:border-emerald-brand focus:outline-none"
              >
                <option value="featured">پیشنهاد ویژه</option>
                <option value="rating">بیشترین امتیاز</option>
                <option value="name">نام (الفبا)</option>
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
              className={`rounded-full px-4 py-1.5 text-[11px] font-semibold transition ${
                category === 'all' && !isWishlist
                  ? 'bg-navy text-white'
                  : 'border border-navy/12 bg-white text-ink/65 hover:border-emerald-brand hover:text-emerald-brand'
              }`}
            >
              همه محصولات
            </button>
            {categories.map((item) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => updateParam('category', item.slug)}
                className={`rounded-full px-4 py-1.5 text-[11px] font-semibold transition ${
                  category === item.slug
                    ? 'bg-navy text-white'
                    : 'border border-navy/12 bg-white text-ink/65 hover:border-emerald-brand hover:text-emerald-brand'
                }`}
              >
                {item.shortFa}
              </button>
            ))}
            {isWishlist && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-mint px-3 py-1.5 text-[11px] font-semibold text-emerald-brand">
                فقط ذخیره‌شده‌ها
                <button
                  type="button"
                  onClick={() => updateParam('view', '')}
                  aria-label="خروج از فهرست ذخیره‌شده"
                >
                  <X size={12} />
                </button>
              </span>
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
            <p className="text-[11px] text-ink/50">
              {results.length.toLocaleString('fa-IR')} محصول
              {q && (
                <>
                  {' '}برای «<span className="font-semibold text-emerald-brand">{q}</span>»
                </>
              )}
            </p>
            <p className="rounded-full bg-white px-3 py-1 text-[10px] text-ink/50 ring-1 ring-navy/8">
              قیمت تمام اقلام استعلامی است — «تماس با ما»
            </p>
          </div>

          {results.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-navy/15 bg-white p-12 text-center">
              <PackageSearch size={36} className="mx-auto text-emerald-brand/40" />
              <h2 className="mt-4 text-lg font-bold text-navy">محصولی با این فیلترها پیدا نشد</h2>
              <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-ink/55">
                {isWishlist
                  ? 'با آیکن قلب، محصولات موردنظر را برای سفارش بعدی ذخیره کنید.'
                  : 'عبارت جستجو را کوتاه‌تر کنید یا هر سه صنعت را مرور کنید.'}
              </p>
              <button type="button" onClick={clearFilters} className="btn-primary mt-5">
                نمایش همه محصولات
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
