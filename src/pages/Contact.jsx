import { CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import PageHeader from '../components/PageHeader'

const initial = {
  name: '',
  company: '',
  email: '',
  country: '',
  interest: 'Buying products',
  message: '',
}

const contactDetails = [
  { icon: Mail, label: 'Trade desk', value: 'trade@mrstore.global' },
  { icon: Phone, label: 'Phone', value: '+971 4 000 1188' },
  { icon: MapPin, label: 'Head office', value: 'Dubai · Istanbul · Shanghai' },
  { icon: Clock, label: 'Response time', value: 'Within one business day' },
]

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [sent, setSent] = useState(false)

  const update = (field) => (event) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }))

  const submit = (event) => {
    event.preventDefault()
    setSent(true)
    setForm(initial)
  }

  return (
    <>
      <PageHeader
        eyebrow="Contact us"
        title="Let's talk about your next order"
        description="Tell us what you source, the volumes you need and your destination market. A trade manager will reply with options and terms."
      />

      <section className="bg-mist py-12 lg:py-16">
        <div className="container-page grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-2xl border border-ink/8 bg-white p-6 sm:p-8">
            {sent ? (
              <div className="py-12 text-center">
                <CheckCircle2 size={44} className="mx-auto text-emerald-brand" />
                <h2 className="mt-4 font-display text-2xl text-forest">Message sent</h2>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink/65">
                  Thank you — our trade team will reply within one business day with supplier options
                  and indicative pricing.
                </p>
                <button type="button" onClick={() => setSent(false)} className="btn-outline mt-6">
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl text-forest">Send an inquiry</h2>
                <p className="mt-1.5 text-sm text-ink/55">
                  Required fields are marked with an asterisk.
                </p>
                <form onSubmit={submit} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-medium text-ink/60">Full name *</span>
                      <input required value={form.name} onChange={update('name')} className="field" />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-medium text-ink/60">Company *</span>
                      <input required value={form.company} onChange={update('company')} className="field" />
                    </label>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-medium text-ink/60">Business email *</span>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={update('email')}
                        className="field"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-medium text-ink/60">Destination country</span>
                      <input value={form.country} onChange={update('country')} className="field" />
                    </label>
                  </div>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium text-ink/60">I am interested in</span>
                    <select value={form.interest} onChange={update('interest')} className="field">
                      <option>Buying products</option>
                      <option>Becoming a supplier</option>
                      <option>Private label production</option>
                      <option>Distribution partnership</option>
                      <option>Logistics & consolidated shipping</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium text-ink/60">Message *</span>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={update('message')}
                      placeholder="Products, volumes, packaging, certifications and target price…"
                      className="field resize-none"
                    />
                  </label>
                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    Send inquiry
                  </button>
                </form>
              </>
            )}
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-forest p-6 text-white">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mint/80">
                Direct lines
              </p>
              <h2 className="mt-2 font-display text-xl">Talk to a trade manager</h2>
              <ul className="mt-5 space-y-3.5">
                {contactDetails.map(({ icon: Icon, label, value }) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10 text-mint">
                      <Icon size={16} />
                    </span>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.12em] text-white/45">{label}</p>
                      <p className="text-sm text-white/85">{value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-ink/8 bg-white p-6">
              <h3 className="font-display text-lg text-forest">Suppliers</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/60">
                Send your catalogue, certifications and export capacity — our sourcing team reviews
                new suppliers every week.
              </p>
              <p className="mt-3 text-sm font-semibold text-forest">suppliers@mrstore.global</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
