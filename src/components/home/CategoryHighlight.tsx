
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Electronics",
    description: "Smart devices and accessories",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    link: "/products?category=Electronics"
  },
  {
    name: "Accessories",
    description: "Stylish and functional essentials",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
    link: "/products?category=Accessories"
  },
  {
    name: "Home",
    description: "Everyday items for modern living",
    image: "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?auto=format&fit=crop&w=800&q=80",
    link: "/products?category=Home"
  }
];

const CategoryHighlight: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">Shop by Category</h2>
          <p className="mt-2 text-gray-600">Discover products tailored to your needs</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.name} className="group">
              <Link to={category.link} className="block overflow-hidden">
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-medium mb-1">{category.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">{category.description}</p>
                  <ArrowRight size={18} className="text-navy transform transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryHighlight;
