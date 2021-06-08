/* 推導普通話
 *
 * https://github.com/BYVoid/ytenx/blob/master/ytenx/sync/kyonh/Dauh.txt
 *
 * @author N/A
 */

const is = (x) => 音韻地位.屬於(x);

function 聲母規則() {
  if (is('幫滂並母') && is('東韻 三等 或 鍾微虞廢文元陽尤凡韻')) return 'f';
  if (is('幫母')) return 'b';
  if (is('滂母')) return 'p';
  if (is('並母')) return is('平聲') ? 'p' : 'b';
  if (is('明母')) return is('虞文凡韻 或 微元陽韻 合口') ? 'w' : 'm';

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
  if (is('邪母')) return 's';

  if (is('莊母')) return 'zh';
  if (is('初母')) return 'ch';
  if (is('崇母')) return is('平聲') ? 'ch' : 'zh';
  if (is('生母')) return 'sh';
  if (is('俟母')) return 's';

  if (is('章母')) return 'zh';
  if (is('昌母')) return 'ch';
  if (is('常母')) return is('平聲') ? 'ch' : 'sh';
  if (is('書母')) return 'sh';
  if (is('船母')) return 'sh';
  if (is('日母')) return 'r';

  if (is('見母')) return 'g';
  if (is('溪母')) return 'k';
  if (is('羣母')) return is('平聲') ? 'k' : 'g';
  if (is('曉匣母')) return 'h';
  if (is('疑影云以母')) return is(`\
東韻 一等 或 \
止蟹假攝 合口 或 \
模魂韻 或 \
寒刪唐韻 合口 或 \
歌韻 一等 合口 或 \
庚韻 二等 合口 或 \
耕陽韻 合口 舒聲 或 \
冬韻 入聲 或 \
山韻 合口 入聲`) ? 'w' : '';

  throw new Error('無聲母規則');
}

function 舒聲韻母規則() {
  // 通攝
  if (is('東韻 一等 或 冬韻')) return is('幫組 或 疑影云以母') ? 'eng' : 'ong';
  if (is('東韻 三等 或 鍾韻')) return is('幫組') ? 'eng' : is('牙喉音') ? 'iong' : 'ong';

  // 江攝
  if (is('江韻')) return is('幫組') ? 'ang' : is('牙喉音') ? 'iang' : 'uang';

  // 止攝
  if (is('止攝 合口')) return is('莊組') ? 'uai' : 'ui';
  if (is('止攝')) return is('微韻 幫滂並母') ? 'ei' : 'i';

  // 遇攝
  if (is('魚虞韻 孃來母')) return 'ü';
  if (is('遇攝')) return 'u';

  // 蟹攝
  if (is('廢祭齊韻 開口')) return 'i';
  if (is('泰咍韻 開口')) return 'ai';
  if (is('祭韻 合口 莊組')) return 'uai';
  if (is('泰廢祭齊灰韻')) return is('幫組 或 孃來母') ? 'ei' : 'ui';
  if (is('佳韻 疑影云以母')) return 'a';
  if (is('佳韻 牙喉音')) return is('開口') ? 'ia' : 'ua';
  if (is('皆夬韻 牙喉音 開口')) return 'ie';
  if (is('佳皆夬韻')) return is('開口 或 幫組 或 孃來母') ? 'ai' : 'uai';

  // 臻攝
  if (is('眞韻 開口')) return is('知徹澄日母 或 莊章組') ? 'en' : 'in';
  if (is('眞韻')) return 'un';
  if (is('臻韻')) return 'en';
  if (is('痕韻 牙喉音')) return 'en';
  if (is('魂韻 疑影云以母')) return 'en';
  if (is('痕魂文韻')) return is('幫組') ? 'en' : 'un';
  if (is('欣韻')) return 'in';
  if (is('元韻 開口 牙喉音')) return 'ian';
  if (is('元韻 合口')) return 'uan';
  if (is('元韻')) return 'an';

  // 山攝
  if (is('山攝 合口')) return 'uan';
  if (is('寒韻')) return 'an';
  if (is('刪山韻')) return is('牙喉音') ? 'ian' : 'an';
  if (is('仙先韻')) return is('知徹澄日母 或 莊章組') ? 'an' : 'ian';

  // 效攝
  if (is('豪韻')) return 'ao';
  if (is('肴韻')) return is('牙喉音') ? 'iao' : 'ao';
  if (is('蕭宵韻')) return is('知徹澄日母 或 莊章組') ? 'ao' : 'iao';

  // 果攝
  if (is('歌韻 一等 開口')) return is('牙喉音') ? 'e' : 'uo';
  if (is('歌韻 一等')) return is('幫組') ? 'o' : 'uo';
  if (is('歌韻 三等 開口')) return 'ie';
  if (is('歌韻 三等')) return is('孃來母') ? 'üe' : 'ue';

  // 假攝
  if (is('麻韻 二等 合口')) return 'ua';
  if (is('麻韻 二等')) return is('牙喉音') ? 'ia' : 'a';
  if (is('麻韻 三等')) return is('知徹澄日母 或 莊章組') ? 'e' : 'ie';

  // 宕攝
  if (is('唐韻 開口')) return 'ang';
  if (is('陽韻 開口 莊組')) return 'uang';
  if (is('陽韻 開口')) return is('端精組 或 牙喉音 或 孃來母') ? 'iang' : 'ang';
  if (is('宕攝')) return is('牙喉音') ? 'uang' : 'ang';

  // 梗攝
  if (is('庚韻 二等 或 耕韻') && is('合口 見溪羣曉匣母')) return 'ong';
  if (is('庚韻 三等 或 清青韻') && is('合口 牙喉音')) return 'iong';
  if (is('庚韻 二等 或 耕韻') && is('幫組 或 開口')) return 'eng';
  if (is('梗攝')) return is('知徹澄日母 或 莊章組') ? 'eng' : 'ing';

  // 曾攝
  if (is('登韻 合口')) return 'ong';
  if (is('登韻')) return 'eng';
  if (is('蒸韻')) return is('知徹澄日母 或 莊章組') ? 'eng' : 'ing';

  // 流攝
  if (is('侯韻')) return 'ou';
  if (is('尤韻 幫組')) return 'ou';
  if (is('幽韻 幫組')) return 'iao';
  if (is('尤幽韻')) return is('知徹澄日母 或 莊章組') ? 'ou' : 'iu';

  // 深攝
  if (is('侵韻')) return is('知徹澄日母 或 莊章組') ? 'en' : 'in';

  // 咸攝
  if (is('覃談韻')) return 'an';
  if (is('鹽添韻')) return is('知徹澄日母 或 莊章組') ? 'an' : 'ian';
  if (is('嚴咸銜韻')) return is('牙喉音') ? 'ian' : 'an';
  if (is('凡韻')) return is('幫組') ? 'an' : 'uan';

  throw new Error('無韻母規則');
}

function 入聲韻母規則() {
  // 通攝
  if (is('東韻 三等 或 鍾韻') && is('孃來母')) return 'ü';
  if (is('通攝')) return 'u';

  // 江攝
  if (is('江韻')) return is('幫組') ? 'o' : is('牙喉音') ? 'ue' : 'uo';

  // 臻攝
  if (is('眞韻 合口 孃來母')) return 'ü';
  if (is('眞韻 合口 莊組')) return 'uai';
  if (is('眞韻 合口')) return 'u';
  if (is('眞欣韻')) return 'i';
  if (is('臻痕韻')) return 'e';
  if (is('魂文韻')) return 'u';
  if (is('元韻 開口')) return 'ie';
  if (is('元韻')) return is('牙喉音') ? 'ue' : 'a';

  // 山攝
  if (is('寒韻 開口')) return is('牙喉音') ? 'e' : 'a';
  if (is('寒韻')) return is('幫組') ? 'o' : 'uo';
  if (is('刪山韻 合口')) return is('孃來母') ? 'a' : 'ua';
  if (is('刪山韻')) return is('牙喉音') ? 'ia' : 'a';
  if (is('仙先韻 合口')) return is('孃來母') ? 'üe' : is('知徹澄日母 或 莊章組') ? 'uo' : 'ue';
  if (is('仙先韻')) return is('知徹澄日母 或 莊章組') ? 'ie' : 'e';

  // 宕攝
  if (is('宕攝 幫組')) return 'o';
  if (is('唐韻 開口 牙喉音')) return 'e';
  if (is('唐韻')) return 'uo';
  if (is('陽韻')) return is('孃來母') ? 'üe' : is('知徹澄日母 或 莊章組') ? 'uo' : 'ue';

  // 梗攝
  if (is('庚韻 二等 開口 莊組')) return 'a';
  if (is('庚韻 二等 合口')) return is('見溪羣曉匣母') ? 'e' : is('牙喉音') ? 'o' : 'uo';
  if (is('耕韻 合口')) return 'uo';
  if (is('庚韻 二等 或 耕韻')) return is('幫組') ? 'o' : 'e';
  if (is('庚韻 三等 或 清青韻')) return 'u';

  // 曾攝
  if (is('登韻 合口')) return 'uo';
  if (is('登韻')) return is('幫組') ? 'o' : 'e';
  if (is('蒸韻 合口')) return 'u';
  if (is('蒸韻')) return is('莊組') ? 'e' : 'i';

  // 深攝
  if (is('侵韻')) return is('莊組') ? 'e' : 'i';

  // 咸攝
  if (is('覃談韻')) return is('牙喉音') ? 'e' : 'a';
  if (is('鹽添嚴韻')) return is('知徹澄日母 或 莊章組') ? 'ie' : 'e';
  if (is('咸銜凡韻')) return is('牙喉音') ? 'ia' : 'a';

  throw new Error('無韻母規則');
}

function 聲調規則() {
  if (is('全清 或 次清')) {
    if (is('平聲')) return '1';
    if (is('上聲')) return '3';
    if (is('去聲')) return '4';
    if (is('入聲')) return '';
  } else {
    if (is('平聲')) return '2';
    if (is('全濁 上聲')) return '4';
    if (is('上聲')) return '3';
    if (is('去聲')) return '4';
    if (is('全濁 入聲')) return '2';
    if (is('入聲')) return '4';
  }
  throw new Error('無聲調規則');
}

if (is('日母 止攝 開口')) return 'er' + 聲調規則();

let 聲母 = 聲母規則();
let 韻母 = is('舒聲') ? 舒聲韻母規則() : 入聲韻母規則();
let 聲調 = 聲調規則();

if (is('牙喉音') && is('東韻 三等 或 鍾江韻 或 止攝 開口') || is('精組 或 牙喉音') && is(`\
魚虞眞文欣元仙先肴宵蕭清青蒸尤幽侵凡嚴銜咸鹽添韻 或 \
佳夬皆廢祭齊刪山麻陽韻 開口 或 \
歌庚韻 三等 或 \
陽韻 合口 入聲`)) 聲母 = {
  g: 'j', k: 'q', h: 'x',
  z: 'j', c: 'q', s: 'x',
  '': 'y',
}[聲母];

if (聲母 === 'w' && 韻母 === 'ui') 韻母 = 'ei';
if (聲母 === 'y' && 韻母 === 'iu') 韻母 = 'ou';
if ((聲母 === 'y' && 韻母.startsWith('i') || 聲母 === 'w' && 韻母.startsWith('u')) && 'aeiou'.includes(韻母[1])) 韻母 = 韻母.slice(1);

return 聲母 + 韻母 + 聲調;
