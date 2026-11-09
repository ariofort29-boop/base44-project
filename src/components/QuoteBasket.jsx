import { ArrowRight, ShoppingBag, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useShop } from '../lib/store'

export default function QuoteBasket() {
  const { cartOpen, setCartOpen, inquiries } = useShop()

  if (!cartOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex justify-end bg-ink/40 backdrop-blur-sm">
      <button
        type="button"
        aria-label="Close quote basket"
        onClick={() => setCartOpen(false)}
        className="absolute inset-0 h-full w-full cursor-default"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Quote basket"
        className="relative flex h-full w-full max-w-sm flex-col bg-white shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-ink/8 px-5 py-4">
          <div className="flex items-center gap-2 text-forest">
            <ShoppingBag size={18} />
            <p className="font-display text-lg">Quote basket</p>
            <span className="rounded-full bg-mint px-2 py-0.5 text-xs font-semibold text-forest">
              {inquiries.length}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            aria-label="Close quote basket"
            className="grid h-9 w-9 place-items-center rounded-full text-ink/50 hover:bg-mist hover:text-forest"
          >
            <X size={18} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {inquiries.length === 0 ? (
            <p className="mt-10 text-center text-sm leading-relaxed text-ink/55">
              No items yet. Add products with “Contact Us” to build a sourcing list.
            </p>
          ) : (
            <ul className="space-y-3">
              {inquiries.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 rounded-xl border border-ink/8 p-2.5"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt=""
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                  ) : (
                    <span className="grid h-12 w-12 place-items-center rounded-lg bg-mint text-xs font-semibold text-forest">
                      RFQ
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{item.name}</p>
                    <p className="truncate text-[11px] text-ink/50">
                      {item.supplier ?? 'Matched by our trade team'}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="border-t border-ink/8 p-5">
          <Link
            to="/contact"
            onClick={() => setCartOpen(false)}
            className="btn-primary w-full"
          >
            Send inquiry <ArrowRight size={15} />
          </Link>
          <p className="mt-2 text-center text-[11px] text-ink/45">
            Our team replies within one business day.
          </p>
        </footer>
      </aside>
    </div>
  )
}
