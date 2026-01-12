"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Heart, Share2, ShoppingCart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

interface ProductActionsProps {
  productId: string;
  stock: number;
}

export function ProductActions({ productId, stock }: ProductActionsProps) {
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isWishlisting, setIsWishlisting] = useState(false);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < stock) setQuantity(quantity + 1);
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Silakan login terlebih dahulu");
      return;
    }

    setIsAddingToCart(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");

      toast.success("Produk ditambahkan ke keranjang!");
    } catch (error) {
      toast.error("Gagal menambahkan ke keranjang");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlist = async () => {
    if (!user) {
      toast.error("Silakan login terlebih dahulu");
      return;
    }

    setIsWishlisting(true);
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) throw new Error("Failed to update wishlist");

      const data = await res.json();
      toast.success(data.added ? "Ditambahkan ke wishlist" : "Dihapus dari wishlist");
    } catch (error) {
      toast.error("Gagal memperbarui wishlist");
    } finally {
      setIsWishlisting(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "Check out this product on Trendique!",
        url: window.location.href,
      });
    } catch {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="flex items-center gap-6">
      {/* Quantity */}
      <div className="flex items-center border border-border rounded-lg">
        <button
          onClick={handleDecrease}
          className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-50"
          disabled={quantity <= 1}
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-12 text-center font-bold font-noto">{quantity}</span>
        <button
          onClick={handleIncrease}
          className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-50"
          disabled={quantity >= stock}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Actions */}
      <div className="flex-1 flex gap-3">
        <Button 
          className="flex-1 h-12 text-base font-fredoka gap-2"
          onClick={handleAddToCart}
          disabled={isAddingToCart || stock === 0}
        >
          {isAddingToCart ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <ShoppingCart className="w-5 h-5" />
          )}
          {stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-12 w-12 shrink-0"
          onClick={handleWishlist}
          disabled={isWishlisting}
        >
          {isWishlisting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Heart className="w-5 h-5" />
          )}
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-12 w-12 shrink-0"
          onClick={handleShare}
        >
          <Share2 className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
