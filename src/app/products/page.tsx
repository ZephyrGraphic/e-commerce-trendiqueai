import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionLabel } from "@/components/SectionLabel";
import { ProductCard } from "@/components/ProductCard";
import { getProducts, getCategories } from "@/app/actions/products";

interface ProductType {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  image: string;
  categoryId: string;
}

interface CategoryType {
  id: string;
  name: string;
  icon: string;
  slug: string;
}

export default async function ProductsPage() {
  const [productsRes, categoriesRes] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const products = (productsRes.success ? productsRes.data || [] : []) as ProductType[];
  const categories = (categoriesRes.success ? categoriesRes.data || [] : []) as CategoryType[];

  // Map to UI format
  const displayProducts = products.map((p: ProductType) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    originalPrice: p.originalPrice,
    discount: p.discount,
    rating: p.rating,
    reviewCount: p.reviewCount,
    image: p.image,
    isWishlisted: false,
  }));

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <SectionLabel label="Explore" className="mb-2" />
          <h1 className="font-fredoka text-3xl lg:text-4xl font-bold text-foreground">
            All Products
          </h1>
          <p className="text-muted-foreground font-noto mt-2">
            Temukan berbagai produk berkualitas dengan harga terbaik
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          <Link
            href="/products"
            className="shrink-0 px-4 py-2 bg-primary text-white rounded-full font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            Semua
          </Link>
          {categories.map((cat: CategoryType) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="shrink-0 px-4 py-2 bg-gray-100 text-foreground rounded-full font-medium text-sm hover:bg-gray-200 transition-colors"
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
        </div>

        {/* Products Grid */}
        {displayProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg mb-4">
              Belum ada produk tersedia.
            </p>
            <p className="text-sm text-muted-foreground">
              Tambahkan produk melalui Admin Panel.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Show product count */}
        <div className="mt-8 text-center text-muted-foreground font-noto">
          Menampilkan {displayProducts.length} produk
        </div>
      </main>

      <Footer />
    </div>
  );
}
