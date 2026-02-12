import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

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

    // 简单验证：实际项目中应该检查用户是否是管理员
    // 这里为了演示，允许所有登录用户访问

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
        status: 'COMPLETED',
      },
      _sum: {
        amount: true,
      },
    });
    const totalRevenue = revenueResult._sum.amount || 0;

    // 额外统计信息
    const monthlyUsers = await prisma.user.count({
      where: { plan: 'MONTHLY' },
    });
    const yearlyUsers = await prisma.user.count({
      where: { plan: 'YEARLY' },
    });
    const freeUsers = await prisma.user.count({
      where: { plan: 'FREE' },
    });

    const totalOrders = await prisma.order.count();
    const completedOrders = await prisma.order.count({
      where: { status: 'COMPLETED' },
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
