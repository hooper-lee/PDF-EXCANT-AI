import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { ExtractionJobError, runExtractionJob } from '@/lib/extraction-job-service';
import { assertExtractableFile, getExtractedWorkbookFilename } from '@/lib/documents/upload-file';

export async function POST(request: NextRequest) {
  try {
    // 验证用户
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const userId = verifyToken(token);
    if (!userId) {
      return NextResponse.json({ error: '无效的令牌' }, { status: 401 });
    }

    // 获取用户信息
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    // 解析表单数据
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const userPrompt = (formData.get('prompt') as string | null) || undefined;
    const templateId = formData.get('templateId') as string | null;

    assertExtractableFile(file);

    const { document, job, excelBuffer, user: updatedUser } = await runExtractionJob({
      userId: user.id,
      file,
      userPrompt,
      templateId: templateId || undefined,
      pagesUsed: user.pagesUsed,
      pagesLimit: user.pagesLimit,
    });

    // 返回 Excel 文件
    return new NextResponse(excelBuffer as any, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${getExtractedWorkbookFilename(file.name)}"`,
        'X-Document-Id': document.id,
        'X-Extraction-Job-Id': job.id,
        'X-User-Pages-Used': String(updatedUser.pagesUsed),
      },
    });
  } catch (error) {
    console.error('上传处理错误:', error);
    if (error instanceof Error) {
      if (
        error.message === '请上传文件' ||
        error.message === '不支持的文件类型' ||
        error.message === '模板不存在'
      ) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      if (error.message === '页数配额不足，请升级套餐') {
        return NextResponse.json({ error: error.message }, { status: 403 });
      }
    }

    if (error instanceof ExtractionJobError) {
      return NextResponse.json(
        {
          error: error.message,
          jobId: error.jobId,
          documentId: error.documentId,
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: '处理失败，请稍后重试' },
      { status: 500 }
    );
  }
}
