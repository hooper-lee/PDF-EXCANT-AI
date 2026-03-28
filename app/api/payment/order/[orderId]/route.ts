import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getOrderForUser } from '@/lib/services/billing.service';

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const { orderId } = params;

    // 验证用户token
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 });
    }

    let userId: string;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
      userId = decoded.userId;
    } catch (error) {
      return NextResponse.json({ error: '无效的token' }, { status: 401 });
    }

    // 获取订单详情
    const order = await getOrderForUser(orderId, userId);

    if (!order) {
      return NextResponse.json({ error: '订单不存在' }, { status: 404 });
    }

    return NextResponse.json(order);

  } catch (error) {
    console.error('获取订单详情错误:', error);
    return NextResponse.json(
      { error: '获取订单详情失败' },
      { status: 500 }
    );
  }
}
