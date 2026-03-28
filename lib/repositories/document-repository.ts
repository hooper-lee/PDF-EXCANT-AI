import { prisma } from '@/lib/db/prisma-client';
import { DOCUMENT_STATUS } from '@/lib/domain';
import type { PrismaClientLike } from '@/lib/repositories/shared';

interface CreateDocumentInput {
  userId: string;
  originalName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  pageCount: number;
}

export async function createPendingDocument(
  input: CreateDocumentInput,
  db: PrismaClientLike = prisma
) {
  return db.document.create({
    data: {
      ...input,
      status: DOCUMENT_STATUS.PENDING,
    },
  });
}

export async function markDocumentCompleted(
  documentId: string,
  extractedData: string,
  db: PrismaClientLike = prisma
) {
  return db.document.update({
    where: { id: documentId },
    data: {
      status: DOCUMENT_STATUS.COMPLETED,
      extractedData,
    },
  });
}

export async function markDocumentFailed(documentId: string, db: PrismaClientLike = prisma) {
  return db.document.update({
    where: { id: documentId },
    data: {
      status: DOCUMENT_STATUS.FAILED,
    },
  });
}

export async function updateDocumentSnapshot(
  documentId: string,
  data: {
    pageCount?: number;
    extractedData?: string | null;
    outputUrl?: string | null;
  },
  db: PrismaClientLike = prisma
) {
  return db.document.update({
    where: { id: documentId },
    data,
  });
}

export async function findDocumentsByUserId(userId: string, db: PrismaClientLike = prisma) {
  return db.document.findMany({
    where: { userId },
    include: {
      extractionJobs: {
        orderBy: { createdAt: 'desc' },
        take: 1,
        select: {
          id: true,
          status: true,
          errorMessage: true,
          createdAt: true,
          finishedAt: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function findDocumentByIdForUser(
  documentId: string,
  userId: string,
  db: PrismaClientLike = prisma
) {
  return db.document.findFirst({
    where: {
      id: documentId,
      userId,
    },
    include: {
      extractionJobs: {
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
    },
  });
}

export async function deleteDocumentById(documentId: string, db: PrismaClientLike = prisma) {
  return db.document.delete({
    where: { id: documentId },
  });
}
