import { useState } from 'react'
import Icon from '../components/icons.jsx'
import PageHeader from '../components/layout/PageHeader.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import { CATEGORIES } from '../data/catalog.js'

const offices = [
  { city: 'Istanbul', role: 'Headquarters', lines: ['Levent, Büyükdere Cd. 120', '34394 Istanbul, Türkiye'] },
  { city: 'Dubai', role: 'Trade & logistics desk', lines: ['JAFZA One, Tower A', 'Dubai, United Arab Emirates'] },
  { city: 'Rotterdam', role: 'EU representation', lines: ['Waalhaven O.Z. 81', '3087 Rotterdam, Netherlands'] },
]

const channels = [
  { icon: 'mail', label: 'Trade enquiries', value: 'trade@mrstore.com', href: 'mailto:trade@mrstore.com' },
  { icon: 'mail', label: 'Supplier applications', value: 'suppliers@mrstore.com', href: 'mailto:suppliers@mrstore.com' },
  { icon: 'phone', label: 'Phone', value: '+90 212 555 01 00', href: 'tel:+902125550100' },
  { icon: 'clock', label: 'Hours', value: 'Mon–Fri · 09:00–18:00 (GMT+3)' },
]

export default function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to the trade desk"
        text="Whether you are sourcing a first container or listing a new production line, our team responds within one business day."
        crumbs={['Contact']}
      />

      <section className="bg-white py-14 lg:py-16">
        <div className="shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="rounded-xl3 border border-line bg-mist p-6 shadow-card sm:p-8">
            <h2 className="text-[1.35rem] leading-tight">Send us a message</h2>
            <p className="mt-1.5 text-[13px] text-muted">
              All fields marked with an asterisk are required.
            </p>

            {sent ? (
              <div className="mt-8 flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-900 text-white">
                  <Icon name="check" className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg">Message sent</h3>
                <p className="mt-2 max-w-sm text-[13.5px] leading-relaxed text-muted">
                  Thank you for reaching out. A member of the trade desk will reply within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-5 text-[12.5px] font-bold text-brand-800 underline-offset-4 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                className="mt-6 grid gap-4 sm:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSent(true)
                }}
              >
                <div>
                  <label htmlFor="c-name" className="mb-1.5 block text-[12px] font-bold text-ink">Name *</label>
                  <input id="c-name" required className="field" placeholder="Your full name" />
                </div>
                <div>
                  <label htmlFor="c-company" className="mb-1.5 block text-[12px] font-bold text-ink">Company</label>
                  <input id="c-company" className="field" placeholder="Company name" />
                </div>
                <div>
                  <label htmlFor="c-email" className="mb-1.5 block text-[12px] font-bold text-ink">Business email *</label>
                  <input id="c-email" type="email" required className="field" placeholder="you@company.com" />
                </div>
                <div>
                  <label htmlFor="c-subject" className="mb-1.5 block text-[12px] font-bold text-ink">I am…</label>
                  <select id="c-subject" className="field">
                    <option>A buyer looking to source</option>
                    <option>A supplier wanting to list</option>
                    <option>An existing partner</option>
                    <option>Press or media</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="c-category" className="mb-1.5 block text-[12px] font-bold text-ink">Category of interest</label>
                  <select id="c-category" className="field">
                    <option>Not sure yet</option>
                    {CATEGORIES.map((c) => (
                      <option key={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="c-message" className="mb-1.5 block text-[12px] font-bold text-ink">Message *</label>
                  <textarea id="c-message" required rows={5} className="field resize-none" placeholder="How can we help?" />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-900 py-3.5 text-sm font-bold text-white transition hover:bg-brand-800"
                  >
                    Send message <Icon name="arrowRight" className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          <div>
            <SectionHeading eyebrow="Direct channels" title="Reach the right desk" />
            <div className="mt-5 divide-y divide-line overflow-hidden rounded-xl2 border border-line">
              {channels.map((c) => (
                <div key={c.label} className="flex items-center gap-3.5 bg-white px-5 py-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                    <Icon name={c.icon} className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-muted">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="text-[13.5px] font-semibold text-ink hover:text-brand-800">
                        {c.value}
                      </a>
                    ) : (
                      <p className="text-[13.5px] font-semibold text-ink">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3">
              {offices.map((o) => (
                <div key={o.city} className="rounded-xl2 border border-line bg-mist p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[13.5px] font-extrabold text-ink">{o.city}</p>
                    <span className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-700">
                      {o.role}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-muted">
                    {o.lines.join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
