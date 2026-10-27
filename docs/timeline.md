---
title: History timeline
---

<script setup>
import { withBase } from 'vitepress'
import { ERAS, FIELD_LABELS, TIMELINE } from './.vitepress/theme/data/timeline.en'
import DevTimeline from './.vitepress/theme/components/DevTimeline.vue'

function eraIndexOf(year) {
  for (let i = 0; i < ERAS.length; i++) if (year < ERAS[i].to) return i
  return ERAS.length - 1
}
const eventsOf = (era) => TIMELINE.filter((e) => eraIndexOf(e.year) === ERAS.indexOf(era))
</script>

# History timeline

English has 1,600 years of continuous, verifiable history (449 to today). This line lays out {{ TIMELINE.length }} nodes in chronological order, in four eras: Old English, Middle English, Early Modern English, and Modern and Global. Each node first answers "why at this moment in time", then lands on the effect it left for today; nodes related to vocabulary and exams carry further on-site reading. I usually read the overview in [History](/history) first, then come back to the timeline to check the nodes.

## How the timeline is grouped

**Browsing.** The top tabs filter by four categories: speech and writing, vocabulary and etymology, standards and dictionaries, and exams and teaching. Selecting only "exams and teaching" runs this line from Cambridge's first exam in 1913 through the CEFR levels, the CET-4 and CET-6 exams, IELTS, and the national equivalency exam — the hundred-odd years of "how English proficiency got institutionalized" at a glance; selecting only "standards and dictionaries" shows the rule-making chain from the courts switching languages and printing fixing spellings, through the Johnson dictionary and the OED setting the record, to its move onto a database.

**Click to see the detail.** Clicking any node expands three pieces of information: who was pushing it, why at this moment, and further on-site reading. Many nodes are cause and effect of one another: without the French rule of 1066 there would be no switch of the courts in 1362; without the treaty of Edington in 878, the Old English prose tradition might not have survived. Reading these causes is far more useful than memorizing the years.

**When you need to read straight through**, "All nodes by era, in full" at the bottom of the page is the text form of the same data, does not depend on interaction, and is convenient for checking entry by entry against [High-frequency vocabulary](/exam/vocabulary) and [Roots and affixes](/exam/roots-and-affixes).

## About the data itself

Years take the year the event happened or the traditional reckoning: 449 is the landing date given by Bede, 1400 for the Great Vowel Shift is the customary round number, and every entry states its basis; the other years take the scholarly consensus. Nodes after 1991 are limited to verifiable events, and the years take the year of official publication or of announcement by the dictionary body (OED Online, the CEFR, and the words of the year). Where an on-site page conflicts with the consensus, the on-site past papers and key-point analysis take precedence.

<DevTimeline
  :events="TIMELINE"
  :eras="ERAS"
  :field-labels="FIELD_LABELS"
  all-label="All"
  filter-label="Filter the timeline by category"
  nodes-label="nodes"
  who-label="Who is pushing"
  more-label="Further reading on this site"
/>

## All nodes by era, in full

<div class="he-tl-plain">
  <template v-for="era in ERAS" :key="era.name">
    <h3>{{ era.name }} ({{ era.label }})</h3>
    <ol>
      <li v-for="ev in eventsOf(era)" :key="ev.year + ev.title">
        <p><strong>{{ ev.year }}</strong>　{{ ev.title }} ({{ FIELD_LABELS[ev.field] }}; {{ ev.who }})</p>
        <p>{{ ev.why }}</p>
        <p v-if="ev.link"><a :href="withBase(ev.link)">Further reading on this site</a></p>
      </li>
    </ol>
  </template>
</div>

## References

- [Wikipedia · English language](https://en.wikipedia.org/wiki/English_language)
- [Wikipedia · Etymology](https://en.wikipedia.org/wiki/Etymology)
