import { ArrowRight, BadgeCheck, Layers, Megaphone, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import SectionHeading from '../components/SectionHeading'
import { useShop } from '../lib/store'

const programmes = [
  {
    icon: Layers,
    title: 'برند اختصاصی',
    text: 'برند خود را روی فرمولاسیون‌های آزموده با شرکای تولید دارای گواهی و برچسب‌گذاری منطبق توسعه دهید.',
    points: ['انطباق فرمولاسیون', 'بسته‌بندی و طرح گرافیکی', 'تیراژ تولید از ۳٫۰۰۰ واحد'],
  },
  {
    icon: Truck,
    title: 'شریک توزیع',
    text: 'توافق‌نامه منطقه‌ای انحصاری برای واردکنندگان و توزیع‌کنندگان با انبارش و انطباق محلی.',
    points: ['انحصار منطقه‌ای', 'بسته‌های بازاریابی', 'پشتیبانی برنامه‌ریزی موجودی'],
  },
  {
    icon: Megaphone,
    title: 'شریک بازارگاه',
    text: 'آژانس‌ها، بازارگاه‌ها و زنجیره‌های خرده‌فروشی که خریداران واجد شرایط را به شبکه ما معرفی می‌کنند.',
    points: ['شرایط معرفی مشتری', 'میز خریدار اختصاصی', 'بازبینی فصلی'],
  },
]

export default function Partnership() {
  const { openQuote } = useShop()

  return (
    <>
      <PageHeader
        eyebrow="همکاری"
        title="با شبکه MR Store رشد کنید"
        description="چه تولیدکننده باشید، چه توزیع‌کننده یا نماینده خریداران، همکاری‌های تجاری بلندمدت را بر پایه توانمندی‌های شما می‌سازیم."
      >
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => openQuote('general')} className="btn-gold">
            درخواست همکاری <ArrowRight size={15} />
          </button>
          <Link to="/contact" className="btn-secondary">
            تماس با ما
          </Link>
        </div>
      </PageHeader>

      <section className="bg-surface py-14 lg:py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="برنامه‌ها"
            title="سه مسیر برای همکاری"
            description="هر برنامه با یک جلسه بررسی تناسب تجاری، محدوده مشخص و اهداف فصلی قابل اندازه‌گیری آغاز می‌شود."
          />
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {programmes.map(({ icon: Icon, title, text, points }) => (
              <article key={title} className="card-surface flex flex-col p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-mint text-emerald-soft">
                  <Icon size={20} />
                </span>
                <h2 className="mt-4 text-lg font-bold text-ivory">{title}</h2>
                <p className="mt-2 text-[13px] leading-[1.95] text-sage/60">{text}</p>
                <ul className="mt-4 space-y-2">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-[13px] text-sage/70">
                      <BadgeCheck size={16} className="mt-0.5 shrink-0 text-emerald-soft" />
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-soft hover:text-botanical"
                >
                  ثبت درخواست <ArrowRight size={14} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-2 py-14 lg:py-16">
        <div className="container-page grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">
              <span className="h-px w-7 bg-gradient-to-r from-gold to-transparent" />
              آنچه ارائه می‌دهیم
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-[1.6] text-ivory">
              زیرساخت تجارت، نه فقط معرفی
            </h2>
            <p className="mt-3 text-[13px] leading-[1.95] text-sage/60">
              شرکای ما به تأمین بررسی‌شده، لجستیک تجمیعی، بازرسی کیفیت و پشتیبانی اسناد دسترسی دارند —
              همان لایه عملیاتی که تجارت فرامرزی را قابل اتکا می‌کند.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ['۱۲٫۴۰۰+', 'تأمین‌کننده تأییدشده'],
              ['۱۸۰+', 'کشور مقصد'],
              ['۲۴ ساعت', 'زمان پاسخ استعلام'],
              ['۹۸٫۶٪', 'ارسال به‌موقع'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-line/10 bg-surface p-5">
                <p className="text-xl font-bold text-emerald-soft">{value}</p>
                <p className="mt-1 text-[11px] text-sage/50">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
