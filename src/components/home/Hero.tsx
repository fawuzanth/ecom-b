
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gray-50">
      <div className="container-custom py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-navy-900 animate-fade-in">
              Elevate Your <span className="text-coral">Everyday</span> Style
            </h1>
            <p className="mt-6 text-lg text-gray-600 animate-slide-up">
              Discover thoughtfully designed products that blend style, function, and sustainability. 
              From tech accessories to home decor, we've curated collections that enhance your daily life.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/products"
                className="btn-primary inline-flex items-center justify-center py-3 px-6 text-lg"
              >
                Shop Now
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link
                to="/collections"
                className="btn-secondary inline-flex items-center justify-center py-3 px-6 text-lg"
              >
                View Collections
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1507680434567-5739c80be1ac?auto=format&fit=crop&w=1200&q=80"
                alt="Featured product collection"
                className="object-cover w-full h-full"
              />
            </div>
            
            {/* Product highlight popups */}
            <div className="absolute top-[20%] -left-16 bg-white p-3 rounded-lg shadow-lg hidden md:block max-w-[180px] animate-fade-in">
              <div className="flex items-start">
                <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0 bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=100&q=80"
                    alt="Headphones"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium">Wireless Headphones</h4>
                  <p className="text-xs text-gray-500 mt-1">Premium sound quality</p>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-[15%] -right-12 bg-white p-3 rounded-lg shadow-lg hidden md:block max-w-[180px] animate-fade-in" style={{animationDelay: "0.3s"}}>
              <div className="flex items-start">
                <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0 bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=100&q=80"
                    alt="Tote Bag"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium">Tote Bag</h4>
                  <p className="text-xs text-gray-500 mt-1">Sustainable canvas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
