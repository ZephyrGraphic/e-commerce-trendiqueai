"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { exploreProducts, popularProducts } from "@/lib/mockData";
import { Search } from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  // Mock search results (just return everything for now)
  const results = [...popularProducts, ...exploreProducts]; 

  return (
    <div className="flex flex-col gap-6">
        <div className="relative w-full md:hidden">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari Apa di Trendique?"
            defaultValue={query || ""}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-border rounded-lg font-noto text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div>
            {query ? (
                <h1 className="font-fredoka text-2xl font-bold mb-4">Search Results for &quot;{query}&quot;</h1>
            ) : (
                <h1 className="font-fredoka text-2xl font-bold mb-4">Explore Products</h1>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {results.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading search results...</div>}>
          <SearchContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
