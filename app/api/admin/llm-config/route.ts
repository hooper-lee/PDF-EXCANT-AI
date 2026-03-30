import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { getAdminLlmConfig, updateAdminLlmConfig } from '@/lib/services/llm-config.service';

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAdmin(request);
    if (!auth.ok) {
      return auth.response;
    }

    const config = await getAdminLlmConfig();
    return NextResponse.json({ config });
  } catch (error) {
    console.error('获取 LLM 配置失败:', error);
    return NextResponse.json({ error: '获取 LLM 配置失败' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const auth = await requireAdmin(request);
    if (!auth.ok) {
      return auth.response;
    }

    const body = await request.json();
    const config = await updateAdminLlmConfig({
      provider: body.provider,
      model: body.model,
      baseUrl: body.baseUrl,
      apiKey: body.apiKey,
      isEnabled: body.isEnabled,
    });

    return NextResponse.json({
      message: 'LLM 配置已更新',
      config: {
        provider: config.provider,
        model: config.model,
        baseUrl: config.baseUrl || '',
        isEnabled: config.isEnabled,
        hasApiKey: Boolean(config.apiKey),
        source: 'database',
      },
    });
  } catch (error) {
    console.error('更新 LLM 配置失败:', error);
    const message = error instanceof Error ? error.message : '更新 LLM 配置失败';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
