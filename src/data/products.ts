
import { Product } from "@/types/product";

// Helper function to create consistent product slugs
const createSlug = (name: string): string => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
};

export const products: Product[] = [
  {
    id: "1",
    name: "Classic White Sneakers",
    description: "Clean and timeless design meets comfort with our Classic White Sneakers. Made with premium materials and designed for all-day wear, these sneakers feature a padded insole, durable outsole, and minimalist aesthetic that goes with everything in your wardrobe. The breathable upper and flexible construction ensure comfortable movement, making them perfect for daily wear.",
    shortDescription: "Timeless white sneakers with premium comfort and versatile style.",
    price: 89.99,
    compareAtPrice: 109.99,
    rating: 4.8,
    reviewCount: 125,
    images: [
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Footwear",
    tags: ["Sneakers", "Casual", "White", "Unisex"],
    featured: true,
    bestSeller: true,
    new: false,
    inStock: true,
    variants: [
      { id: "1-1", name: "US 7 / EU 40", price: 89.99, sku: "WS-CL-07", inStock: true },
      { id: "1-2", name: "US 8 / EU 41", price: 89.99, sku: "WS-CL-08", inStock: true },
      { id: "1-3", name: "US 9 / EU 42", price: 89.99, sku: "WS-CL-09", inStock: true },
      { id: "1-4", name: "US 10 / EU 43", price: 89.99, sku: "WS-CL-10", inStock: true },
      { id: "1-5", name: "US 11 / EU 44", price: 89.99, sku: "WS-CL-11", inStock: false }
    ],
    slug: "classic-white-sneakers"
  },
  {
    id: "2",
    name: "Everyday Tote Bag",
    description: "Our Everyday Tote Bag is designed for versatility and durability. Made from sustainable canvas with reinforced leather handles, this spacious tote features an interior zippered pocket and two slip pockets to keep your essentials organized. Whether you're headed to work, the market, or a weekend getaway, this tote combines style with functionality for all your carrying needs.",
    shortDescription: "Durable canvas tote with premium leather handles and organized interior.",
    price: 49.99,
    rating: 4.6,
    reviewCount: 98,
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605733513597-a8f8341084e6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Accessories",
    tags: ["Bags", "Canvas", "Everyday", "Unisex"],
    featured: false,
    bestSeller: true,
    new: false,
    inStock: true,
    variants: [
      { id: "2-1", name: "Natural Canvas", price: 49.99, sku: "TB-EV-NAT", inStock: true },
      { id: "2-2", name: "Black Canvas", price: 49.99, sku: "TB-EV-BLK", inStock: true },
      { id: "2-3", name: "Navy Canvas", price: 49.99, sku: "TB-EV-NAV", inStock: true }
    ],
    slug: "everyday-tote-bag"
  },
  {
    id: "3",
    name: "Premium Wireless Headphones",
    description: "Experience superior sound quality with our Premium Wireless Headphones. Featuring active noise cancellation, 30-hour battery life, and memory foam ear cushions, these headphones deliver immersive audio in exceptional comfort. Bluetooth 5.0 technology ensures stable connectivity while the foldable design makes them ideal for travel. The built-in microphone and touch controls provide convenient call and music management.",
    shortDescription: "Noise-cancelling wireless headphones with premium sound and all-day battery.",
    price: 179.99,
    compareAtPrice: 229.99,
    rating: 4.9,
    reviewCount: 213,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Electronics",
    tags: ["Headphones", "Wireless", "Audio", "Noise-Cancelling"],
    featured: true,
    bestSeller: true,
    new: false,
    inStock: true,
    variants: [
      { id: "3-1", name: "Matte Black", price: 179.99, sku: "HP-PW-BLK", inStock: true },
      { id: "3-2", name: "Silver", price: 179.99, sku: "HP-PW-SLV", inStock: true },
      { id: "3-3", name: "Navy Blue", price: 199.99, sku: "HP-PW-NAV", inStock: true }
    ],
    slug: "premium-wireless-headphones"
  },
  {
    id: "4",
    name: "Organic Cotton T-Shirt",
    description: "Our Organic Cotton T-Shirt offers premium comfort with environmental responsibility. Made from 100% GOTS-certified organic cotton, this shirt features a relaxed fit, reinforced seams, and pre-shrunk fabric that maintains its shape wash after wash. The breathable material keeps you comfortable in any season, while the versatile design pairs easily with any outfit for effortless everyday style.",
    shortDescription: "Sustainably made, comfortable 100% organic cotton tee with relaxed fit.",
    price: 29.99,
    rating: 4.7,
    reviewCount: 184,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Clothing",
    tags: ["T-Shirts", "Organic", "Sustainable", "Basics"],
    featured: false,
    bestSeller: false,
    new: true,
    inStock: true,
    variants: [
      { id: "4-1", name: "White - Small", price: 29.99, sku: "TS-OC-WS", inStock: true },
      { id: "4-2", name: "White - Medium", price: 29.99, sku: "TS-OC-WM", inStock: true },
      { id: "4-3", name: "White - Large", price: 29.99, sku: "TS-OC-WL", inStock: true },
      { id: "4-4", name: "Black - Small", price: 29.99, sku: "TS-OC-BS", inStock: true },
      { id: "4-5", name: "Black - Medium", price: 29.99, sku: "TS-OC-BM", inStock: true },
      { id: "4-6", name: "Black - Large", price: 29.99, sku: "TS-OC-BL", inStock: false }
    ],
    slug: "organic-cotton-t-shirt"
  },
  {
    id: "5",
    name: "Smart Fitness Watch",
    description: "Track your fitness journey with precision using our Smart Fitness Watch. This advanced wearable technology monitors heart rate, sleep quality, and activity levels while providing smartphone notifications. With water resistance up to 50 meters, built-in GPS, and a battery life of up to 7 days, it's your perfect workout companion. The customizable watch faces and interchangeable bands let you match your style for any occasion.",
    shortDescription: "Advanced fitness tracker with heart rate monitoring and 7-day battery life.",
    price: 129.99,
    compareAtPrice: 149.99,
    rating: 4.5,
    reviewCount: 156,
    images: [
      "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd6b4?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Electronics",
    tags: ["Wearables", "Fitness", "Smart Watches", "Tech"],
    featured: true,
    bestSeller: false,
    new: true,
    inStock: true,
    variants: [
      { id: "5-1", name: "Black", price: 129.99, sku: "SW-FT-BLK", inStock: true },
      { id: "5-2", name: "Silver", price: 129.99, sku: "SW-FT-SLV", inStock: true },
      { id: "5-3", name: "Rose Gold", price: 139.99, sku: "SW-FT-RSG", inStock: true }
    ],
    slug: "smart-fitness-watch"
  },
  {
    id: "6",
    name: "Sustainable Water Bottle",
    description: "Stay hydrated responsibly with our Sustainable Water Bottle. Made from BPA-free, recycled stainless steel, this bottle keeps drinks cold for 24 hours or hot for 12 hours with its double-wall vacuum insulation. The leak-proof lid and non-slip base make it perfect for everyday use, while the condensation-free exterior keeps your bag and surfaces dry. Each bottle purchased helps fund clean water initiatives worldwide.",
    shortDescription: "Eco-friendly insulated bottle keeping drinks cold for 24hrs or hot for 12hrs.",
    price: 34.99,
    rating: 4.7,
    reviewCount: 109,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Lifestyle",
    tags: ["Eco-Friendly", "Water Bottles", "Sustainable", "Drinkware"],
    featured: false,
    bestSeller: true,
    new: false,
    inStock: true,
    variants: [
      { id: "6-1", name: "Ocean Blue - 20oz", price: 34.99, sku: "WB-SS-BL20", inStock: true },
      { id: "6-2", name: "Forest Green - 20oz", price: 34.99, sku: "WB-SS-GR20", inStock: true },
      { id: "6-3", name: "Matte Black - 20oz", price: 34.99, sku: "WB-SS-BK20", inStock: true },
      { id: "6-4", name: "Ocean Blue - 32oz", price: 39.99, sku: "WB-SS-BL32", inStock: true },
      { id: "6-5", name: "Forest Green - 32oz", price: 39.99, sku: "WB-SS-GR32", inStock: false },
      { id: "6-6", name: "Matte Black - 32oz", price: 39.99, sku: "WB-SS-BK32", inStock: true }
    ],
    slug: "sustainable-water-bottle"
  },
  {
    id: "7",
    name: "Minimalist Leather Wallet",
    description: "Our Minimalist Leather Wallet combines sleek design with practical functionality. Crafted from full-grain leather that develops a beautiful patina over time, this slim wallet features RFID-blocking technology to protect your cards from electronic theft. With space for up to 8 cards and a clever cash compartment, it maintains a slim profile that fits comfortably in front pockets while keeping your essentials organized.",
    shortDescription: "Slim RFID-blocking leather wallet with room for cards and cash.",
    price: 59.99,
    rating: 4.8,
    reviewCount: 87,
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1620833127432-2a0d9eacea5b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1612875895771-c3fa704bb9e6?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Accessories",
    tags: ["Wallets", "Leather", "RFID", "Minimalist"],
    featured: false,
    bestSeller: false,
    new: true,
    inStock: true,
    variants: [
      { id: "7-1", name: "Black", price: 59.99, sku: "WL-ML-BLK", inStock: true },
      { id: "7-2", name: "Brown", price: 59.99, sku: "WL-ML-BRN", inStock: true },
      { id: "7-3", name: "Tan", price: 59.99, sku: "WL-ML-TAN", inStock: true }
    ],
    slug: "minimalist-leather-wallet"
  },
  {
    id: "8",
    name: "Ceramic Pour-Over Coffee Set",
    description: "Elevate your morning ritual with our Ceramic Pour-Over Coffee Set. This handcrafted set includes a ceramic dripper, server, and two mugs made from high-fired stoneware with a matte finish. The precise pour-over dripper extracts optimal flavor from your coffee grounds, while the server's design maintains temperature. The stackable design saves space in your kitchen, making this set both beautiful and functional for coffee enthusiasts.",
    shortDescription: "Handcrafted stoneware coffee set for the perfect pour-over brew.",
    price: 79.99,
    compareAtPrice: 99.99,
    rating: 4.9,
    reviewCount: 62,
    images: [
      "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572119865084-43c285814d63?auto=format&fit=crop&w=800&q=80"
    ],
    category: "Home",
    tags: ["Coffee", "Ceramic", "Pour-Over", "Kitchen"],
    featured: true,
    bestSeller: false,
    new: true,
    inStock: true,
    variants: [
      { id: "8-1", name: "White", price: 79.99, sku: "CF-PO-WHT", inStock: true },
      { id: "8-2", name: "Black", price: 79.99, sku: "CF-PO-BLK", inStock: true },
      { id: "8-3", name: "Terra Cotta", price: 89.99, sku: "CF-PO-TER", inStock: false }
    ],
    slug: "ceramic-pour-over-coffee-set"
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getBestSellerProducts = (): Product[] => {
  return products.filter(product => product.bestSeller);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.new);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getRelatedProducts = (product: Product, limit: number = 4): Product[] => {
  return products
    .filter(p => 
      p.id !== product.id && 
      (p.category === product.category || 
       p.tags.some(tag => product.tags.includes(tag)))
    )
    .slice(0, limit);
};

export const getProductCategories = (): string[] => {
  const categories = new Set(products.map(product => product.category));
  return Array.from(categories);
};
