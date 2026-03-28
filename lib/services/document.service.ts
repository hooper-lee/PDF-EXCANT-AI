import {
  createPendingDocument,
  deleteDocumentById,
  findDocumentByIdForUser,
  findDocumentsByUserId,
} from '@/lib/repositories/document-repository';

interface CreateDocumentRecordInput {
  userId: string;
  originalName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  pageCount: number;
}

export async function createDocumentRecord(input: CreateDocumentRecordInput) {
  return createPendingDocument(input);
}

export async function getDocumentsForUser(userId: string) {
  return findDocumentsByUserId(userId);
}

export async function getDocumentForUser(documentId: string, userId: string) {
  return findDocumentByIdForUser(documentId, userId);
}

export async function assertDocumentOwnership(documentId: string, userId: string) {
  const document = await findDocumentByIdForUser(documentId, userId);
  if (!document) {
    throw new Error('文档不存在');
  }

  return document;
}

export async function removeDocumentForUser(documentId: string, userId: string) {
  await assertDocumentOwnership(documentId, userId);
  return deleteDocumentById(documentId);
}

export async function getDocumentJobsForUser(documentId: string, userId: string) {
  const document = await assertDocumentOwnership(documentId, userId);
  return document.extractionJobs;
}
