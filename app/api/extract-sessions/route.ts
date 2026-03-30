import { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { apiError, apiSuccess } from '@/lib/api/response';
import {
  createSessionForUser,
  getSessionsForUser,
} from '@/lib/services/extract-session.service';

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

    const sessions = await getSessionsForUser(userId);
    return apiSuccess({ sessions });
  } catch (error) {
    console.error('获取会话列表错误:', error);
    return apiError('EXTRACT_SESSION_LIST_FAILED', '获取会话失败', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return apiError('UNAUTHORIZED', '未授权', 401);
    }

    const userId = verifyToken(token);
    if (!userId) {
      return apiError('INVALID_TOKEN', '无效的令牌', 401);
    }

    const body = await request.json().catch(() => ({}));
    const session = await createSessionForUser({
      userId,
      name: typeof body.name === 'string' ? body.name : undefined,
    });

    return apiSuccess({ session });
  } catch (error) {
    console.error('创建会话错误:', error);
    return apiError('EXTRACT_SESSION_CREATE_FAILED', '创建会话失败', 500);
  }
}
