/* 柳漫中古擬音
 *
 * 
 *
 * @author uliloewi
 */

if (!音韻地位) return [
  ['書寫系統', [2, '拼音方案', '國際音標']],
];

const 標號表 = {
  // p:  'p', pʰ:  'ph', b:  'b', m:  'm',
  // t: 't', tʰ: 'th', d: 'd', n: 'n',
  // ts: 'ts', tsʰ: 'tsh', dz: 'dz', s: 's', z: 'z',
  // k: 'k', kʰ: 'kh', g: 'g', ŋ: 'ng',
  // ʔ: 'q', x: 'h', ɣ: 'x', l: 'l',
  // ʈ: 'tc', ʈʰ: 'tch', ɖ: 'dc', ɳ: 'n',
  // tʂ: 'tsc', tʂʰ: 'tsch', dʐ: 'dzc', ʂ: 'sc', ʐ: 'zc',
  // cç: 'tsj', cçʰ: 'tsjh', ɟʝ: 'dzj', ç: 'sj', ʝ: 'zj',
  // ʎ: 'j', ɲ: 'nj', 以上輔音等於：
  ʰ:  'h', p:  'p', b:  'b', m:  'm',
  t: 't', d: 'd', n: 'n', s: 's', z: 'z', l: 'l',
  k: 'k', g: 'g', ŋ: 'ng', ʔ: 'q', x: 'h', ɣ: 'x',
  ʈ: 'tc', ɖ: 'dc', ɳ: 'n', ʂ: 'sc', ʐ: 'zc',
  c: 't', ɟ: 'd', ç: 'sj', ʝ: 'zj', ʎ: 'j', ɲ: 'nj',

  // 元音表 
  u: 'u', ʅ: 'r', ʯ: 'w', ɨ: 'y', ʉ: 'ü', i: 'i', y: 'v', //等呼
  o: 'o', ɪ: 'ï', ə: 'ë', ɛ: 'e', a: 'a', æ: 'ä', ɒ: 'ö',
};

const 調值標調 = {
  '平聲':'˧˧',
  '上聲':'˨˦',
  '去聲':'˧˩',
  '入聲':'˥',
};

const 附標標調 = {
  '上聲': '́',
  '去聲': '̀',
};

const 元音 = 'aeiouyäöëï';
const 元音Re = new RegExp("[" + 元音 + "]");
const 元音附標 = '̃̈';

function 音標轉字母(s) {
  var res = "";
  for (var i = 0; i < s.length; i++) {
      res += 標號表[s.charAt(i)];
  }
  return res;
};

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
    case '來': return 'l';

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
    case '云': return '';//高元音對映的聲母就是全濁

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
  if (is('江韻')) return 'ʅɒŋ';//皆二開
  // 止攝 
  if (is('支韻 合口')) return is('重紐A類') ? 'yɪ' : 'ʉɪ';//皆三合
  if (is('支韻') && is('幫組 或 開口')) return is('重紐A類') ? 'iɪ' : 'ɨɪ';//皆三開
  if (is('脂韻 合口')) return is('重紐A類') ? 'yi' : 'ʉi';//皆三合
  if (is('脂韻') && is('幫組 或 開口')) return is('重紐A類') ? 'i' : 'ɨi';//皆三開
  if (is('之韻')) return 'ɨ';//皆三開
  if (is('微韻')) return  is('合口') ? 'ʉəi' : 'ɨəi';//皆三等
  // 遇攝 
  if (is('魚韻')) return 'ɨo';//皆三開
  if (is('虞韻')) return 'ʉo';//皆三合
  if (is('模韻')) return 'o';//皆一開
  // 蟹攝 
  if (is('齊韻')) return is('合口') ? 'yɛi' : 'iɛi';//皆四等
  if (is('祭韻 合口')) return is('重紐A類') ? 'yɛʎ' : 'ʉɛʎ';//皆三合
  if (is('祭韻') && is('幫組 或 開口')) return is('重紐A類') ? 'iɛʎ' : 'ɨɛʎ';//皆三開
  if (is('泰韻')) return is('合口') ? 'uaʎ' : 'aʎ';//皆一等
  if (is('佳韻')) return is('合口') ? 'ʯɛ' : 'ʅɛ';//皆二等
  if (is('皆韻')) return is('合口') ? 'ʯæi' : 'ʅæi';//皆二等
  if (is('夬韻')) return is('合口') ? 'ʯaʎ' : 'ʅaʎ';//皆二等
  if (is('咍韻')) return 'ɒi';//皆一開
  if (is('灰韻')) return 'uɒi';//皆一合
  if (is('廢韻')) return is('合口') ? 'ʉɒʎ' : 'ɨɒʎ';//皆三等
  // 臻攝 
  if (is('眞韻 合口')) return is('重紐A類') ? 'yən' : 'ʉən';//皆三合
  if (is('眞韻') && is('幫組 或 開口')) return is('重紐A類') ? 'iən' : 'ɨən';//皆三開
  if (is('臻韻')) return 'ɨn';//皆莊組三開
  if (is('欣韻')) return 'ɨn';//皆牙喉音三開
  if (is('文韻')) return 'ʉn';//皆三合
  if (is('痕韻')) return 'on';//皆一開
  if (is('魂韻')) return 'uon';//皆一合
  if (is('諄韻')) return 'ʉɨn';//皆三合 即眞B合
  // 山攝 
  if (is('寒桓韻')) return is('三等') ? 'ɨan' : is('合口') ? 'uan' : 'an';//皆一等，除了䔾三開
  if (is('刪韻')) return is('合口') ? 'ʯan' : 'ʅan';//皆二等
  if (is('山韻')) return is('合口') ? 'ʯæn' : 'ʅæn';//皆二等
  if (is('元韻')) return is('合口') ? 'ʉon' : 'ɨon';//皆三等
  if (is('仙韻 合口')) return is('重紐A類') ? 'yæn' : 'ʉæn';//皆三等
  if (is('仙韻') && is('幫組 或 開口')) return is('重紐A類') ? 'iæn' : 'ɨæn';//皆三等
  if (is('先韻')) return is('合口') ? 'yɛn' : 'iɛn';//皆四等
  // 效攝 
  if (is('蕭韻')) return 'iɛu';//皆四開
  if (is('宵韻')) return is('重紐A類') ? 'iæu' : 'ɨæu';//皆三開
  if (is('肴韻')) return 'ʅau';//皆二開
  if (is('豪韻')) return 'au';//皆一開
  // 果攝 
  if (is('歌戈韻 一等')) return is('合口') ? 'uɒ' : 'ɒ';
  if (is('歌戈韻 三等')) return is('合口') ? 'ʉɒ' : 'ɨɒ';
  // 假攝 
  if (is('麻韻 二等')) return is('合口') ? 'ʯa' : 'ʅa';
  if (is('麻韻 三等')) return 'ɨa';
  // 宕攝 
  if (is('陽韻')) return is('合口') ? 'ʉaŋ' : 'ɨaŋ';//皆三等
  if (is('唐韻')) return is('合口') ? 'uaŋ' : 'aŋ';//皆一等
  // 梗攝 
  if (is('庚韻 二等')) return is('合口') ? 'ʯæŋ' : 'ʅæŋ';
  if (is('庚韻 三等')) return is('合口') ? 'ʉæŋ' : 'ɨæŋ';
  if (is('耕韻')) return is('合口') ? 'ʯɛŋ' : 'ʅɛŋ';//皆二等
  if (is('清韻')) return is('合口') ? 'yæŋ' : 'iæŋ';//皆三A
  if (is('青韻')) return is('合口') ? 'yɛŋ' : 'iɛŋ';//皆四等
  // 曾攝 
  if (is('蒸韻')) return is('合口') ? 'ʉɨŋ' : 'ɨŋ';//皆三等
  if (is('登韻')) return is('合口') ? 'uəŋ' : 'əŋ';//皆一等
  // 流攝 
  if (is('尤韻')) return 'ɨu';//皆三開
  if (is('侯韻')) return 'u';//皆一開
  if (is('幽韻')) return 'iu';//皆三A開口
  // 深攝 
  if (is('侵韻')) return is('重紐A類') ? 'im' : 'ɨm';//皆三開
  // 咸攝 
  if (is('覃韻')) return 'ɒm';//皆一開
  if (is('談韻')) return 'am';//皆一開
  if (is('咸韻')) return 'ʅæm';//皆二開
  if (is('銜韻')) return 'ʅam';//皆二開
  if (is('凡韻')) return 'ʉɒm';//皆三合
  if (is('鹽韻')) return is('重紐A類') ? 'iæm' : 'ɨæm';//皆三開
  if (is('嚴韻')) return 'ɨɒm';//皆三開
  if (is('添韻')) return 'iɛm';//皆四開
  throw new Error('無韻母規則');
}

function 聲調規則(inzie) {
  let 聲調;
  let 音節 = String(inzie);
  if (is('平聲')) 聲調 = '平聲';
  else if (is('上聲')) 聲調 = '上聲';   
  else if (is('去聲')) 聲調 = '去聲';   
  else if (is('入聲')) 聲調 = '入聲';
  else throw new Error('無聲調規則');
  if (選項.書寫系統 !== '國際音標') {
    if (is('上聲 或 去聲'))
    {
      let 標調位置;
      if (音節.match(元音Re)) {
        let 第一個元音 = 音節.match(元音Re)[0];
        標調位置 = 音節.indexOf(第一個元音);
        if (元音.includes(音節[標調位置 + 1])) 標調位置 += 1; // 不要標在介音高頭
        if (元音附標.includes(音節[標調位置 + 1])) 標調位置 += 1; // 不要標在附標下頭
        if (音節.includes('a')) 標調位置 = 音節.indexOf('a');
        else if (音節.includes('ä')) 標調位置 = 音節.indexOf('ä');
        else if (音節.includes('ö')) 標調位置 = 音節.indexOf('ö');
        else if (音節.includes('e')) 標調位置 = 音節.indexOf('e');
        else if (音節.includes('ë')) 標調位置 = 音節.indexOf('ë');
        else if (音節.includes('u')) 標調位置 = 音節.indexOf('u');
      } else {
        標調位置 = 音節.indexOf('̩');
      }
      標調位置 += 1;
      return 音節.slice(0, 標調位置) + 附標標調[聲調] + 音節.slice(標調位置);
    }
    else return 音節;
  } 
  else return 音節 + 調值標調[聲調];
}

let 聲母 = 聲母規則();
let 隔音符號 = "'";
let 韻母 = 韻母規則();
let 聲調 = 聲調規則();

if (is('入聲')) {
  if (韻母.endsWith('m')) 韻母 = `${韻母.slice(0, -1)}p`;
  else if (韻母.endsWith('n')) 韻母 = `${韻母.slice(0, -1)}t`;
  else if (韻母.endsWith('ŋ')) 韻母 = `${韻母.slice(0, -1)}k`;
}

if (韻母.endsWith('ʎ')) {
  聲調 = '˧˩';
}
if (選項.書寫系統 === '國際音標') {
  return  聲調規則(聲母 + 韻母);
}
else
{
  let 音節 = 音標轉字母(聲母 + 韻母);
  return  聲調規則(音節);
}
