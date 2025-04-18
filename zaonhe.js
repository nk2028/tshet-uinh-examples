/* 推導上海話
 *
 * https://zhuanlan.zhihu.com/p/386456940
 *
 * ——適改「上海市区方言志」音系
 *
 * 在墶「上海市区方言志」個基礎上向增加着一些理論白讀層搭着理論文讀層（參考「上海土白集字」），但是確保至少一個層次是「上海市区方言志」音系。
 * 提供了一些選項，其中「上海市区方言志」弗分尖團、弗分衣煙、弗分來蘭、弗分襪麥、弗分打黨、弗分肉月。
 *
 * @author Nyoeghau
 */

/** @type { 音韻地位['屬於'] } */
const is = (...x) => 音韻地位.屬於(...x);
/** @type { 音韻地位['判斷'] } */
const when = (...x) => 音韻地位.判斷(...x);

if (!音韻地位)
  return [
    ['文白讀', [4, '文上白下', '僅白讀', '僅文讀', '主流層']],
    ['標調方式', [3, '數字調值', '折線', '附標', '八調序號', '弗標']],
    ['分尖團', [1, '分尖團', '區分⟨情､琴⟩', '區分⟨徐､齊⟩']],
    ['分衣煙|區分⟨衣､煙⟩', true],
    ['分來蘭|區分⟨來､蘭⟩', true],
    ['分袜麦|區分⟨袜､麦⟩', true],
    ['分打黨|區分⟨打､黨⟩', true],
    ['分肉月|區分⟨肉､月⟩', true],
    ['分國骨|區分⟨國､骨⟩', true],
    ['分于園|區分⟨于､園⟩', true],
    ['分干官|區分⟨干､官⟩', true],
    ['分困孔|區分⟨困､孔⟩', true],
    ['分羣窮|區分⟨羣､窮⟩', true],
  ];

const 元音 = 'iyɨʉɯuɪʏʊeøɘɵɤoəɛœɜɞʌɔæɐaɶäɑɒ';
const 元音Re = new RegExp('[' + 元音 + ']');
const 閉前元音 = 'iyɪʏ';
const 元音附標 = '̃̈';
const 顎化分尖團 = {
  n: 'ɲ',
  k: 'tɕ',
  kʰ: 'tɕʰ',
  h: 'ɕ',
  ŋ: 'ɲ',
  g: 'dʑ',
};
const 顎化分情琴 = {
  ts: 'tɕ',
  tsʰ: 'tɕʰ',
  s: 'ɕ',
  z: 'ʑ',
};
const 顎化弗分尖團 = {
  ʑ: 'dʑ',
};
const 數字標調 = {
  陰平: '⁵³',
  陰去: '³³⁴',
  陽去: '²³',
  陰入: '⁵⁵',
  陽入: '¹²',
};
const 折線標調 = {
  陰平: '˥˧',
  陰去: '˧˧˦',
  陽去: '˨˧',
  陰入: '˥',
  陽入: '˩˨',
};
const 附標標調 = {
  陰平: '᷇',
  陰去: '̄',
  陽去: '̌',
  陰入: '̋',
  陽入: '᷅',
};
const 序號標調 = {
  陰平: '¹',
  陰去: '⁵',
  陽去: '⁶',
  陰入: '⁷',
  陽入: '⁸',
};

function 聲母規則(文讀) {
  let 聲母 = when([
    // 顎化規則由獨立個 function 來做
    // '▽' 標識弗是主流層
    // 表一（of「上海市区方言志」）
    ['幫滂母 C類', 'f'], // 理論白讀 /p/
    ['並母 C類', 文讀 ? 'v' : '▽▽b'], // 「防」等
    ['明母 C類 非 通流攝', 文讀 ? 'v' : '▽▽m'], // 「蚊」等
    ['幫母', 'p'], ['滂母', 'pʰ'], ['並母', 'b'], ['明母', 'm'],
    // 表二
    ['端母', 't'], ['透母', 'tʰ'], ['定母', 'd'], ['泥孃母', 'n'], ['來母', 'l'],
    // 表四
    ['見母', 'k'], ['溪母', 'kʰ'], ['曉母', 'h'], ['羣母', 'g'], [!文讀 && '日母', 'n'],
    // 表五
    ['日母 止攝 開口', '▽▽ɦ'],
    ['疑母', [
      ['遇攝 一等 上聲', 文讀 ? '▽▽ʔ' : 'ŋ'], // 「五」。表中無
      ['合口 麻泰歌韻 或 開合中立 非 侯韻', 文讀 ? '▽▽ɦ' : 'ŋ'], // 「外」「瓦」「臥」。「吾」等
      ['合口', 文讀 ? 'ɦ' : '▽▽ŋ'], // 「魏」等
      [文讀 && '二三四等', '▽▽ɦ'], // 「言」等
      ['', 'ŋ'],
    ]],
    ['以母 脂韻 合口', 'v'], // 表中無
    // ['以母 上聲 通攝', 'ʔ'], // 似無規律。弗收
    // ['以苡已勇蛹涌恿甬俑踊慂𧻹悀埇𧗴'.includes(字頭) && '以母 上聲', 'ʔ'],
    ['云母 上去聲 梗攝', 'ʔ'], // 表中無
    ['匣云以母', 'ɦ'],
    ['影母', 'ʔ'],
    // 表三
    ['精知莊章母', 'ts'], ['清徹初昌母', 'tsʰ'], ['心生書母', 's'], ['從邪澄崇俟常船日母', 'z'],
  ], '無聲母規則');
  return 聲母;
}

function 韻母規則(文讀) {
  let 韻母 = when([
    // 特殊韻母
    [!文讀 && '無嘸无呒'.includes(字頭), '̩'],
    [!文讀 && '畝𠭇畮畞亩'.includes(字頭), '̩'],
    [!文讀 && '魚鱼'.includes(字頭), '̩'],
    [!文讀 && '吳吴'.includes(字頭), '̩'],
    [!文讀 && '疑母 模韻 上聲', '̩'], // 「五」「午」

    ['通攝 舒聲', [
      ['三等 (孃疑母 或 喉音)', 'ioŋ'],
      ['三等 牙音', 文讀 ? 'oŋ' : 'ioŋ▽'], // 「龔」等
      ['三等 日母', 文讀 ? 'oŋ▽' : 'ioŋ'], // 「茸」等
      ['', 'oŋ'], // 脣音白讀僅「夢」。待考
    ]],
    ['通攝 入聲', [
      ['三等 (孃母 或 牙喉音)', 'ioʔ'],
      ['三等 日母', 文讀 ? 'oʔ▽' : 'ioʔ'], // 「肉」等
      ['', 'oʔ'],
    ]],
    ['江攝 舒聲', [
      [文讀 && '牙音', 'iã▽'], // 「江」等
      ['', 'ɑ̃'],
    ]],
    ['江攝 入聲', [
      // [文讀 && '牙音 非 疑母', 'ioʔ▽'], // 「確」等。箇個同「上海市区方言志」音系
      [文讀 && '牙喉音', 'iɑʔ▽'], // 「確」等。箇個同「上海土白集字」音系。「樂」等。疑母文讀同匣母。「學」等
      ['', 'oʔ'],
    ]],
    ['止攝', [
      [文讀 && '開口 日母', 'əɭ'],
      ['開口 (端組 或 來孃日母)', 'i'],
      ['開口 舌齒音', 'z̩'],
      ['開口 或 脣音', 'i'],
      ['合口 以母 脂韻', 'i'],
      ['合口 來孃母', 'e'],
      ['合口 日母', 文讀 ? 'ø' : 'y▽'], // 「蕊」
      ['合口 舌齒音', 文讀 ? 'ø' : 'z̩▽'], // 「吹」等
      [!文讀 && '合口 牙音 非 疑母', 'y▽'], // 「跪」等
      ['合口', 'ue'],
    ]],
    ['遇攝', [
      [!文讀 && '魚韻 (來孃日母 或 精組)', 'i▽'], // 「呂」等。「女」（老派）。日母白讀類推無實例。「絮」等
      [!文讀 && '魚韻 莊組', 'z̩▽'], // 「鋤」等
      [!文讀 && '三等 日母', 'y▽'], // 白讀類推無實例
      ['三等 莊組', 'u'],
      ['C類 脣音', 'u'],
      ['三等 舌齒音 非 精組 非 來孃母', 'z̩'],
      ['三等', 'y'], // 牙喉音白讀 /e/「許」「鋸」。白讀 /i/「去」「渠」。屬於特殊存古，且弗唯一，故弗用
      ['一等', 'u'],
    ]],
    ['蟹攝', [
      [!文讀 && '三等 合口 日母', 'i▽'], // 白讀類推無實例
      ['三四等 合口 舌齒音', 'ø'],
      ['三四等 合口', 'ue'],
      ['莊組 開口', 'a'],
      ['三等 舌齒音 非 精組 非 來母', 'z̩'],
      ['三四等', 'i'],
      ['二等 開口 匣母', 文讀 ? 'ie' : 'a▽'], // 「械」等。理論上還有 /ia/ 個白讀
      ['二等 開口 牙喉音', 文讀 ? 'ia' : 'a▽'], // 「解」等
      ['二等 合口 疑母', 文讀 ? 'ue' : 'a▽'], // 字典弗曾收「聵」
      ['二等 合口 牙喉音', 文讀 ? 'ua' : 'o▽'], // 「卦」等
      ['二等 合口 舌齒音', 'ø'],
      ['二等', 'a'],
      ['泰韻 開口 舌齒音', 'a'],
      ['泰韻 合口 疑母', 文讀 ? 'ue▽' : 'a'], // 「外」
      ['一等 合口 精組', 'ø'],
      ['一等 合口 牙喉音', 'ue'],
      ['一等', 'e'],
    ]],
    ['臻攝 舒聲', [
      [文讀 && '三等 日母', 'əŋ▽'], // 「人」「閏」等
      ['三等 開口 知章莊組', 'əŋ'],
      ['C類 脣音', 'əŋ'],
      ['三等 (開口 或 脣音)', 'ɪɲ'],
      ['三等 合口 精組 或 日母', 'ɪɲ'],
      ['三等 合口 舌齒音', 'əŋ'],
      ['三等 合口', 'yɪɲ'],
      [!文讀 && '一等 合口 疑母', 'əŋ▽'], // 「諢」。白讀類推無實例
      ['一等 合口 牙喉音', 'uəŋ'],
      ['一等', 'əŋ'],
    ]],
    ['臻攝 入聲', [
      [文讀 && '三等 日母', 'əʔ▽'], // 「日」等
      ['三等 開口 知章莊組', 'əʔ'],
      ['C類 脣音', 'əʔ'],
      ['三等 (開口 或 脣音)', 'iɪʔ'],
      ['三等 合口 (精組 或 來母)', 'iɪʔ'],
      ['三等 合口 舌齒音', 'əʔ'],
      ['三等 合口', 'yɪʔ'],
      ['一等 合口 疑母', 文讀 ? 'uəʔ▽' : 'əʔ'], // 「兀」
      ['一等 合口 牙喉音', 'uəʔ'],
      ['一等', 'əʔ'],
    ]],
    ['山攝 舒聲', [
      ['三等 開口 知章組', 'ø'],
      ['三等 開口 日母', 文讀 ? 'ø' : 'iɪ▽'], // 「燃」等
      ['C類 脣音', 'æ'],
      ['三四等 (開口 或 脣音)', 'iɪ'],
      ['三等 合口 日母', 文讀 ? 'ø▽' : 'yø'], // 「軟」等
      ['三四等 合口 (精組 或 來母)', 'iɪ'], // 白讀 /æ/ 或 /ø/ 只有「全」特殊存古。故弗列
      ['三四等 合口 舌齒音', 'ø'],
      ['三四等 合口', 'yø'],
      [文讀 && '二等 開口 牙喉音', 'iɪ▽'], // 「間」等
      ['二等 合口 牙喉音', 'uæ'],
      ['二等 合口 舌齒音', 'ø'],
      ['二等', 'æ'],
      ['一等 開口 舌齒音', 'æ'],
      ['一等 合口 牙喉音', 'uø'],
      ['一等', 'ø'],
    ]],
    ['山攝 入聲', [
      ['三等 知莊章組', 'əʔ'],
      [文讀 && '三等 日母', 'əʔ▽'], // 「熱」「爇」等
      ['C類 脣音', 'ɐʔ'],
      ['三四等 (開口 或 脣音)', 'iɪʔ'],
      ['三四等 合口 舌齒音', 'iɪʔ'],
      ['三四等 合口', 'yɪʔ'],
      [文讀 && '二等 開口 疑匣母', 'iɐʔ▽'], // 「齾」。「轄」
      ['二等 開口 舌齒音 日母', 文讀 ? 'əʔ▽' : 'iɪʔ'], // 字典弗曾收「𩭿」
      ['二等 合口 牙喉音 疑母', 文讀 ? 'uɐʔ▽' : 'ɐʔ'], // 字典弗曾收「刖」
      ['二等 合口 牙喉音', 'uɐʔ'],
      ['二等 合口 舌齒音', 'əʔ'],
      ['二等', 'ɐʔ'],
      ['一等 開口 舌齒音', 'ɐʔ'],
      ['一等 合口 牙喉音 見曉影母', 'uɐʔ'],
      ['一等 合口 牙喉音 疑母', 文讀 ? 'uəʔ▽' : 'əʔ'], // 字典弗曾收「枂」
      ['一等 合口 牙喉音', 'uəʔ'],
      ['一等', 'əʔ'],
    ]],
    ['效攝', [
      [文讀 && '二等 牙喉音', 'iɔ▽'], // 「交」等
      ['三四等 非 知章組', 'iɔ'],
      ['', 'ɔ'],
    ]],
    ['果攝', [
      [!文讀 && '一等 開口 (端組 或 喉音)', 'a▽'], // 「大」「何」等
      ['一等 或 三等 脣音', 'u'], // 「縛」
      ['開口', 文讀 ? 'ia▽' : 'a'], // 「茄」等
      ['合口', 文讀 ? 'ia▽' : 'io'], // 「瘸」等
    ]],
    ['假攝', [
      [文讀 && '二等 牙喉音 合口', 'ua▽'], // 「花」等。脆麻花～
      [文讀 && '二等 牙喉音', 'ia▽'], // 「下」等
      [文讀 && '二等', 'a▽'], // 「馬」「差」等
      ['二等 開口 牙音', 'a'], // 「家」等
      ['二等', 'o'],
      [文讀 && '牙喉音', 'ie▽'], // 「也」等
      [文讀 && '脣音 或 端精組', 'i▽'], // 「乜」。「姐」等
      ['舌齒音 日母', 文讀 ? 'a' : 'ia▽'], // 「惹」等
      ['舌齒音 章組', 文讀 ? 'o' : 'a▽'], // 「射」等
      ['', 'ia'],
    ]],
    ['宕攝 舒聲', [
      ['三等 日母', 文讀 ? 'ɑ̃▽' : 'iã'], // 「壤」等
      ['三等 (精組 或 來孃母)', 'iã'],
      ['三等 知組', 'ã'],
      ['三等 (舌齒音 或 C類 脣音)', 'ɑ̃'],
      ['三等 (開口 或 脣音)', 'iã'],
      [!文讀 && '三等 合口 云母', 'iã▽'], // 「旺」等
      ['三等 合口', 'uɑ̃'],
      ['一等 合口 牙喉音', 'uɑ̃'],
      ['一等', 'ɑ̃'],
    ]],
    ['宕攝 入聲', [
      ['三等 日母', 文讀 ? 'ɑʔ' : 'iɑʔ▽'], // 「箬」等
      ['三等 (精組 或 來孃母)', 'iɑʔ'],
      ['三等 (莊組 或 C類 脣音)', 'oʔ'],
      ['三等 舌齒音', 'ɑʔ'],
      ['三等 (開口 或 脣音)', 'iɑʔ'],
      ['三等 合口 牙喉音', 'ioʔ'],
      ['一等', 'oʔ'],
    ]],
    ['梗攝 舒聲', [
      ['三四等 知章組', 文讀 ? 'əŋ' : 'ã▽'], // 「聲」「省」等
      [!文讀 && '三四等 開口 牙喉音', 'iã▽'], // 「映」等
      ['三四等 合口 牙喉音', 'ioŋ'], // 有異讀 /ɪɲ/
      ['三四等 非 莊組', 'ɪɲ'],
      ['耕韻 開口 牙喉音', 文讀 ? 'ɪɲ' : 'ã▽'], // 「櫻」等
      ['耕韻 合口 喉音', 'oŋ'],
      ['二等 合口 牙喉音', 'uɑ̃'],
      ['二等 或 莊組', 文讀 ? 'əŋ▽' : 'ã'], // 「萌」「猛」「爭」「澄」「更」等
    ]],
    ['梗攝 入聲', [
      ['三四等 知章組', 文讀 ? 'əʔ▽' : 'ɑʔ'], // 「適」等
      ['三四等 合口 牙喉音', 'ioʔ'],
      ['三四等', 'iɪʔ'],
      ['二等 合口 牙喉音', 'oʔ'],
      ['二等', 文讀 ? 'əʔ▽' : 'ɑʔ'], // 「脈」「白」「革」「客」「責」「澤」等。「脈」「白」「客」收於「上海土白集字」
    ]],
    ['曾攝 舒聲', [
      [文讀 && '三等 日母', 'əŋ▽'], // 「仍」等
      ['三等 舌齒音 非 來日母', 文讀 ? 'əŋ' : 'ã▽'], // 「剩」等
      ['三等', 'ɪɲ'],
      ['一等 明母', 文讀 ? 'oŋ' : 'ɑ̃▽'], // 「懵」
      ['一等 脣音', 文讀 ? 'əŋ▽' : 'ã'], // 「崩」等
      ['一等 開口', 'əŋ'], // 無白讀例
      ['一等 合口', 'oŋ'],
    ]],
    ['曾攝 入聲', [
      [文讀 && '三等 日母', 'əʔ▽'], // 「仍」等
      ['三等 舌齒音 非 精組 非 來孃日母', 'əʔ'],
      ['三等 合口', 'ioʔ'],
      ['三等', 'iɪʔ'],
      ['一等 明母', 'əʔ'],
      ['一等 脣音', 'oʔ'],
      ['一等 開口', 'əʔ'],
      ['一等 合口', 'oʔ'],
    ]],
    ['流攝', [
      ['幽韻 明母', 文讀 ? 'iɤ▽' : 'iɔ'], // 「繆」等。白讀地位實不對應
      ['幽韻 脣音', 'iɔ'], // 地位實不對應
      ['三等 日母', 文讀 ? 'ɤ' : 'iɤ▽'], // 「柔」等
      ['三等 舌齒音 非 精組 非 來孃母', 'ɤ'],
      ['三等 C類 脣音 去聲', 'u'],
      ['三等 C類 脣音', 'ɤ'],
      ['三等', 'iɤ'],
      ['一等', 'ɤ'],
    ]],
    ['深攝 舒聲', [
      ['日母', 文讀 ? 'əŋ' : 'ɪɲ▽'], // 「任」等
      ['舌齒音 非 精組 非 來孃母', 'əŋ'],
      ['', 'ɪɲ'],
    ]],
    ['深攝 入聲', [
      ['日母', 文讀 ? 'əʔ' : 'iɪʔ▽'], // 「入」等
      ['舌齒音 非 精組 非 來孃母', 'əʔ'],
      ['', 'iɪʔ'],
    ]],
    ['咸攝 舒聲', [
      ['三等 日母', 文讀 ? 'ø' : 'iɪ▽'], // 「染」等
      ['三等 舌齒音 非 來孃母 非 精組', 'ø'],
      ['C類 脣音', 'æ'],
      ['三四等', 'iɪ'],
      ['二等 孃母', 'ø'], // 地位實不對應。「喃」
      ['二等 來母', 'iɪ'], // 地位實不對應。「臉」
      [文讀 && '二等 牙喉音', 'iɪ▽'], // 「減」等
      ['二等', 'æ'],
      ['覃韻 端定來溪母', 'æ'], // 也有讀 /ø/ 個口音，但是弗在「上海市區方言志」
      ['談韻 舌齒音', 'æ'],
      ['一等', 'ø'],
    ]],
    ['咸攝 入聲', [
      ['三等 日母', 文讀 ? 'əʔ▽' : 'iɪʔ'], // 無文讀例
      ['三等 舌齒音 非 來孃母 非 精組', 'əʔ'],
      ['C類 脣音', 'ɐʔ'],
      ['三四等', 'iɪʔ'],
      [文讀 && '二等 牙喉音', 'iɐʔ▽'], // 「甲」等
      ['二等', 'ɐʔ'],
      ['覃韻 舌齒音', 文讀 ? 'əʔ▽' : 'ɐʔ'], // 「答」等
      ['談韻 舌齒音', 'ɐʔ'],
      ['一等', 'əʔ'],
    ]],
  ], '無韻母規則');

  let is主流層 = !韻母.includes('▽');
  韻母 = 韻母.replace('▽', '');
  韻母 = {
    'iɪ': !選項.分衣煙 && 'i',
    'æ': !選項.分來蘭 && 'e',
    'uæ': !選項.分來蘭 && 'ue',
    'ɑʔ': !選項.分袜麦 && 'ɐʔ',
    'iɑʔ': !選項.分袜麦 && 'iɐʔ',
    'ã': !選項.分打黨 && 'ɑ̃',
    'iã': !選項.分打黨 && 'iɑ̃',
    'ioʔ': !選項.分肉月 && 'yɪʔ',
    'uəʔ': !選項.分國骨 && 'oʔ',
    'yø': !選項.分于園 && 'y',
    'io': !選項.分于園 && 'y',
    'uø': !選項.分干官 && 'ø',
    'uəŋ': !選項.分困孔 && 'oŋ',
    'yɪɲ': !選項.分羣窮 && 'ioŋ',
  }[韻母] || 韻母;
  if (!is主流層) 韻母 += '▽';
  return 韻母;
}

function 顎化規則(音節) {
  const match = 元音Re.exec(音節);
  if (match !== null) {
    if (閉前元音.includes(match[0])) {
      for (let 聲母 in 顎化分尖團) 音節 = 音節.replace(聲母, 顎化分尖團[聲母]);
      if (選項.分尖團 !== '分尖團') {
        for (let 聲母 in 顎化分情琴)
          音節 = 音節.replace(聲母, 顎化分情琴[聲母]);
      }
      if (選項.分尖團 === '區分⟨徐､齊⟩') {
        if (is`從崇常母`) {
          for (let 聲母 in 顎化弗分尖團)
            音節 = 音節.replace(聲母, 顎化弗分尖團[聲母]);
        }
      }
    }
  }
  return 音節;
}

function 主流層選擇規則(音們) {
  let 音們_非主流度們 = [];
  音們.forEach(音 => {
    音們_非主流度們.push({ 音, 非主流度: (音.match(/▽/g) || []).length });
  });
  return 音們_非主流度們.reduce((prev, curr) => {
    return prev.非主流度 < curr.非主流度 ? prev : curr;
  }).音;
}

function 聲調規則(音節) {
  const 聲調 = when([
    ['云母 上去聲 梗攝', '陰去'], // 由於聲母例外
    // ['以母 上聲 通攝', '陰去'], // 由於聲母例外
    ['疑母 上聲 模韻', '陰去'],
    ['全清 或 次清', [['平聲', '陰平'], ['上去聲', '陰去'], ['入聲', '陰入']]],
    ['全濁 或 次濁', [['舒聲', '陽去'], ['入聲', '陽入']]],
  ], '無聲調規則');

  if (選項.標調方式 === '附標') {
    let 標調位置;
    const match = 元音Re.exec(音節);
    if (match !== null) {
      標調位置 = match.index;
      if (元音.includes(音節[標調位置 + 1])) 標調位置 += 1; // 弗要標在介音上
      if (元音附標.includes(音節[標調位置 + 1])) 標調位置 += 1; // 弗要標在附標下頭
    } else {
      標調位置 = 音節.indexOf('̩');
    }
    標調位置 += 1;
    return 音節.slice(0, 標調位置) + 附標標調[聲調] + 音節.slice(標調位置);
  } else if (選項.標調方式 === '數字調值') {
    return 音節 + 數字標調[聲調];
  } else if (選項.標調方式 === '折線') {
    return 音節 + 折線標調[聲調];
  } else if (選項.標調方式 === '八調序號') {
    return 音節 + 序號標調[聲調];
  } else {
    return 音節;
  }
}

function finalise(音節) {
  音節 = 音節.replace(/▽/g, '');
  音節 = 顎化規則(音節);
  音節 = 聲調規則(音節);
  return 音節;
}

let 文讀聲母 = 聲母規則(true);
let 白讀聲母 = 聲母規則(false);

let 文讀韻母 = 韻母規則(true);
let 白讀韻母 = 韻母規則(false);

let 文讀音 = 文讀聲母 + 文讀韻母;
let 白讀音 = 白讀聲母 + 白讀韻母;

let 結果;
if (選項.文白讀 === '主流層') {
  結果 = 主流層選擇規則([文讀音, 白讀音]);
  結果 = finalise(結果);
} else {
  if (選項.文白讀 === '僅白讀') 結果 = finalise(白讀音);
  else if (選項.文白讀 === '僅文讀') 結果 = finalise(文讀音);
  else if (文讀音 === 白讀音) 結果 = finalise(文讀音);
  else 結果 = finalise(文讀音) + '\n' + finalise(白讀音);
}

return 結果;
