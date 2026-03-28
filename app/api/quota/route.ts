import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getQuotaSummaryForUser } from '@/lib/services/quota.service';
import { apiError, apiSuccess } from '@/lib/api/response';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return apiError('UNAUTHORIZED', '未授权', 401);
    }

    const userId = verifyToken(token);
    if (!userId) {
      return apiError('INVALID_TOKEN', '无效的令牌', 401);
    }

    const quota = await getQuotaSummaryForUser(userId);
    return apiSuccess({ quota });
  } catch (error) {
    console.error('获取额度摘要错误:', error);
    if (error instanceof Error && error.message === '用户不存在') {
      return apiError('USER_NOT_FOUND', error.message, 404);
    }
    return apiError('QUOTA_GET_FAILED', '获取失败', 500);
  }
}
