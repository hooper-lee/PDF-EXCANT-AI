import { prisma } from '@/lib/db/prisma-client';
import type { PrismaClientLike } from '@/lib/repositories/shared';

interface UpsertExtractionTemplateInput {
  name: string;
  description: string;
  promptText: string;
  schemaJson: string;
  isPublic: boolean;
}

export async function upsertExtractionTemplateByName(
  input: UpsertExtractionTemplateInput,
  db: PrismaClientLike = prisma
) {
  return db.extractionTemplate.upsert({
    where: { name: input.name },
    update: {
      description: input.description,
      promptText: input.promptText,
      schemaJson: input.schemaJson,
      isPublic: input.isPublic,
    },
    create: input,
  });
}

export async function listPublicExtractionTemplates(db: PrismaClientLike = prisma) {
  return db.extractionTemplate.findMany({
    where: { isPublic: true },
    orderBy: [{ createdAt: 'asc' }, { name: 'asc' }],
  });
}

export async function findExtractionTemplateById(templateId: string, db: PrismaClientLike = prisma) {
  return db.extractionTemplate.findUnique({
    where: { id: templateId },
  });
}

export async function findPublicExtractionTemplateById(
  templateId: string,
  db: PrismaClientLike = prisma
) {
  return db.extractionTemplate.findFirst({
    where: {
      id: templateId,
      isPublic: true,
    },
  });
}
