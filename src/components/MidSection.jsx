import { ArrowRight, Check, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { topCategories } from '../data/catalog'
import { useShop } from '../lib/store'

const featureCards = [
  {
    title: 'Natural Care for Healthy Beauty',
    text: 'Dermatologist-tested skincare, haircare and botanical beauty from certified European makers.',
    image:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80',
    to: '/products?category=cosmetics',
  },
  {
    title: 'Natural Pickles & Fermented Foods',
    text: 'Traditional recipes with shelf-stable packaging and retail-ready labelling for every market.',
    image:
      'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=1000&q=80',
    to: '/products?category=fmcg&q=Pickled',
  },
]

const reasons = [
  'Verified suppliers with audited facilities',
  'Secure transactions & trade assurance',
  'Global logistics from producer to door',
  'Dedicated support in your time zone',
]

export default function MidSection() {
  const { openQuote } = useShop()

  return (
    <section className="bg-mist py-14 lg:py-16">
      <div className="container-page grid gap-5 lg:grid-cols-12">
        <aside className="rounded-2xl border border-ink/8 bg-white p-5 lg:col-span-3">
          <h2 className="font-display text-xl text-forest">Top Categories</h2>
          <ul className="mt-3 divide-y divide-ink/6">
            {topCategories.map((item) => (
              <li key={item.label}>
                <Link
                  to={`/products?category=${item.slug}&q=${encodeURIComponent(item.label)}`}
                  className="group flex items-center justify-between gap-2 py-2.5"
                >
                  <span className="text-sm text-ink/75 transition group-hover:text-forest">
                    {item.label}
                  </span>
                  <span className="shrink-0 text-[10px] text-ink/40 transition group-hover:text-emerald-brand">
                    {item.count}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/products"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:text-emerald-brand"
          >
            All products <ArrowRight size={14} />
          </Link>
        </aside>

        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5">
          {featureCards.map((card) => (
            <Link
              key={card.title}
              to={card.to}
              className="group relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-2xl"
            >
              <img
                src={card.image}
                alt={card.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/92 via-forest-deep/35 to-transparent" />
              <div className="relative p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mint/85">
                  Featured collection
                </p>
                <h3 className="mt-2 font-display text-xl leading-snug text-white">{card.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/70">{card.text}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-[11px] font-semibold text-white backdrop-blur transition group-hover:bg-mint group-hover:text-forest">
                  View Products <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="space-y-5 lg:col-span-4">
          <div className="rounded-2xl border border-ink/8 bg-white p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-brand" />
              <h2 className="font-display text-lg text-forest">Why Choose MR Store?</h2>
            </div>
            <ul className="mt-4 space-y-3">
              {reasons.map((reason) => (
                <li key={reason} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mint text-forest">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="text-sm leading-relaxed text-ink/70">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-forest p-6 text-white shadow-soft">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mint/80">
              Sourcing support
            </p>
            <h3 className="mt-2 font-display text-xl">Looking for a Supplier?</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/65">
              Send your product list and volumes — we will shortlist verified manufacturers within
              one business day.
            </p>
            <button
              type="button"
              onClick={() => openQuote('general')}
              className="mt-5 w-full rounded-full bg-mint px-5 py-2.5 text-sm font-semibold text-forest transition hover:bg-white"
            >
              Request a Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
