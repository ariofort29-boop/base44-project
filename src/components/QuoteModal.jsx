import { CheckCircle2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useShop } from '../lib/store'

const emptyForm = {
  name: '',
  company: '',
  email: '',
  country: '',
  quantity: '',
  message: '',
}

export default function QuoteModal() {
  const { quoteTarget, closeQuote, addInquiry } = useShop()
  const [form, setForm] = useState(emptyForm)
  const [sent, setSent] = useState(false)

  const isOpen = quoteTarget !== null
  const product = quoteTarget && quoteTarget !== 'general' ? quoteTarget : null

  useEffect(() => {
    if (!isOpen) return
    setSent(false)
    setForm(emptyForm)
    const onKey = (event) => {
      if (event.key === 'Escape') closeQuote()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, closeQuote])

  if (!isOpen) return null

  const update = (field) => (event) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }))

  const submit = (event) => {
    event.preventDefault()
    addInquiry(product ?? 'general')
    setSent(true)
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/50 p-0 backdrop-blur-sm sm:items-center sm:p-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Request a quote"
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-8"
      >
        <button
          type="button"
          onClick={closeQuote}
          aria-label="Close request form"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-ink/50 transition hover:bg-mist hover:text-forest"
        >
          <X size={18} />
        </button>

        {sent ? (
          <div className="py-10 text-center">
            <CheckCircle2 size={44} className="mx-auto text-emerald-brand" />
            <h3 className="mt-4 font-display text-2xl text-forest">Request received</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink/65">
              Our trade team will reply within one business day with pricing, samples and lead
              times{product ? ` for ${product.name}` : ''}.
            </p>
            <button type="button" onClick={closeQuote} className="btn-primary mt-6">
              Continue browsing
            </button>
          </div>
        ) : (
          <>
            <p className="eyebrow">Request a quote</p>
            <h3 className="mt-2 font-display text-2xl text-forest">
              {product ? product.name : 'Tell us what you need'}
            </h3>
            <p className="mt-1.5 text-sm text-ink/60">
              {product
                ? `${product.supplier} · ${product.country} · MOQ ${product.moq}`
                : 'Share your product list and we will match you with verified suppliers.'}
            </p>

            <form onSubmit={submit} className="mt-6 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  required
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Full name"
                  aria-label="Full name"
                  className="field"
                />
                <input
                  required
                  value={form.company}
                  onChange={update('company')}
                  placeholder="Company"
                  aria-label="Company"
                  className="field"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  placeholder="Business email"
                  aria-label="Business email"
                  className="field"
                />
                <input
                  value={form.country}
                  onChange={update('country')}
                  placeholder="Destination country"
                  aria-label="Destination country"
                  className="field"
                />
              </div>
              <input
                value={form.quantity}
                onChange={update('quantity')}
                placeholder="Estimated order quantity"
                aria-label="Estimated order quantity"
                className="field"
              />
              <textarea
                value={form.message}
                onChange={update('message')}
                rows={3}
                placeholder="Packaging, certifications, target price…"
                aria-label="Message"
                className="field resize-none"
              />
              <button type="submit" className="btn-primary w-full">
                Send inquiry
              </button>
              <p className="text-center text-[11px] text-ink/45">
                Your details stay private and are shared only with the selected supplier.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
