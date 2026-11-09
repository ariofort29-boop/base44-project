import { ArrowRight, BadgeCheck, Globe2, ShieldCheck, Ship, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { countries, trustIndicators } from '../data/catalog'

const indicatorIcons = {
  shield: ShieldCheck,
  ship: Ship,
  badge: BadgeCheck,
}

const stats = [
  { value: '12,400+', label: 'Verified suppliers' },
  { value: '180+', label: 'Countries served' },
  { value: '3', label: 'Core industries' },
]

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-forest-deep">
      <img
        src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1800&q=80"
        alt="Container port at dusk with cargo ships and cranes"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#032b1c]/95 via-[#05452c]/90 to-[#05452c]/45" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-forest-deep to-transparent" />

      <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:py-20">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-mint backdrop-blur">
            <Sparkles size={13} /> International B2B marketplace
          </p>

          <h1 className="mt-6 max-w-2xl font-display text-4xl leading-[1.06] text-white sm:text-5xl lg:text-[3.9rem]">
            Your Trusted Partner in{' '}
            <span className="text-mint">Natural &amp; Consumer Products</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-white/90">
            Connecting global buyers with verified manufacturers and suppliers.
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65">
            Discover premium cosmetics, FMCG and organic products from trusted suppliers around the
            world — with transparent MOQs, certifications and consolidated shipping.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/products" className="inline-flex items-center gap-2 rounded-full bg-mint px-7 py-3.5 text-sm font-semibold text-forest transition hover:bg-white hover:shadow-lg">
              Explore Products <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn-secondary">
              Become a Supplier
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-white/15 pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl text-mint">{stat.value}</p>
                <p className="mt-0.5 text-[11px] uppercase tracking-[0.16em] text-white/55">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {trustIndicators.map((indicator) => {
            const Icon = indicatorIcons[indicator.icon]
            return (
              <div
                key={indicator.title}
                className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md transition hover:border-mint/50 hover:bg-white/15"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-mint text-forest">
                  <Icon size={20} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{indicator.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-white/65">{indicator.text}</p>
                </div>
              </div>
            )
          })}

          <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-forest/60 px-4 py-3 text-xs text-white/70 backdrop-blur">
            <Globe2 size={16} className="text-mint" />
            Sourcing hubs in Dubai, Istanbul and Shanghai
          </div>
        </div>
      </div>

      <div className="border-t border-white/12 bg-[#04331f]/70 backdrop-blur">
        <div className="container-page flex items-center gap-6 overflow-x-auto py-4">
          <p className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
            Sourcing from
          </p>
          <div className="flex items-center gap-6">
            {countries.map((country) => (
              <div key={country.name} className="flex shrink-0 items-center gap-2">
                <span className="text-lg leading-none">{country.flag}</span>
                <span className="text-xs font-medium text-white/75">{country.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
