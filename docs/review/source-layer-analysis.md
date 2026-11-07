# Source Layer Analysis

This report describes how the `hello-english` repository is layered by responsibility (not by directory name). It was produced by reading the source before writing, and by treating "layer" as a unit of responsibility rather than a folder name.

## Scope

- **Repository**: `hello-english`, a bilingual (English root + Chinese `/zh/`) VitePress static documentation site, deployed to GitHub Pages.
- **Source examined**: everything except `node_modules`, `docs/.vitepress/dist`, `docs/.vitepress/cache`, `.git`, `package-lock.json`, `pnpm-lock.yaml`, and binary `zt2022.pdf`. The analysis covers the build/config entrypoints, the theme runtime, the interactive components, the typed timeline datasets, the styling layer, and the Markdown content tree.
- **Key finding**: there is no server, no database, no Redis/MySQL, and no state persistence layer. The site is fully static; the only runtime state is in-browser component state and module-scoped caches. "State storage" is therefore either browser memory or nothing.

## Glossary

| Term | English | Definition | File:line |
| --- | --- | --- | --- |
| Static site | Static site | A site whose HTML is generated once at build time and served as plain files; no server-side request handling exists in this repo. | `docs/.vitepress/config.mts:6` |
| VitePress | VitePress | The static-site generator used to build the docs; configured via `defineConfig`. | `docs/.vitepress/config.mts:1` |
| Locale | Locale | A language variant of the site. English is the `root` locale; Chinese lives under `/zh/`. | `docs/.vitepress/config.mts:48` |
| `i18nRouting` | i18n routing | Disabled because the English and Chinese directory names do not align; the language switcher falls back to the target-language home. | `docs/.vitepress/config.mts:122` |
| Sidebar source | Sidebar source | The single source of truth for navigation; `sidebar.json` (English root) and `sidebar.zh.json` (Chinese `/zh/`). Loaded into the config as JSON imports. | `docs/.vitepress/config.mts:2` |
| `SUMMARY.md` | mdBook note | An mdbook-compatibility note only; explicitly excluded from page build via `srcExclude`, so it is never rendered as a page. | `docs/.vitepress/config.mts:29` |
| OG share meta | Open Graph | Social share metadata injected per page by the `transformHead` hook, which builds the canonical route from the Markdown source path. | `docs/.vitepress/config.mts:33` |
| Sitemap hook | Sitemap hook | A `transformItems` callback that re-prefixes the `base` path because the alpha VitePress sitemap library drops it. | `docs/.vitepress/config.mts:15` |
| Local search | Local search | Full-text search over the built site using the `local` provider, with a custom character-level tokenizer for Chinese. | `docs/.vitepress/config.mts:138` |
| Chinese tokenizer | Tokenizer | Splits consecutive Han characters into single characters so a character inside a word can match body text. | `docs/.vitepress/config.mts:166` |
| Theme | Theme | A custom theme that extends VitePress's `DefaultTheme` and registers global components. | `docs/.vitepress/theme/index.mjs:11` |
| 404 override | 404 page | A custom not-found layout with bilingual entry cards, injected through the `not-found` slot. | `docs/.vitepress/theme/index.mjs:13` |
| `SpeakButton` | Speak button | A globally registered component that reads a word or sentence aloud with two fallback audio paths. | `docs/.vitepress/theme/index.mjs:21` |
| Human audio | Real voice | The primary audio path: fetches a recording URL from the `dictionaryapi.dev` API, cached per word with a 3-second timeout. | `docs/.vitepress/theme/components/SpeakButton.vue:10` |
| Synth audio | Synth voice | The fallback path: browser `speechSynthesis` (Web Speech API), usable offline; guarantees a sound. | `docs/.vitepress/theme/components/SpeakButton.vue:170` |
| Audio cache | Audio cache | A module-scoped `Map` from lowercased word to URL or `null`; `null` marks "queried and unavailable". | `docs/.vitepress/theme/components/SpeakButton.vue:13` |
| Active instance | Active sound | The single currently playing audio instance; a new sound stops the previous one. | `docs/.vitepress/theme/components/SpeakButton.vue:16` |
| Speech unlock | Gesture unlock | A synchronous silent utterance issued on click so Safari/Chrome permit later synthesis after an `await`. | `docs/.vitepress/theme/components/SpeakButton.vue:28` |
| Voice pick | Voice picking | Prefers `en-GB` (British RP) then `en-US` for the teaching convention's British phonemes. | `docs/.vitepress/theme/components/SpeakButton.vue:217` |
| Watchdog | Watchdog | A timeout that resets the button if synthesis never reports `speaking`, sized by text length. | `docs/.vitepress/theme/components/SpeakButton.vue:208` |
| Timeline dataset | Timeline data | The typed event list (year, title, who, field, why, link) plus era grouping; two parallel datasets, Chinese and English. | `docs/.vitepress/theme/data/timeline.ts:8` |
| `DevTimeline` | Timeline component | The interactive timeline component: era grouping, category filter, expandable cards, scroll-reveal. | `docs/.vitepress/theme/components/DevTimeline.vue:18` |
| Field category | Category | One of `lang`, `lexicon`, `standard`, `exam`; drives the filter chips and the count badge. | `docs/.vitepress/theme/data/timeline.ts:14` |
| Props as copy | Props as copy | The component's labels and datasets are passed as props, so one component serves both languages without hard-coded text. | `docs/.vitepress/theme/components/DevTimeline.vue:18` |
| Era grouping | Era grouping | Four eras; an event joins the era where `year < to`, with the last era inclusive. | `docs/.vitepress/theme/data/timeline.ts:41` |
| Reveal on scroll | Scroll reveal | An `IntersectionObserver` adds a `.he-tl-in` class for entrance animation; degrades gracefully without IO or with reduced motion. | `docs/.vitepress/theme/components/DevTimeline.vue:80` |
| Brand tokens | Brand tokens | Terracotta brand colors, warm paper background, serif heading font; defined as CSS custom properties in light and dark variants. | `docs/.vitepress/theme/style.css:9` |
| Content width | Readability | A global override widening the content column to 960px and enabling table scrolling. | `docs/.vitepress/theme/custom.css:7` |
| Content layer | Content | The Markdown pages: English at the root, Chinese under `/zh/`, topics under `/topic/`, exam material under `/exam/`. | `docs/index.md:1` |
| CI workflow | CI/CD | GitHub Actions workflow that builds the site with Node 22 and deploys the artifact to GitHub Pages. | `.github/workflows/deploy-docs.yml:17` |
| Build scripts | Build scripts | `docs:dev`, `docs:build`, `docs:preview` — the three npm scripts that drive VitePress. | `package.json:5` |


## Architecture by layer

### 1. Build and deployment layer

- **Implementation**: `package.json` (scripts) and `.github/workflows/deploy-docs.yml` (CI).
- **Config schema**: no schema file; the scripts in `package.json:5` are the only interface.
- **Protocol**: none; the workflow runs `npm ci` then `npm run docs:build` and uploads `docs/.vitepress/dist` to Pages.
- **Copy**: none — no user-facing text lives here.

The repo is a static site: the build produces HTML once and there is no request-time server. The CI `build` job checks out, sets up Node 22, installs with `npm ci`, runs `docs:build`, and uploads the artifact; the `deploy` job publishes it.

### 2. Site configuration layer

- **Implementation**: `docs/.vitepress/config.mts`.
- **Config schema**: the `defineConfig` object at `docs/.vitepress/config.mts:6` is the whole site schema — `lang`, `title`, `base`, `sitemap`, `head`, `srcExclude`, `transformHead`, `locales`, `themeConfig`, `markdown`.
- **Protocol**: none beyond VitePress's own config contract.
- **Copy**: navigation labels and UI strings are embedded here per locale; the Chinese locale overrides `outline`, `docFooter`, `lastUpdated`, `returnToTopLabel`, `sidebarMenuLabel`, `darkModeSwitchLabel`, `editLink` text at `docs/.vitepress/config.mts:80`.

Two important decisions live here. First, `i18nRouting: false` (`config.mts:122`) because the English and Chinese directory names do not align; the language switcher falls back to the target home rather than 404. Second, the search provider is `local` with a custom `tokenize` (`config.mts:166`) that splits consecutive Han characters into single characters so Chinese text is searchable.

### 3. Navigation data layer

- **Implementation**: `docs/.vitepress/sidebar.json` (English root) and `docs/.vitepress/sidebar.zh.json` (Chinese `/zh/`).
- **Config schema**: JSON arrays of `{ text, link }` and `{ text, items }` groups.
- **Protocol**: no dedicated file; `config.mts:2-3` imports them as JSON.
- **Copy**: every sidebar label is author-maintained copy.

`SUMMARY.md` (`docs/SUMMARY.md:3`) explicitly declares these two JSON files as the single source of truth for navigation and is itself excluded from the build by `srcExclude` (`config.mts:29`). The rule: edit only the two JSON files, never copy navigation into `SUMMARY.md`.

### 4. Theme assembly layer

- **Implementation**: `docs/.vitepress/theme/index.mjs`.
- **Config schema**: the default export object at `index.mjs:11`.
- **Protocol**: none; it is VitePress theme entry.
- **Copy**: no copy text; it only wires components and styles.

It imports the serif font faces, `style.css`, `custom.css`, `SpeakButton`, and `NotFound`; extends `DefaultTheme`; overrides the `not-found` slot with a bilingual 404 (`index.mjs:13`); and registers `SpeakButton` globally in `enhanceApp` (`index.mjs:19`).

### 5. Interactive component layer

#### `SpeakButton.vue` — text-to-speech

- **Implementation**: `docs/.vitepress/theme/components/SpeakButton.vue`.
- **Props**: `word` (required), `text`, `kind` (`'word'` default or `'sentence'`), at `SpeakButton.vue:84`.
- **State**: component refs `state` (`idle|loading|playing`), `supported`, `source`, plus module-level `audioCache` (`Map`) and `active` singleton. All state is in-browser memory; nothing is persisted.
- **Call surface**: consumed in Markdown as a global component; it calls out to `dictionaryapi.dev` (HTTPS) and the browser `speechSynthesis` API.
- **Copy**: locale-dependent button labels (`Real voice` / `Synth voice`, `Read aloud:`, etc.) computed at `SpeakButton.vue:79`.

The dual-path design is the notable decision: try the human recording first (cached, 3s timeout), fall back to synthesis, and stop any previous sound before starting a new one (`SpeakButton.vue:108`).

#### `DevTimeline.vue` — interactive history timeline

- **Implementation**: `docs/.vitepress/theme/components/DevTimeline.vue`.
- **Props**: `events`, `eras`, `fieldLabels`, plus six label strings (`allLabel`, `filterLabel`, `nodesLabel`, `whoLabel`, `moreLabel`), at `DevTimeline.vue:18`.
- **State**: refs `filter`, `openId`, computed `counts`, `filtered`, `groups`; an `IntersectionObserver` (`io`). All in-browser memory.
- **Call surface**: rendered in `docs/timeline.md` with the English dataset; data comes from props, not imports inside the component.
- **Copy**: default props are Chinese; the English page passes English labels.

#### `NotFound.vue` — bilingual 404

- **Implementation**: `docs/.vitepress/theme/components/NotFound.vue`.
- **State**: a static `links` array; no runtime state.
- **Call surface**: injected by the theme's `not-found` slot.
- **Copy**: English primary links plus one Chinese entry at `NotFound.vue:9`.

### 6. Typed data layer

- **Implementation**: `docs/.vitepress/theme/data/timeline.ts` (Chinese) and `docs/.vitepress/theme/data/timeline.en.ts` (English).
- **Config schema**: `TimelineEvent` interface (`timeline.ts:8`) — `year`, `title`, `who`, `field`, `why`, optional `link`; `Era` interface (`timeline.ts:28`).
- **Protocol**: no dedicated file; imported directly by `DevTimeline.vue` and by the Markdown pages.
- **Copy**: all node copy and era intros are in these datasets; the English file mirrors the Chinese one.

The two datasets are parallel and deliberately kept separate so the English page (`docs/timeline.md`) passes the English arrays and the Chinese page passes the Chinese arrays. The component is language-agnostic because it receives data and labels as props.

### 7. Styling and brand layer

- **Implementation**: `docs/.vitepress/theme/style.css` and `docs/.vitepress/theme/custom.css`.
- **Config schema**: CSS custom properties (`--vp-c-brand-*`, `--vp-c-bg-*`, `--vp-font-*`, `--he-*`) defined in `:root` and `.dark`.
- **Protocol**: none.
- **Copy**: none.

`style.css` defines the terracotta brand palette, warm paper background, serif heading font, and scrollbar/focus styles. `custom.css` widens content to 960px, wraps long code lines, and scrolls wide tables for readability.

### 8. Content layer

- **Implementation**: `docs/**/*.md` (English root) and `docs/zh/**/*.md` (Chinese locale), including `topic/`, `exam/`, `exam/papers/`, `zh/topic/`, `zh/exam/`, `zh/exam/真题/`.
- **Config schema**: frontmatter (`layout`, `title`, `hero`, `features`) plus Markdown; page layout is driven by `docs/index.md:1`.
- **Protocol**: `docs/SUMMARY.md` is a compatibility note only; `sidebar.json`/`sidebar.zh.json` are the real navigation.
- **Copy**: the bulk of the site's text — notes, topics, exam analysis, and 16 past papers.

The content tree is the largest layer by line count. English pages live at the root; the full Chinese edition lives under `/zh/`. A few pages embed VitePress components directly (e.g. `docs/timeline.md` imports `DevTimeline`), which is how interactive features reach the static pages.

## State storage, call surface, config inputs, and lifecycle

### State storage

There is no Redis, MySQL, database, or file-backed store. The only state is:

- **Module-scoped cache**: `audioCache` in `SpeakButton.vue:13` (word -> URL or `null`) and the `active` singleton at `SpeakButton.vue:16`.
- **Component refs**: `state`, `supported`, `source` in `SpeakButton.vue:93`; `filter`, `openId` in `DevTimeline.vue:35`.
- **Computed state**: `counts`, `filtered`, `groups` in `DevTimeline.vue:38-58`.
- **Static data**: the timeline datasets at `timeline.ts:8` and `timeline.en.ts:9` are build-time constants, not runtime state.

All of it is ephemeral browser memory. Nothing survives a page reload; there is no persistence layer.

### Call surface (who calls whom, through what channel)

- **Build time**: `package.json:5` scripts -> `vitepress build docs` -> `config.mts` reads `sidebar.json`/`sidebar.zh.json` via JSON imports (`config.mts:2-3`).
- **Render time**: `theme/index.mjs` registers `SpeakButton` globally (`index.mjs:21`); Markdown pages use it directly. `timeline.md` imports `DevTimeline` and the English dataset and passes them as props.
- **Runtime (browser)**: `SpeakButton` -> `dictionaryapi.dev` via `fetch` (`SpeakButton.vue:50`) and -> `window.speechSynthesis` (`SpeakButton.vue:171`). `DevTimeline` -> `IntersectionObserver` (`DevTimeline.vue:85`).
- **Deploy time**: `.github/workflows/deploy-docs.yml` -> `npm ci` + `npm run docs:build` -> uploads `docs/.vitepress/dist` to GitHub Pages.

### Configuration inputs

- **Site config**: `config.mts` (`defineConfig`) — the single schema for the whole site.
- **Navigation**: `sidebar.json` / `sidebar.zh.json` — imported, not hand-copied into `SUMMARY.md`.
- **Build tooling**: `package.json` devDependencies (`vitepress`, `vue`) and dependency (`@fontsource/source-serif-4`).
- **CI**: `.github/workflows/deploy-docs.yml` (`node-version: 22`, `cache: npm`).
- **Component inputs**: props for `SpeakButton` (`word`, `text`, `kind`) and `DevTimeline` (datasets + labels).

### Lifecycle

- **Build**: `npm run docs:build` -> VitePress renders every Markdown page to static HTML in `docs/.vitepress/dist`.
- **Deploy**: on push to `main`, the workflow rebuilds and deploys to GitHub Pages.
- **Page load**: the browser hydrates the static HTML; `SpeakButton` unlocks speech on first click (`onMounted` at `SpeakButton.vue:227`), `DevTimeline` sets up its observer on mount (`DevTimeline.vue:80`).
- **Unmount**: `SpeakButton` stops the active sound (`SpeakButton.vue:234`); `DevTimeline` disconnects its observer (`DevTimeline.vue:108`).

## Reasons for the split

1. **Static site, so no persistence layer is warranted.** The repo builds plain HTML once (`package.json:7`); there is no request-time server to hold state, so Redis/MySQL would be dead weight. Evidence: `package.json:7`, `.github/workflows/deploy-docs.yml:36`.
2. **Config is one schema file so all site-wide switches are discoverable.** `config.mts` is the single `defineConfig` object (`config.mts:6`); splitting it would scatter `base`, `locales`, and `themeConfig` across files. Evidence: `config.mts:10`, `config.mts:48`, `config.mts:113`.
3. **Navigation is JSON data, kept out of code, so it can be edited without touching the build.** The two `sidebar.json` files are the declared single source of truth (`docs/SUMMARY.md:3`) and are imported as data (`config.mts:2-3`); `SUMMARY.md` is excluded from build (`config.mts:29`). Evidence: `docs/SUMMARY.md:3`, `config.mts:2`, `config.mts:29`.
4. **The speak component is self-contained so its dual audio paths and cache stay together.** All audio logic — the dictionary lookup, the cache, the synthesis fallback, the singleton stop — lives in one file (`SpeakButton.vue:10-234`), which is the unit of behavior a reader needs to understand "how does sound happen". Evidence: `SpeakButton.vue:10`, `SpeakButton.vue:13`, `SpeakButton.vue:170`.
5. **The timeline component is data-driven, so the same UI serves two languages.** `DevTimeline` receives events, eras, labels as props (`DevTimeline.vue:18-26`) and never imports a language; the English and Chinese datasets are separate modules (`timeline.en.ts:2`, `timeline.ts:3`). Evidence: `DevTimeline.vue:18`, `timeline.en.ts:2`.
6. **The theme is a thin assembly layer, so component registration is one place.** `theme/index.mjs` registers `SpeakButton`, overrides 404, and loads fonts/styles in 23 lines (`index.mjs:11-22`), leaving the components themselves independent. Evidence: `index.mjs:11`, `index.mjs:21`.
7. **Content is separated from logic so notes and code can evolve at different speeds.** The Markdown tree (`docs/`) holds all user-facing text and has no `.ts`/`.vue`; the runtime code lives entirely under `docs/.vitepress/`. Evidence: `docs/index.md:1`, `docs/.vitepress/config.mts:1`.
8. **Brand styling is a token layer, not scattered in components.** `style.css` defines the palette and fonts once (`style.css:9-42`); components use `var(--vp-c-brand-1)` rather than hard-coded colors. Evidence: `style.css:9`, `style.css:39`.
9. **CI is separated from app code so build and deploy are reproducible.** The workflow pins Node 22 and uses `npm ci` (`deploy-docs.yml:26-33`), which is the only place deployment is configured; no app file needs to know about Pages. Evidence: `deploy-docs.yml:26`, `deploy-docs.yml:35`.

## File-size candidates (no files over 1000 lines)

No tracked source file exceeds 1000 lines. The largest non-content source files are `DevTimeline.vue` (474 lines), `SpeakButton.vue` (378 lines), and `style.css` (326 lines); the largest content files are Markdown pages under `docs/exam/` and `docs/zh/exam/`, none of which exceed 714 lines. No split is recommended on size grounds alone.

## Directory and classification observations

The content tree is consistent with its purpose: English pages at the root, Chinese under `/zh/`, topics under `topic/` (and `zh/topic/`), exam material under `exam/` (and `zh/exam/`). No directory mixes runtime code with Markdown, and no source file is misnamed relative to its content. The only minor note is that the README directory listing still mentions `review/` and `真题/` (the Chinese-only past-paper folder name) while the English side uses `exam/papers/`; this is a documentation-naming drift rather than a code layering problem.

## Summary

- **Layer count**: 8 responsibility layers (build/deploy, site config, navigation data, theme assembly, interactive components, typed data, styling/brand, content).
- **Glossary entries**: 31.
- **No source file exceeds 1000 lines**; no LAY split candidates are required.
- The site is static with no persistence; all runtime state is browser memory.
