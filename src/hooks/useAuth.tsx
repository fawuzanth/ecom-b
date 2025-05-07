
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { AdminUser, CustomerUser, User } from "@/types/product";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const MOCK_USERS = [
  {
    id: "user-1",
    email: "demo@example.com",
    password: "password123",
    name: "Demo User",
    role: "customer" as const
  },
  {
    id: "admin-1",
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    role: "admin" as const
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check if user is already logged in from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find customer user with matching email and password
    const foundUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password && u.role === "customer"
    );
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as CustomerUser);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.name}!`,
      });
      setIsLoading(false);
      return true;
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Try demo@example.com / password123",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };
  
  const adminLogin = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find admin user with matching email and password
    const foundUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password && u.role === "admin"
    );
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as AdminUser);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      toast({
        title: "Admin login successful",
        description: `Welcome back, ${foundUser.name}!`,
      });
      setIsLoading(false);
      return true;
    } else {
      toast({
        title: "Admin login failed",
        description: "Invalid admin credentials. Try admin@example.com / admin123",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };
  
  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user with this email already exists
    const existingUser = MOCK_USERS.find((u) => u.email === email);
    
    if (existingUser) {
      toast({
        title: "Registration failed",
        description: "An account with this email already exists.",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
    
    // In a real app, we'd save this user to a database
    // For demo, we'll just create a new user object
    const newUser: CustomerUser = {
      id: `user-${Date.now()}`,
      email,
      name,
      role: "customer"
    };
    
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    toast({
      title: "Registration successful",
      description: `Welcome, ${name}!`,
    });
    setIsLoading(false);
    return true;
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        isLoading,
        login,
        adminLogin,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
