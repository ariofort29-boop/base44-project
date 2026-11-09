import { ArrowRight, Container, FileCheck2, Headset } from 'lucide-react'
import { Link } from 'react-router-dom'

const points = [
  { icon: Container, title: 'Mixed containers', text: 'Consolidate several suppliers in one shipment.' },
  { icon: FileCheck2, title: 'Export documents', text: 'COO, health certificates and labelling support.' },
  { icon: Headset, title: 'Dedicated manager', text: 'One account manager from quote to delivery.' },
]

export default function WholesaleBand() {
  return (
    <section className="bg-white pb-14 lg:pb-16">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1600&q=80"
            alt="Wholesale warehouse with palletised goods"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/96 via-forest-deep/88 to-forest/55" />

          <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:p-12">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mint/80">
                Wholesale programme
              </p>
              <h2 className="mt-3 max-w-lg font-display text-3xl leading-tight text-white sm:text-4xl">
                B2B Wholesale for Your Business
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
                From a single pallet to recurring container programmes — transparent pricing, agreed
                quality standards and a supply plan that fits your market.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3 text-sm font-semibold text-forest transition hover:bg-white"
                >
                  Contact Us <ArrowRight size={15} />
                </Link>
                <Link to="/wholesale" className="btn-secondary">
                  Wholesale terms
                </Link>
              </div>
            </div>

            <ul className="space-y-3">
              {points.map(({ icon: Icon, title, text }) => (
                <li
                  key={title}
                  className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-mint/15 text-mint">
                    <Icon size={17} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="text-xs text-white/60">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
