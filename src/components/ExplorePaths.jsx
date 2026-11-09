import { ArrowRight, Building2, Handshake, Info, Mail, PackageSearch } from 'lucide-react'
import { Link } from 'react-router-dom'

const paths = [
  {
    icon: PackageSearch,
    title: 'محصولات عمده',
    text: 'کاتالوگ کامل محصولات آرایشی، مصرفی و ارگانیک با حداقل سفارش مشخص.',
    to: '/products',
  },
  {
    icon: Building2,
    title: 'تأمین‌کنندگان',
    text: 'تولیدکنندگان بررسی‌شده و ظرفیت صادرات هر یک.',
    to: '/suppliers',
  },
  {
    icon: Handshake,
    title: 'شرایط عمده‌فروشی',
    text: 'مراحل استعلام، نمونه، قرارداد و حمل‌ونقل تجمیعی.',
    to: '/wholesale',
  },
  {
    icon: Info,
    title: 'همکاری با ما',
    text: 'برند اختصاصی، نمایندگی توزیع و همکاری بازارگاهی.',
    to: '/partnership',
  },
  {
    icon: Building2,
    title: 'درباره MR Store',
    text: 'داستان ما، ارزش‌ها و مسیر رشد در تجارت طبیعی.',
    to: '/about',
  },
  {
    icon: Mail,
    title: 'تماس و استعلام',
    text: 'گفتگو با کارشناس تجارت و ثبت درخواست همکاری.',
    to: '/contact',
  },
]

export default function ExplorePaths() {
  return (
    <section className="bg-mist py-14 lg:py-20">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow">
            <span className="h-px w-7 bg-gradient-to-r from-gold to-transparent" />
            مسیرهای همکاری
          </p>
          <h2 className="mt-3 text-2xl font-bold text-navy sm:text-[1.75rem]">
            از کجا شروع می‌کنید؟
          </h2>
          <p className="mt-3 text-sm leading-[1.95] text-ink/60">
            هر مسیر شما را به یک کارشناس تجارت اختصاصی متصل می‌کند؛ از انتخاب محصول تا استعلام قیمت
            عمده.
          </p>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paths.map(({ icon: Icon, title, text, to }) => (
            <Link
              key={title}
              to={to}
              className="group flex items-start gap-4 rounded-2xl border border-navy/10 bg-white p-5 transition duration-400 hover:-translate-y-1 hover:border-gold/40 hover:shadow-card"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-mint text-emerald-brand transition group-hover:bg-emerald-brand group-hover:text-white">
                <Icon size={19} />
              </span>
              <span className="flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold text-navy">{title}</span>
                  <ArrowRight
                    size={15}
                    className="shrink-0 text-ink/30 transition group-hover:-translate-x-1 group-hover:text-emerald-brand"
                  />
                </span>
                <span className="mt-1 block text-[12px] leading-[1.85] text-ink/55">{text}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
