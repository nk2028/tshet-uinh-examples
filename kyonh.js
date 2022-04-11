/* 古韻羅馬字
 *
 * https://zh.wikipedia.org/wiki/User:Polyhedron/中古漢語拼音
 *
 * @author Ayaka
 */

if (!音韻地位) return [];

const is = (...x) => 音韻地位.屬於(...x);

const { 重紐母 } = Qieyun.表達式;

音韻地位 = Qieyun.適配分析體系('ytenx')(音韻地位);

function 聲母規則() {
  switch (音韻地位.母) {
    case '幫': return 'p';
    case '滂': return 'ph';
    case '並': return 'b';
    case '明': return 'm';
    case '端': return 't';
    case '透': return 'th';
    case '定': return 'd';
    case '泥': return 'n';
    case '知': return 'tr';
    case '徹': return 'thr';
    case '澄': return 'dr';
    case '孃': return 'nr';
    case '精': return 'c';
    case '清': return 'ch';
    case '從': return 'z';
    case '心': return 's';
    case '邪': return 'zs';
    case '莊': return 'cr';
    case '初': return 'chr';
    case '崇': return 'zr';
    case '生': return 'sr';
    case '俟': return 'zsr';
    case '章': return 'cj';
    case '昌': return 'chj';
    case '船': return 'zsj';
    case '書': return 'sj';
    case '常': return 'zj';
    case '見': return 'k';
    case '溪': return 'kh';
    case '羣': return 'g';
    case '疑': return 'ng';
    case '影': return 'q';
    case '曉': return 'h';
    case '匣': return 'gh';
    case '云': return '';
    case '以': return 'j';
    case '來': return 'l';
    case '日': return 'nj';
    default: throw new Error('無聲母規則');
  }
}

function 韻母規則() {
  // 通攝
  if (is('東韻 一等')) return 'ung';
  if (is('東韻 三等')) return 'iung';
  if (is('冬韻')) return 'uung';
  if (is('鍾韻')) return 'yung';
  // 江攝
  if (is('江韻')) return 'rung';
  // 止攝
  if (is('支韻 合口')) return is('重紐A類') ? 'jye' : 'ye';
  if (is('支韻')) return is('重紐A類') ? 'je' : 'ie';
  if (is('脂韻 合口')) return is('重紐A類') ? 'jyi' : 'yi';
  if (is('脂韻')) return is('重紐A類') ? 'jii' : 'ii';
  if (is('之韻')) return 'i';
  if (is('微韻 開口')) return 'ioi';
  if (is('微韻')) return 'yoi';
  // 遇攝
  if (is('魚韻')) return 'io';
  if (is('虞韻')) return 'yo';
  if (is('模韻')) return 'o';
  // 蟹攝
  if (is('齊韻 合口')) return 'ue';
  if (is('齊韻')) return 'e';
  if (is('祭韻 合口')) return 'yed';
  if (is('祭韻')) return is('重紐A類') ? 'jed' : 'ied';
  if (is('泰韻 合口')) return 'uad';
  if (is('泰韻')) return 'ad';
  if (is('佳韻 合口')) return 'rue';
  if (is('佳韻')) return 're';
  if (is('皆韻 合口')) return 'ruai';
  if (is('皆韻')) return 'rai';
  if (is('夬韻 合口')) return 'ruad';
  if (is('夬韻')) return 'rad';
  if (is('咍韻')) return 'ai';
  if (is('灰韻')) return 'uai';
  if (is('廢韻 開口')) return 'iad';
  if (is('廢韻')) return 'yad';
  // 臻攝
  if (is('眞韻 合口')) return is('重紐A類') ? 'jyn' : 'yn';
  if (is('眞韻')) return is('重紐A類') ? 'jin' : 'in';
  if (is('臻韻')) return 'in';
  if (is('欣韻')) return 'ion';
  if (is('文韻')) return 'yon';
  if (is('元韻 開口')) return 'ian';
  if (is('元韻')) return 'yan';
  if (is('痕韻')) return 'on';
  if (is('魂韻')) return 'uon';
  // 山攝
  if (is('寒韻 開口')) return 'an';
  if (is('寒韻')) return 'uan';
  if (is('刪韻 合口')) return 'ruan';
  if (is('刪韻')) return 'ran';
  if (is('山韻 合口')) return 'ruen';
  if (is('山韻')) return 'ren';
  if (is('仙韻 合口')) return is('重紐A類') ? 'jyen' : 'yen';
  if (is('仙韻')) return is('重紐A類') ? 'jen' : 'ien';
  if (is('先韻 合口')) return 'uen';
  if (is('先韻')) return 'en';
  // 效攝
  if (is('蕭韻')) return 'eu';
  if (is('宵韻')) return is('重紐A類') ? 'jeu' : 'ieu';
  if (is('肴韻')) return 'rau';
  if (is('豪韻')) return 'au';
  // 果攝
  if (is('歌韻 一等 開口')) return 'a';
  if (is('歌韻 一等')) return 'ua';
  if (is('歌韻 三等 開口')) return 'ia';
  if (is('歌韻 三等')) return 'ya';
  // 假攝
  if (is('麻韻 二等 合口')) return 'rua';
  if (is('麻韻 二等')) return 'ra';
  if (is('麻韻 三等')) return 'ia';
  // 宕攝
  if (is('陽韻 開口')) return 'iang';
  if (is('陽韻')) return 'yang';
  if (is('唐韻 合口')) return 'uang';
  if (is('唐韻')) return 'ang';
  // 梗攝
  if (is('庚韻 二等 合口')) return 'ruang';
  if (is('庚韻 二等')) return 'rang';
  if (is('庚韻 三等 合口')) return 'yeng';
  if (is('庚韻 三等')) return 'ieng';
  if (is('耕韻 合口')) return 'rueng';
  if (is('耕韻')) return 'reng';
  if (is('清韻 合口')) return is`${重紐母} 非 重紐B類` ? 'jyeng' : 'yeng';
  if (is('清韻')) return is`${重紐母} 非 重紐B類` ? 'jeng' : 'ieng';
  if (is('青韻 合口')) return 'ueng';
  if (is('青韻')) return 'eng';
  // 曾攝
  if (is('蒸韻 合口')) return 'yng';
  if (is('蒸韻')) return 'ing';
  if (is('登韻 合口')) return 'uong';
  if (is('登韻')) return 'ong';
  // 流攝
  if (is('尤韻')) return 'iu';
  if (is('侯韻')) return 'u';
  if (is('幽韻')) return 'y';
  // 深攝
  if (is('侵韻')) return is('重紐A類') ? 'jim' : 'im';
  // 咸攝
  if (is('覃韻')) return 'om';
  if (is('談韻')) return 'am';
  if (is('鹽韻')) return is('重紐A類') ? 'jem' : 'iem';
  if (is('添韻')) return 'em';
  if (is('咸韻')) return 'rem';
  if (is('銜韻')) return 'ram';
  if (is('嚴韻')) return 'iam';
  if (is('凡韻')) return 'yam';
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
  else if (韻母.endsWith('ng')) 韻母 = `${韻母.slice(0, -2)}k`;
}

if (韻母.endsWith('d')) {
  聲調 = '';
}

if (聲母.endsWith('r') && 韻母.startsWith('r')) {
  韻母 = 韻母.slice(1);
}

if (聲母.endsWith('j') && 韻母.startsWith('i') && [...'aeou'].some((x) => 韻母.includes(x))) {
  韻母 = 韻母.slice(1);
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

if (is('云母 一二四等')) 聲母 = 'i'; // 如 1444 倄小韻 i'uaix

if (is('端組 三等') && !韻母.startsWith('j')) {
  隔音符號 = ''; // 如 2237 地小韻 diih
}

return 聲母 + 隔音符號 + 韻母 + 聲調;
