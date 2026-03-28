import { invokeLlmExtractionPrompt } from '@/lib/extraction/runner/llm-extraction';
import type {
  ExtractionGraphNodeResult,
  ExtractionGraphRuntimeState,
} from '@/lib/workflows/extraction-graph/state';

export async function callLlmNode(
  state: ExtractionGraphRuntimeState
): Promise<ExtractionGraphNodeResult> {
  const extractedJson = await invokeLlmExtractionPrompt({
    systemPrompt: state.systemPrompt,
    userMessage: state.userMessage,
    fallbackText: state.normalizedText,
  });

  return { extractedJson };
}
