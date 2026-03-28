import { prisma } from '@/lib/db/prisma-client';
import type { PrismaClientLike } from '@/lib/repositories/shared';

export async function findFirstSubscriptionByUserId(
  userId: string,
  db: PrismaClientLike = prisma
) {
  return db.subscription.findFirst({
    where: { userId },
  });
}

export async function createSubscription(
  data: {
    userId: string;
    stripeSubscriptionId?: string | null;
    stripePriceId?: string | null;
    status: string;
    currentPeriodEnd: Date;
  },
  db: PrismaClientLike = prisma
) {
  return db.subscription.create({ data });
}

export async function updateSubscription(
  id: string,
  data: {
    stripeSubscriptionId?: string | null;
    stripePriceId?: string | null;
    status: string;
    currentPeriodEnd: Date;
  },
  db: PrismaClientLike = prisma
) {
  return db.subscription.update({
    where: { id },
    data,
  });
}

export async function findSubscriptionsByUserId(
  userId: string,
  db: PrismaClientLike = prisma
) {
  return db.subscription.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}
