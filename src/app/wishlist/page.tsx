"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Heart, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface WishlistItem {
  id: string;
  productId: string;
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    discount: number;
    rating: number;
    reviewCount: number;
    image: string;
  };
}

export default function WishlistPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      setIsLoading(false);
      return;
    }

    fetchWishlist();
  }, [user, authLoading]);

  const fetchWishlist = async () => {
    try {
      const res = await fetch("/api/wishlist");
      if (!res.ok) throw new Error("Failed to fetch wishlist");
      const data = await res.json();
      setWishlistItems(data || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Gagal memuat wishlist");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) throw new Error("Failed to update");

      setWishlistItems((items) => items.filter((item) => item.productId !== productId));
      toast.success("Produk dihapus dari wishlist");
    } catch (error) {
      toast.error("Gagal menghapus dari wishlist");
    }
  };

  // Transform wishlist items to ProductCard format
  const products = wishlistItems.map((item) => ({
    id: item.product.id,
    name: item.product.name,
    price: item.product.price,
    originalPrice: item.product.originalPrice,
    discount: item.product.discount,
    rating: item.product.rating,
    reviewCount: item.product.reviewCount,
    image: item.product.image,
    isWishlisted: true,
  }));

  // Not logged in state
  if (!authLoading && !user) {
    return (
      <div className="bg-white min-h-screen">
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="font-fredoka text-2xl font-bold mb-2">Masuk untuk Melihat Wishlist</h2>
            <p className="text-muted-foreground mb-4">Silakan login terlebih dahulu untuk melihat wishlist Anda.</p>
            <Button asChild><Link href="/login">Masuk</Link></Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-8">
           <Heart className="w-8 h-8 text-primary fill-primary" />
           <h1 className="font-fredoka text-3xl font-bold">My Wishlist</h1>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Memuat wishlist...</p>
          </div>
        ) : products.length === 0 ? (
           <div className="text-center py-20">
               <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
               <h3 className="font-fredoka text-xl font-bold mb-2">Wishlist kosong</h3>
               <p className="text-muted-foreground mb-4">Belum ada produk yang ditambahkan ke wishlist.</p>
               <Button asChild><Link href="/">Browse Products</Link></Button>
           </div>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {products.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onWishlistToggle={() => handleRemoveFromWishlist(product.id)}
                    />
                ))}
            </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
