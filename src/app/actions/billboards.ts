"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { BannerType } from "@prisma/client";

export async function getBillboards() {
  try {
    const billboards = await prisma.banner.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: billboards };
  } catch (error) {
    console.error("Error fetching billboards:", error);
    return { success: false, error: "Failed to fetch billboards" };
  }
}

export async function createBillboard(data: { image: string; alt: string; href: string; type: BannerType }) {
  try {
    const billboard = await prisma.banner.create({
      data,
    });

    revalidatePath("/admin/billboards");
    revalidatePath("/");
    return { success: true, data: billboard };
  } catch (error) {
    console.error("Error creating billboard:", error);
    return { success: false, error: "Failed to create billboard" };
  }
}

export async function updateBillboard(id: string, data: { image?: string; alt?: string; href?: string; type?: BannerType }) {
  try {
    const billboard = await prisma.banner.update({
      where: { id },
      data,
    });

    revalidatePath("/admin/billboards");
    revalidatePath("/");
    return { success: true, data: billboard };
  } catch (error) {
    console.error("Error updating billboard:", error);
    return { success: false, error: "Failed to update billboard" };
  }
}

export async function deleteBillboard(id: string) {
  try {
    await prisma.banner.delete({
      where: { id },
    });

    revalidatePath("/admin/billboards");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting billboard:", error);
    return { success: false, error: "Failed to delete billboard" };
  }
}
