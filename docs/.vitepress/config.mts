import { defineConfig } from 'vitepress'
import sidebar from './sidebar.json'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'Hello English',
  description: '同等学力英语备考知识库，涵盖考点分析、高频词汇、语法翻译、写作阅读与 2010-2025 历年真题',
  base: '/hello-english/',
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/hello-english/favicon.svg' }]
  ],

  // docs/SUMMARY.md 是 mdbook SUMMARY 的结构映射底稿，不作为页面构建
  srcExclude: ['**/SUMMARY.md'],

  ignoreDeadLinks: true,

  themeConfig: {
    logo: '/hello-english/logo.svg',
    siteTitle: 'Hello English',

    nav: [
      { text: '首页', link: '/' },
      { text: '考点分析', link: '/exam/高频考点分析' },
      { text: '高频词汇', link: '/exam/高频词汇' },
      { text: '高频写作', link: '/exam/高频写作' },
      { text: '历年真题', link: '/exam/真题/真题来源核对' }
    ],

    // 由 mdbook SUMMARY.md 结构映射而来（scripts: parse_summary.py），
    // 3 个顶层条目：入口页、考点分析、历年真题（2010-2025）
    sidebar: sidebar as never,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cuihairu/hello-english' }
    ],

    footer: {
      message: 'Hello English',
      copyright: '© 2025 cuihairu'
    },

    search: {
      provider: 'local',
      options: {
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
