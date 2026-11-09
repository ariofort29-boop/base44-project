import { useEffect } from 'react'

/**
 * Scroll-driven video scrubbing.
 *
 * The hero pins a 100svh viewport inside a tall section; this hook maps the
 * user's scroll progress through that section (0 → 1) onto the video timeline
 * (0 → duration) by *seeking*, never playing.
 *
 * Design notes:
 * - The scroll listener only marks the loop dirty (it never writes to the
 *   video). All seeking happens inside requestAnimationFrame.
 * - `target` is the raw scroll progress; `current` eases toward it, so a fast
 *   wheel gesture becomes a smooth camera move instead of a hard cut.
 * - A new frame time is only written when it differs from the rendered time by
 *   more than MIN_SEEK, and never while the previous seek is still in flight,
 *   which keeps the browser's seek queue empty (no seek flood, no stutter).
 * - The loop stops itself once the easing has settled, so an idle page does no
 *   work at all.
 *
 * Encoding: scrubbing reads backwards to the previous keyframe on every seek,
 * so this file ships an all-intra encode (a keyframe on every frame). With a
 * long GOP the browser would decode up to a second of video per scroll step.
 */
const SMOOTHING = 0.22 // per-frame easing; higher = tighter to the scroll, lower = creamier
const MIN_SEEK = 0.02 // seconds — about half a frame at 24fps
const EPS = 0.0004 // progress delta below which the loop settles

export default function useScrollScrub({ sectionRef, videoRef, contentRef, ready, enabled = true }) {
  useEffect(() => {
    if (!enabled || !ready) return

    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    let rafId = 0
    let current = 0
    let wanted = -1
    let pinHeight = 0
    let duration = 0

    const measure = () => {
      const pin = section.firstElementChild
      pinHeight = pin ? pin.getBoundingClientRect().height : window.innerHeight
      duration = Number.isFinite(video.duration) ? video.duration : 0
    }

    const readProgress = () => {
      const rect = section.getBoundingClientRect()
      const distance = rect.height - pinHeight
      if (distance <= 0) return 0
      const p = -rect.top / distance
      return p < 0 ? 0 : p > 1 ? 1 : p
    }

    const paint = () => {
      if (duration > 0) {
        const t = current * duration
        wanted = t
        if (!video.seeking && Math.abs(video.currentTime - t) > MIN_SEEK) {
          video.currentTime = t
        }
      }

      // Hero copy drifts and fades out over the first third of the scroll.
      const content = contentRef.current
      if (content) {
        const fade = current < 0.05 ? 1 : 1 - (current - 0.05) / 0.32
        const opacity = fade < 0 ? 0 : fade > 1 ? 1 : fade
        content.style.opacity = opacity.toFixed(3)
        content.style.transform = `translate3d(0,${(-current * 56).toFixed(1)}px,0)`
        content.style.pointerEvents = opacity < 0.2 ? 'none' : ''
      }
    }

    const tick = () => {
      rafId = 0
      const target = readProgress()
      const diff = target - current
      if (Math.abs(diff) > EPS) current += diff * SMOOTHING
      else current = target
      paint()
      if (Math.abs(target - current) > EPS) rafId = requestAnimationFrame(tick)
    }

    const nudge = () => {
      if (!rafId) rafId = requestAnimationFrame(tick)
    }

    // A seek we skipped because the browser was busy still has to land.
    const onSeeked = () => {
      if (wanted >= 0 && Math.abs(video.currentTime - wanted) > MIN_SEEK) nudge()
    }

    const onResize = () => {
      measure()
      nudge()
    }

    const onLoadedMetadata = () => {
      measure()
      nudge()
    }

    measure()
    nudge()

    window.addEventListener('scroll', nudge, { passive: true })
    window.addEventListener('resize', onResize)
    video.addEventListener('seeked', onSeeked)
    video.addEventListener('loadedmetadata', onLoadedMetadata)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', nudge)
      window.removeEventListener('resize', onResize)
      video.removeEventListener('seeked', onSeeked)
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
    }
  }, [enabled, ready, sectionRef, videoRef, contentRef])
}
