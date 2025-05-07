
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  Users, 
  ShoppingCart, 
  Settings, 
  LogOut,
  Home
} from "lucide-react";
import { Link } from "react-router-dom";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { isAuthenticated, isAdmin, logout } = useAuth();

  // Redirect if not authenticated or not an admin
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex min-h-screen">
      {/* Admin Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        
        <nav className="space-y-6">
          <div className="space-y-2">
            <Link to="/">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-slate-800">
                <Home className="mr-2 h-5 w-5" />
                View Store
              </Button>
            </Link>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-slate-400 font-medium uppercase">Products</p>
            <Link to="/admin/products">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-slate-800">
                <Package className="mr-2 h-5 w-5" />
                Products
              </Button>
            </Link>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-slate-400 font-medium uppercase">Customers</p>
            <Link to="/admin/customers">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-slate-800">
                <Users className="mr-2 h-5 w-5" />
                Customers
              </Button>
            </Link>
            <Link to="/admin/orders">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-slate-800">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Orders
              </Button>
            </Link>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-slate-400 font-medium uppercase">Settings</p>
            <Link to="/admin/settings">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-slate-800">
                <Settings className="mr-2 h-5 w-5" />
                Settings
              </Button>
            </Link>
          </div>

          <div className="pt-6">
            <Button 
              onClick={() => logout()} 
              variant="ghost" 
              className="w-full justify-start text-white hover:bg-slate-800"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-slate-50">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
