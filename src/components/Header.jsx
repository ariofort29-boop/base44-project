import {
  ArrowRight,
  ChevronDown,
  Globe2,
  Heart,
  Leaf,
  Menu,
  Search,
  ShieldCheck,
  ShoppingBag,
  Truck,
  UserRound,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { categories } from '../data/catalog'
import { useShop } from '../lib/store'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Suppliers', to: '/suppliers' },
  { label: 'Wholesale', to: '/wholesale' },
  { label: 'Partnership', to: '/partnership' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

function Logo() {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-forest font-display text-lg font-semibold text-mint">
        MR
      </span>
      <span className="leading-tight">
        <span className="block font-display text-xl font-semibold text-forest">MR Store</span>
        <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-ink/50 sm:block">
          Natural Products. Global Opportunities.
        </span>
      </span>
    </Link>
  )
}

export default function Header() {
  const navigate = useNavigate()
  const { wishlist, inquiries, setCartOpen } = useShop()
  const [query, setQuery] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)

  const submitSearch = (event) => {
    event.preventDefault()
    const term = query.trim()
    navigate(term ? `/products?q=${encodeURIComponent(term)}` : '/products')
    setMobileOpen(false)
  }

  const navLinkClass = ({ isActive }) =>
    `relative py-2 text-sm font-medium transition-colors ${
      isActive ? 'text-forest' : 'text-ink/70 hover:text-forest'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-ink/8 bg-white/95 backdrop-blur">
      <div className="hidden bg-forest text-white lg:block">
        <div className="container-page flex h-9 items-center justify-between text-[11px]">
          <p className="flex items-center gap-2">
            <Leaf size={13} className="text-mint" />
            Natural Products. Global Opportunities.
          </p>
          <div className="flex items-center gap-5 text-white/80">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={13} /> Trade assurance on every order
            </span>
            <span className="flex items-center gap-1.5">
              <Truck size={13} /> Shipping to 180+ countries
            </span>
            <span className="flex items-center gap-1.5">
              <Globe2 size={13} /> EN
              <ChevronDown size={12} />
            </span>
          </div>
        </div>
      </div>

      <div className="container-page flex items-center gap-4 py-3 lg:gap-7">
        <Logo />

        <form onSubmit={submitSearch} className="hidden flex-1 md:block">
          <div className="flex items-center gap-2 rounded-full border border-ink/12 bg-mist px-2 py-1.5 transition focus-within:border-forest focus-within:bg-white focus-within:ring-2 focus-within:ring-forest/10">
            <label className="sr-only" htmlFor="header-search">
              Search products, suppliers and brands
            </label>
            <input
              id="header-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products, suppliers, manufacturers or brands"
              className="min-w-0 flex-1 bg-transparent px-3 py-1.5 text-sm text-ink placeholder:text-ink/45 focus:outline-none"
            />
            <span className="hidden items-center gap-1 rounded-full bg-white px-3 py-1 text-xs text-ink/60 xl:flex">
              All categories <ChevronDown size={12} />
            </span>
            <button
              type="submit"
              aria-label="Search"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-forest text-white transition hover:bg-emerald-brand"
            >
              <Search size={16} />
            </button>
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2.5">
          <div className="hidden items-center gap-2 pr-2 text-xs font-medium text-ink/70 lg:flex">
            <span className="rounded-full border border-ink/12 px-2.5 py-1">USD</span>
            <span className="rounded-full border border-ink/12 px-2.5 py-1">EN</span>
          </div>

          <Link
            to="/products?view=wishlist"
            aria-label={`Wishlist, ${wishlist.length} items`}
            className="relative grid h-10 w-10 place-items-center rounded-full text-forest transition hover:bg-mint"
          >
            <Heart size={19} />
            {wishlist.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-forest px-1 text-[10px] font-bold text-white">
                {wishlist.length}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`Quote basket, ${inquiries.length} items`}
            className="relative grid h-10 w-10 place-items-center rounded-full text-forest transition hover:bg-mint"
          >
            <ShoppingBag size={19} />
            <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-emerald-brand px-1 text-[10px] font-bold text-white">
              {inquiries.length}
            </span>
          </button>

          <Link
            to="/contact"
            className="hidden items-center gap-2 rounded-full px-2 py-1.5 text-sm font-medium text-ink/75 transition hover:text-forest sm:flex"
          >
            <UserRound size={18} />
            <span className="hidden xl:inline">Login / Register</span>
          </Link>

          <Link
            to="/contact"
            className="hidden items-center gap-1.5 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-brand lg:flex"
          >
            Become a Supplier
            <ArrowRight size={15} />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            className="grid h-10 w-10 place-items-center rounded-full text-forest transition hover:bg-mint lg:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div className="hidden border-t border-ink/8 lg:block">
        <div className="container-page flex items-center gap-6">
          <div className="relative hidden lg:block">
            <button
              type="button"
              onClick={() => setCategoriesOpen((open) => !open)}
              className="flex items-center gap-2 rounded-t-xl bg-forest px-5 py-3 text-sm font-semibold text-white"
              aria-expanded={categoriesOpen}
            >
              <Menu size={16} />
              All Categories
              <ChevronDown size={14} className={categoriesOpen ? 'rotate-180 transition' : 'transition'} />
            </button>
            {categoriesOpen && (
              <div className="absolute left-0 top-full z-10 grid w-[720px] grid-cols-3 gap-6 rounded-b-2xl rounded-tr-2xl border border-ink/10 bg-white p-6 shadow-soft">
                {categories.map((category) => (
                  <div key={category.slug}>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-brand">
                      {category.short}
                    </p>
                    <ul className="space-y-1.5">
                      {category.items.slice(0, 6).map((item) => (
                        <li key={item}>
                          <Link
                            to={`/products?category=${category.slug}&q=${encodeURIComponent(item)}`}
                            onClick={() => setCategoriesOpen(false)}
                            className="text-sm text-ink/70 transition hover:text-forest"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLinkClass} end={item.to === '/'}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="flex items-center gap-2 py-3 text-sm font-semibold text-forest lg:hidden"
          >
            <Menu size={16} /> Menu
          </button>

          <Link
            to="/contact"
            className="ml-auto hidden items-center gap-1.5 py-3 text-sm font-semibold text-forest hover:text-emerald-brand lg:flex"
          >
            Request a Quote <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-ink/8 bg-white lg:hidden">
          <div className="container-page space-y-4 py-4">
            <form onSubmit={submitSearch} className="flex items-center gap-2 rounded-full border border-ink/15 bg-mist px-3 py-1.5">
              <Search size={16} className="text-ink/50" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products or suppliers"
                className="w-full bg-transparent py-1.5 text-sm focus:outline-none"
              />
            </form>
            <nav className="grid gap-1" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 text-sm font-medium ${
                      isActive ? 'bg-mint text-forest' : 'text-ink/75'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="grid grid-cols-3 gap-2 border-t border-ink/8 pt-3">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/products?category=${category.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl bg-mist px-3 py-2 text-center text-xs font-semibold text-forest"
                >
                  {category.short}
                </Link>
              ))}
            </div>
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="btn-primary w-full"
            >
              Become a Supplier
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
