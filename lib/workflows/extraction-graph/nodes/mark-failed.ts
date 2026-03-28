import { prisma } from '@/lib/prisma';
import { JOB_STATUS } from '@/lib/domain';
import { markDocumentFailed } from '@/lib/repositories/document-repository';
import { markExtractionJobFailed } from '@/lib/repositories/extraction-job-repository';
import { WorkflowStepError } from '@/lib/workflows/extraction-graph/errors';
import type { ExtractionGraphRuntimeState } from '@/lib/workflows/extraction-graph/state';

export async function markFailedNode(
  state: ExtractionGraphRuntimeState,
  error: unknown
) {
  const message = error instanceof WorkflowStepError
    ? `[${error.step}] ${error.message}`
    : error instanceof Error
      ? error.message
      : '处理失败，请稍后重试';

  await prisma.$transaction(async (tx) => {
    await markDocumentFailed(state.documentId, tx);
    await markExtractionJobFailed(state.jobId, message, tx);
  });

  return {
    status: JOB_STATUS.FAILED,
    errorMessage: message,
  };
}
