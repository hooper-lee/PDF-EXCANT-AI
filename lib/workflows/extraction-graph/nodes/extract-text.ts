import { extractPdfText } from '@/lib/extraction/parser/pdf-text';
import type {
  ExtractionGraphNodeResult,
  ExtractionGraphRuntimeState,
} from '@/lib/workflows/extraction-graph/state';
import { ensureFileBuffer } from '@/lib/workflows/extraction-graph/nodes/shared';

export async function extractTextNode(
  state: ExtractionGraphRuntimeState
): Promise<ExtractionGraphNodeResult> {
  const buffer = await ensureFileBuffer(state);
  const pdfResult = await extractPdfText(buffer);

  return {
    buffer,
    originalText: pdfResult.text,
    pageCount: pdfResult.pageCount,
  };
}

export function routeAfterTextExtraction(state: ExtractionGraphRuntimeState) {
  return state.originalText.trim() ? 'normalize-text' : 'run-ocr';
}
