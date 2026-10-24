import { defineConfig } from 'vitepress'
import sidebar from './sidebar.json' with { type: 'json' }
import sidebarZh from './sidebar.zh.json' with { type: 'json' }

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: 'Hello English',
  description: 'English learning notes and exam records: pronunciation, roots, history, grammar, tenses, topic notes, and past papers from 2010 to 2025',
  base: '/hello-english/',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: 'https://cuihairu.github.io',
    // alpha 版把不带 base 的绝对路径交给 sitemap 库解析，会吞掉 base；此钩子把前缀补回
    transformItems(items) {
      return items.map((item) => ({
        ...item,
        url: '/hello-english' + (item.url.startsWith('/') ? item.url : `/${item.url}`)
      }))
    }
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/hello-english/favicon.svg' }]
  ],

  // docs/SUMMARY.md 是 mdbook SUMMARY 的结构映射底稿，不作为页面构建
  srcExclude: ['**/SUMMARY.md'],

  // 每页补 og 分享 meta（返回值与原 head 合并，不会覆盖默认项）
  // ctx.page 是 md 源路径而非输出 html（类型注释与实测不符），按 md 去后缀
  transformHead({ page, title, description }) {
    const route = '/' + page.replace(/\.md$/, '').replace(/(^|\/)index$/, '$1')
    const url = encodeURI('https://cuihairu.github.io/hello-english' + (route === '/' ? '/' : route))
    return [
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:site_name', content: 'Hello English' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { name: 'twitter:card', content: 'summary' }]
    ]
  },

  // 语言切换器的唯一数据源。VitePress 2.x 读 site.locales（顶层），
  // 不是 themeConfig.locales；每个 locale 覆盖自己的 nav / sidebar / UI 文案。
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      description: 'English learning notes and exam records: pronunciation, roots, history, grammar, tenses, topic notes, and past papers from 2010 to 2025',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          {
            text: 'Learning Notes',
            items: [
              { text: 'Grammar', link: '/grammar' },
              { text: 'Tenses', link: '/tense' },
              { text: 'History', link: '/history' }
            ]
          },
          { text: 'About', link: '/about' }
        ],
        sidebar: sidebar as never
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      description: '英语笔记与备考记录：发音点读、词根来源、发展历史、语法与时态，附专题、考点分析与 2010-2025 年真题',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          {
            text: '学习笔记',
            items: [
              { text: '发音', link: '/zh/pronunciation' },
              { text: '词根来源', link: '/zh/roots' },
              { text: '发展历史', link: '/zh/history' },
              { text: '发展史时间线', link: '/zh/timeline' },
              { text: '语法', link: '/zh/grammar' },
              { text: '时态', link: '/zh/tense' }
            ]
          },
          { text: '专题', link: '/zh/topic/' },
          { text: '考点分析', link: '/zh/exam/高频考点分析' },
          { text: '历年真题', link: '/zh/exam/真题/真题来源核对' },
          { text: '关于', link: '/zh/about' }
        ],
        sidebar: sidebarZh as never,
        outline: { label: '本页内容', level: [2, 3] },
        docFooter: { prev: '上一页', next: '下一页' },
        lastUpdated: { text: '最后更新' },
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        editLink: { text: '在 GitHub 上编辑此页' }
      }
    }
  },

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Hello English',

    // 语言切换器默认把当前页路径改写进目标语言（linkToCorrespondingPage 写死在
    // VPNavBarExtra.vue 里），英文页还没翻完时会指向不存在的页 → 404。
    // 增量翻译阶段关掉：切换落到目标语言首页，不产生死链。
    // 全部页面都译完后删掉这一行即可恢复「切语言留在同页」。
    i18nRouting: false,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cuihairu/hello-english' }
    ],

    editLink: {
      pattern: 'https://github.com/cuihairu/hello-english/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    footer: {
      message: 'Hello English',
      copyright: '© 2026 cuihairu'
    },

    search: {
      provider: 'local',
      options: {
        // 搜索框文案按 locale 取；root 走 translations，zh 走 locales.zh
        locales: {
          zh: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索' },
              modal: {
                noResultsText: '未找到结果',
                resetButtonTitle: '清除搜索条件',
                footer: { selectText: '选择', navigateText: '导航', closeText: '关闭' }
              }
            }
          }
        },
        translations: {
          button: { buttonText: 'Search docs', buttonAriaLabel: 'Search' },
          modal: {
            noResultsText: 'No results found',
            resetButtonTitle: 'Clear search query',
            footer: { selectText: 'Select', navigateText: 'Navigate', closeText: 'Close' }
          }
        },
        miniSearch: {
          options: {
            // minisearch 默认按空白/标点切词，中文整段成单个 token，词中字搜不到；
            // 西文按词、连续汉字逐字切，让「时态」能拆成「时」「态」命中正文
            tokenize(text: string) {
              return (text.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).flatMap((word) =>
                /^[㐀-鿿]+$/.test(word) ? [...word] : [word]
              )
            }
          }
        }
      }
    }
  },

  markdown: {
    lineNumbers: false
  }
})
