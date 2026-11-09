import { Heart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useShop } from '../lib/store'

export default function ProductCard({ product }) {
  const { isWished, toggleWishlist, openQuote } = useShop()
  const wished = isWished(product.id)

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-forest px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
          B2B
        </span>
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          aria-pressed={wished}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-forest shadow-sm backdrop-blur transition hover:bg-white"
        >
          <Heart size={16} className={wished ? 'fill-forest' : ''} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-sm font-semibold leading-snug text-ink">
            <Link to={`/products?q=${encodeURIComponent(product.name)}`} className="hover:text-forest">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-[11px] uppercase tracking-[0.1em] text-ink/45">
            {product.subcategory}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-ink/60">
          <span className="flex items-center gap-1 font-medium text-forest">
            <Star size={12} className="fill-forest" /> {product.rating}
          </span>
          <span className="truncate pl-2">{product.supplier}</span>
        </div>

        <div className="mt-auto space-y-3 border-t border-ink/8 pt-3">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-sm font-semibold text-forest">{product.price}</span>
            <span className="shrink-0 text-[11px] text-ink/50">MOQ {product.moq}</span>
          </div>
          <button
            type="button"
            onClick={() => openQuote(product)}
            className="w-full rounded-full border border-forest/25 py-2 text-xs font-semibold text-forest transition hover:border-forest hover:bg-forest hover:text-white"
          >
            Contact Us
          </button>
        </div>
      </div>
    </article>
  )
}
