<script setup lang="ts">
/**
 * 英语发展史时间线（hello-english 精简版）：
 * 按时期分组的纵向年表 + 类别筛选 + 点击展开细节。
 * 与 hello-economics 的缩放画布版不同，这里不做横向拖拽与缩放，
 * 只保留「读疏密靠时期分组、读细节靠展开」的两层结构。
 * 配色全部走站点既有 CSS 变量，深浅色自动跟随，无新增依赖。
 */
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { withBase } from 'vitepress'
import { ERAS, FIELD_LABELS, TIMELINE, type TimelineEvent } from '../data/timeline'

type Field = TimelineEvent['field']
type Filter = 'all' | Field

/** 稳定 id：取条目在 TIMELINE 里的原始序号，筛选切换后展开态不串位 */
const EVENTS = TIMELINE.map((e, i) => ({ ...e, id: i }))
const byId = new Map(EVENTS.map((e) => [e.id, e]))

const fields = Object.keys(FIELD_LABELS) as Field[]

const filter = ref<Filter>('all')
const openId = ref<number | null>(null)

const counts = computed<Record<Filter, number>>(() => {
  const c: Record<Filter, number> = { all: EVENTS.length }
  for (const f of fields) c[f] = EVENTS.filter((e) => e.field === f).length
  return c
})

const filtered = computed(() =>
  filter.value === 'all' ? EVENTS : EVENTS.filter((e) => e.field === filter.value),
)

/** 归组：year < era.to 即入组，最后一个时期兜底；边界年份（1066、1476）归入后一个时期 */
function eraIndexOf(year: number): number {
  for (let i = 0; i < ERAS.length; i++) if (year < ERAS[i].to) return i
  return ERAS.length - 1
}

const groups = computed(() =>
  ERAS.map((era, i) => ({
    era,
    events: filtered.value.filter((e) => eraIndexOf(e.year) === i),
  })).filter((g) => g.events.length > 0),
)

function toggle(id: number) {
  openId.value = openId.value === id ? null : id
}

/** 筛选切换时收起展开项，避免展开的细节藏进了看不见的分组里 */
watch(filter, () => {
  openId.value = null
})

/* ---------- 滚动入场：IO 加 .in 类；初始态只写在 no-preference 媒体查询里，
   prefers-reduced-motion 用户与无 IO 环境直接看到完整内容 ---------- */

const rootEl = ref<HTMLElement | null>(null)
let io: IntersectionObserver | null = null

function revealAll() {
  rootEl.value?.querySelectorAll('.he-tl-item').forEach((el) => el.classList.add('he-tl-in'))
}

onMounted(() => {
  if (typeof IntersectionObserver === 'undefined') {
    revealAll()
    return
  }
  io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (en.isIntersecting) {
          en.target.classList.add('he-tl-in')
          io?.unobserve(en.target)
        }
      }
    },
    { rootMargin: '0px 0px -36px 0px', threshold: 0.05 },
  )
  scheduleObserve()
})

function scheduleObserve() {
  void nextTick(() => {
    rootEl.value?.querySelectorAll('.he-tl-item:not(.he-tl-in)').forEach((el) => io?.observe(el))
  })
}

// 筛选切换会增删列表项：重新观察新出现的节点
watch(groups, scheduleObserve)

onBeforeUnmount(() => {
  io?.disconnect()
  io = null
})
</script>

<template>
  <section ref="rootEl" class="he-tl">
    <div class="he-tl-filters" role="group" aria-label="按类别筛选时间线">
      <button
        v-for="f in ['all', ...fields] as Filter[]"
        :key="f"
        type="button"
        class="he-tl-chip"
        :class="{ active: filter === f }"
        :aria-pressed="filter === f"
        @click="filter = f"
      >
        {{ f === 'all' ? '全部' : FIELD_LABELS[f] }}
        <span class="he-tl-chip-count">{{ counts[f] }}</span>
      </button>
    </div>

    <div v-for="g in groups" :key="g.era.name" class="he-tl-era">
      <header class="he-tl-era-head">
        <div class="he-tl-era-line">
          <svg class="he-tl-book" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 5.6C10 3.9 7.4 3.1 4 3.1v13.8c3.4 0 6 .8 8 2.5 2-1.7 4.6-2.5 8-2.5V3.1c-3.4 0-6 .8-8 2.5z"
            />
            <path d="M12 5.6v13.8" />
          </svg>
          <h3 class="he-tl-era-name">{{ g.era.name }}</h3>
          <span class="he-tl-era-range">{{ g.era.label }}</span>
          <span class="he-tl-era-count">{{ g.events.length }} 个节点</span>
        </div>
        <p class="he-tl-era-intro">{{ g.era.intro }}</p>
      </header>

      <ol class="he-tl-list">
        <li v-for="ev in g.events" :key="ev.id" class="he-tl-item">
          <article class="he-tl-card" :class="{ open: openId === ev.id }">
            <button
              type="button"
              class="he-tl-head"
              :aria-expanded="openId === ev.id"
              :aria-controls="`he-tl-detail-${ev.id}`"
              @click="toggle(ev.id)"
            >
              <span class="he-tl-year">{{ ev.year }}</span>
              <span class="he-tl-title">{{ ev.title }}</span>
              <span class="he-tl-field">{{ FIELD_LABELS[ev.field] }}</span>
              <svg class="he-tl-chevron" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M4 6l4 4 4-4" />
              </svg>
            </button>
            <div v-show="openId === ev.id" :id="`he-tl-detail-${ev.id}`" class="he-tl-detail">
              <p class="he-tl-who">
                <span class="he-tl-who-label">谁在推动</span>
                {{ ev.who }}
              </p>
              <p class="he-tl-why">{{ ev.why }}</p>
              <p v-if="ev.link" class="he-tl-linkline">
                <a class="he-tl-link" :href="withBase(ev.link)">站内延伸阅读</a>
              </p>
            </div>
          </article>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.he-tl {
  margin: 8px 0 24px;
}

/* ---------- 筛选行 ---------- */
.he-tl-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0 0 28px;
}

.he-tl-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border: 1px solid var(--vp-c-border);
  border-radius: 999px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
  line-height: 1.5;
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
}

.he-tl-chip:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.he-tl-chip.active {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #fff;
}

.he-tl-chip-count {
  font-size: 0.72rem;
  opacity: 0.75;
}

/* ---------- 时期分组 ---------- */
.he-tl-era {
  margin: 0 0 34px;
}

.he-tl-era-line {
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--vp-c-border);
}

.he-tl-book {
  width: 20px;
  height: 20px;
  align-self: center;
  fill: none;
  stroke: var(--vp-c-brand-1);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.8;
}

.he-tl-era-name {
  margin: 0;
  padding: 0;
  border: none;
  font-family: var(--he-serif);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.he-tl-era-range {
  font-family: var(--he-serif);
  font-style: italic;
  font-size: 0.9rem;
  color: var(--vp-c-brand-1);
}

.he-tl-era-count {
  margin-left: auto;
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}

.he-tl-era-intro {
  margin: 10px 0 20px;
  font-size: 0.92rem;
  color: var(--vp-c-text-2);
  line-height: 1.75;
  text-indent: 2em;
}

/* ---------- 纵向年表 ---------- */
.he-tl-list {
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
}

.he-tl-list::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 8px;
  bottom: 12px;
  width: 2px;
  border-radius: 2px;
  background: var(--vp-c-border);
}

.he-tl-item {
  position: relative;
  padding: 0 0 12px 28px;
}

.he-tl-item::before {
  content: '';
  position: absolute;
  left: 1px;
  top: 16px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--vp-c-bg);
  border: 2.5px solid var(--vp-c-brand-1);
  box-sizing: border-box;
}

.he-tl-item:last-child {
  padding-bottom: 0;
}

/* ---------- 节点卡片 ---------- */
.he-tl-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(194, 65, 12, 0.05);
  transition: box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease;
}

.he-tl-card:hover {
  transform: translateY(-2px);
  border-color: var(--vp-c-brand-1);
  box-shadow: var(--he-shadow);
}

.he-tl-head {
  display: flex;
  align-items: baseline;
  gap: 10px;
  width: 100%;
  padding: 11px 14px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  font: inherit;
  color: inherit;
}

.he-tl-year {
  flex: none;
  min-width: 52px;
  font-family: var(--he-serif);
  font-size: 1.02rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-brand-1);
}

.he-tl-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.5;
}

.he-tl-field {
  flex: none;
  margin-left: auto;
  padding: 1px 9px;
  border-radius: 999px;
  background: rgba(194, 65, 12, 0.07);
  color: var(--vp-c-brand-1);
  font-size: 0.72rem;
  white-space: nowrap;
}

.he-tl-chevron {
  flex: none;
  align-self: center;
  width: 14px;
  height: 14px;
  fill: none;
  stroke: var(--vp-c-text-3);
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.2s ease;
}

.he-tl-card.open .he-tl-chevron {
  transform: rotate(180deg);
}

/* ---------- 展开细节 ---------- */
.he-tl-detail {
  padding: 2px 14px 12px;
  border-top: 1px dashed var(--vp-c-border);
}

.he-tl-detail p {
  margin: 8px 0 0;
  font-size: 0.9rem;
  line-height: 1.78;
}

.he-tl-who {
  text-indent: 0;
  color: var(--vp-c-text-2);
}

.he-tl-who-label {
  display: inline-block;
  margin-right: 8px;
  padding: 0 8px;
  border-radius: 999px;
  background: rgba(194, 65, 12, 0.07);
  color: var(--vp-c-brand-1);
  font-size: 0.72rem;
}

.he-tl-why {
  text-indent: 2em;
  color: var(--vp-c-text-1);
}

.he-tl-linkline {
  text-indent: 0;
}

.he-tl-link {
  font-size: 0.85rem;
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.he-tl-link:hover {
  color: var(--vp-c-brand-2, var(--vp-c-brand-1));
}

/* ---------- 滚动入场（尊重 prefers-reduced-motion） ---------- */
@media (prefers-reduced-motion: no-preference) {
  .he-tl-item {
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.45s ease, transform 0.45s ease;
  }

  .he-tl-item.he-tl-in {
    opacity: 1;
    transform: none;
  }
}

/* ---------- 窄屏 ---------- */
@media (max-width: 560px) {
  .he-tl-head {
    flex-wrap: wrap;
    gap: 6px 10px;
  }

  .he-tl-field {
    order: 3;
    margin-left: 62px;
  }

  .he-tl-era-count {
    display: none;
  }
}
</style>
