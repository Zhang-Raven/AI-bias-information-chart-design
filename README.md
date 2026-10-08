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

本项目使用 **Next.js 静态导出 + Cloudflare Pages**。仓库中的 `next.config.mjs` 已设置 `output: "export"`、`trailingSlash: true` 和 `images.unoptimized: true`；运行 `pnpm build` 后，完整站点位于 `out/`。`app/features/[id]/page.tsx` 通过 `generateStaticParams` 预生成五个功能页，部署不需要 Next.js 服务器或数据库。

> 如果以前部署成功过，先按下面的第一部分找到原项目，再重新部署。Cloudflare 项目名称可能与 GitHub 仓库名称不同。本文没有记录已核实的 Cloudflare 账户、项目名或线上域名，请以自己的控制台为准。
>
> 操作路径根据 2026-10-08 的官方文档整理。Cloudflare 不同界面可能显示 **Build**、**Builds** 或 **Builds & deployments**，创建入口也可能显示 **Connect to Git** 或 **Import an existing Git repository**；以对应功能为准。

### 一、在 Cloudflare 找到以前部署的项目

1. 打开 [Cloudflare 控制台](https://dash.cloudflare.com/)，使用上次部署时的登录方式和邮箱登录。
2. 在账户切换器中选择上次使用的 **Account（账户）**。同一个登录用户可能加入多个账户，项目只会出现在所属账户中。
3. 在账户级导航进入 **Workers & Pages**；也可以打开 [Workers & Pages 快捷入口](https://dash.cloudflare.com/?to=/:account/workers-and-pages)。如果当前停留在某个域名的 DNS 设置页，先返回账户主页。
4. 在应用列表查找 Pages 项目，可以搜索 `ai-bias`、`information` 或自己当时取的名字。没有搜索结果时，清除筛选并查看完整列表。
5. 点击候选项目，检查 **Settings（设置）** 中的 **Git repository（Git 仓库）** 是否为：
   `Zhang-Raven/AI-bias-information-chart-design`。
6. 打开 **Deployments（部署）**，查看生产环境的状态、分支、提交记录和 **Production URL（生产地址）**。应使用生产地址作为日常访问入口；某一次部署的预览地址用于查看那个版本。
7. 找到后，将项目控制台地址和生产地址加入浏览器书签。下次直接打开书签即可进入项目，无需重新创建。

这些项目管理入口见 [Cloudflare Pages Git 部署指南](https://developers.cloudflare.com/pages/get-started/git-integration/#manage-site)。

**列表里还是找不到时，依次排查：**

- 切换其他 Cloudflare Account，确认登录邮箱是否与上次相同。
- 查浏览器历史、书签或以前分享的网址。若网址是 `https://项目名.pages.dev`，可用该项目名查找；若带有部署编号或分支前缀，继续确认其所属项目。
- 打开 [本仓库提交历史](https://github.com/Zhang-Raven/AI-bias-information-chart-design/commits/main/)。如果某个提交旁有 Cloudflare 的状态检查，点击状态图标，再进入对应检查的 **Details**，可能找回部署详情或预览链接。没有检查记录并不代表项目不存在。参见 [GitHub 集成的状态检查说明](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/#check-runs)。
- 以前可能采用 **Direct Upload（手动上传）**，这样的 Pages 项目不一定关联 GitHub 仓库，应结合项目名称、上线时间和旧网址确认。
- 若旧地址为 `*.workers.dev`，它属于 Workers，应在同一应用列表中查找 Worker。下面的构建设置适用于本仓库的 Pages 静态导出部署。
- 如果提示仓库已被另一 Cloudflare 账户的 Pages 项目使用，优先找回那个账户中的原项目。该提示的含义见 [Cloudflare Git 集成故障说明](https://developers.cloudflare.com/pages/configuration/git-integration/troubleshooting/#project-creation)；不要为了重新部署而直接删除原项目。

### 二、找到已有项目后，重新部署

#### 方式 A：GitHub 已连接，发布最新代码

1. 在项目的 **Settings → Build / Builds & deployments** 中确认 **Git repository** 是本仓库。
2. 找到 **Branch control / Configure Production deployments**，确认 **Production branch（生产分支）** 为 `main`，并开启 **Enable automatic production branch deployments（自动生产部署）**，然后保存。见 [分支部署控制说明](https://developers.cloudflare.com/pages/configuration/branch-build-controls/)。
3. 按第三部分的表格检查构建命令、输出目录和环境变量。
4. 将修改提交到 GitHub 的 `main` 分支。可以在 GitHub 页面编辑文件，或在本地提交后推送；只有本地保存而未推送，不会触发 Cloudflare 部署。分支上的修改需要合并到 `main` 后才更新生产站点。
5. 回到 **Deployments**，打开新出现的生产部署，查看日志。等待依赖安装、构建和发布完成，确认状态为 **Success / Successful**。
6. 确认新部署对应的提交与 GitHub 最新提交一致，再打开生产地址并按第五部分检查页面。

如果只想重新触发一次构建、暂时没有代码修改，可以在本地仓库运行：

```bash
git switch main
git pull --ff-only
git commit --allow-empty -m "chore: trigger Cloudflare Pages deployment"
git push origin main
```

执行前先处理本地尚未提交的修改。空提交不会修改文件，但会新增一条 Git 提交，并在自动部署已开启且未被跳过时触发部署。

#### 方式 B：重试一次部署

1. 在 **Deployments → All deployments** 中打开要重试的记录。
2. 在部署详情或该记录的 `⋯` 菜单中查找 **Retry deployment / Retry（重试部署）**；有该入口时点击它。
3. 等待新的日志和部署结果。找不到重试入口时，可使用方式 A，通过新提交触发构建。
4. 重试后检查部署关联的提交。重试历史记录与发布 `main` 最新代码是不同操作，不能仅凭“重试成功”判断最新修改已经上线。

Cloudflare 提供对历史 Pages 部署的 [Retry 操作](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/deployments/)，具体按钮位置以控制台为准。修改设置后需要重新构建才会应用到新的部署，保存设置本身不会更新已上线文件。

#### 方式 C：以前使用手动上传

如果项目未连接 GitHub，且当时是将文件拖入 Cloudflare 上传：

1. 在电脑上取得本仓库代码，安装依赖并运行 `pnpm build`，详细命令见第四部分。
2. 进入原 Pages 项目，选择 **Create a new deployment（创建新部署）**。
3. 选择 **Production（生产环境）**，上传新生成的 `out` 文件夹，完成发布。
4. 上传后打开生产地址检查页面。

上传的是构建后的 `out`，不是 GitHub 下载的源码 ZIP，也不是 `app`、`public` 或 `.next` 文件夹。手动上传项目不能直接切换为 Git 自动部署；如需该功能，需要另建 Git 集成项目。已连接 Git 的项目也不能使用控制台拖拽上传入口。见 [Direct Upload 官方说明](https://developers.cloudflare.com/pages/get-started/direct-upload/)。

### 三、需要新建 Pages 项目时，如何配置

仅在确认原项目不存在，或确实需要另建项目时使用这一部分。

1. 登录 [Cloudflare 控制台](https://dash.cloudflare.com/)，选择要保存项目的账户。
2. 进入 **Workers & Pages → Create application（创建应用）→ Pages**。
3. 选择 **Connect to Git / Import an existing Git repository（连接 Git / 导入已有 Git 仓库）**。
4. 选择 **GitHub**，登录 `Zhang-Raven` 所属的 GitHub 账户，并按界面完成授权。
5. 在仓库列表选择 **AI-bias-information-chart-design**，点击 **Begin setup（开始设置）**。导入入口见 [Next.js 静态站点部署说明](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/)。
6. 项目名称可使用 `ai-bias-information-chart-design`；如果提示名称已被占用，请使用其他名称，最终网址以部署结果为准。
7. 按下表设置构建选项。如果框架预设自动填入了其他命令，应手动改成下表的值。

| 控制台字段 | 本项目填写的值 |
| --- | --- |
| Git repository（Git 仓库） | `Zhang-Raven/AI-bias-information-chart-design` |
| Production branch（生产分支） | `main` |
| Framework preset（框架预设） | `Next.js (Static HTML Export)`；没有该选项时用 `None` 并手动填写 |
| Build command（构建命令） | `pnpm install --frozen-lockfile && pnpm build` |
| Build output directory（构建输出目录） | `out` |
| Root directory（根目录） | 保持空白，表示仓库根目录；不要填 `app` 或 `public` |

**环境变量：** 在设置向导的 **Environment variables（环境变量）** 中添加以下构建配置。已有项目则在 **Settings → Environment variables / Variables and Secrets** 中添加；如果区分环境，生产和预览环境分别配置。

| 变量名 | 值 | 用途 |
| --- | --- | --- |
| `NODE_VERSION` | `22` | 明确使用 Node.js 22，避免旧构建环境版本过低 |
| `PNPM_VERSION` | `10.11.1` | 明确 pnpm 版本，与本仓库 v9 锁文件配合使用 |
| `SKIP_DEPENDENCY_INSTALL` | `1` | 跳过 Cloudflare 的自动依赖安装，由上面的构建命令执行安装 |

这里的版本值是重新配置时的建议，不是对上次部署环境的记录。Cloudflare 支持用这些变量指定工具版本和跳过自动安装，见 [构建环境说明](https://developers.cloudflare.com/pages/configuration/build-image/)。当前静态导出部署不需要在仓库里填写 Cloudflare API Token。

8. 点击 **Save and Deploy（保存并部署）**。
9. 等待状态为 **Success / Successful**，点击 **Continue to project（进入项目）**。
10. 在生产部署处复制实际的 `*.pages.dev` 地址并打开检查。Pages 默认域名即可访问，不必先购买域名或配置 DNS。
11. 按第五部分检查站点，并保存控制台书签和部署记录。

**如何确认选择了正确入口：** 本指南使用 Pages 的“构建输出目录”。如果设置页主要要求填写 Worker 的 **Deploy command**，或自动填入 `npx wrangler deploy`，说明进入了 Workers 的部署流程；返回创建入口并选择 Pages，再按此处配置。

### 四、可选：本地构建，检查生成的站点

如果电脑上还没有源码，在安装 Git、Node.js 22 和 pnpm 10.11.1 后，打开终端执行：

```bash
git clone https://github.com/Zhang-Raven/AI-bias-information-chart-design.git
cd AI-bias-information-chart-design
pnpm install --frozen-lockfile
pnpm build
```

如果已下载或克隆过仓库，在原项目目录更新代码即可，不需要重复克隆。构建成功后，应看到：

```text
out/
├── index.html
├── features/
│   ├── 0/index.html
│   ├── 1/index.html
│   ├── 2/index.html
│   ├── 3/index.html
│   └── 4/index.html
├── _next/
└── …复制自 public/ 的图表、图片和案例文件
```

`out/` 是部署产物，不提交到 Git。不要运行 `next start` 来预览静态导出，也不需要额外执行 `next export`。

如果电脑已经安装 Python 3，可从项目目录启动一个静态文件服务：

```bash
python3 -m http.server 8080 --directory out
```

打开 `http://localhost:8080` 检查；按 `Ctrl+C` 停止。这样可以检查导出结果中的图片和页面链接，不要只双击 `index.html`。

### 五、部署后检查哪些页面

将下列路径接在你的实际生产域名后面访问：

| 路径 | 检查内容 |
| --- | --- |
| `/` | 首页、三维标签云、导航和反馈循环图表 |
| `/features/0/` 至 `/features/4/` | 五个功能页都能直接打开并刷新 |
| `/s0_03(1).html`、`/s3.html` | 嵌入式图表和交互 |
| `/smile001/smile003.html` | smile 案例页面与图片 |
| `/tech001/tech003.html` | tech 案例页面与图片 |
| `/medical001/医疗二级界面003.html` | medical 案例页面与图片 |
| `/1.png` | 静态图片能直接访问 |

独立 HTML 图表使用外部 CDN 加载 D3 或 GSAP；若页面能打开而动画未加载，检查浏览器开发者工具的 **Console / Network**，确认外部脚本是否成功请求。

### 六、常见问题排查

| 现象 | 排查与处理 |
| --- | --- |
| Cloudflare 仓库列表里没有本项目 | 确认选中 GitHub 账户 `Zhang-Raven`。打开 [GitHub 已安装应用](https://github.com/settings/installations)，在 **Cloudflare Workers & Pages → Configure → Repository access** 中加入本仓库并保存，再回 Cloudflare 刷新。见 [GitHub 集成授权说明](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/#manage-access)。 |
| 提示 Git 仓库无法访问或应用被暂停 | 检查上述仓库访问权限，以及安装设置中是否需要 **Unsuspend**。具体提示见 [Git 集成故障说明](https://developers.cloudflare.com/pages/configuration/git-integration/troubleshooting/)。 |
| 提示仓库已用于另一个 Cloudflare 账户 | 切回原账户查找已有项目；这通常不是构建参数的问题。 |
| `pnpm: command not found`、Node 版本过低或锁文件版本不兼容 | 检查第三部分的 `NODE_VERSION` 和 `PNPM_VERSION` 是否在本次部署对应的环境中生效，保存后重新部署，并查看日志里实际使用的版本。 |
| `ERR_PNPM_OUTDATED_LOCKFILE` | `package.json` 与锁文件可能不同步。在本地使用约定的 pnpm 运行 `pnpm install`，核对改动，将 `package.json` 与 `pnpm-lock.yaml` 一起提交，再部署。 |
| 找不到 `package.json` | Root directory 应保持空白，使用仓库根目录。 |
| 找不到输出目录，或首页出现 404 | 输出目录应为 `out`。确认构建成功，并保留 `next.config.mjs` 中的 `output: "export"`；本地应生成 `out/index.html`。 |
| 功能页直接打开或刷新时 404 | 确认部署的是完整 `out`，包括 `features/0` 至 `features/4`，并保留 `generateStaticParams` 与 `trailingSlash: true`。 |
| 推送后没有新部署 | 确认提交已推送到 `main`，自动生产部署已开启，GitHub 授权有效；检查 **Build watch paths** 是否排除了改动文件，以及提交说明是否带有 `[CI Skip]` / `[CF-Pages-Skip]` 等跳过标记。见 [跳过构建说明](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/#skipping-a-build-via-a-commit-message)。 |
| 已成功部署，但看到旧内容 | 比对生产部署的提交与 GitHub 最新提交；确认访问的是生产地址而非旧预览链接，再强制刷新或用无痕窗口访问。 |
| 图片或图表缺失 | 检查 `public/` 中的资源是否已提交，代码引用的路径大小写是否一致，再检查浏览器 Network 中失败的请求。 |
| 出现其他构建错误 | 打开失败部署详情，查找日志中最早的具体错误；最后的 `Build failed` 只是结果。可在本地执行同一安装与构建命令定位问题。 |

### 七、找到项目后，记录这些信息

把实际值补充在下面，之后可以直接找到项目；不要填写密码、Token 或其他密钥。

| 信息 | 实际值 |
| --- | --- |
| Cloudflare 账户名称 | 待填写 |
| Pages 项目名称 | 待填写 |
| 项目控制台链接 | 待填写 |
| 生产网站地址 | 待填写 |
| GitHub 仓库 | [Zhang-Raven/AI-bias-information-chart-design](https://github.com/Zhang-Raven/AI-bias-information-chart-design) |
| 生产分支 | `main` |
| 部署方式 | 待填写：Git 集成 / 手动上传 |
| 最近一次确认部署成功的日期 | 待填写 |

本仓库是公开仓库，不想公开的账户信息请保存在个人书签或私人笔记中。

## 维护约定

- 只维护被页面实际引用的组件和依赖；新增依赖后同步提交 `package.json` 与 `pnpm-lock.yaml`。
- 不提交 `node_modules/`、`.next/`、`out/` 或本地环境变量文件。
- 提交说明写明这次修改的具体目的。GitHub 文件列表里的“Last commit message”显示的是该文件最近一次修改所在的 Git 提交说明，并不是逐文件的描述字段；各目录和模块的作用以本 README 和文件名为准。

