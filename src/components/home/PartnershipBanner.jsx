import Icon from '../icons.jsx'
import Button from '../ui/Button.jsx'

const tracks = [
  {
    id: 'buyers',
    eyebrow: 'For international buyers',
    title: 'Source with confidence, not guesswork',
    text: 'Access verified factories, transparent wholesale tiers and consolidated freight — without hiring a local agent.',
    points: [
      'Manufacturer audits & trade references',
      'Sample coordination before you commit',
      'Consolidated shipping and export documents',
    ],
    cta: 'Start sourcing',
    to: '/wholesale',
    dark: false,
    icon: 'users',
  },
  {
    id: 'suppliers',
    eyebrow: 'For manufacturers & suppliers',
    title: 'Sell to buyers who are ready to order',
    text: 'List your production lines, receive qualified RFQs and grow into new export markets with our trade team beside you.',
    points: [
      'Verified buyer enquiries, no cold leads',
      'Storefront, catalogue and RFQ inbox',
      'Support with certifications and paperwork',
    ],
    cta: 'Become a supplier',
    to: '/partnership',
    dark: true,
    icon: 'box',
  },
]

export default function PartnershipBanner() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-2">
          {tracks.map((t) => (
            <article
              key={t.id}
              className={`relative flex flex-col overflow-hidden rounded-xl3 p-7 sm:p-9 ${
                t.dark
                  ? 'bg-brand-900 text-white'
                  : 'border border-line bg-sand text-ink'
              }`}
            >
              {t.dark && (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 300"
                  className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 text-white/10"
                >
                  <g fill="none" stroke="currentColor" strokeWidth="1.4">
                    <path d="M150 10c-30 50-30 90 0 140s30 90 0 140" />
                    <path d="M150 40c-50 15-72 50-65 88M150 70c50 15 72 50 65 88M150 150c-50 15-72 50-65 88" />
                  </g>
                </svg>
              )}
              <div className="relative">
                <span
                  className={`grid h-11 w-11 place-items-center rounded-xl ${
                    t.dark ? 'bg-white/10 text-white' : 'bg-white text-brand-800 shadow-sm'
                  }`}
                >
                  <Icon name={t.icon} className="h-5 w-5" />
                </span>
                <p className={`eyebrow mt-5 ${t.dark ? 'text-brand-300' : ''}`}>{t.eyebrow}</p>
                <h2
                  className={`mt-2 max-w-md text-[1.6rem] leading-tight tracking-[-0.02em] sm:text-[1.9rem] ${
                    t.dark ? 'text-white' : 'text-ink'
                  }`}
                >
                  {t.title}
                </h2>
                <p
                  className={`mt-3 max-w-md text-[14px] leading-relaxed ${
                    t.dark ? 'text-brand-100/75' : 'text-muted'
                  }`}
                >
                  {t.text}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {t.points.map((p) => (
                    <li
                      key={p}
                      className={`flex items-start gap-2.5 text-[13.5px] font-medium ${
                        t.dark ? 'text-brand-100/90' : 'text-ink/80'
                      }`}
                    >
                      <Icon
                        name="check"
                        className={`mt-0.5 h-4 w-4 shrink-0 ${t.dark ? 'text-brand-300' : 'text-brand-600'}`}
                      />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button
                    to={t.to}
                    variant={t.dark ? 'light' : 'primary'}
                    icon="arrowRight"
                    className="w-full sm:w-auto"
                  >
                    {t.cta}
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
