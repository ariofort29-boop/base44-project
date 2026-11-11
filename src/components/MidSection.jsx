import { ArrowRight, Check, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { topCategories } from '../data/catalog'
import { useShop } from '../lib/store'

const featureCards = [
  {
    title: 'مراقبت طبیعی برای زیبایی سالم',
    text: 'مراقبت پوست، مو و زیبایی گیاهی از تولیدکنندگان دارای گواهی.',
    image:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80',
    to: '/products?category=cosmetics',
  },
  {
    title: 'ترشی و غذاهای تخمیری طبیعی',
    text: 'دستورهای سنتی با بسته‌بندی پایدار و برچسب آماده عرضه در هر بازار.',
    image:
      'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=1000&q=80',
    to: '/products?category=fmcg&q=Pickled',
  },
]

const reasons = [
  'تأمین‌کنندگان تأییدشده با کارخانه‌های بازرسی‌شده',
  'معاملات امن و تضمین تجاری',
  'لجستیک جهانی از تولیدکننده تا درب انبار',
  'پشتیبانی اختصاصی در منطقه زمانی شما',
]

export default function MidSection() {
  const { openQuote } = useShop()

  return (
    <section className="bg-surface pb-14 lg:pb-20">
      <div className="container-page grid gap-5 lg:grid-cols-12">
        <aside className="rounded-2xl border border-line/10 bg-surface-2/60 p-5 lg:col-span-3">
          <h2 className="text-lg font-bold text-ivory">دسته‌های پرطرفدار</h2>
          <ul className="mt-3 divide-y divide-navy/8">
            {topCategories.map((item) => (
              <li key={item.label}>
                <Link
                  to={`/products?category=${item.slug}&q=${encodeURIComponent(item.label)}`}
                  className="group flex items-center justify-between gap-2 py-2.5"
                >
                  <span className="text-[13px] text-sage/70 transition group-hover:text-emerald-soft">
                    {item.labelFa}
                  </span>
                  <span className="shrink-0 text-[10px] text-sage/40 transition group-hover:text-gold">
                    {item.countFa}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/products"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-soft hover:text-botanical"
          >
            همه محصولات <ArrowRight size={14} />
          </Link>
        </aside>

        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5">
          {featureCards.map((card) => (
            <Link
              key={card.title}
              to={card.to}
              className="group relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-2xl"
            >
              <img
                src={card.image}
                alt={card.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/40 to-transparent" />
              <div className="relative p-5">
                <p className="text-[10px] font-semibold text-gold-soft">مجموعه ویژه</p>
                <h3 className="mt-2 text-lg font-bold leading-relaxed text-white">{card.title}</h3>
                <p className="mt-2 text-[11px] leading-relaxed text-white/65">{card.text}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold text-white backdrop-blur transition group-hover:border-gold/50 group-hover:text-gold-soft">
                  مشاهده محصولات <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="space-y-5 lg:col-span-4">
          <div className="rounded-2xl border border-line/10 bg-surface p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-soft" />
              <h2 className="text-base font-bold text-ivory">چرا MR Store؟</h2>
            </div>
            <ul className="mt-4 space-y-3">
              {reasons.map((reason) => (
                <li key={reason} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mint text-emerald-soft">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="text-[13px] leading-[1.9] text-sage/65">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-navy p-6 text-white shadow-soft">
            <p className="text-[10px] font-semibold text-gold/90">پشتیبانی تأمین</p>
            <h3 className="mt-2 text-lg font-bold">دنبال تأمین‌کننده هستید؟</h3>
            <p className="mt-2 text-[13px] leading-[1.95] text-white/60">
              فهرست محصولات و حجم سفارش خود را بفرستید؛ تأمین‌کنندگان معتبر را در یک روز کاری به شما
              معرفی می‌کنیم.
            </p>
            <button
              type="button"
              onClick={() => openQuote('general')}
              className="mt-5 w-full rounded-full bg-gold py-2.5 text-sm font-bold text-ivory-deep transition hover:bg-gold-soft"
            >
              استعلام قیمت عمده
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
