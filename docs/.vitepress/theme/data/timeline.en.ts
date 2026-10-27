/**
 * English-language dataset for the history-of-English timeline (449 to present).
 * Mirrors data/timeline.ts (the Chinese dataset); each node's `why` answers
 * "why at this moment in time". `link` points only to real routes of this site
 * (English side), checked entry by entry against sidebar.json; early
 * language-history nodes get no link when no on-site page fits.
 */

export interface TimelineEvent {
  /** Year: the traditional reckoning or the customary round number where disputed, explained in `why` */
  year: number
  title: string
  /** Person, institution, or mechanism: who (or what) is driving the event */
  who: string
  field: 'lang' | 'lexicon' | 'standard' | 'exam'
  /** Why at this moment: the historical context and the afterlife of the event */
  why: string
  /** On-site further reading (verified clean route, base not included) */
  link?: string
}

export const FIELD_LABELS: Record<TimelineEvent['field'], string> = {
  lang: 'Speech and writing',
  lexicon: 'Vocabulary and etymology',
  standard: 'Standards and dictionaries',
  exam: 'Exams and teaching',
}

export interface Era {
  name: string
  from: number
  to: number
  /** Display text for the date range */
  label: string
  intro: string
}

/**
 * The four eras. Grouping rule: year < to joins the group (the last era is
 * inclusive), so boundary years such as 1066 and 1476 fall into the later era.
 */
export const ERAS: Era[] = [
  {
    name: 'Old English',
    from: 449,
    to: 1066,
    label: '449 to 1066',
    intro:
      'The age of invasion and fusion. Germanic dialects took root in Britain and, colliding with Old Norse, grew the earliest skeleton of English: core vocabulary, the outline of its inflections, and the earliest prose tradition all took shape here.',
  },
  {
    name: 'Middle English',
    from: 1066,
    to: 1476,
    label: '1066 to 1476',
    intro:
      'The age of silencing and return. French ruled for nearly three hundred years while English lay low, then climbed back to the center through the Black Death, Parliament, and Chaucer; the vocabulary structure — an everyday Germanic layer living beside a written French-Latin layer — was fixed in these three centuries.',
  },
  {
    name: 'Early Modern English',
    from: 1476,
    to: 1800,
    label: '1476 to 1800',
    intro:
      "The age of fixing and rule-making. Printing locked the spelling, the Great Vowel Shift reshaped the sounds, and dictionaries and grammar books arrived one after another; English moved from 'can be written' to 'how it should be written', and the tension between rules and usage has run all the way into today's classroom.",
  },
  {
    name: 'Modern and global English',
    from: 1800,
    to: 2100,
    label: '1800 to present',
    intro:
      'The age of spread and testing. American English split off, the OED set the record, broadcasting unified the accent, and the internet flattened the cost of transmission; meanwhile English was made into a measurable proficiency, exams became most people\'s first encounter with the language — and that is the position this site occupies.',
  },
]

export const TIMELINE: TimelineEvent[] = [
  {
    year: 449,
    title: 'The Anglo-Saxons cross the sea',
    who: 'Angles, Saxons, and Jutes',
    field: 'lang',
    why: "Celtic kings of Britain hired Germanic mercenaries against the Picts; the mercenaries turned hosts and planted settlements along the eastern coast. 449 is the traditional date given by Bede and the Anglo-Saxon Chronicle and need not be exact; what is certain is that Old English began as several continental dialects fusing on the island, not as a unified language brought by a ready-made nation.",
  },
  {
    year: 793,
    title: 'Lindisfarne monastery raided',
    who: 'Viking fleets',
    field: 'lang',
    why: 'The coastal monastery of Northumbria was sacked, opening two centuries of Norse infiltration. Old Norse and Old English shared a root but ran in different channels, and the collision produced deep exchange: they, sky, window, skirt — the most everyday words — are deposits from these raiders, later replacing the native counterparts one after another.',
    link: '/exam/vocabulary',
  },
  {
    year: 878,
    title: "Battle of Edington and Alfred's revival of letters",
    who: 'Alfred the Great',
    field: 'lang',
    why: 'Wessex stopped the Viking army at Edington; the treaty drew the Danelaw and bought Alfred breathing room. He made literacy a policy of state: Latin classics were translated into Old English and the Anglo-Saxon Chronicle was compiled, and the West Saxon dialect thereby became the backbone of written Old English — the earliest "standard form" English had.',
  },
  {
    year: 1066,
    title: 'The Norman Conquest',
    who: 'William the Conqueror',
    field: 'lexicon',
    why: 'After Hastings, the court, the law courts, and the upper class of the manor spoke French for nearly three hundred years; about ten thousand French words entered English in stages, roughly three quarters of them still in use today. The division of labor between pig and pork, cow and beef is the fossil of that class: the people in the field used the English name, the people at the table the French one. Many of the Latin-family roots in this site\'s root chart entered English precisely by way of French.',
    link: '/exam/roots-and-affixes',
  },
  {
    year: 1204,
    title: 'King John loses Normandy',
    who: 'King John',
    field: 'standard',
    why: 'The English crown lost its ancestral Normandy on the continent; the nobility had to take root on the island, and their tie to the French homeland was cut. The revival of English is usually credited to war and plague, but the loss of the territory was the structural starting point that slowly made the bilingual nobility switch languages.',
  },
  {
    year: 1348,
    title: 'The Black Death reaches England',
    who: 'The plague',
    field: 'standard',
    why: 'The collapse of the population gave English laborers unprecedented bargaining power, and the use of English widened in guilds, schools, and even the church. Within a hundred years Parliament and the courts returned to English; the seed of the return was planted in this plague.',
  },
  {
    year: 1362,
    title: 'Statute of Pleading: the courts switch to English',
    who: 'Parliament of England',
    field: 'standard',
    why: 'The statute required pleadings and testimony in court to be in English, and the same year Parliament opened with an English speech for the first time. Written records stayed in Latin and French, but the return of oral public business to English was the key step from "the masses can speak it" to "the language has standing".',
  },
  {
    year: 1382,
    title: 'The Wycliffe Bible',
    who: 'The Wycliffites',
    field: 'lexicon',
    why: 'The first complete English Bible translation appeared, borrowing and reshaping over a thousand words from Latin to state doctrine and abstract ideas. English was used systematically to discuss theology for the first time — and precisely for that reason it was later banned by the authorities: English had grown too big to ignore.',
  },
  {
    year: 1387,
    title: 'Chaucer begins The Canterbury Tales',
    who: 'Geoffrey Chaucer',
    field: 'lexicon',
    why: 'For the first time the London dialect carried a literary project of this scale: courtly love, street humor, and religious satire could all be told in English. Chaucer proved that English deserved complex narrative and left a respectable southern sample for the standard language that later took shape.',
  },
  {
    year: 1400,
    title: 'The Great Vowel Shift begins',
    who: 'London and regional dialects',
    field: 'lang',
    why: 'Over the following two or three centuries the long vowels rose or split as a whole, and the pronunciation and the spelling of name, time, and house went separate ways from then on. It is the main source of today\'s spelling-pronunciation mismatch in English, and the historical reason word shapes can only be remembered by root association, not spelled back from the sound.',
  },
  {
    year: 1476,
    title: 'Caxton sets up his press at Westminster',
    who: 'William Caxton',
    field: 'standard',
    why: 'Printing, to copy in batches, had to pick one spelling per word, and spelling that had been written freely for hundreds of years converged on the London print shops. Late in life Caxton recorded the egges vs eyren quarrel in the preface to a translation — the very scene of dialect words and loanwords fighting for the standard seat.',
  },
  {
    year: 1526,
    title: "Tyndale's New Testament",
    who: 'William Tyndale',
    field: 'lexicon',
    why: 'Translated directly from the Greek original, it melted Hebrew and Greek turns of expression into English, and Tyndale paid with his life for it. The King James Bible was later described as his revision revised; many of the phrases and rhythms he set are still being quoted today.',
  },
  {
    year: 1604,
    title: "Cawdrey's Table Alphabeticall",
    who: 'Robert Cawdrey',
    field: 'lexicon',
    why: 'The first monolingual English dictionary, holding only about 2,500 "hard words", aimed to help readers understand other people\'s difficult words. It proved that the dictionary was a thing that could be done, and also exposed the limit of collecting only hard words: what Johnson was to do a century and a half later already had its seed here.',
  },
  {
    year: 1611,
    title: 'The King James Bible',
    who: 'James I and the translating committees',
    field: 'lexicon',
    why: 'About fifty-four scholars in six groups retranslated, on the principle of not lightly varying where things were already well translated, and Tyndale\'s plain rhythms were preserved institutionally. For the three centuries after, it was often the only book in an ordinary household, and the cadence of English prose and the stock of everyday idioms were fixed by it.',
  },
  {
    year: 1667,
    title: "The Royal Society's plain-style programme",
    who: 'Thomas Sprat',
    field: 'standard',
    why: 'In the History of the Royal Society he spoke for the Society: science wants number, weight, and measure, and language should be as plain as mathematics, rejecting the ornaments of rhetoric. The plain tradition of academic English was set from then on; many of the commandments in today\'s writing courses trace back here.',
  },
  {
    year: 1755,
    title: "Johnson's Dictionary",
    who: 'Samuel Johnson',
    field: 'standard',
    why: "One man, eight years, about forty thousand entries, each sense attested by literary quotations, upgrading the dictionary from a list of hard words into an archive of usage. In the preface he also admitted that a language cannot be pinned down forever — the tension between prescriptivists and descriptivists was laid on the table for the first time. This site's high-frequency word lists, organized by usage and frequency, are its distant descendants.",
    link: '/exam/vocabulary',
  },
  {
    year: 1762,
    title: "Lowth's Short Introduction to English Grammar",
    who: 'Robert Lowth',
    field: 'standard',
    why: 'The middle class needed a ladder to "speaking correctly", and prescriptive grammar books arrived exactly on time as a social passport. Many of the rules he transplanted from Latin grammar (such as never splitting an infinitive) had no historical basis in English, yet ruled the classroom for two hundred years; some of the "why is this wrong" answers in today\'s exam English trace back to this book.',
    link: '/exam/grammar-and-translation',
  },
  {
    year: 1828,
    title: "Webster's American Dictionary",
    who: 'Noah Webster',
    field: 'lexicon',
    why: 'After political independence came linguistic independence: spellings of the color and center family were institutionalized from him on, and American English had its own standard text for the first time. Two standards of one language have stood side by side since; the British-American spelling quarrel learners meet today is the legacy of this split.',
  },
  {
    year: 1857,
    title: "Trench's 'deficiencies' report to the Philological Society",
    who: 'Richard Trench',
    field: 'standard',
    why: 'He read a paper before the Philological Society showing that existing dictionaries lacked, erred, and tangled, and proposed that volunteer readers send in quotations in a uniform format. The idea of recording a language from oceans of real usage took shape here, and the scheme of the future Oxford English Dictionary grew directly out of it.',
  },
  {
    year: 1884,
    title: 'First fascicle of the Oxford English Dictionary',
    who: 'James Murray and the Philological Society',
    field: 'standard',
    why: 'The fascicle covering A to Ant appeared, and this seventy-year project carried the "historical principle" to its extreme: every word gets a chain of dated quotations, and for the first time the dictionary posed as language history rather than a hard-word list. The format of etymology beside attestation is also a method to borrow when breaking down roots and building meaning associations today.',
    link: '/exam/roots-and-affixes',
  },
  {
    year: 1913,
    title: "Cambridge's first CPE: the start of the ESOL tradition",
    who: 'University of Cambridge',
    field: 'exam',
    why: 'Cambridge examined the Certificate of Proficiency in English (CPE), one of the earliest attempts to turn English proficiency into an examinable, certifiable product. The tradition of teaching and testing English for non-native speakers counts from here; the archetype of today\'s international English exams mostly traces back to this.',
  },
  {
    year: 1922,
    title: 'The BBC begins broadcasting',
    who: 'the British Broadcasting Company',
    field: 'lang',
    why: "Broadcasting let the whole nation hear the same voice for the first time, and the announcer's 'standard sound' (RP) was promoted from a class accent to a national reference. A few years later the BBC set up an Advisory Committee on Spoken English, tying dictionary pronunciation to broadcasting norms; the standard accent became both an accent and an institution.",
  },
  {
    year: 1964,
    title: 'First TOEFL sitting',
    who: 'Educational Testing Service (ETS)',
    field: 'exam',
    why: "American universities needed one yardstick for international students' English, and TOEFL made 'English in academic settings' an independent object of examination. Global English testing split into a British and an American lineage from then on, and what is tested and how it is scored began to serve real academic scenes.",
  },
  {
    year: 1987,
    title: 'First CET-4 sitting',
    who: "China's Ministry of Education (national exam)",
    field: 'exam',
    why: 'After the reform and opening up, the foreign-language threshold was institutionalized; the CET exams turned English into a universal signal for degrees and employment and made China the world\'s largest English-learning market. The English exams for postgraduate admission and the equivalency route belong to the same system, and the 2010-2025 equivalency papers assembled on this site are one link in it.',
    link: '/exam/papers/sources',
  },
  {
    year: 1989,
    title: 'First IELTS sitting',
    who: 'the British Council, Cambridge, and IDP',
    field: 'exam',
    why: "Beside TOEFL, the Commonwealth countries jointly launched their own academic English measure, for the first time scoring listening, speaking, reading, and writing separately, embodying the new idea of 'communicative language testing'. The object of measurement shifted from grammar checklists to real language use, and most later test designs evolved along this line.",
  },
  {
    year: 1991,
    title: 'The World Wide Web opens to the public',
    who: 'Tim Berners-Lee and CERN',
    field: 'lang',
    why: 'The default language of the early web was English; the marginal cost of spreading text dropped to zero, and English became the everyday written language visible to the whole world for the first time. New variants — abbreviations and keyboard spellings — entered mass written language from here, and the pace of vocabulary renewal changed from decade-scale to year-scale.',
  },
  {
    year: 2000,
    title: 'OED Online launches',
    who: 'Oxford University Press',
    field: 'standard',
    why: 'The dictionary had already gone to CD-ROM one step earlier (first edition 1987, second 1992); in March 2000 the whole OED moved onto the web, and supplements were freed from the print and disc publication cycle, with revisions rolling out quarterly. The dictionary turned from "a book finished at publication" into "a continuously updated database": looking up a word no longer means pulling twenty volumes off a shelf, and standard-setting works to a monthly rather than a decadal clock.',
  },
  {
    year: 2001,
    title: 'The Common European Framework of Reference is published',
    who: 'the Council of Europe',
    field: 'exam',
    why: "After the free movement of people in Europe, each country's language certificates refused to recognize one another, and a common ruler was needed. Polished for over a decade from the late-1980s 'language learning for European citizenship' project, the framework split 'mastering a language' into can-do lists from A1 to C2: descriptions of ability replaced grammar checklists and became the common coordinate for curricula and test design worldwide.",
  },
  {
    year: 2004,
    title: "'blog' is Merriam-Webster's Word of the Year",
    who: 'Merriam-Webster',
    field: 'lexicon',
    why: "The word weblog was coined only in 1999; shortened to blog it exploded with the blogging platforms, and in 2004 the leading American dictionary chose it as Word of the Year. The largest producer of written English began shifting from editorial offices to ordinary people: everyone is producing usage waiting to be recorded, and the dictionary's annual roundup settled into a year-end cultural ritual.",
  },
  {
    year: 2015,
    title: "'😂' is Oxford's Word of the Year",
    who: 'Oxford Dictionaries',
    field: 'lang',
    why: 'For the first time the Word of the Year went to a non-verbal symbol: judging by global keyboard statistics, 😂 was the most-used emoji of the year. A symbol outside writing was archived as a "word" for the first time, and written language has by default carried a parallel graphic layer since — in any stretch of English chat today it is a writing resource on a par with spelling and punctuation.',
  },
  {
    year: 2016,
    title: "'post-truth' is Oxford's Word of the Year",
    who: 'Oxford Dictionaries',
    field: 'lexicon',
    why: "The Brexit referendum and the US election in the same year pushed the usage of post-truth into explosive growth, and Oxford chose it as Word of the Year. One political year can mass-produce vocabulary directly, with the dictionary archiving it afterwards — 'Word of the Year' has since become a fixed window for watching reality rewrite English quickly, and the dictionary's role extended from recorder to annual reviewer.",
  },
  {
    year: 2020,
    title: "'pandemic' is Merriam-Webster's Word of the Year",
    who: 'Merriam-Webster',
    field: 'lexicon',
    why: 'In the year of the pandemic, lockdown and social distancing went from technical terms to global everyday words at rare speed, and lookups of pandemic soared with the outbreak bulletins. The Black Death of 1348 rewrote English through population and social structure; this time what rewrote the vocabulary was the daily briefing and the social network: a public-health event reshaped a whole generation\'s common word list within weeks.',
  },
  {
    year: 2023,
    title: "'hallucinate' is Cambridge's Word of the Year",
    who: 'Cambridge Dictionary',
    field: 'lexicon',
    why: "Generative AI reached the mass public at the end of 2022, and the next year the Cambridge Dictionary gave Word of the Year to the new sense of hallucinate: AI generating plausible but false content. An old psychology word grew a technical meaning within a year and was archived by an authoritative dictionary — the next driver of vocabulary is no longer war, plague, or the printing press, but the model.",
  },
]
