import { ArrowLeft, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PageHeader({ eyebrow, title, description, children }) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-emerald-brand/25 blur-[110px]" />
        <div className="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-gold/10 blur-[120px]" />
      </div>

      <div className="container-page relative py-10 lg:py-14">
        <nav className="mb-6 flex items-center gap-2 text-[11px] text-white/45" aria-label="مسیر صفحه">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-white/70 transition hover:border-gold/50 hover:text-gold-soft"
          >
            <Home size={12} />
            خانه
          </Link>
          <ArrowLeft size={12} />
          <span className="text-gold-soft/90">{title}</span>
        </nav>

        {eyebrow && (
          <p className="eyebrow">
            <span className="h-px w-7 bg-gradient-to-r from-gold to-transparent" />
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 max-w-3xl text-[1.75rem] font-bold leading-[1.55] text-white sm:text-3xl lg:text-[2.35rem]">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-sm leading-[1.95] text-white/60 sm:text-[15px]">
            {description}
          </p>
        )}
        {children && <div className="mt-7">{children}</div>}
      </div>
    </section>
  )
}
