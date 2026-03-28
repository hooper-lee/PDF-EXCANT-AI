import type {
  ExtractionGraphNodeResult,
  ExtractionGraphRuntimeState,
} from '@/lib/workflows/extraction-graph/state';

export function normalizeTextNode(
  state: ExtractionGraphRuntimeState
): ExtractionGraphNodeResult {
  const normalizedText = (state.ocrText || state.originalText || '')
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return { normalizedText };
}
