import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      planId,
      email,
      cardNumber,
      expiryDate,
      cvc,
      cardholderName,
      country
    } = body;

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

    // 获取用户信息
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    // 定义方案信息
    const plans = {
      free: { name: '免费版', amount: 0, pages: 300, period: 'lifetime' },
      monthly: { name: '专业版', amount: 9.9, pages: 2000, period: 'month' },
      yearly: { name: '年度版', amount: 107, pages: 20400, period: 'year' }
    };

    const selectedPlan = plans[planId as keyof typeof plans];
    if (!selectedPlan) {
      return NextResponse.json({ error: '无效的方案' }, { status: 400 });
    }

    // 模拟支付验证
    const isPaymentValid = await simulatePaymentValidation({
      cardNumber,
      expiryDate,
      cvc,
      amount: selectedPlan.amount
    });

    if (!isPaymentValid.success) {
      return NextResponse.json({ 
        error: isPaymentValid.error || '支付验证失败' 
      }, { status: 400 });
    }

    // 创建订单
    const order = await (prisma as any).order.create({
      data: {
        userId,
        planId,
        planName: selectedPlan.name,
        amount: selectedPlan.amount,
        currency: 'USD',
        status: 'COMPLETED',
        paymentMethod: 'card',
        cardLast4: cardNumber.slice(-4),
        cardBrand: getCardBrand(cardNumber),
        billingEmail: email,
        billingName: cardholderName,
        billingCountry: country,
        completedAt: new Date()
      }
    });

    // 更新用户订阅状态
    let newPagesLimit = selectedPlan.pages;
    let newPlan = planId.toUpperCase();
    
    // 如果是免费版，保持当前页数限制
    if (planId === 'free') {
      newPagesLimit = Math.max(user.pagesLimit, selectedPlan.pages);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        plan: newPlan,
        pagesLimit: newPagesLimit
      }
    });

    // 如果不是免费版，创建或更新订阅记录
    if (planId !== 'free') {
      const periodEnd = new Date();
      if (selectedPlan.period === 'month') {
        periodEnd.setMonth(periodEnd.getMonth() + 1);
      } else if (selectedPlan.period === 'year') {
        periodEnd.setFullYear(periodEnd.getFullYear() + 1);
      }

      // 查找现有订阅
      const existingSubscription = await prisma.subscription.findFirst({
        where: { userId }
      });

      if (existingSubscription) {
        // 更新现有订阅
        await prisma.subscription.update({
          where: { id: existingSubscription.id },
          data: {
            stripeSubscriptionId: `sub_${Date.now()}`, // 模拟订阅ID
            status: 'active',
            currentPeriodEnd: periodEnd,
            stripePriceId: planId
          }
        });
      } else {
        // 创建新订阅
        await prisma.subscription.create({
          data: {
            userId,
            stripeSubscriptionId: `sub_${Date.now()}`, // 模拟订阅ID
            status: 'active',
            currentPeriodEnd: periodEnd,
            stripePriceId: planId
          }
        });
      }
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      message: '支付成功！',
      user: {
        plan: updatedUser.plan,
        pagesLimit: updatedUser.pagesLimit,
        pagesUsed: updatedUser.pagesUsed
      }
    });

  } catch (error) {
    console.error('支付处理错误:', error);
    return NextResponse.json(
      { error: '支付处理失败，请稍后重试' },
      { status: 500 }
    );
  }
}

// 模拟支付验证
async function simulatePaymentValidation(paymentData: {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  amount: number;
}) {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 2000));

  const { cardNumber, expiryDate, cvc } = paymentData;

  // 基础验证
  if (!cardNumber || cardNumber.replace(/\s/g, '').length < 13) {
    return { success: false, error: '银行卡号无效' };
  }

  if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
    return { success: false, error: '有效期格式无效' };
  }

  if (!cvc || cvc.length < 3) {
    return { success: false, error: 'CVC码无效' };
  }

  // 检查有效期是否过期
  const [month, year] = expiryDate.split('/').map(Number);
  const expiry = new Date(2000 + year, month - 1);
  const now = new Date();
  
  if (expiry < now) {
    return { success: false, error: '银行卡已过期' };
  }

  // 模拟特定卡号的测试场景
  const cleanCardNumber = cardNumber.replace(/\s/g, '');
  
  // 测试失败的卡号
  if (cleanCardNumber.startsWith('4000000000000002')) {
    return { success: false, error: '银行卡被拒绝' };
  }
  
  if (cleanCardNumber.startsWith('4000000000000119')) {
    return { success: false, error: '处理错误，请稍后重试' };
  }

  // 其他情况都成功
  return { success: true };
}

// 获取银行卡品牌
function getCardBrand(cardNumber: string): string {
  const cleanNumber = cardNumber.replace(/\s/g, '');
  
  if (cleanNumber.startsWith('4')) return 'Visa';
  if (cleanNumber.startsWith('5') || cleanNumber.startsWith('2')) return 'Mastercard';
  if (cleanNumber.startsWith('3')) return 'American Express';
  if (cleanNumber.startsWith('6')) return 'Discover';
  
  return 'Unknown';
}