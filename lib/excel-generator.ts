import ExcelJS from 'exceljs';

export async function generateExcel(data: any): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('提取数据');

  // 如果数据是数组
  if (Array.isArray(data)) {
    if (data.length > 0) {
      // 使用第一行作为表头
      const headers = Object.keys(data[0]);
      worksheet.addRow(headers);
      
      // 添加数据行
      data.forEach(row => {
        worksheet.addRow(Object.values(row));
      });
    }
  } else if (typeof data === 'object') {
    // 如果是对象，转换为键值对
    worksheet.addRow(['字段', '值']);
    Object.entries(data).forEach(([key, value]) => {
      worksheet.addRow([key, String(value)]);
    });
  }

  // 样式设置
  worksheet.getRow(1).font = { bold: true };
  worksheet.columns.forEach(column => {
    column.width = 20;
  });

  return Buffer.from(await workbook.xlsx.writeBuffer());
}
