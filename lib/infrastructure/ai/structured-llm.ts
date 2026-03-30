import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { LLM_PROVIDER, type LlmProvider } from '@/lib/domain';

export interface StructuredLlmConfig {
  provider: LlmProvider;
  model: string;
  apiKey: string | null;
  baseUrl: string | null;
  isEnabled: boolean;
}

function createOpenAiClient(config: StructuredLlmConfig) {
  if (!config.apiKey) {
    return null;
  }

  return new OpenAI({
    apiKey: config.apiKey,
    ...(config.baseUrl ? { baseURL: config.baseUrl } : {}),
  });
}

export async function invokeStructuredLlmJson(input: {
  config: StructuredLlmConfig;
  systemPrompt: string;
  userMessage: string;
}) {
  const { config, systemPrompt, userMessage } = input;

  if (!config.isEnabled || !config.apiKey) {
    throw new Error('当前未启用 LLM 或未配置 API Key');
  }

  if (
    config.provider === LLM_PROVIDER.OPENAI ||
    config.provider === LLM_PROVIDER.OPENAI_COMPATIBLE
  ) {
    const client = createOpenAiClient(config);
    if (!client) {
      throw new Error('当前未配置可用的 API Key');
    }

    const completion = await client.chat.completions.create({
      model: config.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      response_format: { type: 'json_object' },
    });

    return JSON.parse(completion.choices[0].message.content || '{}');
  }

  if (config.provider === LLM_PROVIDER.GEMINI) {
    const client = new GoogleGenerativeAI(config.apiKey);
    const model = client.getGenerativeModel({
      model: config.model,
      systemInstruction: systemPrompt,
    });
    const result = await model.generateContent([
      {
        text: `${userMessage}\n\n请只返回合法 JSON，不要输出 Markdown 代码块。`,
      },
    ]);

    return JSON.parse(result.response.text() || '{}');
  }

  throw new Error(`当前暂不支持 ${config.provider} 提供商`);
}
