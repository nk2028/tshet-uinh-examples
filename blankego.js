/* 有女羅馬字
 * https://github.com/BYVoid/ytenx/blob/master/ytenx/sync/kyonh/PrengQim.txt
 *
 * 以下內容為生成有女羅馬字的函數體
 * 函數接受音韻地位，返回對應的有女羅馬字
 *
 * 本版說明：
 * - 基於韻典網數據，並參照有女同車原版《〈廣韻〉全字表》（下稱「原表」）有所校正
 * - 目前版本推導器的音韻地位分析（基於 poem《廣韻字音表》）與原表有數十小韻在聲母、開合、等、重紐類等歸類有所不同，除個別外均不影響拼寫體系
 * - 旨韻（脂上聲）若干精、章組小韻，韻母寫為B類，與他處精章組均用A類不合，現修正
 * - 崇開三眞上（濜）：真諄上去聲莊組開口，原表及拼寫均析為臻韻上去聲，惟此小韻遺漏，現修正
 * - 莊合三真入（𠭴）：韻母寫為A類，與他處莊組均用B類不合，現修正（雖然不排除是因該小韻列於術韻而非質韻，但術韻下亦有「率」小韻用B類拼作 shwyt，故當以B類為正）
 * - 以開一寒入（䔾）：原表作明母，誤。原表亦無寒韻拼章組日以母例，但有談韻書母例與之平行，故可拼作 jat
 * - 幫三B清入（碧）：原表視為清A合口作 pvek，與「辟」小韻開合對立。原表清韻無B類，但可據體系推出處理為清B時的拼法 pyek。此外該小韻亦可按庚三處理為 pyak。本代碼同時支持三種處理法
 */

// 可調整參數
if (!音韻地位) return {
  清B脣音: [1, null, '合口', '庚三'], // 清B脣音（「碧」小韻）處理法：默認（`null`）按清B拼寫
                                   // 其他可選值：
                                   // - `'合口'`：按清A合口拼寫，同原表處理法
                                   // - `'庚三'`：按庚三拼寫，同韻典處理法
  莊組眞欣開口歸臻: true, // 莊組眞欣韻開口上、去聲均視作臻韻（原表、韻典均如此處理）
  脣音咍韻作開口: true, // 脣音咍韻是否視作開口，可選值：
                     // - `false`：一律視作合口
                     // - `true`（默認）：視 `音韻地位.韻` 而定，
  凡韻非脣音作合口: true, // 凡韻非脣音是否視作合口，可選值：
                       // - `false`：一律視作開口
                       // - `true`（默認）：視 `音韻地位.韻` 而定，
};

// 調整音韻地位

if (選項.清B脣音 === '庚三' && 音韻地位.屬於('幫組 清韻 重紐B類')) {
  const { 母, 聲 } = 音韻地位;
  音韻地位 = new 音韻地位.constructor(母, null, '三', null, '庚', 聲);
}

if (選項.莊組眞欣開口歸臻 && 音韻地位.屬於('莊組 眞欣韻 開口')) {
  const { 母, 等, 聲 } = 音韻地位;
  音韻地位 = new 音韻地位.constructor(母, '開', 等, null, '臻', 聲);
}

if (!選項.脣音咍韻作開口 && 音韻地位.屬於('幫組 咍韻')) {
  const { 母, 等, 聲 } = 音韻地位;
  音韻地位 = new 音韻地位.constructor(母, null, 等, null, '灰', 聲);
}

if (!選項.凡韻非脣音作合口 && 音韻地位.屬於('凡韻') && !音韻地位.屬於('幫組')) {
  const { 母, 等, 聲 } = 音韻地位;
  音韻地位 = new 音韻地位.constructor(母, '開', 等, null, '嚴', 聲);
}

const is = (x) => 音韻地位.屬於(x);

/**
 * 依次匹配列表 `rules` 中的規則，返回第一項測試為 true 的對應結果。
 * 無匹配規則時抛出異常，`name` 會包含於異常信息中。
 * 
 * `rules` 每項為 `[條件, 結果]`
 * 條件可為：
 * - 字串，會用 `音韻地位.屬於` 測試
 * - 函數，會直接調用並測試返回結果
 * - 其他，直接測試真值
 */
function 規則(name, rules) {
  for (const [rule, res] of rules) {
    if (typeof rule === 'string') {
      if (is(rule)) {
        return res;
      }
    } else if (typeof rule === 'function') {
      if (rule()) {
        return res;
      }
    } else if (rule) {
      return res;
    }
  }
  throw new Error(`無${name}規則：${音韻地位.描述}`);
}

// 聲母

let 母 = {
  幫: 'p',  滂: 'ph', 並: 'b',  明: 'm',
  端: 't',  透: 'th', 定: 'd',  泥: 'n',
  知: 't',  徹: 'th', 澄: 'd',  孃: 'n',
  精: 'z',  清: 'c',  從: 'dz',           心: 's',  邪: 'sz',
  莊: 'tr', 初: 'ch', 崇: 'dr',           生: 'sh', 俟: 'zh',
  章: 'tj', 昌: 'tc', 船: 'dj', 日: 'r',  書: 'sj', 常: 'zj',
  見: 'k',  溪: 'q',  羣: 'g',  疑: 'ng',
  影: '',   曉: 'x',  匣: 'h',  云: 'h',
                                以: 'j',
                                來: 'l',
}[音韻地位.母];

if (母 === undefined) {
  throw new Error(`無聲母規則: ${音韻地位.描述}`);
}

// 韻尾

let 尾 = 規則('韻尾', [
  ['遇果假攝 或 支脂之佳韻', ''],
  ['通江宕梗曾攝', 'ng'],
  ['蟹攝 或 微韻', 'i'], // 已排除佳韻
  ['臻山攝', 'n'],
  ['效流攝', 'u'],
  ['深咸攝', 'm'],
]);

// 主元音

let 元 = 規則('主元音', [
  ['歌麻　唐庚陽　泰夬廢　寒刪元　豪肴　談銜嚴凡韻', 'a'],
  ['佳支　青耕清　齊皆祭　先山仙　蕭宵　添咸鹽　韻', 'e'],
  ['　脂　　　　　　　　　眞　　　　幽　　　侵　韻', 'i'],
  ['　　　　　　　　　　　臻　　　　　　　　　　韻', 'yi'],
  ['　　　登江蒸　咍灰微　痕魂欣　侯尤　覃　　　韻', 'o'],
  ['　之　　　　　　　　　　　　　　　　　　　　韻', 'io'], // 之韻 io 的 i 視為主元音
  ['模虞　東　　　　　　　　　文　　　　　　　　韻', 'u'],
  ['　魚　冬　鍾　　　　　　　　　　　　　　　　韻', 'v'],
]);

// 介音

// 拼寫上使用合口介音的場合
const 合口 = (is('合口') && !is('文韻'))
  || (is('凡韻 或 脣音 歌陽韻'))
  || (is('脣音 一三等')
    && ['a', 'o'].includes(元)
    && !['', 'ng', 'u', 'm'].includes(尾)
    && !is('咍泰韻'))
  || (is('幫組 清韻 重紐B類') && 選項.清B脣音 === '合口');

let 介 = {
  一: ['', 'u'],
  二: ['e', 'o'],
  三: ['i', 'v'],
  四: ['', 'u'],
}[音韻地位.等][Number(合口)];

if (介 === 'i' && (元.startsWith('i') || 元.startsWith('y'))) {
  介 = '';
}

// 二等開口 e 元音寫作 ae
if (介 === 'e' && 元 === 'e') {
  介 = '';
  元 = 'ae';
}
// oe 上聲要雙寫 o，亦視作整體
if (介 === 'o' && 元 === 'e') {
  介 = '';
  元 = 'oe';
}

// 三等重紐、重韻
if ((is('重紐B類') && (選項.清B脣音 !== '合口' || !is('幫組 清韻')))
  || (['i', 'e'].includes(元)
    && is('三等 知莊組 或 云母')
    && !is('知組 清韻 或 知組 眞韻 合口')) // 清、諄韻知組視作A類
  || is('麻庚韻 三等 或 幽韻') // 重韻
) {
  介 = {
    i: 'y',
    v: 'w',
    '': '', // 主元音為 i 時
  }[介];
  if (介 === undefined) {
    throw new Error(`無重紐重韻規則: ${音韻地位.描述}`);
  }
  if (元 === 'i') {
    元 = 'y';
  }
}

// 拼寫規則

// 章組、日以母省略 i 介音，麻三亦省略 y 介音
if (is('章組 或 日以母')) {
  if (介.startsWith('i')) {
    介 = 介.slice(1);
  } else if (is('麻韻 三等') && !合口) {
    介 = '';
  }
}
// 莊組拼 ea 省 e，拼 io, iu, iv 省 i（不含之韻），拼 ye 省 y（支韻除外）
if (is('莊組')) {
  if ((介 === 'e' && 元 === 'a')
    || (介 === 'i' && ['o', 'u', 'v'].includes(元))
    || (介 === 'y' && 元 === 'e' && 尾 !== '')
  ) {
    介 = '';
  }
}

// 聲調
if (音韻地位.聲 === '入') {
  尾 = {
    m: 'p',
    n: 't',
    ng: 'k',
  }[尾];
} else if (音韻地位.聲 !== '平') {
  if (['i', 'u', 'ng'].includes(尾)) {
    尾 = {
      i: ['j', 'y'],
      u: ['v', 'w'],
      ng: ['nk', 'nq'],
    }[尾][Number(音韻地位.聲 === '去')];
  } else if (音韻地位.聲 === '上') {
    元 = (['io', 'ae', 'oe'].includes(元)) ? 元[0] + 元 : 元 + 元.slice(-1);
  } else if (音韻地位.聲 === '去' && ['m', 'n'].includes(尾)) {
    尾 = 尾 + 尾;
  } else if (音韻地位.聲 === '去' && 尾 === '') {
    元 = 元 + 'h';
  } else {
    throw new Error(`無聲調規則: ${音韻地位.描述}`);
  }
}
if (尾 === undefined || 元 === undefined) {
  throw new Error(`無聲調規則: ${音韻地位.描述}`);
}

return `${母}${介}${元}${尾}`;
