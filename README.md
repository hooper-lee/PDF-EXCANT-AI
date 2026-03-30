# PDF Extract AI

基于 Next.js 14、TypeScript 和 Prisma 的全栈项目，包含两部分能力：

- 登录后使用的 PDF / 图片文本提取与 Excel 导出
- 一组在浏览器端运行的 PDF 工具页面

这份 README 只描述当前代码中已经存在并可验证的能力，不把预留配置或未来计划写成已实现功能。

## 项目简介

当前项目提供了用户注册登录、基础套餐页数控制、文档记录、后台管理，以及一批 PDF 工具页面。

AI 提取主链路目前是：

1. 用户上传 PDF 或图片
2. PDF 通过 `pdf-parse` 提取文本，图片通过 `tesseract.js` 做 OCR
3. LangGraph 在 `call-llm` 节点读取后台 LLM 配置；若后台未配置，则回退到 `.env`
4. 若存在可用 OpenAI 配置，则使用配置中的模型提取结构化 JSON
5. 若未配置可用 API Key，则退回到基于规则的演示模式提取
6. 将提取结果导出为 Excel，并记录 `Document + ExtractionJob`

## 当前能力边界

### 数据库

- 当前 Prisma `datasource` 使用的是 SQLite
- 默认连接串见 `.env.example`：`file:./dev.db`
- README 里不再将 PostgreSQL 写成当前默认实现
- 如果要切换 PostgreSQL，需要同步修改 `prisma/schema.prisma` 的 `provider`，当前代码并未直接支持“只改环境变量即可切换”

### 支付

- 当前支付流程是“本地模拟支付 + 本地订单 / 订阅记录”
- 前端有结账页，后端会写入 `Order` 和 `Subscription`
- `app/api/payment/process/route.ts` 当前只做本地表单校验和模拟支付结果，不会调用第三方支付网关
- 仓库中保留了 `STRIPE_*` 环境变量和 `Subscription` / `User` 上的部分 Stripe 预留字段，但当前没有真正创建 Stripe PaymentIntent、Checkout Session，也没有 webhook 闭环
- 因此当前状态应视为“仅 mock 支付”，不是“部分 Stripe 已接入”

### AI 提取

- 已有上传、OCR、OpenAI 提取、Excel 导出链路
- OpenAI 是当前真实接入的 AI 提取方式
- 管理后台可以配置当前生效的 LLM 提供商、模型、API Key 和可选 Base URL
- `GEMINI_API_KEY` 目前只是预留，代码中已明确注释为暂时禁用
- 当前最小支持的提供商包括 `OpenAI`、`OpenAI Compatible`、`Gemini`
- 若后台未配置，则回退读取 `.env` 中的 `OPENAI_*` 或 `GEMINI_*`
- 若没有可用 API Key，系统会退回规则提取，适合演示，不等同于高质量 AI 解析

### 文件存储

- 上传记录会写入 `Document`
- 但 `fileUrl` 当前写入的是空字符串
- 代码中没有把原文件上传到 S3 / R2 或其他对象存储

### PDF 工具页

已存在并有页面实现的工具页包括：

- PDF 合并
- PDF 分割
- PDF 压缩
- PDF 旋转
- PDF 提取页面
- PDF 删除页面
- PDF 添加页码
- PDF 添加水印
- PDF 打印辅助
- JPG 转 PDF
- Excel 转 PDF
- PDF 转 JPG

以下页面目前仍是占位或“开发中”状态，不应视为已完成功能：

- `app/tools/pdf-edit/page.tsx`
- `app/tools/pdf-to-excel/page.tsx`

## 技术栈

- 前端：Next.js 14、React 18、TypeScript、Tailwind CSS
- 后端：Next.js Route Handlers
- 数据库：Prisma + SQLite
- 认证：JWT、bcryptjs
- AI / OCR / Workflow：OpenAI、Tesseract.js、LangGraph
- PDF / Excel：pdf-lib、pdf-parse、pdfjs-dist、ExcelJS、xlsx
- 支付相关：当前仅有本地模拟支付流程，未集成第三方支付 SDK

## 架构边界

当前仓库已引入 LangGraph，但只用于 `ExtractionJob` 的提取工作流编排。

### LangGraph 负责什么

- 仅负责 AI 提取工作流的节点编排
- 当前覆盖：
  - 加载任务与文档
  - 检测文本层
  - 文本提取
  - OCR fallback
  - 文本归一化
  - Prompt 组装
  - LLM 调用
  - 结果校验
  - Excel 导出
  - 成功/失败结果落库

### service / repository 负责什么

- 普通 SaaS 业务仍保留在 `lib/services` 和 `lib/repositories`
- 例如：
  - 用户认证与用户资料
  - mock 支付、订单、订阅
  - 额度聚合与额度流水
  - 管理后台 CRUD
  - Prisma 查询与数据库访问

### 当前边界说明

- LangGraph 不负责用户认证
- LangGraph 不负责支付、订单、订阅
- LangGraph 不负责用户额度总览查询
- LangGraph 不负责后台管理逻辑
- 提取工作流节点可以调用已有 service / repository，但不承载这些领域本身的业务规则

## 当前已实现功能

### 页面

- 公共页面：首页、关于、定价、支持、隐私、条款
- 用户页面：注册、登录、提取页、Dashboard、Profile、Settings
- 支付页面：Checkout、支付成功页、支付失败页
- 后台页面：管理员登录、管理员主页
- 工具页：`/tools` 及多个 PDF 工具子页面

### API

- 认证：
  - `POST /api/auth/signup`
  - `POST /api/auth/login`
  - `GET /api/auth/me`
  - `PUT /api/auth/me`
  - `POST /api/auth/change-password`
  - `DELETE /api/auth/delete-account`
- 文档：
  - `POST /api/upload`
  - `GET /api/documents`
  - `GET /api/documents/[id]`
  - `DELETE /api/documents/[id]`
  - `POST /api/export-excel`
- 支付与订单：
  - `POST /api/payment/process`
  - `GET /api/payment/order/[orderId]`
- 后台：
  - `GET /api/admin/stats`
  - `GET /api/admin/users`
  - `PUT /api/admin/users`
  - `POST /api/admin/users`
  - `PUT /api/admin/users/[id]`
  - `GET /api/admin/llm-config`
  - `PUT /api/admin/llm-config`
- 邀请：
  - `POST /api/user/generate-invite-code`

### 数据模型

当前 `prisma/schema.prisma` 中包含：

- `User`
- `Document`
- `ExtractionJob`
- `ExtractionTemplate`
- `UsageRecord`
- `Subscription`
- `Order`
- `LlmConfig`

## 本地运行

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

```bash
cp .env.example .env
```

最小可运行配置通常需要：

- `DATABASE_URL`
- `JWT_SECRET`

说明：

- `OPENAI_API_KEY` 现在可以放在 `.env`，也可以在后台里配置
- 如果后台和 `.env` 都没有可用 API Key，上传提取仍可运行，但会退回规则提取模式
- `STRIPE_*`、`AWS_*`、`GEMINI_API_KEY` 当前不是本地运行主链路的必需项

### 3. 初始化数据库

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

`npm run db:seed` 会创建或提升一个管理员账号，读取以下环境变量：

- `ADMIN_EMAIL`
- `ADMIN_INITIAL_PASSWORD`

如果未配置，会使用默认值：

- `admin@example.com`
- `admin`

### 4. 启动开发环境

```bash
npm run dev
```

默认访问地址：

- [http://localhost:3000](http://localhost:3000)

## 环境变量说明

### 当前直接使用

- `DATABASE_URL`
  - Prisma 数据库连接
  - 默认值对应 SQLite 本地文件
- `JWT_SECRET`
  - JWT 签名与校验
- `OPENAI_API_KEY`
  - OpenAI / OpenAI Compatible 的环境变量回退项
- `OPENAI_MODEL`
  - 后台未配置时的模型回退项
- `OPENAI_BASE_URL`
  - 后台未配置时的可选 API Base URL 回退项
- `GEMINI_API_KEY`
  - Gemini 的环境变量回退项
- `GEMINI_MODEL`
  - Gemini 的模型回退项
- `ADMIN_EMAIL`
  - `db:seed` 时的管理员邮箱
- `ADMIN_INITIAL_PASSWORD`
  - `db:seed` 时的管理员初始密码
- `NEXT_PUBLIC_APP_URL`
  - 前端应用地址

### 当前预留或未形成闭环

- `GEMINI_API_KEY`
  - 代码中已预留，但当前未实际启用
- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
  - 当前仓库未调用 Stripe SDK，这些变量仅作为后续接入预留
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `AWS_BUCKET_NAME`
  - 当前没有把上传文件写入对象存储

## 数据库初始化方式

当前默认使用 SQLite，本地初始化流程如下：

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

如果后续要改为 PostgreSQL，需要至少同步调整：

- `.env` 中的 `DATABASE_URL`
- `prisma/schema.prisma` 中的 `datasource db.provider`

## 项目结构

```text
app/      页面、布局、组件入口和 API Route Handlers
lib/      认证、Prisma、AI 提取、Excel 导出、多语言等逻辑
prisma/   Prisma schema 和 seed 脚本
public/   静态资源
scripts/  项目脚本
```

其中与后端分层相关的实际职责是：

- `app/api/`
  - 路由入口、参数解析、鉴权、调用 service、返回响应
- `lib/services/`
  - 普通业务编排，例如 document / extraction / quota / billing
- `lib/repositories/`
  - Prisma 数据访问
- `lib/workflows/extraction-graph/`
  - 仅 AI 提取工作流编排

## 待改进方向

- 如需接入 Stripe，建议下一步先补 `Checkout Session` 或 `PaymentIntent` 创建，再补 webhook、订阅同步和额度发放对账
- 将上传文件落到对象存储，并让 `fileUrl` / `outputUrl` 有真实值
- 统一部分状态字段为 Prisma enum，而不是字符串
- 继续补全 `pdf-edit`、`pdf-to-excel` 等仍处于占位状态的页面
- 将部分 Route Handler 中的业务逻辑继续下沉到 `lib` 层
