/* 推導《分韻撮要》音系
 * https://ayaka.shn.hk/fanwan/
 *
 * 説明
 * 以下內容為生成推導《分韻撮要》音系的函數體
 * 函數接受音韻地位，返回對應的推導《分韻撮要》音系發音
 */

const is = (x) => 音韻地位.屬於(x);

function 聲母規則() {
  if (is('幫母')) {
    if (is('東韻 三等 或 鍾微虞廢文元陽尤凡韻')) return 'f';
    return 'b';
  }
  if (is('滂母')) {
    if (is('東韻 三等 或 鍾微虞廢文元陽尤凡韻')) return 'f';
    return 'p';
  }
  if (is('並母')) {
    if (is('東韻 三等 或 鍾微虞廢文元陽尤凡韻')) return 'f';
    return is('平聲') ? 'p' : 'b';
  }
  if (is('明母')) return 'm';

  if (is('端母')) return 'd';
  if (is('透母')) return 't';
  if (is('定母')) return is('平聲') ? 't' : 'd';
  if (is('泥母')) return 'n';
  if (is('來母')) return 'l';

  if (is('知母')) return 'zh';
  if (is('徹母')) return 'ch';
  if (is('澄母')) return is('平聲') ? 'ch' : 'zh';
  if (is('孃母')) return 'n';

  if (is('精母')) return 'z';
  if (is('清母')) return 'c';
  if (is('從母')) return is('平聲') ? 'c' : 'z';
  if (is('心母')) return 's';
  if (is('邪母')) return is('平聲') ? 'c' : 'z'; // 塞擦音多於擦音

  if (is('莊母 二等')) return 'zh';
  if (is('初母 二等')) return 'ch';
  if (is('崇母 二等')) return is('平聲') ? 'ch' : 'zh';
  if (is('生母 二等')) return 'sh';
  if (is('俟母 二等')) return is('平聲') ? 'ch' : 'zh';

  // 莊組三等平翹音規律不明確
  if (is('莊母')) return 'z';
  if (is('初母')) return 'c';
  if (is('崇母')) return is('平聲') ? 'c' : 'z';
  if (is('生母')) return 's';
  if (is('俟母')) return is('平聲') ? 'c' : 'z';

  if (is('章母')) return 'zh';
  if (is('昌母')) return 'ch';
  if (is('常母')) return 'sh'; // 擦音多於塞擦音
  if (is('書母')) return 'sh';
  if (is('船母')) return 'sh';
  if (is('日母')) return 'nj';

  if (is('見母')) return 'g';
  if (is('溪母')) return 'h'; // 多數擦化
  if (is('羣母')) return is('平聲') ? 'k' : 'g';
  if (is('疑母')) return 'ng'; // ng 拼細音時為 nj，詳後

  if (is('曉母')) return 'h';
  if (is('匣母')) {
    if (is('合口 或 模韻')) return 'j'; // 非 yu 前為 w，詳後
    return 'h';
  }
  if (is('影云以母')) {
    if (is('三四等')) return 'j'; // 非 yu 前為 w，詳後
    return '';
  }

  throw new Error('無聲母規則');
}

function 韻母規則() {
  if (is('東冬鍾韻')) return 'ung';

  if (is('江韻 幫組')) return 'ong';
  if (is('江韻 舌齒音')) return 'oeng';
  if (is('江韻 牙喉音')) return 'ong';

  if (is('支脂之微韻 幫組')) return 'i';
  if (is('支脂之微韻 開口')) return 'i'; // i 在 z/c/s 前為 ii，詳後
  if (is('支脂之微韻 合口 舌齒音')) return 'eoi';
  if (is('支脂之微韻 合口 牙喉音')) return 'ai';

  if (is('魚虞韻 幫組')) return 'u';
  if (is('魚虞韻 莊組')) return 'o';
  if (is('魚虞韻')) return 'yu';
  if (is('模韻 疑母')) return '';
  if (is('模韻')) return 'u';

  if (is('齊韻')) return 'ai';
  if (is('祭韻 幫組')) return 'ai';
  if (is('祭韻 開口')) return 'ai';
  if (is('祭韻 合口 舌齒音')) return 'eoi';
  if (is('祭韻 合口 以母')) return 'eoi';
  if (is('祭韻 合口 牙喉音')) return 'ai';
  if (is('泰韻 幫組')) return 'ui';
  if (is('泰韻 開口 端組')) return 'aai';
  if (is('泰韻 開口 來母')) return 'aai';
  if (is('泰韻 開口 精組')) return 'oi';
  if (is('泰韻 開口 牙喉音')) return 'oi';
  if (is('泰韻 合口 舌齒音')) return 'eoi';
  if (is('泰韻 合口 疑母')) return 'oi';
  if (is('泰韻 合口 牙喉音')) return 'ui';
  if (is('佳皆夬韻')) return 'aai';
  if (is('灰韻 疑母')) return 'oi';
  if (is('灰韻')) return 'ui';
  if (is('咍韻')) return 'oi';
  if (is('廢韻')) return 'ai';

  if (is('眞韻 幫組')) return 'an';
  if (is('眞韻 開口 來母')) return 'eon';
  if (is('眞韻 開口 知組')) return 'an';
  if (is('眞韻 開口 精組')) return 'eon';
  if (is('眞韻 開口 莊組')) return 'an';
  if (is('眞韻 開口 章組')) return 'an';
  if (is('眞韻 開口 日母')) return 'an';
  if (is('眞韻 開口 牙喉音')) return 'an';
  if (is('眞韻 合口 舌齒音')) return 'eon';
  if (is('眞韻 合口 牙喉音')) return 'an';
  if (is('臻文欣韻')) return 'an';
  if (is('元韻 幫組')) return 'aan';
  if (is('元韻 開口')) return 'in';
  if (is('元韻 合口')) return 'yun';
  if (is('魂韻 幫組')) return 'un';
  if (is('魂韻 端組')) return 'eon';
  if (is('魂韻 來母')) return 'eon';
  if (is('魂韻 精組')) return 'yun';
  if (is('魂韻 牙喉音')) return 'an';
  if (is('痕韻')) return 'an';

  if (is('寒韻 幫組')) return 'un';
  if (is('寒韻 開口 舌齒音')) return 'aan';
  if (is('寒韻 開口 牙喉音')) return 'on';
  if (is('寒韻 合口 舌齒音')) return 'yun';
  if (is('寒韻 合口 牙喉音')) return 'un';
  if (is('刪山韻')) return 'aan';
  if (is('仙先韻 幫組')) return 'in';
  if (is('仙先韻 開口')) return 'in';
  if (is('仙先韻 合口')) return 'yun';

  if (is('蕭宵韻')) return 'iu';
  if (is('肴韻')) return 'aau';
  if (is('豪韻')) return 'u';

  if (is('歌韻 一等')) return 'o';
  if (is('歌韻 三等')) return 'e';

  if (is('麻韻 二等')) return 'aa';
  if (is('麻韻 三等')) return 'e';

  if (is('陽韻 幫組')) return 'ong';
  if (is('陽韻 開口 莊組')) return 'ong';
  if (is('陽韻 開口')) return 'oeng';
  if (is('陽韻 合口')) return 'ong';
  if (is('唐韻')) return 'ong';

  if (is('庚韻 二等')) return 'ang';
  if (is('庚韻 三等')) return 'ing';
  if (is('耕韻')) return 'ang';
  if (is('清青韻')) return 'ing';
  if (is('蒸韻')) return 'ing';
  if (is('登韻')) return 'ang';

  if (is('尤侯幽韻')) return 'au';

  if (is('侵韻')) return 'am'; // m 韻尾在聲母為脣音時為 n，詳後，下同

  if (is('覃韻 舌齒音')) return 'aam';
  if (is('覃韻 牙喉音')) return 'om';
  if (is('談韻 幫組')) return 'aam';
  if (is('談韻 舌齒音')) return 'aam';
  if (is('談韻 牙喉音')) return 'om';
  if (is('鹽添嚴韻')) return 'im';
  if (is('咸銜凡韻')) return 'aam';

  throw new Error('無韻母規則');
}

function 聲調規則() {
  if (is('全清 或 次清')) {
    if (is('平聲')) return '1'; // 陰平
    if (is('上聲')) return '2'; // 陰上
    if (is('去聲')) return '3'; // 陰去
    if (is('入聲')) return '1'; // 陰入
  } else {
    if (is('平聲')) return '4'; // 陽平
    if (is('全濁 上聲')) return '6'; // 陽去，全濁上變去
    if (is('上聲')) return '5'; // 陽上
    if (is('去聲')) return '6'; // 陽去
    if (is('入聲')) return '6'; // 陽入
  }
  throw new Error('無聲調規則');
}

let 聲母 = 聲母規則();
let 韻母 = 韻母規則();
let 聲調 = 聲調規則();

if (is('合口 或 模韻') && !韻母.startsWith('yu')) { // 合口字
  if (聲母 === 'g') 聲母 = 'gw';
  else if (聲母 === 'k') 聲母 = 'kw';
  else if (聲母 === 'h' && !韻母.startsWith('i')) 聲母 = 'f';
  else if (聲母 === 'j') 聲母 = 'w';
  else if (聲母 === '') 聲母 = 'w';
}

// i 在 z/c/s 前為 ii
if (['z', 'c', 's'].includes(聲母) && 韻母 === 'i') 韻母 = 'ii';

// ng 拼細音時為 nj
const is細音 = ['eo', 'i', 'oe', 'u', 'yu'].some((x) => 韻母.startsWith(x));
if (聲母 === 'ng' && is細音) 聲母 = 'nj';

// m 韻尾在聲母為脣音時為 n
if (is('幫組') && 韻母.endsWith('m')) 韻母 = 韻母.slice(0, -1) + 'n';

if (is('入聲')) {
  if (韻母.endsWith('m')) 韻母 = 韻母.slice(0, -1) + 'p';
  else if (韻母.endsWith('n')) 韻母 = 韻母.slice(0, -1) + 't';
  else if (韻母.endsWith('ng')) 韻母 = 韻母.slice(0, -2) + 'k';
}

return 聲母 + 韻母 + 聲調;
