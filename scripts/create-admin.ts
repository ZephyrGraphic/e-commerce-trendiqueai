import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const email = "admin@trendique.com"
  const password = "password123"
  const name = "Admin User"

  console.log("🚀 Creating Admin Account...")
  console.log(`Email: ${email}`)

  // 1. Try to create user via API (to handle password hashing correctly)
  try {
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

    if (response.ok) {
      console.log("✅ User created via Auth API.")
    } else {
      const errorText = await response.text()
      if (errorText.includes("User already exists") || response.status === 400 || response.status === 422) {
         console.log("ℹ️ User likely already exists (API returned error). Proceeding to update role.")
      } else {
         console.warn("⚠️ Warning: Failed to create user via API:", response.status, errorText)
      }
    }
  } catch (error) {
    console.error("❌ Failed to contact Auth API. Is the server running on localhost:3000?", error)
    process.exit(1)
  }

  // 2. Update Role to ADMIN directly in DB
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      console.error("❌ User not found in database. Creation failed.")
      process.exit(1)
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        role: "ADMIN",
        emailVerified: true // Auto-verify admin
      },
    })
    
    console.log("✅ User promoted to ADMIN.")
    console.log("-----------------------------------------")
    console.log("🎉 Admin Account Ready!")
    console.log("-----------------------------------------")
    console.log(`Email:    ${email}`)
    console.log(`Password: ${password}`)
    console.log("-----------------------------------------")

  } catch (error) {
    console.error("❌ Database operation failed:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
