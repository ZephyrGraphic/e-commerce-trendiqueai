"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  register: (data: { username: string; email: string; phone: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check local storage on mount
    const storedUser = localStorage.getItem("trendique_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("trendique_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string) => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockUser: User = {
      id: "1",
      name: email.split("@")[0], // Simple username from email
      email: email,
      avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${email}`,
      phone: "+62 812-3456-7890",
    };

    setUser(mockUser);
    localStorage.setItem("trendique_user", JSON.stringify(mockUser));
    setIsLoading(false);
    
    // Redirect handled by component or here? sticking to redirect in component for flexibility usually, but standardized here is fine too. 
    // Let's keep redirect basic here for "easy" integration
    router.push("/"); 
  };

  const register = async (data: { username: string; email: string; phone: string }) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.username,
      email: data.email,
      phone: data.phone,
      avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${data.username}`,
    };

    setUser(mockUser);
    localStorage.setItem("trendique_user", JSON.stringify(mockUser));
    setIsLoading(false);
    router.push("/");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("trendique_user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
