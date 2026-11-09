import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const ShopContext = createContext(null)

export function ShopProvider({ children }) {
  const [wishlist, setWishlist] = useState([])
  const [inquiries, setInquiries] = useState([])
  const [quoteTarget, setQuoteTarget] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)

  const toggleWishlist = useCallback((id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }, [])

  const openQuote = useCallback((product = 'general') => setQuoteTarget(product), [])
  const closeQuote = useCallback(() => setQuoteTarget(null), [])

  const addInquiry = useCallback((product) => {
    setInquiries((prev) => {
      const entry = product && product !== 'general' ? product : null
      if (entry && prev.some((item) => item.id === entry.id)) return prev
      return [...prev, entry ?? { id: 'general', name: 'General sourcing request' }]
    })
  }, [])

  const value = useMemo(
    () => ({
      wishlist,
      inquiries,
      quoteTarget,
      cartOpen,
      setCartOpen,
      isWished: (id) => wishlist.includes(id),
      toggleWishlist,
      openQuote,
      closeQuote,
      addInquiry,
    }),
    [wishlist, inquiries, quoteTarget, cartOpen, toggleWishlist, openQuote, closeQuote, addInquiry],
  )

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export function useShop() {
  const context = useContext(ShopContext)
  if (!context) throw new Error('useShop must be used inside ShopProvider')
  return context
}
