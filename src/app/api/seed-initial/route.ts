import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  categories,
  popularProducts,
  bestSellingProducts,
  exploreProducts,
  heroBanners,
  promoBanners,
} from "@/lib/mockData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  // Simple protection to prevent accidental public reset
  // In production, user should visit ?key=trendique_secret_seed
  if (key !== "trendique_secret_seed") {
      return NextResponse.json({ error: "Invalid seed key" }, { status: 403 });
  }

  try {
     console.log("🌱 Starting database seed via API...");

      // 1. Clear existing data (reverse order of dependencies)
      // Note: In production we might want to be careful, but for this "initial" seed intended for fresh Vercel deploys, it's okay.
      // Use transaction or sequential deletes
      await prisma.orderItem.deleteMany();
      await prisma.order.deleteMany();
      await prisma.cartItem.deleteMany();
      await prisma.wishlistItem.deleteMany();
      await prisma.notification.deleteMany();
      await prisma.address.deleteMany();
      await prisma.product.deleteMany();
      await prisma.category.deleteMany();
      await prisma.banner.deleteMany();

      // 2. Seed Categories
      console.log("📂 Seeding categories...");
      const createdCategories = await Promise.all(
        categories.map((cat) =>
          prisma.category.create({
            data: {
              name: cat.name,
              icon: cat.icon,
              slug: cat.href.split("/").pop() || cat.name.toLowerCase(),
            },
          })
        )
      );

      // Map category names to IDs
      const categoryMap = new Map(
        createdCategories.map((c) => [c.slug, c.id])
      );

      // Helper to determine category based on product name
      function getCategoryId(productName: string): string {
        const name = productName.toLowerCase();
        if (name.includes("blouse") || name.includes("shirt") || name.includes("hoodie") || name.includes("jacket")) {
          return categoryMap.get("pakaian") || createdCategories[0].id;
        }
        if (name.includes("cushion") || name.includes("blush") || name.includes("liptint")) {
          return categoryMap.get("makeup") || createdCategories[0].id;
        }
        if (name.includes("skintific") || name.includes("toner") || name.includes("energy")) {
          return categoryMap.get("skincare") || createdCategories[0].id;
        }
        if (name.includes("chitato") || name.includes("gummy") || name.includes("choco")) {
          return categoryMap.get("makanan") || createdCategories[0].id;
        }
        if (name.includes("fan") || name.includes("parfume")) {
          return categoryMap.get("elektronik") || createdCategories[0].id;
        }
        // Default to first category
        return createdCategories[0].id;
      }

      // Combine all products and remove duplicates by id
      const allProducts = [...popularProducts, ...bestSellingProducts, ...exploreProducts];
      const uniqueProducts = Array.from(
        new Map(allProducts.map((p) => [p.id, p])).values()
      );

      // 3. Seed Products
      console.log("📦 Seeding products...");
      await Promise.all(
        uniqueProducts.map((product) =>
          prisma.product.create({
            data: {
              name: product.name,
              description: `Premium quality ${product.name}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
              price: product.price,
              originalPrice: product.originalPrice,
              discount: product.discount,
              rating: product.rating,
              reviewCount: product.reviewCount,
              image: product.image,
              stock: Math.floor(Math.random() * 100) + 10,
              categoryId: getCategoryId(product.name),
            },
          })
        )
      );

      // 4. Seed Hero Banners
      console.log("🖼️ Seeding banners...");
      await Promise.all(
        heroBanners.map((banner) =>
          prisma.banner.create({
            data: {
              image: banner.image,
              alt: banner.alt,
              href: banner.href,
              type: "HERO",
            },
          })
        )
      );

       // 5. Seed Promo Banners
      await Promise.all(
        promoBanners.map((banner) =>
          prisma.banner.create({
            data: {
              image: banner.image,
              alt: banner.alt,
              href: banner.href,
              type: "PROMO",
            },
          })
        )
      );

      return NextResponse.json({
          success: true,
          message: "Database seeded successfully!",
          stats: {
              categories: createdCategories.length,
              products: uniqueProducts.length,
              banners: heroBanners.length + promoBanners.length
          }
      });

  } catch (error) {
      console.error("Seed API Error:", error);
      return NextResponse.json({ 
          success: false, 
          error: "Failed to seed database",
          details: String(error)
      }, { status: 500 });
  }
}
