/* 
 * 推導中派上海閑話
 *
 * ——適改「上海市区方言志」音系
 * 
 * 在墶「上海市区方言志」個基礎上向增加着一些理論白讀層搭着理論文讀層，但是確保至少一個層次是「上海市区方言志」音系。
 * 提供了一些選項，其中「上海市区方言志」弗分尖團、弗分衣煙、弗分來蘭、弗分襪麥、弗分打黨、弗分肉月。
 *
 * @author Nyoeghau
 */

const is = (x) => 音韻地位.屬於(x);

if (!音韻地位) return [
  ['文白讀', [3, '文上白下', '僅白讀', '僅文讀', '主流層']],
  ['標調方式', [3, '數字', '折線', '附標', '弗標']],
  ['分尖團', [1, '分尖團', '區分⟨情､琴⟩', '區分⟨徐､齊⟩']],
  ['區分⟨衣､煙⟩', true],
  ['區分⟨來､蘭⟩', true],
  ['區分⟨袜､麦⟩', true],
  ['區分⟨打､黨⟩', true],
  ['區分⟨肉､月⟩', true],
  ['區分⟨國､骨⟩', true],
  ['區分⟨于､園⟩', true],
  ['區分⟨干､官⟩', true],
  ['區分⟨困､孔⟩', true],
  ['區分⟨羣､窮⟩', true],
];

const 分衣煙 = 選項['區分⟨衣､煙⟩'];
const 分來蘭 = 選項['區分⟨來､蘭⟩'];
const 分袜麦 = 選項['區分⟨袜､麦⟩'];
const 分打黨 = 選項['區分⟨打､黨⟩'];
const 分肉月 = 選項['區分⟨肉､月⟩'];
const 分國骨 = 選項['區分⟨國､骨⟩'];
const 分于園 = 選項['區分⟨于､園⟩'];
const 分干官 = 選項['區分⟨干､官⟩'];
const 分困恐 = 選項['區分⟨困､孔⟩'];
const 分羣窮 = 選項['區分⟨羣､窮⟩'];

const 元音 = 'iyɨʉɯuɪʏʊeøɘɵɤoəɛœɜɞʌɔæɐaɶäɑɒ';
const 元音Re = new RegExp("[" + 元音 + "]");
const 閉前元音 = 'iy';
const 元音附標 = '̃̈';
const 顎化分尖團 = {
  'k': 'tɕ',
  'tsʰ': 'tɕʰ',
  'h': 'ɕ',
  'ŋ': 'ɲ',
  'g': 'dʑ',
};
const 顎化分情琴 = {
  'ts': 'tɕ',
  'tsʰ': 'tɕʰ',
  's': 'ɕ',
  'z': 'ʑ',
};
const 顎化弗分尖團 = {
  'ʑ': 'dʑ',
};
const 數字標調 = {
  '陰平': '⁵³',
  '陰去': '³³⁴',
  '陽去': '²³',
  '陰入': '⁵⁵',
  '陽入': '¹²',
};
const 折線標調 = {
  '陰平': '˥˧',
  '陰去': '꜔꜔꜓',
  '陽去': '˨˧',
  '陰入': '˥',
  '陽入': '˩˨',
};
const 附標標調 = {
  '陰平': '̂',
  '陰去': '̄',
  '陽去': '̀',
  '陰入': '̋',
  '陽入': '̏',
};

function 聲母規則(文讀) {

  // 顎化規則由獨立個 function 來做
  // '▽' 標識弗是主流層
  // 表一（of「上海市区方言志」）
  if (is('幫滂母 東鍾微虞廢文元陽尤凡韻 三等')) return 'f'; // 理論白讀 /p/
  if (is('並母 東鍾微虞廢文元陽尤凡韻 三等')) return 文讀 ? 'v' : '▽▽b'; // 「防」等
  if (is('明母 鍾微虞廢文元陽凡韻')) return 文讀 ? 'v' : '▽▽m'; // 「蚊」等
  if (is('幫母')) return 'p';
  if (is('滂母')) return 'pʰ';
  if (is('並母')) return 'b';
  if (is('明母')) return 'm';
  // 表二
  if (is('端母')) return 't';
  if (is('透母')) return 'tʰ';
  if (is('定母')) return 'd';
  if (is('泥孃母')) return 'n';
  if (is('來母')) return 'l';
  // 表三
  if (is('精知莊章母')) return 'ts';
  if (is('清徹初昌母')) return 'tsʰ';
  if (is('心生書母')) return 's';
  if (is('日母')) return 文讀 ? is('止攝 開口 三等') ? '▽▽ɦ' : 'z' : 'n'; // 止開三部分在表五
  if (is('從邪澄崇俟常船母')) return 'z';
  // 表四
  if (is('見母')) return 'k';
  if (is('溪母')) return 'kʰ';
  if (is('曉母')) return 'h';
  if (is('疑母 開口 二三四等')) return 文讀 ? '▽▽ɦ' : 'ŋ'; // 表五部分
  if (is('疑母 開合中立 二三四等')) return 文讀 ? '▽▽ɦ' : 'ŋ'; // 表五部分
  if (is('疑母 合口 遇果攝 一二等')) return 'ŋ'; // 「臥」
  if (is('疑母 合口 麻泰韻')) return 文讀 ? '▽▽ɦ' : 'ŋ'; // 「外」「瓦」
  if (is('疑母 合口')) return 文讀 ? 'ɦ' : '▽▽ŋ'; // 表五部分
  if (is('日母')) return 'n';
  if (is('羣母')) return 'g';
  // 表五
  if (is('疑母')) return 'ŋ';
  if (is('以母 脂韻 合口')) return 'v'; // 表中無
  // if (is('以母 脂韻 合口') && '維唯惟濰蓶䜅琟踓𢣘蜼䗽'.includes(字頭)) return 'v'; // 表中無
  if (is('以母 上聲 通攝')) return 'ʔ';
  // if (is('以母 上聲') && '以苡已勇蛹涌恿甬俑踊慂𧻹悀埇𧗴'.includes(字頭)) return 'ʔ';
  if (is('云母 上聲 宕梗攝')) return 'ʔ'; // 表中無
  // if (is('云母 上聲') && (is('宕攝') || '永栐'.includes(字頭))) return 'ʔ'; // 表中無
  if (is('匣云以母')) return 'ɦ';
  if (is('影母')) return 'ʔ';
  throw new Error('無聲母規則');
}

function 韻母規則(文讀) {

  // 特殊韻母
  if (is('日母 支脂之微韻 開口') && 文讀) return 'əɭ';
  // if (is('明母 侯韻') && !文讀) return '̩';
  // if (is('明母 虞韻') && !文讀) return '̩';
  // if ((is('疑母 遇攝 開口 三等') || is('疑母 遇攝 開合中立 一等')) && !文讀) return '̩';

  // 通攝
  if (is('東冬鍾韻 舒聲 三等 牙音 疑母')) return 'ioŋ';
  if (is('東冬鍾韻 舒聲 三等 牙音')) return 文讀 ? 'oŋ' : 'ioŋ▽'; // 「龔」等
  if (is('東冬鍾韻 舒聲 三等 日母')) return 文讀 ? 'oŋ▽' : 'ioŋ'; // 「茸」等
  if (is('東冬鍾韻 舒聲 三等 孃母')) return 'ioŋ';
  if (is('東冬鍾韻 舒聲 三等 喉音')) return 'ioŋ';
  if (is('東冬鍾韻 舒聲')) return 'oŋ';
  if (is('東冬鍾韻 入聲 三等 牙喉音')) return 分肉月 ? 'ioʔ' : 'yɪʔ';
  if (is('東冬鍾韻 入聲 三等 日母')) return 文讀 ? 'oʔ▽' : 分肉月 ? 'ioʔ' : 'yɪʔ'; // 「肉」等
  if (is('東冬鍾韻 入聲 三等 孃母')) return 分肉月 ? 'ioʔ' : 'yɪʔ';
  if (is('東冬鍾韻 入聲')) return 'oʔ';

  // 江攝
  if (is('江韻 舒聲 牙音')) return 文讀 ? 分打黨 ? 'iã▽' : 'iɑ̃▽' : 'ɑ̃'; // 「江」等
  if (is('江韻 舒聲')) return 'ɑ̃';
  if (is('江韻 入聲 疑母')) return 文讀 ? 分袜麦 ? 'iɑʔ▽' : 'iɐʔ▽' : 'oʔ'; // 「樂」等。疑母文讀同匣母
  // if (is('江韻 入聲 牙音')) return 文讀 ? 分肉月 ? 'ioʔ▽' : 'yɪʔ▽' : 'oʔ'; // 「確」等。箇個同「上海市区方言志」音系
  if (is('江韻 入聲 牙音')) return 文讀 ? 分袜麦 ? 'iɑʔ▽' : 'iɐʔ▽' : 'oʔ'; // 「確」等
  if (is('江韻 入聲 喉音')) return 文讀 ? 分袜麦 ? 'iɑʔ▽' : 'iɐʔ▽' : 'oʔ'; // 「學」等
  if (is('江韻 入聲')) return 'oʔ';

  // 止攝
  if (is('支脂之微韻 脣音')) return 'i';
  if (is('支脂之微韻 開口 舌齒音 端組')) return 'i';
  if (is('支脂之微韻 開口 舌齒音 來孃日母')) return 'i';
  if (is('支脂之微韻 開口 舌齒音')) return 'z̩';
  if (is('支脂之微韻 開口 牙喉音')) return 'i';
  if (is('支脂之微韻 合口 舌齒音 來孃母')) return 'e';
  if (is('支脂之微韻 合口 舌齒音 日母')) return 文讀 ? 'ø' : 'y▽'; // 「蕊」
  if (is('支脂之微韻 合口 舌齒音')) return 文讀 ? 'ø' : 'z̩▽'; // 「吹」等
  if (is('支脂之微韻 合口 牙音 疑母')) return 'ue';
  if (is('支脂之微韻 合口 牙音')) return 文讀 ? 'ue' : 'y▽'; // 「跪」等
  if (is('脂韻 合口 以母')) return 'i';
  if (is('支脂之微韻 合口 喉音')) return 'ue';

  // 遇攝
  if (is('魚虞韻 脣音')) return 'u';
  if (is('魚韻 舌齒音 端組')) return 文讀 ? 'y' : 'i▽';
  if (is('魚虞韻 舌齒音 端組')) return 'y';
  if (is('魚韻 舌齒音 來母')) return 文讀 ? 'y' : 'i▽'; // 「呂」等
  if (is('魚虞韻 舌齒音 來母')) return 'y';
  if (is('魚韻 舌齒音 孃母')) return 文讀 ? 'y' : 'i▽'; // 「女」（老派）
  if (is('魚虞韻 舌齒音 孃母')) return 'y';
  if (is('魚韻 舌齒音 精組')) return 文讀 ? 'y' : 'i▽'; // 「絮」等
  if (is('魚虞韻 舌齒音 精組')) return 'y';
  if (is('魚韻 舌齒音 莊組')) return 文讀 ? 'u' : 'z̩▽'; // 「鋤」等
  if (is('魚虞韻 舌齒音 莊組')) return 'u';
  if (is('魚韻 舌齒音 日母')) return 文讀 ? 'z̩' : 'i▽'; // 白讀類推無實例
  if (is('魚虞韻 舌齒音 日母')) return 文讀 ? 'z̩' : 'y▽'; // 白讀類推無實例
  if (is('魚虞韻 舌齒音')) return 'z̩';
  if (is('魚虞韻 牙喉音')) return 'y'; // 白讀 /e/。「許」。屬於特殊存古故弗用
  if (is('模韻')) return 'u';

  // 蟹攝
  if (is('齊韻')) return 'i';
  if (is('祭韻 脣音')) return 'i';
  if (is('祭韻 開口 舌齒音 泥來孃日母')) return 'i';
  if (is('祭韻 開口 舌齒音 精端莊組')) return 'i';
  if (is('祭韻 開口 舌齒音')) return 'z̩';
  if (is('祭韻 開口 牙喉音')) return 'i';
  if (is('祭韻 合口 舌齒音 泥來孃母')) return 'e';
  if (is('祭韻 合口 舌齒音 日母')) return 文讀 ? 'ø' : 'i▽'; // 白讀類推無實例
  if (is('祭韻 合口 舌齒音')) return 'ø';
  if (is('祭韻 合口 牙喉音')) return 'ue';
  if (is('泰韻 脣音')) return 'e';
  if (is('泰韻 開口 舌齒音')) return 'a';
  if (is('泰韻 開口 牙喉音')) return 'e';
  if (is('泰韻 合口 舌齒音 泥來孃日母')) return 'e';
  if (is('泰韻 合口 舌齒音 精組')) return 'ø';
  if (is('泰韻 合口 舌齒音')) return 'e';
  if (is('泰韻 合口 牙喉音 疑母')) return 文讀 ? 'ue▽' : 'a'; // 「外」
  if (is('泰韻 合口 牙喉音')) return 'ue';
  if (is('佳皆夬韻 脣音')) return 'a';
  if (is('佳皆夬韻 開口 舌齒音 泥孃母')) return 'i';
  if (is('佳皆夬韻 開口 舌齒音 來母')) return 'e';
  if (is('佳皆夬韻 開口 舌齒音')) return 'a';
  if (is('佳皆夬韻 開口 牙喉音 匣母')) return 文讀 ? 'ie' : 'a▽'; // 「械」等
  if (is('佳皆夬韻 開口 牙喉音')) return 文讀 ? 'ia' : 'a▽'; // 「解」等
  if (is('佳皆夬韻 合口 舌齒音')) return 'ø';
  if (is('佳皆夬韻 合口 牙喉音 疑母')) return 文讀 ? 'ue' : 'a▽'; // 字典弗曾收「聵」
  if (is('佳皆夬韻 合口 牙喉音')) return 文讀 ? 'ua' : 'o▽'; // 「卦」等
  if (is('灰韻 脣音')) return 'e';
  if (is('灰韻 舌齒音 精組')) return 'ø';
  if (is('灰韻 舌齒音')) return 'e';
  if (is('灰韻 牙喉音')) return 'ue';
  if (is('咍韻')) return 'e';
  if (is('廢韻 牙喉音')) return 'e';
  if (is('廢韻')) return 'i';

  // 臻攝
  if (is('眞韻 舒聲 脣音')) return 'iɲ';
  if (is('眞韻 舒聲 開口 舌齒音 端知章莊組')) return 'əŋ';
  if (is('眞韻 舒聲 開口 舌齒音 日母')) return 文讀 ? 'əŋ▽' : 'iɲ'; // 「人」等
  if (is('眞韻 舒聲 開口 舌齒音')) return 'iɲ';
  if (is('眞韻 舒聲 開口 牙喉音')) return 'iɲ';
  if (is('眞韻 舒聲 合口 舌齒音 精組')) return 'iɲ';
  if (is('眞韻 舒聲 合口 舌齒音 日母')) return 文讀 ? 'əŋ▽' : 'iɲ'; // 「閏」等
  if (is('眞韻 舒聲 合口 舌齒音')) return 'əŋ';
  if (is('眞韻 舒聲 合口 牙喉音')) return 分羣窮 ? 'yɲ' : 'ioŋ';
  if (is('眞韻 入聲 脣音')) return 'iɪʔ';
  if (is('眞韻 入聲 開口 舌齒音 端知章莊組')) return 'əʔ';
  if (is('眞韻 入聲 開口 舌齒音 日母')) return 文讀 ? 'əʔ▽' : 'iɪʔ'; // 「日」等
  if (is('眞韻 入聲 開口 舌齒音')) return 'iɪʔ';
  if (is('眞韻 入聲 開口 牙喉音')) return 'iɪʔ';
  if (is('眞韻 入聲 合口 舌齒音 精組')) return 'iɪʔ';
  if (is('眞韻 入聲 合口 舌齒音 泥來孃母')) return 'iɪʔ';
  if (is('眞韻 入聲 合口 舌齒音 日母')) return 文讀 ? 'əʔ▽' : 'iɪʔ';
  if (is('眞韻 入聲 合口 舌齒音')) return 'əʔ';
  if (is('眞韻 入聲 合口 牙喉音')) return 'yɪʔ';
  if (is('臻文欣韻 舒聲 脣音')) return 'əŋ';
  if (is('臻文欣韻 舒聲 開口')) return 'iɲ';
  if (is('臻文欣韻 舒聲 合口')) return 分羣窮 ? 'yɲ' : 'ioŋ';
  if (is('臻文欣韻 入聲 脣音')) return 'əʔ';
  if (is('臻文欣韻 入聲 開口')) return 'iɪʔ';
  if (is('臻文欣韻 入聲 合口')) return 'yɪʔ';
  if (is('元韻 舒聲 脣音')) return 分來蘭 ? 'æ' : 'e';
  if (is('元韻 舒聲 開口')) return 分衣煙 ? 'iɪ' : 'i';
  if (is('元韻 舒聲 合口')) return 分于園 ? 'yø' : 'y';
  if (is('元韻 入聲 脣音')) return 'ɐʔ';
  if (is('元韻 入聲 開口')) return 'iɪʔ';
  if (is('元韻 入聲 合口')) return 'yɪʔ';
  if (is('魂韻 舒聲 牙喉音 疑母')) return 文讀 ? 分困恐 ? 'uəŋ' : 'oŋ' : 'əŋ▽'; // 「諢」。白讀類推無實例
  if (is('魂韻 舒聲 牙喉音')) return 分困恐 ? 'uəŋ' : 'oŋ';
  if (is('魂韻 舒聲')) return 'əŋ';
  if (is('魂韻 入聲 牙喉音 疑母')) return 文讀 ? 分國骨 ? 'uəʔ▽' : 'oʔ▽' : 'əʔ'; // 「兀」
  if (is('魂韻 入聲 牙喉音')) return 分國骨 ? 'uəʔ' : 'oʔ';
  if (is('魂韻 入聲')) return 'əʔ';
  if (is('痕韻 舒聲')) return 'əŋ';
  if (is('痕韻 入聲')) return 'iɪʔ';

  // 山攝
  if (is('寒韻 舒聲 脣音')) return 'ø';
  if (is('寒韻 舒聲 開口 舌齒音')) return 分來蘭 ? 'æ' : 'e';
  if (is('寒韻 舒聲 開口 牙喉音')) return 'ø';
  if (is('寒韻 舒聲 合口 舌齒音')) return 'ø';
  if (is('寒韻 舒聲 合口 牙喉音')) return 分干官 ? 'uø' : 'ø';
  if (is('寒韻 入聲 脣音')) return 'əʔ';
  if (is('寒韻 入聲 開口 舌齒音')) return 'ɐʔ';
  if (is('寒韻 入聲 開口 牙喉音')) return 'əʔ';
  if (is('寒韻 入聲 合口 舌齒音')) return 'əʔ';
  if (is('寒韻 入聲 合口 牙喉音 見曉影母')) return 'uɐʔ';
  if (is('寒韻 入聲 合口 牙喉音 疑母')) return 文讀 ? 分國骨 ? 'uəʔ▽' : 'oʔ▽' : 'əʔ'; // 字典弗曾收「枂」
  if (is('寒韻 入聲 合口 牙喉音')) return 分國骨 ? 'uəʔ' : 'oʔ';
  if (is('刪山韻 舒聲 脣音')) return 分來蘭 ? 'æ' : 'e';
  if (is('刪山韻 舒聲 開口 舌齒音')) return 分來蘭 ? 'æ' : 'e';
  if (is('刪山韻 舒聲 合口 舌齒音')) return 'ø';
  if (is('刪山韻 舒聲 開口 牙喉音')) return 文讀 ? 分衣煙 ? 'iɪ▽' : 'i▽' : 分來蘭 ? 'æ' : 'e'; // 「間」等
  if (is('刪山韻 舒聲 合口 牙喉音')) return 分來蘭 ? 'uæ' : 'ue';
  if (is('刪山韻 入聲 脣音')) return 'ɐʔ';
  if (is('刪山韻 入聲 開口 舌齒音 日母')) 文讀 ? 'əʔ▽' : 'iɪʔ'; // 字典弗曾收「𩭿」
  if (is('刪山韻 入聲 開口 舌齒音')) return 'ɐʔ';
  if (is('刪山韻 入聲 開口 牙喉音 匣母')) return 文讀 ? 'iɐʔ▽' : 'ɐʔ'; // 「轄」
  if (is('刪山韻 入聲 開口 牙喉音 疑母')) return 文讀 ? 'iɐʔ▽' : 'ɐʔ'; // 「齾」
  if (is('刪山韻 入聲 開口 牙喉音')) return 'ɐʔ';
  if (is('刪山韻 入聲 合口 舌齒音')) return 'əʔ';
  if (is('刪山韻 入聲 合口 牙喉音 疑母')) return 文讀 ? 'uɐʔ▽' : 'ɐʔ'; // 字典弗曾收「刖」
  if (is('刪山韻 入聲 合口 牙喉音')) return 'uɐʔ';
  if (is('仙先韻 舒聲 脣音')) return 分衣煙 ? 'iɪ' : 'i';
  if (is('仙先韻 舒聲 開口 知章組')) return 'ø';
  if (is('仙先韻 舒聲 開口 日母')) return 文讀 ? 'ø' : 分衣煙 ? 'iɪ▽' : 'i▽'; // 「燃」等
  if (is('仙先韻 舒聲 開口')) return 分衣煙 ? 'iɪ' : 'i';
  if (is('仙先韻 舒聲 合口 舌齒音 精組')) return 分衣煙 ? 'iɪ' : 'i';
  if (is('仙先韻 舒聲 合口 舌齒音 泥來孃母')) return 分衣煙 ? 'iɪ' : 'i';
  if (is('仙先韻 舒聲 合口 舌齒音 日母')) return 文讀 ? 'ø▽' : 分于園 ? 'yø' : 'y'; // 「軟」等
  if (is('仙先韻 舒聲 合口 舌齒音')) return 'ø';
  if (is('仙先韻 舒聲 合口 牙喉音')) return 分于園 ? 'yø' : 'y';
  if (is('仙先韻 入聲 脣音')) return 'iɪʔ';
  if (is('仙先韻 入聲 開口 舌齒音 知莊章組')) return 'əʔ';
  if (is('仙先韻 入聲 開口 舌齒音 日母')) return 文讀 ? 'əʔ▽' : 'iɪʔ'; // 「熱」等
  if (is('仙先韻 入聲 開口 舌齒音')) return 'iɪʔ';
  if (is('仙先韻 入聲 開口 牙喉音')) return 'iɪʔ';
  if (is('仙先韻 入聲 合口 舌齒音 知莊章組')) return 'əʔ';
  if (is('仙先韻 入聲 合口 舌齒音 日母')) return 文讀 ? 'əʔ▽' : 'iɪʔ'; // 「爇」等
  if (is('仙先韻 入聲 合口 舌齒音')) return 'iɪʔ';
  if (is('仙先韻 入聲 合口 牙喉音')) return 'yɪʔ';

  // 效攝
  if (is('蕭宵韻 知莊章組')) return 'ɔ';
  if (is('蕭宵韻')) return 'iɔ';
  if (is('肴韻 脣音')) return 'ɔ';
  if (is('肴韻 舌齒音')) return 'ɔ';
  if (is('肴韻 牙喉音')) return 文讀 ? 'iɔ▽' : 'ɔ'; // 「交」等
  if (is('豪韻')) return 'ɔ';

  // 果攝
  if (is('歌韻 一等 開口 端組')) return 文讀 ? 'a▽' : 'u'; // 「大」等
  if (is('歌韻 一等')) return 'u';
  if (is('歌韻 三等 開口')) return 文讀 ? 'ia▽' : 'a'; // 「茄」等
  if (is('歌韻 三等 合口')) return 文讀 ? 'ia▽' : 分于園 ? 'io' : 'y'; // 「瘸」等

  // 假攝
  if (is('麻韻 二等 脣音')) return 文讀 ? 'a▽' : 'o'; // 「馬」等
  if (is('麻韻 二等 舌齒音')) return 文讀 ? 'a▽' : 'o'; // 「差」等
  if (is('麻韻 二等 開口 牙喉音')) return 文讀 ? 'ia▽' : 'o'; // 「下」等
  if (is('麻韻 二等 合口 牙喉音')) return 文讀 ? 'ua▽' : 'o'; // 「花」等。脆麻花～
  if (is('麻韻 三等 脣音')) return 文讀 ? 'i▽' : 'ia'; // 「乜」
  if (is('麻韻 三等 舌齒音 精知組')) return 文讀 ? 'i▽' : 'ia'; // 「姐」等
  if (is('麻韻 三等 舌齒音 日母')) return 文讀 ? 'a' : 'ia▽'; // 「惹」等
  if (is('麻韻 三等 舌齒音 章組')) return 文讀 ? 'o' : 'a▽'; // 「射」等
  if (is('麻韻 三等 牙喉音')) return 文讀 ? 'ie▽' : 'a'; // 「也」等

  // 宕攝
  if (is('陽韻 舒聲 脣音')) return 'ɑ̃';
  if (is('陽韻 舒聲 舌齒音 舌音	泥來孃母')) return 分打黨 ? 'iã' : 'iɑ̃';
  if (is('陽韻 舒聲 舌齒音 舌音')) return 分打黨 ? 'ã' : 'ɑ̃';
  if (is('陽韻 舒聲 舌齒音 齒音	精組')) return 分打黨 ? 'iã' : 'iɑ̃';
  if (is('陽韻 舒聲 舌齒音 齒音	日母')) return 文讀 ? 'ɑ̃▽' : 分打黨 ? 'iã' : 'iɑ̃'; // 「壤」等
  if (is('陽韻 舒聲 舌齒音')) return 'ɑ̃';
  if (is('陽韻 舒聲 開口 牙喉音')) return 分打黨 ? 'iã' : 'iɑ̃';
  if (is('陽韻 舒聲 合口 牙喉音 云母')) return 文讀 ? 'uɑ̃' : 分打黨 ? 'iã▽' : 'iɑ̃▽'; // 「旺」等
  if (is('陽韻 舒聲 合口 牙喉音')) return 'uɑ̃';
  if (is('陽韻 入聲 脣音')) return 'oʔ';
  if (is('陽韻 入聲 舌齒音 舌音	泥來孃母')) return 分袜麦 ? 'iɑʔ' : 'iɐʔ';
  if (is('陽韻 入聲 舌齒音 舌音')) return 分袜麦 ? 'ɑʔ' : 'ɐʔ';
  if (is('陽韻 入聲 舌齒音 齒音	精組')) return 分袜麦 ? 'iɑʔ' : 'iɐʔ';
  if (is('陽韻 入聲 舌齒音 齒音	日母')) return 文讀 ? 分袜麦 ? 'ɑʔ' : 'ɐʔ' : 分袜麦 ? 'iɑʔ▽' : 'iɐʔ▽'; // 「箬」等
  if (is('陽韻 入聲 舌齒音')) return 分袜麦 ? 'ɑʔ' : 'ɐʔ';
  if (is('陽韻 入聲 開口 牙喉音')) return 分袜麦 ? 'iɑʔ' : 'iɐʔ';
  if (is('陽韻 入聲 合口 牙喉音')) return 分肉月 ? 'ioʔ' : 'yɪʔ';
  if (is('唐韻 舒聲 脣音')) return 'ɑ̃';
  if (is('唐韻 舒聲 舌齒音')) return 'ɑ̃';
  if (is('唐韻 舒聲 開口 牙喉音')) return 'ɑ̃';
  if (is('唐韻 舒聲 合口 牙喉音')) return 'uɑ̃';
  if (is('唐韻 入聲')) return 'oʔ';

  // 梗攝
  if (is('庚韻 舒聲 二等 脣音')) return 文讀 ? 'əŋ▽' : 分打黨 ? 'ã' : 'ɑ̃'; // 「猛」等
  if (is('庚韻 舒聲 二等 舌齒音')) return 文讀 ? 'əŋ▽' : 分打黨 ? 'ã' : 'ɑ̃'; // 「澄」等
  if (is('庚韻 舒聲 二等 開口 牙喉音')) return 文讀 ? 'əŋ▽' : 分打黨 ? 'ã' : 'ɑ̃'; // 「更」等
  if (is('庚韻 舒聲 二等 合口 牙喉音')) return 'uɑ̃';
  if (is('庚韻 舒聲 三等 脣音')) return 'iɲ';
  if (is('庚韻 舒聲 三等 舌齒音')) return 文讀 ? 'əŋ▽' : 分打黨 ? 'ã' : 'ɑ̃'; // 「省」等
  if (is('庚韻 舒聲 三等 開口 牙喉音')) return 文讀 ? 'iɲ' : 分打黨 ? 'iã▽' : 'iɑ̃▽'; // 「映」等
  if (is('庚韻 舒聲 三等 合口 牙喉音')) return 'ioŋ';
  if (is('庚韻 入聲 二等 脣音')) return 分袜麦 ? 'ɑʔ' : 'ɐʔ';
  if (is('庚韻 入聲 二等 舌齒音')) return 文讀 ? 'əʔ▽' : 分袜麦 ? 'ɑʔ' : 'ɐʔ'; // 「澤」等
  if (is('庚韻 入聲 二等 開口 牙喉音')) return 分袜麦 ? 'ɑʔ' : 'ɐʔ';
  if (is('庚韻 入聲 二等 合口 牙喉音')) return 'oʔ';
  if (is('庚韻 入聲 三等')) return 'iʔ';
  if (is('耕韻 舒聲 脣音')) return 文讀 ? 'əŋ▽' : 分打黨 ? 'ã' : 'ɑ̃'; // 「萌」等
  if (is('耕韻 舒聲 舌齒音')) return 文讀 ? 'əŋ▽' : 分打黨 ? 'ã' : 'ɑ̃'; // 「爭」等
  if (is('耕韻 舒聲 開口 牙喉音')) return 文讀 ? 'iɲ' : 分打黨 ? 'ã▽' : 'ɑ̃▽'; // 「櫻」等
  if (is('耕韻 舒聲 合口 牙喉音')) return 'oŋ';
  if (is('耕韻 入聲 脣音')) return 分袜麦 ? 'ɑʔ' : 'ɐʔ';
  if (is('耕韻 入聲 舌齒音')) return 文讀 ? 'əʔ▽' : 分袜麦 ? 'ɑʔ' : 'ɐʔ'; // 「責」等
  if (is('耕韻 入聲 開口 牙喉音')) return 文讀 ? 'əʔ▽' : 分袜麦 ? 'ɑʔ' : 'ɐʔ'; // 「革」等
  if (is('耕韻 入聲 合口 牙喉音')) return 'oʔ';
  if (is('清青韻 舒聲 脣音')) return 'iɲ';
  if (is('清青韻 舒聲 舌齒音 知莊章組')) return 文讀 ? 'əŋ' : 分打黨 ? 'ã▽' : 'ɑ̃▽'; // 「聲」等
  if (is('清青韻 舒聲 舌齒音')) return 'iɲ';
  if (is('清青韻 舒聲 開口 牙喉音')) return 文讀 ? 'iɲ' : 分打黨 ? 'iã▽' : 'iɑ̃▽'; // 理論白讀
  if (is('清青韻 舒聲 合口 牙喉音')) return 文讀 ? 'iɲ' : 'ioŋ▽'; // 「營」等
  if (is('清青韻 入聲 脣音')) return 'iɪʔ';
  if (is('清青韻 入聲 舌齒音 知莊章組')) return 文讀 ? 'əʔ▽' : 分袜麦 ? 'ɑʔ' : 'ɐʔ'; // 「適」等
  if (is('清青韻 入聲 舌齒音')) return 'iɪʔ';
  if (is('清青韻 入聲 開口 牙喉音')) return 'iɪʔ';
  if (is('清青韻 入聲 合口 牙喉音')) return 分肉月 ? 'ioʔ' : 'yɪʔ';

  // 曾攝
  if (is('蒸韻 舒聲 脣音')) return 'iɲ';
  if (is('蒸韻 舒聲 舌齒音 泥來孃母')) return 'iɲ';
  if (is('蒸韻 舒聲 舌齒音 日母')) return 文讀 ? 'əŋ▽' : 'iɲ'; // 「仍」等
  if (is('蒸韻 舒聲 舌齒音')) return 文讀 ? 'əŋ' : 分打黨 ? 'ã▽' : 'ɑ̃▽'; // 「剩」等
  if (is('蒸韻 舒聲 牙喉音')) return 'iɲ';
  if (is('蒸韻 入聲 脣音')) return 'iɪʔ';
  if (is('蒸韻 入聲 舌齒音 精組')) return 'iɪʔ';
  if (is('蒸韻 入聲 舌齒音 泥來孃母')) return 'iɪʔ';
  if (is('蒸韻 入聲 舌齒音 日母')) return 文讀 ? 'əʔ▽' : 'iɪʔ';
  if (is('蒸韻 入聲 舌齒音')) return 'əʔ';
  if (is('蒸韻 入聲 開口 牙喉音')) return 'iɪʔ';
  if (is('蒸韻 入聲 合口 牙喉音')) return 分肉月 ? 'ioʔ' : 'yɪʔ';
  if (is('登韻 舒聲 脣音 明母')) return 文讀 ? 'oŋ' : 'ɑ̃▽'; // 「懵」
  if (is('登韻 舒聲 脣音')) return 文讀 ? 'əŋ▽' : 分打黨 ? 'ã' : 'ɑ̃'; // 「崩」等
  if (is('登韻 舒聲 開口')) return 'əŋ'; // 無白讀例
  if (is('登韻 舒聲 合口')) return 'oŋ';
  if (is('登韻 入聲 脣音 明母')) return 'əʔ';
  if (is('登韻 入聲 脣音')) return 'oʔ';
  if (is('登韻 入聲 開口')) return 'əʔ';
  if (is('登韻 入聲 合口')) return 'oʔ';

  // 流攝
  if (is('尤侯韻 尤韻 脣音 去聲')) return 'u';
  if (is('尤侯韻 脣音')) return 'ɤ';
  if (is('尤侯韻 尤韻 舌齒音 精組')) return 'iɤ';
  if (is('尤侯韻 尤韻 舌齒音 泥來孃母')) return 'iɤ';
  if (is('尤侯韻 尤韻 舌齒音 日母')) return 文讀 ? 'ɤ' : 'iɤ▽'; // 「柔」等
  if (is('尤侯韻 舌齒音')) return 'ɤ';
  if (is('尤侯韻 尤韻 牙喉音')) return 'iɤ';
  if (is('尤侯韻 牙喉音')) return 'ɤ';
  if (is('幽韻 脣音 明母')) return 文讀 ? 'iɤ▽' : 'iɔ'; // 「繆」等
  if (is('幽韻 脣音')) return 'iɔ';
  if (is('幽韻 舌齒音 精組')) return 'iɤ';
  if (is('幽韻 舌齒音 泥來孃母')) return 'iɤ';
  if (is('尤侯韻 尤韻 舌齒音 日母')) return 文讀 ? 'ɤ' : 'iɤ▽';
  if (is('幽韻 舌齒音')) return 'ɤ';
  if (is('幽韻 牙喉音')) return 'iɤ';

  // 深攝
  if (is('侵韻 舒聲 脣音')) return 'iɲ';
  if (is('侵韻 舒聲 舌齒音 精組')) return 'iɲ';
  if (is('侵韻 舒聲 舌齒音 泥來孃母')) return 'iɲ';
  if (is('侵韻 舒聲 舌齒音 日母')) return 文讀 ? 'əŋ' : 'iɲ▽'; // 「任」等
  if (is('侵韻 舒聲 舌齒音')) return 'əŋ';
  if (is('侵韻 舒聲 牙喉音')) return 'iɲ';
  if (is('侵韻 入聲 脣音')) return 'iɪʔ';
  if (is('侵韻 入聲 舌齒音 精組')) return 'iɪʔ';
  if (is('侵韻 入聲 舌齒音 泥來孃母')) return 'iɪʔ';
  if (is('侵韻 入聲 舌齒音 日母')) return 文讀 ? 'əʔ' : 'iɪʔ▽'; // 「入」等
  if (is('侵韻 入聲 舌齒音')) return 'əʔ';
  if (is('侵韻 入聲 牙喉音')) return 'iɪʔ';

  // 咸攝
  if (is('覃韻 舒聲 脣音')) return 'ø';
  if (is('覃韻 舒聲 舌齒音 來母')) return 分來蘭 ? 'æ' : 'e';
  if (is('覃韻 舒聲 舌齒音 端定母')) return 分來蘭 ? 'æ' : 'e'; // 也有讀 /ø/ 個口音，但是弗在「上海市區方言志」
  if (is('覃韻 舒聲 舌齒音')) return 'ø';
  if (is('覃韻 舒聲 牙喉音 溪母')) return 分來蘭 ? 'æ' : 'e'; // 也有讀 /ø/ 個口音，但是弗在「上海市區方言志」
  if (is('覃韻 舒聲 牙喉音')) return 'ø';
  if (is('覃韻 入聲')) return 文讀 ? 'əʔ▽' : 'ɐʔ'; // 「答」等
  if (is('談韻 舒聲 脣音')) return 分來蘭 ? 'æ' : 'e'; // 生僻字無資料。推測
  if (is('談韻 舒聲 舌齒音')) return 分來蘭 ? 'æ' : 'e';
  if (is('談韻 舒聲 牙喉音')) return 'ø';
  if (is('談韻 入聲 牙喉音')) return 'əʔ';
  if (is('談韻 入聲')) return 'ɐʔ';
  if (is('鹽添嚴韻 舒聲 舌齒音 知組 孃母')) return 分衣煙 ? 'iɪ' : 'i';
  if (is('鹽添嚴韻 舒聲 舌齒音 知組')) return 'ø';
  if (is('鹽添嚴韻 舒聲 舌齒音 莊章組')) return 'ø';
  if (is('鹽添嚴韻 舒聲 舌齒音 日母')) return 文讀 ? 'ø' : 分衣煙 ? 'iɪ▽' : 'i▽'; // 「染」等
  if (is('鹽添嚴韻 舒聲')) return 分衣煙 ? 'iɪ' : 'i';
  if (is('鹽添嚴韻 入聲 舌齒音 知組 孃母')) return 'iɪʔ';
  if (is('鹽添嚴韻 入聲 舌齒音 知組')) return 'əʔ';
  if (is('鹽添嚴韻 入聲 舌齒音 莊章組')) return 'əʔ';
  if (is('鹽添嚴韻 入聲 舌齒音 日母')) return 文讀 ? 'əʔ▽' : 'iɪʔ'; // 無文讀例
  if (is('鹽添嚴韻 入聲')) return 'iɪʔ';
  if (is('咸銜凡韻 舒聲 脣音')) return 分來蘭 ? 'æ' : 'e';
  if (is('咸銜凡韻 舒聲 舌齒音 來母')) return 分衣煙 ? 'iɪ' : 'i';
  if (is('咸銜凡韻 舒聲 舌齒音 孃母')) return 'ø';
  if (is('咸銜凡韻 舒聲 舌齒音')) return 分來蘭 ? 'æ' : 'e';
  if (is('咸銜凡韻 舒聲 牙喉音')) return 文讀 ? 分衣煙 ? 'iɪ▽' : 'i▽' : 分來蘭 ? 'æ' : 'e'; // 「減」等
  if (is('咸銜凡韻 入聲 牙喉音')) return 文讀 ? 'iɐʔ▽' : 'ɐʔ'; // 「甲」等
  if (is('咸銜凡韻 入聲')) return 'ɐʔ';

  throw new Error('無韻母規則');
}

function 顎化規則(音節) {
  if (音節.match(元音Re)) {
    let 第一個元音 = 音節.match(元音Re)[0];
    if (閉前元音.includes(第一個元音)) {
      for (let 聲母 in 顎化分尖團) 音節 = 音節.replace(聲母, 顎化分尖團[聲母]);
      if (選項.分尖團 !== '分尖團') {
        for (let 聲母 in 顎化分情琴) 音節 = 音節.replace(聲母, 顎化分情琴[聲母]);
      }
      if (選項.分尖團 === '區分⟨徐､齊⟩') {
        if (is('從崇常母')) {
          for (let 聲母 in 顎化弗分尖團) 音節 = 音節.replace(聲母, 顎化弗分尖團[聲母]);
        }
      }
    }
  }
  return 音節;
}

function 主流層選擇規則(音們) {
  let 音們_主流度們 = [];
  音們.forEach((音) => {
    音們_主流度們.push({ '音': 音, '主流度': (音.match(/▽/g) || []).length });
  });
  return 音們_主流度們.reduce(function (prev, curr) {
    return prev.主流度 < curr.主流度 ? prev : curr;
  }).音;
}

function 聲調規則(音節) {
  let 聲調;
  if (is('云母 上聲 宕梗攝')) 聲調 = '陰去';
  else if (is('以母 上聲 通攝')) 聲調 = '陰去';
  else if (is('全清 或 次清') && is('平聲')) 聲調 = '陰平';
  else if (is('全清 或 次清') && is('上去聲')) 聲調 = '陰去';
  else if (is('全清 或 次清') && is('入聲')) 聲調 = '陰入';
  else if (is('全濁 或 次濁') && is('入聲')) 聲調 = '陽入';
  else if (is('全濁 或 次濁') && is('舒聲')) 聲調 = '陽去';
  else throw new Error('無聲調規則');

  if (選項.標調方式 === '附標') {
    let 標調位置;
    if (音節.match(元音Re)) {
      let 第一個元音 = 音節.match(元音Re)[0];
      標調位置 = 音節.indexOf(第一個元音);
      if (元音.includes(音節[標調位置 + 1])) 標調位置 += 1; // 弗要標在介音上
      if (元音附標.includes(音節[標調位置 + 1])) 標調位置 += 1; // 弗要標在附標下頭
    } else {
      標調位置 = 音節.indexOf('̩');
    }
    標調位置 += 1;
    return 音節.slice(0, 標調位置) + 附標標調[聲調] + 音節.slice(標調位置);
  } else if (選項.標調方式 === '數字') {
    return 音節 + 數字標調[聲調];
  } else if (選項.標調方式 === '折線') {
    return 音節 + 折線標調[聲調];
  } else {
    return 音節;
  }
}

function finalise(音節) {
  音節 = 音節.replaceAll('▽', '');
  音節 = 顎化規則(音節);
  音節 = 聲調規則(音節);
  return 音節;
}

let 文讀聲母 = 聲母規則(文讀 = true);
let 白讀聲母 = 聲母規則(文讀 = false);

let 文讀韻母 = 韻母規則(文讀 = true);
let 白讀韻母 = 韻母規則(文讀 = false);

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