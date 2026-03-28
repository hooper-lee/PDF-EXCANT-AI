import { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getExtractionJobDetails } from '@/lib/services/extraction.service';
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

    const job = await getExtractionJobDetails(params.id, userId);
    if (!job) {
      return apiError('EXTRACTION_JOB_NOT_FOUND', '提取任务不存在', 404);
    }

    let parsedResult: unknown = null;
    if (job.resultJson) {
      try {
        parsedResult = JSON.parse(job.resultJson);
      } catch {
        parsedResult = null;
      }
    }

    return apiSuccess({
      job,
      result: parsedResult,
    });
  } catch (error) {
    console.error('获取提取任务错误:', error);
    return apiError('EXTRACTION_JOB_GET_FAILED', '获取失败', 500);
  }
}
