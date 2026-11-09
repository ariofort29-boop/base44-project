import Icon from '../icons.jsx'

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
}

export default function SupplierCard({ supplier, compact = false }) {
  return (
    <article className="group flex h-full flex-col rounded-xl2 border border-line bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
      <div className="flex items-start gap-3.5">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-900 font-display text-[15px] font-semibold text-brand-50">
          {initials(supplier.name)}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="flex items-center gap-1.5 truncate text-[15px] font-extrabold text-ink">
            {supplier.name}
            {supplier.verified && (
              <Icon name="badgeCheck" className="h-4 w-4 shrink-0 text-brand-600" aria-label="Verified" />
            )}
          </h3>
          <p className="mt-0.5 flex items-center gap-1.5 text-[12px] font-semibold text-muted">
            <Icon name="pin" className="h-3.5 w-3.5" />
            {supplier.city}, {supplier.country}
            <span className="text-line">·</span>
            Since {supplier.since}
          </p>
        </div>
      </div>

      {!compact && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {supplier.specialties.map((s) => (
            <span key={s} className="rounded-full bg-mist px-2.5 py-1 text-[11px] font-semibold text-muted">
              {s}
            </span>
          ))}
        </div>
      )}

      <dl className="mt-4 grid grid-cols-3 gap-2 border-y border-line py-3 text-center">
        <div>
          <dt className="text-[10px] font-bold uppercase tracking-wide text-muted">Rating</dt>
          <dd className="mt-0.5 flex items-center justify-center gap-1 text-[13px] font-extrabold text-ink">
            <Icon name="star" className="h-3 w-3 text-[#E0A33E]" />
            {supplier.rating}
          </dd>
        </div>
        <div className="border-x border-line">
          <dt className="text-[10px] font-bold uppercase tracking-wide text-muted">Response</dt>
          <dd className="mt-0.5 text-[13px] font-extrabold text-ink">{supplier.response}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-bold uppercase tracking-wide text-muted">Products</dt>
          <dd className="mt-0.5 text-[13px] font-extrabold text-ink">{supplier.products}</dd>
        </div>
      </dl>

      {!compact && (
        <p className="mt-3 text-[11.5px] leading-relaxed text-muted">
          <span className="font-bold text-ink">Certified:</span> {supplier.certifications.join(' · ')}
        </p>
      )}

      <div className="mt-auto flex items-center gap-2 pt-4">
        <button
          type="button"
          className="flex-1 rounded-full bg-brand-900 py-2.5 text-[12.5px] font-bold text-white transition hover:bg-brand-800"
        >
          Contact Supplier
        </button>
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition hover:border-brand-300 hover:text-brand-800"
          aria-label={`Save ${supplier.name}`}
        >
          <Icon name="heart" className="h-4 w-4" />
        </button>
      </div>
    </article>
  )
}
