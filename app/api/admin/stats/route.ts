import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';
import { ORDER_STATUS, USER_PLAN } from '@/lib/domain-types';

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAdmin(request);
    if (!auth.ok) return auth.response;

    // 统计总用户数
    const totalUsers = await prisma.user.count();

    // 统计总文档数
    const totalDocuments = await prisma.document.count();

    // 统计总页数
    const pagesResult = await prisma.document.aggregate({
      _sum: {
        pageCount: true,
      },
    });
    const totalPages = pagesResult._sum.pageCount || 0;

    // 统计总收入（从订单表计算）
    const revenueResult = await prisma.order.aggregate({
      where: {
        status: ORDER_STATUS.COMPLETED,
      },
      _sum: {
        amount: true,
      },
    });
    const totalRevenue = revenueResult._sum.amount || 0;

    // 额外统计信息
    const monthlyUsers = await prisma.user.count({
      where: { plan: USER_PLAN.MONTHLY },
    });
    const yearlyUsers = await prisma.user.count({
      where: { plan: USER_PLAN.YEARLY },
    });
    const freeUsers = await prisma.user.count({
      where: { plan: USER_PLAN.FREE },
    });

    const totalOrders = await prisma.order.count();
    const completedOrders = await prisma.order.count({
      where: { status: ORDER_STATUS.COMPLETED },
    });

    return NextResponse.json({
      totalUsers,
      totalDocuments,
      totalPages,
      totalRevenue,
      usersByPlan: {
        free: freeUsers,
        monthly: monthlyUsers,
        yearly: yearlyUsers,
      },
      orders: {
        total: totalOrders,
        completed: completedOrders,
      },
    });
  } catch (error) {
    console.error('获取统计数据错误:', error);
    return NextResponse.json(
      { error: '获取失败' },
      { status: 500 }
    );
  }
}
