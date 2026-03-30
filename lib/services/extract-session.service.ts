import {
  createExtractSession,
  deleteExtractSessionById,
  findExtractSessionByIdForUser,
  findExtractSessionsByUserId,
  updateExtractSessionById,
} from '@/lib/repositories/extract-session-repository';

const DEFAULT_SHEETS_JSON = JSON.stringify([
  { id: 'sheet1', name: 'Sheet1', data: [], headers: [] },
]);

interface CreateExtractSessionInput {
  userId: string;
  name?: string;
}

interface SaveExtractSessionInput {
  name?: string;
  selectedTemplateId?: string | null;
  prompt?: string;
  parseRule?: string;
  sheetsJson?: string;
  activeSheetId?: string | null;
}

export async function createSessionForUser({
  userId,
  name,
}: CreateExtractSessionInput) {
  const existingSessions = await findExtractSessionsByUserId(userId);
  const nextName = name?.trim() || `对话 ${existingSessions.length + 1}`;

  return createExtractSession({
    userId,
    name: nextName,
    selectedTemplateId: null,
    prompt: '',
    parseRule: '',
    sheetsJson: DEFAULT_SHEETS_JSON,
    activeSheetId: 'sheet1',
  });
}

export async function getSessionsForUser(userId: string) {
  return findExtractSessionsByUserId(userId);
}

export async function getSessionForUser(sessionId: string, userId: string) {
  return findExtractSessionByIdForUser(sessionId, userId);
}

export async function assertSessionOwnership(sessionId: string, userId: string) {
  const session = await findExtractSessionByIdForUser(sessionId, userId);
  if (!session) {
    throw new Error('会话不存在');
  }

  return session;
}

export async function saveSessionForUser(
  sessionId: string,
  userId: string,
  input: SaveExtractSessionInput
) {
  await assertSessionOwnership(sessionId, userId);

  return updateExtractSessionById(sessionId, {
    name: input.name?.trim() || undefined,
    selectedTemplateId:
      typeof input.selectedTemplateId === 'undefined'
        ? undefined
        : input.selectedTemplateId || null,
    prompt: typeof input.prompt === 'undefined' ? undefined : input.prompt,
    parseRule: typeof input.parseRule === 'undefined' ? undefined : input.parseRule,
    sheetsJson: typeof input.sheetsJson === 'undefined' ? undefined : input.sheetsJson,
    activeSheetId:
      typeof input.activeSheetId === 'undefined' ? undefined : input.activeSheetId || null,
  });
}

export async function deleteSessionForUser(sessionId: string, userId: string) {
  await assertSessionOwnership(sessionId, userId);
  return deleteExtractSessionById(sessionId);
}
