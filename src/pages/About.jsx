import { BadgeCheck, Globe2, Leaf, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import SectionHeading from '../components/SectionHeading'

const values = [
  {
    icon: ShieldCheck,
    title: 'Trust before volume',
    text: 'Suppliers are audited for certifications, capacity and export history before they list a single product.',
  },
  {
    icon: Leaf,
    title: 'Natural by default',
    text: 'We prioritise organic, herbal and low-intervention production across every category we carry.',
  },
  {
    icon: Globe2,
    title: 'Global by design',
    text: 'Documentation, labelling and logistics are built for cross-border trade from day one.',
  },
  {
    icon: BadgeCheck,
    title: 'Transparent terms',
    text: 'MOQ, lead time, packaging and payment terms are stated upfront — no hidden landed costs.',
  },
]

const milestones = [
  ['2014', 'Founded as a regional trading desk for natural cosmetics.'],
  ['2018', 'Expanded into FMCG distribution across the Gulf and CIS.'],
  ['2022', 'Launched the MR Store marketplace with 1,200 verified suppliers.'],
  ['2025', '12,400 suppliers, 180+ destination markets and consolidated logistics hubs.'],
]

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About MR Store"
        title="Nature creates value — trade makes it global"
        description="MR Store connects international buyers with manufacturers and suppliers of cosmetics, FMCG and organic products, built on verified supply and transparent terms."
      />

      <section className="bg-white py-14 lg:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow">Our story</p>
            <h2 className="mt-2 font-display text-3xl leading-tight text-forest">
              A trading house built for the next decade of natural products
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/70">
              We started as a small export desk sourcing botanical ingredients for European beauty
              brands. Today MR Store is a marketplace where buyers compare suppliers on equal terms
              and producers reach markets they could not access alone.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              Our team sits between the two sides of every deal: verifying manufacturers, checking
              certifications, consolidating shipments and standing behind the terms we publish.
            </p>
            <Link to="/contact" className="btn-primary mt-6">
              Talk to our team
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80"
              alt="Dried herbs and spices on a market table"
              loading="lazy"
              className="col-span-2 h-52 w-full rounded-2xl object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80"
              alt="Jars of natural honey"
              loading="lazy"
              className="h-40 w-full rounded-2xl object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80"
              alt="Natural skincare products on a light surface"
              loading="lazy"
              className="h-40 w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-mist py-14 lg:py-16">
        <div className="container-page">
          <SectionHeading eyebrow="What guides us" title="Principles we trade by" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }) => (
              <article key={title} className="card-surface p-5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-mint text-forest">
                  <Icon size={18} />
                </span>
                <h3 className="mt-3 text-sm font-semibold text-ink">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink/60">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Milestones</p>
            <h2 className="mt-2 font-display text-3xl text-forest">A decade of trade</h2>
            <p className="mt-3 max-w-sm text-sm text-ink/60">
              From a regional desk to a global marketplace, grown entirely on repeat buyers and
              referred suppliers.
            </p>
            <p className="mt-8 font-signature text-4xl text-forest/80">Nature Creates Value</p>
          </div>
          <ol className="relative space-y-5 border-l border-forest/15 pl-6">
            {milestones.map(([year, text]) => (
              <li key={year} className="relative">
                <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-forest ring-4 ring-mint" />
                <p className="font-display text-lg text-forest">{year}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/65">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
