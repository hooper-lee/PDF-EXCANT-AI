import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db/prisma-client';
import type { PrismaClientLike } from '@/lib/repositories/shared';

const DEFAULT_LLM_CONFIG_KEY = 'default';

function getClient(db?: PrismaClientLike) {
  return db ?? prisma;
}

export async function findDefaultLlmConfig(db?: PrismaClientLike) {
  return getClient(db).llmConfig.findUnique({
    where: { key: DEFAULT_LLM_CONFIG_KEY },
  });
}

export async function upsertDefaultLlmConfig(
  input: {
    provider: string;
    model: string;
    apiKey?: string | null;
    baseUrl?: string | null;
    isEnabled: boolean;
  },
  db?: PrismaClientLike
) {
  const data: Prisma.LlmConfigUncheckedCreateInput = {
    key: DEFAULT_LLM_CONFIG_KEY,
    provider: input.provider,
    model: input.model,
    apiKey: input.apiKey ?? null,
    baseUrl: input.baseUrl ?? null,
    isEnabled: input.isEnabled,
  };

  return getClient(db).llmConfig.upsert({
    where: { key: DEFAULT_LLM_CONFIG_KEY },
    create: data,
    update: data,
  });
}
