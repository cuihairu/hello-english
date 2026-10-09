import { defineConfig } from 'vitepress'
import sidebar from './sidebar.json' with { type: 'json' }

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'Hello English',
  description: '英语学习笔记：发音点读、词根来源、发展历史、语法与时态，附专题、考点分析与 2010-2025 历年真题',
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

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Hello English',

    nav: [
      { text: '首页', link: '/' },
      {
        text: '学习笔记',
        items: [
          { text: '发音', link: '/pronunciation' },
          { text: '词根来源', link: '/roots' },
          { text: '发展历史', link: '/history' },
          { text: '发展史时间线', link: '/timeline' },
          { text: '语法', link: '/grammar' },
          { text: '时态', link: '/tense' }
        ]
      },
      { text: '专题', link: '/topic/' },
      { text: '考点分析', link: '/exam/高频考点分析' },
      { text: '历年真题', link: '/exam/真题/真题来源核对' },
      { text: '关于', link: '/about' }
    ],

    // 6 个顶层条目：入口页、学习笔记、专题、考点分析、历年真题（2010-2025）、关于。
    // 早期由 mdbook SUMMARY.md 结构映射而来，学习笔记组为手工扩展
    sidebar: sidebar as never,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cuihairu/hello-english' }
    ],

    editLink: {
      pattern: 'https://github.com/cuihairu/hello-english/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    footer: {
      message: 'Hello English',
      copyright: '© 2026 cuihairu'
    },

    search: {
      provider: 'local',
      options: {
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
        },
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索' },
          modal: {
            noResultsText: '没有找到结果',
            resetButtonTitle: '清除查询条件',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
          }
        }
      }
    },

    outline: {
      label: '页面导航',
      level: [2, 3]
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    lastUpdated: {
      text: '最后更新'
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  },

  markdown: {
    lineNumbers: false
  }
})
