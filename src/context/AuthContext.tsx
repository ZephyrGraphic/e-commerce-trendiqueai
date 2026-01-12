"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp, signOut, useSession } from "@/lib/auth-client";
import { User as BetterAuthUser } from "better-auth";

interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
  phone?: string;
  onboardingCompleted?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (data: { username: string; email: string; phone: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending: isLoading } = useSession();
  const router = useRouter();

  const user: User | null = session?.user
    ? {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        emailVerified: session.user.emailVerified,
        image: session.user.image ?? undefined,
        createdAt: session.user.createdAt,
        updatedAt: session.user.updatedAt,
        phone: (session.user as any).phone,
        onboardingCompleted: (session.user as any).onboardingCompleted ?? false,
      }
    : null;

  useEffect(() => {
    if (!isLoading && user && !user.onboardingCompleted && window.location.pathname !== "/onboarding") {
      router.push("/onboarding");
    }
  }, [user, isLoading, router]);

  const login = async (email: string, password?: string) => {
    if (password) {
      await signIn.email({ email, password });
    } else {
      // For backward compatibility - using magic link or fallback
      await signIn.email({ email, password: "temp-password" });
    }
    router.push("/");
  };

  const loginWithGoogle = async () => {
    console.log("🔵 AuthContext: loginWithGoogle called");
    try {
      await signIn.social({ provider: "google", callbackURL: "/" });
      console.log("🟢 AuthContext: signIn.social called successfully");
    } catch (error) {
      console.error("🔴 AuthContext: Error in loginWithGoogle:", error);
    }
  };

  const register = async (data: { username: string; email: string; phone: string; password: string }) => {
    await signUp.email({
      email: data.email,
      password: data.password,
      name: data.username,
    });
    router.push("/");
  };

  const logout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, loginWithGoogle, register, logout }}
    >
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
