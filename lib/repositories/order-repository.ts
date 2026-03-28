import { prisma } from '@/lib/db/prisma-client';
import type { PrismaClientLike } from '@/lib/repositories/shared';

export async function createOrder(
  data: {
    userId: string;
    planId: string;
    planName: string;
    amount: number;
    currency: string;
    status: string;
    paymentMethod: string;
    cardLast4: string;
    cardBrand: string;
    billingEmail: string;
    billingName: string;
    billingCountry?: string;
    completedAt: Date;
  },
  db: PrismaClientLike = prisma
) {
  return db.order.create({ data });
}

export async function findOrdersByUserId(userId: string, db: PrismaClientLike = prisma) {
  return db.order.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function findOrderByIdForUser(
  orderId: string,
  userId: string,
  db: PrismaClientLike = prisma
) {
  return db.order.findFirst({
    where: {
      id: orderId,
      userId,
    },
    include: {
      user: {
        select: {
          plan: true,
          pagesLimit: true,
          pagesUsed: true,
        },
      },
    },
  });
}
