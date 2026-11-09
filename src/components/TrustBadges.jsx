import { BadgeCheck, Headset, Leaf, Ship } from 'lucide-react'
import { assuranceBadges } from '../data/catalog'

const icons = {
  leaf: Leaf,
  badge: BadgeCheck,
  ship: Ship,
  headset: Headset,
}

export default function TrustBadges() {
  return (
    <section className="border-b border-navy/8 bg-white">
      <div className="container-page grid gap-x-6 gap-y-5 py-7 sm:grid-cols-2 lg:grid-cols-4">
        {assuranceBadges.map(({ titleFa, textFa, icon }) => {
          const Icon = icons[icon] ?? BadgeCheck
          return (
            <div key={titleFa} className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-mint text-emerald-brand">
                <Icon size={18} />
              </span>
              <div>
                <p className="text-[13px] font-bold text-navy">{titleFa}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-ink/55">{textFa}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
