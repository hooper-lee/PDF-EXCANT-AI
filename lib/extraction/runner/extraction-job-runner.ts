import { prisma } from '@/lib/prisma';
import { createUsageRecord } from '@/lib/usage-record-service';
import { DOCUMENT_STATUS, JOB_STATUS, USAGE_DIRECTION, USAGE_SOURCE } from '@/lib/domain-types';
import { parseDocumentContent } from '@/lib/extraction/parser/document-content';
import { findExtractionTemplateById } from '@/lib/extraction/template-service';
import { runLlmExtraction } from '@/lib/extraction/runner/llm-extraction';
import { buildExcelBuffer } from '@/lib/export/excel';
import { assertExtractableFile } from '@/lib/documents/upload-file';

interface RunExtractionJobInput {
  userId: string;
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
  file,
  userPrompt,
  templateId,
  pagesUsed,
  pagesLimit,
}: RunExtractionJobInput) {
  assertExtractableFile(file);

  const template = templateId ? await findExtractionTemplateById(templateId) : null;
  if (templateId && !template) {
    throw new Error('模板不存在');
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const parsedDocument = await parseDocumentContent({
    buffer,
    fileType: file.type,
  });

  if (pagesUsed + parsedDocument.pageCount > pagesLimit) {
    throw new Error('页数配额不足，请升级套餐');
  }

  const document = await prisma.document.create({
    data: {
      userId,
      originalName: file.name,
      fileUrl: '',
      fileType: file.type,
      fileSize: file.size,
      pageCount: parsedDocument.pageCount,
      status: DOCUMENT_STATUS.PENDING,
    },
  });

  const job = await prisma.extractionJob.create({
    data: {
      userId,
      documentId: document.id,
      status: JOB_STATUS.PENDING,
      inputPrompt: userPrompt || null,
      templateId: template?.id || null,
      rawText: parsedDocument.rawText || null,
      ocrText: parsedDocument.ocrText || null,
    },
  });

  await prisma.extractionJob.update({
    where: { id: job.id },
    data: {
      status: JOB_STATUS.PROCESSING,
      startedAt: new Date(),
    },
  });

  try {
    const extractedData = await runLlmExtraction(parsedDocument.sourceText, {
      userPrompt,
      template: template
        ? {
            name: template.name,
            promptText: template.promptText,
            schemaJson: template.schemaJson,
          }
        : null,
    });
    const excelBuffer = await buildExcelBuffer(extractedData);

    const { updatedDocument, updatedJob, updatedUser } = await prisma.$transaction(async (tx) => {
      const updatedDocument = await tx.document.update({
        where: { id: document.id },
        data: {
          status: DOCUMENT_STATUS.COMPLETED,
          extractedData: JSON.stringify(extractedData),
        },
      });

      const updatedJob = await tx.extractionJob.update({
        where: { id: job.id },
        data: {
          status: JOB_STATUS.COMPLETED,
          resultJson: JSON.stringify(extractedData),
          finishedAt: new Date(),
          errorMessage: null,
        },
      });

      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          pagesUsed: { increment: parsedDocument.pageCount },
        },
      });

      await createUsageRecord(
        {
          userId,
          source: USAGE_SOURCE.EXTRACTION,
          direction: USAGE_DIRECTION.OUT,
          pages: parsedDocument.pageCount,
          documentId: document.id,
          note: `AI extraction consumed ${parsedDocument.pageCount} page(s)`,
        },
        tx
      );

      return { updatedDocument, updatedJob, updatedUser };
    });

    return {
      document: updatedDocument,
      job: updatedJob,
      excelBuffer,
      pageCount: parsedDocument.pageCount,
      user: updatedUser,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : '处理失败，请稍后重试';

    await prisma.$transaction([
      prisma.document.update({
        where: { id: document.id },
        data: {
          status: DOCUMENT_STATUS.FAILED,
        },
      }),
      prisma.extractionJob.update({
        where: { id: job.id },
        data: {
          status: JOB_STATUS.FAILED,
          errorMessage: message,
          finishedAt: new Date(),
        },
      }),
    ]);

    throw new ExtractionJobError(message, job.id, document.id);
  }
}
