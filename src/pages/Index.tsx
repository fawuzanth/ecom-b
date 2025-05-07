
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategoryHighlight from "@/components/home/CategoryHighlight";
import Newsletter from "@/components/home/Newsletter";
import ProductGrid from "@/components/product/ProductGrid";
import { getBestSellerProducts, getNewProducts } from "@/data/products";

const Index: React.FC = () => {
  const bestSellers = getBestSellerProducts();
  const newArrivals = getNewProducts();
  
  return (
    <MainLayout>
      <Hero />
      
      <FeaturedProducts />
      
      <CategoryHighlight />
      
      <section className="py-16">
        <div className="container-custom">
          <ProductGrid 
            products={bestSellers} 
            title="Best Sellers" 
            subtitle="Our most popular products based on sales"
          />
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <ProductGrid 
            products={newArrivals} 
            title="New Arrivals" 
            subtitle="Check out our latest products and collections"
          />
        </div>
      </section>
      
      <div className="bg-navy text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Crafted with Quality & Care</h2>
            <p className="text-lg mb-8 text-gray-200">
              Every product in our store is selected for its exceptional design, durability, 
              and commitment to sustainable practices. We believe in products that make your life 
              better while minimizing environmental impact.
            </p>
          </div>
        </div>
      </div>
      
      <Newsletter />
    </MainLayout>
  );
};

export default Index;
