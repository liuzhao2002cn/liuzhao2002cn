# 构建说明

## 首次使用或更新依赖时

```bash
npm install
```

## 本地开发

```bash
hugo server
```

**注意**：本地开发时搜索功能不可用，需要先构建。

## 完整构建（包含搜索索引）

```bash
# 方法一：使用 npm script
npm run build

# 方法二：手动执行
hugo --minify
npx pagefind --source public
```

## 本地测试完整功能

```bash
# 1. 构建
npm run build

# 2. 启动服务器
hugo server --disableFastRender

# 或者使用 Python 简单服务器
cd public
python3 -m http.server 8000
```

然后访问 http://localhost:8000

## 部署到 GitHub Pages

推送到 `main` 分支后，GitHub Actions 会自动：
1. 运行 `hugo --minify`
2. 生成搜索索引 `npx pagefind --source public`
3. 部署到 GitHub Pages

## 常见问题

### 搜索功能不工作

**原因**：Pagefind 搜索索引还没有生成

**解决方案**：
```bash
npm run build
```

### JavaScript 文件加载失败

**原因**：Hugo 资源管道需要处理 assets 目录下的文件

**解决方案**：确保使用 `hugo server` 或 `hugo` 命令启动，不要直接打开 HTML 文件

### 样式不生效

**原因**：PostCSS 需要 node_modules

**解决方案**：
```bash
npm install
hugo server
```

## 功能特性

- ✅ 响应式设计
- ✅ 跨性别三色主题
- ✅ 阅读进度指示器
- ✅ 字体大小调节器
- ✅ 固定目录
- ✅ 全文搜索（需构建）
- ✅ 代码高亮
- ✅ 数学公式支持
- ✅ 评论系统（Giscus）
