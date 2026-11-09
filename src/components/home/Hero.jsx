import Icon from '../icons.jsx'
import Button from '../ui/Button.jsx'
import SmartImage from '../ui/SmartImage.jsx'

const HERO_IMAGES = {
  main: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
  honey: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80',
  herbs: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=800&q=80',
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-50">
      {/* Ambient botanical field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            'radial-gradient(60rem 30rem at 78% 12%, rgba(19,134,90,.16), transparent 62%), radial-gradient(38rem 24rem at 6% 88%, rgba(7,92,59,.10), transparent 65%)',
        }}
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -right-24 -top-24 h-[520px] w-[520px] text-brand-200/50"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M200 20c-40 70-40 130 0 200s40 130 0 160" />
          <path d="M200 60c-70 20-100 70-90 120M200 100c70 20 100 70 90 120M200 180c-70 20-100 70-90 120M200 220c70 20 100 70 90 120" />
        </g>
      </svg>

      <div className="shell relative grid items-center gap-12 py-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:py-20">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-900/10 bg-white/80 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-800">
            <Icon name="badgeCheck" className="h-4 w-4" />
            Verified B2B marketplace · 140+ countries
          </span>

          <h1 className="mt-6 text-[2.35rem] leading-[1.04] tracking-[-0.03em] text-ink sm:text-[3.1rem] lg:text-[3.55rem]">
            Your Trusted Partner in{' '}
            <span className="italic text-brand-700">Natural</span> &amp; Consumer Products
          </h1>

          <p className="mt-5 max-w-xl text-[16px] font-semibold leading-snug text-ink/80 sm:text-lg">
            Connecting Global Buyers with Verified Manufacturers and Suppliers.
          </p>
          <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-muted">
            Discover premium cosmetics, FMCG, and organic products from trusted suppliers around the
            world — with real MOQs, certificates and export-ready logistics.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button to="/products" size="lg" icon="arrowRight">
              Explore Products
            </Button>
            <Button to="/partnership" variant="secondary" size="lg">
              Become a Supplier
            </Button>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-[12.5px] font-semibold text-muted">
            <span className="flex items-center gap-2">
              <Icon name="shield" className="h-4 w-4 text-brand-600" /> 12,400+ verified suppliers
            </span>
            <span className="flex items-center gap-2">
              <Icon name="truck" className="h-4 w-4 text-brand-600" /> 48h quotation response
            </span>
          </div>
        </div>

        {/* Image composition */}
        <div className="relative animate-rise [animation-delay:120ms]">
          <div className="grid h-full grid-cols-2 gap-3 sm:gap-4 lg:grid-rows-2 lg:gap-4">
            <SmartImage
              src={HERO_IMAGES.main}
              alt="Premium natural skincare bottles ready for wholesale export"
              className="col-span-2 h-52 rounded-xl3 shadow-card sm:h-64 lg:col-span-1 lg:row-span-2 lg:h-full lg:min-h-[420px]"
            />
            <SmartImage
              src={HERO_IMAGES.honey}
              alt="Raw organic honey being poured from a wooden dipper"
              className="h-32 rounded-2xl shadow-card sm:h-40 lg:h-full"
            />
            <SmartImage
              src={HERO_IMAGES.herbs}
              alt="Matcha and botanical tea blends"
              className="h-32 rounded-2xl shadow-card sm:h-40 lg:h-full"
            />
          </div>

          <div className="absolute -bottom-5 left-4 hidden items-center gap-3 rounded-2xl border border-line bg-white/95 p-3.5 shadow-lift backdrop-blur sm:flex">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700">
              <Icon name="users" className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[13px] font-extrabold text-ink">12,400+ suppliers</p>
              <p className="flex items-center gap-1 text-[11px] font-semibold text-muted">
                <Icon name="star" className="h-3 w-3 text-[#E0A33E]" />
                4.9/5 from 8,600 international buyers
              </p>
            </div>
          </div>

          <div className="absolute -right-1 top-4 hidden rounded-full border border-line bg-white px-3 py-1.5 text-[11px] font-bold text-brand-800 shadow-card lg:flex lg:items-center lg:gap-1.5">
            <Icon name="shield" className="h-3.5 w-3.5" /> ISO 22716 inspected
          </div>
        </div>
      </div>
    </section>
  )
}
