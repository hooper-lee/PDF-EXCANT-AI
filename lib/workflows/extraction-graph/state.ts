import { Annotation } from '@langchain/langgraph';
import type { JobStatus } from '@/lib/domain';
import type { ResolvedLlmConfig } from '@/lib/services/llm-config.service';

interface ExtractionDocumentSnapshot {
  id: string;
  originalName: string;
  fileUrl: string;
  fileType: string;
  pageCount: number;
  status: string;
  extractedData?: string | null;
  outputUrl?: string | null;
}

interface ExtractionJobSnapshot {
  id: string;
  status: string;
  lastStep?: string | null;
  inputPrompt?: string | null;
  rawText?: string | null;
  ocrText?: string | null;
  resultJson?: string | null;
  errorMessage?: string | null;
  startedAt?: Date | null;
  finishedAt?: Date | null;
}

interface ExtractionTemplateSnapshot {
  id: string;
  name: string;
  promptText: string;
  schemaJson?: string | null;
}

export interface ExtractionState {
  jobId: string;
  userId: string;
  documentId: string;
  templateId?: string;
  prompt?: string;
  fileUrl?: string;
  file: File;
  fileType: string;
  pagesUsed: number;
  pagesLimit: number;
  pageCount: number;
  status: JobStatus;
  errorMessage?: string | null;
  originalText: string;
  ocrText: string;
  normalizedText: string;
  extractedJson: unknown;
  resultJson?: string | null;
  outputUrl?: string | null;
  systemPrompt: string;
  userMessage: string;
  buffer: Buffer;
  excelBuffer?: Buffer | null;
  document: ExtractionDocumentSnapshot | null;
  job: ExtractionJobSnapshot | null;
  template: ExtractionTemplateSnapshot | null;
  llmConfig: ResolvedLlmConfig | null;
  updatedUser: {
    id?: string;
    pagesUsed: number;
    pagesLimit?: number;
  } | null;
}

export const ExtractionStateAnnotation = Annotation.Root({
  jobId: Annotation<string>,
  userId: Annotation<string>,
  documentId: Annotation<string>,
  templateId: Annotation<string | undefined>,
  prompt: Annotation<string | undefined>,
  fileUrl: Annotation<string | undefined>,
  file: Annotation<File>,
  fileType: Annotation<string>,
  pagesUsed: Annotation<number>,
  pagesLimit: Annotation<number>,
  pageCount: Annotation<number>,
  status: Annotation<JobStatus>,
  errorMessage: Annotation<string | null | undefined>,
  originalText: Annotation<string>,
  ocrText: Annotation<string>,
  normalizedText: Annotation<string>,
  extractedJson: Annotation<unknown>,
  resultJson: Annotation<string | null | undefined>,
  outputUrl: Annotation<string | null | undefined>,
  systemPrompt: Annotation<string>,
  userMessage: Annotation<string>,
  buffer: Annotation<Buffer>,
  excelBuffer: Annotation<Buffer | null | undefined>,
  document: Annotation<ExtractionDocumentSnapshot | null>,
  job: Annotation<ExtractionJobSnapshot | null>,
  template: Annotation<ExtractionTemplateSnapshot | null>,
  llmConfig: Annotation<ResolvedLlmConfig | null>,
  updatedUser: Annotation<ExtractionState['updatedUser']>,
});

export type ExtractionGraphRuntimeState = typeof ExtractionStateAnnotation.State;
export type ExtractionGraphRuntimeUpdate = typeof ExtractionStateAnnotation.Update;
export type ExtractionGraphNodeResult = Partial<ExtractionState>;
