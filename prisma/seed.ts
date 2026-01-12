import "dotenv/config";
// process.env.DATABASE_URL = ...; // Credentials removed for security
// process.env.DIRECT_URL = ...;
import { PrismaClient } from "@prisma/client";
import {
  categories,
  popularProducts,
  bestSellingProducts,
  exploreProducts,
  heroBanners,
  promoBanners,
} from "../src/lib/mockData";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data
  console.log("🗑️ Clearing existing data...");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.address.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.banner.deleteMany();

  // Seed Categories
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
  console.log(`  ✓ Created ${createdCategories.length} categories`);

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

  // Seed Products
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
  console.log(`  ✓ Created ${uniqueProducts.length} products`);

  // Seed Hero Banners
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

  // Seed Promo Banners
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
  console.log(`  ✓ Created ${heroBanners.length + promoBanners.length} banners`);

  console.log("");
  console.log("✅ Database seeded successfully!");
  console.log("");
  console.log("Summary:");
  console.log(`  - ${createdCategories.length} categories`);
  console.log(`  - ${uniqueProducts.length} products`);
  console.log(`  - ${heroBanners.length + promoBanners.length} banners`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
