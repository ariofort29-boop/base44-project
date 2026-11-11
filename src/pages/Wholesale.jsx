import { ArrowRight, ClipboardList, Handshake, Ship } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import SectionHeading from '../components/SectionHeading'
import { useShop } from '../lib/store'

const steps = [
  {
    icon: ClipboardList,
    title: 'نیاز خود را ارسال کنید',
    text: 'مشخصات محصول، حجم سفارش، بسته‌بندی و بازار مقصد را بفرستید. تیم ما تا ۲۴ ساعت امکان‌سنجی را اعلام می‌کند.',
  },
  {
    icon: Handshake,
    title: 'انتخاب، نمونه و مذاکره',
    text: 'تولیدکنندگان بررسی‌شده را معرفی می‌کنیم، نمونه هماهنگ می‌شود و حداقل سفارش، زمان تحویل و شرایط پرداخت نهایی می‌شود.',
  },
  {
    icon: Ship,
    title: 'قرارداد و حمل',
    text: 'ثبت سفارش با بازرسی، بررسی برچسب‌گذاری و حمل تجمیعی تا انبار شما انجام می‌شود.',
  },
]

const terms = [
  ['حداقل سفارش', 'از یک پالت · بار کامل کانتینر برای کالاهای مصرفی'],
  ['زمان تحویل', '۱۵ تا ۳۵ روز بر اساس تولید و بسته‌بندی'],
  ['شرایط پرداخت', 'پیش‌پرداخت و مانده، اعتبار اسنادی یا پرداخت امانی'],
  ['بسته‌بندی', 'آماده عرضه، برند اختصاصی یا فله صنعتی'],
  ['اسناد', 'گواهی مبدأ، گواهی بهداشت، برگه ایمنی و فهرست مواد'],
  ['حمل', 'FOB، CIF، DAP و DDP به بیش از ۱۸۰ کشور'],
]

export default function Wholesale() {
  const { openQuote } = useShop()

  return (
    <>
      <PageHeader
        eyebrow="برنامه عمده‌فروشی"
        title="خرید عمده با اطمینان"
        description="یک فرایند ساختاریافته تأمین برای واردکنندگان، توزیع‌کنندگان و زنجیره‌های خرده‌فروشی — از نخستین نمونه تا برنامه‌های کانتینری مستمر."
      >
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => openQuote('general')} className="btn-gold">
            استعلام قیمت عمده <ArrowRight size={15} />
          </button>
          <Link to="/contact" className="btn-secondary">
            گفتگو با کارشناس تجارت
          </Link>
        </div>
      </PageHeader>

      <section className="bg-surface py-14 lg:py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="فرایند کار"
            title="سه گام از استعلام تا تحویل"
            description="شما با یک مدیر بازرگانی کار می‌کنید که تأمین‌کنندگان، نمونه‌ها، کنترل کیفیت و حمل را هماهنگ می‌کند."
          />
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <article key={title} className="card-surface p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-mint text-emerald-soft">
                    <Icon size={20} />
                  </span>
                  <span className="font-display text-2xl text-gold/40">0{index + 1}</span>
                </div>
                <h3 className="mt-4 text-base font-bold text-ivory">{title}</h3>
                <p className="mt-2 text-[13px] leading-[1.95] text-sage/60">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-2 py-14 lg:py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow">
              <span className="h-px w-7 bg-gradient-to-r from-gold to-transparent" />
              شرایط تجاری
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-[1.6] text-ivory">
              شرایطی که با کسب‌وکار واقعی واردات می‌خواند
            </h2>
            <p className="mt-3 max-w-lg text-[13px] leading-[1.95] text-sage/60">
              هر پیش‌فاکتور همین شش متغیر را شفاف اعلام می‌کند تا تأمین‌کنندگان را در شرایط برابر
              مقایسه کنید و هزینه نهایی را پیش از تعهد برنامه‌ریزی کنید.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/products" className="btn-primary">
                مشاهده محصولات
              </Link>
              <Link to="/contact" className="btn-outline">
                درخواست شرایط
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-line/10 bg-surface">
            <dl className="divide-y divide-navy/8">
              {terms.map(([label, value]) => (
                <div
                  key={label}
                  className="grid gap-1 px-5 py-3.5 sm:grid-cols-[150px_1fr] sm:items-center"
                >
                  <dt className="text-[11px] font-semibold text-sage/45">{label}</dt>
                  <dd className="text-[13px] leading-relaxed text-sage/75">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-navy py-14">
        <div className="container-page flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              برنامه فصلی در پیش دارید؟
            </h2>
            <p className="mt-2 max-w-xl text-[13px] leading-[1.95] text-white/60">
              پیش‌بینی فروش خود را با ما در میان بگذارید تا ظرفیت تولید کالاهای کلیدی شما رزرو شود.
            </p>
          </div>
          <button type="button" onClick={() => openQuote('general')} className="btn-gold shrink-0">
            استعلام قیمت عمده <ArrowRight size={15} />
          </button>
        </div>
      </section>
    </>
  )
}
