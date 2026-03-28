import {
  findExtractionTemplateById,
  listPublicExtractionTemplates,
  upsertExtractionTemplateByName,
} from '@/lib/repositories/extraction-template-repository';

interface DefaultTemplateDefinition {
  name: string;
  description: string;
  promptText: string;
  schemaJson: string;
}

const DEFAULT_EXTRACTION_TEMPLATES: DefaultTemplateDefinition[] = [
  {
    name: 'invoice',
    description: '提取发票关键信息和商品明细。',
    promptText:
      '请提取发票中的发票号码、开票日期、卖方/买方信息、币种、金额、税额和商品明细。商品明细请尽量按数组返回，每项包含名称、规格、数量、单价和金额。',
    schemaJson: JSON.stringify(
      {
        invoiceNumber: '',
        issueDate: '',
        sellerName: '',
        buyerName: '',
        currency: '',
        subtotal: '',
        taxAmount: '',
        totalAmount: '',
        items: [{ name: '', specification: '', quantity: '', unitPrice: '', amount: '' }],
      },
      null,
      2
    ),
  },
  {
    name: 'packing list',
    description: '提取装箱单的箱号、商品、数量和重量信息。',
    promptText:
      '请提取装箱单中的发货人、收货人、箱号、商品名称、件数、数量、毛重、净重和体积等字段。若存在多箱，请按箱号拆分为数组。',
    schemaJson: JSON.stringify(
      {
        shipper: '',
        consignee: '',
        boxes: [{ cartonNo: '', itemName: '', quantity: '', grossWeight: '', netWeight: '', volume: '' }],
      },
      null,
      2
    ),
  },
  {
    name: 'table to excel',
    description: '尽量保持原始表格行列结构输出。',
    promptText:
      '请优先提取文档中的表格内容，保持原有表头、行列结构和分组关系。若存在多个表格，请按数组分别返回。',
    schemaJson: JSON.stringify(
      {
        tables: [{ name: '', headers: [''], rows: [['']] }],
      },
      null,
      2
    ),
  },
  {
    name: 'custom',
    description: '通用模板，适合配合自由输入补充说明。',
    promptText:
      '请根据用户补充说明提取文档中的结构化数据；若没有额外说明，请尽量识别主要表格、列表和关键字段，并输出清晰的 JSON。',
    schemaJson: JSON.stringify(
      {
        data: [],
        summary: '',
      },
      null,
      2
    ),
  },
];

export async function ensureDefaultExtractionTemplates() {
  await Promise.all(
    DEFAULT_EXTRACTION_TEMPLATES.map((template) =>
      upsertExtractionTemplateByName({
        ...template,
        isPublic: true,
      })
    )
  );
}

export async function getExtractionTemplates() {
  await ensureDefaultExtractionTemplates();
  return listPublicExtractionTemplates();
}

export async function getExtractionTemplateById(templateId: string) {
  await ensureDefaultExtractionTemplates();
  return findExtractionTemplateById(templateId);
}
