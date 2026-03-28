import { NextResponse } from 'next/server';
import { listExtractionTemplates } from '@/lib/extraction/template-service';

export async function GET() {
  try {
    const templates = await listExtractionTemplates();

    return NextResponse.json({
      templates: templates.map((template) => ({
        id: template.id,
        name: template.name,
        description: template.description,
        schemaJson: template.schemaJson,
        promptText: template.promptText,
        isPublic: template.isPublic,
        createdAt: template.createdAt,
        updatedAt: template.updatedAt,
      })),
    });
  } catch (error) {
    console.error('获取提取模板失败:', error);
    return NextResponse.json({ error: '获取模板失败' }, { status: 500 });
  }
}
