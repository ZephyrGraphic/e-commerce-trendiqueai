"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  image: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
  category?: {
    id: string;
    name: string;
  };
};

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, data: products };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { success: false, error: "Failed to fetch products" };
  }
}

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!product) {
      return { success: false, error: "Product not found" };
    }

    return { success: true, data: product };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { success: false, error: "Failed to fetch product" };
  }
}

export async function createProduct(data: any) {
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        originalPrice: data.originalPrice,
        discount: data.discount || 0,
        image: data.image,
        stock: data.stock || 0,
        categoryId: data.categoryId,
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath("/");
    
    return { success: true, data: product };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, error: "Failed to create product" };
  }
}

export async function updateProduct(id: string, data: any) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price, // ensure number
        originalPrice: data.originalPrice,
        discount: data.discount,
        image: data.image,
        stock: data.stock,
        categoryId: data.categoryId,
      },
    });

    revalidatePath("/admin/products");
    revalidatePath(`/products/${id}`);
    revalidatePath("/");
    
    return { success: true, data: product };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: "Failed to update product" };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/admin/products");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: "Failed to delete product" };
  }
}

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    return { success: true, data: categories };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, error: "Failed to fetch categories" };
  }
}
