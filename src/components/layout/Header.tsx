
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/products" },
    { name: "Collections", href: "/collections" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-navy">SHOPLY</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-600 hover:text-navy-600 transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <button aria-label="Search" className="text-gray-600 hover:text-navy-600">
              <Search size={20} />
            </button>
            <Link to="/account" aria-label="Account" className="text-gray-600 hover:text-navy-600">
              <User size={20} />
            </Link>
            <Link to="/cart" aria-label="Cart" className="text-gray-600 hover:text-navy-600 relative">
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <Badge 
                  className="absolute -top-2 -right-2 bg-coral text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center rounded-full p-0"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" aria-label="Cart" className="text-gray-600 hover:text-navy-600 relative">
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <Badge 
                  className="absolute -top-2 -right-2 bg-coral text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center rounded-full p-0"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-gray-600 hover:text-navy-600"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden bg-white absolute w-full border-b border-gray-200 transition-all duration-300 ease-in-out",
        isMenuOpen ? "max-h-[400px] py-4" : "max-h-0 overflow-hidden"
      )}>
        <div className="container-custom">
          <nav className="flex flex-col space-y-4 pb-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-600 hover:text-navy-600 transition-colors py-2 px-4 hover:bg-gray-50 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-gray-200 pt-4 mt-2 flex flex-col space-y-4">
              <Link 
                to="/account" 
                className="flex items-center text-gray-600 hover:text-navy-600 transition-colors py-2 px-4 hover:bg-gray-50 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={18} className="mr-2" />
                <span>Account</span>
              </Link>
              <button 
                className="flex items-center text-gray-600 hover:text-navy-600 transition-colors py-2 px-4 hover:bg-gray-50 rounded text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search size={18} className="mr-2" />
                <span>Search</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
