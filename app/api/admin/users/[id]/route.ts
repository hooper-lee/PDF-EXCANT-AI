import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// 获取单个用户的详细信息
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const adminUserId = verifyToken(token);
    if (!adminUserId) {
      return NextResponse.json({ error: '无效的令牌' }, { status: 401 });
    }

    const userId = params.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        orders: {
          orderBy: { createdAt: 'desc' },
        },
        subscriptions: {
          orderBy: { createdAt: 'desc' },
        },
        documents: {
          select: {
            id: true,
            originalName: true,
            pageCount: true,
            status: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        inviter: {
          select: {
            email: true,
            name: true,
          },
        },
        invitedUsers: {
          select: {
            id: true,
            email: true,
            name: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('获取用户详情错误:', error);
    return NextResponse.json(
      { error: '获取失败' },
      { status: 500 }
    );
  }
}

// 更新用户信息
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const adminUserId = verifyToken(token);
    if (!adminUserId) {
      return NextResponse.json({ error: '无效的令牌' }, { status: 401 });
    }

    const userId = params.id;
    const body = await request.json();
    const { plan, pagesLimit, pagesUsed, name } = body;

    // 验证套餐类型
    const validPlans = ['FREE', 'MONTHLY', 'YEARLY'];
    if (plan && !validPlans.includes(plan)) {
      return NextResponse.json({ error: '无效的套餐类型' }, { status: 400 });
    }

    // 更新用户信息
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(plan && { plan }),
        ...(pagesLimit !== undefined && { pagesLimit: parseInt(pagesLimit) }),
        ...(pagesUsed !== undefined && { pagesUsed: parseInt(pagesUsed) }),
        ...(name !== undefined && { name }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        plan: true,
        pagesUsed: true,
        pagesLimit: true,
      },
    });

    return NextResponse.json({ 
      message: '用户信息更新成功',
      user: updatedUser 
    });
  } catch (error) {
    console.error('更新用户信息错误:', error);
    return NextResponse.json(
      { error: '更新失败' },
      { status: 500 }
    );
  }
}