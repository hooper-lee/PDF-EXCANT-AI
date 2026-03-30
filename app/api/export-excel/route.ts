import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import ExcelJS from 'exceljs';

interface ExportCellData {
  value?: string;
  formula?: string;
  computed?: string | number;
}

interface ExportSheetPayload {
  name?: string;
  headers?: string[];
  data?: ExportCellData[][];
}

function sanitizeSheetName(name: string | undefined, index: number) {
  const fallback = `Sheet${index + 1}`;
  const candidate = (name || fallback).trim() || fallback;
  return candidate.replace(/[\\/*?:[\]]/g, '_').slice(0, 31) || fallback;
}

function getCellValue(cell: unknown) {
  if (cell && typeof cell === 'object') {
    const cellData = cell as ExportCellData;

    if (typeof cellData.computed !== 'undefined' && cellData.computed !== null && cellData.computed !== '') {
      return cellData.computed;
    }

    if (typeof cellData.value !== 'undefined' && cellData.value !== null) {
      return cellData.value;
    }
  }

  if (typeof cell === 'undefined' || cell === null) {
    return '';
  }

  return String(cell);
}

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
      return NextResponse.json({ error: '导出数据无效：sheets 必须是数组' }, { status: 400 });
    }

    if (sheets.length === 0) {
      return NextResponse.json({ error: '导出数据为空：至少需要一个工作表' }, { status: 400 });
    }

    // 创建工作簿
    const workbook = new ExcelJS.Workbook();

    // 为每个 sheet 创建工作表
    for (const [sheetIndex, rawSheet] of (sheets as ExportSheetPayload[]).entries()) {
      if (!rawSheet || typeof rawSheet !== 'object') {
        return NextResponse.json(
          { error: `导出数据无效：第 ${sheetIndex + 1} 个工作表不是对象` },
          { status: 400 }
        );
      }

      const headers = Array.isArray(rawSheet.headers) ? rawSheet.headers.map((header) => String(header ?? '')) : [];
      const dataRows = Array.isArray(rawSheet.data) ? rawSheet.data : [];
      const worksheet = workbook.addWorksheet(sanitizeSheetName(rawSheet.name, sheetIndex));

      // 添加表头
      if (headers.length > 0) {
        worksheet.addRow(headers);
        
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
      if (dataRows.length > 0) {
        dataRows.forEach((row, rowIndex) => {
          if (!Array.isArray(row)) {
            throw new Error(`第 ${sheetIndex + 1} 个工作表的第 ${rowIndex + 1} 行不是数组`);
          }

          worksheet.addRow((row || []).map(getCellValue));
        });
      }

      // 自动调整列宽
      worksheet.columns.forEach((column, index) => {
        let maxLength = 10;
        
        // 检查表头长度
        if (headers[index]) {
          maxLength = Math.max(maxLength, headers[index].length);
        }
        
        // 检查数据长度
        if (dataRows) {
          dataRows.forEach((row: ExportCellData[]) => {
            if (row[index]) {
              const cellLength = String(getCellValue(row[index])).length;
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
    const message = error instanceof Error ? error.message : '未知导出错误';
    return NextResponse.json(
      { error: `导出失败：${message}` },
      { status: 500 }
    );
  }
}
