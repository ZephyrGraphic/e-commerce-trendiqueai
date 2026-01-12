"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { OrderStatus } from "@prisma/client";

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
            select: { name: true, image: true, phone: true }
        },
        address: true,
      }
    });
    return { success: true, data: orders };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { success: false, error: "Failed to fetch orders" };
  }
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  try {
    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/admin/orders");
    return { success: true, data: order };
  } catch (error) {
    console.error("Error updating order status:", error);
    return { success: false, error: "Failed to update order status" };
  }
}
