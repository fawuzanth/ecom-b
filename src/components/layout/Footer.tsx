
import React from "react";
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  Package,
  ShieldCheck
} from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-navy text-white pt-16 pb-8">
      <div className="container-custom">
        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-b border-navy-700">
          <div className="flex items-center space-x-3">
            <div className="bg-navy-800 p-2 rounded-full">
              <Truck size={24} className="text-teal" />
            </div>
            <div>
              <h4 className="font-medium">Free Shipping</h4>
              <p className="text-sm text-gray-300">On orders over $50</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-navy-800 p-2 rounded-full">
              <Package size={24} className="text-teal" />
            </div>
            <div>
              <h4 className="font-medium">Easy Returns</h4>
              <p className="text-sm text-gray-300">30 days return policy</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-navy-800 p-2 rounded-full">
              <CreditCard size={24} className="text-teal" />
            </div>
            <div>
              <h4 className="font-medium">Secure Payment</h4>
              <p className="text-sm text-gray-300">100% secure checkout</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-navy-800 p-2 rounded-full">
              <ShieldCheck size={24} className="text-teal" />
            </div>
            <div>
              <h4 className="font-medium">Quality Guarantee</h4>
              <p className="text-sm text-gray-300">Satisfaction guaranteed</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-6">SHOPLY</h3>
            <p className="text-gray-300 mb-6">
              We're dedicated to providing you with the best shopping experience possible.
              High-quality products, exceptional customer service, and competitive prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors">Shop</Link>
              </li>
              <li>
                <Link to="/collections" className="text-gray-300 hover:text-white transition-colors">Collections</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-white transition-colors">Shipping & Returns</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-gray-300 hover:text-white transition-colors">Size Guide</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 mt-1 flex-shrink-0 text-teal" />
                <span className="text-gray-300">123 Commerce St, Shopville, ST 12345</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 flex-shrink-0 text-teal" />
                <span className="text-gray-300">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 flex-shrink-0 text-teal" />
                <span className="text-gray-300">support@shoply.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-navy-700 pt-8 text-center md:flex md:justify-between md:text-left">
          <p className="text-gray-300 mb-4 md:mb-0">
            &copy; {currentYear} Shoply. All rights reserved.
          </p>
          <div className="flex justify-center md:justify-end space-x-6">
            <Link to="/terms" className="text-gray-300 hover:text-white transition-colors text-sm">
              Terms
            </Link>
            <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors text-sm">
              Privacy
            </Link>
            <Link to="/sitemap" className="text-gray-300 hover:text-white transition-colors text-sm">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
