import { END, START, StateGraph } from '@langchain/langgraph';
import { JOB_STATUS } from '@/lib/domain';
import {
  markExtractionJobProcessing,
  updateExtractionJobStep,
} from '@/lib/repositories/extraction-job-repository';
import { WorkflowStepError } from '@/lib/workflows/extraction-graph/errors';
import {
  buildPromptNode,
  callLlmNode,
  checkQuotaNode,
  detectTextLayerNode,
  exportExcelNode,
  extractTextNode,
  loadDocumentNode,
  markFailedNode,
  normalizeTextNode,
  persistResultNode,
  routeAfterTextExtraction,
  routeFromTextLayerDetection,
  runOcrNode,
  validateResultNode,
} from '@/lib/workflows/extraction-graph/nodes';
import {
  ExtractionStateAnnotation,
  type ExtractionGraphNodeResult,
  type ExtractionGraphRuntimeState,
} from '@/lib/workflows/extraction-graph/state';

function trackNode(
  step: string,
  node: (state: ExtractionGraphRuntimeState) => Promise<ExtractionGraphNodeResult> | ExtractionGraphNodeResult
) {
  return async (state: ExtractionGraphRuntimeState) => {
    await updateExtractionJobStep(state.jobId, step);

    try {
      return await node(state);
    } catch (error) {
      const message = error instanceof Error ? error.message : '处理失败，请稍后重试';
      throw new WorkflowStepError(step, message);
    }
  };
}

const extractionGraph = new StateGraph(ExtractionStateAnnotation)
  .addNode('load-document', trackNode('load-document', loadDocumentNode))
  .addNode('detect-text-layer', trackNode('detect-text-layer', detectTextLayerNode))
  .addNode('extract-text', trackNode('extract-text', extractTextNode))
  .addNode('run-ocr', trackNode('run-ocr', runOcrNode))
  .addNode('normalize-text', trackNode('normalize-text', normalizeTextNode))
  .addNode('check-quota', trackNode('check-quota', checkQuotaNode))
  .addNode('build-prompt', trackNode('build-prompt', buildPromptNode))
  .addNode('call-llm', trackNode('call-llm', callLlmNode))
  .addNode('validate-result', trackNode('validate-result', validateResultNode))
  .addNode('export-excel', trackNode('export-excel', exportExcelNode))
  .addNode('persist-result', trackNode('persist-result', persistResultNode))
  .addEdge(START, 'load-document')
  .addEdge('load-document', 'detect-text-layer')
  .addConditionalEdges('detect-text-layer', routeFromTextLayerDetection, ['extract-text', 'run-ocr'])
  .addConditionalEdges('extract-text', routeAfterTextExtraction, ['normalize-text', 'run-ocr'])
  .addEdge('run-ocr', 'normalize-text')
  .addEdge('normalize-text', 'check-quota')
  .addEdge('check-quota', 'build-prompt')
  .addEdge('build-prompt', 'call-llm')
  .addEdge('call-llm', 'validate-result')
  .addEdge('validate-result', 'export-excel')
  .addEdge('export-excel', 'persist-result')
  .addEdge('persist-result', END)
  .compile();

export async function runExtractionWorkflow(state: ExtractionGraphRuntimeState) {
  await markExtractionJobProcessing(state.jobId);

  try {
    return await extractionGraph.invoke({
      ...state,
      status: JOB_STATUS.PROCESSING,
      errorMessage: null,
    });
  } catch (error) {
    await markFailedNode(state, error);

    throw error;
  }
}
