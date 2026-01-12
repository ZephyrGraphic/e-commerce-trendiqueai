import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Simple query to test connection
    const userCount = await prisma.user.count();
    
    // Check if we can seed admin
    const admin = await prisma.user.findUnique({
      where: { email: "admin@trendique.com" }
    });

    return NextResponse.json({ 
      status: "ok", 
      message: "Connected to database via Prisma",
      userCount,
      adminExists: !!admin
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { error: "Failed to connect to database", details: String(error) },
      { status: 500 }
    );
  }
}
