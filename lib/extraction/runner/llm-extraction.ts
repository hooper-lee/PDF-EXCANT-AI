import { buildExtractionPrompt } from '@/lib/extraction/prompt/build-extraction-prompt';
import { extractDataWithRules, normalizeExtractionResult } from '@/lib/extraction/runner/format-result';
import { invokeStructuredLlmJson } from '@/lib/infrastructure/ai/structured-llm';
import { getResolvedLlmConfig, type ResolvedLlmConfig } from '@/lib/services/llm-config.service';

interface LlmExtractionTemplate {
  name: string;
  promptText: string;
  schemaJson?: string | null;
}

interface RunLlmExtractionOptions {
  userPrompt?: string;
  template?: LlmExtractionTemplate | null;
}

interface InvokeLlmExtractionPromptInput {
  systemPrompt: string;
  userMessage: string;
  fallbackText: string;
  llmConfig?: ResolvedLlmConfig | null;
}

export async function invokeLlmExtractionPrompt({
  systemPrompt,
  userMessage,
  fallbackText,
  llmConfig,
}: InvokeLlmExtractionPromptInput) {
  const resolvedConfig = llmConfig ?? (await getResolvedLlmConfig());

  if (!resolvedConfig.isEnabled || !resolvedConfig.apiKey) {
    console.log('使用基于规则的数据提取（演示模式）');
    return extractDataWithRules(fallbackText);
  }

  try {
    const result = await invokeStructuredLlmJson({
      config: resolvedConfig,
      systemPrompt,
      userMessage,
    });

    return normalizeExtractionResult(result);
  } catch (error) {
    console.error('LLM API 错误:', error);
    throw new Error(`${resolvedConfig.provider} 调用失败，请检查模型配置和 API Key。`);
  }
}

export async function runLlmExtraction(text: string, options: RunLlmExtractionOptions = {}) {
  const { systemPrompt, userMessage } = buildExtractionPrompt(text, options);
  const llmConfig = await getResolvedLlmConfig();

  return invokeLlmExtractionPrompt({
    systemPrompt,
    userMessage,
    fallbackText: text,
    llmConfig,
  });
}
