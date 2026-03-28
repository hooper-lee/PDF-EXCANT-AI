import { assertExtractableFile } from '@/lib/documents/upload-file';
import { JOB_STATUS } from '@/lib/domain';
import { runExtractionWorkflow } from '@/lib/workflows/extraction-graph';

interface RunExtractionJobInput {
  userId: string;
  jobId: string;
  documentId: string;
  file: File;
  userPrompt?: string;
  templateId?: string;
  pagesUsed: number;
  pagesLimit: number;
}

export class ExtractionJobError extends Error {
  jobId: string;
  documentId: string;

  constructor(message: string, jobId: string, documentId: string) {
    super(message);
    this.name = 'ExtractionJobError';
    this.jobId = jobId;
    this.documentId = documentId;
  }
}

export async function runExtractionJob({
  userId,
  jobId,
  documentId,
  file,
  userPrompt,
  templateId,
  pagesUsed,
  pagesLimit,
}: RunExtractionJobInput) {
  assertExtractableFile(file);

  try {
    const state = await runExtractionWorkflow({
      userId,
      jobId,
      documentId,
      file,
      fileType: file.type,
      prompt: userPrompt,
      templateId,
      pagesUsed,
      pagesLimit,
      fileUrl: undefined,
      status: JOB_STATUS.PENDING,
      errorMessage: null,
      originalText: '',
      normalizedText: '',
      extractedJson: null,
      outputUrl: null,
      document: null,
      job: null,
      template: null,
      buffer: Buffer.alloc(0),
      ocrText: '',
      pageCount: 0,
      systemPrompt: '',
      userMessage: '',
      resultJson: null,
      excelBuffer: null,
      updatedUser: null,
    });

    if (!state.document || !state.job || !state.updatedUser || !state.excelBuffer) {
      throw new Error('提取工作流未返回完整结果');
    }

    return {
      document: state.document,
      job: state.job,
      excelBuffer: state.excelBuffer,
      pageCount: state.pageCount,
      user: state.updatedUser,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : '处理失败，请稍后重试';

    throw new ExtractionJobError(message, jobId, documentId);
  }
}
