import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getSubscriptionsForUser } from '@/lib/services/billing.service';

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

    const subscriptions = await getSubscriptionsForUser(userId);
    return NextResponse.json({ subscriptions });
  } catch (error) {
    console.error('获取订阅列表错误:', error);
    return NextResponse.json({ error: '获取失败' }, { status: 500 });
  }
}
