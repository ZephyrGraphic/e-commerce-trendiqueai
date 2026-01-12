"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { VoucherType } from "@prisma/client";

export async function getVouchers() {
  try {
    const vouchers = await prisma.voucher.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: vouchers };
  } catch (error) {
    console.error("Error fetching vouchers:", error);
    return { success: false, error: "Failed to fetch vouchers" };
  }
}

export async function createVoucher(data: { 
  code: string; 
  discount: number; 
  type: VoucherType; 
  minPurchase?: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}) {
  try {
    const voucher = await prisma.voucher.create({
      data: {
        ...data,
        minPurchase: data.minPurchase || 0,
      },
    });

    revalidatePath("/admin/vouchers");
    revalidatePath("/cart"); 
    revalidatePath("/checkout");
    return { success: true, data: voucher };
  } catch (error) {
    console.error("Error creating voucher:", error);
    return { success: false, error: "Failed to create voucher" };
  }
}

export async function deleteVoucher(id: string) {
  try {
    await prisma.voucher.delete({
      where: { id },
    });

    revalidatePath("/admin/vouchers");
    return { success: true };
  } catch (error) {
    console.error("Error deleting voucher:", error);
    return { success: false, error: "Failed to delete voucher" };
  }
}

export async function updateVoucherStatus(id: string, isActive: boolean) {
  try {
    const voucher = await prisma.voucher.update({
        where: { id },
        data: { isActive }
    });
    revalidatePath("/admin/vouchers");
    return { success: true, data: voucher };
  } catch (error) {
      console.error("Error updating voucher:", error);
      return { success: false, error: "Failed to update voucher" };
  }
}
