import { prisma } from '@/lib/prisma';
import { JOB_STATUS } from '@/lib/domain';
import { consumePagesForExtraction } from '@/lib/services/quota.service';
import { markDocumentCompleted, updateDocumentSnapshot } from '@/lib/repositories/document-repository';
import {
  markExtractionJobCompleted,
  updateExtractionJobParsedContent,
} from '@/lib/repositories/extraction-job-repository';
import type {
  ExtractionGraphNodeResult,
  ExtractionGraphRuntimeState,
} from '@/lib/workflows/extraction-graph/state';

export async function persistResultNode(
  state: ExtractionGraphRuntimeState
): Promise<ExtractionGraphNodeResult> {
  if (!state.resultJson) {
    throw new Error('提取结果未生成');
  }

  const resultJson = state.resultJson;

  const { updatedDocument, updatedJob, updatedUser } = await prisma.$transaction(async (tx) => {
    await updateDocumentSnapshot(
      state.documentId,
      {
        pageCount: state.pageCount,
      },
      tx
    );

    await updateExtractionJobParsedContent(
      state.jobId,
      {
        rawText: state.originalText || null,
        ocrText: state.ocrText || null,
      },
      tx
    );

    const updatedDocument = await markDocumentCompleted(state.documentId, resultJson, tx);
    const updatedJob = await markExtractionJobCompleted(state.jobId, resultJson, tx);
    const updatedUser = await consumePagesForExtraction(
      {
        userId: state.userId,
        pages: state.pageCount,
        documentId: state.documentId,
      },
      tx
    );

    return { updatedDocument, updatedJob, updatedUser };
  });

  return {
    document: updatedDocument,
    job: updatedJob,
    status: JOB_STATUS.COMPLETED,
    outputUrl: updatedDocument.outputUrl,
    updatedUser,
  };
}
