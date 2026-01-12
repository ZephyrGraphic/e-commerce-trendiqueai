import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: "admin@trendique.com" },
    select: { email: true, role: true }
  })
  console.log("User found:", user)
}

main().finally(() => prisma.$disconnect())
