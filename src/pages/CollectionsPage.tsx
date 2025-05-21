
import React from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { products, getProductCategories } from "@/data/products";

const CollectionsPage: React.FC = () => {
  const categories = getProductCategories();
  const navigate = useNavigate();

  // Create a map of categories with their product counts and featured image
  const categoryData = categories.map(category => {
    const productsInCategory = products.filter(product => product.category === category);
    const featuredImage = productsInCategory.length > 0 ? 
      productsInCategory.find(p => p.featured)?.images[0] || 
      productsInCategory[0].images[0] : 
      '/placeholder.svg';
    
    return {
      name: category,
      count: productsInCategory.length,
      image: featuredImage
    };
  });

  const handleCategoryClick = (category: string) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <MainLayout>
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-8">Collections</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryData.map((category) => (
            <Card 
              key={category.name}
              className="overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="aspect-[16/9] relative overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <p className="text-sm opacity-80">{category.count} products</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default CollectionsPage;
