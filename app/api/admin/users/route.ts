import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';
import { hashPassword } from '@/lib/auth';
import { USER_PLAN_VALUES, USER_ROLE, USAGE_DIRECTION, USAGE_SOURCE } from '@/lib/domain-types';
import { createUsageRecord } from '@/lib/usage-record-service';

function generateInviteCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAdmin(request);
    if (!auth.ok) return auth.response;

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
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
    const auth = await requireAdmin(request);
    if (!auth.ok) return auth.response;

    const body = await request.json();
    const { userId, plan, pagesLimit, pagesUsed } = body;

    if (!userId) {
      return NextResponse.json({ error: '用户ID不能为空' }, { status: 400 });
    }

    if (plan && !USER_PLAN_VALUES.includes(plan)) {
      return NextResponse.json({ error: '无效的套餐类型' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        pagesLimit: true,
      },
    });

    if (!existingUser) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    const nextPagesLimit = pagesLimit !== undefined ? parseInt(pagesLimit) : existingUser.pagesLimit;

    const updatedUser = await prisma.$transaction(async (tx) => {
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          ...(plan && { plan }),
          ...(pagesLimit !== undefined && { pagesLimit: nextPagesLimit }),
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

      const delta = nextPagesLimit - existingUser.pagesLimit;
      if (delta !== 0) {
        await createUsageRecord(
          {
            userId,
            source: USAGE_SOURCE.ADMIN_ADJUST,
            direction: delta > 0 ? USAGE_DIRECTION.IN : USAGE_DIRECTION.OUT,
            pages: Math.abs(delta),
            note: `Admin adjusted pagesLimit from ${existingUser.pagesLimit} to ${nextPagesLimit}`,
          },
          tx
        );
      }

      return updatedUser;
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

/** 新增后台管理员用户（仅管理员可调用） */
export async function POST(request: NextRequest) {
  try {
    const auth = await requireAdmin(request);
    if (!auth.ok) return auth.response;

    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json({ error: '邮箱和密码不能为空' }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: '该邮箱已被使用' }, { status: 400 });
    }

    let inviteCode = 'ADMIN' + generateInviteCode();
    let attempts = 0;
    while (attempts < 5) {
      const taken = await prisma.user.findUnique({ where: { inviteCode } });
      if (!taken) break;
      inviteCode = 'ADMIN' + generateInviteCode();
      attempts++;
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        role: USER_ROLE.ADMIN,
        inviteCode,
        pagesLimit: 300,
        inviteCount: 0,
        invitePages: 0,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ message: '管理员创建成功', user });
  } catch (error) {
    console.error('创建管理员错误:', error);
    return NextResponse.json(
      { error: '创建失败' },
      { status: 500 }
    );
  }
}
