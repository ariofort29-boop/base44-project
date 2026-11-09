import { Droplets, FlaskConical, LayoutGrid, Leaf, Package, Sparkles, Wheat } from 'lucide-react'
import { Link } from 'react-router-dom'

const items = [
  { label: 'Cosmetics & Personal Care', icon: Sparkles, to: '/products?category=cosmetics' },
  { label: 'Herbal Teas & Dried Herbs', icon: Leaf, to: '/products?category=organic&q=Herbal' },
  { label: 'Organic Food & Superfoods', icon: Wheat, to: '/products?category=organic' },
  { label: 'Herbal Oils & Extracts', icon: Droplets, to: '/products?category=organic&q=Oils' },
  { label: 'Pickles & Fermented Foods', icon: Package, to: '/products?category=fmcg&q=Pickled' },
  { label: 'Natural Soaps & Care', icon: Leaf, to: '/products?category=cosmetics&q=Soap' },
  { label: 'Essential Oils', icon: FlaskConical, to: '/products?q=Essential%20Oil' },
  { label: 'All Categories', icon: LayoutGrid, to: '/products' },
]

export default function CategoryStrip() {
  return (
    <section className="border-b border-ink/8 bg-white">
      <div className="container-page">
        <div className="flex snap-x gap-2 overflow-x-auto py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map(({ label, icon: Icon, to }) => (
            <Link
              key={label}
              to={to}
              className="group flex w-[132px] shrink-0 snap-start flex-col items-center gap-2 rounded-xl px-2 py-2 text-center transition hover:bg-mist"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full border border-forest/10 bg-mint text-forest transition group-hover:bg-forest group-hover:text-white">
                <Icon size={20} />
              </span>
              <span className="text-[11px] font-medium leading-snug text-ink/70 group-hover:text-forest">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
