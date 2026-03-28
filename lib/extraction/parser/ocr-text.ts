import { createWorker } from 'tesseract.js';

export async function extractImageText(imageBuffer: Buffer): Promise<string> {
  const worker = await createWorker('chi_sim+eng');
  const {
    data: { text },
  } = await worker.recognize(imageBuffer);
  await worker.terminate();

  return text;
}
