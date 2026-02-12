import OpenAI from 'openai';
import { createWorker } from 'tesseract.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function extractTextFromImage(imageBuffer: Buffer): Promise<string> {
  const worker = await createWorker('chi_sim+eng');
  const { data: { text } } = await worker.recognize(imageBuffer);
  await worker.terminate();
  return text;
}

export async function extractDataWithAI(
  text: string,
  userPrompt?: string
): Promise<any> {
  const systemPrompt = `你是一个专业的数据提取助手。从提供的文本中提取结构化数据，并以JSON格式返回。
如果用户提供了特定要求，请按照要求提取。否则，智能识别文本中的表格、列表等结构化信息。`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { 
        role: 'user', 
        content: userPrompt 
          ? `${userPrompt}\n\n文本内容：\n${text}` 
          : `请从以下文本中提取所有结构化数据：\n${text}` 
      },
    ],
    response_format: { type: 'json_object' },
  });

  return JSON.parse(completion.choices[0].message.content || '{}');
}

export async function analyzeDocument(fileBuffer: Buffer, fileType: string): Promise<{
  text: string;
  pageCount: number;
}> {
  if (fileType.startsWith('image/')) {
    const text = await extractTextFromImage(fileBuffer);
    return { text, pageCount: 1 };
  }
  
  throw new Error('不支持的文件类型');
}
