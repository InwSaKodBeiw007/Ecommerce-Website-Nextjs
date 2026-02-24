"use server";

import { CanbeUse_Prisma } from "@/lib/prisma";

export async function getProducts() {
  return await CanbeUse_Prisma.product.findMany({
    include: {
      category: true,
    },
  });
}

export async function getCategories() {
  return await CanbeUse_Prisma.category.findMany();
}

export async function getProductById(id: number) {
  return await CanbeUse_Prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });
}
