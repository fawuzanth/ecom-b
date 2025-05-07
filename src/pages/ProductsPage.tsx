
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import ProductGrid from "@/components/product/ProductGrid";
import { products, getProductCategories } from "@/data/products";
import { Product } from "@/types/product";
import { Filter, X } from "lucide-react";

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const categories = getProductCategories();
  
  const categoryFilter = searchParams.get("category") || "";
  const sortBy = searchParams.get("sort") || "featured";
  
  // Filter and sort products based on URL parameters
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (categoryFilter) {
      result = result.filter(product => product.category === categoryFilter);
    }
    
    // Apply sorting
    switch (sortBy) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result = result.filter(product => product.new).concat(
          result.filter(product => !product.new)
        );
        break;
      case "best-selling":
        result = result.filter(product => product.bestSeller).concat(
          result.filter(product => !product.bestSeller)
        );
        break;
      // Default is "featured"
      default:
        result = result.filter(product => product.featured).concat(
          result.filter(product => !product.featured)
        );
    }
    
    setFilteredProducts(result);
  }, [categoryFilter, sortBy]);
  
  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    setSearchParams(params);
    
    // Close mobile filter when applied
    if (window.innerWidth < 768) {
      setIsFilterOpen(false);
    }
  };
  
  const clearFilters = () => {
    setSearchParams({});
  };
  
  return (
    <MainLayout>
      <div className="bg-gray-50 py-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">All Products</h1>
              <p className="text-gray-600">
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 w-full md:w-auto">
              <div className="flex items-center justify-between md:justify-start gap-4">
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 md:hidden px-4 py-2 border border-gray-300 rounded"
                >
                  <Filter size={18} />
                  Filters
                </button>
                
                <div className="flex items-center space-x-2">
                  <label htmlFor="sort-select" className="text-sm font-medium">
                    Sort by:
                  </label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => updateFilters("sort", e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-navy text-sm"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="newest">Newest</option>
                    <option value="best-selling">Best Selling</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden md:block">
            <div className="sticky top-24">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Filters</h2>
                  {(categoryFilter) && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-navy hover:underline"
                    >
                      Reset all
                    </button>
                  )}
                </div>
                
                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Category</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center">
                        <input
                          type="radio"
                          id={`category-${category}`}
                          name="category"
                          checked={categoryFilter === category}
                          onChange={() => 
                            updateFilters("category", categoryFilter === category ? "" : category)
                          }
                          className="mr-2"
                        />
                        <label htmlFor={`category-${category}`}>{category}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Filters */}
          <div 
            className={`fixed inset-0 z-50 bg-white transform transition-transform duration-300 ${
              isFilterOpen ? "translate-x-0" : "-translate-x-full"
            } md:hidden`}
          >
            <div className="p-6 h-full overflow-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium">Filters</h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-gray-500"
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Category Filter - Mobile */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Category</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        type="radio"
                        id={`mobile-category-${category}`}
                        name="mobile-category"
                        checked={categoryFilter === category}
                        onChange={() => 
                          updateFilters("category", categoryFilter === category ? "" : category)
                        }
                        className="mr-2"
                      />
                      <label htmlFor={`mobile-category-${category}`}>{category}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 border border-gray-300 rounded text-sm"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="px-4 py-2 bg-navy text-white rounded text-sm"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
          
          {/* Product listing */}
          <div className="md:col-span-3">
            {categoryFilter && (
              <div className="mb-6 flex items-center">
                <span className="mr-2">Filtered by:</span>
                <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                  Category: {categoryFilter}
                  <button
                    onClick={() => updateFilters("category", "")}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            )}
            
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
