# PDF Extract AI - AI 智能 PDF 数据提取工具

基于 Next.js 14 + TypeScript + Prisma 构建的全栈 AI PDF 数据提取应用，集成了完整的 PDF 工具套件。

## 功能特性

### AI 提取工具（付费）
- ✅ AI 智能文档识别（OCR + LLM）
- ✅ 自然语言提取指令
- ✅ 自动转换为 Excel 格式
- ✅ 用户认证系统
- ✅ 订阅和配额管理
- ✅ 支付系统集成

### PDF 工具套件（免费）
- ✅ PDF 合并 - 将多个 PDF 文件合并为一个
- ✅ PDF 分割 - 将 PDF 按页面分割
- ✅ PDF 压缩 - 减小 PDF 文件大小
- ✅ PDF 旋转 - 旋转 PDF 页面方向
- ✅ PDF 提取页面 - 提取指定页面
- ✅ PDF 删除页面 - 删除指定页面
- ✅ PDF 添加页码 - 为 PDF 添加页码
- ✅ PDF 添加水印 - 为 PDF 添加文字水印
- ✅ PDF 转 JPG - 将 PDF 页面转换为图片
- ✅ JPG 转 PDF - 将图片转换为 PDF
- ✅ Excel 转 PDF - 将 Excel 文件转换为 PDF

### 系统功能
- ✅ 用户注册/登录系统
- ✅ 个人资料管理
- ✅ 邀请系统（邀请奖励 100 页）
- ✅ 管理后台
- ✅ 响应式设计
- ✅ 科技蓝扁平化 UI 设计

## 技术栈

- **前端**: Next.js 14, React, TypeScript, TailwindCSS, Lucide React
- **后端**: Next.js API Routes, Prisma ORM
- **数据库**: PostgreSQL
- **AI**: OpenAI GPT-4, Tesseract.js OCR
- **PDF 处理**: PDF-lib, pdfjs-dist
- **Excel 处理**: ExcelJS, xlsx
- **支付**: 模拟支付系统
- **认证**: JWT, bcryptjs

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 到 `.env` 并填写配置：

```bash
cp .env.example .env
```

需要配置：
- `DATABASE_URL` - PostgreSQL 数据库连接
- `JWT_SECRET` - JWT 密钥
- `OPENAI_API_KEY` - OpenAI API Key（用于 AI 提取功能）

### 3. 初始化数据库

```bash
npx prisma generate
npx prisma db push
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## 项目结构

```
├── app/                    # Next.js 应用目录
│   ├── api/               # API 路由
│   │   ├── auth/         # 认证相关 API
│   │   ├── admin/        # 管理后台 API
│   │   ├── payment/      # 支付相关 API
│   │   └── user/         # 用户相关 API
│   ├── components/        # React 组件
│   │   ├── Navbar.tsx    # 导航栏
│   │   ├── Footer.tsx    # 页脚
│   │   ├── Toast.tsx     # 通知组件
│   │   └── UserInfo.tsx  # 用户信息组件
│   ├── tools/            # PDF 工具页面
│   ├── admin/            # 管理后台
│   ├── extract/          # AI 提取页面
│   ├── pricing/          # 定价页面
│   ├── checkout/         # 支付页面
│   └── page.tsx          # 首页
├── lib/                   # 工具库
│   └── prisma.ts         # Prisma 客户端
├── prisma/               # Prisma 配置
│   └── schema.prisma     # 数据库模型
└── public/               # 静态资源
```

## 核心功能实现

### 1. PDF 工具套件
- 使用 PDF-lib 进行 PDF 操作（合并、分割、旋转等）
- 使用 pdfjs-dist 进行 PDF 转图片
- 使用 ExcelJS 和 xlsx 处理 Excel 文件
- 原生浏览器下载，无需第三方库

### 2. AI 数据提取
- 使用 OpenAI GPT-4 理解文档内容
- 支持自然语言提取指令
- 智能识别表格、列表等结构
- 自动转换为 Excel 格式

### 3. 用户系统
- JWT 认证
- 配额管理（免费 300 页，月付 $9.9/2000 页，年付 $107/20400 页）
- 邀请系统（邀请奖励 100 页）
- 个人资料管理

### 4. 管理后台
- 用户管理和编辑
- 支付信息查看
- 使用统计
- 邀请数据统计

## 定价方案

- **免费版**: $0 - 300 页一次性额度
- **月付版**: $9.9/月 - 2000 页/月
- **年付版**: $107/年 - 20400 页/年

## 开发说明

### 本地开发
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 数据库操作
```bash
# 生成 Prisma 客户端
npx prisma generate

# 推送数据库结构
npx prisma db push

# 查看数据库
npx prisma studio
```

## 部署

推荐部署到 Vercel：

1. 连接 GitHub 仓库到 Vercel
2. 配置环境变量
3. 自动部署

确保配置好环境变量和数据库连接。

## 贡献

欢迎提交 Issue 和 Pull Request。

## License

MIT
