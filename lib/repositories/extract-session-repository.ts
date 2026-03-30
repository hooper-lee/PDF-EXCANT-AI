import { prisma } from '@/lib/db/prisma-client';
import type { PrismaClientLike } from '@/lib/repositories/shared';

interface CreateExtractSessionInput {
  userId: string;
  name: string;
  selectedTemplateId?: string | null;
  prompt?: string | null;
  parseRule?: string | null;
  sheetsJson?: string | null;
  activeSheetId?: string | null;
}

interface UpdateExtractSessionInput {
  name?: string;
  selectedTemplateId?: string | null;
  prompt?: string | null;
  parseRule?: string | null;
  sheetsJson?: string | null;
  activeSheetId?: string | null;
}

export async function createExtractSession(
  input: CreateExtractSessionInput,
  db: PrismaClientLike = prisma
) {
  return db.extractSession.create({
    data: input,
  });
}

export async function findExtractSessionsByUserId(
  userId: string,
  db: PrismaClientLike = prisma
) {
  return db.extractSession.findMany({
    where: { userId },
    orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
  });
}

export async function findExtractSessionByIdForUser(
  sessionId: string,
  userId: string,
  db: PrismaClientLike = prisma
) {
  return db.extractSession.findFirst({
    where: {
      id: sessionId,
      userId,
    },
  });
}

export async function updateExtractSessionById(
  sessionId: string,
  data: UpdateExtractSessionInput,
  db: PrismaClientLike = prisma
) {
  return db.extractSession.update({
    where: { id: sessionId },
    data,
  });
}

export async function deleteExtractSessionById(
  sessionId: string,
  db: PrismaClientLike = prisma
) {
  return db.extractSession.delete({
    where: { id: sessionId },
  });
}
