import CategoryStrip from '../components/CategoryStrip'
import ExplorePaths from '../components/ExplorePaths'
import FeaturedProducts from '../components/FeaturedProducts'
import Hero from '../components/Hero'
import MainCategories from '../components/MainCategories'
import MidSection from '../components/MidSection'
import TradeContact from '../components/TradeContact'
import TrustBadges from '../components/TrustBadges'
import WholesaleBand from '../components/WholesaleBand'

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <CategoryStrip />
      <MainCategories />
      <FeaturedProducts />
      <WholesaleBand />
      <MidSection />
      <ExplorePaths />
      <TradeContact />
    </>
  )
}
