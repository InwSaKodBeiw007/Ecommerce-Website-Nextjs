"use server";

import { CanbeUse_Prisma } from "@/lib/prisma";

interface CartItem {
  productId: number;
  quantity: number;
}

interface OrderData {
  customerName: string;
  email: string;
  phone: string;
  address: string;
}

export async function createOrderTransaction(orderData: OrderData, cart: CartItem[]) {
  try {
    // We use a transaction to ensure both the Order and OrderItems are created successfully
    const result = await CanbeUse_Prisma.$transaction(async (tx) => {
      // 1. Calculate total price and verify products exist
      let totalPrice = 0;
      const itemsWithPrice = [];

      for (const item of cart) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found.`);
        }

        const subtotal = product.price * item.quantity;
        totalPrice += subtotal;
        itemsWithPrice.push({
          productId: item.productId,
          quantity: item.quantity,
          priceAtPurchase: product.price,
        });
      }

      // 2. Create the Order
      const order = await tx.order.create({
        data: {
          customerName: orderData.customerName,
          email: orderData.email,
          phone: orderData.phone,
          address: orderData.address,
          totalPrice: totalPrice,
          items: {
            create: itemsWithPrice,
          },
        },
        include: {
          items: true,
        },
      });

      return order;
    });

    return { success: true, orderId: result.id, createdAt: result.createdAt };
  } catch (error: any) {
    console.error("Transaction failed:", error);
    return { success: false, error: error.message };
  }
}

export async function getOrderById(id: number) {
  return await CanbeUse_Prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}
