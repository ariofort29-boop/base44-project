import { Routes, Route, Link } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Button from './components/ui/Button.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import Suppliers from './pages/Suppliers.jsx'
import Wholesale from './pages/Wholesale.jsx'
import Partnership from './pages/Partnership.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

function NotFound() {
  return (
    <section className="shell flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-3xl">This page is not part of the marketplace</h1>
      <p className="mt-3 max-w-md text-[14px] text-muted">
        The link may have changed. Start from the catalogue or the supplier directory.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button to="/">Back to home</Button>
        <Button to="/products" variant="secondary">Browse products</Button>
      </div>
      <Link to="/contact" className="mt-6 text-[12.5px] font-semibold text-muted hover:text-brand-800">
        Or contact the trade desk
      </Link>
    </section>
  )
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/wholesale" element={<Wholesale />} />
        <Route path="/partnership" element={<Partnership />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
