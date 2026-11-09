import { BadgeCheck, MapPin, Star } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SectionHeading from '../components/SectionHeading'
import { suppliers } from '../data/catalog'
import { useShop } from '../lib/store'

export default function Suppliers() {
  const { openQuote } = useShop()

  return (
    <>
      <PageHeader
        eyebrow="Verified network"
        title="Suppliers & manufacturers"
        description="Every supplier on MR Store is trade-verified, certification-checked and referenced by at least two international buyers."
      />

      <section className="bg-mist py-12 lg:py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="Audited partners"
            title="Meet the producers behind the products"
            description="Filter by industry, country or minimum order quantity once you are signed in to a buyer account."
          />

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {suppliers.map((supplier) => (
              <article key={supplier.id} className="card-surface flex flex-col p-5">
                <div className="flex items-start gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-mint font-display text-lg font-semibold text-forest">
                    {supplier.name
                      .split(' ')
                      .map((word) => word[0])
                      .join('')
                      .slice(0, 2)}
                  </span>
                  <div className="min-w-0">
                    <h2 className="flex items-center gap-1.5 text-base font-semibold text-ink">
                      {supplier.name}
                      {supplier.verified && <BadgeCheck size={15} className="text-emerald-brand" />}
                    </h2>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-ink/55">
                      <MapPin size={12} /> {supplier.flag} {supplier.country} · {supplier.years} on MR Store
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-ink/60">{supplier.blurb}</p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {supplier.categories.map((category) => (
                    <span
                      key={category}
                      className="rounded-full bg-mist px-2.5 py-1 text-[11px] font-medium text-ink/65"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-ink/8 pt-3 text-xs text-ink/55">
                  <span className="flex items-center gap-1 font-medium text-forest">
                    <Star size={12} className="fill-forest" /> {supplier.rating}
                  </span>
                  <span>{supplier.products}</span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    openQuote({
                      id: supplier.id,
                      name: `${supplier.name} — supplier inquiry`,
                      supplier: supplier.name,
                      country: supplier.country,
                      moq: 'To be agreed',
                    })
                  }
                  className="mt-4 w-full rounded-full border border-forest/25 py-2 text-xs font-semibold text-forest transition hover:border-forest hover:bg-forest hover:text-white"
                >
                  Contact supplier
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
