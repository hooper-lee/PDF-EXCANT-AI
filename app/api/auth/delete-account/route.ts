import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest) {
  try {
    // 验证JWT token
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: '未授权访问' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    let decoded;
    
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    } catch (error) {
      return NextResponse.json(
        { error: '无效的访问令牌' },
        { status: 401 }
      );
    }

    // 查找用户
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      );
    }

    // 删除用户相关的所有数据
    await prisma.$transaction(async (tx) => {
      // 删除用户的文档
      await tx.document.deleteMany({
        where: { userId: user.id }
      });

      // 删除用户的订单
      await tx.order.deleteMany({
        where: { userId: user.id }
      });

      // 删除用户的订阅
      await tx.subscription.deleteMany({
        where: { userId: user.id }
      });

      // 最后删除用户
      await tx.user.delete({
        where: { id: user.id }
      });
    });

    return NextResponse.json({
      success: true,
      message: '账户删除成功'
    });

  } catch (error) {
    console.error('删除账户失败:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}