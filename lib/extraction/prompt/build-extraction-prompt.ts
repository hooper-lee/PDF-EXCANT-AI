interface ExtractionPromptTemplate {
  name: string;
  promptText: string;
  schemaJson?: string | null;
}

interface BuildExtractionPromptOptions {
  userPrompt?: string;
  template?: ExtractionPromptTemplate | null;
}

export function buildExtractionPrompt(
  text: string,
  { userPrompt, template }: BuildExtractionPromptOptions = {}
) {
  const templateInstructions = template
    ? `当前模板：${template.name}
模板要求：${template.promptText}
${template.schemaJson ? `目标 JSON 结构参考：${template.schemaJson}` : ''}`.trim()
    : '';

  const systemPrompt = `你是一个专业的数据提取助手。从提供的文本中提取结构化数据，并以JSON格式返回。
${templateInstructions ? `${templateInstructions}\n` : ''}如果用户提供了特定要求，请优先遵循用户要求，并在不违背模板结构的前提下补充缺失字段。
如果没有额外要求，请智能识别文本中的表格、列表等结构化信息。
重要：你的回复必须是有效的JSON格式，不要包含任何其他文本或解释。`;

  const instructionBlocks = [
    template ? `请优先按模板要求提取。` : null,
    userPrompt ? `补充说明：${userPrompt}` : null,
    `文本内容：\n${text}`,
  ].filter(Boolean);

  const userMessage = instructionBlocks.join('\n\n');

  return {
    systemPrompt,
    userMessage,
  };
}
