import Icon from '../icons.jsx'
import { TRUST } from '../../data/catalog.js'

export default function TrustStrip() {
  return (
    <section className="border-b border-line bg-white">
      <div className="shell grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {TRUST.map((item, i) => (
          <div
            key={item.title}
            className={`flex items-start gap-4 py-6 sm:px-6 ${i === 0 ? 'sm:pl-0' : ''} ${
              i === TRUST.length - 1 ? 'sm:pr-0' : ''
            }`}
          >
            <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
              <Icon name={item.icon} className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-[14.5px] font-extrabold tracking-tight text-ink">{item.title}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-muted">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
