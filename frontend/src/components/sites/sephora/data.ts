// Auto-extracted and curated Sephora real catalog data
export interface Product {
  id: string;
  skuId: string;
  brand: string;
  name: string;
  price: string;
  variation?: string;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  url: string;
}

export interface PromoOffer {
  id: string;
  title: string;
  description: string;
  code?: string;
  legalCopy: string;
  actionLabel: string;
  detailsActionLabel: string;
  image: string;
}

export interface RewardItem {
  id: string;
  brand: string;
  name: string;
  points: string;
  image: string;
  url: string;
}

export const megaNavData = [
  {
    "id": "Meganav-Gifts",
    "label": "Gifts & Value Sets",
    "hasSparkle": true,
    "subcategories": [
      {
        "label": "All Gifts",
        "href": "/shop/all-gifts"
      },
      {
        "label": "Holiday Gift Guide",
        "href": "/shop/holiday-gift-guide"
      },
      {
        "label": "Gift Card",
        "href": "/shop/gift-card"
      },
      {
        "label": "Value & Gift Sets",
        "href": "/shop/value-gift-sets"
      },
      {
        "label": "By Price",
        "href": "/shop/by-price"
      },
      {
        "label": "By Category",
        "href": "/shop/by-category"
      },
      {
        "label": "By Recipient",
        "href": "/shop/by-recipient"
      },
      {
        "label": "Top Rated Gifts",
        "href": "/shop/top-rated-gifts"
      },
      {
        "label": "Gifts on Sale",
        "href": "/shop/gifts-on-sale"
      },
      {
        "label": "Advent Calendars",
        "href": "/shop/advent-calendars"
      },
      {
        "label": "Sephora Favorites Kits",
        "href": "/shop/sephora-favorites-kits"
      },
      {
        "label": "Mini Size",
        "href": "/shop/mini-size"
      }
    ]
  },
  {
    "id": "Meganav-New",
    "label": "New",
    "hasSparkle": true,
    "subcategories": [
      {
        "label": "All New",
        "href": "/shop/all-new"
      },
      {
        "label": "Holiday Gift Guide",
        "href": "/shop/holiday-gift-guide"
      },
      {
        "label": "Just Dropped",
        "href": "/shop/just-dropped"
      },
      {
        "label": "New Makeup",
        "href": "/shop/new-makeup"
      },
      {
        "label": "New Skincare",
        "href": "/shop/new-skincare"
      },
      {
        "label": "New Hair Care",
        "href": "/shop/new-hair-care"
      },
      {
        "label": "New Fragrance",
        "href": "/shop/new-fragrance"
      },
      {
        "label": "New Bath & Body",
        "href": "/shop/new-bath-body"
      },
      {
        "label": "The Next Big Thing",
        "href": "/shop/the-next-big-thing"
      },
      {
        "label": "Bestsellers",
        "href": "/shop/bestsellers"
      },
      {
        "label": "Trending on Social",
        "href": "/shop/trending-on-social"
      },
      {
        "label": "Refillable Beauty Products",
        "href": "/shop/refillable-beauty-products"
      }
    ]
  },
  {
    "id": "Meganav-Makeup",
    "label": "Makeup",
    "hasSparkle": false,
    "subcategories": [
      {
        "label": "All Makeup",
        "href": "/shop/all-makeup"
      },
      {
        "label": "Face",
        "href": "/shop/face"
      },
      {
        "label": "Eye",
        "href": "/shop/eye"
      },
      {
        "label": "Lip",
        "href": "/shop/lip"
      },
      {
        "label": "Cheek",
        "href": "/shop/cheek"
      },
      {
        "label": "Value & Gift Sets",
        "href": "/shop/value-gift-sets"
      },
      {
        "label": "Makeup Palettes",
        "href": "/shop/makeup-palettes"
      },
      {
        "label": "Nail",
        "href": "/shop/nail"
      },
      {
        "label": "Brushes & Applicators",
        "href": "/shop/brushes-applicators"
      },
      {
        "label": "Accessories",
        "href": "/shop/accessories"
      },
      {
        "label": "New",
        "href": "/shop/new"
      },
      {
        "label": "Bestsellers",
        "href": "/shop/bestsellers"
      }
    ]
  },
  {
    "id": "Meganav-Skincare",
    "label": "Skincare",
    "hasSparkle": false,
    "subcategories": [
      {
        "label": "All Skincare",
        "href": "/shop/all-skincare"
      },
      {
        "label": "Moisturizers",
        "href": "/shop/moisturizers"
      },
      {
        "label": "Cleansers",
        "href": "/shop/cleansers"
      },
      {
        "label": "Treatments",
        "href": "/shop/treatments"
      },
      {
        "label": "Masks",
        "href": "/shop/masks"
      },
      {
        "label": "Eye Care",
        "href": "/shop/eye-care"
      },
      {
        "label": "Lip Balms & Treatments",
        "href": "/shop/lip-balms-treatments"
      },
      {
        "label": "Sunscreen",
        "href": "/shop/sunscreen"
      },
      {
        "label": "Value & Gift Sets",
        "href": "/shop/value-gift-sets"
      },
      {
        "label": "High Tech Tools",
        "href": "/shop/high-tech-tools"
      },
      {
        "label": "Men's Grooming",
        "href": "/shop/men-s-grooming"
      },
      {
        "label": "Wellness",
        "href": "/shop/wellness"
      }
    ]
  },
  {
    "id": "Meganav-Fragrance",
    "label": "Fragrance",
    "hasSparkle": false,
    "subcategories": [
      {
        "label": "All Fragrance",
        "href": "/shop/all-fragrance"
      },
      {
        "label": "Women",
        "href": "/shop/women"
      },
      {
        "label": "Men",
        "href": "/shop/men"
      },
      {
        "label": "Unisex / Genderless",
        "href": "/shop/unisex-genderless"
      },
      {
        "label": "Value & Gift Sets",
        "href": "/shop/value-gift-sets"
      },
      {
        "label": "Candles & Home Scents",
        "href": "/shop/candles-home-scents"
      },
      {
        "label": "Shop by Fragrance Family",
        "href": "/shop/shop-by-fragrance-family"
      },
      {
        "label": "New",
        "href": "/shop/new"
      },
      {
        "label": "Bestsellers",
        "href": "/shop/bestsellers"
      },
      {
        "label": "Clean Fragrance",
        "href": "/shop/clean-fragrance"
      },
      {
        "label": "Vegan Fragrance",
        "href": "/shop/vegan-fragrance"
      },
      {
        "label": "Mini Size",
        "href": "/shop/mini-size"
      }
    ]
  },
  {
    "id": "Meganav-Hair",
    "label": "Hair",
    "hasSparkle": false,
    "subcategories": [
      {
        "label": "All Hair",
        "href": "/shop/all-hair"
      },
      {
        "label": "Shampoo & Conditioner",
        "href": "/shop/shampoo-conditioner"
      },
      {
        "label": "Treatments",
        "href": "/shop/treatments"
      },
      {
        "label": "Styling",
        "href": "/shop/styling"
      },
      {
        "label": "Accessories",
        "href": "/shop/accessories"
      },
      {
        "label": "Value & Gift Sets",
        "href": "/shop/value-gift-sets"
      },
      {
        "label": "Hair & Body Mist",
        "href": "/shop/hair-body-mist"
      },
      {
        "label": "Hair Styling Tools",
        "href": "/shop/hair-styling-tools"
      },
      {
        "label": "Brushes & Combs",
        "href": "/shop/brushes-combs"
      },
      {
        "label": "Curly, Coily, Textured Hair Care",
        "href": "/shop/curly-coily-textured-hair-care"
      },
      {
        "label": "Shop by Concern",
        "href": "/shop/shop-by-concern"
      },
      {
        "label": "Shop by Style",
        "href": "/shop/shop-by-style"
      }
    ]
  },
  {
    "id": "Meganav-BathAndBody",
    "label": "Bath & Body",
    "hasSparkle": false,
    "subcategories": [
      {
        "label": "All Bath & Body",
        "href": "/shop/all-bath-body"
      },
      {
        "label": "Bath & Shower",
        "href": "/shop/bath-shower"
      },
      {
        "label": "Body Moisturizers",
        "href": "/shop/body-moisturizers"
      },
      {
        "label": "Deodorant & Antiperspirant",
        "href": "/shop/deodorant-antiperspirant"
      },
      {
        "label": "Body Mist & Hair Mist",
        "href": "/shop/body-mist-hair-mist"
      },
      {
        "label": "Sunscreen",
        "href": "/shop/sunscreen"
      },
      {
        "label": "Self Tanners",
        "href": "/shop/self-tanners"
      },
      {
        "label": "Wellness",
        "href": "/shop/wellness"
      },
      {
        "label": "Candles & Home Scents",
        "href": "/shop/candles-home-scents"
      },
      {
        "label": "Shop By Concern",
        "href": "/shop/shop-by-concern"
      },
      {
        "label": "New",
        "href": "/shop/new"
      },
      {
        "label": "Bestsellers",
        "href": "/shop/bestsellers"
      }
    ]
  },
  {
    "id": "Meganav-MiniSize",
    "label": "Mini Size",
    "hasSparkle": false,
    "subcategories": [
      {
        "label": "All Mini Size",
        "href": "/shop/all-mini-size"
      },
      {
        "label": "Makeup",
        "href": "/shop/makeup"
      },
      {
        "label": "Skincare",
        "href": "/shop/skincare"
      },
      {
        "label": "Hair",
        "href": "/shop/hair"
      },
      {
        "label": "Fragrance",
        "href": "/shop/fragrance"
      },
      {
        "label": "Bath & Body",
        "href": "/shop/bath-body"
      },
      {
        "label": "Value & Gift Sets",
        "href": "/shop/value-gift-sets"
      },
      {
        "label": "$15 and Under",
        "href": "/shop/-15-and-under"
      },
      {
        "label": "$25 and Under",
        "href": "/shop/-25-and-under"
      },
      {
        "label": "$35 and Under",
        "href": "/shop/-35-and-under"
      },
      {
        "label": "Sephora Favorites",
        "href": "/shop/sephora-favorites"
      },
      {
        "label": "Luxe Minis",
        "href": "/shop/luxe-minis"
      }
    ]
  },
  {
    "id": "Meganav-Brands",
    "label": "Brands",
    "hasSparkle": false,
    "subcategories": [
      {
        "label": "Brands A-Z",
        "href": "/brands-list"
      },
      {
        "label": "SEPHORA COLLECTION",
        "href": "/shop/sephora-collection"
      },
      {
        "label": "New Brands",
        "href": "/shop/new-brands"
      },
      {
        "label": "Featured at Sephora",
        "href": "/shop/featured-at-sephora"
      },
      {
        "label": "Only at Sephora",
        "href": "/shop/only-at-sephora"
      },
      {
        "label": "Affordable Brands",
        "href": "/shop/affordable-brands"
      },
      {
        "label": "Black-Owned Brands",
        "href": "/shop/black-owned-brands"
      },
      {
        "label": "Clean at Sephora",
        "href": "/shop/clean-at-sephora"
      }
    ]
  },
  {
    "id": "Meganav-Giftcards",
    "label": "Gift Cards",
    "hasSparkle": true,
    "subcategories": [
      {
        "label": "All Gift Cards",
        "href": "/shop/all-gift-cards"
      },
      {
        "label": "Digital Gift Cards",
        "href": "https://sephora.cashstar.com/store/recipient?ref=LEFTNAV&locale=en-us"
      },
      {
        "label": "Physical Gift Cards",
        "href": "/shop/physical-gift-cards"
      },
      {
        "label": "Corporate Gift Cards",
        "href": "https://sephora-biz.cashstar.com/home/"
      },
      {
        "label": "Check Balance & Add to Wallet",
        "href": "/shop/check-balance-add-to-wallet"
      },
      {
        "label": "Gift Card Scam Awareness",
        "href": "/shop/gift-card-scam-awareness"
      },
      {
        "label": "Gift Card FAQ",
        "href": "/shop/gift-card-faq"
      }
    ]
  },
  {
    "id": "Meganav-SaleAndOffers",
    "label": "Sale & Offers",
    "hasSparkle": false,
    "subcategories": [
      {
        "label": "All Sale",
        "href": "/shop/all-sale"
      },
      {
        "label": "Makeup",
        "href": "/sale?node=cat140006"
      },
      {
        "label": "Skincare",
        "href": "/sale?node=cat150006"
      },
      {
        "label": "Hair Care",
        "href": "/sale?node=cat130038"
      },
      {
        "label": "Fragrance",
        "href": "/sale?node=cat160006"
      },
      {
        "label": "Bath & Body",
        "href": "/sale?node=cat140014"
      },
      {
        "label": "Mini Size",
        "href": "/sale?node=cat1830032"
      },
      {
        "label": "Beauty Offers",
        "href": "/shop/beauty-offers"
      }
    ]
  }
];

export const heroBannersData = [
  {
    "id": "homepage_slideshow_multi-world_slotting_bestsellers_broadcast_us_ca_rwd_banner_101526_september_fallback",
    "bgColor": "#8065B6",
    "textColor": "#000000",
    "image": "https://www.sephora.com/contentimages/2026-09-26_cs-bestsellers-v2_site_hp_hero-banner_us-can_01.jpg",
    "alt": "products displayed: Haus Labs by Lady Gaga Foundation, Josie Maran Body Butter, KAYALI fragrance bottle, gisou hair",
    "title": "Go-Tos Only",
    "subtitle": "Bestselling beauty—sooo good.",
    "cta": "SHOP TOP PICKS ▸"
  },
  {
    "id": "homepage_slideshow_skincare_program_kskin0926_FY264910_broadcast_us_rwd_banner_101526_fallback",
    "bgColor": "#D61A8D",
    "textColor": "#ffffff",
    "image": "https://www.sephora.com/contentimages/2026-09-17_sept-korean-skincare_site_hp_new-for-you_us-can_3373.jpg",
    "alt": "featuring korean skincare sunscreen products from Dr. Jart+, Innisfree, Beauty of Joseon",
    "title": "Weightless Korean Sunscreen",
    "subtitle": "Daily SPF has never felt so good.",
    "cta": "SHOP NOW ▸"
  },
  {
    "id": "homepage_slideshow_multi-world_animation_HolidayPreview0926_FY264949_broadcast_us_rwd_banner_102126_fallback",
    "bgColor": "#DEDEDE",
    "textColor": "#000000",
    "image": "https://www.sephora.com/contentimages/2026-10-21_holiday-preview_general_site_hp_hero-banner_value-sets-pulse-2_default_insiders-and-unrecognized_us_3883.jpg",
    "alt": "FREE SHIPPING FOR BEAUTY INSIDERS | Value Sets featuring Summer Fridays, Rare Beauty by Selena Gomez, Dolce & Gabbana, Color WOW",
    "title": "Holiday Gifts Are Here",
    "subtitle": "Get your hands on just-dropped value sets.",
    "cta": "SHOP NOW ▸"
  }
];

export const chosenForYouData: Product[] = [
  {
    "id": "P455418",
    "skuId": "2333607",
    "brand": "ILIA",
    "name": "Super Serum Skin Tint SPF 40 - Hydrating Foundation",
    "price": "$48.00",
    "variation": "Matira ST11 - Medium with cool undertones",
    "rating": 3.9,
    "reviews": 9638,
    "image": "https://www.sephora.com/productimages/sku/s2333607-main-zoom.jpg?pb=clean-at-sephora",
    "badge": "Clean at Sephora",
    "url": "https://www.sephora.com/product/ilia-super-serum-skin-tint-spf-40-P455418?skuId=2333607"
  },
  {
    "id": "P441813",
    "skuId": "2169423",
    "brand": "MILK MAKEUP",
    "name": "Hydro Grip Hydrating Makeup Primer with Hyaluronic Acid + Niacinamide",
    "price": "$38.00",
    "variation": "1.52 oz/45 mL",
    "rating": 4,
    "reviews": 9928,
    "image": "https://www.sephora.com/productimages/sku/s2169423-main-zoom.jpg?pb=clean-at-sephora",
    "badge": "Clean at Sephora",
    "url": "https://www.sephora.com/product/hydro-grip-primer-P441813?skuId=2169423"
  },
  {
    "id": "P97989778",
    "skuId": "2362085",
    "brand": "Rare Beauty by Selena Gomez",
    "name": "Soft Pinch Liquid Blush",
    "price": "$25.00",
    "variation": "Happy - dewy cool pink",
    "rating": 4.5,
    "reviews": 12617,
    "image": "https://www.sephora.com/productimages/sku/s2362085-main-zoom.jpg",
    "url": "https://www.sephora.com/product/rare-beauty-by-selena-gomez-soft-pinch-liquid-blush-P97989778?skuId=2362085"
  },
  {
    "id": "P457223",
    "skuId": "2319820",
    "brand": "OUAI",
    "name": "Detox Clarifying Shampoo with Apple Cider Vinegar",
    "price": "$34.00",
    "variation": "10 oz/ 300 mL",
    "rating": 4.6,
    "reviews": 5527,
    "image": "https://www.sephora.com/productimages/sku/s2319820-main-zoom-1.jpg?pb=best-of-beauty-2026",
    "badge": "best of beauty 2026",
    "url": "https://www.sephora.com/product/ouai-haircare-detox-shampoo-P457223?skuId=2319820"
  },
  {
    "id": "P479846",
    "skuId": "2547248",
    "brand": "K18 Biomimetic Hairscience",
    "name": "Leave-In Molecular Repair Hair Mask",
    "price": "$75.00",
    "rating": 4.2,
    "reviews": 5281,
    "image": "https://www.sephora.com/productimages/sku/s2547248-main-zoom.jpg?pb=clean-at-sephora",
    "badge": "Clean at Sephora",
    "url": "https://www.sephora.com/product/leave-in-molecular-repair-mask-P479846?skuId=2547248"
  },
  {
    "id": "P442563",
    "skuId": "2210607",
    "brand": "The Ordinary",
    "name": "AHA 30% + BHA 2% High-Strength Peeling Solution for Brightening",
    "price": "$9.50",
    "variation": "1 oz/ 30 mL",
    "rating": 4.5,
    "reviews": 3999,
    "image": "https://www.sephora.com/productimages/sku/s2210607-main-zoom.jpg",
    "url": "https://www.sephora.com/product/aha-30-bha-2-peeling-solution-P442563?skuId=2210607"
  },
  {
    "id": "P406080",
    "skuId": "1802412",
    "brand": "Sol de Janeiro",
    "name": "Brazilian Bum Bum Visibly Firming Refillable Body Cream with Caffeine-Rich Guaranà",
    "price": "$48.00",
    "variation": "8 oz/240 mL",
    "rating": 4.3,
    "reviews": 10031,
    "image": "https://www.sephora.com/productimages/sku/s1802412-main-zoom.jpg",
    "url": "https://www.sephora.com/product/brazilian-bum-bum-visibly-firming-refillable-body-cream-p406080-P406080?skuId=1802412"
  },
  {
    "id": "P456218",
    "skuId": "2315158",
    "brand": "Supergoop!",
    "name": "Glowscreen SPF 40 Sunscreen with Hyaluronic Acid + Niacinamide",
    "price": "$38.00",
    "variation": "1.7 oz Sunrise / 50 mL - champagne",
    "rating": 3.9,
    "reviews": 3243,
    "image": "https://www.sephora.com/productimages/sku/s2315158-main-zoom.jpg",
    "url": "https://www.sephora.com/product/supergoop-glowscreen-sunscreen-spf-40-P456218?skuId=2315158"
  },
  {
    "id": "P446938",
    "skuId": "2233849",
    "brand": "Drunk Elephant",
    "name": "Lala Retro™ Nourishing Whipped Refillable Moisturizer with Ceramides",
    "price": "$68.00",
    "variation": "1.69 oz/50 mL",
    "rating": 4.1,
    "reviews": 3514,
    "image": "https://www.sephora.com/productimages/sku/s2233849-main-zoom.jpg?pb=clean-at-sephora",
    "badge": "Clean at Sephora",
    "url": "https://www.sephora.com/product/drunk-elephant-lala-retro-whipped-moisturizer-with-ceramides-P446938?skuId=2233849"
  },
  {
    "id": "P442840",
    "skuId": "2215945",
    "brand": "Skinfix",
    "name": "Triple Lipid-Peptide Cream Refillable Barrier Moisturizer with Ceramides",
    "price": "$54.00",
    "variation": "1.7 oz/50 mL",
    "rating": 4.5,
    "reviews": 927,
    "image": "https://www.sephora.com/productimages/sku/s2215945-main-zoom.jpg?pb=clean-planet-aware",
    "badge": "Clean plus Planet Aware",
    "url": "https://www.sephora.com/product/skinfix-barrier-strengthening-and-moisturizing-triple-lipid-peptide-refillable-cream-with-b-l3-P442840?skuId=2215945"
  },
  {
    "id": "P421996",
    "skuId": "2663763",
    "brand": "Kiehl's Since 1851",
    "name": "Ultra Facial Refillable Moisturizing Cream with Squalane and Pro-Ceramides",
    "price": "$39.00",
    "variation": "1.7 oz / 50 mL",
    "rating": 4.5,
    "reviews": 3722,
    "image": "https://www.sephora.com/productimages/sku/s2663763-main-zoom-1.jpg",
    "url": "https://www.sephora.com/product/ultra-facial-cream-P421996?skuId=2663763"
  },
  {
    "id": "P417312",
    "skuId": "1930759",
    "brand": "Sol de Janeiro",
    "name": "Cheirosa 62 Bum Bum Hair & Body Refillable Perfume Mist",
    "price": "$39.00",
    "variation": "8 oz/240 mL",
    "rating": 4.4,
    "reviews": 3481,
    "image": "https://www.sephora.com/productimages/sku/s1930759-main-zoom.jpg",
    "url": "https://www.sephora.com/product/brazilian-crush-body-fragrance-mist-P417312?skuId=1930759"
  },
  {
    "id": "P385477",
    "skuId": "2644532",
    "brand": "DIOR",
    "name": "Miss Dior Blooming Bouquet",
    "price": "$155.00",
    "variation": "3.4 oz / 100 mL eau de toilette spray",
    "rating": 4.3,
    "reviews": 2852,
    "image": "https://www.sephora.com/productimages/sku/s2644532-main-zoom.jpg",
    "url": "https://www.sephora.com/product/miss-dior-blooming-bouquet-P385477?skuId=2644532"
  },
  {
    "id": "P258612",
    "skuId": "1237379",
    "brand": "CHANEL",
    "name": "CHANCE EAU TENDRE Eau de Toilette",
    "price": "$124.00",
    "variation": "1.7 oz  ",
    "rating": 4.7,
    "reviews": 697,
    "image": "https://www.sephora.com/productimages/sku/s1237379-main-zoom.jpg",
    "url": "https://www.sephora.com/product/chance-eau-tendre-P258612?skuId=1237379"
  },
  {
    "id": "P504364",
    "skuId": "2649770",
    "brand": "Glossier",
    "name": "Glossier You Eau de Parfum",
    "price": "$82.00",
    "variation": "1.7 oz / 50 mL eau de parfum spray",
    "rating": 4.1,
    "reviews": 2177,
    "image": "https://www.sephora.com/productimages/sku/s2649770-main-zoom.jpg",
    "url": "https://www.sephora.com/product/glossier-glossier-you-eau-de-parfum-P504364?skuId=2649770"
  },
  {
    "id": "P436489",
    "skuId": "2101293",
    "brand": "TOM FORD",
    "name": "Lost Cherry Eau de Parfum with Black Cherry & Rose",
    "price": "$405.00",
    "variation": "1.7oz/50ml  ",
    "rating": 4.2,
    "reviews": 1774,
    "image": "https://www.sephora.com/productimages/sku/s2101293-main-zoom.jpg?pb=allure-best-2021-badge",
    "badge": "2021 Allure Best of Beauty Award Winner",
    "url": "https://www.sephora.com/product/lost-cherry-P436489?skuId=2101293"
  },
  {
    "id": "P448102",
    "skuId": "2249746",
    "brand": "Yves Saint Laurent",
    "name": "Libre Eau De Parfum with Orange Blossom & Lavender",
    "price": "$185.00",
    "variation": "3.04 oz / 90 mL eau de parfum spray",
    "rating": 4.5,
    "reviews": 4543,
    "image": "https://www.sephora.com/productimages/sku/s2249746-main-zoom.jpg",
    "url": "https://www.sephora.com/product/libre-eau-de-parfum-P448102?skuId=2249746"
  },
  {
    "id": "P479846",
    "skuId": "2547248",
    "brand": "K18 Biomimetic Hairscience",
    "name": "Leave-In Molecular Repair Hair Mask",
    "price": "$75.00",
    "rating": 4.2,
    "reviews": 5281,
    "image": "https://www.sephora.com/productimages/sku/s2547248-main-zoom.jpg?pb=clean-at-sephora",
    "badge": "Clean at Sephora",
    "url": "https://www.sephora.com/product/leave-in-molecular-repair-mask-P479846?skuId=2547248"
  },
  {
    "id": "P469065",
    "skuId": "2437267",
    "brand": "COLOR WOW",
    "name": "Dream Coat Supernatural Anti-Frizz, Blow Dry Treatment Spray",
    "price": "$30.00",
    "variation": "6.7 fl oz/200 mL",
    "rating": 3.9,
    "reviews": 2986,
    "image": "https://www.sephora.com/productimages/sku/s2437267-main-zoom.jpg",
    "url": "https://www.sephora.com/product/color-wow-dream-coat-supernatural-treatment-spray-for-frizzy-hair-P469065?skuId=2437267"
  }
];

export const savingsBannerData = {
  "bgColor": "#810017",
  "image": "https://www.sephora.com/contentimages/2026-10-30_HSE_site-d-m-a_marketing-banner_ALL_us-can_3989.jpg",
  "title": "Sephora Savings Event",
  "subtitle": "Rouge save first, Insider and VIB save on EVERYTHING starting 11/3.",
  "cta": "SEE DETAILS ▸",
  "tiers": [
    {
      "label": "SEPHORA COLLECTION",
      "discount": "30% OFF",
      "dates": "10/30–11/9",
      "badgeColor": "#f6b834",
      "textColor": "#000000"
    },
    {
      "label": "ROUGE",
      "discount": "20% OFF",
      "dates": "10/30–11/9",
      "badgeColor": "#e60023",
      "textColor": "#ffffff"
    },
    {
      "label": "VIB",
      "discount": "15% OFF",
      "dates": "11/3–11/9",
      "badgeColor": "#000000",
      "textColor": "#ffffff"
    },
    {
      "label": "INSIDER",
      "discount": "10% OFF",
      "dates": "11/3–11/9",
      "badgeColor": "#ffffff",
      "textColor": "#000000"
    }
  ]
};

export const beautyOffersData: PromoOffer[] = [
  {
    "id": "se_sc30_1026",
    "title": "Get 30% off ALL Sephora Collection",
    "description": "Save on must-haves during the Sephora Savings Event. Use code ALLONSALE.",
    "code": "ALLONSALE",
    "legalCopy": "Multiuse. Terms apply.",
    "actionLabel": "Shop Now",
    "detailsActionLabel": "See details",
    "image": "https://www.sephora.com/contentimages/2026-10-30_HSE_site-d-m-a_banner_ALL_us-can_3996.jpg"
  },
  {
    "id": "sp_hserougegwp1026",
    "title": "Get a Beauty Bag with 10 Juicy Samples",
    "description": "Enjoy a Rouge-exclusive gift with $150 spend. Use code INTHEBAG.",
    "code": "INTHEBAG",
    "legalCopy": "Terms apply. While supplies last. Products may vary.",
    "actionLabel": "Shop Now",
    "detailsActionLabel": "See details",
    "image": "https://www.sephora.com/contentimages/2026-10-30_HSE_site-d-m-a_ROUGE_us-can_3998.jpg"
  },
  {
    "id": "PROMO_TLP_hse26baf_0800960",
    "title": "Share Your Discount, Rouge!",
    "description": "Give up to 5 friends 20% off^‡‡^ during the Sephora Savings Event.",
    "legalCopy": "Limitations/terms apply.",
    "actionLabel": "Invite Now",
    "detailsActionLabel": "See details",
    "image": "https://www.sephora.com/contentimages/2026-10-23_HSE_site-a_HOMEPAGE_ROUGE_us-can_4049.jpg"
  },
  {
    "id": "beautyoffers_offerbanner_loyalty_animation_HSE2026_FY265170_creditcard_broadcast_us_rwd_promo_103026",
    "title": "Save on your Sephora Credit Card Purchase",
    "description": "When you combine Sephora Credit Card Rewards with your Sephora Savings Event discount.^¶¶4 ^",
    "legalCopy": "Terms apply.",
    "actionLabel": "Learn More",
    "detailsActionLabel": "See details",
    "image": "https://www.sephora.com/contentimages/2026-10-30_HSE_site-d-m-a_banner_ALL_us_3997.jpg"
  },
  {
    "id": "sp_2smgm1026",
    "title": "Spend More, Get More",
    "description": "Get two, four, or six FREE* trial sizes with $55, $80, or $105 min. spend.",
    "legalCopy": "*Exclusions/terms apply.",
    "actionLabel": "Download App",
    "detailsActionLabel": "See details",
    "image": "https://www.sephora.com/contentimages/2026-10-07_holiday-preview_app_site_beauty-offers_banner_generic-smgm-promo_us-can_v1_4182.jpg"
  },
  {
    "id": "sp_k18play1026",
    "title": "Get a Free* K18 Trial Size",
    "description": "Try the HeatBounce Leave-In Conditioner for next-level heat protection and hydration.",
    "legalCopy": "*Exclusions/terms apply.",
    "actionLabel": "Shop Now",
    "detailsActionLabel": "See details",
    "image": "https://www.sephora.com/contentimages/2026-10-26_k18-holiday-gift-sets_site_beauty-offers_banner_us-can_2821.jpg"
  },
  {
    "id": "sp_paulachallenge1026",
    "title": "Free Paula’s Choice Trial Sizes",
    "description": "Visibly refine pores and plump skin with a fan-fave toner and pro-collagen moisturizer.",
    "legalCopy": "*Exclusions/terms apply.",
    "actionLabel": "Shop Now",
    "detailsActionLabel": "See details",
    "image": "https://www.sephora.com/contentimages/26-10-24_october-skincare-challenge-paulas-choice_site_beauty-offers_banner_us-can_2821.jpg"
  },
  {
    "id": "sp_choosekorean1026",
    "title": "Try a Skincare trial size",
    "description": "Choose 1 of 4 trial sizes.",
    "legalCopy": "*Exclusions/terms apply.",
    "actionLabel": "Shop Now",
    "detailsActionLabel": "See details",
    "image": "https://www.sephora.com/contentimages/2026-10-14_cs_promo_KBEAUTY_app_beauty-offers-banner_us.jpg"
  },
  {
    "id": "sp_vibroribe1026",
    "title": "Complimentary Oribe Trial Sizes",
    "description": "Snag a high-gloss leave-in conditioner and smoothing formula for shinier hair.",
    "legalCopy": "*Exclusions/terms apply.",
    "actionLabel": "Shop Now",
    "detailsActionLabel": "See details",
    "image": "https://www.sephora.com/contentimages/26-10-19_vib-r-gifts_site_beauty-offers_banner_us-can_2821-3780.jpg"
  },
  {
    "id": "sp_choosscaudalie1026",
    "title": "Complimentary* Caudalie",
    "description": "Choose a trial size of the Vinoperfect moisturizer or Premier Cru cream.",
    "legalCopy": "*Exclusions/terms apply.",
    "actionLabel": "Shop Now",
    "detailsActionLabel": "See details",
    "image": "https://www.sephora.com/contentimages/26-10-01_new-caudalie-resveratrol-lift-collection_site_beauty-offers_banner_us-can_2821.jpg"
  },
  {
    "id": "sp_ctgwp0926",
    "title": "Free* Charlotte Tilbury Gift Set",
    "description": "Get a trial size of the Airbrush Flawless Setting Spray, a keychain charm, and a tote bag.",
    "legalCopy": "*Exclusions/terms apply.",
    "actionLabel": "Shop Now",
    "detailsActionLabel": "Shop Now",
    "image": "https://www.sephora.com/contentimages/26-09-24_charlotte-tilbury_site_beauty-offers_banner_us-can_2821.jpg"
  },
  {
    "id": "PROMO_GWP_sp_oliveyoung0826",
    "title": "Free OLIVE YOUNG Tote",
    "description": "Shop Korea’s #1 beauty store and get an exclusive tote with your OLIVE YOUNG purchase.",
    "legalCopy": "*Exclusions/terms apply.",
    "actionLabel": "Shop Now",
    "detailsActionLabel": "Shop Now",
    "image": "https://www.sephora.com/contentimages/26-08-20_olive-young-launch_site_beauty-offers_banner_us_2821.jpg"
  },
  {
    "id": "sp_mjbbag0926",
    "title": "Free Marc Jacobs Beauty Gift",
    "description": "Get a free puffy makeup bag when you shop the brand.",
    "legalCopy": "*Exclusions/terms apply.",
    "actionLabel": "Shop Now",
    "detailsActionLabel": "Shop Now",
    "image": "https://www.sephora.com/contentimages/2026-09-01_marc-jacobs-brand-launch_site_beauty-offers_banner_us_2821.jpg"
  },
  {
    "id": "beautyoffers_offerbanner_loyalty_program_creditcardacq_HolidayCore0926_FY264956_broadcast_us_rwd_promo_102926",
    "title": "Get 25% off Your First Purchase",
    "description": "When you open and use a Sephora credit card at Sephora today.",
    "legalCopy": "Exclusions/terms apply.",
    "actionLabel": "Learn More",
    "detailsActionLabel": "See details",
    "image": "https://www.sephora.com/contentimages/2026-10-29_holiday-core_CREDIT-CARD-Acquisition_site_beauty-offers_banner_us_2821.jpg"
  },
  {
    "id": "beautyoffers_offerbanner_loyalty_program_FY265165_gamification_challenge8_broadcast_us_ca_rwd_promo_101526",
    "title": "Earn up to 500 Points^",
    "description": "When you complete tasks like ordering with Buy Online, Pick Up In Store.",
    "legalCopy": "^Terms apply.",
    "actionLabel": "Join Challenge",
    "detailsActionLabel": "See details",
    "image": "https://www.sephora.com/contentimages/2026-10-16_loyalty-promo_gamification-challenge-8_site_breauty-offers_banner_us-can_2821.jpg"
  },
  {
    "id": "beautyoffers_offerbanner_promofinancial_program_sdu_HolidayPreview0926_FY264949_broadcast_us_ca_rwd_promo_091026",
    "title": "Holiday Shopping Hack",
    "description": "Sign up for Same-Day Unlimited for easy deliveries from store to door.",
    "legalCopy": "§Terms apply.",
    "actionLabel": "Sign Up Now",
    "detailsActionLabel": "See details",
    "image": "https://www.sephora.com/contentimages/2026-09-10_holiday-preview_same-day-unlimited_site_beauty-offers_banner_generic_us-can_2821.jpg"
  },
  {
    "id": "beautyoffers_offerbanner_pdpsamples_program_pov0926_FY265331_broadcast_us_rwd_promo_090326",
    "title": "Free* point of view. Trial Size",
    "description": "Support your skin barrier with this lightweight, glow-boosting moisturizer.",
    "legalCopy": "*Exclusions/terms apply. While supplies last.",
    "actionLabel": "Select Sample",
    "detailsActionLabel": "See details",
    "image": "https://www.sephora.com/contentimages/26-09-10_point-of-view_site_beauty-offers_banner_us-can_3712.jpg"
  },
  {
    "id": "beautyoffers_offerbanner_pdpsamples_program_broadcast_FragrancePDPSample0826_FY265661_us_rwd_promo_082626",
    "title": "Free Fragrance Samples",
    "description": "Get 3 free samples with $25 min. spend.*",
    "legalCopy": "*Exclusions/terms apply.",
    "actionLabel": "Choose Now",
    "detailsActionLabel": "See details",
    "image": "https://www.sephora.com/contentimages/2026-07-20_fragrance-pdp-sampling_site_beauty-offers_banner_us_v1_2821.jpg"
  },
  {
    "id": "MERCH_5_SCFACEMASKS_6_100_N_0_0826",
    "title": "SEPHORA COLLECTION Sale",
    "description": "Buy three, get one free^∆^ on select face sheet masks.",
    "legalCopy": "Exclusions/terms apply.",
    "actionLabel": "Shop Now",
    "detailsActionLabel": "See details",
    "image": "https://www.sephora.com/contentimages/2026-08-03_cs-clinique-flash-sale-v2-one-off_app_hp_cntnt-card_can_gr.jpg"
  },
  {
    "id": "Replen_K18_Y_5_parent_0826",
    "title": "Get 10% off K18 Biomimetic Hairscience",
    "description": "Subscribe and save on select fan faves.",
    "legalCopy": "Terms apply.",
    "actionLabel": "Shop Now",
    "detailsActionLabel": "See details",
    "image": "https://www.sephora.com/contentimages/2026-08-04_cs-baar_site_beauty-offers_banner_us_gr.jpg"
  },
  {
    "id": "Replen_SC_10_0626",
    "title": "Get 10% off Sephora Collection",
    "description": "Subscribe and save on select fan faves.",
    "legalCopy": "Terms apply.",
    "actionLabel": "Shop Now",
    "detailsActionLabel": "See details",
    "image": "https://www.sephora.com/contentimages/2026-06-04_cs-baar_site_beauty-offers_banner_us_gr.jpg"
  },
  {
    "id": "beautyoffers_offerbanner_omnibau_program_autoreplen0424_FY243686_broadcast_us_ca_rwd_promo_042624",
    "title": "Save 5% with Auto-Replenish^^",
    "description": "Never run out of your go-to beauty with subscription delivery.",
    "legalCopy": "^^Terms apply.",
    "actionLabel": "Learn More",
    "detailsActionLabel": "See details",
    "image": "https://www.sephora.com/contentimages/promo/beautyoffers/2024/April/2024-04-16-auto-replenishment-der-a-site-desktop-mobile-app-beauty-offers-banner-general-us-can-final.jpg"
  },
  {
    "id": "beautyoffers_offerbanner_omnipromo_broadcast_us_ca_rwd_promo_112122_freeship_evergreen",
    "title": "Beauty Insiders Get Free Shipping",
    "description": "It’s fast, reliable, and applies to every order.†",
    "legalCopy": "†Exclusions/terms apply.",
    "actionLabel": "Join Here",
    "detailsActionLabel": "See details",
    "image": "https://www.sephora.com/contentimages/promo/freeship2021/2022-08-01-free-ship-site-beauty-offers-page-banner-us-can-final.jpg"
  }
];

export const justDroppedData: Product[] = [
  {
    "id": "P502185",
    "skuId": "2597342",
    "brand": "Haus Labs",
    "name": "Triclone Skin Tech Medium Coverage Foundation with Fermented Arnica",
    "price": "$52.00",
    "variation": "220 Light Medium - with rosy undertones",
    "rating": 4,
    "reviews": 5719,
    "image": "https://www.sephora.com/productimages/sku/s2597342-main-zoom-1.jpg?pb=clean-at-sephora",
    "badge": "Clean at Sephora",
    "url": "https://www.sephora.com/product/triclone-skin-tech-medium-coverage-foundation-with-fermented-arnica-P502185?skuId=2597342"
  },
  {
    "id": "P502013",
    "skuId": "2553188",
    "brand": "DIOR",
    "name": "J'adore Parfum d'Eau",
    "price": "$185.00",
    "variation": "3.4 oz / 100 mL  ",
    "rating": 4.5,
    "reviews": 1305,
    "image": "https://www.sephora.com/productimages/sku/s2553188-main-zoom.jpg",
    "url": "https://www.sephora.com/product/j-adore-parfum-d-eau-P502013?skuId=2553188"
  },
  {
    "id": "P502188",
    "skuId": "2587319",
    "brand": "Gucci",
    "name": "Luminous Matte Powder Blush",
    "price": "$49.00",
    "variation": "01 Silky Rose - a soft rosewood",
    "rating": 4.7,
    "reviews": 813,
    "image": "https://www.sephora.com/productimages/sku/s2587319-main-zoom.jpg",
    "url": "https://www.sephora.com/product/luminous-matte-beauty-blush-P502188?skuId=2587319"
  },
  {
    "id": "P506130",
    "skuId": "2679561",
    "brand": "MAKEUP BY MARIO",
    "name": "Soft Pop Plumping Cream Blush Veil",
    "price": "$34.00",
    "variation": "Barely Blushing - natural flush",
    "rating": 4.6,
    "reviews": 1397,
    "image": "https://www.sephora.com/productimages/sku/s2679561-main-zoom.jpg",
    "url": "https://www.sephora.com/product/soft-pop-plumping-blush-veil-P506130?skuId=2679561"
  },
  {
    "id": "P506281",
    "skuId": "2670990",
    "brand": "Westman Atelier",
    "name": "Mini Petite Baby Cheeks Lip + Cheek Cream Blush Stick",
    "price": "$26.00",
    "variation": "Petal - dusty nude rose",
    "rating": 4.3,
    "reviews": 326,
    "image": "https://www.sephora.com/productimages/sku/s2670990-main-zoom.jpg?pb=clean-at-sephora",
    "badge": "Clean at Sephora",
    "url": "https://www.sephora.com/product/westman-atelier-mini-petite-baby-cheeks-lip-cheek-cream-blush-stick-P506281?skuId=2670990"
  },
  {
    "id": "P504526",
    "skuId": "2702173",
    "brand": "Glossier",
    "name": "Boy Brow Volumizing Eyebrow Gel-Pomade",
    "price": "$22.00",
    "variation": "Dark Brown - for dark brown hair with warm undertones",
    "rating": 4.3,
    "reviews": 938,
    "image": "https://www.sephora.com/productimages/sku/s2702173-main-zoom.jpg?pb=best-of-beauty-2026",
    "badge": "best of beauty 2026",
    "url": "https://www.sephora.com/product/glossier-boy-brow-volumizing-eyebrow-gel-pomade-P504526?skuId=2702173"
  },
  {
    "id": "P506382",
    "skuId": "2637999",
    "brand": "ILIA",
    "name": "In Frame Clear Eyebrow Gel",
    "price": "$25.00",
    "variation": "Clear",
    "rating": 4.4,
    "reviews": 612,
    "image": "https://www.sephora.com/productimages/sku/s2637999-main-zoom.jpg?pb=clean-at-sephora",
    "badge": "Clean at Sephora",
    "url": "https://www.sephora.com/product/ilia-in-frame-clear-eyebrow-gel-p506382-P506382?skuId=2637999"
  },
  {
    "id": "P505266",
    "skuId": "2654770",
    "brand": "K18 Biomimetic Hairscience",
    "name": "Molecular Repair Hair Oil",
    "price": "$65.00",
    "variation": "1 oz / 30 mL",
    "rating": 4.4,
    "reviews": 1204,
    "image": "https://www.sephora.com/productimages/sku/s2654770-main-zoom.jpg?pb=allure-2023-bestofbeauty-badge",
    "badge": "allure 2023 Best of Beauty Award Winner",
    "url": "https://www.sephora.com/product/k18-hair-molecular-repair-hair-oil-P505266?skuId=2654770"
  },
  {
    "id": "P506524",
    "skuId": "2673556",
    "brand": "Kérastase",
    "name": "Nutritive 8H Magic Night Hair Serum for Dry Hair",
    "price": "$64.00",
    "variation": "3.04 oz / 90 ml",
    "rating": 4.3,
    "reviews": 1637,
    "image": "https://www.sephora.com/productimages/sku/s2673556-main-zoom-1.jpg",
    "url": "https://www.sephora.com/product/kerastase-nutritive-8h-magic-night-serum-hydrating-treatment-for-dry-hair-P506524?skuId=2673556"
  },
  {
    "id": "P469211",
    "skuId": "2640357",
    "brand": "Glow Recipe",
    "name": "Watermelon Glow AHA Pink Dream Body Cream",
    "price": "$26.00",
    "variation": "6.76 oz / 200 mL",
    "rating": 4.4,
    "reviews": 2039,
    "image": "https://www.sephora.com/productimages/sku/s2640357-main-zoom.jpg?pb=clean-planet-aware",
    "badge": "Clean plus Planet Aware",
    "url": "https://www.sephora.com/product/glow-recipe-watermelon-glow-aha-pink-dream-body-cream-P469211?skuId=2640357"
  },
  {
    "id": "P505327",
    "skuId": "2674133",
    "brand": "Kosas",
    "name": "DreamBeam Silicone-Free Mineral Sunscreen SPF 40 with Ceramides and Peptides",
    "price": "$40.00",
    "variation": "DreamBeam - radiant finish",
    "rating": 3.9,
    "reviews": 1954,
    "image": "https://www.sephora.com/productimages/sku/s2674133-main-zoom.jpg?pb=clean-at-sephora",
    "badge": "Clean at Sephora",
    "url": "https://www.sephora.com/product/dreambeam-moisturizing-mineral-sunscreen-spf-40-with-ceramides-and-peptides-P505327?skuId=2674133"
  },
  {
    "id": "P505694",
    "skuId": "2681799",
    "brand": "Kosas",
    "name": "Wet Stick Moisturizing Shiny Sheer Lipstick with Ceramides",
    "price": "$25.00",
    "variation": "Malibu - cool mauvey pink",
    "rating": 4.3,
    "reviews": 755,
    "image": "https://www.sephora.com/productimages/sku/s2681799-main-zoom.jpg?pb=clean-at-sephora",
    "badge": "Clean at Sephora",
    "url": "https://www.sephora.com/product/kosas-wet-stick-moisture-lip-shine-P505694?skuId=2681799"
  },
  {
    "id": "P504609",
    "skuId": "2678472",
    "brand": "LAWLESS",
    "name": "Forget the Filler Lip-Plumping Line-Smoothing Tinted Lip Balm",
    "price": "$26.00",
    "variation": "Juicy Watermelon - a punchy watermelon",
    "rating": 4.2,
    "reviews": 2053,
    "image": "https://www.sephora.com/productimages/sku/s2678472-main-zoom.jpg?pb=clean-at-sephora",
    "badge": "Clean at Sephora",
    "url": "https://www.sephora.com/product/lawless-forget-filler-lip-plumping-line-smoothing-tinted-lip-balm-P504609?skuId=2678472"
  },
  {
    "id": "P506563",
    "skuId": "2685527",
    "brand": "ILIA",
    "name": "The Cleanse Soft Foaming Cleanser + Make Up Remover",
    "price": "$32.00",
    "rating": 4.1,
    "reviews": 574,
    "image": "https://www.sephora.com/productimages/sku/s2685527-main-zoom.jpg?pb=clean-at-sephora",
    "badge": "Clean at Sephora",
    "url": "https://www.sephora.com/product/the-cleanse-soft-foaming-cleanser-make-up-remover-P506563?skuId=2685527"
  },
  {
    "id": "P506533",
    "skuId": "2704005",
    "brand": "Dolce&Gabbana",
    "name": "Dolce Violet Eau de Toilette with Vanilla Travel Spray",
    "price": "$38.00",
    "variation": ".34 oz / 10 mL eau de toilette spray",
    "rating": 4.3,
    "reviews": 26,
    "image": "https://www.sephora.com/productimages/sku/s2704005-main-zoom.jpg",
    "url": "https://www.sephora.com/product/dolce-violet-eau-de-toilette-travel-spray-P506533?skuId=2704005"
  },
  {
    "id": "P506530",
    "skuId": "2705333",
    "brand": "KAYALI",
    "name": "THE WEDDING VELVET SANTAL | 35 Eau de Parfum",
    "price": "$105.00",
    "variation": "1.7 oz / 50 ml eau de parfum spray",
    "rating": 4.6,
    "reviews": 262,
    "image": "https://www.sephora.com/productimages/sku/s2705333-main-zoom.jpg",
    "url": "https://www.sephora.com/product/the-wedding-velvet-santal-35-P506530?skuId=2705333"
  },
  {
    "id": "P503905",
    "skuId": "2590503",
    "brand": "Maison Margiela",
    "name": "REPLICA’ On A Date Eau de Toilette with Rose & Black Currant",
    "price": "$170.00",
    "variation": "3.4 oz / 100 mL eau de toilette spray  ",
    "rating": 3.9,
    "reviews": 609,
    "image": "https://www.sephora.com/productimages/sku/s2590503-main-zoom.jpg",
    "url": "https://www.sephora.com/product/maison-margiela-replica-on-date-P503905?skuId=2590503"
  },
  {
    "id": "P506524",
    "skuId": "2673556",
    "brand": "Kérastase",
    "name": "Nutritive 8H Magic Night Hair Serum for Dry Hair",
    "price": "$64.00",
    "variation": "3.04 oz / 90 ml",
    "rating": 4.3,
    "reviews": 1637,
    "image": "https://www.sephora.com/productimages/sku/s2673556-main-zoom-1.jpg",
    "url": "https://www.sephora.com/product/kerastase-nutritive-8h-magic-night-serum-hydrating-treatment-for-dry-hair-P506524?skuId=2673556"
  },
  {
    "id": "P506779",
    "skuId": "2687689",
    "brand": "dae",
    "name": "Stargloss Shine Hair Gloss Treatment",
    "price": "$44.00",
    "variation": "6 oz / 177 ml",
    "rating": 4.2,
    "reviews": 493,
    "image": "https://www.sephora.com/productimages/sku/s2687689-main-zoom.jpg?pb=clean-at-sephora",
    "badge": "Clean at Sephora",
    "url": "https://www.sephora.com/product/dae-stargloss-shine-hair-gloss-treatment-P506779?skuId=2687689"
  }
];

export const featureTilesData = [
  {
    "id": "homepage_marketingbanner_fragrance_program_Huda1026_FY265406_broadcast_us_ca_rwd_banner_101526_fallback",
    "bgColor": "#B0375D",
    "textColor": "#ffffff",
    "title": "HUDA BEAUTY’s First Fragrance",
    "subtitle": "Spritz on Easy Bake Intense Eau de Parfum—a delectable, warm-floral scent.",
    "cta": "SHOP NOW ▸",
    "image": "https://www.sephora.com/contentimages/26-10-01_huda-beauty-easy-bake-intense-eau-de-parfum_site_hp_mktg-banner-1200x800_us-can_2834.jpg"
  },
  {
    "id": "homepage_marketingbanner_skincare_program_giftablebody1026_FY264997_broadcast_us_rwd_banner_101526",
    "bgColor": "#132B08",
    "textColor": "#ffffff",
    "title": "Body Care Worth Bragging About",
    "subtitle": "Wrap up luxurious formulas from brands like Summer Fridays and more.",
    "cta": "SHOP NOW ▸",
    "image": "https://www.sephora.com/contentimages/26-10-01_giftable-body_site_hp_mktg-banner-1200x800_us_2834.jpg"
  },
  {
    "id": "homepage_marketingbanner_color_program_NewInClean1026_FY265322_broadcast_us_rwd_banner_101526_fallback",
    "bgColor": "#9BB9E5",
    "textColor": "#000000",
    "title": "New and Clean at Sephora",
    "subtitle": "Snag the latest lip glosses, multiuse sticks, and eyeshadows.",
    "cta": "SHOP NOW▸",
    "image": "https://www.sephora.com/contentimages/26-10-03_new-in-clean-makeup_site_hp_mktg-banner-1200x800_us_2834.jpg"
  }
];

export const sellingFastData: Product[] = [
  {
    "id": "P420652",
    "skuId": "1966258",
    "brand": "LANEIGE",
    "name": "Lip Sleeping Mask – Intense Hydration Lip Treatment with Vitamin C",
    "price": "$24.00",
    "variation": "Berry - Juicy, fresh berries",
    "rating": 4.3,
    "reviews": 22477,
    "image": "https://www.sephora.com/productimages/sku/s1966258-main-zoom-1.jpg?pb=allure-2023-bestofbeauty-badge",
    "badge": "allure 2023 Best of Beauty Award Winner",
    "url": "https://www.sephora.com/product/lip-sleeping-mask-P420652?skuId=1966258"
  },
  {
    "id": "P502188",
    "skuId": "2587319",
    "brand": "Gucci",
    "name": "Luminous Matte Powder Blush",
    "price": "$49.00",
    "variation": "01 Silky Rose - a soft rosewood",
    "rating": 4.7,
    "reviews": 813,
    "image": "https://www.sephora.com/productimages/sku/s2587319-main-zoom.jpg",
    "url": "https://www.sephora.com/product/luminous-matte-beauty-blush-P502188?skuId=2587319"
  },
  {
    "id": "P467754",
    "skuId": "2407336",
    "brand": "Charlotte Tilbury",
    "name": "Mini Airbrush Flawless Finish Refillable Blurring & Setting Powder",
    "price": "$29.00",
    "variation": "3 Tan",
    "rating": 4.3,
    "reviews": 3929,
    "image": "https://www.sephora.com/productimages/sku/s2407336-main-zoom.jpg",
    "url": "https://www.sephora.com/product/charlotte-tilbury-mini-airbrush-flawless-finish-setting-powder-P467754?skuId=2407336"
  },
  {
    "id": "P505568",
    "skuId": "2640159",
    "brand": "Rare Beauty by Selena Gomez",
    "name": "Soft Pinch Tinted Lip Oil Stain",
    "price": "$24.00",
    "variation": "Happy - cool pink",
    "rating": 4.1,
    "reviews": 5213,
    "image": "https://www.sephora.com/productimages/sku/s2640159-main-zoom.jpg",
    "url": "https://www.sephora.com/product/rare-beauty-by-selena-gomez-soft-pinch-tinted-lip-oil-P505568?skuId=2640159"
  },
  {
    "id": "P377873",
    "skuId": "2172310",
    "brand": "NARS",
    "name": "Radiant Creamy Concealer with Hydrating Medium Coverage",
    "price": "$36.00",
    "variation": "Madeleine - L2.3 - light with neutral undertones",
    "rating": 4.3,
    "reviews": 15183,
    "image": "https://www.sephora.com/productimages/sku/s2172310-main-zoom.jpg",
    "url": "https://www.sephora.com/product/radiant-creamy-concealer-P377873?skuId=2172310"
  },
  {
    "id": "P67988453",
    "skuId": "1925965",
    "brand": "Fenty Beauty by Rihanna",
    "name": "Gloss Bomb Universal Lip Gloss Luminizer",
    "price": "$23.00",
    "variation": "Fenty Glow - shimmering rose nude",
    "rating": 4.6,
    "reviews": 13887,
    "image": "https://www.sephora.com/productimages/sku/s1925965-main-zoom.jpg",
    "url": "https://www.sephora.com/product/gloss-bomb-universal-lip-luminizer-P67988453?skuId=1925965"
  },
  {
    "id": "P502185",
    "skuId": "2597037",
    "brand": "Haus Labs",
    "name": "Triclone Skin Tech Medium Coverage Foundation with Fermented Arnica",
    "price": "$52.00",
    "variation": "570 Deep - with golden undertones",
    "rating": 4,
    "reviews": 5719,
    "image": "https://www.sephora.com/productimages/sku/s2597037-main-zoom-1.jpg?pb=clean-at-sephora",
    "badge": "Clean at Sephora",
    "url": "https://www.sephora.com/product/triclone-skin-tech-medium-coverage-foundation-with-fermented-arnica-P502185?skuId=2597037"
  },
  {
    "id": "P442831",
    "skuId": "2210722",
    "brand": "The Ordinary",
    "name": "Multi-Peptide Serum for Hair Density for Thicker, Fuller Looking Hair",
    "price": "$24.00",
    "variation": "2 oz/ 60 mL",
    "rating": 4,
    "reviews": 2131,
    "image": "https://www.sephora.com/productimages/sku/s2210722-main-zoom.jpg",
    "url": "https://www.sephora.com/product/multi-peptide-serum-for-hair-density-P442831?skuId=2210722"
  },
  {
    "id": "P455936",
    "skuId": "2495497",
    "brand": "Summer Fridays",
    "name": "Lip Butter Balm Treatment for Hydration + Nourishing Shine",
    "price": "$24.00",
    "variation": "Vanilla Beige - sheer beige",
    "rating": 4.3,
    "reviews": 18242,
    "image": "https://www.sephora.com/productimages/sku/s2495497-main-zoom.jpg?pb=allure-2024-bestofbeauty",
    "badge": "allure 2024 Best of Beauty Award Winner",
    "url": "https://www.sephora.com/product/summer-fridays-lip-butter-balm-P455936?skuId=2495497"
  },
  {
    "id": "P427406",
    "skuId": "2031508",
    "brand": "The Ordinary",
    "name": "Glycolic Acid 7% Exfoliating and Brightening Daily Toner",
    "price": "$13.50",
    "variation": "8 oz/ 240 mL",
    "rating": 4.4,
    "reviews": 4707,
    "image": "https://www.sephora.com/productimages/sku/s2031508-main-zoom.jpg",
    "url": "https://www.sephora.com/product/the-ordinary-deciem-glycolic-acid-7-toning-solution-P427406?skuId=2031508"
  },
  {
    "id": "P466123",
    "skuId": "2404846",
    "brand": "Glow Recipe",
    "name": "Watermelon Glow Niacinamide Dew Drops Serum",
    "price": "$36.00",
    "variation": "1.35 oz/ 40 mL",
    "rating": 4.3,
    "reviews": 5554,
    "image": "https://www.sephora.com/productimages/sku/s2404846-main-zoom.jpg?pb=clean-planet-aware",
    "badge": "Clean plus Planet Aware",
    "url": "https://www.sephora.com/product/glow-recipe-watermelon-glow-niacinamide-dew-drops-P466123?skuId=2404846"
  },
  {
    "id": "P469502",
    "skuId": "2421360",
    "brand": "Paula's Choice",
    "name": "Skin Perfecting 2% BHA Exfoliating Toner for Clear Skin",
    "price": "$37.00",
    "variation": "4 oz/118 ml",
    "rating": 4.4,
    "reviews": 5292,
    "image": "https://www.sephora.com/productimages/sku/s2421360-main-zoom.jpg",
    "url": "https://www.sephora.com/product/paula-s-choice-skin-perfecting-2-bha-liquid-exfoliant-P469502?skuId=2421360"
  },
  {
    "id": "P472072",
    "skuId": "2461812",
    "brand": "Sol de Janeiro",
    "name": "Cheirosa 40 Hair & Body Perfume Mist",
    "price": "$26.00",
    "variation": "3 oz/90 ML  ",
    "rating": 4.5,
    "reviews": 3852,
    "image": "https://www.sephora.com/productimages/sku/s2461812-main-zoom.jpg",
    "url": "https://www.sephora.com/product/sol-de-janeiro-brazilian-crush-cheriosa-40-hair-body-fragrance-mist-P472072?skuId=2461812"
  },
  {
    "id": "P449116",
    "skuId": "2249688",
    "brand": "Valentino",
    "name": "Donna Born in Roma Eau de Parfum with Bourbon Vanilla & Jasmine",
    "price": "$145.00",
    "variation": "1.7 oz/50 ml eau de parfum spray",
    "rating": 4.5,
    "reviews": 2959,
    "image": "https://www.sephora.com/productimages/sku/s2249688-main-zoom.jpg",
    "url": "https://www.sephora.com/product/born-in-roma-P449116?skuId=2249688"
  },
  {
    "id": "P385477",
    "skuId": "2644532",
    "brand": "DIOR",
    "name": "Miss Dior Blooming Bouquet",
    "price": "$155.00",
    "variation": "3.4 oz / 100 mL eau de toilette spray",
    "rating": 4.3,
    "reviews": 2852,
    "image": "https://www.sephora.com/productimages/sku/s2644532-main-zoom.jpg",
    "url": "https://www.sephora.com/product/miss-dior-blooming-bouquet-P385477?skuId=2644532"
  },
  {
    "id": "P417312",
    "skuId": "1930759",
    "brand": "Sol de Janeiro",
    "name": "Cheirosa 62 Bum Bum Hair & Body Refillable Perfume Mist",
    "price": "$39.00",
    "variation": "8 oz/240 mL",
    "rating": 4.4,
    "reviews": 3481,
    "image": "https://www.sephora.com/productimages/sku/s1930759-main-zoom.jpg",
    "url": "https://www.sephora.com/product/brazilian-crush-body-fragrance-mist-P417312?skuId=1930759"
  },
  {
    "id": "P449116",
    "skuId": "2249696",
    "brand": "Valentino",
    "name": "Donna Born in Roma Eau de Parfum with Bourbon Vanilla & Jasmine",
    "price": "$180.00",
    "variation": "3.4 oz/100 ml  ",
    "rating": 4.5,
    "reviews": 2959,
    "image": "https://www.sephora.com/productimages/sku/s2249696-main-zoom.jpg",
    "url": "https://www.sephora.com/product/born-in-roma-P449116?skuId=2249696"
  },
  {
    "id": "P504996",
    "skuId": "2645026",
    "brand": "Carolina Herrera",
    "name": "Good Girl Blush Eau de Parfum with Floral Vanilla",
    "price": "$184.00",
    "variation": "2.7 oz / 80 mL eau de parfum spray",
    "rating": 4.4,
    "reviews": 962,
    "image": "https://www.sephora.com/productimages/sku/s2645026-main-zoom.jpg",
    "url": "https://www.sephora.com/product/good-girl-blush-eau-de-parfum-P504996?skuId=2645026"
  },
  {
    "id": "P482668",
    "skuId": "2539542",
    "brand": "dae",
    "name": "Cactus Fruit 3-in-1 Styling Cream",
    "price": "$30.00",
    "variation": "Original",
    "rating": 4.6,
    "reviews": 2491,
    "image": "https://www.sephora.com/productimages/sku/s2539542-main-zoom.jpg?pb=clean-at-sephora",
    "badge": "Clean at Sephora",
    "url": "https://www.sephora.com/product/dae-cactus-flower-3-in-1-styling-cream-P482668?skuId=2539542"
  },
  {
    "id": "P506177",
    "skuId": "2677508",
    "brand": "JVN",
    "name": "Nurture Intense Hydration Hair Mask",
    "price": "$36.00",
    "variation": "8 oz / 236 mL",
    "rating": 4.6,
    "reviews": 417,
    "image": "https://www.sephora.com/productimages/sku/s2677508-main-zoom.jpg?pb=clean-at-sephora",
    "badge": "Clean at Sephora",
    "url": "https://www.sephora.com/product/jvn-nurture-intense-hydration-hair-mask-P506177?skuId=2677508"
  }
];

export const biRewardsData: RewardItem[] = [
  {
    "id": "3030665",
    "brand": "Isle of Paradise",
    "name": "Self-Tan Face Drops",
    "points": "100 Points",
    "image": "https://www.sephora.com/productimages/sku/s3030665-main-zoom.jpg?pb=clean-at-sephora",
    "url": "https://www.sephora.com/product/self-tan-face-drops-P516435?skuId=2871887"
  },
  {
    "id": "3039831",
    "brand": "Dr. Dennis Gross Skincare",
    "name": "DRx BioRejuvenation™ Serum with Collagen Amino Acids + G.N.A.",
    "points": "100 Points",
    "image": "https://www.sephora.com/productimages/sku/s3039831-main-zoom.jpg",
    "url": "https://www.sephora.com/product/drx-biorejuvenation-serum-P526092?skuId=2995082"
  },
  {
    "id": "2988566",
    "brand": "Youth To The People",
    "name": "Superfood Retinol + Collagen Peptides Protein Balm",
    "points": "100 Points",
    "image": "https://www.sephora.com/productimages/sku/s2988566-main-zoom.jpg",
    "url": "https://www.sephora.com/product/superfood-retinol-protein-balm-P525525?skuId=2991735"
  },
  {
    "id": "3039856",
    "brand": "Fenty Beauty by Rihanna",
    "name": "The Water Boi Reparative Leave-In Conditioner",
    "points": "100 Points",
    "image": "https://www.sephora.com/productimages/sku/s3039856-main-zoom.jpg?pb=clean-at-sephora",
    "url": "https://www.sephora.com/product/the-water-boi-reparative-leave-in-conditioner-P514904?skuId=2853711"
  },
  {
    "id": "3007770",
    "brand": "Ultra Violette",
    "name": "Supreme Screen SPF 50 Facial Sunscreen Moisturizer and Primer",
    "points": "100 Points",
    "image": "https://www.sephora.com/productimages/sku/s3007770-main-zoom.jpg",
    "url": "https://www.sephora.com/product/supreme-screen-spf-50-facial-sunscreen-moisturizer-and-primer-P516216?skuId=2853745"
  },
  {
    "id": "2952612",
    "brand": "Dieux",
    "name": "Air Angel Peptide Plumping Gel Cream",
    "points": "100 Points",
    "image": "https://www.sephora.com/productimages/sku/s2952612-main-zoom.jpg",
    "url": "https://www.sephora.com/product/dieux-air-angel-collagen-peptide-hydrating-gel-cream-P510269?skuId=2916591"
  },
  {
    "id": "2950798",
    "brand": "Peter Thomas Roth",
    "name": "Water Drench® Hyaluronic Jelly Moisturizer \t\t\t\t\t\t",
    "points": "100 Points",
    "image": "https://www.sephora.com/productimages/sku/s2950798-main-zoom.jpg",
    "url": "https://www.sephora.com/product/peter-thomas-roth-water-drench-jelly-moisturizer-P515483?skuId=2862696"
  },
  {
    "id": "2914356",
    "brand": "JOSIE MARAN",
    "name": "The Original 100% Pure Organic Moisturizing Argan Oil",
    "points": "100 Points",
    "image": "https://www.sephora.com/productimages/sku/s2914356-main-zoom.jpg?pb=clean-planet-aware",
    "url": "https://www.sephora.com/product/josie-maran-the-original-100-pure-organic-moisturizing-argan-oil-P510457?skuId=2764843"
  },
  {
    "id": "2659233",
    "brand": "Estée Lauder",
    "name": "Advanced Night Repair Synchronized Multi-Recovery Complex Serum with Hyaluronic Acid",
    "points": "100 Points",
    "image": "https://www.sephora.com/productimages/sku/s2659233-main-zoom-1.jpg",
    "url": "https://www.sephora.com/product/estee-lauder-advanced-night-repair-synchronized-multi-recovery-complex-P461159?skuId=2379683"
  },
  {
    "id": "3038528",
    "brand": "Caudalie",
    "name": "Resveratrol-Lift Depuffing Eye Cream with Pro-Collagen Multi-Peptides",
    "points": "100 Points",
    "image": "https://www.sephora.com/productimages/sku/s3038528-main-zoom.jpg?pb=clean-planet-aware",
    "url": "https://www.sephora.com/product/caudalie-resveratrol-lift-firming-eye-gel-cream-P527921?skuId=3007788"
  },
  {
    "id": "3010998",
    "brand": "Moroccanoil",
    "name": "Ambiance de Plage Hair & Body Body Fragrance Mist with Gardenia Petal & Coconut",
    "points": "100 Points",
    "image": "https://www.sephora.com/productimages/sku/s3010998-main-zoom.jpg",
    "url": "https://www.sephora.com/product/ambiance-de-plage-hair-body-body-fragrance-mist-with-gardenia-petal-coconut-P524854?skuId=2980662"
  },
  {
    "id": "2813582",
    "brand": "Fenty Beauty by Rihanna",
    "name": "Hydra Vizor Refillable Invisible Face Moisturizer SPF 30 with Niacinamide",
    "points": "100 Points",
    "image": "https://www.sephora.com/productimages/sku/s2813582-main-zoom.jpg?pb=rewards-only-2025-bob",
    "url": "https://www.sephora.com/product/fenty-skin-rihanna-hydra-vizor-refill-P476485?skuId=2418887"
  },
  {
    "id": "3038510",
    "brand": "Peter Thomas Roth",
    "name": "Peptide Skinjection™ Peptide-Infused Face & Eye Tape for Wrinkles and Aging Skin",
    "points": "100 Points",
    "image": "https://www.sephora.com/productimages/sku/s3038510-main-zoom.jpg",
    "url": "https://www.sephora.com/product/peter-thomas-roth-peptide-skinjection-face-eye-tape-P522577?skuId=2966950"
  },
  {
    "id": "3039815",
    "brand": "Kenra Professional",
    "name": "Volume Spray 25 Super Hold Finishing Hairspray",
    "points": "100 Points",
    "image": "https://www.sephora.com/productimages/sku/s3039815-main-zoom.jpg",
    "url": "https://www.sephora.com/product/kenra-professional-volume-spray-25-super-hold-finishing-hairspray-P521104?skuId=2954444"
  },
  {
    "id": "3039823",
    "brand": "Ouidad",
    "name": "Advanced Climate Control Heat & Humidity Anti-Frizz Gel for Curly Hair",
    "points": "100 Points",
    "image": "https://www.sephora.com/productimages/sku/s3039823-main-zoom.jpg",
    "url": "https://www.sephora.com/product/advanced-climate-control-heat-humidity-gel-P521194?skuId=2973154"
  }
];

export const guidanceLinksData = [
  {
    "label": "Holiday Gift Guide",
    "iconColor": "#ff4d6d"
  },
  {
    "label": "Value Sets",
    "iconColor": "#10b981"
  },
  {
    "label": "Fragrance",
    "iconColor": "#06b6d4"
  },
  {
    "label": "Beauty Advent Calendars",
    "iconColor": "#f59e0b"
  },
  {
    "label": "Trending on Social",
    "iconColor": "#ec4899"
  },
  {
    "label": "Teen Skincare Resource",
    "iconColor": "#8b5cf6"
  },
  {
    "label": "Sale",
    "iconColor": "#ef4444"
  }
];

export const reassuranceBannersData = [
  {
    "id": "homepage_reassurancebanner1_omnibau_program_holidaycore1026_FY264956_broadcast_us_rwd_banner_102926_Ease&Convenience",
    "bgColor": "#D6B672",
    "title": "Get Your Gifts in Time",
    "subtitle": "Choose free shipping",
    "cta": "LEARN MORE ▸",
    "image": "https://www.sephora.com/contentimages/2026-10-29_holiday-core_general_site_hp_mktg-banner_ease-and-convenience_ldts_us_3775.jpg"
  },
  {
    "id": "homepage_reassurancebanner2_loyalty_animation_holidaycore1026_FY264956_broadcast_us_ca_rwd_banner_102926",
    "bgColor": "#D6B672",
    "title": "Your Holiday Gift Guide",
    "subtitle": "The presents everyone wants (plus deals you never saw coming)",
    "cta": "SHOP NOW ▸",
    "image": "https://www.sephora.com/contentimages/2026-10-29_holiday-core_general_site_hp_mktg-banner_hub_us-can_3760.jpg"
  },
  {
    "id": "homepage_reassurancebanner3_altpayments_animation_holidaycore1026_FY264956_broadcast_us_rwd_banner_102926",
    "bgColor": "#D6B672",
    "title": "Shop Gifts Now, Pay Later",
    "subtitle": "Sephora offers convenient ways to pay.*",
    "cta": "LEARN MORE ▸",
    "image": "https://www.sephora.com/contentimages/2026-11-05_holiday-core_general_site_hp_mktg-banner_alt-payments_us_3774.jpg"
  }
];

export const footerColumnsData = [
  {
    "title": "About Sephora",
    "links": [
      {
        "label": "About Sephora",
        "href": "https://www.inside-sephora.com/en/about-sephora"
      },
      {
        "label": "Newsroom",
        "href": "https://newsroom.sephora.com/"
      },
      {
        "label": "Careers",
        "href": "https://www.inside-sephora.com/en/usa/join-us?market=7"
      },
      {
        "label": "Sephora Values",
        "href": "https://www.inside-sephora.com/en/usa/life-at-sephora"
      },
      {
        "label": "Supply Chain Transparency",
        "href": "/beauty/supply-chain-transparency"
      },
      {
        "label": "Affiliates",
        "href": "/beauty/affiliates"
      },
      {
        "label": "Sephora Events",
        "href": "https://www.sephora-events.com"
      },
      {
        "label": "Gift Cards",
        "href": "/beauty/giftcards"
      },
      {
        "label": "Sephora Global Sites",
        "href": "/beauty/international-websites"
      },
      {
        "label": "Diversity, Equity & Inclusion",
        "href": "https://www.inside-sephora.com/en/usa/diversity-equity-inclusion"
      },
      {
        "label": "Sephora Accelerate",
        "href": "https://sephoraaccelerate.com/"
      },
      {
        "label": "Beauty (Re)Purposed",
        "href": "/beauty/pact-collective-recycling-program"
      },
      {
        "label": "Report a Vulnerability",
        "href": "/beauty/vulnerability-disclosure-program"
      }
    ]
  },
  {
    "title": "My Sephora",
    "links": [
      {
        "label": "Beauty Insider",
        "href": "/profile/BeautyInsider"
      },
      {
        "label": "Sephora Credit Card",
        "href": "/creditcard"
      },
      {
        "label": "Gallery",
        "href": "/community/gallery"
      },
      {
        "label": "Order Status",
        "href": "/beauty/order-status"
      },
      {
        "label": "Purchase History",
        "href": "/purchase-history"
      },
      {
        "label": "Account Settings",
        "href": "/profile/MyAccount"
      },
      {
        "label": "Beauty Services & Store Events",
        "href": "#"
      },
      {
        "label": "Auto-Replenish",
        "href": "#"
      },
      {
        "label": "Beauty Offers",
        "href": "/beauty/beauty-offers"
      },
      {
        "label": "Rewards Bazaar",
        "href": "/rewards"
      },
      {
        "label": "Loves",
        "href": "/shopping-list"
      },
      {
        "label": "Shop Your Store",
        "href": "#"
      },
      {
        "label": "Shop Same-Day Delivery",
        "href": "#"
      }
    ]
  },
  {
    "title": "Help",
    "links": [
      {
        "label": "Customer Service",
        "href": "#"
      },
      {
        "label": "Returns & Exchanges",
        "href": "/beauty/returns-exchanges"
      },
      {
        "label": "Delivery and Pickup Options",
        "href": "/beauty/pick-up-delivery-options"
      },
      {
        "label": "Shipping",
        "href": "/beauty/shipping-information"
      },
      {
        "label": "Billing",
        "href": "/beauty/billing"
      },
      {
        "label": "International Shipments",
        "href": "#"
      },
      {
        "label": "Buying Guides",
        "href": "#"
      },
      {
        "label": "Beauty Services FAQ",
        "href": "/beauty/beauty-services-faq"
      },
      {
        "label": "Sephora at Kohl's",
        "href": "/beauty/sephora-at-kohls"
      },
      {
        "label": "Store Locations",
        "href": "/happening/stores/sephora-near-me"
      },
      {
        "label": "Flexible Payments",
        "href": "#"
      },
      {
        "label": "Accessibility",
        "href": "/beauty/accessibility"
      },
      {
        "label": "Teen Skincare Resource",
        "href": "#"
      }
    ]
  }
];
