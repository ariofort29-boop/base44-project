import { useState } from 'react'
import Icon from '../icons.jsx'

export default function QuoteCTA() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <section className="relative overflow-hidden bg-brand-900">
      <svg
        aria-hidden="true"
        viewBox="0 0 600 600"
        className="pointer-events-none absolute -bottom-40 -left-24 h-[520px] w-[520px] text-white/10"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M300 20c-60 100-60 180 0 280s60 180 0 280" />
          <path d="M300 60c-95 30-140 100-126 176M300 110c95 30 140 100 126 176M300 300c-95 30-140 100-126 176" />
        </g>
      </svg>

      <div className="shell relative grid gap-8 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-16">
        <div>
          <p className="eyebrow text-brand-300">Wholesale enquiry</p>
          <h2 className="mt-3 max-w-xl text-[1.7rem] leading-tight tracking-[-0.02em] text-white sm:text-[2.1rem]">
            Get a verified quotation within 48 hours
          </h2>
          <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-brand-100/75">
            Tell us what you source. Our trade desk matches your request with audited manufacturers and
            returns comparable offers — no obligation, no listing fees.
          </p>
        </div>

        <div className="rounded-xl2 border border-white/15 bg-white/[0.06] p-5 backdrop-blur-sm sm:p-6">
          {sent ? (
            <div className="flex items-start gap-3 text-brand-100">
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
                <Icon name="check" className="h-4 w-4" />
              </span>
              <p className="text-[13.5px] leading-relaxed">
                Thanks — your request is with our trade desk. A buyer agent will reply to{' '}
                <span className="font-bold text-white">{email || 'your inbox'}</span> shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
              className="space-y-3"
            >
              <label htmlFor="cta-email" className="block text-[12px] font-bold uppercase tracking-wide text-brand-100/80">
                Business email
              </label>
              <input
                id="cta-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-brand-100/50 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-300/30"
              />
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-bold text-brand-900 transition hover:bg-brand-50"
              >
                Request wholesale pricing
                <Icon name="arrowRight" className="h-4 w-4" />
              </button>
              <p className="text-center text-[11px] text-brand-100/50">
                We reply within one business day. Your details are never resold.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
