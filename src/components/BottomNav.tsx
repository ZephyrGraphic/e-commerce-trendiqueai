"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingCart, Heart, User } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  // Hide on auth pages
  if (pathname.includes("/login") || pathname.includes("/daftar")) {
    return null;
  }

  const isActive = (path: string) => pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50 md:hidden pb-safe">
      <div className="flex items-center justify-around h-16">
        <Link 
          href="/" 
          className={`flex flex-col items-center gap-1 w-full h-full justify-center ${isActive("/") ? "text-primary" : "text-muted-foreground"}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium font-fredoka">Home</span>
        </Link>
        <Link 
          href="/search" 
          className={`flex flex-col items-center gap-1 w-full h-full justify-center ${isActive("/search") ? "text-primary" : "text-muted-foreground"}`}
        >
          <Search className="w-6 h-6" />
          <span className="text-[10px] font-medium font-fredoka">Search</span>
        </Link>
        <Link 
          href="/cart" 
          className={`relative flex flex-col items-center gap-1 w-full h-full justify-center ${isActive("/cart") ? "text-primary" : "text-muted-foreground"}`}
        >
          <div className="relative">
             <ShoppingCart className="w-6 h-6" />
             {/* Mock Badge */}
             <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white"></span>
          </div>
          <span className="text-[10px] font-medium font-fredoka">Cart</span>
        </Link>
        <Link 
          href="/wishlist" 
          className={`flex flex-col items-center gap-1 w-full h-full justify-center ${isActive("/wishlist") ? "text-primary" : "text-muted-foreground"}`}
        >
          <Heart className="w-6 h-6" />
          <span className="text-[10px] font-medium font-fredoka">Wishlist</span>
        </Link>
        <Link 
          href="/profile" 
          className={`flex flex-col items-center gap-1 w-full h-full justify-center ${isActive("/profile") ? "text-primary" : "text-muted-foreground"}`}
        >
          <User className="w-6 h-6" />
          <span className="text-[10px] font-medium font-fredoka">Profile</span>
        </Link>
      </div>
    </div>
  );
}
