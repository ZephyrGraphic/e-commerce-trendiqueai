"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Search } from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = query ? `/api/products?search=${encodeURIComponent(query)}` : '/api/products';
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [query]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const input = form.querySelector('input') as HTMLInputElement;
      if (input.value.trim()) {
          window.location.href = `/search?q=${encodeURIComponent(input.value.trim())}`;
      }
  }

  return (
    <div className="flex flex-col gap-6">
        <form onSubmit={handleSearch} className="relative w-full md:hidden">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari Apa di Trendique?"
            defaultValue={query || ""}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-border rounded-lg font-noto text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </form>

        <div>
            {query ? (
                <h1 className="font-fredoka text-2xl font-bold mb-4">Search Results for &quot;{query}&quot;</h1>
            ) : (
                <h1 className="font-fredoka text-2xl font-bold mb-4">Explore Products</h1>
            )}
            
            {loading ? (
                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="animate-pulse bg-gray-100 rounded-lg aspect-[3/4]"></div>
                    ))}
                 </div>
            ) : results.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                    No products found matching your search.
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {results.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
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
