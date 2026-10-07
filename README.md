<div align="center">

<p align="center"><img src="docs/public/logo.svg" width="64" height="64" alt="logo" /></p>

# Hello English

<p align="center"><img src="docs/public/badges/topic.svg" alt="topic" /> <img src="docs/public/badges/docs.svg" alt="docs" /></p>
<p align="center"><img src="docs/public/badges/license.svg" alt="CC BY 4.0" /></p>

**英语学习笔记**

[在线阅读](https://cuihairu.github.io/hello-english/) · [发音](https://cuihairu.github.io/hello-english/pronunciation) · [词根来源](https://cuihairu.github.io/hello-english/roots) · [发展历史](https://cuihairu.github.io/hello-english/history) · [历年真题](https://cuihairu.github.io/hello-english/exam/真题/真题来源核对)

</div>

---

## 简介

本项目是一份持续整理的英语学习笔记，从音标、词根、语法、时态讲到英语语言一千六百年的发展历史；历年备考中积累的考点分析与 2010-2025 年真题也一并收录，作为阅读与练习材料。使用 [VitePress](https://vitepress.dev) 构建站点。

- **学习笔记**：发音（单词与例句点读）、词根来源、发展历史、发展史时间线、语法、时态
- **专题**：易混词、介词、词根家族、长难句、时态对比、发音难点、非谓语动词、比较结构、从句连接词、被动语态、条件与让步，一类问题收拢成一页，[专题总览](https://cuihairu.github.io/hello-english/topic)
- **考点分析**：词汇、口语交际、语法与翻译、写作、阅读、完形与短文完成的高频考点统计，配套速背版与考点预测
- **历年真题**：2010-2025 年共 16 份整理版真题，附来源核对说明与参考答案

## 内容与实现状态

（状态口径：已实现 = 页面构建通过、功能可验证；标注依赖的项外部条件不满足时有明确降级路径）

| 区块 | 页面 | 状态 |
| --- | --- | --- |
| 发音：48 音标、易混音、重音弱读、拼读规律 | `/pronunciation` | 已实现 |
| 点读出声（浏览器语音合成） | SpeakButton 组件 | 已实现（Web Speech API，离线可用） |
| 点读出声（词典真人音频） | SpeakButton 组件 | 已实现，依赖 dictionaryapi.dev（接口不可达时自动回退合成链路） |
| 词根来源：30 条目逐条有来源故事 | `/roots` | 已实现 |
| 发展历史：四段通史 + 借词事件 | `/history` | 已实现 |
| 发展史时间线：33 节点四条线索过滤 | `/timeline` | 已实现 |
| 语法：体系地图、句型、从句、非谓语、虚拟 | `/grammar` | 已实现（关键例句点读） |
| 时态：16 格矩阵 + 九大时态 | `/tense` | 已实现（每时态主例句点读） |
| 专题：易混词、介词、词根家族、长难句、时态对比、发音难点、非谓语动词、比较结构、从句连接词、被动语态、条件与让步 | `/topic` | 已实现（11 篇） |
| 关于本站：定位、受众、学习路径、更新节奏 | `/about` | 已实现 |
| 考点分析（2013-2025 真题） | `/exam/*` | 已实现（词汇题样本 98 题；2019/2021/2024 等个别年份〔待补充〕未纳入统计） |
| 历年真题 2010-2025 共 16 份 | `/exam/真题/*` | 已实现（整理版，个别题目〔待补充〕、部分答案标待核对） |
| 本地搜索：全文检索，中文逐字切词 | 全站搜索框 | 已实现（西文按词、连续汉字逐字切，词中字可命中正文） |
| 站点基建：sitemap 与 robots、og/twitter 分享卡、中文 404 页 | 全站 | 已实现（构建时另含内链死链检查） |

## 点读按钮组件（SpeakButton）

全局注册于 `docs/.vitepress/theme/components/SpeakButton.vue`，Markdown 里可直接使用，发音/词根/语法/时态页均有引用：

```vue
<SpeakButton word="sheep" />                        <!-- 仅图标 -->
<SpeakButton word="sheep" text="sheep" />           <!-- 图标 + 文字 -->
<SpeakButton kind="sentence" word="I can swim." />  <!-- 例句：只走合成链路 -->
```

- `word`（必填）：要朗读的单词或句子。
- `text`：按钮显示文字，缺省只显示图标（适合表格里的例词）。
- `kind`：`word`（默认，先试词典真人音频）或 `sentence`（例句，直接合成）。

行为：单词点击后优先请求 dictionaryapi.dev 的真人音频（按词缓存、3 秒超时），失败回退浏览器语音合成；同一时刻全场只保留一个声音，再点当前按钮即停；按钮侧小字标注本次用的是哪条链路。

## 本地开发

```bash
npm install
npm run docs:dev      # 本地开发，默认 http://localhost:5173/hello-english/
npm run docs:build    # 构建到 docs/.vitepress/dist，构建时检查死链
npm run docs:preview  # 本地预览构建产物
```

## 目录结构

```
docs/
├── .vitepress/        # VitePress 配置与自定义主题（含点读按钮组件）
├── english/           # 项目入口说明
├── exam/              # 考点分析、速背版、考点预测
│   └── 真题/          # 2010-2025 历年真题
├── public/            # logo 与 favicon
├── topic/             # 专题（易混词、介词、词根家族、长难句）
├── index.md           # 站点首页
├── about.md           # 关于本站
├── pronunciation.md   # 发音（音标 · 元辅音 · 易混音，点读）
├── roots.md           # 词根来源
├── history.md         # 发展历史
├── timeline.md        # 发展史时间线（33 节点交互版）
├── grammar.md         # 语法
└── tense.md           # 时态
```

## License

本作品采用 [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/) 许可协议发布。