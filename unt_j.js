/* unt 切韵拟音 J
 *
 * - 音系规则和代码实现 - https://zhuanlan.zhihu.com/p/305516512
 * - 语音描写和拟音说明 - https://zhuanlan.zhihu.com/p/313005024
 *
 * J 为拟音的版本号
 *
 * 之前的 unt 切韵朗读音推导方案已归档，请查看 https://github.com/nk2028/qieyun-examples/blob/main/unt.js
 *
 * @author unt
 */

const is = (x) => 音韻地位.屬於(x.replace(/　/g, ''));

/** 目录

一、流程控制开关
二、音节结构
三、音韵地位对应音位（及其代码实现）和区别性特征
四、音系规则（及其代码实现）
五、后处理的代码实现

下面语音学术语对应的音韵学术语将用全角尖括号〈〉在语音学术语后注明。
*/

/** 一、流程控制开关
*/

if (!音韻地位) return [
  ['知組:', [1, 'tɹ', 'ʈ']],
  ['云母:', [1, 'w', 'ɹ']],
  ['祭泰夬廢韻尾:', [2, 'j', 'ɹ', 'ð']],
  ['精三A合介音:', [1, 'ɹ', 'ɥ']],
  ['後低元音:', [2, 'ɑ', 'a']],
  // 对于多数字体，r 音钩后需插入 U+2006（六分之一的 Em 间隔）以确保显示效果
  ['二等元音記號:', [1, '咽化 ◌ˤ', 'r音鉤（帶空隙）◌˞ ', 'r音鉤（無空隙）◌˞', '下等號 ◌͇', '雙下橫線 ◌̳']],
  ['侯韻:', [2, 'u', 'ɘu']],
  ['聲調記號:', [1, '上◌́ 去◌̀', '上ˀ 去ʱ', '上ˀ 去ʰ']],
];

for (var key in 選項) {
  if (key.includes(':')) {
    選項[key.slice(0, -1)] = 選項[key]; // 去除冒号，方便下面代码中引用
  }
}

/** 二、音节结构

切韵拟音 J 的音节结构是 CʷGVCᵀ。

Cʷ：辅音或唇化辅音，作为声母（initial）
G：滑音（glide），作为介音（medial）
V：单元音或二合元音，作为韵核（nucleus）。成音节辅音 [ɹ̩] 也可以作韵核〈臻韵〉
C：辅音，作为韵尾（coda）。韵核和韵尾加在一起叫作韵基（rime）
ᵀ：声调（tone）

介音和韵尾可有可无，声母、韵核、声调是必须出现的。
*/

/** 三、音韵地位对应音位（及其代码实现）和区别性特征（distinctive feature）

1. 辅音的特征

发声态和调音方式：

[±voi]:   带声（voice）
[±sg]:    展声门（spread glottis），即辅音送气。注意 [h]〈晓母三等〉按照理论是 [+sg]，但本文为了和“全清”对应，算作 [−sg]（也有人将晓母归次清）
[±son]:   响音（sonorant）性，包括鼻音和近音（本文的响音不包含元音）。相反的 [−son] 是阻音（obstruent）
[±stop]:  塞音性，包括鼻塞音（即鼻音）和口塞音（即爆发音和塞擦音）。包含鼻音的“塞音”严格来说应该叫 occlusive 而非 stop，本文从简直接用 [±stop]
[±fric]:  擦音（fricative）性。本文将塞擦音也算入 [+fric]，不使用现代音系学常用的 [±delayed release]（延缓除阻）

调音部位：

[LAB]:    唇（labial）
  [±rnd]: 圆唇（round），包括唇化辅音和圆唇元音
[COR]:    舌冠（coronal），即锐音。本文为了简便将硬腭辅音也算入舌冠音。本文从简仍然使用“锐音、钝音”的叫法，但不用 [∓grave]
  [±ant]: 前部（anterior）。前部锐音包括齿–龈、龈，后部锐音包括龈后、卷舌、龈–腭等
  [±r]:   r 色彩
[DOR]:    舌面（dorsal）
  [±high]:高，对辅音而言 [DOR, +high] 是软腭音，[DOR, −high] 是小舌音，正好符合三等、非三等之分。
          本文将软腭音分为软腭前音（prevelar）、软腭后音（postvelar）两组，分别用软腭音和小舌音的记号表示。

2. 音韵地位对应辅音音位

详见下面代码实现。
*/

// 函数：将声母的音韵地位转换为音位，不含开合信息
// 介音音位和条件变体也在下面列出，以说明其区别性特征，尽管在代码中用不到
function getInitialWithoutRounding() {
  return {
 // 不送气     送气       浊阻音     浊响音
 // 清阻音     清阻音
 //〈全清〉   〈次清〉   〈全浊〉   〈次浊〉
 // −voi       −voi       +voi       +voi
 // −sg        +sg        −sg        −sg
 // −son       −son       −son       +son
    幫: 'p',   滂: 'pʰ',  並: 'b',   明: 'm',  // +stop, −fric; LAB            双唇塞音  〈帮组/唇音〉
                              帮三C介音: 'β',  // −stop, −fric; LAB            双唇近音
    端: 't',   透: 'tʰ',  定: 'd',   泥: 'n',  // +stop, −fric; COR, +ant      齿龈塞音  〈端组/舌头音〉
    精: 'ts',  清: 'tsʰ', 從: 'dz',            // +stop, +fric; COR, +ant      齿龈塞擦音〈精组/齿头音〉
    心: 's',              邪: 'z',             // −stop, +fric; COR, +ant      齿龈擦音  〈精组/齿头音〉
                                     來: 'l',  // −stop, −fric; COR, +ant      齿龈近音  〈来母/半舌音〉
    知: 'tɹ',  徹: 'tɹʰ', 澄: 'dɹ',  孃: 'nɹ', // +stop, −fric; COR, −ant, +r  卷舌塞音  〈知组/舌上音〉
    莊: 'tʂ',  初: 'tʂʰ', 崇: 'dʐ',            // +stop, +fric; COR, −ant, +r  卷舌塞擦音〈庄组/正齿音〉
    生: 'ʂ',              俟: 'ʐ',             // −stop, +fric; COR, −ant, +r  卷舌擦音  〈庄组/正齿音〉
                              钝三B介音: 'ɹ',  // −stop, −fric; COR, −ant, +r  龈后近音
                                     日: 'ɲ',  // +stop, −fric; COR, −ant, −r  龈腭塞音  〈日母/半齿音〉
    章: 'tɕ',  昌: 'tɕʰ', 常: 'dʑ',            // +stop, +fric; COR, −ant, −r  龈腭塞擦音〈章组/正齿音〉
    書: 'ɕ',              船: 'ʑ',             // −stop, +fric; COR, −ant, −r  龈腭擦音  〈章组/正齿音〉
                                     以: 'j',  // −stop, −fric; COR, −ant, −r  硬腭近音  〈以母/喉音〉
    見: 'k',   溪: 'kʰ',  羣: 'ɡ',   疑: 'ŋ',  // +stop, −fric; DOR (+high)    软腭前塞音〈见组/牙音〉
                          匣: 'ɣ',   云: 'ɣ',  // −stop, +fric; DOR (+high)    软腭前擦音〈影组/喉音〉
                              见三C介音: 'j̈',  // −stop, −fric; DOR (+high)    软腭前近音
   見1: 'q',  溪1: 'qʰ',            疑1: 'ɴ',  // +stop, −fric; DOR (−high)    软腭后塞音【见组的非三等变体这里用1标记】
   曉1: 'χ',             匣1: 'ʁ',             // −stop, +fric; DOR (−high)    软腭后擦音
    影: 'ʔ',                                   // +stop, −fric                 喉塞音    〈影组/喉音〉
    曉: 'h',                                   // −stop, +fric                 喉擦音    〈影组/喉音〉
  }[音韻地位.母];
}

const is全清 = is('幫端精心知莊生章書見影曉母'); // [−voi, −sg, −son]
const is次清 = is('滂透清　徹初　昌　溪　　母'); // [−voi, +sg, −son]
const is全浊 = is('並定從邪澄崇俟常船羣　匣母'); // [+voi, −sg, −son]
const is次浊 = is('明泥來　孃　　日以疑云　母'); // [+voi, −sg, +son]
const is清 = is全清 || is次清;
// 云母已按推导后的结果 [w] 算入次浊

const is锐前 = is('端精組 或 來母 一二四等'); // [COR, +ant]
const is锐后 = is('知莊章組 或 日以母');      // [COR, −ant]
const is锐 = is锐前 || is锐后 || is('來母');  // [COR]
// 来母按推导后只有非三等 [l] 算入前部锐音，但来母三等 [lɹ] 不算前部也不算后部

// 函数：将声母的音韵地位转换为音位，包含开合信息
function getInitial() {
  let result = getInitialWithoutRounding();
  if ('打爹'.includes(字頭) && is('知母')) result = 't';

  // 音韵学术语开合对应 [±rnd]。如果主要调音部位就是 [LAB]〈帮组〉，那么本文一律视为 [−rnd]
  // 没有开合对立的韵母一般视为开口，但虞韵本文视为鱼韵对应的合口；平行地，钟韵也视为合口
  if (is('合口 或 虞鍾韻') && !is('幫組')) { // [+rnd]
    result += 'ʷ';
    result = result.replace('ʰʷ', 'ʷʰ');
  } // else [−rnd]
  return result;
}

// 函数：将软腭前音转换为软腭后音
function velarToUvular(consonant) {
  switch (consonant[0]) {
    case 'k': return 'q' + consonant.substring(1);
    case 'ɡ': return 'ɢ' + consonant.substring(1);
    case 'ŋ': return 'ɴ' + consonant.substring(1);
    case 'ɣ': return 'ʁ' + consonant.substring(1);
  }
  return consonant;
}

// 函数：将知组转换为卷舌塞音
function retroflexToStop(consonant) {
  switch (consonant.substring(0, 2)) {
    case 'tɹ': return 'ʈ' + consonant.substring(2);
    case 'dɹ': return 'ɖ' + consonant.substring(2);
    case 'nɹ': return 'ɳ' + consonant.substring(2);
  }
  return consonant;
}

// 函数：将介音的音韵地位转换为音位，不含开合信息
function getGlide() {
  if (is('云母 灰韻')) return 'ɹ'; // “倄”小韵

  // 一二四等无介音
  if (!is('三等')) return '';

  // 锐音声母三等介音一律用 /ɹ/
  if (is锐) return 'ɹ';

  // 钝音声母分三 A、B、C
  if (is('重紐B類 或 庚臻韻')) return 'ɹ';
  if (is('溪母 幽韻 平聲')) return 'ɹ'; // “𠁫”小韵归三 B
  if ('抑𡊁烋'.includes(字頭)) return 'ɹ'; // 蒸韵“抑𡊁”二字、幽韵“烋”字归三 B
  if (字頭 == '揭' && is('見母 仙韻')) return 'ɹ'; // “孑”小韵的“揭”字归三 B
  if (is('云母 支脂祭眞臻仙宵麻庚清蒸幽侵鹽韻')) return 'ɹ'; // 云母前元音韵归三 B
  if (is('重紐A類 或 麻蒸清幽韻')) return 'j'; // 三 A
  return 'j̈'; // 三 C
}

// 函数：将韵尾的音韵地位转换为音位
function getCoda() {
  if (is('通江宕梗曾攝')) return is('入聲') ? 'k' : 'ŋ';
  if (is('深咸攝'))       return is('入聲') ? 'p' : 'm';
  if (is('臻山攝'))       return is('入聲') ? 't' : 'n';
  if (is('佳韻'))         return ''; // 从蟹摄中排除无韵尾的佳韵
  if (is('微韻 或 蟹攝')) return 'j';
  if (is('幽韻 或 效攝')) return 'w';
  return '';
}

/**
3. 元音的特征

[±high]:  高
[±low]:   低
[±front]: 前
[±back]:  后
[±rnd]:   圆唇（round）
[±tense]: 紧。三子韵及其对应的三寅韵是松元音，三丑韵及其对应的三寅韵是紧元音，非三等韵都是紧元音
[±divII]: 二等（division-II）。本文不指定它的具体语音实现

列表如下。[ʉ] 是音位变体，也加入下表

             i  ɨ (ʉ) u  ɪ  +high, −low
       eˤ œˤ e  ə     o  ɜ  −high, −low
       aˤ       a           −high, +low
front        +  −  −  −
back         −  −  −  +
rnd    −  +  −  −  +  +
tense  +  +  +  +  +  +  −
divII  +  +  −  −  −  −  −

4. 音韵地位对应元音音位

详见下面代码实现。
*/

// 函数：将韵核的音韵地位转换为音位
function getNucleus() {
  // 松元音
  // 韵尾: m     j   n       w
  if (is('侵　　微　眞臻欣文　韻')) return 'ɪ'; // +high, −tense
  if (is('鹽嚴凡祭廢仙　元　宵韻')) return 'ɜ'; // −high, −tense

  // 紧元音
  // 脂韵、尤韵的韵基也可分别视为 /ɪj/、/ɪw/，本文从简直接视为紧元音 /i/、/u/
  // 韵尾:   ŋ m j n w
  if (is('脂蒸　　　幽韻')) return 'i';  // +high, −low, +front, −back, −rnd, +tense
  if (is('之　　　　　韻')) return 'ɨ';  // +high, −low, −front, −back, −rnd, +tense
  if (is('尤東　　　侯韻')) return 'u';  // +high, −low, −front, +back, +rnd, +tense
  if (is('佳耕咸皆山　韻')) return 'eˤ'; // −high, −low, +divII,        −rnd, +tense
  if (is('　江　　　　韻')) return 'œˤ'; // −high, −low, +divII,        +rnd, +tense
  if (is('　青添齊先蕭韻')) return 'e';  // −high, −low, +front, −back, −rnd, +tense
  if (is('　登覃咍痕豪韻')) return 'ə';  // −high, −low, +front, −back, −rnd, +tense
  if (is('模冬　灰魂　韻')) return 'o';  // −high, −low, +front, −back, −rnd, +tense
  if (is('麻庚銜夬刪肴韻 二等')) return 'aˤ';
                                        // −high, +low, +divII,        −rnd, +tense
  if (is('麻庚　　　　韻 三等') ||
      is('歌唐談泰寒　韻')) return 'a'; // −high, +low, −front, −back, −rnd, +tense

  // 二合元音
  if (is('支韻'))     return 'iə'; // +front, −back, −rnd, +tense
  if (is('魚虞鍾韻')) return 'ɨə'; // −front, −back, −rnd, +tense
  if (is('清韻'))     return 'ia'; // +front, −back, −rnd, +tense
  if (is('陽韻'))     return 'ɨa'; // +front, −back, −rnd, +tense

  throw new Error('无元音规则');
}

// 函数：将半元音转换为元音
function semivowelToVowel(consonant) {
  switch (consonant) {
    case 'j': return 'i';
    case 'ɥ': return 'y';
    case 'j̈': return 'ɨ';
    case 'ɥ̈': return 'ʉ';
    case 'w': return 'u';
  }
  return consonant;
}

/**
5. 声调
*/

// 函数：将声调的音韵地位转换为语音
function getTone() {
  if (is('平入聲')) return '';
  if (is('上聲')) return 選項.聲調記號 == '上◌́ 去◌̀' ? '́' : 選項.聲調記號[1];
  if (is('去聲')) return 選項.聲調記號 == '上◌́ 去◌̀' ? '̀' : 選項.聲調記號[4];
  throw new Error('无声调规则');
}

/** 四、音系规则（及其代码实现）
*/

// 获取音节的各部分
let initial = getInitial();
let glide = getGlide();
let nucleus = getNucleus();
let coda = getCoda();
let tone = getTone();

/**
(1)  介音在后部锐音后被声母吸收而删除
     G -> ∅ / [COR, −ant]__
*/
if (is('知莊章組 或 日以母')) glide = '';
if (字頭 == '爹' && is('知母')) glide = 'j'; // 特例

/**
(2)  舌面介音被唇音或唇化声母同化〈帮组或合口三 A、C〉
     j -> ɥ / [+rnd]__
     j̈ -> ɥ̈ / [+rnd]__
          β / [LAB, −rnd]__
*/
if (initial.includes('ʷ')) {
  glide = glide.replace('j', 'ɥ');
} else if (is('幫組')) {
  if (glide == 'j̈') glide = 'β';
}

/**
(3)  唇化的声母 j 实现为 ɥ〈以母合口〉
     jʷ -> ɥ
*/
if (initial == 'jʷ') initial = 'ɥ';

/**
(4)  j 韵尾在低元音和中松元音后〈祭泰夬废〉实现为 ɹ
     j -> ɹ / {[+low], [−high, −tense]}__
*/
if (is('去聲')) {
  if (nucleus.includes('a') || nucleus == 'ɜ') {
    if (coda == 'j') coda = 選項.祭泰夬廢韻尾;
  }
}

/**
(5)  松元音的前后被前接辅音的锐钝同化
     ɪ -> i / [COR]__
          ɨ / 其他环境
     ɜ -> e / [COR]__
          ə / 其他环境
*/
if ([...'ɹjɥ'].includes(glide) || is锐) { // 不包含 glide 为零的情况，所以用 [...'ɹjɥ']
  if (nucleus == 'ɪ') nucleus = 'i';
  if (nucleus == 'ɜ') nucleus = 'e';
} else {
  if (nucleus == 'ɪ') nucleus = 'ɨ';
  if (nucleus == 'ɜ') nucleus = 'ə';
}

/**
(6)  二合元音的后滑音（off-glide）部分被元音的前后同化
     ə -> ɛ / i__
       -> ʌ / ɨ__
     a -> æ / i__
       -> ɐ / ɨ__
*/
if (nucleus == 'iə') nucleus = 'iɛ';
if (nucleus == 'ɨə') nucleus = 'ɨʌ';
if (nucleus == 'ia') nucleus = 'iæ';
if (nucleus == 'ɨa') nucleus = 'ɨɐ';

/**
(7)  一等韵的韵核 /a/ 实现为 [ɑ]
     三等韵的韵核 /a/ 在锐音后实现为 [a]，但锐音是唇化〈歌三合〉的除外；在钝音后〈歌韵〉实现为 [ɑ]
     a -> a / {[COR, +ant, −rnd]G, [COR, −ant]}__
       -> ɑ / 其他环境
*/
if (nucleus == 'a') {
  if (is锐 && glide && !initial.includes('ʷ') || is锐后 || !is锐 && [...'ɹjɥ'].includes(glide)) {
    nucleus = 'a';
    // 这里“㶒䔾譫”三小韵会被转换为 a，但我们不作处理
  } else {
    nucleus = 'ɑ';
  }
}

/**
(8)  央高元音被唇音或唇化声母同化（包括二合元音 ɨʌ -> ʉɔ〈虞钟阳韵〉）
     ɨ -> ʉ / [LAB]__
*/
if (initial.includes('ʷ') || initial == 'ɥ' || glide == 'β') {
  nucleus = nucleus.replace('ɨʌ', 'ʉɔ');
  nucleus = nucleus.replace('ɨ', 'ʉ');
}

/**
(9)  i 在卷舌咝音和龈韵尾之间〈庄组真臻欣韵开口〉舌冠化为 ɹ̩
     i -> ɹ̩ / [COR, −ant, +r, +fric, −rnd]__[COR]
*/
if (is('莊組') && !initial.includes('ʷ') && [...'nt'].includes(coda)) {
  if (nucleus == 'i') nucleus = 'ɹ̩';
}

/**
(10) 零介音、唇音或唇化韵尾前的 ə〈豪覃韵〉实现为 ʌ
     ə -> ʌ / 非G__[LAB]
*/
if (!glide && [...'mpw'].includes(coda)) {
  if (nucleus == 'ə') nucleus = 'ʌ';
}

/**
(11) βəm〈凡韵〉的韵核实现为圆唇元音
     {e, ə} -> œ / [LAB]G__m
*/
if (nucleus == 'ə' && (initial.includes('ʷ') || is('幫組')) && [...'mp'].includes(coda)) nucleus = 'œ';

/**
(12) 齿龈阻音〈端精组〉后的介音接前元音时被同化（圆唇时可选）
     G -> j / [COR, +ant, −son, −rnd]__[+front]
          ɥ / [COR, +ant, −son, +rnd]__[+front]
*/
if (is锐前 && 'ieæa'.includes(nucleus[0])) {
  if (!initial.includes('ʷ')) {
    if (glide) glide = 'j';
  } else {
    if (glide) glide = 選項.精三A合介音;
  }
}

/**
(13) i 在唇音或唇化声母和软腭韵尾之间〈蒸幽韵〉增生 ɹ 滑音
     G -> ɹ / [LAB]__i[DOR]
*/
if ((initial.includes('ʷ') || is('幫組')) && nucleus == 'i' && [...'ŋkw'].includes(coda)) {
  glide = 'ɹ';
}

/**
(14) 接介音的 ɣ〈云母〉实现为 w
     ɣ -> w / __G
*/
if (initial.includes('ɣ') && glide) {
  if (選項.云母 == 'ɹ') {
    initial = initial.replace('ɣ', 'ɹ'); // ɹ 视为声母
    glide = '';
  } else {
    initial = initial.replace('ɣʷ', 'w');
    if (glide == 'ɹ') {
      if (!is('入聲')) {
        initial = initial.replace('ɣ', ''); // “漹礥鴞炎䫴”算零声母
      } else {
        initial = initial.replace('ɣ', 'w'); // “煜曄”暂算合口
      }
    } else {
      glide = '';
      if (is('之韻')) {
        initial = initial.replace('ɣ', ''); // “矣”算零声母
      } else {
        initial = initial.replace('ɣ', 'w');
      }
    }
  }
}

/**
(15) 软腭音直接后接元音时〈见系和匣母非三等〉实现为软腭后音
     [DOR] -> [−high] / __V
*/
if (!glide) {
  initial = velarToUvular(initial);
}

/**
(16) h 直接后接元音时〈晓母非三等〉实现为软腭后音
     h -> χ / __V
*/
if (!glide) {
  initial = initial.replace('h', 'χ');
}

/**
(17) 圆唇元音和低非前元音后的软腭韵尾〈通江宕摄〉实现为软腭后音
     [DOR] -> [+back] / {[+round], [+low, −front]}__
*/
if ('ʉuoœɑ'.includes(nucleus[0]) || (nucleus.includes('ɐ'))) {
  coda = velarToUvular(coda);
}

/**
(18) u 在钝音声母和无介音齿龈声母后〈侯韵〉裂化，但 m 后不裂化
     u -> u / {[COR, −ant], m}__#
          ɘu / 其他__#
*/
if (nucleus == 'u' && !coda) {
  nucleus = 選項.侯韻;
  if (is锐后 || is('明云母') || glide) nucleus = 'u';
}

/**
(19) 高元音 + 半元音韵尾〈微幽韵〉实现为二合元音
     j -> i / [+high]__
     w -> u / [+high]__
*/
if ('iɨʉuɪ'.includes(nucleus)) {
  if (coda == 'j') coda = 'i';
  if (coda == 'w') coda = 'u';
}

/**
(20) 移除与韵核同部位介音
     [DOR, +son] -> ∅ / C__[+high, −back]
*/
if ('iɨʉ'.includes(nucleus[0])) {
  if (['j', 'ɥ', 'j̈', 'ɥ̈'].includes(glide)) glide = '';
  // 特别地，“矣”小韵算零声母
  if (initial == 'ɹ' && !coda) initial = '';
}

/**
(21) 齿龈音〈端精组〉接非后高元音时省略介音
     {j, ɥ} -> ∅ / [COR, +ant, −son]__[+high, +front, −back]
     G      -> ∅ / [COR, +ant, −son]__[+high, −front, −back]
*/
if (is锐前) {
  if (nucleus[0] == 'i' && [...'jɥ'].includes(glide)) glide = '';
  if ('ɨʉ'.includes(nucleus[0])) glide = '';
}

/**
(22) 移除 mβu 介音〈明母尤韵〉
     mβu -> mu
*/
if (initial == 'm' && nucleus == 'u' && !coda) {
  glide = '';
}

/** 五、后处理的代码实现
*/

if (選項.知組 == 'ʈ' && is('知組 或 來母')) {
  initial = retroflexToStop(initial);
  if (is('知組 三等')) glide = 'ɹ'; // 还原出三等介音
  if ('iɨʉ'.includes(nucleus[0])) glide = ''; // 再次应用音系规则 (21)。平行地，也要应用给来母
}

if (選項.後低元音 == 'a') {
  nucleus = nucleus.replace('ɑ', 'a');
}

if (is('二等')) {
  if ('打冷'.includes(字頭)) { // “打冷”两小韵不是二等元音
    nucleus = nucleus.replace('ˤ', '');
  }
  nucleus = nucleus.replace('ˤ', 選項.二等元音記號.split('◌')[1]);
}

if (選項.聲調記號 != '上◌́ 去◌̀') return initial + glide + nucleus + coda + tone;

// 声调附加符号写在韵核主体上
if (nucleus.includes('͇') || nucleus.includes('̳') || nucleus == 'ɘu' || nucleus == 'ɹ̩') return initial + glide + nucleus + tone + coda;
return initial + glide + nucleus[0] + tone + nucleus.substring(1) + coda;
