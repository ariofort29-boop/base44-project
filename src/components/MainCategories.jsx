import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories } from '../data/catalog'
import SectionHeading from './SectionHeading'

export default function MainCategories() {
  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="صنایع محصول"
          title="سه صنعت، یک بازار عمده‌فروشی معتبر"
          description="تولیدکنندگان و عمده‌فروشان هر سه صنعت اصلی از نظر گواهی‌ها، ظرفیت تولید و آمادگی صادرات بررسی شده‌اند."
          action={
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-brand transition hover:text-botanical"
            >
              مشاهده همه محصولات <ArrowRight size={15} />
            </Link>
          }
        />

        <div className="mt-9 grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <article
              key={category.slug}
              className="group flex flex-col overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-card transition duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-soft"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.titleFa}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                  <h3 className="text-base font-bold leading-relaxed text-white">{category.titleFa}</h3>
                  <span className="shrink-0 rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur">
                    {category.items.length}+
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <p className="text-[13px] leading-[1.95] text-ink/60">{category.blurbFa}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {category.items.slice(0, 7).map((item, index) => (
                    <li key={item}>
                      <Link
                        to={`/products?category=${category.slug}&q=${encodeURIComponent(item)}`}
                        className="inline-block rounded-full bg-mist px-2.5 py-1 text-[11px] font-medium text-ink/60 transition hover:bg-mint hover:text-emerald-brand"
                      >
                        {category.itemsFa[index] ?? item}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/products?category=${category.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-brand transition-all group-hover:gap-3"
                >
                  مشاهده {category.shortFa} <ArrowRight size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
