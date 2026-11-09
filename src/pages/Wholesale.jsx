import { ArrowRight, ClipboardList, Handshake, Ship } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import SectionHeading from '../components/SectionHeading'

const steps = [
  {
    icon: ClipboardList,
    title: 'Share your requirements',
    text: 'Send product specs, target price, packaging and destination market. Our team confirms feasibility within 24 hours.',
  },
  {
    icon: Handshake,
    title: 'Match, sample & negotiate',
    text: 'We shortlist audited manufacturers, arrange samples and negotiate MOQ, lead time and payment terms.',
  },
  {
    icon: Ship,
    title: 'Contract & ship',
    text: 'Order placed with inspection, labelling review and consolidated freight to your warehouse.',
  },
]

const terms = [
  ['Minimum order', 'From 1 pallet · container loads for FMCG'],
  ['Lead time', '15–35 days depending on production and packaging'],
  ['Payment terms', '30/70 T/T, irrevocable L/C at sight, or escrow'],
  ['Packaging', 'Retail-ready, private label or bulk industrial'],
  ['Documentation', 'COO, health certificate, MSDS, ingredient list'],
  ['Shipping', 'FOB, CIF, DAP and DDP to 180+ countries'],
]

export default function Wholesale() {
  return (
    <>
      <PageHeader
        eyebrow="Wholesale programme"
        title="Buy wholesale with confidence"
        description="A structured sourcing process built for importers, distributors and retail chains — from first sample to recurring container programmes."
      >
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3 text-sm font-semibold text-forest transition hover:bg-white">
          Talk to a trade manager <ArrowRight size={15} />
        </Link>
      </PageHeader>

      <section className="bg-white py-14 lg:py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="How it works"
            title="Three steps from inquiry to delivery"
            description="You work with one trade manager who coordinates suppliers, samples, quality checks and freight."
          />
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <article key={title} className="card-surface p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-mint text-forest">
                    <Icon size={20} />
                  </span>
                  <span className="font-display text-3xl text-forest/15">0{index + 1}</span>
                </div>
                <h3 className="mt-4 font-display text-lg text-forest">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist py-14 lg:py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow">Commercial terms</p>
            <h2 className="mt-2 font-display text-3xl leading-tight text-forest">
              Terms that fit real import businesses
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink/65">
              Every quotation states the same six variables, so you can compare suppliers on equal
              grounds and plan landed cost before you commit.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/products" className="btn-primary">
                Browse products
              </Link>
              <Link to="/contact" className="btn-outline">
                Request terms
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-ink/8 bg-white">
            <dl className="divide-y divide-ink/6">
              {terms.map(([label, value]) => (
                <div key={label} className="grid gap-1 px-5 py-3.5 sm:grid-cols-[160px_1fr] sm:items-center">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/45">
                    {label}
                  </dt>
                  <dd className="text-sm text-ink/75">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-forest py-14">
        <div className="container-page flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-display text-2xl text-white sm:text-3xl">
              Planning a seasonal programme?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-white/65">
              Share your forecast and we will reserve production capacity across your key SKUs.
            </p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3 text-sm font-semibold text-forest transition hover:bg-white">
            Request a quote <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  )
}
