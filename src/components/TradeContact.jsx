import { ArrowRight, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { contactDetails } from '../data/catalog'
import { useShop } from '../lib/store'

const lines = [
  { icon: Mail, label: 'ایمیل بازرگانی', value: contactDetails.email },
  { icon: Phone, label: 'تلفن', value: contactDetails.phone },
  { icon: MapPin, label: 'دفتر مرکزی', value: contactDetails.offices },
  { icon: Clock, label: 'زمان پاسخ', value: contactDetails.response },
]

export default function TradeContact() {
  const { openQuote } = useShop()

  return (
    <section className="relative overflow-hidden bg-navy-deep py-14 text-white lg:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-emerald-brand/20 blur-[120px]" />
        <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-gold/10 blur-[120px]" />
      </div>

      <div className="container-page relative grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div>
          <p className="eyebrow">
            <span className="h-px w-7 bg-gradient-to-r from-gold to-transparent" />
            شروع همکاری
          </p>
          <h2 className="mt-3 max-w-xl text-2xl font-bold leading-[1.6] sm:text-[1.9rem]">
            سفارش عمده بعدی شما با یک گفتگو شروع می‌شود
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-[1.95] text-white/60">
            فهرست محصولات، حجم تقریبی و بازار مقصد را برای ما بنویسید. تیم بازرگانی MR Store شرایط
            تأمین، نمونه و حمل‌ونقل را برای شما آماده می‌کند.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" onClick={() => openQuote('general')} className="btn-gold">
              استعلام قیمت عمده <ArrowRight size={15} />
            </button>
            <Link to="/contact" className="btn-secondary">
              درخواست همکاری
            </Link>
          </div>
        </div>

        <dl className="grid gap-3 sm:grid-cols-2">
          {lines.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/12 bg-white/[0.05] p-4 backdrop-blur"
            >
              <dt className="flex items-center gap-2 text-[11px] text-white/45">
                <Icon size={13} className="text-gold-soft" />
                {label}
              </dt>
              <dd className="mt-1.5 text-sm font-semibold text-white/85">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
