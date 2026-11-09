import { Link } from 'react-router-dom'
import Icon from '../icons.jsx'
import SmartImage from '../ui/SmartImage.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import { CATEGORIES } from '../../data/catalog.js'

function CategoryCard({ category, index }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl3 border border-line bg-white shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
      <Link to={`/products?category=${category.id}`} className="relative block">
        <SmartImage
          src={category.image}
          alt={category.name}
          className="h-52 w-full sm:h-56"
          imgClassName="group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/70 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[10.5px] font-extrabold uppercase tracking-[0.12em] text-brand-900 backdrop-blur">
          0{index + 1} · {category.count}
        </span>
        <h3 className="absolute inset-x-4 bottom-4 font-display text-[19px] leading-tight text-white sm:text-[21px]">
          {category.name}
        </h3>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[13.5px] leading-relaxed text-muted">{category.blurb}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {category.items.slice(0, 6).map((item) => (
            <li key={item}>
              <Link
                to={`/products?category=${category.id}&q=${encodeURIComponent(item)}`}
                className="chip"
              >
                {item}
              </Link>
            </li>
          ))}
          {category.items.length > 6 && (
            <li className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-800">
              +{category.items.length - 6} more
            </li>
          )}
        </ul>
        <Link
          to={`/products?category=${category.id}`}
          className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-extrabold text-brand-800 transition group-hover:gap-2.5"
        >
          Browse category
          <Icon name="arrowRight" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}

export default function CategoryShowcase() {
  return (
    <section className="bg-mist py-16 lg:py-20">
      <div className="shell">
        <SectionHeading
          eyebrow="Sourcing by industry"
          title="Three industries. One trusted marketplace."
          text="Every listing is grouped by the production standards buyers audit for — so you can shortlist the right manufacturers in minutes, not weeks."
          action={<Button to="/products" variant="secondary" icon="arrowRight">View all products</Button>}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <CategoryCard key={c.id} category={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
