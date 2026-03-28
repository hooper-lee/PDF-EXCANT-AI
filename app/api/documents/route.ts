import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getDocumentsForUser } from '@/lib/services/document.service';
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

    const documents = await getDocumentsForUser(userId);

    return apiSuccess({ documents });
  } catch (error) {
    console.error('获取文档列表错误:', error);
    return apiError('DOCUMENT_LIST_FAILED', '获取失败', 500);
  }
}
