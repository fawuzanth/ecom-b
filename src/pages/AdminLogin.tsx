
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

interface AdminLoginForm {
  email: string;
  password: string;
}

const AdminLogin: React.FC = () => {
  const { isAuthenticated, isAdmin, adminLogin } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AdminLoginForm>();

  // If already authenticated as admin, redirect to admin dashboard
  if (isAuthenticated && isAdmin) {
    return <Navigate to="/admin/products" replace />;
  }

  const onSubmit = async (data: AdminLoginForm) => {
    const success = await adminLogin(data.email, data.password);
    if (success) {
      navigate("/admin/products");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-sm text-gray-500">Access your admin dashboard</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </div>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-500">Demo credentials: admin@example.com / admin123</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
