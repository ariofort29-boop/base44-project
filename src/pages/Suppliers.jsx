import { BadgeCheck, MapPin, Star } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SectionHeading from '../components/SectionHeading'
import { PRICE_LABEL, suppliers } from '../data/catalog'
import { useShop } from '../lib/store'

export default function Suppliers() {
  const { openQuote } = useShop()

  return (
    <>
      <PageHeader
        eyebrow="شبکه تأییدشده"
        title="تأمین‌کنندگان و تولیدکنندگان"
        description="هر تأمین‌کننده در MR Store از نظر سابقه تجاری و گواهی‌ها بررسی شده و حداقل دو خریدار بین‌المللی او را تأیید کرده‌اند."
      />

      <section className="bg-mist py-12 lg:py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="شرکای بازرسی‌شده"
            title="تولیدکنندگانی که پشت محصولات هستند"
            description="تمام همکاری‌ها بر پایه حداقل سفارش شفاف، اسناد کامل و ظرفیت صادرات واقعی شکل می‌گیرد."
          />

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {suppliers.map((supplier) => (
              <article key={supplier.id} className="card-surface flex flex-col p-5">
                <div className="flex items-start gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-mint font-display text-base font-semibold text-emerald-brand">
                    {supplier.name
                      .split(' ')
                      .map((word) => word[0])
                      .join('')
                      .slice(0, 2)}
                  </span>
                  <div className="min-w-0">
                    <h2 className="flex items-center gap-1.5 text-[15px] font-bold text-navy">
                      {supplier.name}
                      {supplier.verified && <BadgeCheck size={15} className="text-emerald-brand" />}
                    </h2>
                    <p className="mt-1 flex items-center gap-1 text-[11px] text-ink/55">
                      <MapPin size={12} /> {supplier.countryFa} · {supplier.yearsFa} همکاری با MR Store
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-[13px] leading-[1.95] text-ink/60">{supplier.blurbFa}</p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {supplier.categoriesFa.map((category) => (
                    <span
                      key={category}
                      className="rounded-full bg-mist px-2.5 py-1 text-[11px] font-medium text-ink/60"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-navy/8 pt-3 text-[11px] text-ink/55">
                  <span className="flex items-center gap-1 font-medium text-emerald-brand">
                    <Star size={12} className="fill-emerald-brand" /> {supplier.rating}
                  </span>
                  <span>{supplier.productsFa}</span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    openQuote({
                      id: supplier.id,
                      name: `${supplier.name} — supplier inquiry`,
                      nameFa: `استعلام از ${supplier.name}`,
                      supplier: supplier.name,
                      country: supplier.country,
                      countryFa: supplier.countryFa,
                      moqFa: 'توافقی',
                    })
                  }
                  className="mt-4 w-full rounded-full bg-emerald-brand py-2.5 text-xs font-bold text-white transition hover:bg-botanical"
                >
                  {PRICE_LABEL}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
