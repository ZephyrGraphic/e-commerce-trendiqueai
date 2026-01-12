import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// This endpoint creates admin by calling Better Auth signup API
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not allowed in production" }, { status: 403 });
  }

  const email = "admin@trendique.com";
  const password = "Admin123!";
  const name = "Trendique Admin";

  try {
    if (action === "delete") {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        // Delete related records and user
        await prisma.user.delete({
          where: { id: existingUser.id },
        });

        return NextResponse.json({
          success: true,
          message: "Admin user deleted. Now call ?action=create",
        });
      }

      return NextResponse.json({
        success: true,
        message: "No admin user found.",
      });
    }

    if (action === "create") {
      // Check if already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        // Just promote to admin
        await prisma.user.update({
          where: { email },
          data: { 
            role: "ADMIN",
            emailVerified: true,
            onboardingCompleted: true
          },
        });
        
        return NextResponse.json({
          success: true,
          message: "User already exists - promoted to ADMIN",
          user: { id: existingUser.id, email: existingUser.email },
        });
      }

      // Call Better Auth signup endpoint directly via HTTP
      const baseUrl = process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      
      const signupResponse = await fetch(`${baseUrl}/api/auth/sign-up/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });

      const signupResult = await signupResponse.json();

      if (!signupResponse.ok) {
        return NextResponse.json({
          error: "Failed to create user via Better Auth",
          status: signupResponse.status,
          details: signupResult,
        }, { status: 500 });
      }

      // Promote to ADMIN using Prisma
      await prisma.user.update({
        where: { email },
        data: { 
          role: "ADMIN", 
          emailVerified: true, 
          onboardingCompleted: true 
        },
      });

      return NextResponse.json({
        success: true,
        message: "Admin created successfully!",
        credentials: {
          email: "admin@trendique.com",
          password: "Admin123!",
        },
        authResult: signupResult,
      });
    }

    // Default: show status
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    return NextResponse.json({
      message: "Admin management API",
      currentAdmin: existingUser ? {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
      } : null,
      actions: {
        delete: "?action=delete",
        create: "?action=create",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Operation failed", details: String(error) },
      { status: 500 }
    );
  }
}
