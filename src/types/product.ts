
export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  category: string;
  tags: string[];
  featured: boolean;
  bestSeller: boolean;
  new: boolean;
  variants: ProductVariant[];
  inStock: boolean;
  slug: string;
}

export interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
