<script setup>
import { withBase } from 'vitepress/client'

const links = [
  { text: 'Grammar', desc: 'Sentence patterns · clauses · mood', href: '/grammar' },
  { text: 'Tenses', desc: '16-cell matrix and nine tenses', href: '/tense' },
  { text: 'History', desc: '449 to a world language', href: '/history' },
  { text: 'About', desc: 'Scope and update cadence', href: '/about' },
  { text: '简体中文', desc: '简体中文版本', href: '/zh/' }
]
</script>

<template>
  <div class="nf">
    <p class="nf-code">404</p>
    <h1 class="nf-title">Page not found</h1>
    <p class="nf-desc">The link may be out of date, or the address may be misspelled. Continue from one of these:</p>
    <nav class="nf-grid">
      <a v-for="l in links" :key="l.href" class="nf-card" :href="withBase(l.href)">
        <span class="nf-t">{{ l.text }}</span>
        <span class="nf-d">{{ l.desc }}</span>
      </a>
    </nav>
    <p class="nf-hint">The search box in the top-right corner searches the whole site.</p>
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
