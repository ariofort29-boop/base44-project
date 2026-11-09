# MR Store — Elementor Pro / WooCommerce rebuild map

The interface is built as one component per visual section so each block can be
recreated in Elementor Pro as a Container/Section + Widgets, and product data can
move to WooCommerce without redesigning the layout.

## Design tokens

| Token | Value | Where it lands in Elementor |
| --- | --- | --- |
| Primary dark green | `#075C3B` | Global Colors → Primary |
| Secondary green | `#13865A` | Global Colors → Secondary |
| Light green | `#EAF5EF` | Global Colors → Accent |
| Dark text | `#18352C` | Global Colors → Text |
| Light gray | `#F5F7F5` | Global Colors → Custom |
| White | `#FFFFFF` | Global Colors → Background |
| Display font | Fraunces (serif) | Global Fonts → Headings H1–H3 |
| Body font | Manrope (sans) | Global Fonts → Body / Buttons |

Radii: `1.25rem` cards, `1.75rem` feature panels, full pills for buttons.
Shadows: soft `0 12px 32px -20px` card shadow; no gradients on solid UI.

## Section map

| React component | Elementor structure | WooCommerce note |
| --- | --- | --- |
| `components/layout/Header.jsx` | Header template, sticky; Top Bar container + Main Header container | Language/Currency = WPML + WooCommerce Multi-Currency; search = Product Search widget |
| `components/home/Hero.jsx` | Hero container, 2 columns (copy / image mosaic) | Static; CTA links to Shop page |
| `components/home/TrustStrip.jsx` | 3-column icon card container | Static |
| `components/home/CategoryShowcase.jsx` | 3-column card loop | Product Categories loop (one card per top-level category) |
| `components/home/FeaturedProducts.jsx` | Tabbed product grid | Woo Products widget + filter tabs (or a Tabs widget per category) |
| `components/marketplace/ProductCard.jsx` | Single loop item template | Woo Product loop item, custom skin: image, category tag, title, supplier meta, MOQ + price range, Request Quote button |
| `components/home/SupplierSpotlight.jsx` | 3-column supplier cards | Vendors plugin (Dokan/WCFM) or custom post type "Supplier" |
| `components/home/HowItWorks.jsx` | Sticky copy + numbered step list | Static |
| `components/home/PartnershipBanner.jsx` | 2-column dual CTA panels | Static |
| `components/home/Testimonials.jsx` | 3-column quote cards + region strip | Static / Testimonial CPT |
| `components/home/QuoteCTA.jsx` | Dark band with inline lead form | Ninja Forms / WPForms hook to CRM |
| `components/layout/Footer.jsx` | Footer template, 4 columns + legal bar | Woo payment badge icons |
| `components/marketplace/SupplierCard.jsx` | Loop item for supplier archive | Vendor store card |
| `pages/Products.jsx` | Shop archive template: hero band, filter sidebar, product grid, sourcing CTA | Woo Shop + Filter Everything (category, origin, MOQ) |
| `pages/Suppliers.jsx` | Supplier archive with search/sort/verified filter | Vendor directory shortcode |
| `pages/Wholesale.jsx` | Pricing tiers, process steps, RFQ form, FAQ accordion | B2BKing / Wholesale Suite for tier pricing; RFQ form → Quote plugin |
| `pages/Partnership.jsx` | Benefits grid, tracks, eligibility, supplier application | Vendor registration form |
| `pages/About.jsx` | Story + stats, values grid, timeline, standards strip | Static |
| `pages/Contact.jsx` | Two columns: form + direct channels/offices | Contact Form 7 |

## B2B behaviour to preserve

- MOQ and price range are shown per product (Woo custom fields `moq`, `price_range`).
- "Request Quote" is a wholesale enquiry action, not add-to-cart.
- Verified supplier badge (`badgeCheck` icon) appears beside supplier names.
- Search covers product name, category, supplier and brand — map to Woo's product
  search plus a supplier taxonomy term search.
