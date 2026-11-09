import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import QuoteBasket from './components/QuoteBasket'
import QuoteDock from './components/QuoteDock'
import QuoteModal from './components/QuoteModal'
import { ShopProvider } from './lib/store'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Partnership from './pages/Partnership'
import Products from './pages/Products'
import Suppliers from './pages/Suppliers'
import Wholesale from './pages/Wholesale'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <ShopProvider>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-white">
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/wholesale" element={<Wholesale />} />
            <Route path="/partnership" element={<Partnership />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <QuoteBasket />
        <QuoteDock />
        <QuoteModal />
      </div>
    </ShopProvider>
  )
}
