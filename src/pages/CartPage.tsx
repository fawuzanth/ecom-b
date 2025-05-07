
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";
import { Minus, Plus, X, ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getSubtotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const handleProceedToCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      // Simulate checkout process - in a real app, redirect to checkout page
      setIsCheckingOut(false);
    }, 1500);
  };
  
  // Calculate totals
  const subtotal = getSubtotal();
  const shippingEstimate = subtotal > 0 ? (subtotal >= 100 ? 0 : 10) : 0;
  const taxEstimate = subtotal * 0.08; // 8% tax
  const orderTotal = subtotal + shippingEstimate + taxEstimate;
  
  return (
    <MainLayout>
      <div className="container-custom py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="py-16 text-center">
            <div className="inline-block p-4 rounded-full bg-gray-100 mb-6">
              <ShoppingCart size={36} className="text-gray-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center bg-navy hover:bg-navy-700 text-white px-6 py-3 rounded-md transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {cartItems.map((item) => (
                        <tr key={`${item.productId}-${item.variantId}`}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-md overflow-hidden">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="ml-4">
                                <h3 className="text-sm font-medium text-gray-900">
                                  <Link to={`/products/${item.productId}`}>{item.name}</Link>
                                </h3>
                                <p className="text-xs text-gray-500">
                                  Price: {formatCurrency(item.price)}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center justify-center">
                              <button
                                onClick={() => 
                                  updateQuantity(item.productId, item.variantId, item.quantity - 1)
                                }
                                className="p-1 rounded-md hover:bg-gray-100"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="mx-3 w-10 text-center">{item.quantity}</span>
                              <button
                                onClick={() => 
                                  updateQuantity(item.productId, item.variantId, item.quantity + 1)
                                }
                                className="p-1 rounded-md hover:bg-gray-100"
                                aria-label="Increase quantity"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                            {formatCurrency(item.price)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {formatCurrency(item.price * item.quantity)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => removeFromCart(item.productId, item.variantId)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                              aria-label="Remove item"
                            >
                              <X size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="flex justify-between mt-4">
                <Link
                  to="/products"
                  className="inline-flex items-center text-navy hover:text-navy-700 transition-colors"
                >
                  Continue Shopping
                </Link>
                <Button
                  onClick={clearCart}
                  variant="outline"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                
                <div className="flow-root">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-600">Subtotal</p>
                      <p className="text-sm font-medium text-gray-900">{formatCurrency(subtotal)}</p>
                    </div>
                    
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-600">Shipping estimate</p>
                      <p className="text-sm font-medium text-gray-900">
                        {shippingEstimate === 0 ? 'Free' : formatCurrency(shippingEstimate)}
                      </p>
                    </div>
                    
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-600">Tax estimate</p>
                      <p className="text-sm font-medium text-gray-900">{formatCurrency(taxEstimate)}</p>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 flex justify-between">
                      <p className="text-base font-medium text-gray-900">Order total</p>
                      <p className="text-base font-medium text-gray-900">{formatCurrency(orderTotal)}</p>
                    </div>
                  </div>
                </div>
                
                {subtotal < 100 && (
                  <div className="mt-4 bg-blue-50 text-blue-700 p-3 rounded-md text-sm">
                    Add {formatCurrency(100 - subtotal)} more to qualify for free shipping!
                  </div>
                )}
                
                <div className="mt-6">
                  <Button
                    onClick={handleProceedToCheckout}
                    disabled={isCheckingOut || cartItems.length === 0}
                    className="w-full flex items-center justify-center bg-navy hover:bg-navy-700 text-white py-3 px-6 rounded-md transition-colors"
                  >
                    {isCheckingOut ? (
                      "Processing..."
                    ) : (
                      <>
                        Proceed to Checkout
                        <ArrowRight size={18} className="ml-2" />
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="mt-6 text-center text-sm text-gray-500">
                  <p className="mb-1">We accept</p>
                  <div className="flex justify-center space-x-2">
                    <span className="bg-white px-2 py-1 rounded shadow-sm">Visa</span>
                    <span className="bg-white px-2 py-1 rounded shadow-sm">Mastercard</span>
                    <span className="bg-white px-2 py-1 rounded shadow-sm">PayPal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CartPage;
