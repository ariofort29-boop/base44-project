import { ArrowRight, Container, FileCheck2, Headset } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useShop } from '../lib/store'

const points = [
  { icon: Container, title: 'بار ترکیبی', text: 'چند تأمین‌کننده در یک محموله تجمیع می‌شود.' },
  { icon: FileCheck2, title: 'اسناد صادرات', text: 'گواهی مبدأ، گواهی بهداشت و پشتیبانی برچسب‌گذاری.' },
  { icon: Headset, title: 'مدیر اختصاصی', text: 'یک مدیر حساب از استعلام تا تحویل.' },
]

export default function WholesaleBand() {
  const { openQuote } = useShop()

  return (
    <section className="bg-white pb-14 lg:pb-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1600&q=80"
            alt="انبار عمده‌فروشی با کالاهای پالت‌بندی‌شده"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/96 via-navy/90 to-botanical/50" />

          <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:p-12">
            <div>
              <p className="eyebrow">
                <span className="h-px w-7 bg-gradient-to-r from-gold to-transparent" />
                برنامه عمده‌فروشی
              </p>
              <h2 className="mt-3 max-w-lg text-2xl font-bold leading-[1.6] text-white sm:text-[1.9rem]">
                خرید عمده برای کسب‌وکار شما
              </h2>
              <p className="mt-3 max-w-md text-sm leading-[1.95] text-white/65">
                از یک پالت تا برنامه‌های کانتینری مستمر — شرایط شفاف، استاندارد کیفیت توافق‌شده و
                برنامه تأمین متناسب با بازار شما.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" onClick={() => openQuote('general')} className="btn-gold">
                  استعلام قیمت عمده <ArrowRight size={15} />
                </button>
                <Link to="/wholesale" className="btn-secondary">
                  شرایط عمده‌فروشی
                </Link>
              </div>
            </div>

            <ul className="space-y-3">
              {points.map(({ icon: Icon, title, text }) => (
                <li
                  key={title}
                  className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/[0.08] p-3.5 backdrop-blur"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gold/15 text-gold-soft">
                    <Icon size={17} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-white/55">{text}</p>
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
