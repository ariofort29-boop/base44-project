import { Link } from 'react-router-dom'
import Icon from '../icons.jsx'
import { Logo } from './Header.jsx'
import { CATEGORIES } from '../../data/catalog.js'

const columns = [
  {
    title: 'Marketplace',
    links: [
      { label: 'All Products', to: '/products' },
      { label: 'Verified Suppliers', to: '/suppliers' },
      { label: 'Wholesale Pricing', to: '/wholesale' },
      { label: 'Request a Quote', to: '/wholesale' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About MR Store', to: '/about' },
      { label: 'Partnership', to: '/partnership' },
      { label: 'Become a Supplier', to: '/partnership' },
      { label: 'Contact Us', to: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', to: '/contact' },
      { label: 'Shipping & Logistics', to: '/wholesale' },
      { label: 'Quality Assurance', to: '/about' },
      { label: 'Trade Terms', to: '/contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-brand-100">
      <div className="shell grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:py-16">
        <div>
          <Logo tone="light" compact />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-brand-100/70">
            An international B2B marketplace connecting buyers with verified manufacturers and
            suppliers of natural, cosmetic and consumer goods.
          </p>
          <div className="mt-6 space-y-3 text-sm">
            <a href="mailto:trade@mrstore.com" className="flex items-center gap-2.5 text-brand-100/80 transition hover:text-white">
              <Icon name="mail" className="h-4 w-4 text-brand-300" /> trade@mrstore.com
            </a>
            <a href="tel:+902125550100" className="flex items-center gap-2.5 text-brand-100/80 transition hover:text-white">
              <Icon name="phone" className="h-4 w-4 text-brand-300" /> +90 212 555 01 00
            </a>
            <p className="flex items-center gap-2.5 text-brand-100/80">
              <Icon name="pin" className="h-4 w-4 text-brand-300" /> Istanbul · Dubai · Rotterdam
            </p>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-white">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-brand-100/70 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-wrap items-center justify-between gap-4 py-6 text-[12px] text-brand-100/60">
          <p>© {new Date().getFullYear()} MR Store Trading FZE. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-2">
            {['Visa', 'Mastercard', 'Amex', 'T/T', 'L/C'].map((p) => (
              <span key={p} className="rounded-md border border-white/15 px-2 py-1 font-semibold text-brand-100/80">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-wrap gap-2 py-4 text-[11px] text-brand-100/40">
          {CATEGORIES.map((c) => (
            <Link key={c.id} to={`/products?category=${c.id}`} className="transition hover:text-brand-100/80">
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
