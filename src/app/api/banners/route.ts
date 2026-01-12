import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { BannerType } from "@prisma/client";

// GET /api/banners - Get banners by type
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type"); // "HERO" or "PROMO"

    const where = type ? { type: type as BannerType } : {};

    const banners = await prisma.banner.findMany({
      where,
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(banners);
  } catch (error) {
    console.error("Error fetching banners:", error);
    return NextResponse.json(
      { error: "Failed to fetch banners" },
      { status: 500 }
    );
  }
}

// POST /api/banners - Create banner (admin only)
export async function POST(request: NextRequest) {
  try {
    const { image, alt, href, type = "HERO" } = await request.json();

    const banner = await prisma.banner.create({
      data: {
        image,
        alt,
        href,
        type: type as BannerType,
      },
    });

    return NextResponse.json(banner, { status: 201 });
  } catch (error) {
    console.error("Error creating banner:", error);
    return NextResponse.json(
      { error: "Failed to create banner" },
      { status: 500 }
    );
  }
}
