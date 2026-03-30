'use client';

import { useEffect, useRef, useState } from 'react';
import { 
  Upload, Loader2, Download, Home, Save, Plus, X, Settings, FileText,
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  Undo2, Redo2, Type, Palette, Grid3x3, Hash, Calendar,
  DollarSign, Percent, FileSpreadsheet, Sparkles, ChevronDown,
  Copy, Clipboard, Scissors, Filter, ArrowUp, ArrowDown,
  Layers, WrapText, ChevronRight, ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import UserInfo from '../components/UserInfo';
import { useTranslation } from '@/lib/useLanguage';
import type { JobStatus } from '@/lib/domain-types';
import { JOB_STATUS, USER_ROLE } from '@/lib/domain-types';

interface SheetData {
  id: string;
  name: string;
  data: CellData[][];
  headers: string[];
}

interface CellStyle {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  fontSize?: number;
  fontFamily?: string;
  textAlign?: 'left' | 'center' | 'right';
  backgroundColor?: string;
  textColor?: string;
  border?: string;
  numberFormat?: string;
  wrapText?: boolean;
  indent?: number;
}

interface CellData {
  value: string;
  formula?: string;
  computed?: number | string;
}

interface CellFormat {
  [key: string]: CellStyle;
}

interface HistoryState {
  sheets: SheetData[];
  cellFormats: CellFormat;
  activeSheetId: string;
}

interface ExtractionJobInfo {
  id: string;
  status: JobStatus;
  documentId?: string | null;
  errorMessage?: string | null;
  finishedAt?: string | null;
  lastStep?: string | null;
}

interface ExtractionTemplate {
  id: string;
  name: string;
  description?: string | null;
  schemaJson?: string | null;
  promptText: string;
}

interface ExtractSessionRecord {
  id: string;
  name: string;
  selectedTemplateId?: string | null;
  prompt?: string | null;
  parseRule?: string | null;
  sheetsJson?: string | null;
  activeSheetId?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ExtractSessionSavePayload {
  name: string;
  selectedTemplateId: string | null;
  prompt: string;
  parseRule: string;
  sheetsJson: string;
  activeSheetId: string;
}

const DEFAULT_COLUMN_COUNT = 10;
const DEFAULT_ROW_COUNT = 20;
const DISABLED_TOOL_BUTTON_CLASS =
  'p-2 rounded transition-colors opacity-30 cursor-not-allowed text-gray-400';
const DEFAULT_CELL_FORMAT: CellStyle = {
  bold: false,
  italic: false,
  underline: false,
  strikethrough: false,
  fontSize: 11,
  fontFamily: 'Arial',
  textAlign: 'left',
  backgroundColor: '#ffffff',
  textColor: '#000000',
  border: 'none',
  numberFormat: 'general',
  wrapText: false,
  indent: 0,
};

function createEmptyCell(): CellData {
  return { value: '', formula: undefined, computed: undefined };
}

function normalizeCellData(cell: unknown): CellData {
  if (typeof cell === 'object' && cell !== null) {
    const candidate = cell as Partial<CellData>;
    return {
      value: typeof candidate.value === 'string' ? candidate.value : String(candidate.value ?? ''),
      formula: typeof candidate.formula === 'string' ? candidate.formula : undefined,
      computed:
        typeof candidate.computed === 'undefined' ? undefined : (candidate.computed as number | string),
    };
  }

  return {
    value: String(cell ?? ''),
    formula: undefined,
    computed: undefined,
  };
}

function createSheetGrid(rowCount = DEFAULT_ROW_COUNT, columnCount = DEFAULT_COLUMN_COUNT): CellData[][] {
  return Array.from({ length: rowCount }, () =>
    Array.from({ length: columnCount }, () => createEmptyCell())
  );
}

function normalizeSheetData(sheet: Partial<SheetData> | null | undefined, fallbackId: string, fallbackName: string): SheetData {
  const rawRows = Array.isArray(sheet?.data) ? sheet!.data : [];
  const headerCount = Array.isArray(sheet?.headers) ? sheet!.headers.length : 0;
  const widestRow = rawRows.reduce((max, row) => Math.max(max, Array.isArray(row) ? row.length : 0), 0);
  const columnCount = Math.max(DEFAULT_COLUMN_COUNT, headerCount, widestRow);
  const rowCount = Math.max(DEFAULT_ROW_COUNT, rawRows.length);

  return {
    id: sheet?.id || fallbackId,
    name: sheet?.name || fallbackName,
    headers: Array.isArray(sheet?.headers) ? sheet!.headers : [],
    data: Array.from({ length: rowCount }, (_, rowIndex) =>
      Array.from({ length: columnCount }, (_, colIndex) =>
        normalizeCellData(rawRows[rowIndex]?.[colIndex])
      )
    ),
  };
}

function createSheet(id: string, name: string): SheetData {
  return normalizeSheetData({ id, name, data: [], headers: [] }, id, name);
}

function sanitizeExportCell(cell: unknown): CellData {
  return normalizeCellData(cell);
}

function sanitizeExportSheets(sheets: SheetData[]): SheetData[] {
  return sheets.map((sheet, index) =>
    normalizeSheetData(
      {
        id: sheet?.id || `sheet${index + 1}`,
        name: sheet?.name || `Sheet${index + 1}`,
        headers: Array.isArray(sheet?.headers) ? sheet.headers : [],
        data: Array.isArray(sheet?.data)
          ? sheet.data.map((row) =>
              Array.isArray(row) ? row.map((cell) => sanitizeExportCell(cell)) : []
            )
          : [],
      },
      sheet?.id || `sheet${index + 1}`,
      sheet?.name || `Sheet${index + 1}`
    )
  );
}

const DEFAULT_SHEET: SheetData = createSheet('sheet1', 'Sheet1');

function safeParseJson<T>(raw: string | null, fallback: T): T {
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error('JSON 解析失败，已回退到默认值:', error);
    return fallback;
  }
}

export default function ExtractPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);
  const [sheets, setSheets] = useState<SheetData[]>([DEFAULT_SHEET]);
  const [activeSheetId, setActiveSheetId] = useState(DEFAULT_SHEET.id);
  const [templates, setTemplates] = useState<ExtractionTemplate[]>([]);
  const [showSelectTemplateDialog, setShowSelectTemplateDialog] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [cellFormats, setCellFormats] = useState<CellFormat>({});
  const [currentFormat, setCurrentFormat] = useState<CellStyle>(DEFAULT_CELL_FORMAT);
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [formulaBarValue, setFormulaBarValue] = useState('');
  const [showParseRuleDialog, setShowParseRuleDialog] = useState(false);
  const [parseRule, setParseRule] = useState('');
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [conversationName, setConversationName] = useState(t.extract.conversation + ' 3');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('');
  const [latestJob, setLatestJob] = useState<ExtractionJobInfo | null>(null);
  const [sessions, setSessions] = useState<ExtractSessionRecord[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState('');
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [savingSession, setSavingSession] = useState(false);
  const historyRef = useRef<HistoryState[]>([]);
  const historyIndexRef = useRef(-1);
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedSessionSnapshotRef = useRef('');

  const resetWorkspace = (nextName?: string) => {
    const nextSheets = [createSheet(DEFAULT_SHEET.id, DEFAULT_SHEET.name)];
    setFile(null);
    setPrompt('');
    setError('');
    setParseRule('');
    setSelectedTemplateId('');
    setSheets(nextSheets);
    setActiveSheetId(DEFAULT_SHEET.id);
    setCellFormats({});
    setLatestJob(null);
    setSelectedCell(null);
    setFormulaBarValue('');
    setCurrentFormat(DEFAULT_CELL_FORMAT);
    setConversationName(nextName || `${t.extract.conversation} 1`);
    setIsEditingName(false);
    setTempName('');
    resetHistoryState(nextSheets, {}, DEFAULT_SHEET.id);
  };

  const getSheetColumnCount = (sheet: SheetData) => {
    if (sheet.headers.length > 0) {
      return sheet.headers.length;
    }

    const widestRow = sheet.data.reduce((max, row) => Math.max(max, row?.length || 0), 0);
    return Math.max(DEFAULT_COLUMN_COUNT, widestRow);
  };

  const getCellDisplayValue = (sheet: SheetData, rowIndex: number, colIndex: number) => {
    const rawCell = sheet.data[rowIndex]?.[colIndex];
    if (!rawCell) {
      return '';
    }

    const cell =
      typeof rawCell === 'object' && rawCell !== null
        ? rawCell
        : { value: String(rawCell || ''), formula: undefined, computed: undefined };

    if (cell.formula) {
      return cell.computed !== undefined ? String(cell.computed) : cell.value;
    }

    return cell.value || '';
  };

  const cloneSheets = (value: SheetData[]) => JSON.parse(JSON.stringify(value)) as SheetData[];
  const cloneCellFormats = (value: CellFormat) => JSON.parse(JSON.stringify(value)) as CellFormat;

  const buildHistoryState = (
    nextSheets: SheetData[],
    nextCellFormats: CellFormat,
    nextActiveSheetId: string
  ): HistoryState => ({
    sheets: cloneSheets(nextSheets),
    cellFormats: cloneCellFormats(nextCellFormats),
    activeSheetId: nextActiveSheetId,
  });

  const resetHistoryState = (
    nextSheets: SheetData[],
    nextCellFormats: CellFormat,
    nextActiveSheetId: string
  ) => {
    const initialHistory = [buildHistoryState(nextSheets, nextCellFormats, nextActiveSheetId)];
    historyRef.current = initialHistory;
    historyIndexRef.current = 0;
    setHistory(initialHistory);
    setHistoryIndex(0);
  };

  const pushHistoryState = (
    nextSheets: SheetData[],
    nextCellFormats: CellFormat,
    nextActiveSheetId: string
  ) => {
    const nextHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
    nextHistory.push(buildHistoryState(nextSheets, nextCellFormats, nextActiveSheetId));
    historyRef.current = nextHistory;
    historyIndexRef.current = nextHistory.length - 1;
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
  };

  const syncSelectionState = (
    nextSheets: SheetData[],
    nextCellFormats: CellFormat,
    nextActiveSheetId: string
  ) => {
    const currentSheet = nextSheets.find((sheet) => sheet.id === nextActiveSheetId) || nextSheets[0];
    if (!currentSheet) {
      setSelectedCell(null);
      setFormulaBarValue('');
      return;
    }

    if (
      selectedCell &&
      currentSheet.data[selectedCell.row] &&
      currentSheet.data[selectedCell.row][selectedCell.col]
    ) {
      const cell = currentSheet.data[selectedCell.row][selectedCell.col];
      setFormulaBarValue(cell.formula || cell.value || '');
      const cellKey = `${currentSheet.id}-${selectedCell.row}-${selectedCell.col}`;
      setCurrentFormat(nextCellFormats[cellKey] || DEFAULT_CELL_FORMAT);
      return;
    }

    setSelectedCell(null);
    setFormulaBarValue('');
    setCurrentFormat(DEFAULT_CELL_FORMAT);
  };

  const applyHistorySnapshot = (snapshot: HistoryState) => {
    const nextSheets = cloneSheets(snapshot.sheets);
    const nextCellFormats = cloneCellFormats(snapshot.cellFormats);
    const nextActiveSheetId =
      nextSheets.find((sheet) => sheet.id === snapshot.activeSheetId)?.id || nextSheets[0]?.id || DEFAULT_SHEET.id;

    setSheets(nextSheets);
    setCellFormats(nextCellFormats);
    setActiveSheetId(nextActiveSheetId);
    syncSelectionState(nextSheets, nextCellFormats, nextActiveSheetId);
  };

  useEffect(() => {
    historyRef.current = history;
    historyIndexRef.current = historyIndex;
  }, [history, historyIndex]);

  const updateSheetWithData = (data: any) => {
    let rows: any[] = [];
    let headers: string[] = [];
    
    if (Array.isArray(data)) {
      rows = data;
      if (rows.length > 0) {
        headers = Object.keys(rows[0]);
      }
    } else if (typeof data === 'object' && data !== null) {
      if (data.data && Array.isArray(data.data)) {
        rows = data.data;
        if (rows.length > 0) {
          headers = Object.keys(rows[0]);
        }
      } else {
        headers = ['字段', '值'];
        rows = Object.entries(data).map(([key, value]) => ({ '字段': key, '值': value }));
      }
    }

    const rowCount = Math.max(DEFAULT_ROW_COUNT, rows.length);
    const columnCount = Math.max(DEFAULT_COLUMN_COUNT, headers.length);
    const tableData: CellData[][] = Array.from({ length: rowCount }, (_, rowIndex) =>
      Array.from({ length: columnCount }, (_, colIndex) => {
        if (rowIndex >= rows.length || colIndex >= headers.length) {
          return createEmptyCell();
        }

        return {
          value: String(rows[rowIndex]?.[headers[colIndex]] ?? ''),
          formula: undefined,
          computed: undefined,
        };
      })
    );

    const nextSheets = [normalizeSheetData(
      {
        id: DEFAULT_SHEET.id,
        name: DEFAULT_SHEET.name,
        data: tableData,
        headers,
      },
      DEFAULT_SHEET.id,
      DEFAULT_SHEET.name
    )];

    setSheets(nextSheets);
    setActiveSheetId(DEFAULT_SHEET.id);
    setCellFormats({});
    setSelectedCell(null);
    setFormulaBarValue('');
    setCurrentFormat(DEFAULT_CELL_FORMAT);
    resetHistoryState(nextSheets, {}, DEFAULT_SHEET.id);
  };

  const serializeSheets = () => JSON.stringify(sheets);

  const buildSessionSavePayload = (override?: Partial<ExtractSessionSavePayload>): ExtractSessionSavePayload => ({
    name: override?.name ?? conversationName,
    selectedTemplateId: override?.selectedTemplateId ?? (selectedTemplateId || null),
    prompt: override?.prompt ?? prompt,
    parseRule: override?.parseRule ?? parseRule,
    sheetsJson: override?.sheetsJson ?? serializeSheets(),
    activeSheetId: override?.activeSheetId ?? activeSheetId,
  });

  const buildSessionSnapshot = (payload: ExtractSessionSavePayload) => JSON.stringify(payload);

  const hydrateSession = (session: ExtractSessionRecord) => {
    setCurrentSessionId(session.id);
    setConversationName(session.name);
    setPrompt(session.prompt || '');
    setParseRule(session.parseRule || '');
    setSelectedTemplateId(session.selectedTemplateId || '');
    const parsedSheets = safeParseJson<SheetData[] | null>(session.sheetsJson || null, null);
    const nextSheets =
      Array.isArray(parsedSheets) && parsedSheets.length > 0
        ? parsedSheets.map((sheet, index) =>
            normalizeSheetData(sheet, `sheet${index + 1}`, `Sheet${index + 1}`)
          )
        : [createSheet(DEFAULT_SHEET.id, DEFAULT_SHEET.name)];
    setSheets(nextSheets);
    setActiveSheetId(session.activeSheetId || nextSheets[0].id || DEFAULT_SHEET.id);
    setCellFormats({});
    setLatestJob(null);
    setSelectedCell(null);
    setFormulaBarValue('');
    setCurrentFormat(DEFAULT_CELL_FORMAT);
    setFile(null);
    setError('');
    lastSavedSessionSnapshotRef.current = buildSessionSnapshot({
      name: session.name,
      selectedTemplateId: session.selectedTemplateId || null,
      prompt: session.prompt || '',
      parseRule: session.parseRule || '',
      sheetsJson: JSON.stringify(nextSheets),
      activeSheetId: session.activeSheetId || nextSheets[0].id || DEFAULT_SHEET.id,
    });
    resetHistoryState(nextSheets, {}, session.activeSheetId || nextSheets[0].id || DEFAULT_SHEET.id);
  };

  const createSession = async (token: string, name?: string) => {
    const response = await fetch('/api/extract-sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error('创建会话失败');
    }

    const payload = await response.json();
    return (payload?.data?.session || payload?.session) as ExtractSessionRecord;
  };

  const loadSession = async (sessionId: string, token: string) => {
    const response = await fetch(`/api/extract-sessions/${sessionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('加载会话失败');
    }

    const payload = await response.json();
    const session = (payload?.data?.session || payload?.session) as ExtractSessionRecord | undefined;
    if (!session) {
      throw new Error('会话不存在');
    }

    hydrateSession(session);
    return session;
  };

  const saveCurrentSession = async (override?: Partial<ExtractSessionSavePayload>) => {
    if (!currentSessionId) {
      return null;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('未登录');
    }

    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
      autoSaveTimerRef.current = null;
    }

    setSavingSession(true);
    try {
      const sessionPayload = buildSessionSavePayload(override);
      const response = await fetch(`/api/extract-sessions/${currentSessionId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionPayload),
      });

      if (!response.ok) {
        throw new Error('保存会话失败');
      }

      const payload = await response.json();
      const session = (payload?.data?.session || payload?.session) as ExtractSessionRecord;
      setSessions((prev) =>
        prev
          .map((item) => (item.id === session.id ? session : item))
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      );
      lastSavedSessionSnapshotRef.current = buildSessionSnapshot(sessionPayload);
      return session;
    } finally {
      setSavingSession(false);
    }
  };

  const handleCreateSession = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const session = await createSession(token);
      setSessions((prev) => [session, ...prev]);
      hydrateSession(session);
    } catch (createError) {
      console.error('创建会话失败:', createError);
      setError(createError instanceof Error ? createError.message : '创建会话失败');
    }
  };

  const handleOpenSession = async (sessionId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      await loadSession(sessionId, token);
    } catch (openError) {
      console.error('加载会话失败:', openError);
      setError(openError instanceof Error ? openError.message : '加载会话失败');
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    const parsedUser = safeParseJson<any>(userData, null);
    if (!parsedUser?.id) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      router.replace('/login');
      return;
    }
    if (parsedUser?.role === USER_ROLE.ADMIN) {
      router.replace('/admin');
      return;
    }
    setUser(parsedUser);
    
    // 如果用户没有邀请码，生成一个
    if (!parsedUser.inviteCode) {
      generateInviteCode();
    }
    
    const initializePage = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        await fetchTemplates();

        const response = await fetch('/api/extract-sessions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('加载会话失败');
        }

        const payload = await response.json();
        const sessionList = (payload?.data?.sessions || payload?.sessions || []) as ExtractSessionRecord[];
        const querySessionId = searchParams.get('sessionId');

        if (sessionList.length === 0) {
          const created = await createSession(token);
          setSessions([created]);
          hydrateSession(created);
          return;
        }

        setSessions(sessionList);
        const initialSession =
          sessionList.find((item) => item.id === querySessionId) || sessionList[0];
        hydrateSession(initialSession);
      } catch (initError) {
        console.error('初始化 extract 页面失败:', initError);
        setError(initError instanceof Error ? initError.message : '初始化页面失败');
        resetWorkspace();
      } finally {
        setLoadingSessions(false);
      }
    };

    void initializePage();
  }, []);

  useEffect(() => {
    if (loadingSessions || !currentSessionId) {
      return;
    }

    const nextSnapshot = buildSessionSnapshot(buildSessionSavePayload());
    if (nextSnapshot === lastSavedSessionSnapshotRef.current) {
      return;
    }

    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    autoSaveTimerRef.current = setTimeout(() => {
      void saveCurrentSession().catch((saveError) => {
        console.error('自动保存会话失败:', saveError);
        setError(saveError instanceof Error ? saveError.message : '自动保存失败');
      });
    }, 800);

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
        autoSaveTimerRef.current = null;
      }
    };
  }, [
    loadingSessions,
    currentSessionId,
    conversationName,
    prompt,
    parseRule,
    selectedTemplateId,
    activeSheetId,
    sheets,
  ]);

  useEffect(() => {
    const docId = searchParams.get('docId');
    if (!user?.id || !docId || !currentSessionId) {
      return;
    }

      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      const loadDocument = async () => {
        try {
          const response = await fetch(`/api/documents/${docId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('加载提取记录失败');
          }

          const payload = await response.json();
          const document = payload?.data?.document || payload?.document;
          if (!document) {
            throw new Error('提取记录不存在');
          }

          setConversationName(document.originalName || `${t.extract.conversation} 1`);
          if (document.extractedData) {
            const parsedData = safeParseJson(document.extractedData, {});
            updateSheetWithData(parsedData);
          }
          const newestJob = document.extractionJobs?.[0];
          setLatestJob(
            newestJob
              ? {
                  id: newestJob.id,
                  status: newestJob.status,
                  errorMessage: newestJob.errorMessage,
                  finishedAt: newestJob.finishedAt,
                }
              : null
          );
        } catch (loadError) {
          console.error('加载提取记录失败:', loadError);
          setError(loadError instanceof Error ? loadError.message : '加载提取记录失败');
        }
      };

      loadDocument();
  }, [searchParams, user?.id, currentSessionId, t.extract.conversation]);

  const generateInviteCode = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/user/generate-invite-code', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          // 更新localStorage中的用户数据
          localStorage.setItem('user', JSON.stringify(data.user));
          setUser(data.user);
        }
      }
    } catch (error) {
      console.error('生成邀请码失败:', error);
    }
  };

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/extraction-templates');
      if (!response.ok) {
        throw new Error('加载模板失败');
      }

      const data = await response.json();
      setTemplates(data.templates || []);
    } catch (error) {
      console.error('加载模板失败:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
    }
  };

  const applyExtractionJobResult = (result: unknown) => {
    if (result && (Array.isArray(result) || typeof result === 'object')) {
      updateSheetWithData(result);
      return true;
    }

    return false;
  };

  const fetchJobStatus = async (jobId: string, token: string) => {
    const response = await fetch(`/api/extraction-jobs/${jobId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      throw new Error(payload?.error?.message || payload?.error || '获取任务状态失败');
    }

    const payload = await response.json();
    const job = payload?.data?.job || payload?.job;
    const result = payload?.data?.result ?? payload?.result ?? null;

    if (!job) {
      throw new Error('任务不存在');
    }

    const nextJob: ExtractionJobInfo = {
      id: job.id,
      status: job.status,
      documentId: job.documentId || job.document?.id || null,
      errorMessage: job.errorMessage,
      finishedAt: job.finishedAt,
      lastStep: job.lastStep,
    };

    setLatestJob(nextJob);

    if (job.status === JOB_STATUS.COMPLETED) {
      const applied = applyExtractionJobResult(result);
      if (!applied && job.document?.extractedData) {
        applyExtractionJobResult(safeParseJson(job.document.extractedData, {}));
      }
    }

    if (job.status === JOB_STATUS.FAILED) {
      throw new Error(job.errorMessage || '提取失败');
    }

    return {
      job: nextJob,
      result,
    };
  };

  const pollExtractionJob = async (jobId: string, token: string) => {
    const maxAttempts = 20;

    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
      const { job } = await fetchJobStatus(jobId, token);

      if (job.status === JOB_STATUS.COMPLETED) {
        return job;
      }

      if (job.status === JOB_STATUS.FAILED) {
        throw new Error(job.errorMessage || '提取失败');
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    throw new Error('提取任务仍在处理中，请稍后刷新查看结果');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError('请选择文件');
      return;
    }

    // 解析规则是可选的，如果没有则使用 prompt
    const extractionPrompt =
      parseRule.trim() || prompt.trim() || (selectedTemplateId ? '' : '提取文档中的所有数据');

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      if (extractionPrompt) {
        formData.append('prompt', extractionPrompt);
      }
      if (selectedTemplateId) {
        formData.append('templateId', selectedTemplateId);
      }

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('登录状态已失效，请重新登录');
      }
      
      const response = await fetch('/api/extraction-jobs', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const failedJobId = data?.data?.job?.id || data?.jobId || null;
        if (failedJobId) {
          setLatestJob({
            id: failedJobId,
            status: JOB_STATUS.FAILED,
            errorMessage: data?.error?.message || data?.error || '处理失败',
          });
        }
        throw new Error(data?.error?.message || data?.error || '处理失败');
      }

      const payload = await response.json();
      const job = payload?.data?.job || payload?.job;
      const document = payload?.data?.document || payload?.document;
      const jobId = job?.id as string | undefined;

      if (!jobId) {
        throw new Error('创建提取任务失败：缺少 jobId');
      }

      setLatestJob({
        id: jobId,
        status: job.status || JOB_STATUS.PENDING,
        documentId: document?.id || null,
      });

      await pollExtractionJob(jobId, token);

      const userResponse = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (userResponse.ok) {
        const userData = await userResponse.json();
        localStorage.setItem('user', JSON.stringify(userData.user));
        setUser(userData.user);
      }
    } catch (err: any) {
      setError(err.message || '处理失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const undo = () => {
    if (historyIndexRef.current > 0) {
      const nextIndex = historyIndexRef.current - 1;
      const prevState = historyRef.current[nextIndex];
      historyIndexRef.current = nextIndex;
      setHistoryIndex(nextIndex);
      applyHistorySnapshot(prevState);
    }
  };

  const redo = () => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      const nextIndex = historyIndexRef.current + 1;
      const nextState = historyRef.current[nextIndex];
      historyIndexRef.current = nextIndex;
      setHistoryIndex(nextIndex);
      applyHistorySnapshot(nextState);
    }
  };

  const evaluateFormula = (formula: string, sheetData: CellData[][]): number | string => {
    try {
      // 移除开头的 =
      const expr = formula.substring(1).trim();
      
      // 处理单元格引用 (如 A1, B2)
      let processedExpr = expr.replace(/([A-Z]+)(\d+)/g, (match, col, row) => {
        const colIndex = col.charCodeAt(0) - 65;
        const rowIndex = parseInt(row) - 1;
        
        if (sheetData[rowIndex] && sheetData[rowIndex][colIndex]) {
          const cellData = sheetData[rowIndex][colIndex];
          return cellData.computed !== undefined ? String(cellData.computed) : cellData.value || '0';
        }
        return '0';
      });

      // 处理常见函数
      processedExpr = processedExpr.replace(/SUM\(([^)]+)\)/gi, (match, range) => {
        const values = range.split(',').map((v: string) => parseFloat(v.trim()) || 0);
        return String(values.reduce((a: number, b: number) => a + b, 0));
      });

      processedExpr = processedExpr.replace(/AVERAGE\(([^)]+)\)/gi, (match, range) => {
        const values = range.split(',').map((v: string) => parseFloat(v.trim()) || 0);
        return String(values.reduce((a: number, b: number) => a + b, 0) / values.length);
      });

      processedExpr = processedExpr.replace(/MAX\(([^)]+)\)/gi, (match, range) => {
        const values = range.split(',').map((v: string) => parseFloat(v.trim()) || 0);
        return String(Math.max(...values));
      });

      processedExpr = processedExpr.replace(/MIN\(([^)]+)\)/gi, (match, range) => {
        const values = range.split(',').map((v: string) => parseFloat(v.trim()) || 0);
        return String(Math.min(...values));
      });

      // 计算表达式
      const result = eval(processedExpr);
      return typeof result === 'number' ? result : String(result);
    } catch (error) {
      return '#ERROR!';
    }
  };

  const handleAddSheet = () => {
    const newSheetId = `sheet${sheets.length + 1}`;
    const newSheet = createSheet(newSheetId, `Sheet${sheets.length + 1}`);
    const nextSheets = [...sheets, newSheet];
    setSheets(nextSheets);
    setActiveSheetId(newSheetId);
    pushHistoryState(nextSheets, cellFormats, newSheetId);
  };

  const handleDeleteSheet = (sheetId: string) => {
    if (sheets.length === 1) {
      alert('至少需要保留一个 Sheet');
      return;
    }
    const newSheets = sheets.filter(s => s.id !== sheetId);
    const nextActiveSheetId = activeSheetId === sheetId ? newSheets[0].id : activeSheetId;
    setSheets(newSheets);
    setActiveSheetId(nextActiveSheetId);
    pushHistoryState(newSheets, cellFormats, nextActiveSheetId);
  };

  const handleRenameSheet = (sheetId: string, newName: string) => {
    const nextSheets = sheets.map(sheet =>
      sheet.id === sheetId ? { ...sheet, name: newName } : sheet
    );
    setSheets(nextSheets);
    pushHistoryState(nextSheets, cellFormats, activeSheetId);
  };

  const handleSelectTemplate = (template: ExtractionTemplate | null) => {
    setSelectedTemplateId(template?.id || '');
  };

  const handleExport = async () => {
    try {
      if (!Array.isArray(sheets) || sheets.length === 0) {
        throw new Error('当前没有可导出的工作表');
      }

      const exportSheets = sanitizeExportSheets(sheets);
      const hasVisibleData = exportSheets.some(
        (sheet) =>
          (sheet.headers && sheet.headers.length > 0) ||
          sheet.data.some((row) => row.some((cell) => (cell.value || cell.computed || '').toString().trim() !== ''))
      );

      if (!hasVisibleData) {
        throw new Error('当前表格为空，暂无可导出的数据');
      }

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('登录状态已失效，请重新登录后导出');
      }

      const response = await fetch('/api/export-excel', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sheets: exportSheets }),
      });

      if (!response.ok) {
        const rawMessage = await response.text();
        const data = safeParseJson<{ error?: string }>(rawMessage, { error: '导出失败' });
        throw new Error(data.error || '导出失败');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `extracted_${Date.now()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      alert(err instanceof Error ? err.message : '导出失败，请稍后重试');
    }
  };

  const handleCellEdit = (sheetId: string, rowIndex: number, colIndex: number, value: string) => {
    const nextSheets = sheets.map(sheet => {
      if (sheet.id !== sheetId) {
        return sheet;
      }

      const newData = sheet.data.map((row) => row.map((cell) => ({ ...cell })));

      const cellData: CellData = {
        value,
        formula: value.startsWith('=') ? value : undefined,
        computed: undefined,
      };

      newData[rowIndex][colIndex] = cellData;

      if (cellData.formula) {
        cellData.computed = evaluateFormula(cellData.formula, newData);
      }

      return normalizeSheetData({ ...sheet, data: newData }, sheet.id, sheet.name);
    });

    setSheets(nextSheets);
    pushHistoryState(nextSheets, cellFormats, activeSheetId);
  };

  const handleCellSelect = (row: number, col: number) => {
    setSelectedCell({ row, col });
    const cellKey = `${activeSheetId}-${row}-${col}`;
    const format = cellFormats[cellKey] || currentFormat;
    setCurrentFormat(format);
    
    // 更新公式栏
    const activeSheet = sheets.find(s => s.id === activeSheetId);
    const cellData = activeSheet?.data[row]?.[col];
    setFormulaBarValue(cellData?.formula || cellData?.value || '');
  };

  const handleFormulaBarChange = (value: string) => {
    setFormulaBarValue(value);
    if (selectedCell) {
      handleCellEdit(activeSheetId, selectedCell.row, selectedCell.col, value);
    }
  };

  const applyFormat = (formatKey: keyof CellStyle, value: any) => {
    if (!selectedCell) return;
    
    const cellKey = `${activeSheetId}-${selectedCell.row}-${selectedCell.col}`;
    const newFormat = { ...currentFormat, [formatKey]: value };

    const nextCellFormats = {
      ...cellFormats,
      [cellKey]: newFormat
    };

    setCellFormats(nextCellFormats);
    setCurrentFormat(newFormat);
    pushHistoryState(sheets, nextCellFormats, activeSheetId);
  };

  const getCellStyle = (row: number, col: number): React.CSSProperties => {
    const cellKey = `${activeSheetId}-${row}-${col}`;
    const format = cellFormats[cellKey];
    
    if (!format) return {};
    
    let textDecoration = '';
    if (format.underline) textDecoration += 'underline ';
    if (format.strikethrough) textDecoration += 'line-through ';
    
    return {
      fontWeight: format.bold ? 'bold' : 'normal',
      fontStyle: format.italic ? 'italic' : 'normal',
      textDecoration: textDecoration.trim() || 'none',
      fontSize: `${format.fontSize || 11}px`,
      fontFamily: format.fontFamily || 'Arial',
      textAlign: format.textAlign || 'left',
      backgroundColor: format.backgroundColor || '#ffffff',
      color: format.textColor || '#000000',
      whiteSpace: format.wrapText ? 'pre-wrap' : 'nowrap',
      paddingLeft: `${(format.indent || 0) * 12}px`
    };
  };

  const handleNameDoubleClick = () => {
    setTempName(conversationName);
    setIsEditingName(true);
  };

  const handleNameSave = () => {
    const nextName = tempName.trim();
    if (!nextName) {
      setIsEditingName(false);
      return;
    }

    setConversationName(nextName);
    setIsEditingName(false);
    void saveCurrentSession({ name: nextName }).catch((saveError) => {
      console.error('保存会话名称失败:', saveError);
      setError(saveError instanceof Error ? saveError.message : '保存会话名称失败');
    });
  };

  const handleNameCancel = () => {
    setTempName('');
    setIsEditingName(false);
  };

  const handleNameKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSave();
    } else if (e.key === 'Escape') {
      handleNameCancel();
    }
  };

  const activeSheet = sheets.find(s => s.id === activeSheetId) || sheets[0];
  const selectedTemplate = templates.find((template) => template.id === selectedTemplateId) || null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 顶部导航栏 */}
      <header className="bg-white border-b shadow-sm">
        <nav className="px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/dashboard')}
              className="hover:bg-gray-100 p-1 rounded-lg transition-colors"
              title="返回对话列表"
            >
              <FileSpreadsheet className="w-6 h-6 text-blue-600" />
            </button>
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onBlur={handleNameSave}
                  onKeyDown={handleNameKeyPress}
                  className="text-lg font-semibold text-gray-800 bg-white border-2 border-blue-500 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-32"
                  autoFocus
                  onFocus={(e) => e.target.select()}
                  placeholder="输入对话名称"
                />
                <button
                  onClick={handleNameSave}
                  className="text-green-600 hover:text-green-700 p-1"
                  title="保存"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button
                  onClick={handleNameCancel}
                  className="text-red-600 hover:text-red-700 p-1"
                  title="取消"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div 
                className="text-lg font-semibold text-gray-800 cursor-pointer hover:bg-gray-100 px-3 py-1 rounded-lg transition-colors border-2 border-transparent hover:border-gray-200"
                onDoubleClick={handleNameDoubleClick}
                title="双击修改当前工作区名称"
              >
                {conversationName}
              </div>
            )}
            <div className="text-sm text-gray-500">{t.extract.pagesUsed.replace('{used}', String(user?.pagesUsed || 0)).replace('{limit}', String(user?.pagesLimit || 300))}</div>
          </div>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => {
                void saveCurrentSession().catch((saveError) => {
                  console.error('保存会话失败:', saveError);
                  setError(saveError instanceof Error ? saveError.message : '保存会话失败');
                });
              }}
              disabled={!currentSessionId || savingSession}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {savingSession ? '保存中...' : '保存会话'}
            </button>
            <button 
              onClick={() => setShowUpgradeDialog(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              {t.extract.upgrade}
            </button>
            <button 
              onClick={() => setShowInviteDialog(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
            >
              {t.extract.invite}
            </button>
            <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title={t.extract.backToConversations}>
              <Home className="w-5 h-5 text-gray-600" />
            </Link>
            <UserInfo />
          </div>
        </nav>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* 左侧边栏 */}
        <div className="w-72 bg-white border-r flex flex-col shadow-sm">
          <div className="p-4 border-b">
            <button
              type="button"
              onClick={handleCreateSession}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
            >
              <Plus className="w-4 h-4" />
              新建会话
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-xs text-gray-500">
              历史会话已统一在仪表盘中管理。
              <Link href="/dashboard" className="ml-1 text-blue-600 hover:text-blue-700">
                前往查看
              </Link>
            </div>

            {/* 文件上传区域 */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">拖放文件到这里</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer">
                <input
                  id="file-input"
                  type="file"
                  accept=".pdf,image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="file-input" className="cursor-pointer flex flex-col items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6 text-gray-500" />
                  </div>
                  {file ? (
                    <>
                      <p className="text-sm font-medium text-gray-800 mb-1">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600 mb-1">pdf·images·json</p>
                      <p className="text-xs text-gray-400">点击或拖拽上传</p>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* 模板与补充说明 */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">提取模板</label>
              <button
                onClick={() => setShowSelectTemplateDialog(true)}
                className="w-full border border-gray-300 rounded-lg p-3 text-left hover:border-blue-400 hover:bg-blue-50/30 transition-all"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium text-gray-800">
                      {selectedTemplate ? selectedTemplate.name : '自由输入模式'}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {selectedTemplate?.description || '不使用预设模板，直接按补充说明提取'}
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </button>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">补充说明</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={selectedTemplate ? '补充模板之外的字段、格式或输出要求…' : '输入你想提取的字段、表格或输出格式…'}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                rows={4}
              />
              <div className="mt-2 flex items-center justify-between">
                <button
                  onClick={() => setShowParseRuleDialog(true)}
                  className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
                >
                  <Sparkles className="w-3 h-3" />
                  {parseRule ? '已设置高级规则' : '使用高级规则'}
                </button>
                {parseRule && (
                  <button
                    onClick={() => setParseRule('')}
                    className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    清除规则
                  </button>
                )}
              </div>
            </div>

            {/* 错误提示 */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs">
                {error}
              </div>
            )}

            {latestJob && (
              <div
                className={`p-3 rounded-lg text-xs border ${
                  latestJob.status === JOB_STATUS.COMPLETED
                    ? 'bg-green-50 border-green-200 text-green-700'
                    : latestJob.status === JOB_STATUS.FAILED
                    ? 'bg-red-50 border-red-200 text-red-700'
                    : 'bg-blue-50 border-blue-200 text-blue-700'
                }`}
              >
                <div className="font-medium">
                  提取任务状态：{latestJob.status}
                </div>
                <div className="mt-1 break-all">任务 ID：{latestJob.id}</div>
                {latestJob.errorMessage && <div className="mt-1">错误信息：{latestJob.errorMessage}</div>}
              </div>
            )}

            {/* 开始转换按钮 */}
            <button
              onClick={() => {
                if (!file) {
                  setError('请选择文件');
                  return;
                }
                handleSubmit(new Event('submit') as any);
              }}
              disabled={loading}
              className="w-full bg-green-500 text-white py-3 rounded-lg text-sm font-medium hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  处理中...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  开始转换
                </>
              )}
            </button>
          </div>
        </div>

        {/* 右侧 Excel 编辑区域 */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* Excel 顶部工具栏 */}
          <div className="bg-white border-b">
            <div className="px-4 py-2 flex items-center justify-between border-b">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={activeSheet.name}
                  onChange={(e) => handleRenameSheet(activeSheet.id, e.target.value)}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium w-36 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setShowSelectTemplateDialog(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    {selectedTemplate ? `模板：${selectedTemplate.name}` : '选择模板'}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowParseRuleDialog(true)}
                  className="flex items-center gap-2 px-4 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm font-medium transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  解析规则
                </button>
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  导出
                </button>
              </div>
            </div>

            {/* 格式工具栏 */}
            <div className="px-4 py-2 flex items-center gap-1 text-sm bg-gray-50 flex-wrap border-b">
              {/* 撤销/重做 */}
              <button
                onClick={undo}
                disabled={historyIndex <= 0}
                className="p-2 hover:bg-gray-200 rounded transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                title="撤销 (Ctrl+Z)"
              >
                <Undo2 className="w-4 h-4" />
              </button>
              <button
                onClick={redo}
                disabled={historyIndex >= history.length - 1}
                className="p-2 hover:bg-gray-200 rounded transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                title="重做 (Ctrl+Y)"
              >
                <Redo2 className="w-4 h-4" />
              </button>
              
              <div className="border-l h-6 mx-1"></div>
              
              {/* 剪贴板操作 */}
              <button
                onClick={() => {
                  // 复制功能
                  if (selectedCell && activeSheet.data[selectedCell.row] && activeSheet.data[selectedCell.row][selectedCell.col]) {
                    const cellData = activeSheet.data[selectedCell.row][selectedCell.col];
                    const value = typeof cellData === 'object' && cellData !== null ? cellData.value : String(cellData || '');
                    navigator.clipboard.writeText(value);
                  }
                }}
                className="p-2 hover:bg-gray-200 rounded transition-colors"
                title="复制 (Ctrl+C)"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  // 粘贴功能
                  navigator.clipboard.readText().then(text => {
                    if (selectedCell && text) {
                      handleCellEdit(activeSheetId, selectedCell.row, selectedCell.col, text);
                    }
                  });
                }}
                className="p-2 hover:bg-gray-200 rounded transition-colors"
                title="粘贴 (Ctrl+V)"
              >
                <Clipboard className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  // 剪切功能
                  if (selectedCell && activeSheet.data[selectedCell.row] && activeSheet.data[selectedCell.row][selectedCell.col]) {
                    const cellData = activeSheet.data[selectedCell.row][selectedCell.col];
                    const value = typeof cellData === 'object' && cellData !== null ? cellData.value : String(cellData || '');
                    navigator.clipboard.writeText(value);
                    handleCellEdit(activeSheetId, selectedCell.row, selectedCell.col, '');
                  }
                }}
                className="p-2 hover:bg-gray-200 rounded transition-colors"
                title="剪切 (Ctrl+X)"
              >
                <Scissors className="w-4 h-4" />
              </button>
              
              <div className="border-l h-6 mx-1"></div>
              
              {/* 字体和字号 */}
              <select
                value={currentFormat.fontFamily}
                onChange={(e) => applyFormat('fontFamily', e.target.value)}
                className="px-2 py-1.5 border border-gray-300 rounded text-xs w-28 hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                title="字体"
              >
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                <option value="微软雅黑">微软雅黑</option>
                <option value="宋体">宋体</option>
              </select>
              
              <select
                value={currentFormat.fontSize}
                onChange={(e) => applyFormat('fontSize', parseInt(e.target.value))}
                className="px-2 py-1.5 border border-gray-300 rounded text-xs w-16 hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                title="字号"
              >
                {[8, 9, 10, 11, 12, 14, 16, 18, 20, 24].map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
              
              <div className="border-l h-6 mx-1"></div>
              
              {/* 文本格式 */}
              <button
                onClick={() => applyFormat('bold', !currentFormat.bold)}
                className={`p-2 hover:bg-gray-200 rounded transition-colors ${currentFormat.bold ? 'bg-gray-300' : ''}`}
                title="粗体 (Ctrl+B)"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                onClick={() => applyFormat('italic', !currentFormat.italic)}
                className={`p-2 hover:bg-gray-200 rounded transition-colors ${currentFormat.italic ? 'bg-gray-300' : ''}`}
                title="斜体 (Ctrl+I)"
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                onClick={() => applyFormat('underline', !currentFormat.underline)}
                className={`p-2 hover:bg-gray-200 rounded transition-colors ${currentFormat.underline ? 'bg-gray-300' : ''}`}
                title="下划线 (Ctrl+U)"
              >
                <Underline className="w-4 h-4" />
              </button>
              <button
                onClick={() => applyFormat('strikethrough', !currentFormat.strikethrough)}
                className={`p-2 hover:bg-gray-200 rounded transition-colors ${currentFormat.strikethrough ? 'bg-gray-300' : ''}`}
                title="删除线"
              >
                <Type className="w-4 h-4" />
              </button>
              
              <div className="border-l h-6 mx-1"></div>
              
              {/* 颜色 */}
              <div className="flex items-center gap-1">
                <div className="relative group">
                  <input
                    type="color"
                    value={currentFormat.textColor}
                    onChange={(e) => applyFormat('textColor', e.target.value)}
                    className="w-8 h-8 border border-gray-300 rounded cursor-pointer hover:border-blue-400 transition-colors"
                    title="文本颜色"
                  />
                  <Type className="w-3 h-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ color: currentFormat.textColor }} />
                </div>
                <div className="relative group">
                  <input
                    type="color"
                    value={currentFormat.backgroundColor}
                    onChange={(e) => applyFormat('backgroundColor', e.target.value)}
                    className="w-8 h-8 border border-gray-300 rounded cursor-pointer hover:border-blue-400 transition-colors"
                    title="背景颜色"
                  />
                  <Palette className="w-3 h-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              
              <div className="border-l h-6 mx-1"></div>
              
              {/* 对齐 */}
              <button
                onClick={() => applyFormat('textAlign', 'left')}
                className={`p-2 hover:bg-gray-200 rounded transition-colors ${currentFormat.textAlign === 'left' ? 'bg-gray-300' : ''}`}
                title="左对齐"
              >
                <AlignLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => applyFormat('textAlign', 'center')}
                className={`p-2 hover:bg-gray-200 rounded transition-colors ${currentFormat.textAlign === 'center' ? 'bg-gray-300' : ''}`}
                title="居中"
              >
                <AlignCenter className="w-4 h-4" />
              </button>
              <button
                onClick={() => applyFormat('textAlign', 'right')}
                className={`p-2 hover:bg-gray-200 rounded transition-colors ${currentFormat.textAlign === 'right' ? 'bg-gray-300' : ''}`}
                title="右对齐"
              >
                <AlignRight className="w-4 h-4" />
              </button>
              
              <div className="border-l h-6 mx-1"></div>
              
              {/* 边框 */}
              <select
                value={currentFormat.border}
                onChange={(e) => applyFormat('border', e.target.value)}
                className="px-2 py-1.5 border border-gray-300 rounded text-xs hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                title="边框"
              >
                <option value="none">无边框</option>
                <option value="all">全部边框</option>
                <option value="outer">外边框</option>
                <option value="top">上边框</option>
                <option value="bottom">下边框</option>
              </select>
              
              <div className="border-l h-6 mx-1"></div>
              
              {/* 数字格式 */}
              <select
                value={currentFormat.numberFormat}
                onChange={(e) => applyFormat('numberFormat', e.target.value)}
                className="px-2 py-1.5 border border-gray-300 rounded text-xs hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                title="数字格式"
              >
                <option value="general">常规</option>
                <option value="number">数字</option>
                <option value="currency">货币</option>
                <option value="percent">百分比</option>
                <option value="date">日期</option>
              </select>
              
              <div className="border-l h-6 mx-1"></div>
              
              {/* 单元格操作 */}
              <button
                type="button"
                disabled
                className={DISABLED_TOOL_BUTTON_CLASS}
                title="合并单元格暂未实现"
              >
                <Layers className="w-4 h-4" />
              </button>
              <button
                onClick={() => applyFormat('wrapText', !currentFormat.wrapText)}
                className={`p-2 hover:bg-gray-200 rounded transition-colors ${currentFormat.wrapText ? 'bg-gray-300' : ''}`}
                title="自动换行"
              >
                <WrapText className="w-4 h-4" />
              </button>
              
              <div className="border-l h-6 mx-1"></div>
              
              {/* 缩进 */}
              <button
                onClick={() => {
                  const currentIndent = currentFormat.indent || 0;
                  applyFormat('indent', Math.max(0, currentIndent - 1));
                }}
                className="p-2 hover:bg-gray-200 rounded transition-colors"
                title="减少缩进"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  const currentIndent = currentFormat.indent || 0;
                  applyFormat('indent', currentIndent + 1);
                }}
                className="p-2 hover:bg-gray-200 rounded transition-colors"
                title="增加缩进"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              
              <div className="border-l h-6 mx-1"></div>
              
              {/* 排序和筛选 */}
              <button
                type="button"
                disabled
                className={DISABLED_TOOL_BUTTON_CLASS}
                title="排序暂未实现"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                disabled
                className={DISABLED_TOOL_BUTTON_CLASS}
                title="排序暂未实现"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
              <button
                type="button"
                disabled
                className={DISABLED_TOOL_BUTTON_CLASS}
                title="筛选暂未实现"
              >
                <Filter className="w-4 h-4" />
              </button>
              
              <div className="border-l h-6 mx-1"></div>
              
              {/* 函数 */}
              <button
                onClick={() => {
                  if (selectedCell) {
                    handleFormulaBarChange('=SUM()');
                  }
                }}
                className="px-2 py-1.5 hover:bg-gray-200 rounded text-xs font-medium transition-colors"
                title="求和"
              >
                Σ
              </button>
              
              <button
                onClick={() => {
                  const formula = window.prompt('输入公式（以 = 开头）：', '=');
                  if (formula && selectedCell) {
                    handleFormulaBarChange(formula);
                  }
                }}
                className="px-2 py-1.5 hover:bg-gray-200 rounded text-xs font-medium transition-colors"
                title="插入函数"
              >
                fx
              </button>
            </div>

            {/* 公式栏 */}
            <div className="px-4 py-2 flex items-center gap-3 bg-white border-b">
              <span className="text-xs text-gray-600 font-medium w-16">
                {selectedCell ? `${String.fromCharCode(65 + selectedCell.col)}${selectedCell.row + 1}` : 'A1'}
              </span>
              <span className="text-xs text-gray-500 font-medium">fx</span>
              <input
                type="text"
                value={formulaBarValue}
                onChange={(e) => handleFormulaBarChange(e.target.value)}
                placeholder="输入值或公式（以 = 开头）"
                className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Excel 表格 */}
            <div className="flex-1 overflow-auto bg-white m-4 rounded-lg shadow-sm border">
              <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 320px)' }}>
                <table className="w-full border-collapse">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="w-12 border border-gray-300 bg-gray-100 text-xs text-gray-600"></th>
                      {Array.from({ length: getSheetColumnCount(activeSheet) }).map((_, index) => (
                        <th key={index} className="border border-gray-300 px-2 py-1 text-xs font-medium text-gray-700 min-w-24">
                          {String.fromCharCode(65 + index)}
                        </th>
                      ))}
                    </tr>
                    {activeSheet.headers.length > 0 && (
                      <tr>
                        <th className="border border-gray-300 bg-gray-100 text-xs text-gray-600">1</th>
                        {activeSheet.headers.map((header, index) => (
                          <th key={index} className="border border-gray-300 px-2 py-1 text-xs font-medium bg-blue-50">
                            {header}
                          </th>
                        ))}
                      </tr>
                    )}
                  </thead>
                  <tbody>
                    {activeSheet.data.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        <td className="border border-gray-300 bg-gray-100 text-center text-xs text-gray-600 px-2">
                          {rowIndex + (activeSheet.headers.length > 0 ? 2 : 1)}
                        </td>
                        {Array.from({ length: getSheetColumnCount(activeSheet) }).map((_, colIndex) => (
                          <td key={colIndex} className="border border-gray-300 p-0">
                            <input
                              type="text"
                              value={getCellDisplayValue(activeSheet, rowIndex, colIndex)}
                              onChange={(e) => handleCellEdit(activeSheet.id, rowIndex, colIndex, e.target.value)}
                              onFocus={() => handleCellSelect(rowIndex, colIndex)}
                              style={getCellStyle(rowIndex, colIndex)}
                              className={`w-full h-full px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                                  ? 'ring-2 ring-blue-500'
                                  : ''
                              }`}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sheet 标签栏 */}
          <div className="bg-white border-t px-4 py-2 flex items-center gap-2">
            <button
              onClick={handleAddSheet}
              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
              title="添加 Sheet"
            >
              <Plus className="w-4 h-4" />
            </button>
            <div className="flex-1 flex items-center gap-1 overflow-x-auto">
              {sheets.map(sheet => (
                <div
                  key={sheet.id}
                  className={`flex items-center gap-2 px-3 py-1 rounded cursor-pointer text-sm ${
                    sheet.id === activeSheetId
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveSheetId(sheet.id)}
                >
                  <span>{sheet.name}</span>
                  {sheets.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSheet(sheet.id);
                      }}
                      className="hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-500">100%</div>
          </div>
        </div>
      </div>

      {/* 解析规则对话框 */}
      {showParseRuleDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-green-50 to-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-sm">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">解析规则配置</h3>
                  <p className="text-sm text-gray-500 mt-0.5">设置 AI 如何理解和提取文档内容（可选）</p>
                </div>
              </div>
              <button
                onClick={() => setShowParseRuleDialog(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {parseRule ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-semibold text-green-800">当前规则已激活</span>
                      </div>
                      <button
                        onClick={() => setParseRule('')}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      >
                        重新编辑
                      </button>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap border border-green-200">
                      {parseRule}
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">提示</p>
                      <p>AI 将优先使用此规则进行文档解析。您可以随时修改或清除规则。</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <FileText className="w-10 h-10 text-green-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">设置解析规则</h4>
                    <p className="text-sm text-gray-500 max-w-md mx-auto">
                      解析规则是可选的。如果不设置，AI 将自动识别文档内容。<br/>
                      设置规则可以让 AI 更精准地提取您需要的信息。
                    </p>
                  </div>
                  
                  <div className="max-w-2xl mx-auto space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        输入解析规则
                      </label>
                      <textarea
                        value={parseRule}
                        onChange={(e) => setParseRule(e.target.value)}
                        placeholder="例如：提取发票中的日期、金额、供应商名称和商品明细..."
                        className="w-full border-2 border-gray-300 rounded-xl p-4 text-sm h-40 focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none transition-all"
                      />
                    </div>

                    {/* 示例规则 */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-semibold text-gray-700">常用规则示例</span>
                      </div>
                      <div className="space-y-2">
                        <button
                          onClick={() => setParseRule('提取发票中的发票号码、开票日期、供应商名称、税号、金额（含税、不含税）、税额和商品明细（名称、数量、单价）')}
                          className="w-full text-left px-3 py-2 text-xs bg-white hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-lg transition-all"
                        >
                          <span className="font-medium text-gray-700">📄 发票提取</span>
                          <p className="text-gray-500 mt-1">提取发票号码、日期、金额、供应商等信息</p>
                        </button>
                        <button
                          onClick={() => setParseRule('提取合同中的合同编号、甲方和乙方名称、签订日期、合同金额、付款方式、履行期限和违约条款')}
                          className="w-full text-left px-3 py-2 text-xs bg-white hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-lg transition-all"
                        >
                          <span className="font-medium text-gray-700">📋 合同提取</span>
                          <p className="text-gray-500 mt-1">提取合同编号、双方信息、金额等关键条款</p>
                        </button>
                        <button
                          onClick={() => setParseRule('提取文档中的所有表格数据，保持原有的行列结构，包括表头和所有数据行')}
                          className="w-full text-left px-3 py-2 text-xs bg-white hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-lg transition-all"
                        >
                          <span className="font-medium text-gray-700">📊 表格提取</span>
                          <p className="text-gray-500 mt-1">提取所有表格，保持原始结构</p>
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (parseRule.trim()) {
                          setShowParseRuleDialog(false);
                        }
                      }}
                      disabled={!parseRule.trim()}
                      className="w-full bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium transition-colors shadow-sm"
                    >
                      保存规则
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t p-4 bg-gray-50 flex justify-between items-center">
              <button
                onClick={() => {
                  setParseRule('');
                  setPrompt('');
                }}
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                清除所有
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowParseRuleDialog(false)}
                  className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 font-medium transition-colors"
                >
                  关闭
                </button>
                {parseRule && (
                  <button
                    onClick={() => {
                      setShowParseRuleDialog(false);
                      if (file) {
                        handleSubmit(new Event('submit') as any);
                      }
                    }}
                    disabled={!file}
                    className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 font-medium transition-colors"
                  >
                    开始解析
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showSelectTemplateDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-h-96 overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">选择模板</h3>
            {templates.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                暂无可用模板
              </p>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    handleSelectTemplate(null);
                    setShowSelectTemplateDialog(false);
                  }}
                  className={`w-full text-left px-4 py-3 border rounded-lg transition-colors ${
                    selectedTemplateId
                      ? 'border-gray-200 hover:bg-gray-50 hover:border-blue-500'
                      : 'border-blue-500 bg-blue-50'
                  }`}
                >
                  <div className="font-medium">自由输入模式</div>
                  <div className="text-xs text-gray-500 mt-1">
                    不使用预设模板，完全按你的说明提取
                  </div>
                </button>
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => {
                      handleSelectTemplate(template);
                      setShowSelectTemplateDialog(false);
                    }}
                    className={`w-full text-left px-4 py-3 border rounded-lg transition-colors ${
                      selectedTemplateId === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50 hover:border-blue-500'
                    }`}
                  >
                    <div className="font-medium">{template.name}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {template.description || '无描述'}
                    </div>
                    <div className="text-xs text-gray-400 mt-1 line-clamp-2">
                      {template.promptText}
                    </div>
                  </button>
                ))}
              </div>
            )}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowSelectTemplateDialog(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 升级对话框 */}
      {showUpgradeDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold">升级套餐</h3>
                <button
                  onClick={() => setShowUpgradeDialog(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-blue-100">选择适合您的套餐，解锁更多功能</p>
            </div>
            
            <div className="p-6 space-y-4">
              {/* 专业版 - 月付 */}
              <button
                onClick={() => {
                  setShowUpgradeDialog(false);
                  router.push('/checkout?plan=monthly');
                }}
                className="w-full border-2 border-blue-500 rounded-xl p-4 bg-blue-50 relative text-left"
              >
                <div className="absolute -top-3 right-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                  推荐
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">专业版</h4>
                    <p className="text-sm text-gray-500">适合有定期需求的专业人士</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">$9.9</div>
                    <div className="text-xs text-gray-500">/月</div>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    2000 页/月
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    约 $0.005/页
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    数据导出不限制
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    优先支持
                  </li>
                </ul>
              </button>

              {/* 年度版 */}
              <button
                onClick={() => {
                  setShowUpgradeDialog(false);
                  router.push('/checkout?plan=yearly');
                }}
                className="w-full border-2 border-purple-500 rounded-xl p-4 bg-purple-50 relative text-left"
              >
                <div className="absolute -top-3 right-4 bg-purple-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                  最划算
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">年度版</h4>
                    <p className="text-sm text-gray-500">适合长期使用的用户</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">$107</div>
                    <div className="text-xs text-gray-500">/年</div>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    20400 页/年
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    约 $0.0052/页
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    数据导出不限制
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    优先支持
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    节省 10% 费用
                  </li>
                </ul>
              </button>
            </div>

            <div className="border-t p-4 bg-gray-50 flex items-center justify-between">
              <p className="text-xs text-gray-500">
                选择套餐后将跳转到支付页面
              </p>
              <button
                onClick={() => setShowUpgradeDialog(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 邀请对话框 */}
      {showInviteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold">邀请好友</h3>
                <button
                  onClick={() => setShowInviteDialog(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-green-100">邀请好友注册，双方各得 100 页额度</p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* 邀请码 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  您的邀请码
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={user?.inviteCode || 'LOADING...'}
                    readOnly
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-center text-lg font-mono font-bold"
                  />
                  <button
                    onClick={() => {
                      if (user?.inviteCode) {
                        navigator.clipboard.writeText(user.inviteCode);
                        alert('邀请码已复制！');
                      }
                    }}
                    className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    复制
                  </button>
                </div>
              </div>

              {/* 邀请链接 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  邀请链接
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={user?.inviteCode && typeof window !== 'undefined' 
                      ? `${window.location.origin}/signup?ref=${user.inviteCode}` 
                      : 'Loading...'}
                    readOnly
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-sm"
                  />
                  <button
                    onClick={() => {
                      if (user?.inviteCode && typeof window !== 'undefined') {
                        const inviteLink = `${window.location.origin}/signup?ref=${user.inviteCode}`;
                        navigator.clipboard.writeText(inviteLink);
                        alert('链接已复制！');
                      }
                    }}
                    className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    复制
                  </button>
                </div>
              </div>

              {/* 邀请统计 */}
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-green-800 mb-3">邀请统计</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{user?.inviteCount || 0}</div>
                    <div className="text-xs text-gray-600 mt-1">已邀请人数</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{user?.invitePages || 0}</div>
                    <div className="text-xs text-gray-600 mt-1">获得页数</div>
                  </div>
                </div>
              </div>

              {/* 邀请规则 */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-800 mb-2">邀请规则</h4>
                <ul className="space-y-1 text-xs text-blue-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span>好友通过您的邀请码注册成功后，双方各得 100 页</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span>邀请页数永久有效，不会过期</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span>邀请人数无上限，多邀多得</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t p-4 bg-gray-50 flex justify-end">
              <button
                onClick={() => setShowInviteDialog(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
