import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const email = "admin@trendique.com"
  const password = "password123"
  const name = "Admin User"

  console.log("🛠️ Re-creating Admin Account (IPv4)...")

  // 1. Delete existing user to start fresh
  try {
     const existingUser = await prisma.user.findUnique({ where: { email } })
     if (existingUser) {
         console.log("🗑️ Deleting existing incomplete user...")
         await prisma.user.delete({ where: { email } })
     }
  } catch(e) {
      console.error("Warning during delete:", e)
  }

  // 2. Try to create user via API
  console.log("🚀 Sending Sign Up Request to http://127.0.0.1:3000/api/auth/sign-up/email")
  try {
    const response = await fetch("http://127.0.0.1:3000/api/auth/sign-up/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })

    const responseText = await response.text()
    console.log(`📡 API Status: ${response.status}`)
    console.log(`📦 API Response: ${responseText}`)

    if (!response.ok) {
        // If 422/400, user might exist (race condition?), but we deleted it.
        // If 404, the server is not running or path is wrong.
       throw new Error(`API failed with ${response.status}`)
    }
  } catch (error) {
    console.error("❌ Failed to create user via API.")
    console.error(error)
    // process.exit(1) // Don't exit, try to check DB anyway just in case
  }

  // 3. Promote to ADMIN
  try {
    // Wait a moment for DB propagation
    await new Promise(r => setTimeout(r, 2000))

    const user = await prisma.user.findUnique({ where: { email } })
    if (user) {
        const updatedUser = await prisma.user.update({
        where: { email },
        data: {
            role: "ADMIN",
            emailVerified: true
        },
        })
        console.log("✅ User promoted to ADMIN.")
        
        // 4. Verify Account existence
        const userWithAccount = await prisma.user.findUnique({
            where: { email },
            include: { accounts: true }
        })
        
        if (userWithAccount?.accounts.length === 0) {
            console.error("❌ CRITICAL: User created but NO Account record found. Auth will fail.")
        } else {
            console.log("✅ Account record verified. Login SHOULD work now.")
        }
    } else {
        console.error("❌ User not found in DB after API call. Creation failed completely.")
    }

  } catch (error) {
    console.error("❌ Database operation failed:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
