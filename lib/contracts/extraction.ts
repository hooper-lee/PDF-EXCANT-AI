export interface ProcessExtractionUploadInput {
  userId: string;
  file: File;
  userPrompt?: string;
  templateId?: string;
}

export interface CreateExtractionJobInput extends ProcessExtractionUploadInput {}

export interface StartExtractionJobInput {
  jobId: string;
  userId: string;
  documentId: string;
  file: File;
  userPrompt?: string;
  templateId?: string;
}

export interface CreateExtractionJobResult {
  document: {
    id: string;
    status: string;
  };
  job: {
    id: string;
    status: string;
  };
}
