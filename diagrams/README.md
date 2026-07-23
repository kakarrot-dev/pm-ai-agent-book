# 教程图表

正文引用 `svg/` 中的静态 SVG，因此 Typora、GitHub、网站和 PDF 使用同一份视觉结果。

- `source/`：可维护的 Mermaid 源码。
- `svg/`：发布时使用的统一风格 SVG。
- `mermaid.config.json`：颜色、字体和布局配置。
- `mermaid.css`：节点、分组、连线和标签样式。

每个 Mermaid 源文件必须有同名 SVG。提交前可以运行零依赖内容检查确认对应关系：

```bash
node scripts/check-content.mjs
```

重新生成全部图表：

```bash
node scripts/sync-diagrams.mjs render
```

脚本固定使用 Mermaid CLI `11.16.0`。如果系统没有自动下载的 Chromium，会依次查找 macOS 和 Linux 上常见的 Chrome/Chromium 路径，也可以通过 `PUPPETEER_EXECUTABLE_PATH` 指定浏览器。

生成过程会检查每个 SVG 的真实 `viewBox`。高度与宽度之比超过 `1.35` 时构建失败，防止纵向长图在 Typora、GitHub 或 PDF 中跨越多个阅读视口。

`extract` 会把正文中的 Mermaid 代码块迁移到 `source/` 并替换为 SVG 引用，只用于仍含 Mermaid 代码块的书稿：

```bash
node scripts/sync-diagrams.mjs extract
```

图表源文件属于代码资产，采用 [Apache License 2.0](../LICENSE-CODE)；书稿中发布的 SVG 和概念插图采用 [CC BY-SA 4.0](../LICENSE-CONTENT)。
