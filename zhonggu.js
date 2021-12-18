/* 柳漫中古擬音
 *
 * 
 *
 * @author uliloewi
 */

const is = (x) => 音韻地位.屬於(x);

function 聲母規則() {
  switch (音韻地位.母) {
    case '幫': return 'p';
    case '滂': return 'pʰ';
    case '並': return 'b';
    case '明': return 'm';

    case '端': return 't';
    case '透': return 'tʰ';
    case '定': return 'd';
    case '泥': return 'n';

    case '精': return 'ts';
    case '清': return 'tsʰ';
    case '從': return 'dz';
    case '心': return 's';
    case '邪': return 'z';

    case '見': return 'k';
    case '溪': return 'kʰ';
    case '羣': return 'g';
    case '疑': return 'ŋ';
    case '影': return 'ʔ';
    case '曉': return 'x';
    case '匣': return 'ɣ';
    case '云': return '';
    case '來': return 'l';

    //翹舌
    case '知': return 'ʈ';
    case '徹': return 'ʈʰ';
    case '澄': return 'ɖ';
    case '孃': return 'ɳ';
    case '莊': return 'tʂ';
    case '初': return 'tʂʰ';
    case '崇': return 'dʐ';
    case '生': return 'ʂ';
    case '俟': return 'ʐ';

    //硬腭
    case '章': return 'cç';
    case '昌': return 'cçʰ';
    case '常': return 'ɟʝ';
    case '書': return 'ç';
    case '船': return 'ʝ';
    case '以': return 'ʎ';
    case '日': return 'ɲ';

    default: throw new Error('無聲母規則');
  }
}

function 韻母規則() {
  // 通攝 
  if (is('東韻 一等')) return 'uŋ';//皆開
  if (is('東韻 三等')) return 'ɨuŋ';//皆開
  if (is('冬韻')) return 'oŋ';//皆一開
  if (is('鍾韻')) return 'ɨoŋ';//皆三開
  // 江攝 
  if (is('江韻')) return 'ɻɒŋ';//皆二開
  // 止攝 
  if (is('支韻 合口')) return is('重紐A類') ? 'yɪ' : 'ʉɪ';//皆三合
  if (is('支韻 開口')) return is('重紐A類') ? 'iɪ' : 'ɨɪ';//皆三開
  if (is('脂韻 合口')) return is('重紐A類') ? 'yi' : 'ʉi';//皆三合
  if (is('脂韻 開口')) return is('重紐A類') ? 'i' : 'ɨi';//皆三開
  if (is('之韻')) return 'ɨ';//皆三開
  if (is('微韻')) return  is('開口') ? 'ɨəi' : 'ʉəi';//皆三等
  // 遇攝 
  if (is('魚韻')) return 'ɨo';//皆三開
  if (is('虞韻')) return 'ʉo';//皆三合
  if (is('模韻')) return 'o';//皆一開
  // 蟹攝 
  if (is('齊韻')) return is('開口') ? 'iɛ' :'yɛ';//皆四等
  if (is('祭韻 合口')) return is('重紐A類') ? 'yɛɿ' : 'ʉɛɿ';//皆三合
  if (is('祭韻 開口')) return is('重紐A類') ? 'iɛɿ' : 'ɨɛɿ';//皆三開
  if (is('泰韻')) return is('開口') ? 'æɿ' : 'uæɿ';//皆一等
  if (is('佳韻')) return is('開口') ? 'ɻɛ' :'ɻuɛ';//皆二等
  if (is('皆韻')) return is('開口') ? 'ɻai' :'ɻuai';//皆二等
  if (is('夬韻')) return is('開口') ? 'ɻæɿ' :'ɻuæɿ';//皆二等
  if (is('咍韻')) return 'ai';//皆一開
  if (is('灰韻')) return 'uai';//皆一合
  if (is('廢韻')) return is('開口') ? 'ɨæɿ' :'ʉæɿ';//皆三等
  // 臻攝 
  if (is('眞韻 合口')) return is('重紐A類') ? 'yən' : 'ʉən';//皆三合
  if (is('眞韻 開口')) return is('重紐A類') ? 'iən' : 'ɨən';//皆三開
  if (is('臻韻')) return 'ɨən';//皆莊組三開
  if (is('欣韻')) return 'ɨon';//皆牙喉音三開
  if (is('文韻')) return 'ʉon';//皆三合
  // if (is('元韻 開口')) return 'ian';
  // if (is('元韻')) return 'yan';
  if (is('痕韻')) return 'on';//皆一開
  if (is('魂韻')) return 'uon';//皆一合
  if (is('諄韻')) return 'ʉən';//皆三合 即眞B合
  // 山攝 
  if (is('寒桓韻')) return is('三等') ? 'ɨan' : is('開口') ? 'an' : 'uan';//皆一開，除了䔾三開
  if (is('刪韻')) return is('開口') ? 'ɻan' : 'ɻuan';//皆二等
  if (is('山韻')) return is('開口') ? 'ɻæn' : 'ɻuæn';//皆二等
  if (is('元韻')) return is('開口') ? 'ɨan' : 'ʉan';//皆三等
  if (is('仙韻 合口')) return is('重紐A類') ? 'yæn' : 'ʉæn';//皆三等
  if (is('仙韻 開口')) return is('重紐A類') ? 'iæn' : 'ɨæn';//皆三等
  if (is('先韻')) return is('開口') ? 'ian' : 'yan';//皆四等
  // 效攝 
  if (is('蕭韻')) return 'iæu';//皆四開
  if (is('宵韻')) return is('重紐A類') ? 'iau' : 'ɨau';//皆三開
  if (is('肴韻')) return 'ɻau';//皆二開
  if (is('豪韻')) return 'au';//皆一開
  // 果攝 
  if (is('歌戈韻 一等')) return is('開口') ? 'ɒ' : 'uɒ';
  if (is('歌戈韻 三等')) return is('開口') ? 'ɨɒ' : 'ʉɒ';
  // 假攝 
  if (is('麻韻 二等')) is('開口') ? 'ɻa' : 'ɻua';
  if (is('麻韻 三等')) return 'ɨa';
  // 宕攝 
  if (is('陽韻')) return is('開口') ? 'ɨaŋ' : 'ʉaŋ';//皆三等
  if (is('唐韻')) return is('開口') ? 'aŋ' : 'uaŋ';//皆一等
  // 梗攝 
  if (is('庚韻 二等')) return is('開口') ? 'ɻæŋ' : 'ɻuæŋ';
  if (is('庚韻 三等')) return is('開口') ? 'ɨæŋ' : 'ʉæŋ';
  if (is('耕韻')) return is('開口') ? 'ɻɛŋ' : 'ɻuɛŋ';//皆二等
  if (is('清韻')) return is('開口') ? 'iæŋ' : 'yæŋ';//皆三等A類
  if (is('青韻')) return is('開口') ? 'iɛŋ' : 'yɛŋ';//皆四等
  // 曾攝 
  if (is('蒸韻')) return is('開口') ? 'ɨəŋ' : 'ʉəŋ';//皆三等
  if (is('登韻')) return is('開口') ? 'əŋ' : 'uəŋ';//皆一等
  // 流攝 
  if (is('尤韻')) return 'ɨu';//皆三開
  if (is('侯韻')) return 'u';//皆一開
  if (is('幽韻')) return 'iou';//皆三A開口
  // 深攝 
  if (is('侵韻')) return is('重紐A類') ? 'im' : 'ɨm';//皆三開
  // 咸攝 
  if (is('覃韻')) return 'ɒm';//皆一開
  if (is('談韻')) return 'am';//皆一開
  if (is('咸韻')) return 'ɻæm';//皆二開
  if (is('銜韻')) return 'ɻam';//皆二開
  if (is('凡韻')) return 'ʉam';//皆三合
  if (is('鹽韻')) return is('重紐A類') ? 'iæm' : 'ɨæm';//皆三開
  if (is('嚴韻')) return 'ɨam';//皆三開
  if (is('添韻')) return 'iam';//皆四開
  throw new Error('無韻母規則');
}

function 聲調規則() {
  if (is('平入聲')) return '';
  if (is('上聲')) return 'x';
  if (is('去聲')) return 'h';
  throw new Error('無聲調規則');
}

let 聲母 = 聲母規則();
let 隔音符號 = "'";
let 韻母 = 韻母規則();
let 聲調 = 聲調規則();

if (is('入聲')) {
  if (韻母.endsWith('m')) 韻母 = `${韻母.slice(0, -1)}p`;
  else if (韻母.endsWith('n')) 韻母 = `${韻母.slice(0, -1)}t`;
  else if (韻母.endsWith('ŋ')) 韻母 = `${韻母.slice(0, -2)}k`;
}

if (韻母.endsWith('ɿ')) {
  聲調 = 'h';
}

/*
if ((is('知莊組') && 韻母.startsWith('ɻ')) || (is('章組 或 日以母') && 韻母.startsWith('ɨ'))) {
  韻母 = 韻母.substr(1);
}

if (is(`幫組 一二三四等 \
或 端組 一四等 \
或 知組 二三等 \
或 精組 一三四等 \
或 莊組 二三等 \
或 章組 三等 \
或 見溪疑母 一二三四等 \
或 羣母 二三等 \
或 影曉母 一二三四等 \
或 匣母 一二四等 \
或 云以母 三等 \
或 來母 一二三四等 \
或 日母 三等`)) {
  隔音符號 = '';
}

if (is('云母 一等')) 聲母 = 'i'; // 1444 倄小韻 i'uaix

if (is('定母 三等')) 隔音符號 = ''; // 2237 地小韻 diih*/

return 聲母 + 韻母 + 聲調;
