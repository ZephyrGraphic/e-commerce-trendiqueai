"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice, type Product } from "@/lib/mockData";

interface ProductCardProps {
  product: Product;
  className?: string;
  onWishlistToggle?: (productId: string) => void;
}

export function ProductCard({ product, className, onWishlistToggle }: ProductCardProps) {
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onWishlistToggle) {
      onWishlistToggle(product.id);
    } else {
      // Default: call API to toggle wishlist
      fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });
    }
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className={cn(
        "group block bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
            -{product.discount}%
          </div>
        )}
        
        {/* Wishlist Button */}
        <button
          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
          onClick={handleWishlistClick}
        >
          <Heart
            className={cn(
              "w-4 h-4",
              product.isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-gray-400"
            )}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-3">
        <h3 className="font-noto text-sm font-medium text-foreground line-clamp-2 mb-2">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-2">
          <span className="font-fredoka text-primary font-semibold">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="font-noto text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={cn(
                  "text-xs",
                  i < Math.floor(product.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                )}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>
      </div>
    </Link>
  );
}
