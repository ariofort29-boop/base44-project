import Icon from '../components/icons.jsx'
import PageHeader from '../components/layout/PageHeader.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Button from '../components/ui/Button.jsx'

const values = [
  {
    icon: 'shield',
    title: 'Verification before visibility',
    text: 'A supplier earns a listing only after audit — not after paying a fee.',
  },
  {
    icon: 'leaf',
    title: 'Natural by default',
    text: 'We prioritise producers working with traceable, responsibly sourced ingredients.',
  },
  {
    icon: 'globe',
    title: 'Borderless trade',
    text: 'One desk for quotations, inspection and freight across 140+ countries.',
  },
  {
    icon: 'users',
    title: 'Relationships over transactions',
    text: 'Buyers and suppliers stay in contact long after the first container ships.',
  },
]

const milestones = [
  { year: '2015', text: 'MR Store begins as a sourcing desk for natural cosmetics in Istanbul.' },
  { year: '2018', text: 'First 100 verified manufacturers onboarded across Türkiye and the EU.' },
  { year: '2021', text: 'FMCG and organic divisions launch; logistics desk opens in Dubai.' },
  { year: '2024', text: '12,400 suppliers and 8,600 active buyers across 140+ countries.' },
]

const stats = [
  { value: '12,400+', label: 'Verified suppliers' },
  { value: '8,600+', label: 'Active international buyers' },
  { value: '140+', label: 'Destination countries' },
  { value: '31h', label: 'Average quotation time' },
]

const assurances = ['ISO 9001', 'ISO 22716', 'HACCP', 'COSMOS', 'USDA Organic', 'EU Ecolabel']

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About MR Store"
        title="Natural Products. Global Opportunities."
        text="MR Store is an international B2B marketplace built to make cross-border sourcing of natural and consumer products straightforward, transparent and reliable."
        crumbs={['About Us']}
      />

      <section className="bg-white py-16 lg:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Our story"
              title="A sourcing desk that became a marketplace"
              text="We started by helping European retailers find cosmetic manufacturers they could actually trust. The process — audit, sample, inspect, ship — worked so well that we opened it to buyers and producers worldwide."
            />
            <p className="mt-5 text-[14px] leading-relaxed text-muted">
              Today MR Store brings together manufacturers, wholesalers, distributors and importers across
              three industries: cosmetics &amp; personal care, fast-moving consumer goods, and organic &amp;
              natural products. Every profile on the marketplace has been reviewed by our trade team, and
              every buyer enquiry is qualified before it reaches a supplier.
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-muted">
              We are not a directory. We stay involved from the first quotation to the freight documents,
              because a marketplace is only as good as the last container that arrived.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button to="/products" icon="arrowRight">Explore the marketplace</Button>
              <Button to="/contact" variant="secondary">Speak with our team</Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 self-start">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl2 border border-line bg-mist p-5">
                <p className="font-display text-[1.75rem] leading-none text-brand-900">{s.value}</p>
                <p className="mt-2 text-[12px] font-semibold leading-snug text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-mist py-16 lg:py-20">
        <div className="shell">
          <SectionHeading eyebrow="What guides us" title="Four principles we do not trade away" />
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <article key={v.title} className="rounded-xl2 border border-line bg-white p-5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon name={v.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-3.5 text-[14px] font-extrabold text-ink">{v.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{v.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading eyebrow="Milestones" title="Ten years of building trade routes" />
          <ol className="relative space-y-6 border-l border-line pl-6">
            {milestones.map((m) => (
              <li key={m.year} className="relative">
                <span className="absolute -left-[1.9rem] top-1.5 grid h-3.5 w-3.5 place-items-center rounded-full border-2 border-brand-600 bg-white" />
                <p className="font-display text-[15px] font-semibold text-brand-800">{m.year}</p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-muted">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line bg-brand-950 py-14">
        <div className="shell flex flex-col items-center gap-6 text-center">
          <p className="text-[10.5px] font-extrabold uppercase tracking-[0.2em] text-brand-300">
            Standards we work to
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {assurances.map((a) => (
              <span key={a} className="rounded-full border border-white/15 px-4 py-2 text-[12px] font-semibold text-brand-100/85">
                {a}
              </span>
            ))}
          </div>
          <p className="max-w-xl text-[13px] leading-relaxed text-brand-100/60">
            Certifications are verified per supplier and per product line — the documents that apply to
            your order are attached to every quotation.
          </p>
        </div>
      </section>
    </>
  )
}
