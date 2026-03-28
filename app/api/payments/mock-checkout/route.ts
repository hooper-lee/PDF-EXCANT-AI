import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { processMockPayment } from '@/lib/services/billing.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planId, email, cardNumber, expiryDate, cvc, cardholderName, country } = body;

    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 });
    }

    let userId: string;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
      userId = decoded.userId;
    } catch {
      return NextResponse.json({ error: '无效的token' }, { status: 401 });
    }

    const result = await processMockPayment({
      userId,
      planId,
      email,
      cardNumber,
      expiryDate,
      cvc,
      cardholderName,
      country,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Mock checkout 错误:', error);
    if (error instanceof Error) {
      if (
        error.message === '用户不存在' ||
        error.message === '无效的方案' ||
        error.message === '银行卡号无效' ||
        error.message === '有效期格式无效' ||
        error.message === 'CVC码无效' ||
        error.message === '银行卡已过期' ||
        error.message === '银行卡被拒绝' ||
        error.message === '处理错误，请稍后重试' ||
        error.message === '支付验证失败'
      ) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    }
    return NextResponse.json({ error: '支付处理失败，请稍后重试' }, { status: 500 });
  }
}
