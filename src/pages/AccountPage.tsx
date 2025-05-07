
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface OrderHistoryItem {
  id: string;
  date: string;
  total: number;
  status: "processing" | "shipped" | "delivered";
  items: Array<{ name: string; quantity: number }>;
}

// Mock order history for demo purposes
const mockOrderHistory: OrderHistoryItem[] = [
  {
    id: "ORD-1234",
    date: "2023-09-15",
    total: 179.99,
    status: "delivered",
    items: [
      { name: "Premium Wireless Headphones", quantity: 1 }
    ]
  },
  {
    id: "ORD-5678",
    date: "2023-08-22",
    total: 89.97,
    status: "shipped",
    items: [
      { name: "Everyday Tote Bag", quantity: 1 },
      { name: "Sustainable Water Bottle", quantity: 1 }
    ]
  }
];

const AccountPage: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: { pathname: "/account" } }} />;
  }
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaved(true);
      setIsSaving(false);
      
      // Reset the saved state after a few seconds
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    }, 1000);
  };
  
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(amount);
  };
  
  const getStatusBadgeClass = (status: OrderHistoryItem["status"]): string => {
    switch (status) {
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-yellow-100 text-yellow-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <MainLayout>
      <div className="container-custom py-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Account Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="mb-6">
                <h2 className="font-medium text-lg mb-1">Welcome, {user?.name}!</h2>
                <p className="text-gray-600 text-sm">{user?.email}</p>
              </div>
              
              <nav>
                <ul className="space-y-1">
                  <li>
                    <button className="w-full text-left px-4 py-2 rounded-md bg-gray-200 font-medium">
                      Account Details
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700">
                      Order History
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700">
                      Addresses
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700">
                      Wishlist
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={logout}
                      className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 text-red-600"
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="font-medium text-lg">Account Details</h2>
              </div>
              
              <div className="p-6">
                {saved && (
                  <div className="mb-4 p-3 bg-green-50 text-green-600 text-sm rounded">
                    Your profile has been updated successfully!
                  </div>
                )}
                
                <form onSubmit={handleUpdateProfile}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSaving}
                    className="bg-navy hover:bg-navy-700 text-white"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </div>
            </div>
            
            <div className="mt-8 bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="font-medium text-lg">Recent Orders</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {mockOrderHistory.length > 0 ? (
                  mockOrderHistory.map((order) => (
                    <div key={order.id} className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">Order #{order.id}</h3>
                            <span
                              className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                                order.status
                              )}`}
                            >
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{formatDate(order.date)}</p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <p className="font-medium">{formatCurrency(order.total)}</p>
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Items:</h4>
                        <ul className="text-sm text-gray-600">
                          {order.items.map((item, index) => (
                            <li key={index}>
                              {item.quantity} x {item.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-4">
                        <Button variant="outline" size="sm">View Order Details</Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-gray-500">You haven't placed any orders yet.</p>
                  </div>
                )}
              </div>
              
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <Button variant="link" className="text-navy hover:text-navy-700">
                  View All Orders
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AccountPage;
