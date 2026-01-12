import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

// GET /api/addresses - Get user's addresses
export async function GET() {
  try {
    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const addresses = await prisma.address.findMany({
      where: { userId: session.user.id },
      orderBy: [
        { isDefault: "desc" },
        { name: "asc" },
      ],
    });

    return NextResponse.json(addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return NextResponse.json(
      { error: "Failed to fetch addresses" },
      { status: 500 }
    );
  }
}

// POST /api/addresses - Create new address
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, street, details, phone, isDefault } = await request.json();

    // If setting as default, clear other defaults first
    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId: session.user.id },
        data: { isDefault: false },
      });
    }

    // Count existing addresses to set default if it's the first one
    const addressCount = await prisma.address.count({
      where: { userId: session.user.id },
    });

    const address = await prisma.address.create({
      data: {
        userId: session.user.id,
        name,
        street,
        details,
        phone,
        isDefault: isDefault || addressCount === 0,
      },
    });

    return NextResponse.json(address, { status: 201 });
  } catch (error) {
    console.error("Error creating address:", error);
    return NextResponse.json(
      { error: "Failed to create address" },
      { status: 500 }
    );
  }
}

// PUT /api/addresses - Update address
export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, name, street, details, phone, isDefault } = await request.json();

    // If setting as default, clear other defaults first
    if (isDefault) {
      await prisma.address.updateMany({
        where: { 
          userId: session.user.id,
          id: { not: id } 
        },
        data: { isDefault: false },
      });
    }

    const address = await prisma.address.update({
      where: { 
        id,
        userId: session.user.id 
      },
      data: {
        name,
        street, // Fixed: was missing in some versions
        details, // Fixed: was missing
        phone,
        isDefault,
      },
    });

    return NextResponse.json(address);
  } catch (error) {
    console.error("Error updating address:", error);
    return NextResponse.json(
      { error: "Failed to update address" },
      { status: 500 }
    );
  }
}

// DELETE /api/addresses - Delete address
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();

    await prisma.address.delete({
      where: { 
        id,
        userId: session.user.id 
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting address:", error);
    return NextResponse.json(
      { error: "Failed to delete address" },
      { status: 500 }
    );
  }
}
