import { USAGE_DIRECTION, USAGE_SOURCE, type UsageSource, type UserPlan } from '@/lib/domain';
import { prisma } from '@/lib/db/prisma-client';
import type { PrismaClientLike } from '@/lib/repositories/shared';
import { createUsageRecordEntry, findUsageRecordsByUserId } from '@/lib/repositories/usage-record-repository';
import { findUserById, incrementUserPagesUsed, updateUserById } from '@/lib/repositories/user-repository';

interface RecordQuotaChangeInput {
  userId: string;
  source: 'EXTRACTION' | 'INVITE_REWARD' | 'SUBSCRIPTION_GRANT' | 'ADMIN_ADJUST';
  direction: 'IN' | 'OUT';
  pages: number;
  documentId?: string | null;
  note?: string | null;
}

export async function recordQuotaChange(
  input: RecordQuotaChangeInput,
  db?: PrismaClientLike
) {
  return createUsageRecordEntry(input, db);
}

async function withQuotaTransaction<T>(
  callback: (db: PrismaClientLike) => Promise<T>,
  db?: PrismaClientLike
) {
  if (db) {
    return callback(db);
  }

  return prisma.$transaction(async (tx) => callback(tx));
}

export function assertQuotaAvailable(input: {
  pagesUsed: number;
  pagesLimit: number;
  pagesRequired: number;
}) {
  if (input.pagesUsed + input.pagesRequired > input.pagesLimit) {
    throw new Error('页数配额不足，请升级套餐');
  }
}

export async function grantPagesToUser(
  input: {
    userId: string;
    pages: number;
    source?: UsageSource;
    note?: string | null;
    documentId?: string | null;
    plan?: UserPlan;
    setPagesLimitTo?: number;
    incrementInvitePagesBy?: number;
    incrementInviteCountBy?: number;
  },
  db?: PrismaClientLike
) {
  return withQuotaTransaction(async (tx) => {
    const user = await findUserById(input.userId, tx);
    if (!user) {
      throw new Error('用户不存在');
    }

    const nextPagesLimit = input.setPagesLimitTo ?? (user.pagesLimit + input.pages);

    const updatedUser = await updateUserById(
      input.userId,
      {
        ...(input.plan ? { plan: input.plan } : {}),
        pagesLimit: nextPagesLimit,
        ...(input.incrementInvitePagesBy
          ? { invitePages: { increment: input.incrementInvitePagesBy } }
          : {}),
        ...(input.incrementInviteCountBy
          ? { inviteCount: { increment: input.incrementInviteCountBy } }
          : {}),
      },
      tx
    );

    if (input.pages > 0) {
      await recordQuotaChange(
        {
          userId: input.userId,
          source: input.source ?? USAGE_SOURCE.SUBSCRIPTION_GRANT,
          direction: USAGE_DIRECTION.IN,
          pages: input.pages,
          documentId: input.documentId,
          note: input.note,
        },
        tx
      );
    }

    return updatedUser;
  }, db);
}

export async function consumePagesForExtraction(
  input: {
    userId: string;
    pages: number;
    documentId: string;
  },
  db?: PrismaClientLike
) {
  return withQuotaTransaction(async (tx) => {
    const updatedUser = await incrementUserPagesUsed(input.userId, input.pages, tx);

    await recordQuotaChange(
      {
        userId: input.userId,
        source: USAGE_SOURCE.EXTRACTION,
        direction: USAGE_DIRECTION.OUT,
        pages: input.pages,
        documentId: input.documentId,
        note: `AI extraction consumed ${input.pages} page(s)`,
      },
      tx
    );

    return updatedUser;
  }, db);
}

export async function applyInviteReward(
  input: {
    inviterUserId: string;
    invitedUserId: string;
    pages: number;
    inviteCode?: string | null;
    invitedUserEmail?: string | null;
  },
  db?: PrismaClientLike
) {
  return withQuotaTransaction(async (tx) => {
    const inviterUser = await grantPagesToUser(
      {
        userId: input.inviterUserId,
        pages: input.pages,
        source: USAGE_SOURCE.INVITE_REWARD,
        note: `Invite reward granted for inviting ${input.invitedUserEmail ?? input.invitedUserId}`,
        incrementInvitePagesBy: input.pages,
        incrementInviteCountBy: 1,
      },
      tx
    );

    const invitedUser = await grantPagesToUser(
      {
        userId: input.invitedUserId,
        pages: input.pages,
        source: USAGE_SOURCE.INVITE_REWARD,
        note: `Invite signup bonus from code ${input.inviteCode?.toUpperCase() ?? ''}`,
      },
      tx
    );

    return { inviterUser, invitedUser };
  }, db);
}

export async function adjustPagesByAdmin(
  input: {
    userId: string;
    nextPagesLimit?: number;
    nextPagesUsed?: number;
    plan?: UserPlan;
    name?: string | null;
  },
  db?: PrismaClientLike
) {
  return withQuotaTransaction(async (tx) => {
    const existingUser = await findUserById(input.userId, tx);
    if (!existingUser) {
      throw new Error('用户不存在');
    }

    const updatedUser = await updateUserById(
      input.userId,
      {
        ...(input.plan ? { plan: input.plan } : {}),
        ...(input.name !== undefined ? { name: input.name } : {}),
        ...(input.nextPagesLimit !== undefined ? { pagesLimit: input.nextPagesLimit } : {}),
        ...(input.nextPagesUsed !== undefined ? { pagesUsed: input.nextPagesUsed } : {}),
      },
      tx
    );

    if (input.nextPagesLimit !== undefined && input.nextPagesLimit !== existingUser.pagesLimit) {
      const delta = input.nextPagesLimit - existingUser.pagesLimit;
      await recordQuotaChange(
        {
          userId: input.userId,
          source: USAGE_SOURCE.ADMIN_ADJUST,
          direction: delta > 0 ? USAGE_DIRECTION.IN : USAGE_DIRECTION.OUT,
          pages: Math.abs(delta),
          note: `Admin adjusted pagesLimit from ${existingUser.pagesLimit} to ${input.nextPagesLimit}`,
        },
        tx
      );
    }

    if (input.nextPagesUsed !== undefined && input.nextPagesUsed !== existingUser.pagesUsed) {
      const delta = input.nextPagesUsed - existingUser.pagesUsed;
      await recordQuotaChange(
        {
          userId: input.userId,
          source: USAGE_SOURCE.ADMIN_ADJUST,
          direction: delta > 0 ? USAGE_DIRECTION.OUT : USAGE_DIRECTION.IN,
          pages: Math.abs(delta),
          note: `Admin adjusted pagesUsed from ${existingUser.pagesUsed} to ${input.nextPagesUsed}`,
        },
        tx
      );
    }

    return updatedUser;
  }, db);
}

export async function consumeExtractionQuota(
  input: {
    userId: string;
    pages: number;
    documentId: string;
  },
  db?: PrismaClientLike
) {
  return consumePagesForExtraction(input, db);
}

export async function getRecentUsageRecordsForUser(userId: string, limit: number) {
  return findUsageRecordsByUserId(userId, limit);
}

export async function getQuotaSummaryForUser(userId: string) {
  const user = await findUserById(userId);
  if (!user) {
    throw new Error('用户不存在');
  }

  return {
    plan: user.plan,
    pagesUsed: user.pagesUsed,
    pagesLimit: user.pagesLimit,
    pagesRemaining: Math.max(user.pagesLimit - user.pagesUsed, 0),
  };
}
