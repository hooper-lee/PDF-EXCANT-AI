import { assertQuotaAvailable } from '@/lib/services/quota.service';
import type {
  ExtractionGraphNodeResult,
  ExtractionGraphRuntimeState,
} from '@/lib/workflows/extraction-graph/state';

export function checkQuotaNode(
  state: ExtractionGraphRuntimeState
): ExtractionGraphNodeResult {
  assertQuotaAvailable({
    pagesUsed: state.pagesUsed,
    pagesLimit: state.pagesLimit,
    pagesRequired: state.pageCount,
  });

  return {};
}
