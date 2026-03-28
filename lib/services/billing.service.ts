import { ORDER_STATUS, PAYMENT_METHOD, SUBSCRIPTION_STATUS, USER_PLAN } from '@/lib/domain';
import type { ProcessMockPaymentInput, ProcessMockPaymentResult } from '@/lib/contracts/billing';
import { prisma } from '@/lib/db/prisma-client';
import { createOrder } from '@/lib/repositories/order-repository';
import { findFirstSubscriptionByUserId, createSubscription, updateSubscription, findSubscriptionsByUserId } from '@/lib/repositories/subscription-repository';
import { findUserById } from '@/lib/repositories/user-repository';
import { findOrdersByUserId, findOrderByIdForUser } from '@/lib/repositories/order-repository';
import { grantPagesToUser } from '@/lib/services/quota.service';

const BILLING_PLANS = {
  free: { id: USER_PLAN.FREE, name: '免费版', amount: 0, pages: 300, period: 'lifetime' as const },
  monthly: { id: USER_PLAN.MONTHLY, name: '专业版', amount: 9.9, pages: 2000, period: 'month' as const },
  yearly: { id: USER_PLAN.YEARLY, name: '年度版', amount: 107, pages: 20400, period: 'year' as const },
};

export async function processMockPayment(input: ProcessMockPaymentInput): Promise<ProcessMockPaymentResult> {
  const user = await findUserById(input.userId);
  if (!user) {
    throw new Error('用户不存在');
  }

  const selectedPlan = BILLING_PLANS[input.planId as keyof typeof BILLING_PLANS];
  if (!selectedPlan) {
    throw new Error('无效的方案');
  }

  const validation = await simulatePaymentValidation({
    cardNumber: input.cardNumber,
    expiryDate: input.expiryDate,
    cvc: input.cvc,
    amount: selectedPlan.amount,
  });

  if (!validation.success) {
    throw new Error(validation.error || '支付验证失败');
  }

  const order = await createOrder({
    userId: input.userId,
    planId: selectedPlan.id,
    planName: selectedPlan.name,
    amount: selectedPlan.amount,
    currency: 'USD',
    status: ORDER_STATUS.COMPLETED,
    paymentMethod: PAYMENT_METHOD.CARD,
    cardLast4: input.cardNumber.slice(-4),
    cardBrand: getCardBrand(input.cardNumber),
    billingEmail: input.email,
    billingName: input.cardholderName,
    billingCountry: input.country,
    completedAt: new Date(),
  });

  let newPagesLimit = selectedPlan.pages;
  if (input.planId === 'free') {
    newPagesLimit = Math.max(user.pagesLimit, selectedPlan.pages);
  }

  const updatedUser = await prisma.$transaction(async (tx) => {
    const grantedPages = input.planId === 'free'
      ? Math.max(newPagesLimit - user.pagesLimit, 0)
      : selectedPlan.pages;

    const updatedUser = await grantPagesToUser(
      {
        userId: input.userId,
        pages: grantedPages,
        plan: selectedPlan.id,
        setPagesLimitTo: newPagesLimit,
        note: `${selectedPlan.name} grant`,
      },
      tx
    );

    if (input.planId !== 'free') {
      const periodEnd = new Date();
      if (selectedPlan.period === 'month') {
        periodEnd.setMonth(periodEnd.getMonth() + 1);
      } else if (selectedPlan.period === 'year') {
        periodEnd.setFullYear(periodEnd.getFullYear() + 1);
      }

      const existingSubscription = await findFirstSubscriptionByUserId(input.userId, tx);
      const subscriptionData = {
        stripeSubscriptionId: null,
        stripePriceId: null,
        status: SUBSCRIPTION_STATUS.ACTIVE,
        currentPeriodEnd: periodEnd,
      };

      if (existingSubscription) {
        await updateSubscription(existingSubscription.id, subscriptionData, tx);
      } else {
        await createSubscription(
          {
            userId: input.userId,
            ...subscriptionData,
          },
          tx
        );
      }

    }

    return updatedUser;
  });

  return {
    success: true,
    orderId: order.id,
    message: '模拟支付成功，套餐已生效。',
    user: {
      plan: updatedUser.plan,
      pagesLimit: updatedUser.pagesLimit,
      pagesUsed: updatedUser.pagesUsed,
    },
  };
}

async function simulatePaymentValidation(paymentData: {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  amount: number;
}) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const { cardNumber, expiryDate, cvc } = paymentData;

  if (!cardNumber || cardNumber.replace(/\s/g, '').length < 13) {
    return { success: false, error: '银行卡号无效' };
  }

  if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
    return { success: false, error: '有效期格式无效' };
  }

  if (!cvc || cvc.length < 3) {
    return { success: false, error: 'CVC码无效' };
  }

  const [month, year] = expiryDate.split('/').map(Number);
  const expiry = new Date(2000 + year, month - 1);
  const now = new Date();
  if (expiry < now) {
    return { success: false, error: '银行卡已过期' };
  }

  const cleanCardNumber = cardNumber.replace(/\s/g, '');
  if (cleanCardNumber.startsWith('4000000000000002')) {
    return { success: false, error: '银行卡被拒绝' };
  }

  if (cleanCardNumber.startsWith('4000000000000119')) {
    return { success: false, error: '处理错误，请稍后重试' };
  }

  return { success: true };
}

function getCardBrand(cardNumber: string): string {
  const cleanNumber = cardNumber.replace(/\s/g, '');

  if (cleanNumber.startsWith('4')) return 'Visa';
  if (cleanNumber.startsWith('5') || cleanNumber.startsWith('2')) return 'Mastercard';
  if (cleanNumber.startsWith('3')) return 'American Express';
  if (cleanNumber.startsWith('6')) return 'Discover';

  return 'Unknown';
}

export async function getOrdersForUser(userId: string) {
  return findOrdersByUserId(userId);
}

export async function getOrderForUser(orderId: string, userId: string) {
  return findOrderByIdForUser(orderId, userId);
}

export async function getSubscriptionsForUser(userId: string) {
  return findSubscriptionsByUserId(userId);
}
