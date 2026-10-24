# Summary

> This file is kept only as an mdbook-compatibility note. It does not provide a second, hand-written navigation. The single source of truth for site navigation is [`sidebar.json`](.vitepress/sidebar.json) (English, root pages) and [`sidebar.zh.json`](.vitepress/sidebar.zh.json) (Chinese, `/zh/` pages); VitePress loads the sidebars from those files.
>
> Maintenance rule: when adding, renaming or rearranging site navigation, edit only `.vitepress/sidebar.json` / `.vitepress/sidebar.zh.json`. Do not copy navigation entries into this file. If mdbook navigation is ever needed, generate this file from the sidebars rather than maintaining it by hand. `config.mts` currently excludes this file via `srcExclude`, so no page is built from it.
