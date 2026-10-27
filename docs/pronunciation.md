# Pronunciation

Tap a few to try it out: <SpeakButton word="hello" text="hello" /> <SpeakButton word="banana" text="banana" /> <SpeakButton kind="sentence" word="Good morning, how are you?" text="Good morning, how are you?" />

These notes organize English pronunciation around the **48-phoneme system** used in Chinese textbooks (20 vowels + 28 consonants, British RP accent). Every phoneme, every example word, and every confusable pair can be tapped to hear. There are also sections on stress and weak forms and on spelling-to-sound patterns, recording "why this letter group makes this sound".

## Where the sound comes from

Behind the button are two real audio pipelines, chosen automatically on each tap; the small label on the right of the button tells you which one served the last play:

- **Real voice audio**: pronunciation audio returned by the open dictionary API at dictionaryapi.dev, tried first. The API is occasionally offline; if it does not answer in time, the next pipeline takes over.
- **Speech synthesis**: the browser's built-in Web Speech API. As long as the system has an English voice pack installed it will speak, **offline included**, and it is the fallback pipeline that guarantees "every tap makes a sound".

Example sentences have no dictionary audio to look up, so they go straight to synthesis. If the first tap produces no sound, check the English voice packs in your system speech settings (or switch to a mainstream browser such as Chrome or Edge).

## Monophthongs (12)

Grouped by tongue position: front, central, back. Long vowels are held at full length, short vowels are short and relaxed — the English length contrast is a **phonemic contrast**, not a matter of speaking faster or slower.

### Front vowels

| Phoneme | Example words (tap to hear) | Mouth shape and listening cues |
| --- | --- | --- |
| /iː/ | <SpeakButton word="sheep" text="sheep" /> <SpeakButton word="seat" text="seat" /> | Long and tense; corners of the mouth pulled wide with a hint of a smile — a long, close "ee" |
| /ɪ/ | <SpeakButton word="ship" text="ship" /> <SpeakButton word="sit" text="sit" /> | Short and lax; mouth half open, tongue lower than for /iː/, sitting between "ee" and "eh" |
| /e/ | <SpeakButton word="bed" text="bed" /> <SpeakButton word="men" text="men" /> | Mouth half open, front of the tongue raised, short — "eh" with no off-glide |
| /æ/ | <SpeakButton word="cat" text="cat" /> <SpeakButton word="man" text="man" /> | Mouth wide open, front of the tongue pressed low, jaw clearly dropped; Mandarin has no counterpart |

### Central vowels

| Phoneme | Example words (tap to hear) | Mouth shape and listening cues |
| --- | --- | --- |
| /ʌ/ | <SpeakButton word="cup" text="cup" /> <SpeakButton word="bus" text="bus" /> | A short central vowel, mouth half open and unrounded — a relaxed, shortened "ah" |
| /ɜː/ | <SpeakButton word="bird" text="bird" /> <SpeakButton word="work" text="work" /> | Long central vowel with neutral lip shape in RP; r-colored in American English |
| /ə/ | <SpeakButton word="about" text="about" /> <SpeakButton word="sofa" text="sofa" /> | The shortest, lightest reduced vowel and the most frequent vowel in English; see [stress and weak forms](#stress-and-weak-forms) |

### Back vowels

| Phoneme | Example words (tap to hear) | Mouth shape and listening cues |
| --- | --- | --- |
| /ɑː/ | <SpeakButton word="car" text="car" /> <SpeakButton word="far" text="far" /> | Mouth fully open, tongue pulled back and low — a long "ah" |
| /ɒ/ | <SpeakButton word="hot" text="hot" /> <SpeakButton word="dog" text="dog" /> | Short with rounded lips, less open than /ɑː/; a signature vowel of British accents |
| /ɔː/ | <SpeakButton word="door" text="door" /> <SpeakButton word="four" text="four" /> | Long and rounded, back of the tongue raised — a long "aw" |
| /ʊ/ | <SpeakButton word="book" text="book" /> <SpeakButton word="good" text="good" /> | Short with rounded lips, tongue relaxed — lower and more central than /uː/ |
| /uː/ | <SpeakButton word="food" text="food" /> <SpeakButton word="two" text="two" /> | Long and rounded, back of the tongue raised high — a long "oo" |

## Diphthongs (8)

The first five are **closing diphthongs** (gliding toward /ɪ/ or /ʊ/); the last three are **centering diphthongs** (gliding toward /ə/). The key is the **glide**: pronouncing only the starting point counts as getting it wrong.

| Phoneme | Example words (tap to hear) | Glide path |
| --- | --- | --- |
| /eɪ/ | <SpeakButton word="day" text="day" /> <SpeakButton word="make" text="make" /> | From /e/ to /ɪ/, closing toward "ee" |
| /aɪ/ | <SpeakButton word="my" text="my" /> <SpeakButton word="time" text="time" /> | From open "ah" to /ɪ/ |
| /ɔɪ/ | <SpeakButton word="boy" text="boy" /> <SpeakButton word="toy" text="toy" /> | From "aw" to /ɪ/ |
| /əʊ/ | <SpeakButton word="go" text="go" /> <SpeakButton word="home" text="home" /> | From central /ə/ to /ʊ/; written /oʊ/ in American conventions, with a rounder starting point |
| /aʊ/ | <SpeakButton word="now" text="now" /> <SpeakButton word="house" text="house" /> | From "ah" to "oo" |
| /ɪə/ | <SpeakButton word="near" text="near" /> <SpeakButton word="here" text="here" /> | From /ɪ/ to /ə/ |
| /eə/ | <SpeakButton word="hair" text="hair" /> <SpeakButton word="care" text="care" /> | From /e/ to /ə/ |
| /ʊə/ | <SpeakButton word="pure" text="pure" /> <SpeakButton word="tour" text="tour" /> | From /ʊ/ to /ə/; often simplified to /ɔː/ in modern British English |

## Consonants (28)

Grouped by manner of articulation. For voiceless/voiced pairs, learn one thing first — whether the vocal folds vibrate: put a finger on your throat; voiced sounds buzz, voiceless ones do not.

### Plosives (6): block the air, then release

| Pair | Example words (tap to hear) | Cues |
| --- | --- | --- |
| /p/ – /b/ | <SpeakButton word="pea" text="pea" /> <SpeakButton word="bee" text="bee" /> | /p/ is noticeably aspirated in stressed syllables; /b/ has vocal-fold vibration — do not let word-final /b/ devoice to /p/ |
| /t/ – /d/ | <SpeakButton word="tie" text="tie" /> <SpeakButton word="die" text="die" /> | Tongue tip against the alveolar ridge, then released; Mandarin t/d are placed further back, so move the contact forward |
| /k/ – /g/ | <SpeakButton word="coat" text="coat" /> <SpeakButton word="goat" text="goat" /> | Back of the tongue against the soft palate; word-final /g/ keeps its voicing with no extra vowel added |

### Fricatives (9): squeeze the air through a gap

| Sound | Example words (tap to hear) | Cues |
| --- | --- | --- |
| /f/ – /v/ | <SpeakButton word="fan" text="fan" /> <SpeakButton word="van" text="van" /> | Upper teeth lightly on the lower lip; do not turn /v/ into the /w/ that begins Mandarin "wo" |
| /θ/ – /ð/ | <SpeakButton word="think" text="think" /> <SpeakButton word="this" text="this" /> | Tongue tip lightly touching the upper teeth. Mandarin has neither sound — do not substitute /s/ or /z/; function words (the, this, then) mostly take /ð/, content words (think, both) mostly /θ/ |
| /s/ – /z/ | <SpeakButton word="sip" text="sip" /> <SpeakButton word="zip" text="zip" /> | Tongue tip near the alveolar ridge leaving a gap; /z/ is not the Mandarin pinyin reading of "zi" — the airflow keeps fricating |
| /ʃ/ – /ʒ/ | <SpeakButton word="she" text="she" /> <SpeakButton word="usual" text="usual" /> | Lips slightly protruded; /ʒ/ hardly ever begins a word — it hides inside vision, decision |
| /h/ | <SpeakButton word="hat" text="hat" /> | Friction at the glottis, lighter than Mandarin "he"; often drops out in weak syllables |

### Affricates (6): block, then release with friction

| Sound | Example words (tap to hear) | Cues |
| --- | --- | --- |
| /tʃ/ – /dʒ/ | <SpeakButton word="chair" text="chair" /> <SpeakButton word="June" text="June" /> | Like the onsets of Mandarin "chi" and "ju", but without the lip rounding Chinese adds |
| /tr/ – /dr/ | <SpeakButton word="tree" text="tree" /> <SpeakButton word="dry" text="dry" /> | A curling onset; strictly a consonant cluster, but textbooks traditionally list it as a pair |
| /ts/ – /dz/ | <SpeakButton word="cats" text="cats" /> <SpeakButton word="kids" text="kids" /> | Exactly the sound of the plural ending; also a cluster listed separately for teaching |

### Nasals, lateral, and glides (7): the air takes a detour

| Sound | Example words (tap to hear) | Cues |
| --- | --- | --- |
| /m/ | <SpeakButton word="moon" text="moon" /> | Lips closed, air through the nose |
| /n/ | <SpeakButton word="noon" text="noon" /> | Tongue tip on the alveolar ridge, air through the nose |
| /ŋ/ | <SpeakButton word="sing" text="sing" /> | A back nasal with the tongue root against the soft palate. singer has a single /ŋ/; finger has /ŋg/ |
| /l/ | <SpeakButton word="light" text="light" /> <SpeakButton word="milk" text="milk" /> | Word-initial "clear l" with the tongue tip on the ridge; word-final "dark l" also raises the back of the tongue |
| /r/ | <SpeakButton word="red" text="red" /> <SpeakButton word="right" text="right" /> | Tongue tip curled without touching anything; do not substitute the Mandarin r position |
| /w/ | <SpeakButton word="wet" text="wet" /> <SpeakButton word="want" text="want" /> | Lips rounded, then released quickly; completely different from /v/, where the teeth bite the lip |
| /j/ | <SpeakButton word="yes" text="yes" /> <SpeakButton word="year" text="year" /> | The onset of Mandarin "ye", a glide raising the tongue body toward the hard palate |

::: note Textbook convention vs phonemic inventory
The 48 phonemes are a teaching system: tr, dr, ts, dz are strictly consonant clusters rather than independent phonemes, but Chinese textbooks traditionally list them separately to reach 28 consonants, and this page follows the textbook convention. Formal British phonetic descriptions (such as the Jones chart) do not list these four pairs separately.
:::

## Confusable sounds

Minimal pairs are the fastest way to train the ear: two words that differ by a single sound — get the sound right and the meaning changes. Tap every pair and shadow it ten times.

| Contrast | Minimal pairs | Listening and articulation cues |
| --- | --- | --- |
| /iː/ – /ɪ/ | <SpeakButton word="sheep" text="sheep" /> vs <SpeakButton word="ship" text="ship" />; <SpeakButton word="seat" text="seat" /> vs <SpeakButton word="sit" text="sit" /> | Long-tense vs short-lax; do not merge both into one "ee". Same for beat vs bit |
| /e/ – /æ/ | <SpeakButton word="bed" text="bed" /> vs <SpeakButton word="bad" text="bad" />; <SpeakButton word="men" text="men" /> vs <SpeakButton word="man" text="man" /> | For /æ/, drop the jaw lower and open the mouth wider |
| /æ/ – /ʌ/ | <SpeakButton word="cat" text="cat" /> vs <SpeakButton word="cut" text="cut" /> | /æ/ is front, /ʌ/ is central — do not merge both into "ah" |
| /ɒ/ – /ɔː/ | <SpeakButton word="not" text="not" /> vs <SpeakButton word="nought" text="nought" /> | Short with rounded lips vs long and rounded |
| /ʊ/ – /uː/ | <SpeakButton word="full" text="full" /> vs <SpeakButton word="fool" text="fool" />; <SpeakButton word="pull" text="pull" /> vs <SpeakButton word="pool" text="pool" /> | Lax-short vs tense-long; do not round the lips too early |
| /e/ – /eɪ/ | <SpeakButton word="let" text="let" /> vs <SpeakButton word="late" text="late" />; <SpeakButton word="men" text="men" /> vs <SpeakButton word="main" text="main" /> | /eɪ/ has a glide — it is not "eh" held longer |
| /əʊ/ – /uː/ | <SpeakButton word="soap" text="soap" /> vs <SpeakButton word="soup" text="soup" /> | One starts centrally, the other is high and back — keep them apart |
| /θ/ – /s/ | <SpeakButton word="think" text="think" /> vs <SpeakButton word="sink" text="sink" />; <SpeakButton word="path" text="path" /> vs <SpeakButton word="pass" text="pass" /> | Push the tongue tip between the teeth — exaggerating is better than nothing |
| /ð/ – /z/ | <SpeakButton word="breathe" text="breathe" /> vs <SpeakButton word="breeze" text="breeze" /> | Same as above: tongue position decides everything |
| /v/ – /w/ | <SpeakButton word="vet" text="vet" /> vs <SpeakButton word="wet" text="wet" />; <SpeakButton word="vine" text="vine" /> vs <SpeakButton word="wine" text="wine" /> | /v/ bites the lower lip with the upper teeth; /w/ rounds both lips |
| /ʃ/ – /tʃ/ | <SpeakButton word="share" text="share" /> vs <SpeakButton word="chair" text="chair" /> | /ʃ/ is continuous friction; /tʃ/ blocks first, then pops |
| /n/ – /ŋ/ | <SpeakButton word="sin" text="sin" /> vs <SpeakButton word="sing" text="sing" />; <SpeakButton word="thin" text="thin" /> vs <SpeakButton word="thing" text="thing" /> | Tongue tip on the ridge vs tongue root on the soft palate; the mouth looks the same, only the tongue differs |
| /l/ – /r/ | <SpeakButton word="light" text="light" /> vs <SpeakButton word="right" text="right" />; <SpeakButton word="collect" text="collect" /> vs <SpeakButton word="correct" text="correct" /> | /l/ touches the ridge with the tongue tip; /r/ curls without touching |

## Stress and weak forms

English is a **stress-timed** language: within a sentence, content words (nouns, verbs, adjectives) are loud and clear while function words (articles, prepositions, auxiliaries) shrink into weak forms — most often into /ə/. Understanding linking and weak forms shapes real listening more than pronouncing isolated phonemes does.

**Stress position changes meaning and part of speech** — nouns stress the front, verbs the back. This pair of words is the classic case; tap and compare:

| Word | Noun use (front stress) | Verb use (back stress) |
| --- | --- | --- |
| record | <SpeakButton kind="sentence" word="I bought a new record." text="a ˈrecord (noun)" /> | <SpeakButton kind="sentence" word="Please record the meeting." text="to reˈcord (verb)" /> |
| present | <SpeakButton kind="sentence" word="Here is a present for you." text="a ˈpresent (noun)" /> | <SpeakButton kind="sentence" word="They present a report." text="to preˈsent (verb)" /> |

**Weak-form example**: can reduces to /kən/ inside a sentence and only reads /kæn/ at the end of a sentence or under emphasis:

- <SpeakButton kind="sentence" word="I can swim very fast." text="I can swim very fast. (weak can)" />
- <SpeakButton kind="sentence" word="Yes, I can." text="Yes, I can. (strong at the end)" />

One more reduction, this time inside a single word: of banana's three a letters only one reads /ɑː/, the rest are all /ə/ — <SpeakButton word="banana" text="banana" />. Which syllable carries the stress, and how the remaining syllables collapse toward /ə/, is exactly what the photograph vs photography comparison makes audible: <SpeakButton word="photograph" text="photograph" /> <SpeakButton word="photography" text="photography" />.

## Spelling-to-sound quick reference

English spelling inconsistency is a historical debt: the [Great Vowel Shift](/history#the-great-vowel-shift-and-print-1400-1700) of the 14th-18th centuries changed the sounds, while printing after 1476 froze the old spellings. The patterns still exist — they just have to be learned per letter group:

| Letter group | Usual sound | Example words (tap to hear) | Notes |
| --- | --- | --- | --- |
| -tion | /ʃn/ | <SpeakButton word="nation" text="nation" /> <SpeakButton word="station" text="station" /> | Latin -tionem entered English through French |
| ch | /tʃ/; /k/; /ʃ/ | <SpeakButton word="chair" text="chair" />; <SpeakButton word="school" text="school" /> <SpeakButton word="chemistry" text="chemistry" />; <SpeakButton word="machine" text="machine" /> | Greek sources read /k/, French sources /ʃ/, native words /tʃ/ |
| th | /θ/ or /ð/ | <SpeakButton word="think" text="think" /> <SpeakButton word="both" text="both" />; <SpeakButton word="this" text="this" /> <SpeakButton word="then" text="then" /> | Function words mostly /ð/; loanword exceptions: Thai, Thomas read /t/ |
| magic e | final e is silent, the vowel says its name | <SpeakButton word="hat" text="hat" />→<SpeakButton word="hate" text="hate" />; <SpeakButton word="hop" text="hop" />→<SpeakButton word="hope" text="hope" /> | Open syllable long, closed syllable short — tap the pairs to compare |
| kn- / wr- | k, w are silent | <SpeakButton word="knife" text="knife" /> <SpeakButton word="know" text="know" />; <SpeakButton word="write" text="write" /> | Fossils of Old English pronunciation — k and w were once truly spoken |
| doubled consonant | a single sound | <SpeakButton word="apple" text="apple" /> <SpeakButton word="summer" text="summer" /> | The doubling itself marks the preceding short vowel |
| -ed | /t/; /d/; /ɪd/ | <SpeakButton word="stopped" text="stopped" />; <SpeakButton word="played" text="played" />; <SpeakButton word="wanted" text="wanted" /> | /t/ after a voiceless sound, /d/ after a voiced one, /ɪd/ after t or d |
| -s (plural / 3rd person) | /s/; /z/; /ɪz/ | <SpeakButton word="cats" text="cats" />; <SpeakButton word="dogs" text="dogs" />; <SpeakButton word="boxes" text="boxes" /> | Same rule as -ed: follow the voicing of the previous sound |

## Further reading

- [Word roots](/roots): why ch reads /k/ in chemistry, where -tion comes from — the origins of word-building all have stories.
- [History](/history): the Great Vowel Shift and the printing press that froze spelling — how spelling and sound drifted apart.
- [History timeline](/timeline): pronunciation events and vocabulary events interleaved by year.

## References

- [Wikipedia · Phonetics](https://en.wikipedia.org/wiki/Phonetics)
- [Wikipedia · Phoneme](https://en.wikipedia.org/wiki/Phoneme)
- [Wikipedia · International Phonetic Alphabet](https://en.wikipedia.org/wiki/International_Phonetic_Alphabet)
- [Wikipedia · Received Pronunciation](https://en.wikipedia.org/wiki/Received_Pronunciation)
