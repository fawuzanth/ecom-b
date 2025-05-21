
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { AdminUser, CustomerUser, User } from "@/types/product";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Initialize auth and set up listener
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        if (currentSession?.user) {
          // Check user role from profiles table
          setTimeout(() => {
            checkUserRole(currentSession.user.id);
          }, 0);
        } else {
          setUser(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      if (currentSession?.user) {
        checkUserRole(currentSession.user.id);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUserRole = async (userId: string) => {
    try {
      // Check if user is admin by querying profiles table
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      
      if (data) {
        const userWithRole: User = {
          id: userId,
          email: session?.user?.email || '',
          name: data.name || '',
          role: data.role === 'admin' ? 'admin' : 'customer'
        };
        setUser(userWithRole);
      } else {
        // Default role is customer if no profile exists
        const userWithRole: CustomerUser = {
          id: userId,
          email: session?.user?.email || '',
          name: session?.user?.user_metadata?.name || '',
          role: 'customer'
        };
        setUser(userWithRole);
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
      // Set default role as customer in case of error
      const userWithRole: CustomerUser = {
        id: userId,
        email: session?.user?.email || '',
        name: session?.user?.user_metadata?.name || '',
        role: 'customer'
      };
      setUser(userWithRole);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Login successful",
        description: `Welcome back!`,
      });
      setIsLoading(false);
      return true;
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };
  
  const adminLogin = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Check if user is an admin
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();
      
      if (profileError) throw profileError;
      
      if (profileData?.role !== 'admin') {
        await supabase.auth.signOut();
        throw new Error("Unauthorized: Admin access required");
      }
      
      toast({
        title: "Admin login successful",
        description: `Welcome back, admin!`,
      });
      setIsLoading(false);
      return true;
    } catch (error: any) {
      toast({
        title: "Admin login failed",
        description: error.message || "Invalid admin credentials or unauthorized access.",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };
  
  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      
      if (error) throw error;
      
      toast({
        title: "Registration successful",
        description: "Please check your email for a confirmation link.",
      });
      setIsLoading(false);
      return true;
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };
  
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
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
