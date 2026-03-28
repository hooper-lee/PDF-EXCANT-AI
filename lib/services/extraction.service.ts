import { JOB_STATUS, type JobStatus } from '@/lib/domain';
import { prisma } from '@/lib/db/prisma-client';
import { assertExtractableFile } from '@/lib/documents/upload-file';
import { findUserById } from '@/lib/repositories/user-repository';
import { createPendingDocument } from '@/lib/repositories/document-repository';
import {
  createPendingExtractionJob,
  findExtractionJobByIdForUser,
  findExtractionJobsByUserId,
  markExtractionJobCompleted,
  markExtractionJobFailed,
  markExtractionJobProcessing,
} from '@/lib/repositories/extraction-job-repository';
import { ExtractionJobError, runExtractionJob } from '@/lib/extraction/runner/extraction-job-runner';
import type {
  CreateExtractionJobInput,
  CreateExtractionJobResult,
  ProcessExtractionUploadInput,
  StartExtractionJobInput,
} from '@/lib/contracts/extraction';

export { ExtractionJobError };

export async function createExtractionTask({
  userId,
  file,
  userPrompt,
  templateId,
}: CreateExtractionJobInput): Promise<CreateExtractionJobResult> {
  assertExtractableFile(file);

  return prisma.$transaction(async (tx) => {
    const document = await createPendingDocument(
      {
        userId,
        originalName: file.name,
        fileUrl: '',
        fileType: file.type,
        fileSize: file.size,
        pageCount: 0,
      },
      tx
    );

    const job = await createPendingExtractionJob(
      {
        userId,
        documentId: document.id,
        inputPrompt: userPrompt || null,
        templateId: templateId || null,
      },
      tx
    );

    return { document, job };
  });
}

export async function createExtractionJobForUser({
  userId,
  file,
  userPrompt,
  templateId,
}: CreateExtractionJobInput) {
  const user = await findUserById(userId);
  if (!user) {
    throw new Error('用户不存在');
  }

  const task = await createExtractionTask({
    userId: user.id,
    file,
    userPrompt,
    templateId,
  });

  return task;
}

export async function startJob({
  jobId,
  userId,
  documentId,
  file,
  userPrompt,
  templateId,
}: StartExtractionJobInput) {
  const user = await findUserById(userId);
  if (!user) {
    throw new Error('用户不存在');
  }

  return runExtractionJob({
    userId: user.id,
    jobId,
    documentId,
    file,
    userPrompt,
    templateId,
    pagesUsed: user.pagesUsed,
    pagesLimit: user.pagesLimit,
  });
}

export async function processExtractionUpload({
  userId,
  file,
  userPrompt,
  templateId,
}: ProcessExtractionUploadInput) {
  const task = await createExtractionJobForUser({
    userId,
    file,
    userPrompt,
    templateId,
  });

  return startJob({
    jobId: task.job.id,
    userId,
    documentId: task.document.id,
    file,
    userPrompt,
    templateId,
  });
}

export async function startExtractionForUser(input: ProcessExtractionUploadInput) {
  return processExtractionUpload(input);
}

export async function updateExtractionJobStatus(
  jobId: string,
  status: JobStatus,
  payload?: {
    resultJson?: string;
    errorMessage?: string;
  }
) {
  if (status === JOB_STATUS.PROCESSING) {
    return markExtractionJobProcessing(jobId);
  }

  if (status === JOB_STATUS.COMPLETED) {
    return markExtractionJobCompleted(jobId, payload?.resultJson || 'null');
  }

  if (status === JOB_STATUS.FAILED) {
    return markExtractionJobFailed(jobId, payload?.errorMessage || '处理失败，请稍后重试');
  }

  throw new Error(`不支持直接更新为状态: ${status}`);
}

export async function getExtractionJobsForUser(userId: string) {
  return findExtractionJobsByUserId(userId);
}

export async function getExtractionJobForUser(jobId: string, userId: string) {
  return findExtractionJobByIdForUser(jobId, userId);
}

export async function getExtractionJobDetails(jobId: string, userId: string) {
  return getExtractionJobForUser(jobId, userId);
}
