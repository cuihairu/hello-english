import DefaultTheme from 'vitepress/theme'
import '@fontsource/source-serif-4/400-italic.css'
import '@fontsource/source-serif-4/600.css'
import '@fontsource/source-serif-4/700.css'
import './style.css'
import SpeakButton from './components/SpeakButton.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 点读按钮：发音页为主战场，词根/语法/时态页的例词例句也复用
    app.component('SpeakButton', SpeakButton)
  }
}
