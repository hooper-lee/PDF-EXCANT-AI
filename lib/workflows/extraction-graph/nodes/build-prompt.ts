import { buildExtractionPrompt } from '@/lib/extraction/prompt/build-extraction-prompt';
import type {
  ExtractionGraphNodeResult,
  ExtractionGraphRuntimeState,
} from '@/lib/workflows/extraction-graph/state';

export function buildPromptNode(
  state: ExtractionGraphRuntimeState
): ExtractionGraphNodeResult {
  const { systemPrompt, userMessage } = buildExtractionPrompt(state.normalizedText, {
    userPrompt: state.prompt,
    template: state.template
      ? {
          name: state.template.name,
          promptText: state.template.promptText,
          schemaJson: state.template.schemaJson,
        }
      : null,
  });

  return {
    systemPrompt,
    userMessage,
  };
}
