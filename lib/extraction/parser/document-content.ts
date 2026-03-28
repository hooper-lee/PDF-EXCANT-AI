import { extractPdfText } from '@/lib/extraction/parser/pdf-text';
import { extractImageText } from '@/lib/extraction/parser/ocr-text';

interface ParseDocumentContentInput {
  buffer: Buffer;
  fileType: string;
}

export async function parseDocumentContent({ buffer, fileType }: ParseDocumentContentInput) {
  if (fileType === 'application/pdf') {
    const pdfResult = await extractPdfText(buffer);

    return {
      rawText: pdfResult.text,
      ocrText: '',
      pageCount: pdfResult.pageCount,
      sourceText: pdfResult.text,
    };
  }

  if (fileType.startsWith('image/')) {
    const ocrText = await extractImageText(buffer);

    return {
      rawText: '',
      ocrText,
      pageCount: 1,
      sourceText: ocrText,
    };
  }

  throw new Error('不支持的文件类型');
}
