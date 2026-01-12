"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { products: true }
        }
      }
    });
    return { success: true, data: categories };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, error: "Failed to fetch categories" };
  }
}

export async function createCategory(data: { name: string; icon: string; slug: string }) {
  try {
    const category = await prisma.category.create({
      data: {
        name: data.name,
        icon: data.icon,
        slug: data.slug,
      },
    });

    revalidatePath("/admin/categories");
    revalidatePath("/products");
    revalidatePath("/");
    return { success: true, data: category };
  } catch (error) {
    console.error("Error creating category:", error);
    return { success: false, error: "Failed to create category" };
  }
}

export async function updateCategory(id: string, data: { name?: string; icon?: string; slug?: string }) {
  try {
    const category = await prisma.category.update({
      where: { id },
      data,
    });

    revalidatePath("/admin/categories");
    revalidatePath("/products");
    revalidatePath("/");
    return { success: true, data: category };
  } catch (error) {
    console.error("Error updating category:", error);
    return { success: false, error: "Failed to update category" };
  }
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({
      where: { id },
    });

    revalidatePath("/admin/categories");
    revalidatePath("/products");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, error: "Failed to delete category" };
  }
}
