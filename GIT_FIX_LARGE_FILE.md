# 修复 GitHub 推送报错：大文件 (node_modules)

## 原因
`node_modules` 被提交进了 Git，其中 `@next/swc-darwin-arm64` 等文件超过 GitHub 单文件 100MB 限制。

## 解决步骤（在项目根目录执行）

### 方案 A：node_modules 是最近才被提交的

```bash
# 1. 从 Git 里移除 node_modules（不删本地文件夹）
git rm -r --cached node_modules

# 2. 若 .next 也被提交过，一并移除
git rm -r --cached .next 2>/dev/null || true

# 3. 提交
git add .
git commit -m "chore: remove node_modules and .next from tracking"

# 4. 推送
git push origin main
```

若推送仍报 **GH001: Large files detected**，说明历史提交里已经包含大文件，用方案 B。

---

### 方案 B：历史提交里已有大文件，需要清理历史

```bash
# 1. 先按方案 A 做一遍（移除当前跟踪）
git rm -r --cached node_modules 2>/dev/null || true
git rm -r --cached .next 2>/dev/null || true
git add .
git commit -m "chore: stop tracking node_modules and .next" || true

# 2. 从所有历史中删除 node_modules 再推送（会改写历史）
git filter-branch --force --index-filter \
  'git rm -rf --cached --ignore-unmatch node_modules' \
  --prune-empty --tag-name-filter cat -- --all

# 3. 强制推送（会覆盖远程历史，确认分支只有你在用再执行）
git push origin main --force
```

若团队其他人已拉过该仓库，提前告知他们你改写了历史，他们需要：

```bash
git fetch origin
git reset --hard origin/main
```

---

### 以后避免再次提交 node_modules

- 项目已配置 `node_modules/` 在 `.gitignore` 中，**不要**执行 `git add .` 时再误加 node_modules。
- 克隆仓库后在本机执行 `npm install` 即可，无需提交依赖。
