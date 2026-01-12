import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import { formatPrice } from "@/lib/mockData";
import { ProductCard } from "@/components/ProductCard";
import { getProductById, getProducts } from "@/app/actions/products";
import { ProductActions } from "./ProductActions";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  // Fetch product from database
  const productRes = await getProductById(id);
  
  if (!productRes.success || !productRes.data) {
    notFound();
  }

  const product = productRes.data;

  // Fetch related products (same category or random)
  const allProductsRes = await getProducts();
  const relatedProducts = (allProductsRes.data || [])
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 4)
    .map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      originalPrice: p.originalPrice,
      discount: p.discount ?? 0,
      rating: p.rating ?? 0,
      reviewCount: p.reviewCount ?? 0,
      image: p.image,
      isWishlisted: false,
    }));

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 font-noto">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary">Products</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-border">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="font-fredoka text-3xl md:text-4xl font-bold text-foreground mb-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-bold text-foreground">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">|</span>
              <span className="text-muted-foreground font-noto">
                {product.reviewCount} Reviews
              </span>
              <span className="text-muted-foreground">|</span>
              <span className={`font-medium font-noto ${(product.stock ?? 0) > 0 ? "text-green-600" : "text-red-600"}`}>
                {(product.stock ?? 0) > 0 ? `In Stock (${product.stock ?? 0})` : "Out of Stock"}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <span className="font-fredoka text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="font-noto text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-bold font-fredoka">
                    -{product.discount}%
                  </span>
                </>
              )}
            </div>

            <p className="text-muted-foreground font-noto leading-relaxed mb-8">
              {product.description || "Produk berkualitas tinggi dengan bahan premium. Cocok untuk penggunaan sehari-hari dan memberikan kenyamanan maksimal."}
            </p>

            <Separator className="mb-8" />

            {/* Client Component for Actions */}
            <ProductActions productId={product.id} stock={product.stock ?? 0} />

            {/* Additional Info */}
            <div className="space-y-4 mt-8">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold font-fredoka">Free Shipping</h4>
                  <p className="text-sm text-muted-foreground font-noto">On orders over Rp 200.000</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="mb-16">
          <h3 className="font-fredoka text-2xl font-bold mb-6">Product Description</h3>
          <div className="prose max-w-none text-muted-foreground font-noto">
             <p>{product.description || "Produk berkualitas tinggi dengan bahan premium. Dibuat dengan standar kualitas terbaik untuk memberikan kepuasan maksimal kepada pelanggan. Cocok untuk berbagai keperluan dan dapat digunakan dalam jangka waktu yang lama."}</p>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-8">
            <h3 className="font-fredoka text-2xl font-bold mb-6">You Might Also Like</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
