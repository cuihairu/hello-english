<div align="center">

<img src="docs/public/logo.svg" width="96" alt="Hello English logo">

# Hello English

**同等学力英语备考知识库**

[在线阅读](https://cuihairu.github.io/hello-english/) · [考点分析](https://cuihairu.github.io/hello-english/exam/高频考点分析) · [历年真题](https://cuihairu.github.io/hello-english/exam/真题/真题来源核对)

</div>

---

## 简介

本项目整理同等学力人员申请硕士学位英语考试的备考资料，基于 2010-2025 年真题与考点分析构建，使用 [VitePress](https://vitepress.dev) 构建站点。

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
├── .vitepress/        # VitePress 配置与自定义主题
├── english/           # 项目入口说明
├── exam/              # 考点分析、速背版、考点预测
│   └── 真题/          # 2010-2025 历年真题
├── public/            # logo 与 favicon
└── index.md           # 站点首页
```
