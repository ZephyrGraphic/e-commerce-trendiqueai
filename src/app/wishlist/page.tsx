"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { popularProducts } from "@/lib/mockData";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  // Mock Wishlist: just take first 3 popular products
  const wishlistItems = popularProducts.slice(0, 3);

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-8">
           <Heart className="w-8 h-8 text-primary fill-primary" />
           <h1 className="font-fredoka text-3xl font-bold">My Wishlist</h1>
        </div>

        {wishlistItems.length === 0 ? (
           <div className="text-center py-20">
               <p className="text-muted-foreground mb-4">Your wishlist is empty.</p>
               <Button asChild><Link href="/">Browse Products</Link></Button>
           </div>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {wishlistItems.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
