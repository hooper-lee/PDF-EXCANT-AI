import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, generateToken } from '@/lib/auth';
import { createUsageRecord } from '@/lib/usage-record-service';
import { USAGE_DIRECTION, USAGE_SOURCE } from '@/lib/domain-types';

function generateInviteCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, inviteCode } = await request.json();

    // 验证输入
    if (!email || !password) {
      return NextResponse.json(
        { error: '邮箱和密码不能为空' },
        { status: 400 }
      );
    }

    // 检查用户是否已存在
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: '该邮箱已被注册' },
        { status: 400 }
      );
    }

    let inviter = null;
    let invitedBy = null;

    // 如果有邀请码，验证邀请码
    if (inviteCode && inviteCode.trim()) {
      try {
        inviter = await prisma.user.findUnique({
          where: { inviteCode: inviteCode.toUpperCase() },
        });

        if (!inviter) {
          return NextResponse.json(
            { error: '邀请码无效' },
            { status: 400 }
          );
        }

        invitedBy = inviter.id;
      } catch (error) {
        console.error('邀请码验证错误:', error);
        // 邀请码验证失败时继续注册，但不使用邀请码
      }
    }

    // 生成新用户的邀请码
    let newInviteCode = generateInviteCode();
    let attempts = 0;
    while (attempts < 5) {
      try {
        const existing = await prisma.user.findUnique({ 
          where: { inviteCode: newInviteCode } 
        });
        if (!existing) break;
        newInviteCode = generateInviteCode();
        attempts++;
      } catch (error) {
        console.error('邀请码检查错误:', error);
        break;
      }
    }

    // 创建用户
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        inviteCode: newInviteCode,
        invitedBy,
        // 全局约定：新用户基础额度 300 页，被邀请注册则额外 +100 页
        pagesLimit: inviter ? 400 : 300,
        inviteCount: 0,
        invitePages: 0,
      },
    });

    // 如果是通过邀请注册，给邀请人增加页数和统计
    if (inviter) {
      try {
        await prisma.$transaction(async (tx) => {
          await tx.user.update({
            where: { id: inviter.id },
            data: {
              inviteCount: { increment: 1 },
              invitePages: { increment: 100 },
              pagesLimit: { increment: 100 },
            },
          });

          await createUsageRecord(
            {
              userId: inviter.id,
              source: USAGE_SOURCE.INVITE_REWARD,
              direction: USAGE_DIRECTION.IN,
              pages: 100,
              note: `Invite reward granted for inviting ${user.email}`,
            },
            tx
          );

          await createUsageRecord(
            {
              userId: user.id,
              source: USAGE_SOURCE.INVITE_REWARD,
              direction: USAGE_DIRECTION.IN,
              pages: 100,
              note: `Invite signup bonus from code ${inviteCode?.toUpperCase() ?? ''}`,
            },
            tx
          );
        });
      } catch (error) {
        console.error('更新邀请人统计错误:', error);
        // 不影响注册流程
      }
    }

    // 生成 token
    const token = generateToken(user.id);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        plan: user.plan,
        pagesUsed: user.pagesUsed,
        pagesLimit: user.pagesLimit,
        inviteCode: user.inviteCode,
        inviteCount: user.inviteCount || 0,
        invitePages: user.invitePages || 0,
      },
      token,
      inviteBonus: inviter ? 100 : 0,
    });
  } catch (error) {
    console.error('注册错误:', error);
    return NextResponse.json(
      { error: '注册失败，请稍后重试' },
      { status: 500 }
    );
  }
}
