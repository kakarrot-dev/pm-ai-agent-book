# AI Agent 产品经理实战

一本从机会识别、产品定义到评估上线，系统讲解如何做好 Agent 产品的中文书。

[开始阅读](book/00-introduction.md) · [书稿说明](book/README.md) · [原书项目](https://github.com/bojieli/ai-agent-book)

## 项目介绍

AI Agent 产品的难点，不只是让模型能够调用工具，而是判断什么问题值得 Agent 化、应该给它多大自主权，以及如何让结果可验证、风险可控制、产品可持续运营。

本书面向 AI 产品经理，沿着完整产品生命周期回答这些问题。内容以客户服务与事务办理 Agent、企业知识与办公 Agent 两条案例线展开，重点讨论产品决策，而不是工程实现细节。

## 适合谁阅读

- 已有传统产品经验，希望转向 AI 产品或 Agent 产品的产品经理；
- 正在负责 AI 产品，希望系统补齐 Agent 产品方法论的从业者；
- 需要与产品、设计、算法、工程、安全和运营团队协作的项目负责人。

本书不要求编程、模型训练或 Agent 工程经验，也不作为 Agent 编程教程、模型训练教程或通用产品经理入门教材。

## 内容特色

- **围绕产品生命周期组织**：从机会识别推进到产品定义、能力方案、评估、上线和规模化经营。
- **强调可验证的产品判断**：讨论目标、权限、证据、风险、成本和人工介入，而不只罗列模型能力。
- **双案例贯穿全书**：持续比较事务型 Agent 与企业知识型 Agent 的产品差异。
- **提供可复用工具**：每章包含检查表、模板或思考题，帮助复核真实项目决策。

## 目录

| 篇章 | 章节 | 核心问题 |
| --- | --- | --- |
| 开篇 | [引言](book/00-introduction.md) | 为什么需要用产品经理视角理解 Agent？ |
| 第一篇 | [第 1 章：AI Agent 产品入门](book/01-ai-agent-product-basics.md) | 用户需要的是一次回答，还是一个可交付结果？ |
| 第一篇 | [第 2 章：机会识别与场景选择](book/02-opportunity-and-scenario-selection.md) | 什么需求真正值得 Agent 化？ |
| 第一篇 | [第 3 章：用户研究与任务建模](book/03-user-research-and-task-modeling.md) | 如何把用户需求拆成可执行、可验证的任务？ |
| 第二篇 | [第 4 章：Agent 产品定义](book/04-agent-product-definition.md) | 如何定义 MVP、自主等级和人工介入边界？ |
| 第二篇 | [第 5 章：交互、信任与控制权](book/05-interaction-trust-and-control.md) | 如何让用户理解、控制并接管 Agent？ |
| 第二篇 | [第 6 章：从产品需求到能力方案](book/06-from-requirements-to-capabilities.md) | 如何把产品需求映射到模型、知识、工具和工作流？ |
| 第三篇 | [第 7 章：Agent 评估体系](book/07-agent-evaluation.md) | 如何证明产品有效，而不只是演示效果好？ |
| 第三篇 | [第 8 章：可靠性、安全与成本](book/08-reliability-safety-and-cost.md) | 如何管理错误行动、权限、隐私和单位经济性？ |
| 第三篇 | [第 9 章：上线、运营与持续迭代](book/09-launch-operations-and-iteration.md) | 如何从真实失败和用户反馈中持续改进？ |
| 第四篇 | [第 10 章：产品路线图与组织协作](book/10-roadmap-and-collaboration.md) | 何时扩展能力，以及团队如何共同负责结果？ |
| 收束 | [后记](book/11-afterword.md) | 做 Agent 产品最终需要坚持哪些判断原则？ |

## 推荐阅读路径

- **系统学习**：从引言开始按章节顺序阅读，建立完整的 Agent 产品方法。
- **正在选场景**：重点阅读第 1 至 3 章。
- **正在定义和设计产品**：重点阅读第 4 至 6 章。
- **准备评估或上线**：重点阅读第 7 至 9 章。
- **规划长期能力与团队协作**：阅读第 10 章。

更详细的书稿定位、案例线和图示约定见[书稿说明](book/README.md)。

## 项目状态

仓库当前收录第一版书稿，包括引言、10 章正文、后记和书稿说明。内容会根据实际产品案例和读者反馈持续修订。

当前仓库不包含 PDF、配套代码、网站或多语言版本。

## 参与贡献

欢迎通过 Issue 或 Pull Request 参与完善本书：

- 报告错别字、失效链接和事实错误；
- 提出更清晰的表达建议；
- 补充有代表性的 Agent 产品案例；
- 讨论产品方法、检查表和模板的适用边界。

提交建议时，请说明对应章节、问题背景和建议修改内容，方便核查与讨论。

## 相关项目与致谢

本书是面向 AI 产品经理的内容重组与改写，内容来源与处理方式见[原书内容迁移表](references/source-migration-map.md)。本仓库不是原作者官方仓库。

原书《[深入理解 AI Agent：设计原理与工程实践](https://github.com/bojieli/ai-agent-book)》由[李博杰（Bojie Li）](https://github.com/bojieli)创作，原项目维护于 [`bojieli/ai-agent-book`](https://github.com/bojieli/ai-agent-book)。

> 更多硬核 AI Agent 技术内容，可阅读李博杰的《[深入理解 AI Agent：设计原理与工程实践](https://github.com/bojieli/ai-agent-book)》。

感谢原作者的系统性工作，也感谢参与本书案例讨论、内容审阅和实践反馈的同行与读者。

## 许可证

当前仓库尚未添加开源许可证。在许可证明确之前，仓库公开可见不代表内容可以被任意复制、修改或再分发。原项目的 Apache License 2.0 不自动适用于本仓库。
