<script>
/**
 * 全站点读按钮（单词 / 例句点击出声），两条真实链路自动取舍：
 * ① 真人音频：开放词典接口 dictionaryapi.dev 返回的 audioUrl，
 *    会话内按词缓存；3 秒超时或接口不在线则放弃；
 * ② 语音合成：浏览器自带 Web Speech API（speechSynthesis），
 *    离线可用，是保证「点了必有声」的兜底链路。
 * 同一时刻全场只保留一个声音：新点击会先停掉上一个。
 */
const AUDIO_API = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

/** 词 -> 真人音频地址；null 表示查过且无货（接口不在 / 无音频），下次直接走合成 */
const audioCache = new Map()

/** 当前发声实例；新实例发声前先 stopActive() 停掉它 */
let active = null

function stopActive() {
  if (active) active.stop()
  active = null
}

let speechUnlocked = false
/**
 * Safari/Chrome 要求语音在用户手势调用栈内「解锁」；
 * 点击瞬间先同步发一个静音音节占位，之后 await 完再合成不会被拦。
 */
function unlockSpeech() {
  if (speechUnlocked || typeof window === 'undefined') return
  const synth = window.speechSynthesis
  if (!synth) return
  try {
    const u = new SpeechSynthesisUtterance(' ')
    u.volume = 0
    synth.speak(u)
    speechUnlocked = true
  } catch {
    /* 个别环境禁止空文本发声，无碍：真发声时自行按失败兜底 */
  }
}

/** 查真人音频：成功返回 URL，否则 null（结果缓存，一词一次） */
async function lookupAudio(word) {
  const key = word.trim().toLowerCase()
  if (audioCache.has(key)) return audioCache.get(key)
  let url = null
  try {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 3000)
    const res = await fetch(AUDIO_API + encodeURIComponent(key), { signal: ctrl.signal })
    clearTimeout(timer)
    if (res.ok) {
      const entries = await res.json()
      const clips = []
      for (const entry of Array.isArray(entries) ? entries : []) {
        for (const p of entry.phonetics || []) if (p.audio) clips.push(p.audio)
      }
      if (clips.length) {
        /* 教学音标是英式 RP：优先带 uk/gb 标记的音频 */
        url = clips.find((u) => /(-uk|-gb|_gb_|_uk_)/i.test(u)) || clips[0]
        if (url.startsWith('//')) url = 'https:' + url
      }
    }
  } catch {
    /* 超时 / 断网 / 5xx：标记无货，回退合成 */
  }
  audioCache.set(key, url)
  return url
}
</script>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  /** 要朗读的单词或句子 */
  word: { type: String, required: true },
  /** 按钮文字；缺省只显示图标（适合表格里的例词） */
  text: { type: String, default: '' },
  /** word=单词（先试真人音频） / sentence=句子（只走合成） */
  kind: { type: String, default: 'word' }
})

const state = ref('idle') // idle | loading | playing
const supported = ref(true)
const source = ref('') // 上一次发声用的链路：真人音频 / 合成语音

/* 本实例令牌：模块级 active 只认当前令牌，避免页面切换后误停误判 */
const token = {}
const isMine = () => active && active.token === token
const claim = (stop) => {
  stopActive()
  active = { token, stop }
}
const toIdle = () => {
  state.value = 'idle'
}

async function play() {
  if (state.value === 'loading' || state.value === 'playing') {
    stopActive() // 播放中再点 = 停止
    toIdle()
    return
  }
  unlockSpeech()
  state.value = 'loading'

  if (props.kind === 'word') {
    const url = await lookupAudio(props.word)
    if (state.value !== 'loading') return // 等待期间被再次点击取消
    if (url && startClip(url)) return
    if (state.value !== 'loading') return
  }
  startSpeech()
}

/* 链路一：真人音频。返回 false 表示没能出声，调用方转合成 */
function startClip(url) {
  if (typeof Audio === 'undefined') return false
  let player
  try {
    player = new Audio()
  } catch {
    return false
  }
  player.src = url
  let sounded = false // playing 事件只会在真出声时触发
  const giveUp = () => {
    if (!isMine() || sounded) return
    active = null
    player.pause()
    startSpeech() // 音频链路哑火，转合成，保证有声
  }
  player.addEventListener('playing', () => {
    if (!isMine()) return
    sounded = true
    state.value = 'playing'
    source.value = '真人音频'
  })
  player.addEventListener('ended', () => {
    if (isMine() && sounded) {
      active = null
      toIdle()
    }
  })
  player.addEventListener('error', giveUp)
  const p = player.play()
  if (p && typeof p.catch === 'function') p.catch(giveUp)
  /* 1.5s 内没出声多半是音频源挂了：转合成 */
  setTimeout(() => {
    if (isMine() && !sounded && state.value === 'loading') giveUp()
  }, 1500)
  claim(() => {
    player.pause()
    toIdle()
  })
  return true
}

/* 链路二：浏览器语音合成，离线可用的兜底 */
function startSpeech() {
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null
  if (!synth || typeof SpeechSynthesisUtterance === 'undefined') {
    supported.value = false
    toIdle()
    return
  }
  const u = new SpeechSynthesisUtterance(props.word)
  const voice = pickVoice(synth)
  if (voice) {
    u.voice = voice
    u.lang = voice.lang
  } else {
    u.lang = 'en-US'
  }
  u.rate = props.kind === 'sentence' ? 0.92 : 1
  claim(() => {
    synth.cancel()
    toIdle()
  })
  u.onend = () => {
    if (isMine()) {
      active = null
      toIdle()
    }
  }
  u.onerror = () => {
    if (isMine()) {
      active = null
      toIdle()
    }
  }
  /* 合成没有可靠的「开始」事件：乐观置为 playing，按钮即点即停 */
  state.value = 'playing'
  source.value = '合成语音'
  synth.cancel()
  synth.speak(u)
  /* 个别环境（无英文语音包等）不出声也不回调：按文本长度设看门狗复位 */
  setTimeout(() => {
    if (isMine() && state.value === 'playing' && !synth.speaking) {
      active = null
      toIdle()
    }
  }, Math.max(4500, props.word.length * 130))
}

/** 挑英文语音：教学音标是英式 RP，优先 en-GB，退而 en-US */
function pickVoice(synth) {
  const list = synth.getVoices().filter((v) => /^en([-_]|$)/i.test(v.lang))
  if (!list.length) return null
  const gb =
    list.find((v) => /^en[-_]GB/i.test(v.lang)) ||
    list.find((v) => /(british|england|^uk\b)/i.test(v.name))
  const us = list.find((v) => /^en[-_]US/i.test(v.lang))
  return gb || us || list[0]
}

onMounted(() => {
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null
  supported.value = Boolean(synth || typeof Audio !== 'undefined')
  /* 触发 Chrome 异步加载语音表，首次点击就有音色可选 */
  if (synth) synth.getVoices()
})

onBeforeUnmount(() => {
  if (isMine()) stopActive()
})
</script>

<template>
  <button
    type="button"
    class="he-say"
    :class="`is-${state}`"
    :disabled="!supported"
    :aria-label="`朗读：${word}`"
    :title="supported ? `点击朗读：${word}` : '当前浏览器不支持语音播放'"
    @click="play"
  >
    <span class="he-say-icon" aria-hidden="true">
      <svg class="he-say-speaker" viewBox="0 0 16 16">
        <path class="he-say-body" d="M2.5 6v4h2.6L9 13V3L5.1 6H2.5z" />
        <path class="he-say-wave he-say-w1" d="M11 5.8c.8.8.8 3.6 0 4.4" />
        <path class="he-say-wave he-say-w2" d="M12.7 4.3c1.6 1.6 1.6 5.8 0 7.4" />
      </svg>
      <span class="he-say-bars"><i /><i /><i /></span>
    </span>
    <span v-if="text" class="he-say-text">{{ text }}</span>
    <span v-if="source && state === 'idle'" class="he-say-src">{{ source }}</span>
  </button>
</template>

<style scoped>
.he-say {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin: 0 2px;
  padding: 1px 9px 1px 7px;
  border: 1px solid var(--vp-c-border);
  border-radius: 999px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
  font-weight: 500;
  line-height: 1.6;
  vertical-align: middle;
  white-space: nowrap;
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
}
.he-say:hover:not(:disabled),
.he-say:focus-visible {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}
.he-say:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.he-say.is-loading,
.he-say.is-playing {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.he-say-icon {
  position: relative;
  display: inline-flex;
  width: 14px;
  height: 14px;
  flex: none;
}
.he-say-speaker {
  width: 14px;
  height: 14px;
}
.he-say-body {
  fill: currentColor;
}
.he-say-wave {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.4;
  stroke-linecap: round;
}
.he-say-bars {
  display: none;
  position: absolute;
  inset: 0;
  align-items: flex-end;
  justify-content: center;
  gap: 2px;
  padding-bottom: 1px;
}
.he-say-bars i {
  width: 2.5px;
  height: 100%;
  border-radius: 1px;
  background: currentColor;
  transform-origin: bottom;
  animation: he-say-bounce 0.7s ease-in-out infinite;
}
.he-say-bars i:nth-child(2) {
  animation-delay: 0.15s;
}
.he-say-bars i:nth-child(3) {
  animation-delay: 0.3s;
}
.is-playing .he-say-bars {
  display: inline-flex;
}
.is-playing .he-say-speaker {
  display: none;
}
.is-loading .he-say-speaker {
  animation: he-say-pulse 1s ease-in-out infinite;
}
@keyframes he-say-bounce {
  0%,
  100% {
    transform: scaleY(0.35);
  }
  50% {
    transform: scaleY(1);
  }
}
@keyframes he-say-pulse {
  50% {
    opacity: 0.25;
  }
}
@media (prefers-reduced-motion: reduce) {
  .he-say-bars i,
  .he-say.is-loading .he-say-speaker {
    animation: none;
  }
}

.he-say-text {
  font-family: 'Source Serif 4', Georgia, 'Times New Roman', serif;
}
.he-say-src {
  font-size: 0.66rem;
  font-weight: 400;
  opacity: 0.6;
}
</style>
