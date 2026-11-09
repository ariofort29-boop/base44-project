import { Link } from 'react-router-dom'

export default function PageHeader({ eyebrow, title, description, children }) {
  return (
    <section className="relative overflow-hidden bg-forest-deep">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-brand/25 blur-3xl" />
      <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-mint/10 blur-3xl" />
      <div className="container-page relative py-12 lg:py-16">
        <nav className="mb-4 flex items-center gap-2 text-[11px] text-white/50" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-mint">
            Home
          </Link>
          <span>/</span>
          <span className="text-mint">{title}</span>
        </nav>
        {eyebrow && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mint/80">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 max-w-3xl font-display text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
            {description}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  )
}
