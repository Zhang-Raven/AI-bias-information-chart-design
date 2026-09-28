# AI 偏差信息图设计

通过交互式图表、图片案例和三维标签云，展示 AI 图像生成与标注中的属性关联，以及模型反馈循环可能带来的偏差放大。这是一个前端可视化作品；部分动画数值是演示数据，不能作为独立的研究结论使用。

## 网站内容

| 页面 / 模块 | 内容 | 主要文件 |
| --- | --- | --- |
| 首页 `/` | 项目介绍、研究流程、标签云与反馈循环图表 | `app/page.tsx`、`components/` |
| `/features/0/` | AI 图像样本集 | `components/feature-data.tsx` |
| `/features/1/` | 图片属性标签提取 | `components/feature-extract.tsx` |
| `/features/2/` | 属性之间的关联规则 | `components/feature-logic.tsx` |
| `/features/3/` | Lift 指标的解释 | `components/feature-lift.tsx` |
| `/features/4/` | 论文复现与再挖掘的展示页 | `app/features/[id]/FeaturePage.tsx` |

首页的三维标签云在 `components/s1.tsx`、`components/s1-visualizer.tsx` 和 `components/s1-data.ts` 中实现。嵌入式图表及案例保留在 `public/`：`s0_03(1).html`、`s3.html`、`plot_source_data.csv`，以及 `smile001/`、`tech001/`、`medical001/` 子目录。`public/1.png` 至 `public/38.png` 是展示图片。

> 数据说明：`feature-logic.tsx` 与 `feature-lift.tsx` 中的部分 Lift 动画值由示例公式生成；请以原始研究数据和方法核对实际数值。`public/` 中的独立 HTML 页面通过 CDN 加载 D3 或 GSAP，离线查看时这些交互可能不可用。

## 本地开发

需要 Node.js 18.17 或更高版本，以及 pnpm。

```bash
pnpm install --frozen-lockfile
pnpm dev
```

在浏览器打开 `http://localhost:3000`。修改页面内容时，先找 `app/` 中的路由，再找对应的 `components/`；修改嵌入式图表或案例时，编辑 `public/` 中的 HTML、CSV 和图片。静态资源在代码中以 `/文件名` 或 `/目录/文件名` 引用。

## 构建与 Cloudflare Pages

项目使用 Next.js 静态导出。运行 `pnpm build` 后，完整站点位于 `out/`；该目录由构建生成，不提交到 Git。`app/features/[id]/page.tsx` 通过 `generateStaticParams` 预生成五个功能页，因此部署不需要 Next.js 服务器或数据库。

在 Cloudflare Pages 中连接本 GitHub 仓库，选择 `main` 为生产分支，并使用以下设置：

| 设置 | 值 |
| --- | --- |
| Framework preset | Next.js (Static HTML Export)，或 None 并手动填入下方命令 |
| Build command | `pnpm install --frozen-lockfile && pnpm build` |
| Build output directory | `out` |
| Root directory | 仓库根目录（保持空白或 `/`） |

首次部署成功后，Cloudflare 会提供 `*.pages.dev` 预览域名。后续推送到 `main` 会触发新的生产部署。部署后建议检查首页、五个功能页，以及 `/s3.html` 和三个案例子页面中的图表和图片。

## 维护约定

- 只维护被页面实际引用的组件和依赖；新增依赖后同步提交 `package.json` 与 `pnpm-lock.yaml`。
- 不提交 `node_modules/`、`.next/`、`out/` 或本地环境变量文件。
- 提交说明写明这次修改的具体目的。GitHub 文件列表里的“Last commit message”显示的是该文件最近一次修改所在的 Git 提交说明，并不是逐文件的描述字段；各目录和模块的作用以本 README 和文件名为准。
