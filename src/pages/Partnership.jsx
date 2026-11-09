import { useState } from 'react'
import Icon from '../components/icons.jsx'
import PageHeader from '../components/layout/PageHeader.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Button from '../components/ui/Button.jsx'
import { CATEGORIES } from '../data/catalog.js'

const benefits = [
  {
    icon: 'users',
    title: 'Qualified buyer enquiries',
    text: 'Only verified business buyers can request quotations — no consumer traffic, no tire-kickers.',
  },
  {
    icon: 'doc',
    title: 'A storefront that works',
    text: 'Catalogue, certifications, MOQs and company profile in one shareable link.',
  },
  {
    icon: 'globe',
    title: 'New export markets',
    text: 'Our trade desk introduces your lines to distributors in 140+ countries.',
  },
  {
    icon: 'shield',
    title: 'Documentation support',
    text: 'Help with certificates of origin, lab testing and buyer-specific compliance.',
  },
]

const requirements = [
  'Registered manufacturing or trading entity',
  'Product liability and quality documentation',
  'Minimum production capacity per month',
  'Export experience or willingness to ship internationally',
]

const partnerTypes = [
  {
    title: 'Manufacturers',
    text: 'Own your production line and take private-label or OEM orders.',
  },
  {
    title: 'Wholesalers & distributors',
    text: 'Stock and supply established lines to regional retailers.',
  },
  {
    title: 'Brands & formulators',
    text: 'Bring a finished brand to new markets through our buyer network.',
  },
]

export default function Partnership() {
  const [sent, setSent] = useState(false)

  return (
    <>
      <PageHeader
        eyebrow="Partnership"
        title="Bring your production to the world’s buyers"
        text="MR Store connects verified manufacturers and suppliers with international buyers across cosmetics, FMCG and organic categories. Applications are reviewed by our trade team within five working days."
        crumbs={['Partnership']}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="#apply" size="lg" icon="arrowRight">Apply to join</Button>
          <Button to="/suppliers" variant="secondary" size="lg">See listed suppliers</Button>
        </div>
      </PageHeader>

      <section className="bg-white py-16 lg:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <SectionHeading
            eyebrow="Why partner with MR Store"
            title="A marketplace built around trade, not listings"
            text="We keep the marketplace small on purpose: every supplier is audited, and every buyer enquiry is qualified before it reaches you."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-xl2 border border-line bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-card">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon name={b.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-3.5 text-[14px] font-extrabold text-ink">{b.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-mist py-16 lg:py-20">
        <div className="shell">
          <SectionHeading eyebrow="Programme tracks" title="Three ways to partner" />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {partnerTypes.map((p, i) => (
              <article key={p.title} className="rounded-xl2 border border-line bg-white p-6">
                <span className="font-display text-[24px] font-semibold text-brand-200">0{i + 1}</span>
                <h3 className="mt-2 text-[15px] font-extrabold text-ink">{p.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{p.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-6 rounded-xl3 border border-line bg-white p-6 sm:p-8 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="eyebrow">Eligibility</p>
              <h3 className="mt-2 text-[1.25rem] leading-tight">What we review before approval</h3>
              <ul className="mt-4 space-y-2.5">
                {requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-[13.5px] text-ink/80">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-brand-900 p-6 text-white">
              <p className="eyebrow text-brand-300">Membership</p>
              <p className="mt-2 font-display text-[2rem] leading-none">$0</p>
              <p className="mt-1 text-[12.5px] text-brand-100/70">to apply — listing fees agreed after audit</p>
              <ul className="mt-4 space-y-2 text-[13px] text-brand-100/85">
                <li className="flex gap-2"><Icon name="check" className="mt-0.5 h-4 w-4 text-brand-300" /> Storefront &amp; unlimited products</li>
                <li className="flex gap-2"><Icon name="check" className="mt-0.5 h-4 w-4 text-brand-300" /> RFQ inbox with buyer profiles</li>
                <li className="flex gap-2"><Icon name="check" className="mt-0.5 h-4 w-4 text-brand-300" /> Quarterly performance review</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="apply" className="scroll-mt-40 bg-white py-16 lg:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Supplier application"
              title="Tell us about your production"
              text="Share your capabilities and a trade manager will follow up with the audit checklist and next steps."
            />
            <div className="mt-6 flex items-start gap-3 rounded-xl2 bg-brand-50 p-4">
              <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
              <p className="text-[12.5px] leading-relaxed text-muted">
                Applications are reviewed within <span className="font-bold text-ink">5 working days</span>.
                Audits are scheduled in the following two weeks.
              </p>
            </div>
          </div>

          <div className="rounded-xl3 border border-line bg-mist p-6 shadow-card sm:p-8">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-900 text-white">
                  <Icon name="check" className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl">Application received</h3>
                <p className="mt-2 max-w-sm text-[13.5px] leading-relaxed text-muted">
                  Thank you. Our supplier team will contact you with the audit checklist within five
                  working days.
                </p>
                <Button onClick={() => setSent(false)} variant="secondary" className="mt-6" size="sm">
                  Submit another application
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
                  <label htmlFor="co-name" className="mb-1.5 block text-[12px] font-bold text-ink">Company name</label>
                  <input id="co-name" required className="field" placeholder="Green Lather Works" />
                </div>
                <div>
                  <label htmlFor="co-country" className="mb-1.5 block text-[12px] font-bold text-ink">Country of production</label>
                  <input id="co-country" required className="field" placeholder="Portugal" />
                </div>
                <div>
                  <label htmlFor="co-contact" className="mb-1.5 block text-[12px] font-bold text-ink">Contact person</label>
                  <input id="co-contact" required className="field" placeholder="Marta Ferreira" />
                </div>
                <div>
                  <label htmlFor="co-email" className="mb-1.5 block text-[12px] font-bold text-ink">Business email</label>
                  <input id="co-email" type="email" required className="field" placeholder="export@company.com" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="co-category" className="mb-1.5 block text-[12px] font-bold text-ink">Main category</label>
                  <select id="co-category" className="field">
                    {CATEGORIES.map((c) => (
                      <option key={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="co-about" className="mb-1.5 block text-[12px] font-bold text-ink">Capabilities &amp; certifications</label>
                  <textarea
                    id="co-about"
                    rows={4}
                    className="field resize-none"
                    placeholder="Production lines, monthly capacity, existing certifications, export markets…"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-900 py-3.5 text-sm font-bold text-white transition hover:bg-brand-800"
                  >
                    Submit application <Icon name="arrowRight" className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
