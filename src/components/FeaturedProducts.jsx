import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { featuredProducts } from '../data/catalog'
import ProductCard from './ProductCard'
import SectionHeading from './SectionHeading'

export default function FeaturedProducts() {
  return (
    <section className="bg-surface-2 py-14 lg:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="عرضه عمده تأییدشده"
          title="پیشنهادهای برگزیده این هفته"
          description="انتخابی از محصولات تأمین‌کنندگان بررسی‌شده، با اسناد آماده صادرات و حداقل سفارش منعطف."
          action={
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-brand/25 bg-surface px-5 py-2.5 text-sm font-semibold text-emerald-soft transition hover:border-emerald-brand hover:bg-mint"
            >
              همه محصولات <ArrowRight size={15} />
            </Link>
          }
        />

        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <p className="mt-7 text-center text-xs leading-relaxed text-sage/45">
          قیمت همه محصولات استعلامی است؛ برای دریافت پیش‌فاکتور عمده با ما تماس بگیرید.
        </p>
      </div>
    </section>
  )
}
