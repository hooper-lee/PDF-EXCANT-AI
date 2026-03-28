# 项目清理总结

## 本次仓库治理目标

本次清理的目标是让仓库只保留以下内容：

- 源码
- 配置文件
- 项目文档
- 必要静态资源

不应提交到 Git 的本地产物，例如 `node_modules/`、`.next/`、本地数据库、编辑器配置和 macOS 垃圾文件，应从工作区移除并通过 `.gitignore` 持续忽略。

## 已确认需要忽略的内容

- `node_modules/`
- `.next/`
- `.idea/`
- `.vscode/`
- `.DS_Store`
- `._*`
- `__MACOSX/`
- `*.db`
- `*.db-journal`
- 常见日志、缓存、临时目录和构建产物

## 当前仓库应保留的核心目录

```text
app/        Next.js 页面、布局、API 路由和组件入口
lib/        认证、AI、Excel、国际化等核心逻辑
prisma/     Prisma schema 与 seed 脚本
public/     必要静态资源
scripts/    项目自带脚本
```

## 说明

- `scripts/` 属于项目源码的一部分，不应按“临时文件”处理。
- 数据库默认使用 SQLite，本地开发可能会生成 `prisma/dev.db`，该文件不应提交到仓库。
- 如果历史提交中已经包含 `node_modules/` 或 `.next/` 等大文件，仅清理当前工作区还不够，仍需额外清理 Git 历史。

## 建议的发布前检查

1. 确认工作区中不存在 `node_modules/`、`.next/`、`.idea/`、`.vscode/`、`.DS_Store`、`*.db`。
2. 执行 `npm install` 重新安装依赖。
3. 执行 `npm run build` 验证项目仍可正常构建。
4. 若远端推送仍提示大文件问题，继续处理历史污染。
