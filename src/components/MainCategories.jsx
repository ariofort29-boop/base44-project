import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories } from '../data/catalog'
import SectionHeading from './SectionHeading'

export default function MainCategories() {
  return (
    <section className="bg-white py-14 lg:py-16">
      <div className="container-page">
        <SectionHeading
          eyebrow="Product industries"
          title="Three industries, one trusted marketplace"
          description="Manufacturers and wholesalers across our three core industries are audited for certifications, capacity and export readiness."
          action={
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:text-emerald-brand"
            >
              Browse all products <ArrowRight size={15} />
            </Link>
          }
        />

        <div className="mt-9 grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <article
              key={category.slug}
              className="group flex flex-col overflow-hidden rounded-3xl border border-ink/8 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-forest-deep/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                  <h3 className="max-w-[85%] font-display text-lg leading-snug text-white">
                    {category.title}
                  </h3>
                  <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur">
                    {category.items.length}+
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <p className="text-sm leading-relaxed text-ink/60">{category.blurb}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {category.items.slice(0, 7).map((item) => (
                    <li key={item}>
                      <Link
                        to={`/products?category=${category.slug}&q=${encodeURIComponent(item)}`}
                        className="inline-block rounded-full bg-mist px-2.5 py-1 text-[11px] font-medium text-ink/65 transition hover:bg-mint hover:text-forest"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/products?category=${category.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest transition group-hover:gap-2.5"
                >
                  Explore {category.short} <ArrowRight size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
