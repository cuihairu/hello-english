---
title: 发展史时间线
---

<script setup>
import { withBase } from 'vitepress'
import { ERAS, FIELD_LABELS, TIMELINE } from './.vitepress/theme/data/timeline'
import DevTimeline from './.vitepress/theme/components/DevTimeline.vue'

function eraIndexOf(year) {
  for (let i = 0; i < ERAS.length; i++) if (year < ERAS[i].to) return i
  return ERAS.length - 1
}
const eventsOf = (era) => TIMELINE.filter((e) => eraIndexOf(e.year) === ERAS.indexOf(era))
</script>

# 发展史时间线

英语有一千六百年连续可考的历史（449 至今）。这条线按年代排出 {{ TIMELINE.length }} 个节点，分四个时期：古英语、中古英语、早期现代英语、现代与全球。每个节点都先回答「为什么是这个时候」，再落到它留给今天的影响；与词汇、考试相关的节点附有站内延伸阅读。

## 这条线怎么读

**先筛后看。** 顶部标签按语音与文字、词汇与词源、规范与词典、考试与教学四类过滤。只看「考试与教学」，这条线从 1913 年剑桥首考一路排到四六级、雅思与同等学力统考，「英语能力」如何被制度化的一百多年一目了然；只看「规范与词典」，则能看到从法庭改口、印刷定拼法，到约翰逊词典与 OED 的立规链条。

**点开看细节。** 点击任意节点展开三个信息：谁在推动、为什么是这个时候、站内延伸阅读。许多节点彼此互为因果：没有 1066 年的法语统治，就没有 1362 年的法庭改口；没有 878 年爱丁顿的和约，古英语散文传统未必存得下来。展开读这些来由，比只记年份有用得多。

**需要通读时**，页面底部「按时期通读全部节点」是同一份数据的文本形态，不依赖交互，也便于逐条对照[高频词汇](/exam/高频词汇)与[词根词缀速记](/exam/词根词缀)。

## 关于这份数据本身

年份取事件发生或传统纪年之年：449 是比德给出的登陆纪年，1400 的元音大推移是通行约数，条目里都有说明；其余年份取学界通说。站内内容与通说冲突时，以站内真题与考点分析为准。最后一个节点停在 1991 年：万维网之后的变化还太近，尚不足以定论，留待日后补写。

<DevTimeline />

## 按时期通读全部节点

<div class="he-tl-plain">
  <template v-for="era in ERAS" :key="era.name">
    <h3>{{ era.name }}（{{ era.label }}）</h3>
    <ol>
      <li v-for="ev in eventsOf(era)" :key="ev.year + ev.title">
        <p><strong>{{ ev.year }}</strong>　{{ ev.title }}（{{ FIELD_LABELS[ev.field] }}；{{ ev.who }}）</p>
        <p>{{ ev.why }}</p>
        <p v-if="ev.link"><a :href="withBase(ev.link)">站内延伸阅读</a></p>
      </li>
    </ol>
  </template>
</div>
