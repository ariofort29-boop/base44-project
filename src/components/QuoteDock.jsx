import { ListChecks } from 'lucide-react'
import { useShop } from '../lib/store'

/** Keeps the existing quote basket reachable without a site header. */
export default function QuoteDock() {
  const { inquiries, cartOpen, setCartOpen } = useShop()

  if (inquiries.length === 0 || cartOpen) return null

  return (
    <button
      type="button"
      onClick={() => setCartOpen(true)}
      className="fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 rounded-full border border-white/15 bg-navy-deep/90 px-4 py-2.5 text-xs font-semibold text-white shadow-soft backdrop-blur transition hover:border-gold/50 hover:text-gold-soft"
    >
      <ListChecks size={15} className="text-gold" />
      سبد استعلام
      <span className="rounded-full bg-gold px-1.5 py-0.5 text-[10px] font-bold text-navy-deep">
        {inquiries.length.toLocaleString('fa-IR')}
      </span>
    </button>
  )
}
