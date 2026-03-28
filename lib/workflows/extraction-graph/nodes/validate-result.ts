import { normalizeExtractionResult } from '@/lib/extraction/runner/format-result';
import type {
  ExtractionGraphNodeResult,
  ExtractionGraphRuntimeState,
} from '@/lib/workflows/extraction-graph/state';

export function validateResultNode(
  state: ExtractionGraphRuntimeState
): ExtractionGraphNodeResult {
  const normalizedResult = normalizeExtractionResult(state.extractedJson);

  return {
    extractedJson: normalizedResult,
    resultJson: JSON.stringify(normalizedResult),
  };
}
