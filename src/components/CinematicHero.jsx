import { ArrowDown, ArrowRight, MessageSquareQuote, Ship } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useShop } from '../lib/store'

const DESKTOP_VIDEO = '/hero-cinematic.mp4'
const MOBILE_VIDEO = '/hero-cinematic-mobile.mp4'
const POSTER = '/hero-poster.jpg'
const FALLBACK = '/hero-banner.gif'

const stats = [
  { value: '۱۲٫۴۰۰+', label: 'تأمین‌کننده تأییدشده' },
  { value: '۱۸۰+', label: 'کشور مقصد' },
  { value: '۳', label: 'صنعت اصلی' },
]

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const isSmallScreen = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 820px)').matches

/**
 * Cinematic hero: the video's playback head follows the scroll position.
 * Scroll progress is written straight to CSS custom properties and the
 * <video> element — never to React state — so the page never re-renders while
 * scrolling. One passive listener + one rAF pass per frame.
 */
export default function CinematicHero() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const copyRef = useRef(null)
  const hintRef = useRef(null)
  const [videoSrc, setVideoSrc] = useState(DESKTOP_VIDEO)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [reduced, setReduced] = useState(true)
  const { openQuote } = useShop()

  const staticMode = reduced || failed

  // Pick the lighter mobile source once, before the video element mounts.
  useEffect(() => {
    setReduced(prefersReducedMotion())
    setVideoSrc(isSmallScreen() ? MOBILE_VIDEO : DESKTOP_VIDEO)
  }, [])

  const handleReady = useCallback(() => {
    const video = videoRef.current
    if (video && video.currentTime === 0) video.currentTime = 0.001
    setReady(true)
  }, [])

  const handleError = useCallback(() => setFailed(true), [])

  /* Scroll-driven scrubbing */
  useEffect(() => {
    if (staticMode) return
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    let frame = 0
    let lastProgress = -1
    let lastFade = -1
    let target = 0

    /* Browsers drop a new seek while another is in flight, so the desired
       time is kept here and re-applied once the current seek settles. */
    const requestSeek = () => {
      if (video.seeking || video.readyState < 2) return
      if (Math.abs(video.currentTime - target) > 0.015) video.currentTime = target
    }

    const update = () => {
      frame = 0
      const rect = section.getBoundingClientRect()
      const distance = rect.height - window.innerHeight
      if (distance <= 0) return

      const progress = Math.min(1, Math.max(0, -rect.top / distance))

      // Copy leaves early and gently; it never lingers over the footage.
      const fade = Math.min(1, Math.max(0, (progress - 0.12) / 0.3))

      if (fade !== lastFade) {
        lastFade = fade
        // Written straight to the element: a composited opacity driven only by
        // an inherited custom property can fail to repaint.
        if (copyRef.current) {
          copyRef.current.style.opacity = (1 - fade).toFixed(3)
          copyRef.current.style.transform = `translate3d(0, ${(-4 * fade).toFixed(2)}rem, 0)`
          copyRef.current.style.pointerEvents = fade > 0.92 ? 'none' : ''
        }
      }

      if (progress === lastProgress) return
      lastProgress = progress

      if (hintRef.current) {
        const hint = Math.max(0, 1 - progress * 9).toFixed(3)
        if (hint !== hintRef.current.style.opacity) hintRef.current.style.opacity = hint
      }

      const duration = video.duration
      if (!duration || !Number.isFinite(duration)) return

      // Land exactly on the final frame at the end of the section.
      target = progress >= 1 ? duration - 0.001 : progress * duration
      requestSeek()
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    video.addEventListener('seeked', requestSeek)

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      video.removeEventListener('seeked', requestSeek)
      if (frame) cancelAnimationFrame(frame)
      const copy = copyRef.current
      if (copy) copy.style.pointerEvents = ''
    }
  }, [staticMode, videoSrc])

  return (
    <section
      ref={sectionRef}
      className={`cinematic-hero ${ready ? 'is-ready' : ''} ${staticMode ? 'is-static' : ''}`}
      aria-labelledby="hero-title"
    >
      <div className="cinematic-hero__stage">
        {/* Existing hero artwork stays underneath: no blank frame, ever. */}
        <img
          className="cinematic-media"
          src={staticMode ? POSTER : FALLBACK}
          alt=""
          aria-hidden="true"
          decoding="async"
        />

        {!staticMode && (
          <video
            ref={videoRef}
            className="cinematic-video cinematic-media"
            src={videoSrc}
            poster={POSTER}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            aria-hidden="true"
            tabIndex={-1}
            onLoadedData={handleReady}
            onCanPlay={handleReady}
            onError={handleError}
          />
        )}

        <div className="cinematic-scrim" aria-hidden="true" />

        {/* Brand mark — the site renders without a navigation header */}
        <div className="absolute inset-x-0 top-0 z-20">
          <div className="container-page flex items-center justify-between gap-4 py-5 lg:py-6">
            <Link to="/" className="flex items-center gap-3" aria-label="MR Store — صفحه اصلی">
              <span className="grid h-11 w-11 place-items-center rounded-2xl border border-gold/40 bg-navy-deep/50 font-display text-base font-semibold text-gold-soft backdrop-blur">
                MR
              </span>
              <span className="leading-tight">
                <span className="block font-display text-lg font-semibold tracking-[0.18em] text-white">
                  MR STORE
                </span>
                <span lang="fa" className="hidden text-[11px] text-white/55 sm:block">
                  بازار عمده‌فروشی بین‌المللی
                </span>
              </span>
            </Link>

            <Link
              to="/contact"
              className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-white/20 bg-navy-deep/30 px-3 py-2 text-[11px] font-semibold text-white/80 backdrop-blur transition hover:border-gold/60 hover:text-gold-soft sm:px-4 sm:text-sm"
            >
              <MessageSquareQuote size={15} className="shrink-0 text-gold" />
              <span className="sm:hidden">گفتگوی تجاری</span>
              <span className="hidden sm:inline">گفتگو با کارشناس تجارت</span>
              <ArrowRight size={14} className="hidden transition group-hover:translate-x-1 sm:block" />
            </Link>
          </div>
        </div>

        {/* Copy — fades away as soon as the footage takes over */}
        <div className="relative z-10 flex h-full items-end">
          <div
            ref={copyRef}
            lang="fa"
            className="container-page cinematic-copy pb-16 pt-28 sm:pb-20 lg:pb-24"
          >
            <p className="eyebrow">
              <span className="h-px w-8 bg-gradient-to-r from-gold to-transparent" />
              بازار عمده‌فروشی بین‌المللی
            </p>

            <h1
              id="hero-title"
              className="mt-5 max-w-4xl text-[1.95rem] font-bold leading-[1.5] text-white sm:text-[2.6rem] lg:text-[3.35rem]"
            >
              تأمین عمده از
              <span className="relative mx-2 inline-block text-gold-soft">
                تأمین‌کنندگان معتبر
                <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-gold/0 via-gold/70 to-gold/0" />
              </span>
              جهان
            </h1>

            <p className="mt-5 max-w-xl text-[15px] leading-[2] text-white/75 sm:text-base">
              MR Store خریداران بین‌المللی را به تولیدکنندگان و تأمین‌کنندگان کالاهای آرایشی و
              بهداشتی، مصرفی سریع‌المصرف و محصولات ارگانیک متصل می‌کند — با حداقل سفارش شفاف، اسناد
              صادراتی کامل و حمل‌ونقل تجمیعی.
            </p>

            <p className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-3.5 py-1.5 text-[11px] font-medium text-gold-soft sm:text-xs">
              <Ship size={14} className="shrink-0" />
              <span className="hidden sm:inline">تمام محصولات فقط به صورت عمده عرضه می‌شوند</span>
              <span className="sm:hidden">فقط عرضه عمده</span>
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

            <dl className="mt-10 hidden max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6 sm:grid">
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
        </div>

        {!staticMode && (
          <div
            ref={hintRef}
            className="cinematic-hint pointer-events-none absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-2 text-[11px] font-medium text-white/60"
          >
            <span>برای ورود، اسکرول کنید</span>
            <ArrowDown size={16} className="cinematic-hint__arrow text-gold-soft" />
          </div>
        )}

        {!staticMode && !ready && !failed && (
          <div className="cinematic-loader z-30">
            <span className="text-[10px] font-medium tracking-[0.14em] text-white/55">
              در حال آماده‌سازی تصویر
            </span>
            <span className="cinematic-loader__track" />
          </div>
        )}
      </div>
    </section>
  )
}
