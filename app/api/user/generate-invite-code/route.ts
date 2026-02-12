import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

function generateInviteCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const userId = verifyToken(token);
    if (!userId) {
      return NextResponse.json({ error: '无效的令牌' }, { status: 401 });
    }

    // 检查用户是否已有邀请码
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { inviteCode: true }
    });

    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    if (user.inviteCode) {
      return NextResponse.json({ inviteCode: user.inviteCode });
    }

    // 生成新的邀请码
    let inviteCode = generateInviteCode();
    while (await prisma.user.findUnique({ where: { inviteCode } })) {
      inviteCode = generateInviteCode();
    }

    // 更新用户邀请码
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { inviteCode },
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
      }
    });

    return NextResponse.json({ 
      inviteCode: updatedUser.inviteCode,
      user: updatedUser
    });
  } catch (error) {
    console.error('生成邀请码错误:', error);
    return NextResponse.json(
      { error: '生成失败' },
      { status: 500 }
    );
  }
}