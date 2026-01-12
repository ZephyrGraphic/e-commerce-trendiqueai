
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.user.findMany({
      include: { accounts: true }
    });
    console.log('--- USERS ---');
    console.log(JSON.stringify(users, null, 2));

    const accounts = await prisma.account.findMany();
    console.log('--- ACCOUNTS ---');
    console.log(JSON.stringify(accounts, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
