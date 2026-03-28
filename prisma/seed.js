const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_INITIAL_PASSWORD = process.env.ADMIN_INITIAL_PASSWORD || 'admin';

function generateInviteCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

const DEFAULT_EXTRACTION_TEMPLATES = [
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
    isPublic: true,
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
    isPublic: true,
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
    isPublic: true,
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
    isPublic: true,
  },
];

async function seedExtractionTemplates() {
  for (const template of DEFAULT_EXTRACTION_TEMPLATES) {
    await prisma.extractionTemplate.upsert({
      where: { name: template.name },
      update: {
        description: template.description,
        promptText: template.promptText,
        schemaJson: template.schemaJson,
        isPublic: template.isPublic,
      },
      create: template,
    });
  }
}

async function main() {
  const hashedPassword = await bcrypt.hash(ADMIN_INITIAL_PASSWORD, 10);

  const existing = await prisma.user.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (existing) {
    await prisma.user.update({
      where: { email: ADMIN_EMAIL },
      data: { role: 'ADMIN' },
    });
    console.log('管理员已存在，已确保角色为 ADMIN:', ADMIN_EMAIL);
  } else {
    let inviteCode = 'ADMIN' + generateInviteCode();
    let attempts = 0;
    while (attempts < 5) {
      const taken = await prisma.user.findUnique({ where: { inviteCode } });
      if (!taken) break;
      inviteCode = 'ADMIN' + generateInviteCode();
      attempts++;
    }

    await prisma.user.create({
      data: {
        email: ADMIN_EMAIL,
        password: hashedPassword,
        name: 'Admin',
        role: 'ADMIN',
        inviteCode,
        pagesLimit: 300,
        inviteCount: 0,
        invitePages: 0,
      },
    });

    console.log('管理员初始化成功:');
    console.log('  邮箱:', ADMIN_EMAIL);
    console.log('  初始密码:', ADMIN_INITIAL_PASSWORD);
    console.log('  请登录后前往「设置」修改密码。');
  }

  await seedExtractionTemplates();
  console.log('已确保默认提取模板存在:', DEFAULT_EXTRACTION_TEMPLATES.map((item) => item.name).join(', '));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
