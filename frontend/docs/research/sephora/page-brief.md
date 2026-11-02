# Sephora Homepage Reverse Engineering Brief

## 1. Overview
- **Source URL:** https://www.sephora.com/
- **Local Route:** `/`
- **Target Audience:** Beauty and cosmetics shoppers (USA & Canada default).
- **Core Design Ethos:** High-contrast editorial luxury with clean typography (Helvetica Neue), crisp black & white contrast, rich seasonal accent banner colors (deep ruby red `#810017`, warm gold `#d6b672`), dense informative product cards, and rich multi-level navigation.

## 2. Layout & Responsive Geometry
- **Container Max-Width:** 1280px (with 16px gutter on mobile, 24px on tablet, 32px on desktop).
- **Desktop Breakpoint:** ≥1024px for full mega menu and multi-column grid.
- **Mobile Breakpoint:** <768px with horizontal scrolling carousels, mobile bottom navigation bar, and compact header.
- **Header Heights:**
  - Top Ticker: 40px
  - Main Header: 72px
  - Category Nav Bar: 44px
- **Footer Background:** Pure black `#000000` with light gray `#cccccc` and white `#ffffff` typography.

## 3. Typography & Design Tokens
- **Font Family:** `"Helvetica Neue", Helvetica, Arial, sans-serif`
- **Colors:**
  - Foreground: `#000000`
  - Background: `#ffffff`
  - Dark Accent / Event Banner: `#810017`
  - Gold Accent: `#d6b672`
  - Border Gray: `#e6e6e6`
  - Secondary Text: `#666666`
  - Subtitle / Meta: `#757575`
  - Rating Stars: `#000000` fill with review count in parentheses
  - Clean Badge Green: `#008060`

## 4. Key Sections & Components
1. **Top Persistent Banner (Ticker)**:
   - Deep red banner (`#810017`)
   - Text: `Want 30% off‡1 ALL Sephora Collection? ‡1Terms apply. SIGN IN OR JOIN NOW ▸`
   - Right: `30% OFF` badge graphic
2. **Global Header**:
   - Sephora Wordmark SVG (`0 0 125 17`)
   - Search bar with pill border (`#000000`), search magnifying glass icon, placeholder "Search", and "AI Beauty Chat NEW" badge button
   - Store & Delivery quick link ("Shop Store & Delivery: Choose your store & location")
   - Services & Events quick link
   - Favorites / Loves icon (Heart)
   - Basket icon with counter badge
   - Sign In dropdown menu
3. **Category Navigation Bar & Mega Menu**:
   - 11 top-level categories:
     - Gifts & Value Sets (with sparkle icon)
     - New
     - Makeup
     - Skincare
     - Fragrance
     - Hair
     - Bath & Body
     - Mini Size
     - Brands
     - Gift Cards (with sparkle icon)
     - Sale & Offers
   - Hovering displays rich MegaMenu with subcategories, curated brands, and featured banners.
4. **Hero Feature Banners (3-Up Grid / Slideshow)**:
   - Card 1: Bestseller / Foundation highlight with purple background `#8065B6`
   - Card 2: Skincare / Sunscreen highlight
   - Card 3: Holiday Gifts $50 & Under highlight
5. **Product Carousel 1: "Chosen For You"**:
   - Real products extracted from live Sephora linkStore:
     - ILIA Super Serum Skin Tint SPF 40 ($48.00)
     - MILK MAKEUP Hydro Grip Primer ($38.00)
     - Rare Beauty Soft Pinch Liquid Blush ($25.00)
     - and 16 more products with images, ratings, reviews, and quick-add
6. **Special Event Banner**:
   - Sephora Savings Event (`#810017`) with 4 discount tier badges: 30% (Sephora Collection), 20% (Rouge), 15% (VIB), 10% (Insider)
7. **Promotion Carousel: "Beauty Offers (23)"**:
   - 23 promo cards with real codes (e.g. `ALLONSALE`), terms, and "Shop Now" / "See details" actions.
8. **Product Carousel 2: "Just Dropped"**:
   - Haus Labs Triclone Skin Tech Foundation ($52.00)
   - DIOR J'adore Parfum d'Eau ($185.00)
   - Gucci Luminous Matte Powder Blush ($49.00)
   - and more new arrivals
9. **Curated Value Tiles (3-Up)**:
   - Trending Gifts: $35 & Under
   - Gifts Under $50
   - Sephora Favorites Kits: Only Here
10. **Product Carousel 3: "Selling Fast"**:
    - LANEIGE Lip Sleeping Mask ($24.00)
    - Gucci Luminous Matte Blush ($49.00)
    - Charlotte Tilbury Mini Setting Powder ($29.00)
11. **Beauty Insider Rewards Carousel**:
    - Real reward products: Isle of Paradise, Dr. Dennis Gross, Youth To The People, Fenty Beauty, Ultra Violette (100 Points each)
12. **Guided Shopping ("Need a Little Guidance?")**:
    - 7 round category pills: Holiday Gift Guide, Value Sets, Fragrance, Beauty Advent Calendars, Trending on Social, Teen Skincare Resource, Sale
13. **Reassurance Banners (3-Up)**:
    - Get Your Gifts in Time (Fast Shipping terms)
    - Your Holiday Gift Guide
    - Shop Gifts Now, Pay Later (Klarna, Afterpay, PayPal)
14. **Customer Feedback Strip**:
    - "Website feedback? Let us know"
15. **Global Footer**:
    - 5 Service icons: Find a Store, Customer Service Chat, Get the App, Get Sephora Texts, Sephora Credit Card
    - 4 Link Columns: About Sephora (12 links), My Sephora (13 links), Help (13 links), Region & Language + SMS/Email sign up forms
    - Bottom Legal Bar: Copyright © 2026 Sephora USA, Inc., Privacy Policy, Terms, Accessibility, Sitemap, phone number, social icons (Instagram, Facebook, X, YouTube, Pinterest, TikTok)
16. **Mobile Bottom Navigation Bar**:
    - Fixed at screen bottom on mobile (<768px) with Home, Shop, Offers, My Store, AI Beauty.
17. **International Modal**:
    - Sephora country detection dialog that users can dismiss or toggle.
