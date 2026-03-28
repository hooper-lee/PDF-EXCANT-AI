import { extractImageText } from '@/lib/extraction/parser/ocr-text';
import { runLlmExtraction } from '@/lib/extraction/runner/llm-extraction';

export async function extractTextFromImage(imageBuffer: Buffer): Promise<string> {
  return extractImageText(imageBuffer);
}

export async function extractDataWithAI(text: string, userPrompt?: string): Promise<any> {
  return runLlmExtraction(text, { userPrompt });
}

export async function analyzeDocument(fileBuffer: Buffer, fileType: string): Promise<{
  text: string;
  pageCount: number;
}> {
  if (!fileType.startsWith('image/')) {
    throw new Error('不支持的文件类型');
  }

  const text = await extractImageText(fileBuffer);
  return { text, pageCount: 1 };
}
