import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import ExcelJS from 'exceljs';

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const userId = verifyToken(token);
    if (!userId) {
      return NextResponse.json({ error: '无效的令牌' }, { status: 401 });
    }

    const { sheets } = await request.json();

    if (!sheets || !Array.isArray(sheets)) {
      return NextResponse.json({ error: '无效的数据' }, { status: 400 });
    }

    // 创建工作簿
    const workbook = new ExcelJS.Workbook();

    // 为每个 sheet 创建工作表
    for (const sheet of sheets) {
      const worksheet = workbook.addWorksheet(sheet.name);

      // 添加表头
      if (sheet.headers && sheet.headers.length > 0) {
        worksheet.addRow(sheet.headers);
        
        // 设置表头样式
        const headerRow = worksheet.getRow(1);
        headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        headerRow.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF4472C4' }
        };
        headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
      }

      // 添加数据行
      if (sheet.data && sheet.data.length > 0) {
        sheet.data.forEach((row: any[]) => {
          worksheet.addRow(row);
        });
      }

      // 自动调整列宽
      worksheet.columns.forEach((column, index) => {
        let maxLength = 10;
        
        // 检查表头长度
        if (sheet.headers && sheet.headers[index]) {
          maxLength = Math.max(maxLength, sheet.headers[index].length);
        }
        
        // 检查数据长度
        if (sheet.data) {
          sheet.data.forEach((row: any[]) => {
            if (row[index]) {
              const cellLength = String(row[index]).length;
              maxLength = Math.max(maxLength, cellLength);
            }
          });
        }
        
        column.width = Math.min(maxLength + 2, 50);
      });

      // 添加边框
      worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell) => {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
        });
      });
    }

    // 生成 Excel 文件
    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer as any, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="extracted_${Date.now()}.xlsx"`,
      },
    });
  } catch (error) {
    console.error('导出 Excel 错误:', error);
    return NextResponse.json(
      { error: '导出失败' },
      { status: 500 }
    );
  }
}
