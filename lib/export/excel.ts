import ExcelJS from 'exceljs';

export async function buildExcelBuffer(data: any): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('提取数据');

  if (Array.isArray(data)) {
    if (data.length > 0) {
      const headers = Object.keys(data[0]);
      worksheet.addRow(headers);
      data.forEach((row) => {
        worksheet.addRow(Object.values(row));
      });
    }
  } else if (typeof data === 'object' && data !== null) {
    worksheet.addRow(['字段', '值']);
    Object.entries(data).forEach(([key, value]) => {
      worksheet.addRow([key, String(value)]);
    });
  }

  worksheet.getRow(1).font = { bold: true };
  worksheet.columns.forEach((column) => {
    column.width = 20;
  });

  return Buffer.from(await workbook.xlsx.writeBuffer());
}
