import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { USER_ROLE } from '@/lib/domain-types';

/**
 * 校验请求是否来自管理员：验证 JWT 并检查用户 role 为 ADMIN。
 * 用于所有 /api/admin/* 路由。
 */
export async function requireAdmin(
  request: NextRequest
): Promise<{ ok: true; userId: string } | { ok: false; response: NextResponse }> {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) {
    return { ok: false, response: NextResponse.json({ error: '未授权' }, { status: 401 }) };
  }

  const userId = verifyToken(token);
  if (!userId) {
    return { ok: false, response: NextResponse.json({ error: '无效的令牌' }, { status: 401 }) };
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true },
  });

  if (!user) {
    return { ok: false, response: NextResponse.json({ error: '用户不存在' }, { status: 404 }) };
  }

  if (user.role !== USER_ROLE.ADMIN) {
    return {
      ok: false,
      response: NextResponse.json({ error: '无权限访问管理后台' }, { status: 403 }),
    };
  }

  return { ok: true, userId: user.id };
}
