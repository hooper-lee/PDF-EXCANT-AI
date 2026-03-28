import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import {
  getDocumentForUser,
  removeDocumentForUser,
} from '@/lib/services/document.service';
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

    const document = await getDocumentForUser(params.id, userId);

    if (!document) {
      return apiError('DOCUMENT_NOT_FOUND', '文档不存在', 404);
    }

    return apiSuccess({ document });
  } catch (error) {
    console.error('获取文档错误:', error);
    return apiError('DOCUMENT_GET_FAILED', '获取失败', 500);
  }
}

export async function DELETE(
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

    await removeDocumentForUser(params.id, userId);

    return apiSuccess({ deleted: true });
  } catch (error) {
    console.error('删除文档错误:', error);
    if (error instanceof Error && error.message === '文档不存在') {
      return apiError('DOCUMENT_NOT_FOUND', error.message, 404);
    }
    return apiError('DOCUMENT_DELETE_FAILED', '删除失败', 500);
  }
}
