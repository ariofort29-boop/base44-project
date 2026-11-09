import CategoryStrip from '../components/CategoryStrip'
import FeaturedProducts from '../components/FeaturedProducts'
import Hero from '../components/Hero'
import MainCategories from '../components/MainCategories'
import MidSection from '../components/MidSection'
import TrustBadges from '../components/TrustBadges'
import WholesaleBand from '../components/WholesaleBand'

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryStrip />
      <MainCategories />
      <MidSection />
      <FeaturedProducts />
      <WholesaleBand />
      <TrustBadges />
    </>
  )
}
