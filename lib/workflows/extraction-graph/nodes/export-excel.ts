import { buildExcelBuffer } from '@/lib/export/excel';
import type {
  ExtractionGraphNodeResult,
  ExtractionGraphRuntimeState,
} from '@/lib/workflows/extraction-graph/state';

export async function exportExcelNode(
  state: ExtractionGraphRuntimeState
): Promise<ExtractionGraphNodeResult> {
  const excelBuffer = await buildExcelBuffer(state.extractedJson);

  return { excelBuffer };
}
