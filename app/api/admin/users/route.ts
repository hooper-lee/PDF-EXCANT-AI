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

    // 简单验证：实际项目中应该检查用户是否是管理员

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        plan: true,
        pagesUsed: true,
        pagesLimit: true,
        inviteCode: true,
        inviteCount: true,
        invitePages: true,
        invitedBy: true,
        createdAt: true,
        _count: {
          select: {
            documents: true,
            orders: true,
          },
        },
        inviter: {
          select: {
            email: true,
          },
        },
        orders: {
          select: {
            id: true,
            planId: true,
            planName: true,
            amount: true,
            status: true,
            paymentMethod: true,
            cardLast4: true,
            cardBrand: true,
            createdAt: true,
            completedAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 5, // 只取最近5个订单
        },
        subscriptions: {
          select: {
            id: true,
            status: true,
            currentPeriodEnd: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 1, // 只取最新的订阅
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error('获取用户列表错误:', error);
    return NextResponse.json(
      { error: '获取失败' },
      { status: 500 }
    );
  }
}

// 新增：更新用户信息的API
export async function PUT(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const adminUserId = verifyToken(token);
    if (!adminUserId) {
      return NextResponse.json({ error: '无效的令牌' }, { status: 401 });
    }

    const body = await request.json();
    const { userId, plan, pagesLimit, pagesUsed } = body;

    if (!userId) {
      return NextResponse.json({ error: '用户ID不能为空' }, { status: 400 });
    }

    // 更新用户信息
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(plan && { plan }),
        ...(pagesLimit !== undefined && { pagesLimit: parseInt(pagesLimit) }),
        ...(pagesUsed !== undefined && { pagesUsed: parseInt(pagesUsed) }),
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
