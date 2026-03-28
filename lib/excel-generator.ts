import { buildExcelBuffer } from '@/lib/export/excel';

export async function generateExcel(data: any): Promise<Buffer> {
  return buildExcelBuffer(data);
}
