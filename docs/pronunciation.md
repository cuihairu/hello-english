# 发音

先点几个试试：<SpeakButton word="hello" text="hello" />　<SpeakButton word="banana" text="banana" />　<SpeakButton kind="sentence" word="Good morning, how are you?" text="Good morning, how are you?" />

本页按国内教材通行的 **48 音标体系**（20 个元音 + 28 个辅音，英式 RP 口音）梳理英语发音，每个音标、每个例词、每组易混音都可以点按出声。页面还配有重音与弱读、拼读规律两节，解释「为什么这个字母组合读这个音」。

## 声音从哪来

按钮背后有两条真实可用的发声链路，点按时自动取舍，按钮右侧的小字会告诉你这次用的是哪条：

- **真人音频**：优先请求开放词典接口 dictionaryapi.dev 返回的发音音频。接口偶尔不在线，等不到就换下一条。
- **语音合成**：浏览器自带的 Web Speech API 朗读。系统装了英文语音包就能出声，**离线也能用**，是保证「点了必有声」的兜底链路。

例句没有词典音频可查，直接走合成链路。第一次点按后如果没声音，检查一下系统语音设置里的英文语音包（或换 Chrome/Edge 等主流浏览器）。

## 单元音（12 个）

按舌位分三组：前、中、后。长元音 duration 拉满，短元音短促放松——英语的长短对立是**音位对立**，不是读得快慢的语气差别。

### 前元音

| 音标 | 例词点读 | 口型与听辨要点 |
| --- | --- | --- |
| /iː/ | <SpeakButton word="sheep" text="sheep" /> <SpeakButton word="seat" text="seat" /> | 长而紧，嘴角向两边拉开，近似「衣」拉长带笑意 |
| /ɪ/ | <SpeakButton word="ship" text="ship" /> <SpeakButton word="sit" text="sit" /> | 短而松，嘴半开，舌位比 /iː/ 低，介于「衣」「诶」之间 |
| /e/ | <SpeakButton word="bed" text="bed" /> <SpeakButton word="men" text="men" /> | 嘴半开，舌前部抬起，短促，「诶」不带尾巴 |
| /æ/ | <SpeakButton word="cat" text="cat" /> <SpeakButton word="man" text="man" /> | 嘴张大，舌前部压低，下巴明显放下，中文里没有对应音 |

### 中元音

| 音标 | 例词点读 | 口型与听辨要点 |
| --- | --- | --- |
| /ʌ/ | <SpeakButton word="cup" text="cup" /> <SpeakButton word="bus" text="bus" /> | 短促的中央元音，嘴半开不圆唇，「阿」的短读放松版 |
| /ɜː/ | <SpeakButton word="bird" text="bird" /> <SpeakButton word="work" text="work" /> | 长中央元音，英式唇形中性；美式带卷舌 r 色彩 |
| /ə/ | <SpeakButton word="about" text="about" /> <SpeakButton word="sofa" text="sofa" /> | 最短最轻的弱读元音，英语里出现频率最高，见[重音与弱读](#重音与弱读) |

### 后元音

| 音标 | 例词点读 | 口型与听辨要点 |
| --- | --- | --- |
| /ɑː/ | <SpeakButton word="car" text="car" /> <SpeakButton word="far" text="far" /> | 嘴全开，舌后缩压低，「啊」拉长 |
| /ɒ/ | <SpeakButton word="hot" text="hot" /> <SpeakButton word="dog" text="dog" /> | 短促圆唇，开口比 /ɑː/ 小，英式口音的标志性音 |
| /ɔː/ | <SpeakButton word="door" text="door" /> <SpeakButton word="four" text="four" /> | 圆唇长音，舌后部抬高，「哦」拉长 |
| /ʊ/ | <SpeakButton word="book" text="book" /> <SpeakButton word="good" text="good" /> | 短促圆唇，舌位放松，比 /uː/ 低且靠中央 |
| /uː/ | <SpeakButton word="food" text="food" /> <SpeakButton word="two" text="two" /> | 圆唇长音，「乌」拉长，舌后部高抬 |

## 双元音（8 个）

前 5 个是**合口双元音**（滑向 /ɪ/ 或 /ʊ/），后 3 个是**集中双元音**（滑向 /ə/）。要点是「有滑动过程」，只读起点等于读错。

| 音标 | 例词点读 | 滑动路线 |
| --- | --- | --- |
| /eɪ/ | <SpeakButton word="day" text="day" /> <SpeakButton word="make" text="make" /> | 从 /e/ 滑向 /ɪ/，「诶→衣」合拢 |
| /aɪ/ | <SpeakButton word="my" text="my" /> <SpeakButton word="time" text="time" /> | 从「阿」滑向 /ɪ/ |
| /ɔɪ/ | <SpeakButton word="boy" text="boy" /> <SpeakButton word="toy" text="toy" /> | 从「奥」滑向 /ɪ/ |
| /əʊ/ | <SpeakButton word="go" text="go" /> <SpeakButton word="home" text="home" /> | 从中央 /ə/ 滑向 /ʊ/；美式写作 /oʊ/，起点更圆 |
| /aʊ/ | <SpeakButton word="now" text="now" /> <SpeakButton word="house" text="house" /> | 从「阿」滑向「乌」 |
| /ɪə/ | <SpeakButton word="near" text="near" /> <SpeakButton word="here" text="here" /> | 从 /ɪ/ 滑向 /ə/ |
| /eə/ | <SpeakButton word="hair" text="hair" /> <SpeakButton word="care" text="care" /> | 从 /e/ 滑向 /ə/ |
| /ʊə/ | <SpeakButton word="pure" text="pure" /> <SpeakButton word="tour" text="tour" /> | 从 /ʊ/ 滑向 /ə/；现代英式常简化成 /ɔː/ |

## 辅音（28 个）

按发音方式分组。清浊成对的音先学会「声带振动与否」这一件事：手指按在喉咙上，浊音有震动感，清音没有。

### 爆破音（6 个）：先堵住，再弹开

| 清浊对 | 例词点读 | 要点 |
| --- | --- | --- |
| /p/ – /b/ | <SpeakButton word="pea" text="pea" /> <SpeakButton word="bee" text="bee" /> | /p/ 重读音节送气明显；/b/ 声带振动，词尾别读成 /p/ |
| /t/ – /d/ | <SpeakButton word="tie" text="tie" /> <SpeakButton word="die" text="die" /> | 舌尖抵上齿龈弹开；中文的 t/d 舌位偏后，注意前移 |
| /k/ – /g/ | <SpeakButton word="coat" text="coat" /> <SpeakButton word="goat" text="goat" /> | 舌根抵软腭；/g/ 在词尾同样保持浊感、不加元音 |

### 摩擦音（9 个）：留缝挤出气流

| 音 | 例词点读 | 要点 |
| --- | --- | --- |
| /f/ – /v/ | <SpeakButton word="fan" text="fan" /> <SpeakButton word="van" text="van" /> | 上齿轻咬下唇；/v/ 别读成「我」起头的 /w/ |
| /θ/ – /ð/ | <SpeakButton word="think" text="think" /> <SpeakButton word="this" text="this" /> | 舌尖轻触上齿。中文没有这个音，别用 /s//z/ 代替；功能词（the、this、then）多读 /ð/，实义词（think、both）多读 /θ/ |
| /s/ – /z/ | <SpeakButton word="sip" text="sip" /> <SpeakButton word="zip" text="zip" /> | 舌尖近齿龈留缝；/z/ 不是「兹」的拼音读法，气流持续摩擦 |
| /ʃ/ – /ʒ/ | <SpeakButton word="she" text="she" /> <SpeakButton word="usual" text="usual" /> | 双唇略前突；/ʒ/ 极少独立成词，多藏在 vision、decision 词中 |
| /h/ | <SpeakButton word="hat" text="hat" /> | 气流摩擦声门，比中文「喝」轻；弱读时常常脱落 |

### 破擦音（6 个）：先堵住，再摩擦着放开

| 音 | 例词点读 | 要点 |
| --- | --- | --- |
| /tʃ/ – /dʒ/ | <SpeakButton word="chair" text="chair" /> <SpeakButton word="June" text="June" /> | 「吃」「举」的起头但不送中文那口圆唇 |
| /tr/ – /dr/ | <SpeakButton word="tree" text="tree" /> <SpeakButton word="dry" text="dry" /> | 卷舌起势；严格说这是辅音连缀，教材习惯单列成对 |
| /ts/ – /dz/ | <SpeakButton word="cats" text="cats" /> <SpeakButton word="kids" text="kids" /> | 就是复数词尾那个音；同样属教学单列的连缀 |

### 鼻音、边音与滑音（7 个）：气流改道走

| 音 | 例词点读 | 要点 |
| --- | --- | --- |
| /m/ | <SpeakButton word="moon" text="moon" /> | 双唇闭合，气流走鼻腔 |
| /n/ | <SpeakButton word="noon" text="noon" /> | 舌尖抵上齿龈，气流走鼻腔 |
| /ŋ/ | <SpeakButton word="sing" text="sing" /> | 舌根抵软腭的后鼻音。singer 只有一个 /ŋ/，finger 里是 /ŋg/ |
| /l/ | <SpeakButton word="light" text="light" /> <SpeakButton word="milk" text="milk" /> | 词首「清晰 l」舌尖抵齿龈；词尾「含糊 l」舌根同时抬起 |
| /r/ | <SpeakButton word="red" text="red" /> <SpeakButton word="right" text="right" /> | 舌尖卷起但不碰任何部位；别用中文 r 的舌位代替 |
| /w/ | <SpeakButton word="wet" text="wet" /> <SpeakButton word="want" text="want" /> | 双唇收圆快速滑开；和 /v/ 上齿咬唇完全是两回事 |
| /j/ | <SpeakButton word="yes" text="yes" /> <SpeakButton word="year" text="year" /> | 「也」的起头，舌面抬向硬腭的滑音 |

::: note 教材口径与音位学口径
48 音标是教学体系：tr、dr、ts、dz 严格说是辅音连缀而非独立音位，但国内教材习惯单列凑成 28 个辅音，本页从教材口径。英国正式语音学描述（如 Jones 音标表）则不单列这四对。
:::

## 易混音对照

最小对立对（minimal pairs）是练听辨最快的路子：两个词只差一个音，读对了意思就变了。每组都点一遍，跟读十遍。

| 对立 | 最小对立对 | 听辨与发音要点 |
| --- | --- | --- |
| /iː/ – /ɪ/ | <SpeakButton word="sheep" text="sheep" /> vs <SpeakButton word="ship" text="ship" />；<SpeakButton word="seat" text="seat" /> vs <SpeakButton word="sit" text="sit" /> | 长紧 vs 短松，别都读成「西」；beat 与 bit 同理 |
| /e/ – /æ/ | <SpeakButton word="bed" text="bed" /> vs <SpeakButton word="bad" text="bad" />；<SpeakButton word="men" text="men" /> vs <SpeakButton word="man" text="man" /> | /æ/ 下巴再往下、口再开一点 |
| /æ/ – /ʌ/ | <SpeakButton word="cat" text="cat" /> vs <SpeakButton word="cut" text="cut" /> | /æ/ 舌前 /ʌ/ 舌中，别都归到「阿」 |
| /ɒ/ – /ɔː/ | <SpeakButton word="not" text="not" /> vs <SpeakButton word="nought" text="nought" /> | 短促圆唇 vs 圆唇拉长 |
| /ʊ/ – /uː/ | <SpeakButton word="full" text="full" /> vs <SpeakButton word="fool" text="fool" />；<SpeakButton word="pull" text="pull" /> vs <SpeakButton word="pool" text="pool" /> | 松短 vs 紧长，嘴唇别提前抿圆 |
| /e/ – /eɪ/ | <SpeakButton word="let" text="let" /> vs <SpeakButton word="late" text="late" />；<SpeakButton word="men" text="men" /> vs <SpeakButton word="main" text="main" /> | /eɪ/ 有滑动过程，不是「诶」拉长 |
| /əʊ/ – /uː/ | <SpeakButton word="soap" text="soap" /> vs <SpeakButton word="soup" text="soup" /> | 起点一个在中央一个在后高，别混 |
| /θ/ – /s/ | <SpeakButton word="think" text="think" /> vs <SpeakButton word="sink" text="sink" />；<SpeakButton word="path" text="path" /> vs <SpeakButton word="pass" text="pass" /> | 舌尖伸到上下齿之间，哪怕夸张一点也好 |
| /ð/ – /z/ | <SpeakButton word="breathe" text="breathe" /> vs <SpeakButton word="breeze" text="breeze" /> | 同上：舌尖位置决定一切 |
| /v/ – /w/ | <SpeakButton word="vet" text="vet" /> vs <SpeakButton word="wet" text="wet" />；<SpeakButton word="vine" text="vine" /> vs <SpeakButton word="wine" text="wine" /> | /v/ 上齿咬下唇，/w/ 双唇收圆 |
| /ʃ/ – /tʃ/ | <SpeakButton word="share" text="share" /> vs <SpeakButton word="chair" text="chair" /> | /ʃ/ 持续摩擦，/tʃ/ 先堵后弹 |
| /n/ – /ŋ/ | <SpeakButton word="sin" text="sin" /> vs <SpeakButton word="sing" text="sing" />；<SpeakButton word="thin" text="thin" /> vs <SpeakButton word="thing" text="thing" /> | 舌尖抵齿龈 vs 舌根抵软腭，口型几乎一样全靠舌位 |
| /l/ – /r/ | <SpeakButton word="light" text="light" /> vs <SpeakButton word="right" text="right" />；<SpeakButton word="collect" text="collect" /> vs <SpeakButton word="correct" text="correct" /> | /l/ 舌尖要碰到齿龈，/r/ 卷起不碰 |

## 重音与弱读

英语是**重音计时**的语言：一句话里实词（名词、动词、形容词）响亮清晰，虚词（冠词、介词、助动词）压扁成弱读，最常被压扁的就是 /ə/。听懂连读和弱读，比读准单个音标更影响实际听感。

**重音位置改变词义与词性**——名词重音在前，动词重音在后，这一对现象最典型，点读对比：

| 词 | 名词用法（重音在前） | 动词用法（重音在后） |
| --- | --- | --- |
| record | <SpeakButton kind="sentence" word="I bought a new record." text="a ˈrecord 一张唱片" /> | <SpeakButton kind="sentence" word="Please record the meeting." text="to reˈcord 去录制" /> |
| present | <SpeakButton kind="sentence" word="Here is a present for you." text="a ˈpresent 一份礼物" /> | <SpeakButton kind="sentence" word="They present a report." text="to preˈsent 去呈现" /> |

**弱读示例**：can 在句中弱读成 /kən/，只有在句尾或强调时才读 /kæn/：

- <SpeakButton kind="sentence" word="I can swim very fast." text="I can swim very fast.（can 弱读）" />
- <SpeakButton kind="sentence" word="Yes, I can." text="Yes, I can.（句尾强读）" />

再看一个词里的弱化：banana 三个 a 只有一个读 /ɑː/，其余全是 /ə/——<SpeakButton word="banana" text="banana" />。重音落在哪个音节、其余音节如何塌缩成 /ə/，正是 photograph 与 photography 点读对比中最直观的现象：<SpeakButton word="photograph" text="photograph" />　<SpeakButton word="photography" text="photography" />。

## 拼读规律速查

英语拼读不一致是历史欠账：14-18 世纪[元音大推移](/history#元音大推移与印刷术-1400-1700-嘴变了-拼法没跟上)改了读音，1476 年后的印刷术却把旧拼法冻结了。规律仍在，只是要按组合记：

| 字母组合 | 常见读音 | 例词点读 | 备注 |
| --- | --- | --- | --- |
| -tion | /ʃn/ | <SpeakButton word="nation" text="nation" /> <SpeakButton word="station" text="station" /> | 拉丁 -tionem 经法语进入英语 |
| ch | /tʃ/；/k/；/ʃ/ | <SpeakButton word="chair" text="chair" />；<SpeakButton word="school" text="school" /> <SpeakButton word="chemistry" text="chemistry" />；<SpeakButton word="machine" text="machine" /> | 希腊来源读 /k/，法语来源读 /ʃ/，本族词读 /tʃ/ |
| th | /θ/ 或 /ð/ | <SpeakButton word="think" text="think" /> <SpeakButton word="both" text="both" />；<SpeakButton word="this" text="this" /> <SpeakButton word="then" text="then" /> | 功能词多 /ð/；外来词例外：Thai、Thomas 读 /t/ |
| magic e | 词尾 e 不发音，元音读字母音 | <SpeakButton word="hat" text="hat" />→<SpeakButton word="hate" text="hate" />；<SpeakButton word="hop" text="hop" />→<SpeakButton word="hope" text="hope" /> | 开音节长音，闭音节短音，一对一点读对比 |
| kn- / wr- | k、w 不发音 | <SpeakButton word="knife" text="knife" /> <SpeakButton word="know" text="know" />；<SpeakButton word="write" text="write" /> | 古英语发音的化石，当年 k、w 是真读出来的 |
| 双写辅音 | 只发一个音 | <SpeakButton word="apple" text="apple" /> <SpeakButton word="summer" text="summer" /> | 双写本身标记前面的短元音 |
| -ed | /t/；/d/；/ɪd/ | <SpeakButton word="stopped" text="stopped" />；<SpeakButton word="played" text="played" />；<SpeakButton word="wanted" text="wanted" /> | 清后读清 /t/，浊后读浊 /d/，t、d 后读 /ɪd/ |
| -s（复数/三单） | /s/；/z/；/ɪz/ | <SpeakButton word="cats" text="cats" />；<SpeakButton word="dogs" text="dogs" />；<SpeakButton word="boxes" text="boxes" /> | 规则同 -ed，跟着前面的清浊走 |

## 延伸阅读

- [词根来源](/roots)：ch 为什么在 chemistry 里读 /k/、-tion 从哪里来，构词的来历都有故事。
- [发展历史](/history)：元音大推移、印刷术冻结拼法——拼读脱节的来龙去脉。
- [发展史时间线](/timeline)：按年代看发音事件与词汇事件的交错。
