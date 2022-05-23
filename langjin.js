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

const is = (x) => 音韻地位.屬於(x);

if (!音韻地位) return [
  ['$legacy', true],
  ['標調方式', [1, '數字次序', '韻母附標']],  
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

const 元音 = 'iuüaeoyär';
const 元音Re = new RegExp("[" + 元音 + "]");
const 元音附標 = '̃̈';

function 聲母規則() {
  if (is('幫母')) return is('東韻 三等 或 鍾微虞廢文元陽尤凡韻') ? 'f' : 'b';
  if (is('滂母')) return is('東韻 三等 或 鍾微虞廢文元陽尤凡韻') ? 'f' : 'p';
  if (is('並母')) return is('東韻 三等 或 鍾微虞廢文元陽尤凡韻') ? 'f' : is('平聲') ? 'p' : 'b';
  if (is('明母')) return is('三等 凡微文陽虞元韻') ? '' : 'm'; // 等價於三等合口
  if (is('端母')) return 'd';
  if (is('透母')) return 't';
  if (is('定母')) return is('平聲') ? 't' : 'd';
  if (is('泥來孃母')) return 'l';
  if (is('知母')) return is('麻韻 三等') ? 'd' : is('庚耕韻') ? 'z' : 'zh'; // 知組平翹律
  if (is('徹母')) return is('庚耕韻') ? 'c' : 'ch'; // 知組平翹律
  if (is('澄母')) { 
    if (is('庚耕韻')) return is('平聲') ? 'c' : 'z'; // 平送氣仄不送氣
    // 剩下翹舌
    return is('平聲') ? 'ch' : 'zh'; // 平送氣仄不送氣
  }
  if (is('精母')) return 'z';
  if (is('清母')) return 'c';
  if (is('從母')) return is('二等') ? 'ch' : is('平聲') ? 'c' : 'z'; // 平送氣仄不送氣
  if (is('心母')) return 's';
  if (is('邪母')) return is('平聲 尤之韻') ? 'c' : 's';
  if (is('莊母')) return is('宕假效江攝 或 止攝 合口 或 蟹咸山攝 二等') ? 'zh' : 'z'; // 莊組平翹律
  if (is('初母')) return is('宕假效江攝 或 止攝 合口 或 蟹咸山攝 二等') ? 'ch' : 'c'; // 莊組平翹律
  if (is('崇母')) {
    if (is('宕假效江攝 或 止攝 合口 或 蟹咸山攝 二等')) return is('平聲') ? 'ch' : 'zh';
    // 剩下平舌
    return is('之韻') ? 's' : is('平聲') ? 'c' : 'z'; // 平送氣仄不送氣
  }
  if (is('生母')) return is('宕假效江攝 或 止攝 合口 或 蟹咸山攝 二等') ? 'sh' : 's'; // 莊組平翹律
  if (is('俟母')) return is('平聲') ? 'c' : 's'; // 平送氣仄不送氣
  if (is('章母')) return 'zh';
  if (is('昌母')) return 'ch';
  if (is('常母')) return is('曾攝 入聲') ? 'zh' : is('平聲 齊侵清仙鹽陽尤魚虞眞蒸支鍾韻 或 一等') ? 'ch' : 'sh';
  if (is('船書母')) return is('平聲 通攝 或 平聲 合口 山臻攝') ? 'ch' : 'sh'; // 章組擦音分化律
  if (is('日母')) return is('四等') ? 'l' : is('支之脂韻 開口 或 眞侵韻 入聲') ? '' : 'r';  
  let 不顎化 = '一等 或 二等 合口 或 二等 庚耕韻 或 三等 合口 祭微陽支脂凡廢韻 舒聲 或 三等 通攝 舒聲 或 四等 合口 齊韻'; // 見溪羣曉匣母不顎化條件
  if (is('見母')) return is(不顎化) ? 'g' : 'j';
  if (is('溪母')) return is('二等 皆韻 或 二等 江韻 入聲') ? 'k' : is(不顎化) ? 'k' : 'q';
  if (is('羣母')) {  
    if (is('宵韻 重紐A類')) return 'q';
    if (is('平聲')) return is('三等 合口 山陽脂韻') ? 'k' : 'q'; // 平送氣
    // 剩下仄聲不送氣
    return is(不顎化) ? 'g' : 'j';
  }
  if (is('疑母')) {
    if(is('之韻 上聲')) return 'l';
    return is('一二等') ? '' : is('尤蒸齊韻 平聲 或 先仙陽庚韻 入聲') ? 'l' : '';
  }
  if (is('匣母')) return is('開口 耕韻 舒聲') ? 'x' : is(不顎化) ? 'h' : 'x';  
  if (is('曉母')) return is('三等 開口 或 三等 通攝') ? 'x' : is(不顎化) ? 'h' : 'x';
  if (is('以母')) return is('合口 祭韻') ? 'r' : '';
  if (is('影母')) return '';
  if (is('云母')) return is('舒聲 通攝') ? 'x' : '';
  throw new Error('無聲母規則');
}

function 韻母規則() {
  // 通攝
  if (is('東韻 入聲')) return is('三等 見溪羣曉匣疑以影云母') ? 'ü' : 'u'; 
  if (is('東韻 舒聲')) return is('三等 疑以影母') ? 'iong' : is('幫組') ? 'en' : 'ong';
  if (is('冬韻')) return is('入聲') ? 'u' : is('幫組') ? 'en' : 'ong';
  if (is('鍾韻 入聲')) return is('見溪羣曉匣疑以影云母') ? 'ü' : 'u'; 
  if (is('鍾韻 舒聲')) return is('疑以影母') ? 'iong' : is('幫組') ? 'en' : 'ong';

  // 江攝
  if (is('江韻 入聲')) return is('疑母') ? 'io' : 'o'; 
  if (is('江韻 舒聲')) return is('徹澄崇初生知母') ? 'uang' : is('疑母') ? 'iang' : 'ang'; 

  // 止攝 
  if (is('支脂之韻 日母 開口')) return 'er'; 
  if (is('支脂之韻 崇初從精清生俟邪心莊母 開口')) return 'y'; // 平舌音
  if (is('支脂之韻 昌常徹澄船書章知母 開口')) return 'r'; // 翹舌音
  if (is('支脂韻 莊組 合口')) return 'uä';
  if (is('支韻 重紐B類') && is('幫母 或 並母 上去聲')) return 'ei';
  if (is('脂韻 重紐B類') && is('並滂母 或 幫母 平聲')) return 'ei';
  if (is('脂韻 明母')) return 'ei';
  if (is('微韻 幫並滂母')) return 'ei';
  if (is('支脂之微韻 幫並滂母')) return 'i';
  if (is('支韻 明母')) return 'i';
  if (is('微韻 明母')) return 'uei';
  if (is('支脂之微韻 開口')) return 'i';
  if (is('支脂微韻 合口')) return 'uei';

  // 遇攝
  if (is('模韻')) return is('明母') ? 'o' : 'u'; 
  if (is('魚虞韻')) return is('從見精來孃清羣溪曉邪心疑以影云母') ? 'ü' : 'u';  

  // 蟹攝
  if (is('齊韻')) return is('合口 或 常母') ? 'uei' : 'i'; 
  if (is('祭韻 明母')) return 'ei';
  if (is('廢祭灰韻 合口')) return 'uei'; 
  if (is('廢韻 幫組')) return 'ei';
  if (is('祭韻 幫組')) return 'i';
  if (is('廢祭韻 開口')) return is('章知組') ? 'r' : is('莊組') ? 'y' : 'i';  
  if (is('佳韻 合口')) return is('見溪匣曉影母') ? 'ua' : 'uä';
  if (is('皆夬韻 合口')) return 'uä';
  if (is('佳皆夬韻 幫組'))  return 'ä';
  if (is('佳皆夬韻 開口'))  return is('疑母') ? 'iä' : 'ä';
  if (is('灰廢韻 幫組')) return 'ei';
  if (is('灰韻 開口')) return is('以母') ? 'iä' : 'ä'; 
  if (is('咍韻')) return is('合口') ? 'uei' : is('以母') ? 'iä' : 'ä';
  if (is('泰韻 合口')) return is('見溪疑母') ? 'uä' : 'uei'; 
  if (is('泰韻 幫組')) return 'ei';
  if (is('泰韻 開口')) return is('以母') ? 'iä' : 'ä';  

  // 臻攝
  if (is('文韻 入聲 幫組')) return 'u';
  if (is('臻欣文眞韻 入聲 合口')) return is('知莊章組') ? 'u' : 'ü'; 
  if (is('臻欣文眞韻 入聲 幫組')) return 'i';
  if (is('臻欣文眞韻 入聲 開口')) return is('莊組') ? 'ä' : is('章組 或 知徹澄日母') ? 'r' : 'i';
  if (is('臻欣文眞韻 舒聲 開口')) return is('莊章組 或 日知徹澄母') ? 'en' : 'in';
  if (is('眞韻 舒聲 幫組')) return 'in'; 
  if (is('文眞韻 舒聲 合口')) return is('來明日書章知昌常徹澄船母') ? 'uen' : 'üin';            
  if (is('眞臻欣文韻 舒聲 幫組')) return is ('明母') ? 'uen' : 'en'; 
  if (is('眞臻欣韻 舒聲 合口')) return is('滂幫並母') ? 'en' : is('來明日書章知昌常徹澄船母') ? 'uen' : 'üin';
  if (is('魂痕韻 入聲')) return is('幫組 或 開口') ? 'o' : 'u';
  if (is('魂痕韻 舒聲 幫組')) return 'en';
  if (is('魂痕韻 舒聲 開口')) return is('端組') ? 'uen' : 'en';
  if (is('魂痕韻 舒聲 合口')) return 'uen';

  // 山攝
  if (is('先韻 舒聲 合口')) return 'üän';
  if (is('先韻 舒聲 開口 或 先韻 舒聲 幫組')) return is('崇母') ? 'uang' : is('見溪羣曉匣母') ? 'än' : 'iän';
  if (is('元韻 入聲 幫組')) return is('明母') ? 'ua' : 'a';
  if (is('元仙先韻 入聲 合口')) return is('日母 或 知莊章組') ? 'o' : 'üe'; 
  if (is('仙先韻 入聲 幫組')) return 'ie';
  if (is('元仙先韻 入聲 開口')) return is('日母 或 知莊章組') ? 'ä' : is('見溪羣曉匣母') ? 'e' : 'ie';
  if (is('仙韻 舒聲 幫組')) return 'iän';
  if (is('元韻 舒聲 幫組')) return is('明母') ? 'uang' : 'ang';
  if (is('元仙韻 舒聲 合口')) return is('日來母 或 知莊章組') ? 'uang' : 'üän';
  if (is('元仙韻 舒聲 開口')) return is('日知徹澄母 或 莊章組') ? 'ang' : is('見溪羣曉匣母') ? 'än' : 'iän';
  if (is('刪山韻 入聲')) return is('合口') ? 'ua' : is('疑影母') ? 'ia' : 'a';
  if (is('刪山韻 舒聲 幫組')) return 'ang'; 
  if (is('刪山韻 舒聲 開口')) return is('影疑母') ? 'iän' : is('見溪羣曉匣母') ? 'än' : 'ang';
  if (is('刪山韻 舒聲 合口')) return 'uang';
  if (is('寒韻 入聲 開口')) return is('見溪羣曉匣疑影母') ? 'o' : 'a';
  if (is('寒韻 入聲 幫組')) return 'o';
  if (is('寒韻 入聲 合口')) return is('見組') ? 'uä' : 'o';
  if (is('寒韻 舒聲')) return is('開口 或 幫組') ? 'ang' : 'uang';
  
  // 效攝
  if (is('蕭宵韻')) return is('見溪羣曉匣日母 或 知章組') ? 'ao' : 'iao';
  if (is('肴韻')) return is('疑母') ? 'iao' : 'ao';
  if (is('豪韻')) return 'ao';
  
  // 果攝
  if (is('歌韻')) return is('一等') ? 'o' : is('開口') ? 'e' : 'üe';
  
  // 假攝
  if (is('麻韻 二等')) return is('合口') ? 'ua' : is('疑影母') ? 'ia' : 'a';
  if (is('麻韻 三等')) return is('日母 或 章組') ? 'e' : 'ie';

  // 宕攝
  if (is('陽韻 入聲')) return is('心疑以影云來孃母 或 精組') ? 'io' : 'o';
  if (is('唐陽韻 舒聲 合口')) return 'uang';
  if (is('唐陽韻 舒聲 滂幫並母')) return 'ang';
  if (is('陽韻 舒聲 明母')) return 'uang';
  if (is('陽韻 舒聲 開口')) return is('來孃疑以影母 或 精組') ? 'iang' : is('莊組') ? 'uang' : 'ang';
  if (is('唐韻 入聲')) return is('合口 見組') ? 'uä' : 'o';
  if (is('唐韻 舒聲 明母')) return 'ang';
  if (is('唐韻 舒聲 開口'))return 'ang';

  // 梗攝
  if (is('庚韻 入聲 二等')) return is('合口') ? 'uä' : 'ä';
  if (is('庚韻 入聲 三等')) return is('莊組') ? 'y' : is('合口') ? 'ü' : 'i';
  if (is('庚韻 舒聲 二等')) return is('合口') ? 'uen' : 'en';
  if (is('庚韻 舒聲 三等 合口')) return is('心以影母') ?  'in' : is('云影母') ? 'iong' : 'ong';
  if (is('庚韻 舒聲 三等 開口')) return is('知莊章組') ? 'en' : 'in';
  if (is('庚韻 舒聲 三等 幫組')) return 'in';
  if (is('青韻 舒聲 合口')) return is('云影母') ? 'iong' : 'ong';
  if (is('青韻 舒聲 開口')) return 'in';
  if (is('清青韻 入聲 幫組')) return 'i'; 
  if (is('清青韻 入聲 合口')) return 'ü';
  if (is('清青韻 入聲 開口')) return is('莊組') ? 'y' : is('知章組') ? 'r' : 'i';
  if (is('清韻 舒聲 合口 心以影母')) return 'in';
  if (is('清韻 舒聲 合口 羣溪曉母')) return 'ong';
  if (is('清韻 舒聲 合口 云影母')) return 'iong';
  if (is('清青韻 舒聲 幫組')) return 'in';
  if (is('清韻 舒聲 開口')) return is('知莊章組') ? 'en' : 'in';
  if (is('耕韻 入聲 合口')) return 'uä';
  if (is('耕韻 入聲 開口 或 耕韻 入聲 幫組')) return 'ä';       
  if (is('耕韻 舒聲 幫組')) return 'en';
  if (is('耕韻 舒聲 合口')) return 'ong' ; 
  if (is('耕韻 舒聲 開口')) return is('匣影母') ? 'in' : 'en';

  // 曾攝
  if (is('蒸韻 入聲 幫組')) return 'i'; 
  if (is('蒸韻 入聲 合口')) return 'ü';
  if (is('蒸韻 入聲 開口')) return is('莊組') ? 'ä' : is('知徹澄母 或 章組') ? 'r' : 'i';  
  if (is('蒸韻 舒聲 幫組')) return 'in'; 
  if (is('蒸韻 舒聲 開口')) return is('見組 或 來曉以影母') ? 'in' : 'en';
  if (is('登韻 入聲 幫組')) return 'ä'; 
  if (is('登韻 入聲 合口')) return 'uä';
  if (is('登韻 入聲 開口')) return 'ä';
  if (is('登韻 舒聲 幫組')) return 'en'; 
  if (is('登蒸韻 舒聲 合口')) return 'ong'; 
  if (is('登韻 舒聲 開口')) return 'en';

  // 流攝
  if (is('幽韻')) return is('幫組') ? 'iao' : is('見溪羣曉生母') ? 'ou' : 'iou';
  if (is('尤韻')) return is('滂幫並母') ? 'u' : is('精組 或 疑以影云孃來母') ? 'iou' : 'ou';
  if (is('侯韻')) return 'ou';
  
  // 深攝
  if (is('侵韻 入聲')) return is('莊組') ? 'ä' : is('章組 或 日知徹澄母') ? 'r' : 'i';
  if (is('侵韻 舒聲')) return is('章莊組 或 日知徹澄母') ? 'en' : 'in';

  // 咸攝
  if (is('添韻 入聲')) return is('見溪羣曉匣母') ? 'e' : 'ie';
  if (is('添韻 舒聲')) return is('見溪羣曉匣母') ? 'än' : 'iän';
  if (is('鹽嚴凡韻 入聲 幫組')) return 'a';
  if (is('鹽嚴凡韻 入聲 合口')) return is('徹孃母') ? 'ua' : 'a';
  if (is('鹽嚴凡韻 入聲 開口')) return is('莊章組 或 日知徹澄母') ? 'ä' : is('見溪羣曉匣母') ? 'e' : 'ie';
  if (is('鹽韻 舒聲 幫組')) return 'iän';
  if (is('嚴凡韻 舒聲 幫組')) return is('明母') ? 'uang' : 'ang';
  if (is('鹽嚴凡韻 舒聲 合口')) return 'uang';
  if (is('鹽嚴凡韻 舒聲 開口')) return is('日知徹澄母 或 莊章組') ? 'ang' : is('見溪羣曉匣母') ? 'än' : 'iän';
  if (is('咸銜韻 入聲')) return is('疑影母') ? 'ia' : 'a';
  if (is('咸銜韻 舒聲')) return is('來影疑母') ? 'iän' : is('見溪羣曉匣母') ? 'än' : 'ang';
  if (is('覃談韻 入聲')) return is('見組 或 匣曉影母') ? 'o' : 'a';     
  if (is('覃談韻 舒聲')) return is('開口 或 幫組') ? 'ang' : 'uang';

  throw new Error('無韻母規則');
}

function 聲調規則(音節) {
  let 聲調;
  if (is('平聲')) 聲調 = is('全清 或 次清') ? '陰平' : '陽平';
  else if (is('上聲')) 聲調 = is('全濁') ? '去聲' : '上聲';   
  else if (is('去聲')) 聲調 = '去聲';   
  else if (is('入聲')) 聲調 = '入聲';
  else throw new Error('無聲調規則');
  if (選項.標調方式 === '韻母附標') {
    let 標調位置;
    if (音節.match(元音Re)) {
      let 第一個元音 = 音節.match(元音Re)[0];
      標調位置 = 音節.indexOf(第一個元音);
      if (元音.includes(音節[標調位置 + 1])) 標調位置 += 1; // 不要標在介音高頭
      if (元音附標.includes(音節[標調位置 + 1])) 標調位置 += 1; // 不要標在附標下頭
      if (音節.includes('a')) 標調位置 = 音節.indexOf('a');
      else if (音節.includes('o')) 標調位置 = 音節.indexOf('o');
      else if (音節.includes('e')) 標調位置 = 音節.indexOf('e');
    } else {
      標調位置 = 音節.indexOf('̩');
    }
    標調位置 += 1;
    return 音節.slice(0, 標調位置) + 附標標調[聲調] + 音節.slice(標調位置);
  } 
  else {
    return 音節 + 次序標調[聲調];
  }
}

let 聲母 = 聲母規則();
let 韻母 = 韻母規則();
return 聲調規則(聲母 + 韻母);
