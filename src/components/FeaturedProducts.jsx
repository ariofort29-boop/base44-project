import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { featuredProducts } from '../data/catalog'
import ProductCard from './ProductCard'
import SectionHeading from './SectionHeading'

export default function FeaturedProducts() {
  return (
    <section className="bg-white py-14 lg:py-16">
      <div className="container-page">
        <SectionHeading
          eyebrow="Verified wholesale"
          title="Featured products this week"
          description="Hand-picked offers from audited suppliers, with export-ready documentation and flexible MOQs."
          action={
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 rounded-full border border-forest/20 px-5 py-2.5 text-sm font-semibold text-forest transition hover:border-forest hover:bg-mint"
            >
              View all products <ArrowRight size={15} />
            </Link>
          }
        />

        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
