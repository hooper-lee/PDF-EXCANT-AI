import { LLM_PROVIDER, LLM_PROVIDER_VALUES, type LlmProvider } from '@/lib/domain';
import { invokeStructuredLlmJson } from '@/lib/infrastructure/ai/structured-llm';
import {
  findDefaultLlmConfig,
  upsertDefaultLlmConfig,
} from '@/lib/repositories/llm-config-repository';

export interface ResolvedLlmConfig {
  provider: LlmProvider;
  model: string;
  apiKey: string | null;
  baseUrl: string | null;
  isEnabled: boolean;
  source: 'database' | 'env' | 'fallback';
}

export interface AdminLlmConfig {
  provider: LlmProvider;
  model: string;
  baseUrl: string;
  isEnabled: boolean;
  hasApiKey: boolean;
  source: 'database' | 'env' | 'fallback';
}

function resolveEnvLlmConfig(): ResolvedLlmConfig {
  const envGeminiApiKey =
    process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your-gemini-api-key'
      ? process.env.GEMINI_API_KEY
      : null;
  const envApiKey =
    process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'sk-your-openai-api-key'
      ? process.env.OPENAI_API_KEY
      : null;
  const envModel = process.env.OPENAI_MODEL?.trim() || 'gpt-4o-mini';
  const envBaseUrl = process.env.OPENAI_BASE_URL?.trim() || null;

  if (envGeminiApiKey) {
    return {
      provider: LLM_PROVIDER.GEMINI,
      model: process.env.GEMINI_MODEL?.trim() || 'gemini-1.5-flash',
      apiKey: envGeminiApiKey,
      baseUrl: null,
      isEnabled: true,
      source: 'env',
    };
  }

  if (envApiKey) {
    return {
      provider: LLM_PROVIDER.OPENAI,
      model: envModel,
      apiKey: envApiKey,
      baseUrl: envBaseUrl,
      isEnabled: true,
      source: 'env',
    };
  }

  return {
    provider: LLM_PROVIDER.OPENAI,
    model: envModel,
    apiKey: null,
    baseUrl: envBaseUrl,
    isEnabled: true,
    source: 'fallback',
  };
}

export async function getResolvedLlmConfig(): Promise<ResolvedLlmConfig> {
  const envConfig = resolveEnvLlmConfig();
  const dbConfig = await findDefaultLlmConfig();
  if (dbConfig) {
    return {
      provider: (dbConfig.provider as LlmProvider) || LLM_PROVIDER.OPENAI,
      model: dbConfig.model,
      apiKey: dbConfig.apiKey || envConfig.apiKey,
      baseUrl: dbConfig.baseUrl || envConfig.baseUrl,
      isEnabled: dbConfig.isEnabled,
      source: 'database',
    };
  }

  return envConfig;
}

export async function getAdminLlmConfig(): Promise<AdminLlmConfig> {
  const config = await getResolvedLlmConfig();

  return {
    provider: config.provider,
    model: config.model,
    baseUrl: config.baseUrl || '',
    isEnabled: config.isEnabled,
    hasApiKey: Boolean(config.apiKey),
    source: config.source,
  };
}

export async function updateAdminLlmConfig(input: {
  provider: string;
  model: string;
  baseUrl?: string;
  apiKey?: string;
  isEnabled?: boolean;
}) {
  const provider = input.provider.trim().toUpperCase() as LlmProvider;
  const model = input.model.trim();

  if (!LLM_PROVIDER_VALUES.includes(provider)) {
    throw new Error('当前仅支持 OPENAI、OPENAI_COMPATIBLE 和 GEMINI 提供商');
  }

  if (!model) {
    throw new Error('模型名称不能为空');
  }

  const existing = await findDefaultLlmConfig();

  return upsertDefaultLlmConfig({
    provider,
    model,
    baseUrl: input.baseUrl?.trim() || null,
    apiKey:
      input.apiKey !== undefined
        ? input.apiKey.trim() || null
        : existing?.apiKey || null,
    isEnabled: input.isEnabled ?? true,
  });
}

export async function testAdminLlmConfig(input: {
  provider: string;
  model: string;
  baseUrl?: string;
  apiKey?: string;
  isEnabled?: boolean;
}) {
  const provider = input.provider.trim().toUpperCase() as LlmProvider;
  const model = input.model.trim();

  if (!LLM_PROVIDER_VALUES.includes(provider)) {
    throw new Error('不支持的提供商');
  }

  if (!model) {
    throw new Error('模型名称不能为空');
  }

  const fallbackConfig = await getResolvedLlmConfig();
  const config: ResolvedLlmConfig = {
    provider,
    model,
    baseUrl: input.baseUrl?.trim() || null,
    apiKey:
      input.apiKey !== undefined && input.apiKey.trim()
        ? input.apiKey.trim()
        : fallbackConfig.provider === provider
          ? fallbackConfig.apiKey
          : null,
    isEnabled: input.isEnabled ?? true,
    source: 'database',
  };

  if (!config.isEnabled) {
    throw new Error('请先启用 LLM 提取后再测试');
  }

  if (!config.apiKey) {
    throw new Error('当前没有可用 API Key，无法测试模型连接');
  }

  const result = await invokeStructuredLlmJson({
    config,
    systemPrompt: '你是一个用于连通性测试的模型，请始终返回合法 JSON。',
    userMessage:
      '请返回 {"ok": true, "provider": "<provider>", "model": "<model>", "message": "test passed"} 这样的 JSON。',
  });

  return {
    config: {
      provider: config.provider,
      model: config.model,
      baseUrl: config.baseUrl || '',
      usedStoredKey: !input.apiKey?.trim(),
    },
    result,
  };
}
