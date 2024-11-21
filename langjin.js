/* 推導南京話
 *
 * https://zhuanlan.zhihu.com/p/391166351
 *
 * 中古音與南京音的對應表：https://github.com/uliloewi/lang2jin1/blob/master/Guangyun_Langjin_pulish_Alphabetic.2.0.csv
 * 南京音本是清末以前標準官話的基礎音系，和中古音有嚴格的對應關係，故有上表。本程序展示此對應關係。
 * 南京話拼音方案：https://zh.wikipedia.org/wiki/%E5%8D%97%E4%BA%AC%E8%A9%B1%E6%8B%89%E4%B8%81%E5%8C%96%E6%96%B9%E6%A1%88#%E8%BC%B8%E5%85%A5%E6%B3%95%E6%96%B9%E6%A1%88
 *
 * @author uliloewi
 */

/** @type { 音韻地位['屬於'] } */
const is = (x) => 音韻地位.屬於(x);
/** @type { 音韻地位['判斷'] } */
const when = (...x) => 音韻地位.判斷(...x);

if (!音韻地位) return [
  ['$legacy', true],
  ['標調方式', [1, '數字', '附標']],
];

const 次序標調 = {
  '陰平': '¹',
  '陽平': '²',
  '上聲': '³',
  '去聲': '⁴',
  '入聲': '⁵',
};
const 附標標調 = {
  '陰平': '̄',
  '陽平': '́',
  '上聲': '̌',
  '去聲': '̀',
  '入聲': '̂',
};

let 真韻 = '真';
let 殷韻 = '殷';
let 重紐 = '';
let 丙類 = 'C類';

if (window.location.href.includes('qieyun'))
{//舊版
  真韻 = '眞';
  殷韻 = '欣';
  重紐 = '重紐';
  丙類 = '東韻 三等 或 鍾微虞廢文元陽尤凡韻';
}

const 不顎化 = { // 見溪羣曉匣母不顎化條件
  一: true,
  二: '合口 或 庚耕韻',
  三: '(合口 祭微陽支脂凡廢韻 或 通攝) 舒聲',
  四: '合口 齊韻',
}[音韻地位.等];

const 南京型莊組變翹 = '宕假效江攝 或 止攝 合口 或 蟹咸山攝 二等'

const 聲母規則 = () => when([
  ['幫母', [[丙類, 'f'], ['', 'b']]],
  ['滂母', [[丙類, 'f'], ['', 'p']]],
  ['並母', [[丙類, 'f'], ['平聲', 'p'], ['', 'b']]],
  ['明母', [['東尤韻', 'm'], [丙類, ''], ['', 'm']]],
  ['端母', 'd'],
  ['透母', 't'],
  ['定母', [['平聲', 't'], ['', 'd']]],
  ['泥來孃母', 'l'],
  ['精母', 'z'],
  ['清母', 'c'],
  ['從母', [['二等', 'ch'], ['平聲', 'c'], ['', 'z']]], // 平送氣仄不送氣
  ['心母', 's'],
  ['邪母', [['平聲 尤之陽鹽侵魚韻', 'c'], ['', 's']]],
  ['知母', [['麻韻 三等', 'd'], ['庚耕韻', 'z'], ['', 'zh']]], // 知組平翹律
  ['徹母', [['庚耕韻', 'c'], ['', 'ch']]], // 知組平翹律
  ['澄母', [['庚耕韻 平聲', 'c'], ['庚耕韻 ', 'z'], ['平聲', 'ch'], ['', 'zh']]], // 平送氣仄不送氣
  ['莊母', [[南京型莊組變翹, 'zh'], ['', 'z']]], // 莊組平翹律
  ['初母', [[南京型莊組變翹, 'ch'], ['', 'c']]], // 莊組平翹律
  ['崇母', [
    [南京型莊組變翹, [['平聲', 'ch'], ['', 'zh']]],
    ['之韻', 's'], 
    ['平聲', 'c'], 
    ['', 'z']
  ]],
  ['生母', [[南京型莊組變翹, 'sh'], ['', 's']]], // 莊組平翹律
  ['俟母', [['平聲', 'c'], ['', 's']]], // 平送氣仄不送氣
  ['章母', 'zh'],
  ['昌母', 'ch'],
  ['常母', [['曾攝 入聲', 'zh'], [真韻 + '齊侵清仙鹽陽尤魚虞蒸支鍾韻 平聲 或 一等', 'ch'], ['', 'sh']]],
  ['船書母', [['平聲 通攝 或 平聲 合口 山攝', 'ch'], ['', 'sh']]], // 章組擦音分化律
  ['日母', [['四等', 'l'], [真韻 + '侵韻 入聲 或 支之脂韻 開口', ''], ['', 'r']]],
  ['見母', [[不顎化, 'g'], ['', 'j']]],
  ['溪母', [[不顎化, 'k'], ['', 'q']]],
  ['羣母', [
    [重紐 + 'A類 宵韻', 'q'], 
    ['平聲 三等 合口 山陽脂韻','k'], 
    ['平聲','q'], [不顎化, 'g'], 
    ['', 'j']
  ]],
  ['疑母', [['之韻 上聲', 'l'], ['一二等', ''], ['尤蒸齊韻 平聲 或 先仙陽庚韻 入聲', 'l'], ['', '']]],
  ['曉母', [['三等 通攝', 'x'], [不顎化, 'h'], ['', 'x']]],
  ['匣母', [['開口 耕韻 舒聲', 'x'], [不顎化, 'h'], ['', 'x']]], 
  ['以母', [['合口 祭韻', 'r'], ['', '']]],
  ['影母', ''],
  ['云母', [['舒聲 通攝', 'x'], ['', '']]],
], '無聲母規則');

const 韻母規則 = () => when([
  // 通攝
  ['東韻 入聲', [['三等 見溪羣曉匣疑以影云母', 'ü'], ['', 'u']]], 
  ['東韻 舒聲', [['三等 疑以影母', 'iong'], ['幫組', 'en'], ['', 'ong']]],
  ['冬韻', [['入聲', 'u'], ['幫組', 'en'], ['', 'ong']]],
  ['鍾韻 舒聲', [['疑以影母', 'iong'], ['幫組', 'en'], ['', 'ong']]],
  ['鍾韻 入聲', [['見溪羣曉匣疑以影云母', 'ü'], ['', 'u']]],

  // 江攝
  ['江韻', [
    ['入聲', [
      ['疑母', 'io'], ['', 'o']
    ]], 
    ['徹澄崇初生知母', 'uang'], 
    ['疑母', 'iang'], 
    ['', 'ang'],
  ]],

  // 止攝
  

  ['止攝', [
    [重紐 + 'B類 支韻 幫母 或 ' + 
      重紐 + 'B類 支韻 並母 上去聲 或 ' + 
      重紐 + 'B類 脂韻 並滂母 或 ' + 
      重紐 + 'B類 脂韻 幫母 平聲', 
      'ei'],
    ['日母 開口', 'er'],
    ['崇初從精清生俟邪心莊母 開口', 'y'],//南京型平翹
    ['昌常徹澄船書章知母 開口', 'r'],//南京型平翹
    ['莊組 合口', 'uä'],
    ['幫並滂母 非 微韻 或 開口 或 支韻 明母', 'i'],
    ['脂韻 明母 或 微韻 幫並滂母', 'ei'],
    ['', 'uei'],
  ]],

  // 遇攝
  ['模韻', [
    ['明母', 'o'], 
    ['', 'u']
  ]],
  ['魚虞韻', [
    ['從見精來孃清羣溪曉邪心疑以影云母', 'ü'], 
    ['', 'u']
  ]],

  // 蟹攝
  ['齊韻', [
    ['合口 或 常母', 'uei'], 
    ['', 'i']
  ]], 
  ['祭韻 明母', 'ei'],
  ['廢祭灰韻 合口', 'uei'], 
  ['廢韻 幫組', 'ei'],
  ['祭韻 幫組', 'i'],
  ['廢祭韻 開口', [
    ['章知組', 'r'], 
    ['莊組', 'y'], 
    ['', 'i']]], 
  ['佳韻 合口', [
    ['見溪匣曉影母', 'ua'], 
    ['', 'uä']
  ]],
  ['皆夬韻 合口', 'uä'],
  ['佳皆夬韻 幫組', 'ä'],
  ['佳皆夬韻 開口', [
    ['疑母', 'iä'], 
    ['', 'ä']
  ]],
  ['灰廢韻 幫組', 'ei'],
  ['灰韻 開口', [
    ['以母', 'iä'], 
    ['', 'ä']
  ]], 
  ['咍韻', [
    ['合口', 'uei'], 
    ['以母', 'iä'], 
    ['', 'ä']
  ]],
  ['泰韻 合口', 'uei'], 
  ['泰韻 幫組', 'ei'],
  ['泰韻 開口', [
    ['以母', 'iä'], 
    ['', 'ä']
  ]], 

  // 臻攝
  ['文韻 入聲 幫組', 'u'],
  [殷韻 + 真韻 + '臻文韻 入聲 合口', [
    ['莊組', 'o'], 
    ['知章組', 'u'], 
    ['', 'ü']
  ]], 
  [殷韻 + 真韻 + '臻文韻 入聲 幫組', 'i'],
  [殷韻 + 真韻 + '臻文韻 入聲 開口', [
    ['莊組', 'ä'], 
    ['章組 或 知徹澄日母', 'r'], 
    ['', 'i']
  ]],
  [殷韻 + 真韻 + '臻文韻 舒聲 開口', [
    ['莊章組 或 日知徹澄母', 'en'], 
    ['', 'in']
  ]],
  [真韻 + '韻 舒聲 幫組', 'in'], 
  [真韻 + '文韻 舒聲 合口', [
    ['明母', 'uen'], 
    ['來日書章知昌常徹澄船母 合口', 'uen'], 
    ['', 'üin']
  ]], 
  [殷韻 + 真韻 + '臻文韻 舒聲 幫組', [
    ['明母', 'uen'], 
    ['', 'en']
  ]], 
  [殷韻 + 真韻 + '臻韻 舒聲 合口', [
    ['幫滂並母', 'en'], 
    ['來明日書章知昌常徹澄船母', 'uen'], 
    ['', 'üin']
  ]],
  ['魂痕韻 入聲', [
    ['幫組 或 開口', 'o'], 
    ['', 'u']
  ]],
  ['魂痕韻 舒聲 幫組', 'en'],
  ['魂痕韻 舒聲 開口', [
    ['端組', 'uen'], 
    ['', 'en']
  ]],
  ['魂痕韻 舒聲 合口', 'uen'],

  // 山攝
  ['先韻 舒聲 合口', 'üän'],
  ['先韻 舒聲 開口 或 先韻 舒聲 幫組', [
    ['崇母', 'uang'], 
    ['見溪羣曉匣母', 'än'], 
    ['', 'iän']
  ]],
  ['元韻 入聲 幫組', [
    ['明母', 'ua'], 
    ['', 'a']
  ]],
  ['元仙先韻 入聲 合口', [
    ['日母 或 知莊章組', 'o'], 
    ['', 'üe']
  ]], 
  ['仙先韻 入聲 幫組', 'ie'],
  ['元仙先韻 入聲 開口', [
    ['日母 或 知莊章組', 'ä'], 
    ['見溪羣曉匣母', 'e'], 
    ['', 'ie']
  ]],
  ['仙韻 舒聲 幫組', 'iän'],
  ['元韻 舒聲 幫組', [
    ['明母', 'uang'], 
    ['', 'ang']
  ]],
  ['元仙韻 舒聲 合口', [
    ['日來母 或 知莊章組', 'uang'], 
    ['', 'üän']
  ]],
  ['元仙韻 舒聲 開口', [
    ['日知徹澄母 或 莊章組', 'ang'], 
    ['見溪羣曉匣母', 'än'], 
    ['', 'iän']
  ]],
  ['刪山韻 入聲', [
    ['合口', 'ua'], 
    ['疑影母', 'ia'], 
    ['', 'a']
  ]],
  ['刪山韻 舒聲 幫組', 'ang'], 
  ['刪山韻 舒聲 開口', [
    ['影疑母', 'iän'], 
    ['見溪羣曉匣母', 'än'],
    ['', 'ang']
  ]],
  ['刪山韻 舒聲 合口', 'uang'],
  ['寒韻 入聲 開口', [
    ['見溪羣曉匣疑影母', 'o'], 
    ['', 'a']
  ]],
  ['寒韻 入聲 幫組', 'o'],
  ['寒韻 入聲 合口', [
    ['見組', 'uä'], 
    ['', 'o']
  ]],
  ['寒韻 舒聲', [
    ['開口 或 幫組', 'ang'], 
    ['', 'uang']
  ]],

  // 效攝
  ['蕭宵韻', [
    ['見溪羣曉匣日母 或 知章組', 'ao'], 
    ['', 'iao']
  ]],
  ['肴韻', [
    ['疑母', 'iao'], 
    ['', 'ao']
  ]],
  ['豪韻', 'ao'],

  // 果攝
  ['歌韻', [
    ['一等', 'o'], 
    ['開口', 'e'], 
    ['', 'üe']
  ]],

  // 假攝
  ['麻韻 二等', [
    ['合口', 'ua'], 
    ['疑影母', 'ia'], 
    ['', 'a']
  ]],
  ['麻韻 三等', [
    ['日母 或 章組', 'e'], 
    ['', 'ie']
  ]],
  ['麻韻 四等', 'ie'],

  // 宕攝
  ['陽韻 入聲', [
    ['心疑以影云來孃母 或 精組', 'io'], 
    ['', 'o']
  ]],
  ['唐陽韻 舒聲 合口', 'uang'],
  ['唐陽韻 舒聲 幫滂並母', 'ang'],
  ['陽韻 舒聲 明母', 'uang'],
  ['陽韻 舒聲 開口', [
    ['來孃疑以影母 或 精組', 'iang'], 
    ['莊組', 'uang'], 
    ['', 'ang']
  ]],
  ['唐韻 入聲', [
    ['合口 見組', 'uä'], 
    ['', 'o']
  ]],
  ['唐韻 舒聲 明母', 'ang'],
  ['唐韻 舒聲 開口', 'ang'],

  // 梗攝
  ['庚韻 入聲 二等', [
    ['合口', 'uä'], 
    ['', 'ä']
  ]],
  ['庚韻 入聲 三等', [
    ['莊組', 'ä'], 
    ['合口', 'ü'], 
    ['', 'i']
  ]],
  ['庚韻 舒聲 二等', [
    ['合口', 'ong'], 
    ['', 'en']
  ]],
  ['庚韻 舒聲 三等 合口', [
    ['心以影母', 'in'], 
    ['云影母', 'iong'], 
    ['', 'ong']
  ]],
  ['庚韻 舒聲 三等 開口', [
    ['知莊章組', 'en'], 
    ['', 'in']
  ]],
  ['庚韻 舒聲 三等 幫組', 'in'],
  ['青韻 舒聲 合口', [
    ['云影母', 'iong'], 
    ['', 'ong']
  ]],
  ['青韻 舒聲 開口', 'in'],
  ['清青韻 入聲 幫組', 'i'], 
  ['清青韻 入聲 合口', 'ü'],
  ['清青韻 入聲 開口', [
    ['莊組', 'y'], 
    ['知章組', 'r'], 
    ['', 'i']
  ]],
  ['清韻 舒聲 合口 心以影母', 'in'],
  ['清韻 舒聲 合口 羣溪曉母', 'ong'],
  ['清韻 舒聲 合口 云影母', 'iong'],
  ['清青韻 舒聲 幫組', 'in'],
  ['清韻 舒聲 開口', [
    ['知莊章組', 'en'], 
    ['', 'in']
  ]],
  ['耕韻 入聲 合口', 'uä'],
  ['耕韻 入聲 開口 或 耕韻 入聲 幫組', 'ä'], 
  ['耕韻 舒聲 幫組', 'en'],
  ['耕韻 舒聲 合口', 'ong'], 
  ['耕韻 舒聲 開口', [
    ['匣影母', 'in'], ['', 'en']
  ]],

  // 曾攝
  ['蒸韻 入聲 幫組', 'i'], 
  ['蒸韻 入聲 合口', 'ü'],
  ['蒸韻 入聲 開口', [
    ['莊組', 'ä'], 
    ['知徹澄母 或 章組', 'r'], 
    ['', 'i']
  ]], 
  ['蒸韻 舒聲 幫組', 'in'], 
  ['蒸韻 舒聲 開口', [
    ['見組 或 來曉以影母', 'in'], 
    ['', 'en']
  ]],
  ['登韻 入聲 幫組', 'ä'], 
  ['登韻 入聲 合口', 'uä'],
  ['登韻 入聲 開口', 'ä'],
  ['登韻 舒聲 幫組', 'en'], 
  ['登蒸韻 舒聲 合口', 'ong'], 
  ['登韻 舒聲 開口', 'en'],

  // 流攝
  ['幽韻', [
    ['幫滂並母', 'iao'], 
    ['見溪羣曉生母', 'ou'], 
    ['', 'iou']
  ]],
  ['尤韻', [
    ['幫滂並母', 'u'], 
    ['精組 或 疑以影云孃來母', 'iou'], 
    ['', 'ou']
  ]],
  ['侯韻', 'ou'],

  // 深攝
  ['侵韻 入聲', [
    ['莊組', 'ä'], 
    ['章組 或 日知徹澄母', 'r'], 
    ['', 'i']
  ]],
  ['侵韻 舒聲', [
    ['章莊組 或 日知徹澄母', 'en'], 
    ['', 'in']
  ]],

  // 咸攝
  ['添韻 入聲', [
    ['見溪羣曉匣母', 'e'], 
    ['', 'ie']
  ]],
  ['添韻 舒聲', [
    ['見溪羣曉匣母', 'än'], 
    ['', 'iän']
  ]],
  ['鹽嚴凡韻 入聲 幫組', 'a'],
  ['鹽嚴凡韻 入聲 合口', [
    ['徹孃母', 'ua'], 
    ['', 'a']
  ]],
  ['鹽嚴凡韻 入聲 開口', [
    ['莊章組 或 日知徹澄母', 'ä'], 
    ['見溪羣曉匣母', 'e'], 
    ['', 'ie']
  ]],
  ['鹽韻 舒聲 幫組', 'iän'],
  ['嚴凡韻 舒聲 幫組', [
    ['明母', 'uang'], 
    ['', 'ang']
  ]],
  ['鹽嚴凡韻 舒聲 合口', 'uang'],
  ['鹽嚴凡韻 舒聲 開口', [
    ['日知徹澄母 或 莊章組', 'ang'], 
    ['見溪羣曉匣母', 'än'], 
    ['', 'iän']
  ]],
  ['咸銜韻 入聲', [
    ['疑影母', 'ia'], 
    ['', 'a']
  ]],
  ['咸銜韻 舒聲', [
    ['來影疑母', 'iän'], 
    ['見溪羣曉匣母', 'än'], 
    ['', 'ang']
  ]],
  ['覃談韻 入聲', [
    ['見組 或 匣曉影母', 'o'], 
    ['', 'a']
  ]], 
  ['覃談韻 舒聲', [
    ['開口 或 幫組', 'ang'], 
    ['', 'uang']
  ]],
], '無韻母規則');

const 聲調規則 = () => when([
  ['平聲', [['清音', '陰平'], ['濁音', '陽平']]],
  ['全濁 上聲', '去聲'],
  ['', `${音韻地位.聲}聲`],
], '無聲調規則');

const 聲母 = 聲母規則();
const 韻母 = 韻母規則();
const 聲調 = 聲調規則();

if (選項.標調方式 === '數字') return 聲母 + 韻母 + 次序標調[聲調];
return 聲母 + (聲調 ? 韻母.replace(/.*[aä]|.*[eo]|.*[iuüyr]/, '$&' + 附標標調[聲調]) : 韻母);
