import { prisma } from '@/lib/db/prisma-client';
import type { PrismaClientLike } from '@/lib/repositories/shared';

export async function findUserById(userId: string, db: PrismaClientLike = prisma) {
  return db.user.findUnique({
    where: { id: userId },
  });
}

export async function findUserByEmail(email: string, db: PrismaClientLike = prisma) {
  return db.user.findUnique({
    where: { email },
  });
}

export async function findUserByInviteCode(inviteCode: string, db: PrismaClientLike = prisma) {
  return db.user.findUnique({
    where: { inviteCode },
  });
}

export async function updateUserPlanAndQuota(
  userId: string,
  data: { plan: string; pagesLimit: number },
  db: PrismaClientLike = prisma
) {
  return db.user.update({
    where: { id: userId },
    data,
  });
}

export async function incrementUserPagesUsed(
  userId: string,
  pages: number,
  db: PrismaClientLike = prisma
) {
  return db.user.update({
    where: { id: userId },
    data: {
      pagesUsed: { increment: pages },
    },
  });
}

export async function updateUserById(
  userId: string,
  data: Record<string, unknown>,
  db: PrismaClientLike = prisma
) {
  return db.user.update({
    where: { id: userId },
    data,
  });
}
