import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../icons.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import ProductCard from '../marketplace/ProductCard.jsx'
import { PRODUCTS, CATEGORIES } from '../../data/catalog.js'

const tabs = [
  { id: 'all', label: 'All products' },
  ...CATEGORIES.map((c) => ({ id: c.id, label: c.short })),
]

export default function FeaturedProducts() {
  const [tab, setTab] = useState('all')
  const list = (tab === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === tab)).slice(0, 8)

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="shell">
        <SectionHeading
          eyebrow="Curated wholesale catalogue"
          title="Products buyers are requesting this week"
          text="Live quotations with transparent MOQs, certifications and lead times — direct from the manufacturer."
          action={
            <Button to="/products" variant="secondary" icon="arrowRight">
              Browse catalogue
            </Button>
          }
        />

        <div className="no-scrollbar mt-8 flex items-center gap-2 overflow-x-auto pb-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              aria-pressed={tab === t.id}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-[12.5px] font-bold transition ${
                tab === t.id
                  ? 'border-brand-900 bg-brand-900 text-white'
                  : 'border-line bg-white text-muted hover:border-brand-300 hover:text-brand-800'
              }`}
            >
              {t.label}
            </button>
          ))}
          <Link
            to="/products"
            className="ml-auto hidden shrink-0 items-center gap-1 text-[12.5px] font-bold text-brand-800 hover:gap-2 sm:flex"
          >
            View all <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
