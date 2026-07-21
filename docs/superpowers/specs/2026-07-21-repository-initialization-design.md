# PM AI Agent Book 仓库初始化设计

## 目标

将 `/Users/kakarrot/Dev/Obsidian-Wiki/project/pm-ai-agent-book` 中已经完成的第一版书稿迁入当前 Git 仓库，并建立适合 GitHub 阅读的项目首页。

完成后，读者应能从根目录 `README.md` 理解本书定位、适合人群、内容结构和阅读方式，并通过目录链接直接阅读全部章节。

## 内容边界

本次包含：

- 迁入引言、10 章正文和后记；
- 迁入现有书稿说明，作为 `book/README.md`；
- 迁入原书内容迁移表，作为写作参考资料；
- 创建面向 GitHub 读者的根目录 `README.md`；
- 将 Obsidian Wikilink 转换为普通 Markdown 相对链接；
- 使用稳定、可排序的英文文件名组织章节。

本次不包含：

- 改写或扩写正文；
- PDF、网站、构建系统、示例代码或多语言版本；
- 未经作者确认的开源许可证；
- 修改 GitHub 远端仓库名称或其他远端设置。

## 目录结构

```text
README.md
book/
  README.md
  00-introduction.md
  01-ai-agent-product-basics.md
  02-opportunity-and-scenario-selection.md
  03-user-research-and-task-modeling.md
  04-agent-product-definition.md
  05-interaction-trust-and-control.md
  06-from-requirements-to-capabilities.md
  07-agent-evaluation.md
  08-reliability-safety-and-cost.md
  09-launch-operations-and-iteration.md
  10-roadmap-and-collaboration.md
  11-afterword.md
references/
  source-migration-map.md
```

英文文件名只承担稳定链接和排序作用，正文标题继续使用简体中文。

## README 设计

根目录 `README.md` 是项目入口，包含：

1. 书名和一句话定位；
2. 本书解决的问题；
3. 目标读者与非目标；
4. 内容特色；
5. 按四篇组织的完整章节目录；
6. 推荐阅读路径；
7. 当前状态；
8. 参考与致谢。

首页只陈述当前仓库已经具备的内容，不宣称存在 PDF、配套代码、实验、多语言版本或正式出版计划。

`book/README.md` 保留第一版书稿已有的详细定位、案例线、章节组成和图示约定，并把章节 Wikilink 改为 GitHub 可用的相对链接。

## 内容迁移规则

- 复制源文件内容，不移动或修改 Obsidian 源目录。
- 正文语义保持不变，只允许修改因仓库结构产生的链接。
- 所有章节必须能从根目录 `README.md` 访问。
- `book/README.md` 中不保留 `[[...]]` 形式的 Wikilink。
- 写作参考资料与面向读者的正文分开放置。

## 验证标准

- `book/` 中包含引言、10 章正文、后记和书稿说明，共 13 个 Markdown 文件；
- `references/` 中包含原书内容迁移表；
- 根目录 README 的全部本地链接指向真实文件；
- 仓库中不存在残留的 Obsidian Wikilink；
- 迁移后的正文除链接外与源文件一致；
- `git diff --check` 通过；
- Git 状态中没有本次范围之外的修改。

## 已知决策

- 采用 `book/` 集中存放正文，而不是把章节堆放在根目录或按篇建立多层目录。
- 当前远端名 `pm-ai-agnet-book` 疑似包含拼写错误，但本次不处理。
- 当前不添加 LICENSE，待作者单独选择授权方式。
