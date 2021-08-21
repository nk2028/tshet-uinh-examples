/* 推導普通話
 *
 * @author graphemecluster
 */

const is = (x) => 音韻地位.屬於(x);

if (!音韻地位) return [
  ['標調方式', [2, '數字', '附標']],
];

function 聲母規則() {
  if (is('幫滂並母') && is('東韻 三等 或 鍾微虞廢文元陽尤凡韻')) return 'f';
  if (is('幫母')) return 'b';
  if (is('滂母')) return 'p';
  if (is('並母')) return is('平聲') ? 'p' : 'b';
  if (is('明母')) return is('微虞文元陽凡韻') ? 'w' : 'm';

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
  if (is('崇母')) return is('平聲') ? 'ch' : 'sh';
  if (is('生母')) return 'sh';
  if (is('俟母')) return 'sh';

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
  if (is('疑影云以母')) return '';

  throw new Error('無聲母規則');
}

function 舒聲韻母規則() {
  // 通攝
  if (is('通攝 三等 牙喉音')) return 'iong';
  if (is('通攝')) return is('幫組') ? 'eng' : 'ong';

  // 江攝
  if (is('江韻')) return is('牙喉音') ? 'iang' : 'uang';

  // 止攝
  if (is('止攝 合口')) return is('莊組') ? 'uai' : 'uei';
  if (is('止攝')) return is('牙喉音') ? 'i' : 'er';

  // 遇攝
  if (is('魚虞韻')) return 'ü';
  if (is('模韻')) return 'u';

  // 蟹攝
  if (is('祭韻 合口 莊組')) return 'uai';
  if (is('齊祭廢韻')) return is('合口') ? 'uei' : 'i';
  if (is('灰韻')) return is('開口') ? 'i' : 'uei';
  if (is('泰韻')) return is('開口') ? 'ai' : 'uei';
  if (is('佳韻 牙喉音')) return is('合口') ? 'ua' : 'ia';
  if (is('皆夬韻 牙喉音')) return is('合口') ? 'uai' : 'ie';
  if (is('佳皆夬韻')) return is('合口') ? 'uai' : 'ai';
  if (is('咍韻')) return 'ai';

  // 臻攝
  if (is('眞韻')) return is('合口') ? 'ün' : 'in';
  if (is('臻韻')) return 'en';
  if (is('痕韻 牙喉音')) return 'en';
  if (is('文韻 牙喉音')) return 'ün';
  if (is('痕魂文韻')) return 'uen';
  if (is('欣韻')) return 'in';
  if (is('元韻')) return is('合口') ? 'üan' : 'ian';

  // 山攝
  if (is('寒刪山韻 合口')) return 'uan';
  if (is('寒韻')) return 'an';
  if (is('刪山韻')) return is('牙喉音') ? 'ian' : 'an';
  if (is('仙先韻')) return is('合口') ? 'üan' : 'ian';

  // 效攝
  if (is('豪韻')) return 'ao';
  if (is('肴韻')) return is('牙喉音') ? 'iao' : 'ao';
  if (is('蕭宵韻')) return 'iao';

  // 果攝
  if (is('歌韻 一等 開口')) return is('牙喉音') ? 'e' : 'uo';
  if (is('歌韻 一等')) return 'uo';
  if (is('歌韻 三等 開口')) return 'ie';
  if (is('歌韻 三等')) return 'üe';

  // 假攝
  if (is('麻韻 二等 合口')) return 'ua';
  if (is('麻韻 二等')) return is('牙喉音') ? 'ia' : 'a';
  if (is('麻韻 三等')) return 'ie';

  // 宕攝
  if (is('唐韻 開口')) return 'ang';
  if (is('陽韻 開口')) return is('莊組') ? 'uang' : 'iang';
  if (is('唐陽韻')) return 'uang';

  // 梗攝
  if (is('梗攝 二等')) return is('合口') ? 'ong' : 'eng';
  if (is('梗攝')) return is('合口') ? 'iong' : 'ing';

  // 曾攝
  if (is('登韻')) return is('合口') ? 'ong' : 'eng';
  if (is('蒸韻')) return 'ing';

  // 流攝
  if (is('侯韻')) return 'ou';
  if (is('尤韻')) return is('幫組') ? 'ou' : 'iou';
  if (is('幽韻')) return is('幫組') ? 'iao' : 'iou';

  // 深攝
  if (is('侵韻')) return 'in';

  // 咸攝
  if (is('覃談韻')) return 'an';
  if (is('鹽添韻')) return 'ian';
  if (is('嚴咸銜韻')) return is('牙喉音') ? 'ian' : 'an';
  if (is('凡韻')) return 'uan';

  throw new Error('無韻母規則');
}

function 入聲韻母規則() {
  // 通攝
  if (is('通攝 一等')) return 'u';
  if (is('通攝 三等')) return is('精組') ? 'u' : 'ü';

  // 江攝
  if (is('江韻')) return is('牙喉音') ? 'üe' : 'uo';

  // 臻攝
  if (is('眞韻 合口')) return is('莊組') ? 'uai' : 'ü';
  if (is('眞欣韻')) return 'i';
  if (is('臻痕韻')) return 'e';
  if (is('魂韻')) return is('幫組') ? 'o' : 'u';
  if (is('文韻')) return 'ü';
  if (is('元韻 開口')) return 'ie';
  if (is('元韻')) return is('牙喉音') ? 'üe' : 'a';

  // 山攝
  if (is('寒韻 開口')) return is('牙喉音') ? 'e' : 'a';
  if (is('寒韻')) return 'uo';
  if (is('刪山韻 合口')) return 'ua';
  if (is('刪山韻')) return is('牙喉音') ? 'ia' : 'a';
  if (is('仙先韻 合口')) return 'üe';
  if (is('仙先韻')) return 'ie';

  // 宕攝
  if (is('唐韻 開口 牙喉音')) return 'e';
  if (is('唐韻')) return 'uo';
  if (is('陽韻')) return is('幫組') ? 'o' : 'üe';

  // 梗攝
  if (is('梗攝 二等')) return is('開口') ? 'e' : 'uo';
  if (is('梗攝')) return is('合口') ? 'ü' : 'i';

  // 曾攝
  if (is('登韻 開口')) return 'e';
  if (is('登韻')) return 'uo';
  if (is('蒸韻 合口')) return 'ü';
  if (is('蒸韻')) return is('莊組') ? 'e' : 'i';

  // 深攝
  if (is('侵韻')) return is('莊組') ? 'e' : 'i';

  // 咸攝
  if (is('覃談韻')) return is('牙喉音') ? 'e' : 'a';
  if (is('鹽添嚴韻')) return 'ie';
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

let 聲母 = 聲母規則();
let 韻母 = is('舒聲') ? 舒聲韻母規則() : 入聲韻母規則();
let 聲調 = 聲調規則();

if (['i', 'ü'].includes(韻母[0])) 聲母 = {
  g: 'j', k: 'q', h: 'x',
  z: 'j', c: 'q', s: 'x',
}[聲母] || 聲母;

if (韻母 === 'er') {
  if (聲母 === 'r') 聲母 = '';
  else 韻母 = 'i';
}

if (['n', 'l'].includes(聲母) && ['ua', 'uai', 'uang', 'uei'].includes(韻母)) 韻母 = 韻母.slice(1);
if (韻母[0] === 'ü' && !(['n', 'l'].includes(聲母) && ['ü', 'üe'].includes(韻母))) {
  if (!聲母) 聲母 = 'y';
  韻母 = 'u' + 韻母.slice(1);
}

if (['zh', 'sh', 'ch', 'r'].includes(聲母)) {
  if (韻母.startsWith('i')) {
    if (韻母[1] === 'n') 韻母 = 'e' + 韻母.slice(1);
    else if (韻母[1]) 韻母 = 韻母.slice(1);
  }
  if (韻母 === 'ue') 韻母 = 'uo';
}

if (['b', 'p', 'm', 'f', 'w'].includes(聲母) && 韻母[0] === 'u' && 韻母[1]) 韻母 = 韻母.slice(1);
if (['f', 'w'].includes(聲母) && 韻母[0] === 'i') 韻母 = 韻母.slice(1) || 'ei';

if (!聲母) {
  if (韻母 === 'ong') 韻母 = 'ueng';
  if (韻母[0] === 'i') 聲母 = 'y';
  if (韻母[0] === 'u') 聲母 = 'w';
  if (聲母 && 韻母[1] && 韻母[1] !== 'n') 韻母 = 韻母.slice(1);
}

if (韻母 === 'iou') 韻母 = 'iu';
if (韻母 === 'uei') 韻母 = 'ui';
if (韻母 === 'uen') 韻母 = 'un';

if (選項.標調方式 === '數字') return 聲母 + 韻母 + 聲調;
return 聲母 + (聲調 ? 韻母.replace(/(.*)a|(.*)[eo]|(.*)[iu]/, "$&" + " ̄́̌̀"[聲調]) : 韻母);
