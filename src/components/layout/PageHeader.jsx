import { Link } from 'react-router-dom'
import Icon from '../icons.jsx'

export default function PageHeader({ eyebrow, title, text, crumbs = [], children }) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-brand-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(48rem 22rem at 85% 0%, rgba(19,134,90,.14), transparent 60%)',
        }}
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 300 300"
        className="pointer-events-none absolute -right-10 -top-16 h-72 w-72 text-brand-200/60"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.3">
          <path d="M150 10c-30 50-30 90 0 140s30 90 0 140" />
          <path d="M150 40c-50 15-72 50-65 88M150 70c50 15 72 50 65 88M150 150c-50 15-72 50-65 88" />
        </g>
      </svg>

      <div className="shell relative py-10 lg:py-14">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1.5 text-[11.5px] font-semibold text-muted">
            <Link to="/" className="hover:text-brand-800">Home</Link>
            {crumbs.map((c) => (
              <span key={c} className="flex items-center gap-1.5">
                <Icon name="chevronRight" className="h-3 w-3 text-line" />
                <span className="text-ink/70">{c}</span>
              </span>
            ))}
          </nav>
        )}
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-[1.9rem] leading-[1.1] tracking-[-0.025em] sm:text-[2.6rem]">
          {title}
        </h1>
        {text && <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-muted">{text}</p>}
        {children && <div className="mt-7">{children}</div>}
      </div>
    </section>
  )
}
