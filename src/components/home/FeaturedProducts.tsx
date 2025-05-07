
import React from "react";
import { Link } from "react-router-dom";
import ProductGrid from "@/components/product/ProductGrid";
import { getFeaturedProducts } from "@/data/products";

const FeaturedProducts: React.FC = () => {
  const featuredProducts = getFeaturedProducts();
  
  return (
    <section className="py-16 bg-sand-50">
      <div className="container-custom">
        <ProductGrid 
          products={featuredProducts} 
          title="Featured Products" 
          subtitle="Carefully selected products we think you'll love"
        />
        
        <div className="mt-12 text-center">
          <Link 
            to="/products" 
            className="inline-block border-b-2 border-navy text-navy font-medium hover:border-coral hover:text-coral transition-colors duration-200"
          >
            View all products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
