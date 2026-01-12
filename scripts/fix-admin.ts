import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const email = "admin@trendique.com"
  const password = "password123"
  const name = "Admin User"

  console.log("🛠️ Re-creating Admin Account...")

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
  console.log("🚀 Sending Sign Up Request to http://localhost:3000/api/auth/sign-up/email")
  try {
    // Note: In some Next.js dev environments, hitting localhost might be tricky if the port isn't exactly 3000
    // or if there are network constraints. 
    const response = await fetch("http://localhost:3000/api/auth/sign-up/email", {
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
       throw new Error(`API failed with ${response.status}: ${responseText}`)
    }
  } catch (error) {
    console.error("❌ Failed to create user via API.")
    console.error("Make sure the dev server is running (npm run dev) on port 3000.")
    console.error(error)
    process.exit(1)
  }

  // 3. Promote to ADMIN
  try {
    // Wait a moment for DB propagation if needed (though usually instant with await fetch)
    await new Promise(r => setTimeout(r, 1000))

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
        console.log("✅ Account record verified. Login should work.")
    }

  } catch (error) {
    console.error("❌ Database operation failed:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
