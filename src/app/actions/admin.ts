"use server";

import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

export async function getAdminStats() {
  try {
    // 1. Total Revenue (sum of total from all non-cancelled orders)
    const revenueResult = await prisma.order.aggregate({
      _sum: {
        total: true,
      },
      where: {
        status: {
          not: OrderStatus.CANCELLED,
        },
      },
    });
    
    // 2. Total Sales (count of non-cancelled orders)
    const salesCount = await prisma.order.count({
      where: {
        status: {
          not: OrderStatus.CANCELLED,
        },
      },
    });
    
    // 3. Products in Stock (sum of stock)
    const stockResult = await prisma.product.aggregate({
      _sum: {
        stock: true, 
      },
    });

    return {
      success: true,
      data: {
        totalRevenue: revenueResult._sum.total || 0,
        totalSales: salesCount,
        productsInStock: stockResult._sum.stock || 0,
        revenueChange: 0,
        salesChange: 0,
        stockChange: 0,
      }
    };
  } catch (error) {
    console.error("Failed to fetch admin stats:", error);
    return { success: false, error: "Failed to fetch stats" };
  }
}

export async function getRecentOrders() {
  try {
    const orders = await prisma.order.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    const formattedOrders = orders.map(order => ({
      id: order.id,
      orderNumber: order.orderNumber,
      customerName: order.user.name || "Unknown",
      customerEmail: order.user.email,
      date: order.createdAt.toISOString().split('T')[0], // YYYY-MM-DD
      total: order.total,
      status: order.status,
    }));

    return { success: true, data: formattedOrders };
  } catch (error) {
    console.error("Failed to fetch recent orders:", error);
    return { success: false, error: "Failed to fetch recent orders" };
  }
}
