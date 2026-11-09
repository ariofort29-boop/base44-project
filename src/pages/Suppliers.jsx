import { useMemo, useState } from 'react'
import Icon from '../components/icons.jsx'
import PageHeader from '../components/layout/PageHeader.jsx'
import SupplierCard from '../components/marketplace/SupplierCard.jsx'
import Button from '../components/ui/Button.jsx'
import { SUPPLIERS } from '../data/catalog.js'

const stats = [
  { value: '12,400+', label: 'Verified suppliers' },
  { value: '140+', label: 'Countries served' },
  { value: '48h', label: 'Average first quote' },
  { value: '4.9/5', label: 'Buyer satisfaction' },
]

export default function Suppliers() {
  const [q, setQ] = useState('')
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [sort, setSort] = useState('rating')

  const results = useMemo(() => {
    const query = q.trim().toLowerCase()
    let list = SUPPLIERS.filter((s) => {
      const haystack = `${s.name} ${s.country} ${s.city} ${s.specialties.join(' ')}`.toLowerCase()
      return (!query || haystack.includes(query)) && (!verifiedOnly || s.verified)
    })
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
    if (sort === 'since') list = [...list].sort((a, b) => a.since - b.since)
    if (sort === 'products') list = [...list].sort((a, b) => b.products - a.products)
    return list
  }, [q, verifiedOnly, sort])

  return (
    <>
      <PageHeader
        eyebrow="Supplier directory"
        title="Manufacturers and exporters, audited before they list"
        text="Every supplier profile documents factory capability, certifications and trade history — so you can shortlist with evidence, not promises."
        crumbs={['Suppliers']}
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-brand-900/10 bg-white/80 px-4 py-3 backdrop-blur">
              <p className="font-display text-[19px] font-semibold text-brand-900">{s.value}</p>
              <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </PageHeader>

      <section className="bg-white py-10 lg:py-12">
        <div className="shell">
          <div className="flex flex-col gap-3 border-b border-line pb-6 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-2 rounded-full border border-line px-4 py-2.5">
              <Icon name="search" className="h-4 w-4 text-muted" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search suppliers by name, country or specialty"
                aria-label="Search suppliers"
                className="min-w-0 flex-1 bg-transparent text-sm focus:outline-none"
              />
            </div>
            <label className="flex cursor-pointer items-center gap-2 rounded-full border border-line px-4 py-2.5 text-[12.5px] font-semibold text-ink">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="h-3.5 w-3.5 accent-brand-700"
              />
              Verified only
            </label>
            <label htmlFor="supplier-sort" className="sr-only">Sort suppliers</label>
            <select
              id="supplier-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-full border border-line bg-white px-4 py-2.5 text-[12.5px] font-semibold text-ink focus:outline-none"
            >
              <option value="rating">Top rated</option>
              <option value="since">Longest established</option>
              <option value="products">Largest catalogue</option>
            </select>
          </div>

          <p className="mt-5 text-[13px] font-semibold text-muted">
            <span className="font-extrabold text-ink">{results.length}</span> suppliers
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((s) => (
              <SupplierCard key={s.id} supplier={s} />
            ))}
          </div>

          <div className="mt-10 grid gap-5 rounded-xl3 border border-line bg-mist p-6 sm:p-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow">Verification process</p>
              <h2 className="mt-2 text-[1.35rem] leading-tight">What “verified” means at MR Store</h2>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {[
                  'Business licence & export registration',
                  'Factory audit or video walkthrough',
                  'Product certificates and lab reports',
                  'Trade references from existing buyers',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[13px] font-medium text-ink/80">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2.5 rounded-2xl bg-white p-5 shadow-card">
              <p className="text-[13.5px] font-semibold text-ink">Are you a manufacturer?</p>
              <p className="text-[12.5px] leading-relaxed text-muted">
                Apply for verification and reach qualified international buyers.
              </p>
              <Button to="/partnership" className="mt-1" icon="arrowRight">
                Become a supplier
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
