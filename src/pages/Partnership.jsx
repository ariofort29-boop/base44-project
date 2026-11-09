import { ArrowRight, BadgeCheck, Layers, Megaphone, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import SectionHeading from '../components/SectionHeading'

const programmes = [
  {
    icon: Layers,
    title: 'Private label',
    text: 'Develop your own brand on proven formulations with certified production partners and compliant labelling.',
    points: ['Formulation adaptation', 'Packaging & artwork', 'Minimum runs from 3,000 units'],
  },
  {
    icon: Truck,
    title: 'Distribution partner',
    text: 'Exclusive territory agreements for importers and distributors with warehousing and local compliance.',
    points: ['Territory exclusivity', 'Marketing assets', 'Stock planning support'],
  },
  {
    icon: Megaphone,
    title: 'Marketplace partner',
    text: 'Agencies, marketplaces and retail chains that introduce qualified buyers to our supplier network.',
    points: ['Referral terms', 'Dedicated buyer desk', 'Quarterly reviews'],
  },
]

export default function Partnership() {
  return (
    <>
      <PageHeader
        eyebrow="Partnership"
        title="Grow with the MR Store network"
        description="Whether you manufacture, distribute or represent buyers, we build long-term commercial partnerships around your strengths."
      >
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3 text-sm font-semibold text-forest transition hover:bg-white"
        >
          Discuss a partnership <ArrowRight size={15} />
        </Link>
      </PageHeader>

      <section className="bg-white py-14 lg:py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="Programmes"
            title="Three ways to partner"
            description="Every programme starts with a commercial fit call, a clear scope and measurable quarterly targets."
          />
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {programmes.map(({ icon: Icon, title, text, points }) => (
              <article key={title} className="card-surface flex flex-col p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-mint text-forest">
                  <Icon size={20} />
                </span>
                <h2 className="mt-4 font-display text-xl text-forest">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{text}</p>
                <ul className="mt-4 space-y-2">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-ink/70">
                      <BadgeCheck size={16} className="mt-0.5 shrink-0 text-emerald-brand" />
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:text-emerald-brand"
                >
                  Apply <ArrowRight size={14} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist py-14 lg:py-16">
        <div className="container-page grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">What we bring</p>
            <h2 className="mt-2 font-display text-3xl leading-tight text-forest">
              Trade infrastructure, not just introductions
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/65">
              Partners get access to verified supply, consolidated logistics, quality inspection and
              documentation support — the operational layer that makes cross-border trade reliable.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ['12,400+', 'Verified suppliers'],
              ['180+', 'Destination countries'],
              ['24h', 'Quote turnaround'],
              ['98.6%', 'On-time shipment rate'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-ink/8 bg-white p-5">
                <p className="font-display text-2xl text-forest">{value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-ink/45">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
