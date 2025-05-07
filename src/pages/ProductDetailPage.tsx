
import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { formatCurrency, calculateDiscountPercentage } from "@/lib/utils";
import ProductGrid from "@/components/product/ProductGrid";
import { Heart, ShoppingCart, ArrowLeft } from "lucide-react";

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = getProductBySlug(slug || "");
  const relatedProducts = product ? getRelatedProducts(product, 4) : [];
  
  const [selectedVariantId, setSelectedVariantId] = useState(
    product?.variants.find(v => v.inStock)?.id || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  if (!product) {
    return (
      <MainLayout>
        <div className="container-custom py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/products" 
            className="inline-flex items-center text-navy hover:text-coral transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to all products
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  const selectedVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];
  const isInStock = selectedVariant?.inStock;
  const discountPercentage = selectedVariant?.compareAtPrice 
    ? calculateDiscountPercentage(selectedVariant.compareAtPrice, selectedVariant.price) 
    : product.compareAtPrice 
      ? calculateDiscountPercentage(product.compareAtPrice, product.price)
      : 0;
  
  const handleAddToCart = () => {
    if (!isInStock || !selectedVariant) return;
    
    addToCart({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      price: selectedVariant.price,
      image: product.images[0],
      quantity,
    });
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  return (
    <MainLayout>
      <div className="container-custom py-8 md:py-12">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="text-sm text-gray-500 hover:text-navy">Home</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link to="/products" className="text-sm text-gray-500 hover:text-navy">Products</Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-sm text-gray-700" aria-current="page">{product.name}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`aspect-square cursor-pointer rounded-md overflow-hidden border-2 ${
                    selectedImageIndex === index ? "border-navy" : "border-transparent"
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
            
            <div className="flex items-center mt-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
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
              <span className="text-gray-600 ml-2">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
            
            <div className="flex items-end gap-2 mb-4">
              <span className="text-2xl font-bold">
                {formatCurrency(selectedVariant ? selectedVariant.price : product.price)}
              </span>
              {(selectedVariant?.compareAtPrice || product.compareAtPrice) && (
                <span className="text-gray-500 line-through">
                  {formatCurrency(selectedVariant?.compareAtPrice || product.compareAtPrice || 0)}
                </span>
              )}
              {discountPercentage > 0 && (
                <span className="bg-coral text-white text-sm px-2 py-1 rounded-md">
                  Save {discountPercentage}%
                </span>
              )}
            </div>
            
            <p className="text-gray-600 mb-6">{product.shortDescription}</p>
            
            {/* Product Variants */}
            {product.variants.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium mb-3">Options</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariantId(variant.id)}
                      className={`px-4 py-2 border rounded-md ${
                        selectedVariantId === variant.id
                          ? "bg-navy text-white border-navy"
                          : variant.inStock
                          ? "border-gray-300 hover:border-navy"
                          : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                      }`}
                      disabled={!variant.inStock}
                    >
                      {variant.name}
                      {!variant.inStock && " - Out of Stock"}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex items-center border border-gray-300 rounded-md w-32">
                <button
                  onClick={decreaseQuantity}
                  className="px-3 py-2 text-gray-600 hover:text-navy disabled:text-gray-300"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full text-center border-none focus:outline-none focus:ring-0 p-0"
                  readOnly
                />
                <button
                  onClick={increaseQuantity}
                  className="px-3 py-2 text-gray-600 hover:text-navy"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!isInStock}
                className="flex-1 bg-navy hover:bg-navy-700 text-white py-3 px-6 rounded-md transition-colors disabled:bg-gray-300 flex items-center justify-center"
              >
                <ShoppingCart size={20} className="mr-2" />
                {isInStock ? "Add to Cart" : "Out of Stock"}
              </button>
              
              <button className="border border-gray-300 hover:border-navy p-3 rounded-md transition-colors">
                <Heart size={20} className="text-gray-600" />
              </button>
            </div>
            
            {/* Product Description */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-medium mb-3">Description</h3>
              <p className="text-gray-600 whitespace-pre-line">{product.description}</p>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You might also like</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetailPage;
