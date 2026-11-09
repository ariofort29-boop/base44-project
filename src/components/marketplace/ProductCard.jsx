import { Link } from 'react-router-dom'
import Icon from '../icons.jsx'
import SmartImage from '../ui/SmartImage.jsx'

export default function ProductCard({ product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl2 border border-line bg-white transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
      <div className="relative">
        <Link to={`/products?q=${encodeURIComponent(product.name)}`}>
          <SmartImage
            src={product.image}
            alt={product.name}
            className="h-44 w-full sm:h-48"
            imgClassName="group-hover:scale-[1.05]"
          />
        </Link>
        <span className="absolute left-3 top-3 rounded-full bg-white/92 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-brand-900 backdrop-blur">
          {product.subcategory}
        </span>
        <button
          type="button"
          aria-label={`Add ${product.name} to wishlist`}
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/92 text-muted backdrop-blur transition hover:text-brand-700"
        >
          <Icon name="heart" className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-[14px] font-extrabold leading-snug text-ink">
          <Link to={`/products?q=${encodeURIComponent(product.name)}`} className="hover:text-brand-800">
            {product.name}
          </Link>
        </h3>

        <p className="mt-2 flex items-center gap-1.5 text-[12px] font-semibold text-muted">
          <span className="truncate">{product.supplier}</span>
          {product.verified && (
            <Icon name="badgeCheck" className="h-3.5 w-3.5 shrink-0 text-brand-600" aria-label="Verified supplier" />
          )}
          <span className="text-line">·</span>
          <span className="shrink-0">{product.country}</span>
        </p>

        <div className="mt-3 flex items-end justify-between gap-2 border-t border-line pt-3">
          <div>
            <p className="text-[14px] font-extrabold text-brand-900">
              {product.price}
              <span className="text-[11px] font-semibold text-muted"> /{product.unit}</span>
            </p>
            <p className="mt-0.5 text-[11px] font-semibold text-muted">MOQ {product.moq}</p>
          </div>
          <span className="rounded-full bg-brand-50 px-2 py-1 text-[10px] font-bold text-brand-700">
            {product.notes}
          </span>
        </div>

        <button
          type="button"
          className="mt-3.5 w-full rounded-full border border-brand-900/15 bg-white py-2.5 text-[12.5px] font-bold text-brand-900 transition hover:bg-brand-900 hover:text-white"
        >
          Request Quote
        </button>
      </div>
    </article>
  )
}
