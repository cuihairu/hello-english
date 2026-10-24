import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import '@fontsource/source-serif-4/400-italic.css'
import '@fontsource/source-serif-4/600.css'
import '@fontsource/source-serif-4/700.css'
import './style.css'
import SpeakButton from './components/SpeakButton.vue'
import NotFound from './components/NotFound.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    // 覆盖默认 404，换成双语入口页（英文为主，附简体中文入口）
    return h(DefaultTheme.Layout, null, {
      'not-found': () => h(NotFound)
    })
  },
  enhanceApp({ app }) {
    // 点读按钮：发音页为主战场，词根/语法/时态页的例词例句也复用
    app.component('SpeakButton', SpeakButton)
  }
}
