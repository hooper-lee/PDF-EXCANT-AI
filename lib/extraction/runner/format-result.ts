export function extractDataWithRules(text: string) {
  const lines = text.split('\n').filter((line) => line.trim());

  return {
    extractedData: lines.map((line, index) => ({
      row: index + 1,
      content: line.trim(),
    })),
    metadata: {
      totalLines: lines.length,
      extractionMethod: 'rule-based',
      note: '这是基于规则的简单提取。配置 OPENAI_API_KEY 以获得更智能的 AI 提取。',
    },
  };
}

export function normalizeExtractionResult(result: unknown) {
  if (result && typeof result === 'object') {
    return result;
  }

  return {
    extractedData: [],
    metadata: {
      extractionMethod: 'fallback',
    },
  };
}
