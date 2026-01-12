/**
 * Admin Seed Script
 * 
 * Creates admin user directly in database with proper password hashing.
 * 
 * Usage:
 *   npx tsx prisma/seed-admin.ts
 */

import { PrismaClient } from "@prisma/client"
import { scryptSync, randomBytes } from "crypto"

const prisma = new PrismaClient()

// Better Auth uses this format for scrypt hashing
function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex")
  const hash = scryptSync(password, salt, 64).toString("hex")
  return `${salt}:${hash}`
}

async function main() {
  const email = "admin@trendique.com"
  const password = "Admin123!"
  const name = "Trendique Admin"

  console.log("🔄 Starting admin user seeding...")

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    console.log("⚠️  Admin user already exists, deleting old records...")
    
    // Delete related records
    await prisma.account.deleteMany({ where: { userId: existingUser.id } })
    await prisma.session.deleteMany({ where: { userId: existingUser.id } })
    await prisma.cartItem.deleteMany({ where: { userId: existingUser.id } })
    await prisma.wishlistItem.deleteMany({ where: { userId: existingUser.id } })
    await prisma.notification.deleteMany({ where: { userId: existingUser.id } })
    await prisma.user.delete({ where: { id: existingUser.id } })
    
    console.log("✅ Old admin user deleted")
  }

  // Create user with ADMIN role using raw SQL (to bypass Prisma client enum issues)
  const userId = `admin_${randomBytes(8).toString("hex")}`
  
  await prisma.$executeRaw`
    INSERT INTO "User" (id, name, email, role, "emailVerified", image, "createdAt", "updatedAt", "onboardingCompleted")
    VALUES (
      ${userId},
      ${name},
      ${email},
      'ADMIN',
      true,
      'https://avatar.vercel.sh/admin',
      NOW(),
      NOW(),
      true
    )
  `
  
  console.log("✅ Admin user created with ID:", userId)

  // Create credential account with hashed password
  const hashedPassword = hashPassword(password)
  const accountId = `acc_${randomBytes(8).toString("hex")}`
  
  await prisma.$executeRaw`
    INSERT INTO "Account" (id, "userId", "accountId", "providerId", password, "createdAt", "updatedAt")
    VALUES (
      ${accountId},
      ${userId},
      ${userId},
      'credential',
      ${hashedPassword},
      NOW(),
      NOW()
    )
  `
  
  console.log("✅ Credential account created with hashed password")

  console.log("\n" + "=".repeat(50))
  console.log("🎉 Admin user created successfully!")
  console.log("=".repeat(50))
  console.log("\n📧 Email: admin@trendique.com")
  console.log("🔐 Password: Admin123!")
  console.log("\n🔗 Login at: /admin/login")
  console.log("=".repeat(50) + "\n")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error("❌ Error:", e)
    await prisma.$disconnect()
    process.exit(1)
  })
