import Hero from '../components/home/Hero.jsx'
import TrustStrip from '../components/home/TrustStrip.jsx'
import CategoryShowcase from '../components/home/CategoryShowcase.jsx'
import FeaturedProducts from '../components/home/FeaturedProducts.jsx'
import SupplierSpotlight from '../components/home/SupplierSpotlight.jsx'
import HowItWorks from '../components/home/HowItWorks.jsx'
import PartnershipBanner from '../components/home/PartnershipBanner.jsx'
import Testimonials from '../components/home/Testimonials.jsx'
import QuoteCTA from '../components/home/QuoteCTA.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CategoryShowcase />
      <FeaturedProducts />
      <SupplierSpotlight />
      <HowItWorks />
      <PartnershipBanner />
      <Testimonials />
      <QuoteCTA />
    </>
  )
}
