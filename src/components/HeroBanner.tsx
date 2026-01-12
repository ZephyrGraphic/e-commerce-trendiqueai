"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Banner } from "@/lib/mockData";

interface HeroBannerProps {
  banners: Banner[];
  autoPlayInterval?: number;
  className?: string;
}

export function HeroBanner({
  banners,
  autoPlayInterval = 5000,
  className,
}: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [goToNext, autoPlayInterval]);

  return (
    <div className={cn("relative w-full overflow-hidden rounded-xl", className)}>
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner) => (
          <Link
            key={banner.id}
            href={banner.href}
            className="relative w-full flex-shrink-0 aspect-[3/1]"
          >
            <Image
              src={banner.image}
              alt={banner.alt}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent" />
          </Link>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-foreground" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-foreground" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentIndex
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/70"
            )}
          />
        ))}
      </div>
    </div>
  );
}
