import { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { apiError, apiSuccess } from '@/lib/api/response';
import {
  deleteSessionForUser,
  getSessionForUser,
  saveSessionForUser,
} from '@/lib/services/extract-session.service';

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

    const session = await getSessionForUser(params.id, userId);
    if (!session) {
      return apiError('EXTRACT_SESSION_NOT_FOUND', '会话不存在', 404);
    }

    return apiSuccess({ session });
  } catch (error) {
    console.error('获取会话详情错误:', error);
    return apiError('EXTRACT_SESSION_GET_FAILED', '获取会话失败', 500);
  }
}

export async function PATCH(
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

    const body = await request.json();
    const session = await saveSessionForUser(params.id, userId, {
      name: typeof body.name === 'string' ? body.name : undefined,
      selectedTemplateId:
        typeof body.selectedTemplateId === 'string' || body.selectedTemplateId === null
          ? body.selectedTemplateId
          : undefined,
      prompt: typeof body.prompt === 'string' ? body.prompt : undefined,
      parseRule: typeof body.parseRule === 'string' ? body.parseRule : undefined,
      sheetsJson: typeof body.sheetsJson === 'string' ? body.sheetsJson : undefined,
      activeSheetId:
        typeof body.activeSheetId === 'string' || body.activeSheetId === null
          ? body.activeSheetId
          : undefined,
    });

    return apiSuccess({ session });
  } catch (error) {
    console.error('保存会话错误:', error);
    if (error instanceof Error && error.message === '会话不存在') {
      return apiError('EXTRACT_SESSION_NOT_FOUND', error.message, 404);
    }
    return apiError('EXTRACT_SESSION_SAVE_FAILED', '保存会话失败', 500);
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

    await deleteSessionForUser(params.id, userId);
    return apiSuccess({ deleted: true });
  } catch (error) {
    console.error('删除会话错误:', error);
    if (error instanceof Error && error.message === '会话不存在') {
      return apiError('EXTRACT_SESSION_NOT_FOUND', error.message, 404);
    }
    return apiError('EXTRACT_SESSION_DELETE_FAILED', '删除会话失败', 500);
  }
}
