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
          name: data.name || session?.user?.user_metadata?.name || '',
          role: data.role === 'admin' ? 'admin' : 'customer'
        };
        setUser(userWithRole);
        
        // If role is not set yet, update it to default 'customer'
        if (!data.role) {
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ role: 'customer' })
            .eq('id', userId);
            
          if (updateError) console.error('Error updating default role:', updateError);
        }
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
      
      if (profileError) {
        // If profile doesn't exist or no role, create it with default customer role
        if (profileError.code === 'PGRST116') {
          // No profile found, create one with customer role
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({ id: data.user.id, role: 'customer' });
            
          if (insertError) throw insertError;
          
          // Not an admin, sign out
          await supabase.auth.signOut();
          throw new Error("Unauthorized: Admin access required");
        } else {
          throw profileError;
        }
      }
      
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
      
      // Create profile with customer role
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({ 
            id: data.user.id,
            name: name,
            role: 'customer'
          });
          
        if (profileError) console.error("Error creating profile:", profileError);
      }
      
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
