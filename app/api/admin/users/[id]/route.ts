import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';
import { hashPassword } from '@/lib/auth';
import { USER_PLAN_VALUES } from '@/lib/domain-types';
import { adjustPagesByAdmin } from '@/lib/services/quota.service';

// 获取单个用户的详细信息
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await requireAdmin(request);
    if (!auth.ok) return auth.response;

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
    const auth = await requireAdmin(request);
    if (!auth.ok) return auth.response;

    const userId = params.id;
    const body = await request.json();
    const { plan, pagesLimit, pagesUsed, name } = body;

    // 验证套餐类型
    if (plan && !USER_PLAN_VALUES.includes(plan)) {
      return NextResponse.json({ error: '无效的套餐类型' }, { status: 400 });
    }

    const updatedUser = await adjustPagesByAdmin({
      userId,
      ...(plan ? { plan } : {}),
      ...(pagesLimit !== undefined ? { nextPagesLimit: parseInt(pagesLimit) } : {}),
      ...(pagesUsed !== undefined ? { nextPagesUsed: parseInt(pagesUsed) } : {}),
      ...(name !== undefined ? { name } : {}),
    });

    return NextResponse.json({ 
      message: '用户信息更新成功',
      user: updatedUser 
    });
  } catch (error) {
    console.error('更新用户信息错误:', error);
    if (error instanceof Error && error.message === '用户不存在') {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }
    return NextResponse.json(
      { error: '更新失败' },
      { status: 500 }
    );
  }
}

/** 管理员修改指定用户登录密码（用于后台用户修改密码） */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await requireAdmin(request);
    if (!auth.ok) return auth.response;

    const userId = params.id;
    const body = await request.json();
    const { newPassword } = body;

    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
      return NextResponse.json({ error: '新密码至少 6 位' }, { status: 400 });
    }

    const hashed = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    });

    return NextResponse.json({ message: '密码已更新' });
  } catch (error) {
    console.error('修改密码错误:', error);
    return NextResponse.json(
      { error: '修改失败' },
      { status: 500 }
    );
  }
}
