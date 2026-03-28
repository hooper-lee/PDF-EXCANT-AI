import { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';
import {
  createExtractionJobForUser,
  getExtractionJobsForUser,
  startJob,
} from '@/lib/services/extraction.service';
import { assertExtractableFile } from '@/lib/documents/upload-file';
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

    const jobs = await getExtractionJobsForUser(userId);
    return apiSuccess({ jobs });
  } catch (error) {
    console.error('获取提取任务列表错误:', error);
    return apiError('EXTRACTION_JOB_LIST_FAILED', '获取失败', 500);
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

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const userPrompt = (formData.get('prompt') as string | null) || undefined;
    const templateId = formData.get('templateId') as string | null;

    assertExtractableFile(file);

    const { document, job } = await createExtractionJobForUser({
      userId,
      file,
      userPrompt,
      templateId: templateId || undefined,
    });

    void startJob({
      jobId: job.id,
      userId,
      documentId: document.id,
      file,
      userPrompt,
      templateId: templateId || undefined,
    }).catch((error) => {
      console.error('异步启动提取任务错误:', error);
    });

    return apiSuccess({
      job: {
        id: job.id,
        status: job.status,
      },
      document: {
        id: document.id,
        status: document.status,
      },
      poll: {
        statusUrl: `/api/extraction-jobs/${job.id}`,
      },
    });
  } catch (error) {
    console.error('创建提取任务错误:', error);
    if (error instanceof Error) {
      if (
        error.message === '请上传文件' ||
        error.message === '不支持的文件类型' ||
        error.message === '模板不存在'
      ) {
        const code =
          error.message === '模板不存在' ? 'TEMPLATE_NOT_FOUND' : 'VALIDATION_ERROR';
        return apiError(code, error.message, 400);
      }

      if (error.message === '页数配额不足，请升级套餐') {
        return apiError('QUOTA_EXCEEDED', error.message, 403);
      }

      if (error.message === '用户不存在') {
        return apiError('USER_NOT_FOUND', error.message, 404);
      }
    }

    return apiError('EXTRACTION_JOB_CREATE_FAILED', '处理失败，请稍后重试', 500);
  }
}
