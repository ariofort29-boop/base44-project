import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../data/catalog'

const columns = [
  {
    title: 'Marketplace',
    links: [
      { label: 'All Products', to: '/products' },
      { label: 'Verified Suppliers', to: '/suppliers' },
      { label: 'Wholesale Program', to: '/wholesale' },
      { label: 'Partnership', to: '/partnership' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About MR Store', to: '/about' },
      { label: 'Quality & Compliance', to: '/about' },
      { label: 'Global Logistics', to: '/wholesale' },
      { label: 'Contact Us', to: '/contact' },
    ],
  },
  {
    title: 'For Business',
    links: [
      { label: 'Become a Supplier', to: '/contact' },
      { label: 'Buyer Account', to: '/contact' },
      { label: 'Private Label', to: '/partnership' },
      { label: 'Request a Quote', to: '/contact' },
    ],
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const subscribe = (event) => {
    event.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="bg-forest-deep text-white">
      <div className="container-page grid gap-10 py-14 lg:grid-cols-[1.3fr_2fr] lg:gap-16">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 font-display text-lg font-semibold text-mint">
              MR
            </span>
            <div>
              <p className="font-display text-xl font-semibold">MR Store</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/55">
                Natural Products. Global Opportunities.
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
            An international B2B marketplace connecting buyers with verified manufacturers and
            suppliers across cosmetics, FMCG and organic products.
          </p>

          <ul className="mt-6 space-y-2.5 text-sm text-white/70">
            <li className="flex items-center gap-2.5">
              <Mail size={15} className="text-mint" /> trade@mrstore.global
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={15} className="text-mint" /> +971 4 000 1188
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin size={15} className="text-mint" /> Dubai · Istanbul · Shanghai
            </li>
          </ul>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mint/80">
                {column.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-white/65 transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mint/80">
              Categories
            </p>
            <ul className="mt-4 space-y-2.5">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    to={`/products?category=${category.slug}`}
                    className="text-sm text-white/65 transition hover:text-white"
                  >
                    {category.short}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            <p className="text-sm font-semibold">Monthly wholesale insights</p>
            <p className="mt-1 text-xs text-white/55">
              New suppliers, seasonal harvests and trade terms — once a month.
            </p>
            <form onSubmit={subscribe} className="mt-3 flex gap-2">
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@company.com"
                className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-mint focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-full bg-mint px-4 py-2.5 text-sm font-semibold text-forest transition hover:bg-white"
              >
                Subscribe <ArrowRight size={14} />
              </button>
            </form>
            {subscribed && (
              <p className="mt-2 text-xs text-mint">Thank you — you are on the list.</p>
            )}
          </div>

          <p className="font-signature text-3xl text-mint">Nature Creates Value</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MR Store. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <span>Terms of Trade</span>
            <span>Privacy Policy</span>
            <span>Shipping & Returns</span>
            <span>Certifications</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
