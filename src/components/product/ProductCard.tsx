
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product.inStock || product.variants.length === 0) return;
    
    // Add the first available variant to cart
    const firstInStockVariant = product.variants.find(variant => variant.inStock);
    if (!firstInStockVariant) return;
    
    addToCart({
      productId: product.id,
      variantId: firstInStockVariant.id,
      name: product.name,
      price: firstInStockVariant.price,
      image: product.images[0],
      quantity: 1,
    });
  };
  
  return (
    <div className="group relative">
      <Link to={`/products/${product.slug}`} className="block">
        <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Status badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.new && (
              <Badge className="bg-teal text-white">New</Badge>
            )}
            {product.bestSeller && (
              <Badge className="bg-coral text-white">Best Seller</Badge>
            )}
            {!product.inStock && (
              <Badge variant="secondary" className="bg-gray-700 text-white">Out of Stock</Badge>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="absolute top-2 right-2 transform opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button 
              className="bg-white p-2 rounded-full shadow-md transition-colors hover:bg-gray-100 mb-2"
              aria-label="Add to wishlist"
            >
              <Heart size={18} />
            </button>
          </div>
          
          {/* Quick add button */}
          <div 
            className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm py-3 px-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200"
          >
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock || product.variants.length === 0}
              className="w-full bg-navy hover:bg-navy-700 text-white flex items-center justify-center"
              size="sm"
            >
              <ShoppingCart size={16} className="mr-2" />
              {product.inStock ? 'Quick Add' : 'Out of Stock'}
            </Button>
          </div>
        </div>
        
        <div className="mt-3">
          <h3 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-1">{product.name}</h3>
          <div className="mt-1 flex items-center">
            <p className="font-medium text-gray-900">{formatCurrency(product.price)}</p>
            {product.compareAtPrice && (
              <p className="ml-2 text-sm text-gray-500 line-through">
                {formatCurrency(product.compareAtPrice)}
              </p>
            )}
          </div>
          
          <div className="mt-1 flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </div>
            <p className="text-xs text-gray-500 ml-1">({product.reviewCount})</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
