import OpenAI from 'openai';
import { buildExtractionPrompt } from '@/lib/extraction/prompt/build-extraction-prompt';
import { extractDataWithRules, normalizeExtractionResult } from '@/lib/extraction/runner/format-result';

const openai =
  process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'sk-your-openai-api-key'
    ? new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      })
    : null;

interface LlmExtractionTemplate {
  name: string;
  promptText: string;
  schemaJson?: string | null;
}

interface RunLlmExtractionOptions {
  userPrompt?: string;
  template?: LlmExtractionTemplate | null;
}

export async function runLlmExtraction(text: string, options: RunLlmExtractionOptions = {}) {
  const { systemPrompt, userMessage } = buildExtractionPrompt(text, options);

  if (!openai) {
    console.log('使用基于规则的数据提取（演示模式）');
    return extractDataWithRules(text);
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      response_format: { type: 'json_object' },
    });

    return normalizeExtractionResult(JSON.parse(completion.choices[0].message.content || '{}'));
  } catch (error) {
    console.error('OpenAI API 错误:', error);
    throw new Error('OpenAI API 调用失败，请检查 API Key 是否正确配置。');
  }
}
