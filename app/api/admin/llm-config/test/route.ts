import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { testAdminLlmConfig } from '@/lib/services/llm-config.service';

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAdmin(request);
    if (!auth.ok) {
      return auth.response;
    }

    const body = await request.json();
    const testResult = await testAdminLlmConfig({
      provider: body.provider,
      model: body.model,
      baseUrl: body.baseUrl,
      apiKey: body.apiKey,
      isEnabled: body.isEnabled,
    });

    return NextResponse.json({
      success: true,
      message: '模型连接测试成功',
      ...testResult,
    });
  } catch (error) {
    console.error('测试 LLM 配置失败:', error);
    const message = error instanceof Error ? error.message : '测试 LLM 配置失败';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
