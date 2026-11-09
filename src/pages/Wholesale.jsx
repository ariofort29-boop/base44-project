import { useState } from 'react'
import Icon from '../components/icons.jsx'
import PageHeader from '../components/layout/PageHeader.jsx'
import Button from '../components/ui/Button.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import { STEPS, CATEGORIES } from '../data/catalog.js'

const tiers = [
  {
    name: 'Sample order',
    range: '1 – 20 units',
    text: 'Validate quality, packaging and formulation before committing to volume.',
    points: ['Pre-production samples', 'Lab report on request', 'Courier shipping worldwide'],
    highlight: false,
  },
  {
    name: 'Trial order',
    range: '500 – 5,000 units',
    text: 'Test the market with a small production run and your own labelling.',
    points: ['Private-label artwork support', 'Air or LCL freight', 'Quality inspection included'],
    highlight: true,
  },
  {
    name: 'Container load',
    range: '10,000+ units',
    text: 'Full production runs with the best per-unit pricing and consolidated exports.',
    points: ['Tiered factory pricing', 'FCL freight & documentation', 'Dedicated account manager'],
    highlight: false,
  },
]

const faqs = [
  {
    q: 'What is the minimum order quantity?',
    a: 'MOQs are set by each manufacturer and shown on every product card — typically 500 units for cosmetics, 300–1,200 cases for food and beverage, and 400 tins for organic specialities. Private-label runs start higher.',
  },
  {
    q: 'Do you charge buyers a commission?',
    a: 'No. Buyers pay the manufacturer directly at the quoted price. MR Store earns a listing fee from suppliers, which keeps buying free of charge.',
  },
  {
    q: 'How are payments handled?',
    a: 'Standard terms are 30% deposit and 70% before shipment, via T/T or letter of credit. Escrow is available for first orders above $10,000.',
  },
  {
    q: 'Can you handle private label and custom packaging?',
    a: 'Yes. Most cosmetic and food suppliers on the marketplace offer OEM and ODM services. Send artwork or a formulation brief with your request.',
  },
]

export default function Wholesale() {
  const [sent, setSent] = useState(false)

  return (
    <>
      <PageHeader
        eyebrow="Wholesale & sourcing"
        title="Wholesale pricing built around your order size"
        text="Transparent tiers, no membership fee and direct manufacturer quotations. Tell us your specification and receive comparable offers within 48 hours."
        crumbs={['Wholesale']}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="#request" size="lg" icon="arrowRight">Request pricing</Button>
          <Button to="/products" variant="secondary" size="lg">Browse catalogue</Button>
        </div>
      </PageHeader>

      <section className="bg-white py-16 lg:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="Order tiers"
            title="Buy in the volume that fits your market"
            text="Tier pricing applies per product line and is confirmed by the manufacturer in your quotation."
          />
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {tiers.map((t) => (
              <article
                key={t.name}
                className={`relative flex flex-col rounded-xl3 border p-6 transition-all duration-500 hover:-translate-y-1 ${
                  t.highlight
                    ? 'border-brand-900 bg-brand-900 text-white shadow-lift'
                    : 'border-line bg-white shadow-card'
                }`}
              >
                {t.highlight && (
                  <span className="absolute right-5 top-5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-brand-100">
                    Most common
                  </span>
                )}
                <p className={`eyebrow ${t.highlight ? 'text-brand-300' : ''}`}>Tier</p>
                <h3 className={`mt-1.5 text-[1.3rem] ${t.highlight ? 'text-white' : ''}`}>{t.name}</h3>
                <p className={`mt-1 text-[12.5px] font-bold ${t.highlight ? 'text-brand-200' : 'text-brand-700'}`}>
                  {t.range}
                </p>
                <p className={`mt-3 text-[13.5px] leading-relaxed ${t.highlight ? 'text-brand-100/75' : 'text-muted'}`}>
                  {t.text}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {t.points.map((p) => (
                    <li
                      key={p}
                      className={`flex items-start gap-2 text-[13px] font-medium ${
                        t.highlight ? 'text-brand-100/90' : 'text-ink/80'
                      }`}
                    >
                      <Icon name="check" className={`mt-0.5 h-4 w-4 shrink-0 ${t.highlight ? 'text-brand-300' : 'text-brand-600'}`} />
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="#request"
                  className={`mt-6 inline-flex items-center gap-2 text-[13px] font-extrabold ${
                    t.highlight ? 'text-white' : 'text-brand-800'
                  }`}
                >
                  Get a quote <Icon name="arrowRight" className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-mist py-16 lg:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="The process"
            title="Four steps from enquiry to delivery"
            text="A single trade desk handles verification, samples, inspection and freight — you approve at each stage."
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-xl2 border border-line bg-white p-5">
                <span className="font-display text-[26px] font-semibold text-brand-200">{s.n}</span>
                <h3 className="mt-2 text-[14.5px] font-extrabold text-ink">{s.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="request" className="scroll-mt-40 bg-white py-16 lg:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Request for quotation"
              title="Send your specification"
              text="The more detail you share — formulation, packaging, target price — the more precise the offers we return."
            />
            <div className="mt-7 space-y-3">
              {[
                { icon: 'clock', title: '48-hour response', text: 'A buyer agent acknowledges every request within one business day.' },
                { icon: 'doc', title: 'Comparable offers', text: 'Quotations arrive in one format: price, MOQ, lead time, certificates.' },
                { icon: 'shield', title: 'No obligation', text: 'Free to submit, free to compare, free to decline.' },
              ].map((b) => (
                <div key={b.title} className="flex items-start gap-3 rounded-xl2 border border-line bg-mist p-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-brand-700 shadow-sm">
                    <Icon name={b.icon} className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[13px] font-extrabold text-ink">{b.title}</p>
                    <p className="mt-0.5 text-[12.5px] leading-relaxed text-muted">{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl3 border border-line bg-mist p-6 shadow-card sm:p-8">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-900 text-white">
                  <Icon name="check" className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl">Request received</h3>
                <p className="mt-2 max-w-sm text-[13.5px] leading-relaxed text-muted">
                  Our trade desk is matching your brief with verified manufacturers. Expect comparable
                  quotations within 48 hours.
                </p>
                <Button onClick={() => setSent(false)} variant="secondary" className="mt-6" size="sm">
                  Submit another request
                </Button>
              </div>
            ) : (
              <form
                className="grid gap-4 sm:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSent(true)
                }}
              >
                <div>
                  <label htmlFor="rfq-name" className="mb-1.5 block text-[12px] font-bold text-ink">Full name</label>
                  <input id="rfq-name" required className="field" placeholder="Jane Doe" />
                </div>
                <div>
                  <label htmlFor="rfq-company" className="mb-1.5 block text-[12px] font-bold text-ink">Company</label>
                  <input id="rfq-company" required className="field" placeholder="Nordic Apotek AB" />
                </div>
                <div>
                  <label htmlFor="rfq-email" className="mb-1.5 block text-[12px] font-bold text-ink">Business email</label>
                  <input id="rfq-email" type="email" required className="field" placeholder="you@company.com" />
                </div>
                <div>
                  <label htmlFor="rfq-country" className="mb-1.5 block text-[12px] font-bold text-ink">Destination country</label>
                  <input id="rfq-country" required className="field" placeholder="Sweden" />
                </div>
                <div>
                  <label htmlFor="rfq-category" className="mb-1.5 block text-[12px] font-bold text-ink">Category</label>
                  <select id="rfq-category" className="field">
                    {CATEGORIES.map((c) => (
                      <option key={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="rfq-qty" className="mb-1.5 block text-[12px] font-bold text-ink">Estimated quantity</label>
                  <input id="rfq-qty" className="field" placeholder="e.g. 5,000 units" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="rfq-brief" className="mb-1.5 block text-[12px] font-bold text-ink">Product brief</label>
                  <textarea
                    id="rfq-brief"
                    rows={4}
                    className="field resize-none"
                    placeholder="Product, formulation or specification, packaging, certifications required, target price…"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-900 py-3.5 text-sm font-bold text-white transition hover:bg-brand-800"
                  >
                    Submit request <Icon name="arrowRight" className="h-4 w-4" />
                  </button>
                  <p className="mt-2.5 text-center text-[11px] text-muted">
                    By submitting you agree to our trade terms. We never share your details with third parties
                    beyond the matched suppliers.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-mist py-16 lg:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <SectionHeading eyebrow="Questions" title="Wholesale, answered" text="Everything buyers ask before their first order." />
          <div className="divide-y divide-line overflow-hidden rounded-xl2 border border-line bg-white">
            {faqs.map((f) => (
              <details key={f.q} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14px] font-extrabold text-ink">
                  {f.q}
                  <Icon name="plus" className="h-4 w-4 shrink-0 text-brand-700 transition group-open:rotate-45" />
                </summary>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
