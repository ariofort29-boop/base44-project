import Icon from '../icons.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { TESTIMONIALS, REGIONS } from '../../data/catalog.js'

export default function Testimonials() {
  return (
    <section className="border-y border-line bg-mist py-16 lg:py-20">
      <div className="shell">
        <SectionHeading
          eyebrow="Trusted worldwide"
          title="Buyers and suppliers on both sides of the trade"
          text="MR Store is used by independent retailers, distributors and manufacturers across nine sourcing regions."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col rounded-xl2 border border-line bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-card"
            >
              <div className="flex gap-0.5 text-[#E0A33E]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" className="h-3.5 w-3.5" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[13.5px] leading-relaxed text-ink/85">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-50 font-display text-[12px] font-semibold text-brand-800">
                  {t.name.split(' ').map((w) => w[0]).join('')}
                </span>
                <div>
                  <p className="text-[12.5px] font-extrabold text-ink">{t.name}</p>
                  <p className="text-[11px] font-medium text-muted">
                    {t.role} · {t.country}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 overflow-hidden border-t border-line pt-6">
          <p className="mb-4 text-center text-[10.5px] font-extrabold uppercase tracking-[0.18em] text-muted">
            Active sourcing regions
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {REGIONS.map((r) => (
              <span key={r} className="text-[13px] font-semibold text-ink/45">
                {r}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
