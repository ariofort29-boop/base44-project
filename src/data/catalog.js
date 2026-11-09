const img = (id, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const categories = [
  {
    slug: 'cosmetics',
    title: 'Cosmetics & Personal Care',
    short: 'Cosmetics',
    blurb:
      'Skincare, haircare and beauty essentials produced by certified manufacturers with full ingredient traceability.',
    image: img('photo-1556228720-195a672e8a03', 1200),
    items: [
      'Skincare',
      'Haircare',
      'Body Care',
      'Beauty Products',
      'Makeup',
      'Natural Cosmetics',
      'Soaps & Cleansers',
      'Personal Hygiene',
      'Perfumes & Fragrances',
      'Essential Oils',
    ],
  },
  {
    slug: 'fmcg',
    title: 'FMCG — Fast-Moving Consumer Goods',
    short: 'FMCG',
    blurb:
      'Everyday consumer goods in retail-ready packaging, supplied in container loads or mixed pallets.',
    image: img('photo-1542838132-92c53300491e', 1200),
    items: [
      'Packaged Food',
      'Beverages',
      'Tea & Coffee',
      'Snacks',
      'Nuts & Dried Fruits',
      'Honey',
      'Spices & Seasonings',
      'Pickles & Preserved Foods',
      'Household Products',
      'Cleaning Products',
      'Daily Consumer Goods',
    ],
  },
  {
    slug: 'organic',
    title: 'Organic & Natural Products',
    short: 'Organic',
    blurb:
      'Certified organic food, botanicals and raw ingredients sourced directly from growers and cooperatives.',
    image: img('photo-1596040033229-a9821ebd058d', 1200),
    items: [
      'Organic Food',
      'Herbal Products',
      'Herbal Teas',
      'Natural Oils',
      'Plant Extracts',
      'Organic Skincare',
      'Natural Beauty Products',
      'Organic Ingredients',
      'Dried Herbs & Spices',
      'Natural Supplements',
    ],
  },
]

export const topCategories = [
  { label: 'Natural Cosmetics', count: '2,480 products', slug: 'cosmetics' },
  { label: 'Herbal Teas', count: '1,120 products', slug: 'organic' },
  { label: 'Pickles & Preserved Foods', count: '860 products', slug: 'fmcg' },
  { label: 'Herbal Oils & Extracts', count: '1,640 products', slug: 'organic' },
  { label: 'Organic Food', count: '3,020 products', slug: 'organic' },
  { label: 'Essential Oils', count: '980 products', slug: 'cosmetics' },
  { label: 'Natural Soaps', count: '740 products', slug: 'cosmetics' },
  { label: 'Dried Herbs & Spices', count: '1,380 products', slug: 'fmcg' },
]

export const countries = [
  { name: 'Russia', flag: '🇷🇺' },
  { name: 'China', flag: '🇨🇳' },
  { name: 'Turkey', flag: '🇹🇷' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'UAE', flag: '🇦🇪' },
  { name: 'Saudi Arabia', flag: '🇸🇦' },
  { name: 'India', flag: '🇮🇳' },
  { name: 'Italy', flag: '🇮🇹' },
]

const product = (id, name, category, subcategory, imageId, supplier, country, moq, price, rating) => ({
  id,
  name,
  category,
  subcategory,
  image: img(imageId, 800),
  supplier,
  country,
  moq,
  price,
  rating,
})

export const products = [
  product('p01', 'Herbal Face Cream', 'cosmetics', 'Natural Cosmetics', 'photo-1556228720-195a672e8a03', 'Nutura Labs', 'Germany', '500 units', '$4.90 – $7.20', 4.9),
  product('p02', 'Argan Repair Shampoo', 'cosmetics', 'Haircare', 'photo-1522335789203-aabd1fc54bc9', 'Nutura Labs', 'Germany', '1,000 units', '$2.40 – $3.80', 4.8),
  product('p03', 'Rose Body Butter', 'cosmetics', 'Body Care', 'photo-1601049541289-9b1b7bbbfe19', 'Anatolia Botanics', 'Turkey', '600 units', '$3.10 – $4.60', 4.7),
  product('p04', 'Botanical Soap Collection', 'cosmetics', 'Soaps & Cleansers', 'photo-1598440947619-2c35fc9aa908', 'Anatolia Botanics', 'Turkey', '1,200 units', '$1.20 – $2.10', 4.8),
  product('p05', 'Lavender Essential Oil', 'cosmetics', 'Essential Oils', 'photo-1608571423902-eed4a5ad8108', 'Desert Bloom', 'UAE', '300 units', '$6.50 – $9.40', 4.9),
  product('p06', 'Vitamin C Glow Serum', 'cosmetics', 'Skincare', 'photo-1556228453-efd6c1ff04f6', 'Nutura Labs', 'Germany', '500 units', '$5.80 – $8.90', 4.9),
  product('p07', 'Amber Eau de Parfum', 'cosmetics', 'Perfumes & Fragrances', 'photo-1541643600914-78b084683601', 'Maison Verde', 'Italy', '400 units', '$11.00 – $16.50', 4.6),
  product('p08', 'Cold-Pressed Hair Oil', 'cosmetics', 'Haircare', 'photo-1594736797933-d0501ba2fe65', 'Baikal Botanica', 'Russia', '800 units', '$2.90 – $4.20', 4.7),

  product('p09', 'Organic Green Tea', 'fmcg', 'Tea & Coffee', 'photo-1544787219-7f47ccb76574', 'Baikal Botanica', 'Russia', '2,000 boxes', '$1.10 – $2.40', 4.8),
  product('p10', 'Raw Wildflower Honey', 'fmcg', 'Honey', 'photo-1587049352846-4a222e784d38', 'Anatolia Botanics', 'Turkey', '1,500 jars', '$2.20 – $3.60', 4.9),
  product('p11', 'Premium Mixed Nuts', 'fmcg', 'Nuts & Dried Fruits', 'photo-1502741224143-90386d7f8c82', 'Green Valley Foods', 'China', '2,500 pouches', '$3.40 – $5.10', 4.7),
  product('p12', 'Dried Fruit Selection', 'fmcg', 'Snacks', 'photo-1595246140625-573b715d11dc', 'Green Valley Foods', 'China', '2,000 pouches', '$2.80 – $4.30', 4.6),
  product('p13', 'Signature Spice Set', 'fmcg', 'Spices & Seasonings', 'photo-1596040033229-a9821ebd058d', 'Al Noor Trading', 'Saudi Arabia', '1,000 sets', '$4.20 – $6.80', 4.8),
  product('p14', 'Pickled Garden Vegetables', 'fmcg', 'Pickles & Preserved Foods', 'photo-1587049352851-8d4e89133924', 'Anatolia Botanics', 'Turkey', '1,800 jars', '$1.60 – $2.70', 4.7),
  product('p15', 'Extra Virgin Olive Oil', 'fmcg', 'Packaged Food', 'photo-1474979266404-7eaacbcd87c5', 'Maison Verde', 'Italy', '900 bottles', '$5.40 – $8.20', 4.9),
  product('p16', 'Specialty Coffee Beans', 'fmcg', 'Tea & Coffee', 'photo-1447175008436-054170c2e979', 'Green Valley Foods', 'China', '1,200 kg', '$7.10 – $10.40', 4.7),

  product('p17', 'Herbal Infusion Blend', 'organic', 'Herbal Teas', 'photo-1512069772995-ec65ed45afd6', 'Baikal Botanica', 'Russia', '1,500 boxes', '$1.90 – $3.20', 4.8),
  product('p18', 'Organic Superfood Mix', 'organic', 'Organic Food', 'photo-1515377905703-c4788e51af15', 'Nutura Labs', 'Germany', '1,000 pouches', '$4.60 – $7.30', 4.7),
  product('p19', 'Botanical Plant Extract', 'organic', 'Plant Extracts', 'photo-1531895861208-8504b98fe814', 'Desert Bloom', 'UAE', '400 kg', '$9.80 – $14.60', 4.9),
  product('p20', 'Sun-Dried Herbs Selection', 'organic', 'Dried Herbs & Spices', 'photo-1597481499750-3e6b22637e12', 'Anatolia Botanics', 'Turkey', '800 kg', '$3.60 – $5.90', 4.8),
  product('p21', 'Organic Cold-Pressed Oil', 'organic', 'Natural Oils', 'photo-1474979266404-7eaacbcd87c5', 'Baikal Botanica', 'Russia', '600 bottles', '$6.20 – $9.70', 4.8),
]

export const featuredProducts = products.filter((p) =>
  ['p01', 'p09', 'p10', 'p05', 'p13', 'p18'].includes(p.id),
)

export const suppliers = [
  {
    id: 's01',
    name: 'Nutura Labs',
    country: 'Germany',
    flag: '🇩🇪',
    categories: ['Cosmetics', 'Organic'],
    products: '420 products',
    years: '12 yrs',
    rating: 4.9,
    verified: true,
    blurb: 'Dermatologically tested skincare and personal care, produced in GMP-certified facilities.',
  },
  {
    id: 's02',
    name: 'Anatolia Botanics',
    country: 'Turkey',
    flag: '🇹🇷',
    categories: ['Organic', 'FMCG'],
    products: '680 products',
    years: '18 yrs',
    rating: 4.8,
    verified: true,
    blurb: 'Family-run grower and exporter of herbs, honey, pickles and botanical extracts.',
  },
  {
    id: 's03',
    name: 'Green Valley Foods',
    country: 'China',
    flag: '🇨🇳',
    categories: ['FMCG'],
    products: '1,240 products',
    years: '15 yrs',
    rating: 4.7,
    verified: true,
    blurb: 'Large-scale FMCG manufacturing with private-label and mixed-container capability.',
  },
  {
    id: 's04',
    name: 'Desert Bloom',
    country: 'UAE',
    flag: '🇦🇪',
    categories: ['Cosmetics', 'Organic'],
    products: '310 products',
    years: '9 yrs',
    rating: 4.9,
    verified: true,
    blurb: 'Essential oils, plant extracts and fragrance ingredients for beauty brands.',
  },
  {
    id: 's05',
    name: 'Baikal Botanica',
    country: 'Russia',
    flag: '🇷🇺',
    categories: ['Organic', 'FMCG'],
    products: '540 products',
    years: '11 yrs',
    rating: 4.8,
    verified: true,
    blurb: 'Wild-harvested Siberian herbs, teas and cold-pressed oils with organic certification.',
  },
  {
    id: 's06',
    name: 'Al Noor Trading',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    categories: ['FMCG'],
    products: '860 products',
    years: '20 yrs',
    rating: 4.6,
    verified: true,
    blurb: 'Regional distributor and co-packer for spices, seasonings and daily consumer goods.',
  },
]

export const trustIndicators = [
  {
    title: 'Verified Suppliers',
    text: 'Every manufacturer is audited, certified and trade-verified.',
    icon: 'shield',
  },
  {
    title: 'Global Shipping',
    text: 'Consolidated logistics to 180+ countries, door to door.',
    icon: 'ship',
  },
  {
    title: 'Quality Assurance',
    text: 'Pre-shipment inspection and full documentation support.',
    icon: 'badge',
  },
]

export const assuranceBadges = [
  {
    title: '100% Organic',
    text: 'Naturally sourced ingredients',
    icon: 'leaf',
  },
  {
    title: 'Quality Assurance',
    text: 'Certified products & audits',
    icon: 'badge',
  },
  {
    title: 'Fast Global Shipping',
    text: 'From producer to your door',
    icon: 'ship',
  },
  {
    title: 'Business Support',
    text: 'A personal manager for your account',
    icon: 'headset',
  },
]
