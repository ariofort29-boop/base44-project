import CategoryStrip from '../components/CategoryStrip'
import ExplorePaths from '../components/ExplorePaths'
import FeaturedProducts from '../components/FeaturedProducts'
import CinematicHero from '../components/CinematicHero'
import MainCategories from '../components/MainCategories'
import MidSection from '../components/MidSection'
import TradeContact from '../components/TradeContact'
import TrustBadges from '../components/TrustBadges'
import WholesaleBand from '../components/WholesaleBand'

export default function Home() {
  return (
    <>
      <CinematicHero />
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
