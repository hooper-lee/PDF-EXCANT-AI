import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const userId = verifyToken(token);
    if (!userId) {
      return NextResponse.json({ error: '无效的令牌' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const rawLimit = Number(searchParams.get('limit') || '10');
    const limit = Number.isFinite(rawLimit) ? Math.min(Math.max(rawLimit, 1), 50) : 10;

    const usageRecords = await prisma.usageRecord.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        source: true,
        direction: true,
        pages: true,
        note: true,
        createdAt: true,
        documentId: true,
        document: {
          select: {
            id: true,
            originalName: true,
          },
        },
      },
    });

    return NextResponse.json({ usageRecords });
  } catch (error) {
    console.error('获取额度流水错误:', error);
    return NextResponse.json(
      { error: '获取失败' },
      { status: 500 }
    );
  }
}
