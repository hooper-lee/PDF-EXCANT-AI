import type { UsageDirection, UsageSource } from '@/lib/domain';
import type { PrismaClientLike } from '@/lib/repositories/shared';
import { createUsageRecordEntry } from '@/lib/repositories/usage-record-repository';

interface CreateUsageRecordInput {
  userId: string;
  source: UsageSource;
  direction: UsageDirection;
  pages: number;
  documentId?: string | null;
  note?: string | null;
}

export async function createUsageRecord(
  input: CreateUsageRecordInput,
  db?: PrismaClientLike
) {
  return createUsageRecordEntry(input, db);
}
