
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Attempting to create user...");
    const user = await prisma.user.create({
      data: {
        id: "test-manual-id",
        name: "Manual Test",
        email: "manual_bool@test.com",
        emailVerified: true as any, // INTENTIONAL TYPE MISMATCH TEST
        image: "https://example.com/avatar.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        // omitting phone and onboardingCompleted to rely on defaults/nulls
      }
    });
    console.log("SUCCESS: User created:", user);
    
    // Clean up
    await prisma.user.delete({ where: { id: user.id } });
  } catch (e) {
    console.error("FAILURE: Creation Failed");
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
