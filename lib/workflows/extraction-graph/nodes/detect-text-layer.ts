import type {
  ExtractionGraphNodeResult,
  ExtractionGraphRuntimeState,
} from '@/lib/workflows/extraction-graph/state';

export function detectTextLayerNode(
  state: ExtractionGraphRuntimeState
): ExtractionGraphNodeResult {
  return {
    normalizedText: state.fileType === 'application/pdf' ? '' : state.normalizedText,
  };
}

export function routeFromTextLayerDetection(state: ExtractionGraphRuntimeState) {
  return state.fileType === 'application/pdf' ? 'extract-text' : 'run-ocr';
}
