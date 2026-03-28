import type { ExtractionGraphRuntimeState } from '@/lib/workflows/extraction-graph/state';

export async function ensureFileBuffer(state: ExtractionGraphRuntimeState) {
  if (state.buffer.length > 0) {
    return state.buffer;
  }

  const bytes = await state.file.arrayBuffer();
  return Buffer.from(bytes);
}
