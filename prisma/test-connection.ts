import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testConnection() {
  console.log("Testing database connection...");
  
  try {
    // Try to create a single category
    const category = await prisma.category.create({
      data: {
        name: "Test Category",
        icon: "🧪",
        slug: "test-category",
      },
    });
    
    console.log("✅ Category created:", category);
    
    // Delete it
    await prisma.category.delete({
      where: { id: category.id },
    });
    
    console.log("✅ Category deleted");
    console.log("✅ Database connection works!");
    
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
