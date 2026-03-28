import { NextRequest, NextResponse } from 'next/server';
import { getExtractionTemplateById } from '@/lib/services/template.service';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const template = await getExtractionTemplateById(params.id);
    if (!template) {
      return NextResponse.json({ error: '模板不存在' }, { status: 404 });
    }

    return NextResponse.json({ template });
  } catch (error) {
    console.error('获取提取模板错误:', error);
    return NextResponse.json({ error: '获取失败' }, { status: 500 });
  }
}
