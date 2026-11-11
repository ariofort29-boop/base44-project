import { Boxes, Heart, MessageSquareQuote, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PRICE_LABEL, WHOLESALE_LABEL } from '../data/catalog'
import { useShop } from '../lib/store'

export default function ProductCard({ product }) {
  const { isWished, toggleWishlist, openQuote } = useShop()
  const wished = isWished(product.id)

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line/10 bg-surface shadow-card transition duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-soft">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
        <img
          src={product.image}
          alt={product.nameFa}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-navy-deep/80 px-2.5 py-1 text-[10px] font-semibold text-gold-soft ring-1 ring-white/15 backdrop-blur">
          <Boxes size={11} />
          {WHOLESALE_LABEL}
        </span>

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={wished ? `حذف ${product.nameFa} از فهرست` : `افزودن ${product.nameFa} به فهرست`}
          aria-pressed={wished}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-emerald-soft shadow-sm backdrop-blur transition hover:bg-surface"
        >
          <Heart size={15} className={wished ? 'fill-emerald-brand' : ''} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-[15px] font-bold leading-relaxed text-ivory">
            <Link to={`/products?q=${encodeURIComponent(product.name)}`} className="transition hover:text-emerald-soft">
              {product.nameFa}
            </Link>
          </h3>
          <p className="mt-1 text-[11px] text-sage/45">{product.subcategoryFa}</p>
        </div>

        <p className="line-clamp-2 text-xs leading-[1.9] text-sage/60">{product.descFa}</p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] text-sage/55">
          <span className="inline-flex items-center gap-1 text-emerald-soft">
            <ShieldCheck size={12} />
            {product.supplier}
          </span>
          <span className="text-sage/30">·</span>
          <span>{product.countryFa}</span>
        </div>

        {product.moqFa && (
          <p className="inline-flex w-fit items-center gap-1.5 rounded-full bg-mint px-2.5 py-1 text-[11px] font-semibold text-botanical">
            حداقل سفارش: {product.moqFa}
          </p>
        )}

        <div className="mt-auto space-y-2.5 border-t border-line/8 pt-3">
          <p className="text-center text-[13px] font-bold text-ivory/70">{PRICE_LABEL}</p>
          <button
            type="button"
            onClick={() => openQuote(product)}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-brand py-2.5 text-xs font-bold text-white transition-all duration-300 hover:bg-botanical hover:shadow-lg hover:shadow-emerald-brand/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-brand"
          >
            <MessageSquareQuote size={14} />
            {PRICE_LABEL}
          </button>
        </div>
      </div>
    </article>
  )
}
