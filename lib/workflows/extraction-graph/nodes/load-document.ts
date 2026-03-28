import { JOB_STATUS } from '@/lib/domain';
import { findExtractionTemplateById } from '@/lib/extraction/template-service';
import { findDocumentByIdForUser } from '@/lib/repositories/document-repository';
import { findExtractionJobByIdForUser } from '@/lib/repositories/extraction-job-repository';
import type {
  ExtractionGraphNodeResult,
  ExtractionGraphRuntimeState,
} from '@/lib/workflows/extraction-graph/state';

export async function loadDocumentNode(
  state: ExtractionGraphRuntimeState
): Promise<ExtractionGraphNodeResult> {
  const [document, job] = await Promise.all([
    findDocumentByIdForUser(state.documentId, state.userId),
    findExtractionJobByIdForUser(state.jobId, state.userId),
  ]);

  if (!document || !job) {
    throw new Error('提取任务不存在');
  }

  const template = state.templateId ? await findExtractionTemplateById(state.templateId) : null;
  if (state.templateId && !template) {
    throw new Error('模板不存在');
  }

  return {
    document,
    job,
    template,
    fileUrl: document.fileUrl,
    prompt: state.prompt ?? job.inputPrompt ?? undefined,
    status: job.status as typeof JOB_STATUS[keyof typeof JOB_STATUS],
    errorMessage: job.errorMessage ?? null,
  };
}
