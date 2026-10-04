<script setup>
import { withBase } from 'vitepress/client'

const links = [
  { text: '发音', desc: '48 音标点读', href: '/pronunciation' },
  { text: '专题', desc: '易混词 · 介词 · 长难句', href: '/topic' },
  { text: '历年真题', desc: '2010-2025 整理版', href: '/exam/真题/真题来源核对' },
  { text: '关于本站', desc: '学习路径与更新节奏', href: '/about' }
]
</script>

<template>
  <div class="nf">
    <p class="nf-code">404</p>
    <h1 class="nf-title">页面不存在</h1>
    <p class="nf-desc">链接可能已过期，或地址拼写有误。从下面几个入口继续：</p>
    <nav class="nf-grid">
      <a v-for="l in links" :key="l.href" class="nf-card" :href="withBase(l.href)">
        <span class="nf-t">{{ l.text }}</span>
        <span class="nf-d">{{ l.desc }}</span>
      </a>
    </nav>
    <p class="nf-hint">右上角的搜索框可以全站搜页面。</p>
  </div>
</template>

<style scoped>
.nf {
  max-width: 720px;
  margin: 0 auto;
  padding: 96px 24px 64px;
  text-align: center;
}
.nf-code {
  margin: 0;
  font-size: 64px;
  font-weight: 700;
  line-height: 1;
  color: var(--vp-c-brand-1);
  font-variant-numeric: tabular-nums;
}
.nf-title {
  margin: 16px 0 8px;
  font-size: 28px;
  line-height: 1.4;
  color: var(--vp-c-text-1);
}
.nf-desc {
  margin: 0 0 32px;
  color: var(--vp-c-text-2);
}
.nf-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
  text-align: left;
}
.nf-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  text-decoration: none;
  transition: border-color 0.2s ease;
}
.nf-card:hover {
  border-color: var(--vp-c-brand-1);
}
.nf-t {
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.nf-d {
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.nf-hint {
  margin-top: 28px;
  font-size: 13px;
  color: var(--vp-c-text-3);
}
</style>
