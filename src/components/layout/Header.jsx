import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Icon from '../icons.jsx'
import Button from '../ui/Button.jsx'
import { CATEGORIES } from '../../data/catalog.js'

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Suppliers', to: '/suppliers' },
  { label: 'Wholesale', to: '/wholesale' },
  { label: 'Partnership', to: '/partnership' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export function Logo({ tone = 'dark', compact = false }) {
  const dark = tone === 'dark'
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="MR Store home">
      <span
        className={`grid h-11 w-11 place-items-center rounded-2xl font-display text-[15px] font-semibold tracking-tight transition-transform duration-300 group-hover:-rotate-3 ${
          dark ? 'bg-brand-900 text-brand-50' : 'bg-white text-brand-900'
        }`}
      >
        MR
      </span>
      <span className="leading-none">
        <span
          className={`block font-display text-[19px] font-semibold tracking-[-0.01em] ${
            dark ? 'text-ink' : 'text-white'
          }`}
        >
          MR Store
        </span>
        {!compact && (
          <span
            className={`mt-1 block text-[10px] font-bold uppercase tracking-[0.16em] ${
              dark ? 'text-brand-600' : 'text-brand-200'
            }`}
          >
            Natural · Global Trade
          </span>
        )}
      </span>
    </Link>
  )
}

function SearchBar({ className = '' }) {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [scope, setScope] = useState('all')

  const submit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (q.trim()) params.set('q', q.trim())
    if (scope !== 'all') params.set('category', scope)
    navigate(`/products${params.toString() ? `?${params}` : ''}`)
  }

  return (
    <form onSubmit={submit} className={`flex items-stretch gap-2 ${className}`} role="search">
      <div className="flex flex-1 items-center gap-1 rounded-full border border-line bg-white pl-4 pr-1 transition focus-within:border-brand-600 focus-within:ring-4 focus-within:ring-brand-600/10">
        <label htmlFor="site-search" className="sr-only">
          Search products, suppliers or brands
        </label>
        <Icon name="search" className="h-[18px] w-[18px] shrink-0 text-muted" />
        <input
          id="site-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products, categories, suppliers or brands"
          className="min-w-0 flex-1 bg-transparent px-2.5 py-3 text-sm text-ink placeholder:text-muted/80 focus:outline-none"
        />
        <div className="hidden items-center border-l border-line pl-2 sm:flex">
          <label htmlFor="search-scope" className="sr-only">
            Search in
          </label>
          <select
            id="search-scope"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            className="max-w-[7.5rem] cursor-pointer bg-transparent py-2 pl-1 pr-1 text-xs font-semibold text-muted focus:outline-none"
          >
            <option value="all">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.short}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-900 text-white transition hover:bg-brand-800"
        aria-label="Search"
      >
        <Icon name="search" className="h-5 w-5" />
      </button>
    </form>
  )
}

function IconAction({ icon, label, count, to }) {
  return (
    <Link
      to={to}
      className="group relative flex flex-col items-center gap-1 rounded-xl px-2 py-1 text-muted transition hover:text-brand-900 sm:px-2.5"
    >
      <span className="relative">
        <Icon name={icon} className="h-[22px] w-[22px]" />
        {count ? (
          <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">
            {count}
          </span>
        ) : null}
      </span>
      <span className="hidden text-[10px] font-semibold uppercase tracking-wide lg:block">{label}</span>
    </Link>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(false)

  return (
    <>
      {/* Utility bar */}
      <div className="bg-brand-950 text-brand-100">
        <div className="shell flex h-10 items-center justify-between gap-4 text-[11.5px]">
          <p className="flex items-center gap-2 font-medium">
            <Icon name="leaf" className="h-3.5 w-3.5 text-brand-300" />
            <span className="hidden sm:inline">Natural Products. Global Opportunities.</span>
            <span className="sm:hidden">Verified global sourcing</span>
          </p>
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-5">
            <label className="sr-only" htmlFor="lang">
              Language
            </label>
            <select
              id="lang"
              defaultValue="en"
              className="cursor-pointer bg-transparent text-[11.5px] font-medium text-brand-100 focus:outline-none"
            >
              <option value="en" className="text-ink">English</option>
              <option value="ar" className="text-ink">العربية</option>
              <option value="fr" className="text-ink">Français</option>
              <option value="es" className="text-ink">Español</option>
              <option value="zh" className="text-ink">中文</option>
            </select>
            <span className="hidden h-3 w-px bg-white/15 sm:block" />
            <label className="sr-only" htmlFor="currency">
              Currency
            </label>
            <select
              id="currency"
              defaultValue="usd"
              className="hidden cursor-pointer bg-transparent text-[11.5px] font-medium text-brand-100 focus:outline-none sm:block"
            >
              <option value="usd" className="text-ink">USD $</option>
              <option value="eur" className="text-ink">EUR €</option>
              <option value="gbp" className="text-ink">GBP £</option>
              <option value="aed" className="text-ink">AED د.إ</option>
            </select>
            <span className="hidden h-3 w-px bg-white/15 sm:block" />
            <Link to="/contact" className="hidden hover:text-white sm:inline">
              Help Center
            </Link>
            <span className="hidden h-3 w-px bg-white/15 sm:block" />
            <div className="flex items-center gap-3">
              <Link to="/contact" className="font-semibold hover:text-white">
                Login
              </Link>
              <Link
                to="/contact"
                className="rounded-full border border-white/25 px-3 py-1 font-semibold transition hover:bg-white hover:text-brand-900"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky header */}
      <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-md">
        <div className="shell flex items-center gap-4 py-3 lg:gap-7">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="-ml-1 grid h-10 w-10 place-items-center rounded-xl text-ink transition hover:bg-mist lg:hidden"
            aria-label="Open menu"
          >
            <Icon name="menu" className="h-6 w-6" />
          </button>

          <Logo />

          <SearchBar className="hidden flex-1 md:flex" />

          <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
            <IconAction icon="heart" label="Wishlist" count={0} to="/products" />
            <IconAction icon="cart" label="Cart" count={2} to="/products" />
            <span className="mx-1 hidden h-8 w-px bg-line sm:block" />
            <Button to="/partnership" size="sm" className="hidden whitespace-nowrap xl:inline-flex">
              Become a Supplier
            </Button>
            <Button to="/partnership" size="sm" className="whitespace-nowrap xl:hidden">
              Supplier
            </Button>
          </div>
        </div>

        <div className="shell pb-3 md:hidden">
          <SearchBar />
        </div>

        {/* Category rail */}
        <div className="border-t border-line">
          <div className="shell flex items-center gap-1 py-1.5">
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setCatOpen((v) => !v)}
                onBlur={() => setTimeout(() => setCatOpen(false), 140)}
                aria-expanded={catOpen}
                className="flex items-center gap-2 rounded-full bg-brand-900 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-brand-800"
              >
                <Icon name="menu" className="h-4 w-4" />
                All Categories
                <Icon name="chevronDown" className={`h-3.5 w-3.5 transition ${catOpen ? 'rotate-180' : ''}`} />
              </button>
              {catOpen && (
                <div className="absolute left-0 top-full z-50 mt-2 w-[19rem] overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-lift">
                  {CATEGORIES.map((c) => (
                    <Link
                      key={c.id}
                      to={`/products?category=${c.id}`}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink transition hover:bg-brand-50"
                    >
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand-700">
                        <Icon name={c.id === 'cosmetics' ? 'sparkle' : c.id === 'fmcg' ? 'box' : 'leaf'} className="h-4 w-4" />
                      </span>
                      <span className="leading-tight">
                        {c.name}
                        <span className="mt-0.5 block text-[11px] font-medium text-muted">{c.count}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <nav className="no-scrollbar flex flex-1 items-center gap-0.5 overflow-x-auto">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-semibold transition ${
                      isActive ? 'bg-brand-50 text-brand-900' : 'text-ink/75 hover:bg-mist hover:text-brand-900'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <span className="ml-auto hidden shrink-0 items-center gap-2 pl-3 text-[12px] font-semibold text-muted lg:flex">
              <Icon name="globe" className="h-4 w-4 text-brand-600" />
              Ship to 140+ countries
            </span>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-xl text-muted transition hover:bg-mist"
                aria-label="Close menu"
              >
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <nav className="flex flex-col">
                {NAV.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-semibold ${
                        isActive ? 'bg-brand-50 text-brand-900' : 'text-ink'
                      }`
                    }
                  >
                    {item.label}
                    <Icon name="chevronRight" className="h-4 w-4 text-muted" />
                  </NavLink>
                ))}
              </nav>
              <p className="eyebrow mt-6 px-3">Categories</p>
              <div className="mt-2 flex flex-col">
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.id}
                    to={`/products?category=${c.id}`}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted hover:bg-mist hover:text-ink"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="space-y-2 border-t border-line p-4">
              <Button to="/partnership" onClick={() => setOpen(false)} className="w-full">
                Become a Supplier
              </Button>
              <Button to="/contact" variant="secondary" onClick={() => setOpen(false)} className="w-full">
                Login / Register
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
