import { extractImageText } from '@/lib/extraction/parser/ocr-text';
import type {
  ExtractionGraphNodeResult,
  ExtractionGraphRuntimeState,
} from '@/lib/workflows/extraction-graph/state';
import { ensureFileBuffer } from '@/lib/workflows/extraction-graph/nodes/shared';

export async function runOcrNode(
  state: ExtractionGraphRuntimeState
): Promise<ExtractionGraphNodeResult> {
  if (state.fileType === 'application/pdf') {
    throw new Error('当前版本暂不支持无文本层 PDF 的 OCR fallback');
  }

  const buffer = await ensureFileBuffer(state);
  const ocrText = await extractImageText(buffer);

  return {
    buffer,
    ocrText,
    pageCount: state.pageCount || 1,
  };
}
