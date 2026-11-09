import { Droplets, FlaskConical, LayoutGrid, Leaf, Package, Sparkles, Wheat } from 'lucide-react'
import { Link } from 'react-router-dom'

const items = [
  { label: 'آرایشی و بهداشتی', icon: Sparkles, to: '/products?category=cosmetics' },
  { label: 'دمنوش و گیاهان خشک', icon: Leaf, to: '/products?category=organic&q=Herbal' },
  { label: 'غذای ارگانیک و سوپرفود', icon: Wheat, to: '/products?category=organic' },
  { label: 'روغن و عصاره گیاهی', icon: Droplets, to: '/products?category=organic&q=Oils' },
  { label: 'ترشی و کنسرو', icon: Package, to: '/products?category=fmcg&q=Pickled' },
  { label: 'صابون و شوینده طبیعی', icon: Leaf, to: '/products?category=cosmetics&q=Soap' },
  { label: 'اسانس‌ها', icon: FlaskConical, to: '/products?q=Essential%20Oil' },
  { label: 'همه دسته‌ها', icon: LayoutGrid, to: '/products' },
]

export default function CategoryStrip() {
  return (
    <section className="border-b border-navy/8 bg-white">
      <div className="container-page">
        <div className="flex snap-x gap-2 overflow-x-auto py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map(({ label, icon: Icon, to }) => (
            <Link
              key={label}
              to={to}
              className="group flex w-[124px] shrink-0 snap-start flex-col items-center gap-2 rounded-xl px-2 py-2 text-center transition duration-300 hover:bg-mist"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full border border-emerald-brand/15 bg-mint text-emerald-brand transition duration-300 group-hover:border-emerald-brand group-hover:bg-emerald-brand group-hover:text-white">
                <Icon size={20} />
              </span>
              <span className="text-[11px] font-medium leading-snug text-ink/65 transition group-hover:text-emerald-brand">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
