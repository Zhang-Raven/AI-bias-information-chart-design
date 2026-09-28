# AI bias information chart design

这是一个用于展示 AI 偏差如何在数据、模型和视觉输出中被继承与放大的交互式信息图网站。

## 本地运行

需要 Node.js 18.17+ 和 pnpm。

```bash
pnpm install
pnpm dev
```

打开 <http://localhost:3000>。

## 构建部署

项目已配置为 Next.js 静态导出，适合直接部署到 Cloudflare Pages：

- Build command: `pnpm install --frozen-lockfile && pnpm build`
- Build output directory: `out`
- Root directory: `/`

构建会预生成首页和 `/features/0` 到 `/features/4` 五个功能页面。`public/` 中的交互式 HTML 可视化和图片资源会一并发布。

## 项目结构

- `app/`：Next.js 页面、布局和静态路由
- `components/`：页面区块与可视化组件
- `public/`：交互式 HTML、图片和分析数据
- `next.config.mjs`：静态导出配置
