import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getDocumentJobsForUser } from '@/lib/services/document.service';
import { apiError, apiSuccess } from '@/lib/api/response';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return apiError('UNAUTHORIZED', '未授权', 401);
    }

    const userId = verifyToken(token);
    if (!userId) {
      return apiError('INVALID_TOKEN', '无效的令牌', 401);
    }

    const jobs = await getDocumentJobsForUser(params.id, userId);
    return apiSuccess({ jobs });
  } catch (error) {
    console.error('获取文档任务列表错误:', error);
    if (error instanceof Error && error.message === '文档不存在') {
      return apiError('DOCUMENT_NOT_FOUND', error.message, 404);
    }
    return apiError('DOCUMENT_JOBS_LIST_FAILED', '获取失败', 500);
  }
}
