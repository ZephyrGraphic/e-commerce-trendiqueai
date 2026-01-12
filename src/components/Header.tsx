"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Heart, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export function Header() {
  const { user } = useAuth();
  return (
    <header className="w-full bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <h1 className="font-baloo font-bold text-primary text-2xl lg:text-3xl text-shadow-logo">
            Trendique
          </h1>
        </Link>

        {/* Search Bar - Hidden on small mobile */}
        <div className="flex-1 max-w-xl hidden md:flex">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari Apa di Trendique?"
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-border rounded-lg font-noto text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Action Icons & Auth */}
        <div className="flex items-center gap-3">
          {/* Icons for Cart/Wishlist (generic for now) */}
           <Link href="/notifications" className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block relative">
            <Bell className="w-6 h-6 text-foreground" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </Link>
           <Link href="/wishlist" className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
            <Heart className="w-6 h-6 text-foreground" />
          </Link>
          <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
            <ShoppingCart className="w-6 h-6 text-foreground" />
            {/* Mock Badge */}
            <span className="absolute top-1 right-0 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold">2</span>
          </Link>
          
          <div className="h-6 w-px bg-gray-200 mx-1 hidden sm:block"></div>

          {/* Auht Buttons */}
          {/* Auth Buttons or User Profile */}
          {user ? (
            <Link href="/profile" className="flex items-center gap-2 hover:bg-gray-50 p-1 pr-3 rounded-full border border-transparent hover:border-gray-200 transition-all">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 bg-gray-100">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-5 h-5 m-auto text-gray-500" />
                )}
              </div>
              <span className="font-fredoka text-sm font-medium hidden sm:block max-w-[100px] truncate">
                {user.name}
              </span>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/daftar"
                className="font-fredoka bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm hidden sm:block"
              >
                Daftar
              </Link>
              <Link
                href="/login"
                className="font-fredoka border border-border text-foreground px-5 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Masuk
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
