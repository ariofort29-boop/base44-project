import { ArrowRight, BadgeCheck, Globe2, Leaf, MessageSquareQuote, Ship } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { countries } from '../data/catalog'
import { useShop } from '../lib/store'

const stats = [
  { value: '۱۲٫۴۰۰+', label: 'تأمین‌کننده تأییدشده' },
  { value: '۱۸۰+', label: 'کشور مقصد' },
  { value: '۳', label: 'صنعت اصلی' },
]

export default function Hero() {
  const sectionRef = useRef(null)
  const panelRef = useRef(null)
  const { openQuote } = useShop()

  /* Scroll parallax + 3D tilt, driven by one rAF loop per frame. */
  useEffect(() => {
    const section = sectionRef.current
    const panel = panelRef.current
    if (!section || !panel) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0

    const update = () => {
      frame = 0
      const rect = section.getBoundingClientRect()
      const viewport = window.innerHeight || 1
      // 0 at first paint, 1 once the hero has scrolled fully past viewport top
      const progress = Math.min(1, Math.max(0, -rect.top / (rect.height + viewport * 0.35)))
      section.style.setProperty('--parallax', progress.toFixed(4))
      section.style.setProperty('--scroll-tilt', `${(progress * 7).toFixed(2)}deg`)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  /* Pointer tilt — desktop pointers only. */
  const handlePointerMove = (event) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const panel = panelRef.current
    if (!panel) return
    const rect = panel.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    panel.style.setProperty('--ry', `${(x * 7).toFixed(2)}deg`)
    panel.style.setProperty('--rx', `${(1.5 - y * 5).toFixed(2)}deg`)
  }

  const resetTilt = () => {
    const panel = panelRef.current
    if (!panel) return
    panel.style.setProperty('--ry', '-4deg')
    panel.style.setProperty('--rx', '2deg')
  }

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-navy text-white"
      aria-labelledby="hero-title"
    >
      {/* Ambient depth lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-[-10%] h-[420px] w-[420px] rounded-full bg-emerald-brand/25 blur-[120px]" />
        <div className="absolute right-[-8%] top-1/3 h-[520px] w-[520px] rounded-full bg-botanical/20 blur-[140px]" />
        <div className="absolute bottom-[-25%] left-1/3 h-[420px] w-[620px] rounded-full bg-gold/10 blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(236,217,172,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(236,217,172,0.16) 1px, transparent 1px)',
            backgroundSize: '82px 82px',
            maskImage: 'radial-gradient(ellipse at 50% 30%, #000 10%, transparent 72%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, #000 10%, transparent 72%)',
          }}
        />
      </div>

      <div className="container-page relative pb-16 pt-7 lg:pb-24 lg:pt-8">
        {/* Brand mark — the site renders without a navigation header */}
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3" aria-label="MR Store — صفحه اصلی">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-gold/40 bg-white/5 font-display text-base font-semibold text-gold-soft">
              MR
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg font-semibold tracking-[0.18em] text-white">
                MR STORE
              </span>
              <span lang="fa" className="block text-[11px] text-white/55">
                بازار عمده‌فروشی بین‌المللی
              </span>
            </span>
          </Link>

          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/80 transition hover:border-gold/60 hover:text-gold-soft sm:text-sm"
          >
            <MessageSquareQuote size={15} className="text-gold" />
            گفتگو با کارشناس تجارت
            <ArrowRight size={14} className="hidden transition group-hover:translate-x-1 sm:block" />
          </Link>
        </div>

        <div className="mt-12 grid items-center gap-12 lg:mt-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
          {/* Copy */}
          <div lang="fa" className="min-w-0 animate-fade-up">
            <p className="eyebrow">
              <span className="h-px w-8 bg-gradient-to-r from-gold to-transparent" />
              بازار عمده‌فروشی بین‌المللی
            </p>

            <h1
              id="hero-title"
              className="mt-5 text-[2rem] font-bold leading-[1.5] text-white sm:text-[2.6rem] lg:text-[3.05rem]"
            >
              تأمین عمده از
              <span className="relative mx-2 inline-block text-gold-soft">
                تأمین‌کنندگان معتبر
                <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-gold/0 via-gold/70 to-gold/0" />
              </span>
              جهان
            </h1>

            <p className="mt-5 max-w-xl text-[15px] leading-[2] text-white/70 sm:text-base">
              MR Store خریداران بین‌المللی را به تولیدکنندگان و تأمین‌کنندگان کالاهای آرایشی و
              بهداشتی، مصرفی سریع‌المصرف و محصولات ارگانیک متصل می‌کند — با حداقل سفارش شفاف، اسناد
              صادراتی کامل و حمل‌ونقل تجمیعی.
            </p>

            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-3.5 py-1.5 text-xs font-medium text-gold-soft">
              <Ship size={14} />
              تمام محصولات فقط به صورت عمده عرضه می‌شوند
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="btn-gold">
                مشاهده محصولات عمده
                <ArrowRight size={16} />
              </Link>
              <button type="button" onClick={() => openQuote('general')} className="btn-secondary">
                استعلام قیمت عمده
              </button>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <p className="text-xl font-bold text-gold-soft sm:text-2xl">{stat.value}</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-white/50">{stat.label}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* 3D banner scene */}
          <div
            className="scene min-w-0 animate-fade-up-slow"
            onPointerMove={handlePointerMove}
            onPointerLeave={resetTilt}
          >
            <div className="relative">
              <div
                ref={panelRef}
                className="scene-panel relative overflow-hidden rounded-[26px] border border-white/15 shadow-[0_60px_120px_-45px_rgba(0,0,0,0.95)] sm:rounded-[30px]"
              >
                <div className="scene-layers rounded-[26px] sm:rounded-[30px]">
                  <div className="scene-shift">
                    <img
                      className="scene-image"
                      src="/hero-banner.gif"
                      alt="بندر بین‌المللی با کشتی کانتینری، نقشه شبکه جهانی تجارت و محصولات طبیعی در پیش‌زمینه"
                      width="764"
                      height="508"
                      fetchpriority="high"
                      decoding="async"
                    />
                  </div>
                  <div className="scene-glint" aria-hidden="true" />
                  <div className="scene-depth-shadow" aria-hidden="true" />
                  <div className="scene-sheen" aria-hidden="true" />
                  <div className="pointer-events-none absolute inset-0 rounded-[26px] ring-1 ring-inset ring-white/12 sm:rounded-[30px]" />
                </div>

                {/* Spacer gives the panel its aspect ratio; the scene layers fill it */}
                <div className="aspect-[3/2] w-full" />

                <div className="scene-badge absolute right-3 top-3 hidden rounded-2xl bg-navy-deep/55 px-3 py-2 text-[11px] font-semibold text-white/85 ring-1 ring-white/15 backdrop-blur-md sm:flex sm:items-center sm:gap-2">
                  <Globe2 size={14} className="text-gold-soft" />
                  شبکه تجارت جهانی
                </div>
              </div>

              {/* Floating glass cards that move in front of the scene in 3D */}
              <div className="scene-chip absolute -bottom-5 left-2 flex items-center gap-2.5 rounded-2xl border border-white/20 bg-navy-deep/70 px-3.5 py-2.5 backdrop-blur-xl sm:-bottom-6 sm:left-6">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-brand/30 text-emerald-soft">
                  <BadgeCheck size={16} />
                </span>
                <span lang="fa" className="text-[11px] font-semibold leading-tight text-white/85">
                  تأمین‌کننده تأییدشده
                </span>
              </div>

              <div className="scene-chip absolute -top-4 left-4 hidden items-center gap-2.5 rounded-2xl border border-white/20 bg-navy-deep/70 px-3.5 py-2.5 backdrop-blur-xl sm:flex">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-gold/20 text-gold-soft">
                  <Leaf size={16} />
                </span>
                <span lang="fa" className="text-[11px] font-semibold leading-tight text-white/85">
                  طبیعی و ارگانیک
                </span>
              </div>
            </div>

            {/* Partner markets from the banner's flag strip */}
            <div
              lang="fa"
              className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur"
            >
              <div className="flex items-center gap-3">
                <span className="shrink-0 text-[10px] font-semibold text-gold/80">بازارهای فعال</span>
                <div className="flex flex-1 gap-x-4 gap-y-1 overflow-x-auto text-[11px] text-white/60 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {countries.map((country) => (
                    <span key={country.name} className="shrink-0 whitespace-nowrap">
                      {country.nameFa}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
