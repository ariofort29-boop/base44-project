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
    <section className="border-t border-ink/8 bg-white py-10">
      <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {assuranceBadges.map((badge) => {
          const Icon = icons[badge.icon]
          return (
            <div key={badge.title} className="flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-mint text-forest">
                <Icon size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{badge.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-ink/55">{badge.text}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
