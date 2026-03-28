import { prisma } from '@/lib/db/prisma-client';
import { JOB_STATUS } from '@/lib/domain';
import type { PrismaClientLike } from '@/lib/repositories/shared';

interface CreateExtractionJobInput {
  userId: string;
  documentId: string;
  inputPrompt?: string | null;
  templateId?: string | null;
  rawText?: string | null;
  ocrText?: string | null;
}

export async function createPendingExtractionJob(
  input: CreateExtractionJobInput,
  db: PrismaClientLike = prisma
) {
  return db.extractionJob.create({
    data: {
      ...input,
      status: JOB_STATUS.PENDING,
    },
  });
}

export async function markExtractionJobProcessing(jobId: string, db: PrismaClientLike = prisma) {
  return db.extractionJob.update({
    where: { id: jobId },
    data: {
      status: JOB_STATUS.PROCESSING,
      lastStep: 'workflow-start',
      startedAt: new Date(),
      finishedAt: null,
      errorMessage: null,
    },
  });
}

export async function updateExtractionJobStep(
  jobId: string,
  step: string,
  db: PrismaClientLike = prisma
) {
  return db.extractionJob.update({
    where: { id: jobId },
    data: {
      lastStep: step,
    },
  });
}

export async function updateExtractionJobParsedContent(
  jobId: string,
  data: {
    rawText?: string | null;
    ocrText?: string | null;
  },
  db: PrismaClientLike = prisma
) {
  return db.extractionJob.update({
    where: { id: jobId },
    data,
  });
}

export async function markExtractionJobCompleted(
  jobId: string,
  resultJson: string,
  db: PrismaClientLike = prisma
) {
  return db.extractionJob.update({
    where: { id: jobId },
    data: {
      status: JOB_STATUS.COMPLETED,
      resultJson,
      lastStep: 'persist-result',
      finishedAt: new Date(),
      errorMessage: null,
    },
  });
}

export async function markExtractionJobFailed(
  jobId: string,
  errorMessage: string,
  db: PrismaClientLike = prisma
) {
  return db.extractionJob.update({
    where: { id: jobId },
    data: {
      status: JOB_STATUS.FAILED,
      errorMessage,
      finishedAt: new Date(),
    },
  });
}

export async function findExtractionJobsByUserId(
  userId: string,
  db: PrismaClientLike = prisma
) {
  return db.extractionJob.findMany({
    where: { userId },
    include: {
      document: {
        select: {
          id: true,
          originalName: true,
          fileType: true,
          pageCount: true,
          status: true,
        },
      },
      template: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function findExtractionJobByIdForUser(
  jobId: string,
  userId: string,
  db: PrismaClientLike = prisma
) {
  return db.extractionJob.findFirst({
    where: {
      id: jobId,
      userId,
    },
    include: {
      document: true,
      template: true,
    },
  });
}
