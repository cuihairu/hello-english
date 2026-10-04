<div align="center">

<img src="docs/public/logo.svg" width="96" alt="Hello English logo">

# Hello English

**英语学习笔记**

[在线阅读](https://cuihairu.github.io/hello-english/) · [发音](https://cuihairu.github.io/hello-english/pronunciation) · [词根来源](https://cuihairu.github.io/hello-english/roots) · [发展历史](https://cuihairu.github.io/hello-english/history) · [历年真题](https://cuihairu.github.io/hello-english/exam/真题/真题来源核对)

</div>

---

## 简介

本项目是一份持续整理的英语学习笔记，从音标、词根、语法、时态讲到英语语言一千六百年的发展历史；历年备考中积累的考点分析与 2010-2025 年真题也一并收录，作为阅读与练习材料。使用 [VitePress](https://vitepress.dev) 构建站点。

- **学习笔记**：发音（单词与例句点读）、词根来源、发展历史、发展史时间线、语法、时态
- **考点分析**：词汇、语法与翻译、写作、阅读的高频考点统计，配套速背版与考点预测
- **历年真题**：2010-2025 年共 16 份整理版真题，附来源核对说明与参考答案

## 本地开发

```bash
npm install
npm run docs:dev      # 本地开发，默认 http://localhost:5173/hello-english/
npm run docs:build    # 构建到 docs/.vitepress/dist
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
├── index.md           # 站点首页
├── pronunciation.md   # 发音（音标 · 元辅音 · 易混音，点读）
├── roots.md           # 词根来源
├── history.md         # 发展历史
├── grammar.md         # 语法
└── tense.md           # 时态
```
