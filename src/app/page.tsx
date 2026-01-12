import Link from "next/link";
import Image from "next/image";
import { HeroBanner } from "@/components/HeroBanner";
import { CountdownTimer } from "@/components/CountdownTimer";
import { SectionLabel } from "@/components/SectionLabel";
import { ProductCard } from "@/components/ProductCard";
import { CategoryCard } from "@/components/CategoryCard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  heroBanners,
  promoBanners,
} from "@/lib/mockData";
import { getProducts, getCategories } from "@/app/actions/products";

// Re-map types locally if needed, or trust strict structural typing.
// The components expect types from lib/mockData.
// We will map DB data to match those interfaces.

export default async function Home() {
  // Set countdown target to 3 days from now
  const countdownTarget = new Date();
  countdownTarget.setDate(countdownTarget.getDate() + 3);
  countdownTarget.setHours(23, 19, 56, 0);

  // Fetch Data from DB
  const [productsRes, categoriesRes] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  const dbProducts = productsRes.success ? productsRes.data || [] : [];
  const dbCategories = categoriesRes.success ? categoriesRes.data || [] : [];

  // Map DB Products to UI format
  // We attach isWishlisted: false as a default
  const allProducts = dbProducts.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    originalPrice: p.originalPrice,
    discount: p.discount ?? 0,
    rating: p.rating ?? 0,
    reviewCount: p.reviewCount ?? 0,
    image: p.image,
    isWishlisted: false,
    // Extra fields from DB will be ignored by the component
  }));

  // Map DB Categories to UI format
  const displayCategories = dbCategories.map(c => ({
    id: c.id,
    name: c.name,
    icon: c.icon,
    href: `/category/${c.slug}`
  }));

  // Distribute products (Simulated logic for now)
  // In a real app, you might have specific queries for "Popular", "Best Selling"
  const popularProducts = allProducts.slice(0, 8);
  const bestSellingProducts = allProducts.length > 8 ? allProducts.slice(8, 16) : allProducts.slice(0, 8);
  const exploreProducts = allProducts; // Show all or paginated

  return (
    <div className="bg-white min-h-screen w-full">
      {/* Header */}
      <Header />

      {/* Hero Banner Carousel */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        <HeroBanner banners={heroBanners} />
      </section>

      {/* Popular Right Now Section */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <SectionLabel label="Today's" className="mb-2" />
            <h2 className="font-fredoka text-2xl lg:text-3xl font-bold text-foreground">
              Popular Right Now
            </h2>
          </div>
          <CountdownTimer targetDate={countdownTarget} />
        </div>

        {/* Products Horizontal Scroll */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {popularProducts.length > 0 ? (
            popularProducts.map((product) => (
                <ProductCard
                key={product.id}
                product={product}
                className="min-w-[200px] max-w-[200px]"
                />
            ))
          ) : (
             <p className="text-gray-500">No products found. Add some from the Admin Panel.</p>
          )}
        </div>
      </section>

      {/* Browse By Category Section */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <SectionLabel label="Categories" className="mb-2" />
            <h2 className="font-fredoka text-2xl lg:text-3xl font-bold text-foreground">
              Browse By Category
            </h2>
          </div>
          <Button variant="default" asChild>
            <Link href="/products">View All Products</Link>
          </Button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {displayCategories.length > 0 ? (
              displayCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))
          ) : (
               <p className="text-gray-500 col-span-full">No categories found.</p>
          )}
        </div>
      </section>

      {/* Best Selling Products Section */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <SectionLabel label="This Month" className="mb-2" />
        <h2 className="font-fredoka text-2xl lg:text-3xl font-bold text-foreground mb-6">
          Best Selling Products
        </h2>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {bestSellingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Explore Our Products Section */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <SectionLabel label="Our Products" className="mb-2" />
        <h2 className="font-fredoka text-2xl lg:text-3xl font-bold text-foreground mb-6">
          Explore Our Products
        </h2>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
          {exploreProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="default" asChild>
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </section>

      {/* New Arrival / Promotional Banners Section */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <SectionLabel label="Featured" className="mb-2" />
        <h2 className="font-fredoka text-2xl lg:text-3xl font-bold text-foreground mb-6">
          New Arrival
        </h2>

        {/* Promo Banners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {promoBanners.map((banner) => (
            <Link
              key={banner.id}
              href={banner.href}
              className="relative aspect-[4/3] rounded-xl overflow-hidden group"
            >
              <Image
                src={banner.image}
                alt={banner.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-fredoka text-white text-lg font-semibold drop-shadow-md">
                  {banner.alt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Additional Promo Banners */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/promo/sale"
            className="relative aspect-[2/1] rounded-xl overflow-hidden group"
          >
            <Image
              src="https://images.unsplash.com/photo-1607083206325-caf1edba7a0f?w=600&h=300&fit=crop"
              alt="Extra 10% OFF with Lorem Card"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/80 to-orange-400/60 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="font-fredoka text-3xl font-bold mb-2">SALE</h3>
                <p className="font-noto text-sm mb-4">
                  EXTRA 10% OFF PAY WITH LOREM CARD
                </p>
                <span className="inline-block font-fredoka bg-green-500 text-white px-6 py-2 rounded-lg">
                  SHOP NOW
                </span>
              </div>
            </div>
          </Link>
          <Link
            href="/promo/accessories"
            className="relative aspect-[2/1] rounded-xl overflow-hidden group"
          >
            <Image
              src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=300&fit=crop"
              alt="Shoes, Bags & Accessories 50% Sales Zone"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/80 to-yellow-300/60 flex items-center justify-center">
              <div className="text-center text-white">
                <p className="font-noto text-sm mb-1">4 - 8 APR</p>
                <h3 className="font-fredoka text-2xl font-bold mb-1">
                  SHOES, BAGS &
                </h3>
                <h3 className="font-fredoka text-2xl font-bold mb-2">
                  ACCESSORIES
                </h3>
                <span className="inline-block font-fredoka bg-pink-500 text-white px-4 py-1 rounded-lg text-sm">
                  50% SALES ZONE
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
