import { useEffect, useRef, useState } from 'react'
import Icon from '../icons.jsx'
import Button from '../ui/Button.jsx'
import useScrollScrub from '../../hooks/useScrollScrub.js'

/**
 * Scroll-driven cinematic hero.
 *
 * The video never plays: it stays paused while the section is pinned and the
 * page scroll seeks its timeline from the first frame to the last. See
 * `src/hooks/useScrollScrub.js` for the scrubbing engine.
 *
 * The two encodes in /public/hero are all-intra (a keyframe on every frame) so
 * each seek decodes a single frame instead of a whole GOP — the difference
 * between buttery scrubbing and visible stutter. Audio is stripped because this
 * experience is silent.
 */
const VIDEO_SOURCES = {
  desktop: '/hero/hero-1280.mp4',
  mobile: '/hero/hero-854.mp4',
}
const POSTER = '/hero/hero-poster.jpg'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const pickSource = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
    ? VIDEO_SOURCES.mobile
    : VIDEO_SOURCES.desktop

function HeroCopy() {
  return (
    <div className="max-w-2xl">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white/90 backdrop-blur-sm sm:px-3.5 sm:text-[11px] sm:tracking-[0.14em]">
        <Icon name="badgeCheck" className="h-4 w-4" />
        Verified B2B marketplace · 140+ countries
      </span>

      <h1 className="mt-5 text-[1.9rem] leading-[1.06] tracking-[-0.03em] text-white sm:mt-6 sm:text-[3.1rem] sm:leading-[1.04] lg:text-[3.55rem]">
        Your Trusted Partner in <span className="italic text-brand-200">Natural</span> &amp;
        Consumer Products
      </h1>

      <p className="mt-4 max-w-xl text-[15px] font-semibold leading-snug text-white/90 sm:mt-5 sm:text-lg">
        Connecting Global Buyers with Verified Manufacturers and Suppliers.
      </p>
      <p className="mt-3 hidden max-w-xl text-[14.5px] leading-relaxed text-white/75 sm:block">
        Discover premium cosmetics, FMCG, and organic products from trusted suppliers around the
        world — with real MOQs, certificates and export-ready logistics.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
        <Button to="/products" variant="light" size="lg" icon="arrowRight">
          Explore Products
        </Button>
        <Button to="/partnership" variant="outlineLight" size="lg">
          Become a Supplier
        </Button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] font-semibold text-white/75 sm:mt-9 sm:gap-x-7 sm:gap-y-3 sm:text-[12.5px]">
        <span className="flex items-center gap-2">
          <Icon name="shield" className="h-4 w-4 text-brand-300" /> 12,400+ verified suppliers
        </span>
        <span className="flex items-center gap-2">
          <Icon name="truck" className="h-4 w-4 text-brand-300" /> 48h quotation response
        </span>
      </div>
    </div>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const viewportRef = useRef(null)
  const videoRef = useRef(null)
  const contentRef = useRef(null)

  const [reduced] = useState(prefersReducedMotion)
  const [source] = useState(pickSource)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  useScrollScrub({
    sectionRef,
    videoRef,
    contentRef,
    ready: ready && !failed,
    enabled: !reduced,
  })

  // The pinned viewport sits exactly below the sticky site header.
  useEffect(() => {
    if (reduced) return
    const pin = viewportRef.current
    const header = document.querySelector('header')
    const apply = () => {
      if (!pin) return
      const height = header ? Math.round(header.getBoundingClientRect().height) : 0
      pin.style.top = `${height}px`
      pin.style.height = `calc(100svh - ${height}px)`
    }
    apply()
    window.addEventListener('resize', apply)
    let observer
    if (header && 'ResizeObserver' in window) {
      observer = new ResizeObserver(apply)
      observer.observe(header)
    }
    return () => {
      window.removeEventListener('resize', apply)
      if (observer) observer.disconnect()
    }
  }, [reduced])

  // Reveal the video once it can scrub without stalling; the poster stays
  // underneath so the hero is never an empty black rectangle.
  useEffect(() => {
    const video = videoRef.current
    if (!video || reduced) return

    let settle
    const show = () => setReady(true)
    const onFirstFrame = () => {
      if (video.currentTime === 0) {
        try {
          video.currentTime = 0.001
        } catch {
          /* seeking before metadata is harmless */
        }
      }
      if (video.readyState >= 3) show()
      else settle = window.setTimeout(show, 4000)
    }
    const onError = () => setFailed(true)

    if (video.readyState >= 3) show()
    video.addEventListener('canplaythrough', show)
    video.addEventListener('loadeddata', onFirstFrame)
    video.addEventListener('error', onError)

    return () => {
      window.clearTimeout(settle)
      video.removeEventListener('canplaythrough', show)
      video.removeEventListener('loadeddata', onFirstFrame)
      video.removeEventListener('error', onError)
    }
  }, [reduced, source])

  // Reduced motion: no pinning, no scrubbing — a still frame of the same hero.
  if (reduced) {
    return (
      <section className="relative isolate overflow-hidden bg-brand-950">
        <img
          src={POSTER}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-950/60 to-brand-950/10"
        />
        <div className="shell relative flex min-h-[78svh] items-center py-16">
          <HeroCopy />
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="relative h-[400svh] bg-brand-950">
      <div
        ref={viewportRef}
        className="sticky top-0 h-[100svh] w-full overflow-hidden"
        aria-label="MR Store cinematic introduction"
      >
        {/* Poster: identical to frame one, so the swap to video is invisible */}
        <img
          src={POSTER}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <video
          ref={videoRef}
          src={source}
          poster={POSTER}
          preload="auto"
          muted
          playsInline
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-out ${
            ready && !failed ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Scrims: just enough ink for the copy, video stays dominant */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-950/85 via-brand-950/40 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-950/60 to-transparent"
        />

        <div className="shell relative z-10 h-full">
          <div
            ref={contentRef}
            className="flex h-full flex-col justify-center will-change-transform"
          >
            <HeroCopy />

            <div className="mt-7 flex items-center justify-between gap-4 sm:mt-10">
              {!ready && !failed ? (
                <div className="flex items-center gap-3 rounded-full border border-white/20 bg-brand-950/40 px-3.5 py-1.5 backdrop-blur-sm sm:px-4 sm:py-2">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-200" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70 sm:text-[11px] sm:tracking-[0.18em]">
                    Preparing the scene
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55 sm:text-[10.5px] sm:tracking-[0.22em]">
                  <span className="relative h-7 w-px overflow-hidden bg-white/25 sm:h-8">
                    <span className="absolute inset-x-0 top-0 h-3 animate-hero-cue bg-white/80" />
                  </span>
                  Scroll to move through the scene
                </div>
              )}
              <span className="hidden text-[10.5px] font-semibold uppercase tracking-[0.22em] text-white/40 sm:block">
                MR Store · Global Trade
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
