
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

type AuthMode = "login" | "register";

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isAuthenticated } = useAuth();
  
  // Get the return URL from location state, or default to "/"
  const from = ((location.state as any)?.from?.pathname) || "/";
  
  // If user is already logged in, redirect to home
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    
    try {
      let success = false;
      
      if (mode === "login") {
        success = await login(email, password);
      } else {
        if (!name.trim()) {
          setError("Name is required");
          setIsSubmitting(false);
          return;
        }
        success = await register(email, password, name);
      }
      
      if (success) {
        // Navigate to the return URL or home page
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Auth error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setError("");
    setEmail("");
    setPassword("");
    setName("");
  };
  
  return (
    <MainLayout>
      <div className="container-custom py-12 md:py-16">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
            {mode === "login" ? "Sign In to Your Account" : "Create an Account"}
          </h1>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {mode === "register" && (
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                    className="w-full"
                  />
                </div>
              )}
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === "login" ? "Your password" : "Create a password"}
                  required
                  className="w-full"
                  minLength={6}
                />
                {mode === "register" && (
                  <p className="mt-1 text-xs text-gray-500">
                    Password must be at least 6 characters long
                  </p>
                )}
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-navy hover:bg-navy-700 text-white py-3"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Please wait...</span>
                  </>
                ) : (
                  <span>{mode === "login" ? "Sign In" : "Create Account"}</span>
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              {mode === "login" ? (
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <button
                    onClick={toggleMode}
                    className="text-navy hover:text-coral transition-colors font-medium"
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <button
                    onClick={toggleMode}
                    className="text-navy hover:text-coral transition-colors font-medium"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              {mode === "login" 
                ? "Use Supabase authentication to sign in or create a new account." 
                : "After registration, you may need to verify your email depending on Supabase settings."}
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AuthPage;
