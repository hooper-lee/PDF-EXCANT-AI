import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { analyzeDocument, extractDataWithAI } from '@/lib/ai-extractor';
import { generateExcel } from '@/lib/excel-generator';
import pdf from 'pdf-parse';

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
    const userPrompt = formData.get('prompt') as string;

    if (!file) {
      return NextResponse.json({ error: '请上传文件' }, { status: 400 });
    }

    // 转换为 Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 解析 PDF
    let text = '';
    let pageCount = 0;

    if (file.type === 'application/pdf') {
      const pdfData = await pdf(buffer);
      text = pdfData.text;
      pageCount = pdfData.numpages;
    } else if (file.type.startsWith('image/')) {
      const result = await analyzeDocument(buffer, file.type);
      text = result.text;
      pageCount = result.pageCount;
    } else {
      return NextResponse.json({ error: '不支持的文件类型' }, { status: 400 });
    }

    // 检查页数限制
    if (user.pagesUsed + pageCount > user.pagesLimit) {
      return NextResponse.json(
        { error: '页数配额不足，请升级套餐' },
        { status: 403 }
      );
    }

    // 使用 AI 提取数据
    const extractedData = await extractDataWithAI(text, userPrompt);

    // 生成 Excel
    const excelBuffer = await generateExcel(extractedData);

    // 创建文档记录
    const document = await prisma.document.create({
      data: {
        userId: user.id,
        originalName: file.name,
        fileUrl: '', // 实际项目中应该上传到 S3
        fileType: file.type,
        fileSize: file.size,
        pageCount,
        status: 'COMPLETED',
        extractedData: JSON.stringify(extractedData),
      },
    });

    // 更新用户已使用页数
    await prisma.user.update({
      where: { id: user.id },
      data: {
        pagesUsed: user.pagesUsed + pageCount,
      },
    });

    // 返回 Excel 文件
    return new NextResponse(excelBuffer as any, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${file.name.replace('.pdf', '')}_extracted.xlsx"`,
        'X-Document-Id': document.id,
      },
    });
  } catch (error) {
    console.error('上传处理错误:', error);
    return NextResponse.json(
      { error: '处理失败，请稍后重试' },
      { status: 500 }
    );
  }
}
