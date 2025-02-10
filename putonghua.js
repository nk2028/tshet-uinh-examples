/* 推導普通話
 *
 * @author graphemecluster
 * @author JwietPuj-Drin
 * @author SyiMyuZya
 *
 * 選項「清聲母入聲調分派層次」詳見平山久雄《中古汉语的清入声在北京话里的对应规律》
 * http://ccj.pku.edu.cn/Article/DownLoad?id=271015083&&type=ArticleFile
 * 默認選擇為「皆派入陰平」，参考刘海阳在對「北京话的入声为什么会派入三个不同的声调？」的回答中披露的材料——
 * 「古代清音入声字在北京話的声調，凡是沒有异讀的，就采用北京已經通行的讀法。凡是有异讀的，假若其中有一个是陰平調，原則上就采用陰平，例如：“息”ㄒㄧ（xī）“击”ㄐㄧ（jī）。否則逐字考慮，采用比較通行……」
 * https://www.zhihu.com/question/30370012/answer/533234460
 *
 * 選項「常母平聲陰聲韻聲母和船母平聲聲母」詳見 unt 對「为何中古的dʑ ʑ和普通话读音的对应似乎是反的（即dʑ > ʂ、ʑ > ʈʂ）？」的回答
 * https://www.zhihu.com/question/526195183/answer/2425807330
 */

/** @type { 音韻地位['屬於'] } */
const is = (...x) => 音韻地位.屬於(...x);
/** @type { 音韻地位['判斷'] } */
const when = (...x) => 音韻地位.判斷(...x);

const is更多選項 = 選項.更多選項 ?? false;

if (!音韻地位) return [
  ['標調方式', [2, '數字', '附標']],

  ['更多選項', is更多選項],
  ...(is更多選項 ? [
    '更多選項',
    ['清聲母入聲調分派層次',
      [2,
        '皆派入上聲',
        '皆派入陰平',
        '次清、擦音和零聲母字派入去聲，其餘派入陽平',
        '次清和零聲母字派入去聲，其餘派入陽平',
        '皆不標調',
        '連同濁聲母，所有入聲字皆派入去聲',
      ]
    ],
    ['常母平聲陰聲韻聲母和船母平聲聲母', [2, 'ch', 'sh']],
  ] : []),
];

// 預調整（中古中期通語已產生的不同）
if (is`明母 尤東韻`) 音韻地位 = 音韻地位.調整(`${音韻地位.韻 === '尤' ? '侯' : 音韻地位.韻}韻 一等 不分類`);
if (is`云母 通攝 舒聲`) 音韻地位 = 音韻地位.調整('匣母', ['匣母三等']);
// TODO 蟹攝入假攝、流攝入遇攝等

// j、q、x 不列於聲母規則，之後會由「拼細音」條件得出
const 聲母規則 = () => when([
  ['幫滂並母 C類', 'f'],
  ['幫母', 'b'],
  ['滂母', 'p'],
  ['並母', [['平聲', 'p'], ['', 'b']]],
  ['明母', [['C類', 'w'], ['', 'm']]],

  ['端母', 'd'],
  ['透母', 't'],
  ['定母', [['平聲', 't'], ['', 'd']]],
  ['泥孃母', 'n'],
  ['來母', 'l'],

  ['精母', 'z'],
  ['清母', 'c'],
  ['從母', [['平聲', 'c'], ['', 'z']]],
  ['心邪母', 's'],

  ['知莊章母', 'zh'],
  ['徹初昌母', 'ch'],
  ['澄崇母', [['平聲', 'ch'], ['', 'zh']]],
  ['常母', [['平聲 陽聲韻', 'ch'], ['', 'sh']]],
  ['生書母', 'sh'],
  ['俟船母', 'sh'],
  ['日母', 'r'],

  ['見母', 'g'],
  ['溪母', 'k'],
  ['羣母', [['平聲', 'k'], ['', 'g']]],
  ['曉匣母', 'h'],
  ['以母 蟹攝 三四等 合口', 'r'], // 「銳」
  ['疑影云以母', ''],
], '無聲母規則');

// 韻母均按零聲母寫法，唯 y、w、yu 作 i、u、ü（例如用 uen、ueng 不用 un、ong），這是為了方便後面的拼寫處理。
// 韻母規則不額外列出 zh、ch、sh、r、f、w 及部分 n、l 系統性地拼為洪音的情形，後面會處理。
const 舒聲韻母規則 = () => when([
  ['通攝', [['三四等 牙喉音', 'iong'], ['', 'ueng']]],

  ['止攝', [
    ['合口', [['莊組', 'uai'], ['', 'uei']]],
    ['', 'er'], // 'er' 指示其拼日母時為 er，以及拼 z、c、s 時聲母不作 j、q、x，其餘情形均同 i
  ]],

  ['遇攝', [['三四等', 'ü'], ['', 'u']]],

  ['蟹攝', [
    ['廢韻 平上聲 章組', [['合口', 'uai'], ['', 'ai']]], // 「茝」
    ['三四等', [['合口 莊組', 'uai'], ['合口', 'uei'], ['', 'i']]],
    // FIXME 蟹攝二等有古已轉入假攝者，依更早韻書推導時需判斷具體的字。目前暫僅列出個別可能存在系統性者
    ['二等 開口 溪影母', 'ai'], // 「矮隘楷揩」等
    ['佳韻 合口 牙喉音', 'ua'], // 「畫掛」等（FIXME 未覆蓋如「佳」「話」等，且過度覆蓋「拐」等，當依具體字而非音）
    ['佳韻 開口 疑母', 'ia'], // 「崖睚」等（FIXME 當依具體字而非音）
    ['二等', [
      ['開口 牙喉音', 'ie'],
      ['合口', 'uai'],
      ['', 'ai']],
    ],
    ['一等', [['開口', 'ai'], ['', 'uei']]],
  ]],

  ['臻深攝', [
    ['三四等', [['合口', 'ün'], ['', 'in']]],
    ['', [
      ['合口 或 舌齒音', 'uen'], // 覆蓋「吞」
      ['', 'en'],
    ]],
  ]],

  ['山咸攝', [
    ['三四等', [['合口', 'üan'], ['', 'ian']]],
    ['二等 牙喉音 開口', 'ian'],
    ['', [['合口', 'uan'], ['', 'an']]],
  ]],

  ['效攝', [
    ['三四等 或 二等 牙喉音', 'iao'],
    ['', 'ao'],
  ]],

  ['果假攝', [
    ['三四等', [['合口', 'üe'], ['', 'ie']]],
    ['二等', [['合口', 'ua'], ['牙喉音', 'ia'], ['', 'a']]],
    ['一等', [['開口 牙喉音', 'e'], ['', 'uo']]],
  ]],

  ['宕江攝', [
    ['合口 或 莊組 或 二等 知組', 'uang'],
    ['三四等 或 二等 牙喉音', 'iang'],
    ['', 'ang'],
  ]],

  ['梗曾攝', [
    ['三四等', [['合口', 'iong'], ['', 'ing']]],
    ['', [['合口', 'ueng'], ['', 'eng']]],
  ]],

  ['流攝', [
    // FIXME 流攝脣音有古已轉入遇攝者，依更早韻書推導時需判斷具體的字。目前暫僅列出個別可能存在系統性者
    ['幽韻 幫滂並母', 'iao'], // 「彪髟淲」等
    ['尤韻 脣音 非 (幫母 上聲)', 'u'], // 排除「否缶」（FIXME 當依具體字而非音）
    ['三四等', 'iou'],
    ['', 'ou'], // FIXME 未覆蓋如「牡」「部」「矛」「茂」等，當依具體字而非音
  ]],
], '無韻母規則');

const 入聲韻母規則 = () => when([
  ['通攝', [['三四等 牙喉音', 'ü'], ['', 'u']]],

  ['臻深攝', [
    ['莊組', [['合口', 'uai'], ['', 'e']]], // TODO 「櫛」？
    ['三四等', [['合口 或 脣音 C類', 'ü'], ['', 'i']]],
    ['', [['脣音', 'o'], ['合口', 'u'], ['', 'e']]],
  ]],

  ['山咸攝', [
    // TODO 「茁」
    ['二等 或 莊組 或 脣音 C類', [['合口', 'ua'], ['牙喉音', 'ia'], ['', 'a']]],
    ['三四等', [['合口', 'üe'], ['', 'ie']]],
    ['', [
      ['開口', [['牙喉音', 'e'], ['', 'a']]],
      ['', 'uo'],
    ]],
  ]],

  ['宕江攝', [
    // TODO 白讀
    ['三四等 或 二等 牙喉音', 'üe'],
    ['一等 開口 牙喉音', 'e'],
    ['', 'uo'],
  ]],

  ['梗曾攝', [
    // TODO 白讀
    ['三四等 非 莊組', [['合口', 'ü'], ['', 'i']]],
    ['', [['開口', 'e'], ['', 'uo']]],
  ]],
], '無韻母規則');

const 聲調規則 = () => when([
  ['清音', [
    ['平聲', '1'],
    ['上聲', '3'],
    ['去聲', '4'],
    ['入聲', ''],
  ]],
  ['濁音', [
    ['平聲', '2'],
    ['上聲', [['全濁', '4'], ['次濁', '3']]],
    ['去聲', '4'],
    ['入聲', [['全濁', '2'], ['次濁', '4']]],
  ]],
], '無聲調規則');

let 聲母 = 聲母規則();
let 韻母 = is`舒聲` ? 舒聲韻母規則() : 入聲韻母規則();
let 聲調 = 聲調規則();

if (選項.更多選項) {
  // 參考 https://www.zhihu.com/question/526195183/answer/2425807330
  if (is`(常母 陰聲韻 或 船母) 平聲`) 聲母 = 選項.常母平聲陰聲韻聲母和船母平聲聲母;

  /* 參考
   * http://ccj.pku.edu.cn/Article/DownLoad?id=271015083&&type=ArticleFile (https://web.archive.org/web/20240223084634/http://ccj.pku.edu.cn/Article/DownLoad?id=271015083&&type=ArticleFile)
   * https://www.zhihu.com/question/30370012/answer/533234460
   * https://www.zhihu.com/question/30370012/answer/535713330
   */
  if (is`入聲`) {
    switch (選項.清聲母入聲調分派層次) {
      case '皆派入上聲':
        if (is`清音`) 聲調 = '3';
        break;
      case '皆派入陰平':
        if (is`清音`) 聲調 = '1';
        break;
      case '次清、擦音和零聲母字派入去聲，其餘派入陽平':
        if (is`心生書影曉母 或 次清`) 聲調 = '4';
        else if (is`全清`) 聲調 = '2';
        break;
      case '次清和零聲母字派入去聲，其餘派入陽平':
        if (is`影母 或 次清`) 聲調 = '4';
        else if (is`全清`) 聲調 = '2';
        break;
      case '連同濁聲母，所有入聲字皆派入去聲':
        聲調 = '4';
        break;
    }
  }
}

// j、q、x 聲母
if (韻母 === 'er' || ['i', 'ü'].includes(韻母[0])) {
  聲母 = { g: 'j', k: 'q', h: 'x' }[聲母] ?? 聲母;
  if (韻母 !== 'er') 聲母 = { z: 'j', c: 'q', s: 'x' }[聲母] ?? 聲母;
}

// er
if (韻母 === 'er') {
  if (聲母 === 'r') 聲母 = '';
  else 韻母 = 'i';
}

// 以下音節系統性地作開口而非合口
if (['n', 'l'].includes(聲母) && ['ua', 'uai', 'uang', 'uei'].includes(韻母)) 韻母 = 韻母.slice(1);
// 以下音節系統性地作合口而非撮口
if (韻母[0] === 'ü' && ['n', 'l'].includes(聲母) && !['ü', 'üe'].includes(韻母)) {
  韻母 = 'u' + (韻母[1] === 'n' ? 'e' : '') + 韻母.slice(1);
}

// 以下音節系統性地作洪音而非細音
if (['zh', 'ch', 'sh', 'r', 'f', 'w'].includes(聲母)) {
  if (韻母 === 'i') {
    if (聲母 === 'f' || 聲母 === 'w') 韻母 = 'ei';
  } else if (韻母[0] === 'i' || 韻母[0] === 'ü') {
    韻母 = (韻母[0] === 'ü' ? 'u' : '') + (韻母[1] === 'n' ? 'e' : '') + 韻母.slice(1);
    if (韻母 === 'ue') 韻母 = 'uo';
    else if (韻母 === 'e' && ['f', 'w'].includes(聲母)) 韻母 = 'o';
  }
}

// 以下音節系統性地作開口而非合口
if (['b', 'p', 'm', 'f', 'w'].includes(聲母) && 韻母[0] === 'u' && 韻母[1]) 韻母 = 韻母.slice(1);

// 拼音拼寫規則
if (!聲母) {
  if (韻母[0] === 'i' || 韻母[0] === 'ü') 聲母 = 'y';
  if (韻母[0] === 'u') 聲母 = 'w';
  if (聲母 && 韻母[0] !== 'ü' && 韻母[1] && 韻母[1] !== 'n') 韻母 = 韻母.slice(1);
}
韻母 = { iou: 'iu', uei: 'ui', uen: 'un', ueng: 'ong' }[韻母] || 韻母;
if (韻母[0] === 'ü' && !['n', 'l'].includes(聲母)) 韻母 = 'u' + 韻母.slice(1);

if (選項.標調方式 === '數字') return 聲母 + 韻母 + 聲調;
return 聲母 + (聲調 ? 韻母.replace(/.*a|.*[eo]|.*[iuü]/, '$&' + ' ̄́̌̀'[聲調]) : 韻母);
