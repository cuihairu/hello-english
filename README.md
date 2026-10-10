[English](README.md) | [中文](README.zh.md)

<div align="center">

<p align="center"><img src="docs/public/logo.svg" width="64" height="64" alt="logo" /> </p>

# Hello English

<p align="center">
  <img src="docs/public/badges/topic.svg" alt="topic" />
  <img src="docs/public/badges/docs.svg" alt="docs" />
  <img src="docs/public/badges/license.svg" alt="license" />
  <img src="docs/public/badges/langs.svg" alt="langs" />
</p>

**English study notes**

[Read online](https://cuihairu.github.io/hello-english/) · [Knowledge map](https://cuihairu.github.io/hello-english/knowledge) · [Pronunciation](https://cuihairu.github.io/hello-english/pronunciation) · [Word roots](https://cuihairu.github.io/hello-english/roots) · [Language history](https://cuihairu.github.io/hello-english/history) · [Past papers](https://cuihairu.github.io/hello-english/exam/真题/真题来源核对)

</div>

---

## Introduction

This project is a continuously maintained collection of English study notes. It starts from phonetic symbols, word roots, grammar and tenses, and extends to 1,600 years of the history of the English language. Exam-point analyses accumulated over years of exam preparation, together with the past papers from 2010 to 2025, are also included as reading and practice material. The site is built with [VitePress](https://vitepress.dev).

- **Study notes**: pronunciation (click-to-speak for words and example sentences), word roots, language history, history timeline, grammar, tenses
- **Topic pages**: confusable words, prepositions, word-root families, long and complex sentences, tense comparison, pronunciation difficulties, non-finite verbs, comparison structures, clause connectors, the passive voice, condition and concession — one type of problem collected on one page; see the [topic overview](https://cuihairu.github.io/hello-english/topic)
- **Exam-point analysis**: statistics of high-frequency test points in vocabulary, oral communication, grammar and translation, writing, reading, and cloze and text completion, with quick-review editions and exam-point predictions
- **Past papers**: 16 compiled exam papers from 2010 to 2025, with source-verification notes and reference answers

## Content and implementation status

(Status convention: implemented = the page builds and the feature is verifiable; items with external dependencies have a clear fallback when those dependencies are unavailable.)

| Section | Page | Status |
| --- | --- | --- |
| Pronunciation: 48 phonemes, confusable sounds, stress and weak forms, spelling-pronunciation patterns | `/pronunciation` | Implemented |
| Click-to-speak (browser speech synthesis) | SpeakButton component | Implemented (Web Speech API, works offline) |
| Click-to-speak (dictionary human recordings) | SpeakButton component | Implemented; depends on dictionaryapi.dev (falls back to the synthesis path automatically when the API is unreachable) |
| Word roots: 30 entries, each with a source story | `/roots` | Implemented |
| Language history: a general history in four periods, plus loanword events | `/history` | Implemented |
| History timeline: 33 nodes, filterable along four threads | `/timeline` | Implemented |
| Grammar: system map, sentence patterns, clauses, non-finite verbs, subjunctive | `/grammar` | Implemented (key example sentences are click-to-speak) |
| Tenses: 16-cell matrix + nine major tenses | `/tense` | Implemented (the main example of each tense is click-to-speak) |
| Knowledge map: study-note research consolidated in one page — core concepts, authoritative books, official docs with links, usage scenarios, common pitfalls | `/knowledge` | Implemented (each entry cross-linked back to its source page; unverifiable items marked as such) |
| Topic pages: confusable words, prepositions, word-root families, long and complex sentences, tense comparison, pronunciation difficulties, non-finite verbs, comparison structures, clause connectors, the passive voice, condition and concession | `/topic` | Implemented (11 pages) |
| About the site: positioning, audience, learning paths, update cadence | `/about` | Implemented |
| Exam-point analysis (2010-2025 papers) | `/exam/*` | Implemented (148 vocabulary questions sampled, including same-type items from the 2010-2012 old-format papers; 2024 answers pending verification and not yet included) |
| Exam time allocation: per-part pace, six checkpoints, time-value table | `/exam/考场时间分配` | Implemented |
| Mock exam guide: paper selection by completeness, scoring sheet, review workflow | `/exam/模拟考试指南` | Implemented |
| Past papers 2010-2025, 16 in total | `/exam/真题/*` | Implemented (compiled editions; a few 2022 English texts [to be added], 2024 answers marked as pending verification, 2015 answers derived in-house pending verification; the 2015, 2018, 2021 and 2023 papers lack reference translations and model essays for Paper Two, marked on-page) |
| Local search: full-text search with character-level Chinese tokenization | site-wide search box | Implemented (Latin text is tokenized by word and consecutive Chinese characters character by character, so a character inside a word can match body text) |
| Site infrastructure: sitemap and robots, og/twitter share cards, Chinese 404 page | site-wide | Implemented (the build also runs an internal dead-link check) |

## The SpeakButton component

Globally registered at `docs/.vitepress/theme/components/SpeakButton.vue` and usable directly in Markdown; the pronunciation, roots, grammar and tense pages all use it:

```vue
<SpeakButton word="sheep" />                        <!-- icon only -->
<SpeakButton word="sheep" text="sheep" />           <!-- icon + text -->
<SpeakButton kind="sentence" word="I can swim." />  <!-- sentence: synthesis path only -->
```

- `word` (required): the word or sentence to speak.
- `text`: label shown on the button; by default only the icon is shown (suitable for example words in tables).
- `kind`: `word` (default; tries the dictionary human recording first) or `sentence` (example sentence; synthesis only).

Behavior: when a word is clicked, the human recording from dictionaryapi.dev is requested first (cached per word, 3-second timeout), falling back to browser speech synthesis if it fails; only one sound plays at a time site-wide, and clicking the active button again stops it; small text next to the button notes which path was used.

## Local development

```bash
npm install
npm run docs:dev      # local development server, default http://localhost:5173/hello-english/
npm run docs:build    # build into docs/.vitepress/dist, with a dead-link check during the build
npm run docs:preview  # preview the built site locally
```

## Directory structure

```
docs/
├── .vitepress/        # VitePress config and custom theme (includes the SpeakButton component)
├── english/           # project introduction
├── exam/              # exam-point analysis, quick-review editions, predictions
│   └── 真题/          # past papers 2010-2025
├── public/            # logo and favicon
├── topic/             # topic pages (confusable words, prepositions, word-root families, long sentences)
├── index.md           # site home page
├── about.md           # about the site
├── pronunciation.md   # pronunciation (phonemes · vowels and consonants · confusable sounds, click-to-speak)
├── roots.md           # word roots
├── history.md         # language history
├── timeline.md        # history timeline (interactive, 33 nodes)
├── grammar.md         # grammar
└── tense.md           # tenses
```

## License

This work is licensed under the [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/) license.
