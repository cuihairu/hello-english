# Todo

- [x] 英文侧对齐 zh 全部页面完成双语（53/53，zh/review 两页为内部审计页不译；2026-10-27 完成）

## 源码分层分析 2026-11-07

- [x] 抽象层清单：8 层（build/deploy `package.json:5` · site config `docs/.vitepress/config.mts:6` · navigation data `docs/.vitepress/sidebar.json` · theme assembly `docs/.vitepress/theme/index.mjs:11` · interactive components `SpeakButton.vue:84` / `DevTimeline.vue:18` · typed data `data/timeline.ts:8` · styling `theme/style.css:9` · content `docs/**/*.md`）
- [x] 超大文件候选：无 >1000 行文件（最大非内容源码 `DevTimeline.vue` 474 行、`SpeakButton.vue` 378 行、`style.css` 326 行；最大内容页 714 行）
- [x] 目录/分类：未见分类问题；仅 README 目录树命名漂移（`review/`、`真题/` 与英文侧 `exam/papers/` 不对齐）
- [x] 英文文档：`docs/review/source-layer-analysis.md`（glossary 31 条、8 层）
