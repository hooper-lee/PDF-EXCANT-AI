import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, generateToken } from '@/lib/auth';
import { USER_ROLE } from '@/lib/domain-types';

export async function POST(request: NextRequest) {
  try {
    const { email, password, admin: isAdminLogin } = await request.json();

    // 查找用户
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        role: true,
        plan: true,
        pagesUsed: true,
        pagesLimit: true,
        inviteCode: true,
        inviteCount: true,
        invitePages: true,
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: '邮箱或密码错误' },
        { status: 401 }
      );
    }

    // 验证密码
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: '邮箱或密码错误' },
        { status: 401 }
      );
    }

    // 前后台严格分离：仅后台登录(admin=true)允许管理员；前台登录拒绝管理员
    if (isAdminLogin) {
      if (user.role !== USER_ROLE.ADMIN) {
        return NextResponse.json(
          { error: '该账号不是管理员，请使用前台登录' },
          { status: 403 }
        );
      }
    } else {
      if (user.role === USER_ROLE.ADMIN) {
        return NextResponse.json(
          { error: '管理员请使用后台登录入口' },
          { status: 403 }
        );
      }
    }

    // 生成 token
    const token = generateToken(user.id);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        plan: user.plan,
        pagesUsed: user.pagesUsed,
        pagesLimit: user.pagesLimit,
        inviteCode: user.inviteCode,
        inviteCount: user.inviteCount,
        invitePages: user.invitePages,
      },
      token,
    });
  } catch (error) {
    console.error('登录错误:', error);
    return NextResponse.json(
      { error: '登录失败，请稍后重试' },
      { status: 500 }
    );
  }
}
