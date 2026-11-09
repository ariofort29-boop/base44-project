import SectionHeading from '../ui/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import SupplierCard from '../marketplace/SupplierCard.jsx'
import { SUPPLIERS } from '../../data/catalog.js'

export default function SupplierSpotlight() {
  return (
    <section className="border-y border-line bg-mist py-16 lg:py-20">
      <div className="shell">
        <SectionHeading
          eyebrow="Verified manufacturers"
          title="Suppliers we would buy from ourselves"
          text="Audited facilities, documented certifications and a tracked response record — every supplier on MR Store is reviewed before listing."
          action={
            <Button to="/suppliers" variant="secondary" icon="arrowRight">
              All suppliers
            </Button>
          }
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SUPPLIERS.slice(0, 3).map((s) => (
            <SupplierCard key={s.id} supplier={s} />
          ))}
        </div>
      </div>
    </section>
  )
}
