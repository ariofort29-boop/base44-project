import { BadgeCheck, Globe2, Leaf, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import SectionHeading from '../components/SectionHeading'

const values = [
  {
    icon: ShieldCheck,
    title: 'اعتماد پیش از حجم',
    text: 'تأمین‌کنندگان پیش از عرضه نخستین محصول، از نظر گواهی، ظرفیت و سابقه صادرات بررسی می‌شوند.',
  },
  {
    icon: Leaf,
    title: 'طبیعی به‌صورت پیش‌فرض',
    text: 'در همه دسته‌ها اولویت ما تولید ارگانیک، گیاهی و کم‌دخالت است.',
  },
  {
    icon: Globe2,
    title: 'جهانی از ابتدای طراحی',
    text: 'اسناد، برچسب‌گذاری و لجستیک از روز اول برای تجارت فرامرزی طراحی شده‌اند.',
  },
  {
    icon: BadgeCheck,
    title: 'شرایط شفاف',
    text: 'حداقل سفارش، زمان تحویل، بسته‌بندی و شرایط پرداخت از ابتدا اعلام می‌شود.',
  },
]

const milestones = [
  ['۱۳۹۳', 'آغاز فعالیت به‌عنوان میز بازرگانی منطقه‌ای محصولات آرایشی طبیعی.'],
  ['۱۳۹۷', 'ورود به توزیع کالاهای مصرفی در خلیج فارس و CIS.'],
  ['۱۴۰۱', 'راه‌اندازی بازارگاه MR Store با ۱٫۲۰۰ تأمین‌کننده تأییدشده.'],
  ['۱۴۰۴', '۱۲٫۴۰۰ تأمین‌کننده، بیش از ۱۸۰ بازار مقصد و مراکز لجستیک تجمیعی.'],
]

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="درباره MR Store"
        title="طبیعت ارزش می‌آفریند، تجارت آن را جهانی می‌کند"
        description="MR Store خریداران بین‌المللی را به تولیدکنندگان و تأمین‌کنندگان محصولات آرایشی، کالاهای مصرفی و ارگانیک متصل می‌کند؛ بر پایه تأمین بررسی‌شده و شرایط شفاف."
      />

      <section className="bg-surface py-14 lg:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow">
              <span className="h-px w-7 bg-gradient-to-r from-gold to-transparent" />
              داستان ما
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-[1.6] text-ivory">
              یک خانه بازرگانی برای دهه پیش‌روی محصولات طبیعی
            </h2>
            <p className="mt-4 text-[13px] leading-[2] text-sage/70">
              کار خود را با یک میز صادرات کوچک برای تأمین مواد اولیه گیاهی برندهای اروپایی آغاز
              کردیم. امروز MR Store بازارگاهی است که خریداران در آن تأمین‌کنندگان را در شرایط برابر
              مقایسه می‌کنند و تولیدکنندگان به بازارهایی می‌رسند که پیش‌تر دسترسی نداشتند.
            </p>
            <p className="mt-3 text-[13px] leading-[2] text-sage/70">
              تیم ما میان دو سوی هر معامله می‌ایستد: بررسی تولیدکنندگان، کنترل گواهی‌ها، تجمیع
              محموله‌ها و تضمین شرایطی که اعلام می‌کنیم.
            </p>
            <Link to="/contact" className="btn-primary mt-6">
              گفتگو با تیم ما
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80"
              alt="گیاهان خشک و ادویه روی میز بازار"
              loading="lazy"
              decoding="async"
              className="col-span-2 h-52 w-full rounded-2xl object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80"
              alt="شیشه‌های عسل طبیعی"
              loading="lazy"
              decoding="async"
              className="h-40 w-full rounded-2xl object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80"
              alt="محصولات مراقبت پوست طبیعی"
              loading="lazy"
              decoding="async"
              className="h-40 w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-surface-2 py-14 lg:py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="ارزش‌های ما"
            title="چهار اصلی که هر معامله را می‌سازد"
            description="این اصول در نحوه انتخاب تأمین‌کننده، تدوین شرایط و پاسخ‌گویی ما مشخص است."
          />
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border border-line/10 bg-surface p-5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-mint text-emerald-soft">
                  <Icon size={18} />
                </span>
                <h3 className="mt-4 text-sm font-bold text-ivory">{title}</h3>
                <p className="mt-2 text-[12px] leading-[1.95] text-sage/60">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-14 lg:py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">
              <span className="h-px w-7 bg-gradient-to-r from-gold to-transparent" />
              مسیر ما
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-[1.6] text-ivory">
              از یک میز صادرات تا شبکه جهانی
            </h2>
          </div>
          <ol className="relative border-r border-line/10 pr-6">
            {milestones.map(([year, text]) => (
              <li key={year} className="relative pb-6 last:pb-0">
                <span className="absolute -right-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-gold ring-4 ring-gold/15" />
                <p className="text-sm font-bold text-emerald-soft">{year}</p>
                <p className="mt-1 text-[13px] leading-[1.95] text-sage/65">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
