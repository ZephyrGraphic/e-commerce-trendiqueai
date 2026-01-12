import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const email = "admin@trendique.com"
  console.log(`🛠️ Promoting ${email} to ADMIN...`)

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    
    if (!user) {
        console.error("❌ User not found. Please make sure you visited the seed URL first!")
        process.exit(1)
    }

    await prisma.user.update({
      where: { email },
      data: {
        role: "ADMIN",
        emailVerified: true
      },
    })
    
    console.log("✅ User promoted to ADMIN successfully.")
    
    // Validating Account
    const userWithAccount = await prisma.user.findUnique({
        where: { email },
        include: { accounts: true }
    })
    
    if (userWithAccount?.accounts.length === 0) {
        console.warn("⚠️ Warning: User exists but has no Account linked (no password?). Login might still fail if not created via Auth Client.")
    } else {
        console.log("✅ Account record found. Login should work.")
    }

  } catch (error) {
    console.error("❌ Database operation failed:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
