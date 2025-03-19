/* 切韻拼音
 *
 * https://phesoca.com/tupa/ 或
 * https://www.bilibili.com/read/cv19972367 或
 * https://zhuanlan.zhihu.com/p/478751152
 *
 * @author unt
 */

/** @type { 音韻地位['屬於'] } */
const is = (...x) => 音韻地位.屬於(...x);
/** @type { 音韻地位['判斷'] } */
const when = (...x) => 音韻地位.判斷(...x);

if (!音韻地位) return [];

function get聲母() {
  return {
    幫: 'p',  滂: 'ph',  並: 'b',  明: 'm',
    端: 't',  透: 'th',  定: 'd',  泥: 'n',  來: 'l',
    知: 'tr', 徹: 'trh', 澄: 'dr', 孃: 'nr',
    見: 'k',  溪: 'kh',  羣: 'g',  疑: 'ng', 云: '',
    影: 'q',  曉: 'h',   匣: 'gh',
    精: 'ts',  清: 'tsh',  從: 'dz',  心: 's',  邪: 'z',
    莊: 'tsr', 初: 'tsrh', 崇: 'dzr', 生: 'sr', 俟: 'zr',
    章: 'tj',  昌: 'tjh',  常: 'dj',  書: 'sj', 船: 'zj', 日: 'nj', 以: 'j',
  }[音韻地位.母];
}

function get韻母() {
  let 韻母 = when([
    ['脂韻', 'i'], ['之韻', 'y'], ['尤侯韻', 'u'],
    ['支韻', 'e'], ['佳韻', 'ee'], ['魚韻', 'eo'], ['虞模韻', 'o'],
    ['麻韻', 'ae'], ['歌韻', 'a'],

    ['蒸韻 AB類', 'ing'], ['蒸韻', 'yng'], ['東韻', 'ung'],
    ['青韻', 'eng'], ['耕韻', 'eeng'], ['登韻', 'eong'], ['冬鍾韻', 'ong'], ['江韻', 'oeung'],
    ['庚清韻', 'aeng'], ['陽唐韻', 'ang'],

    ['微韻', 'uj'],
    ['齊祭韻', 'ej'], ['皆韻', 'eej'], ['灰咍廢韻', 'oj'],
    ['夬韻', 'aej'], ['泰韻', 'aj'],

    ['真臻韻', 'in'], ['殷文韻', 'un'],
    ['先仙韻', 'en'], ['山韻', 'een'], ['元魂痕韻', 'on'],
    ['刪韻', 'aen'], ['寒韻', 'an'],

    ['幽韻', 'iw'],
    ['蕭宵韻', 'ew'],
    ['肴韻', 'aew'], ['豪韻', 'aw'],

    ['侵韻', 'im'],
    ['鹽添韻', 'em'], ['咸韻', 'eem'], ['覃嚴凡韻', 'om'],
    ['銜韻', 'aem'], ['談韻', 'am'],
  ]);
  // 不圓脣元音
  if (is`開口` && !韻母.endsWith('m')) 韻母 = 韻母.replace(/^u/, 'y').replace(/^o/, 'eo');
  // 等類標記
  if (is`三等` || is`四等` && 韻母.startsWith('ae')) {
    if (is`A類` || is`銳音 非 莊組` && /^i|^e(?!o)|^ae/.test(韻母)) {
      // A 類以 i- 標記
      if (!韻母.startsWith('i')) 韻母 = 'i' + 韻母;
    } else {
      // B、C 類以 y-/u- 標記
      if (/^[uo]|^a(?!e)/.test(韻母) ? is`開口` : is`非 合口`) {
        if (!韻母.startsWith('y')) 韻母 = 'y' + 韻母;
        韻母 = 韻母.replace('yeo', 'yo');
      } else {
        if (!韻母.startsWith('u')) 韻母 = 'u' + 韻母;
      }
    }
  } else {
    // 高元音非三等以 o- 標記
    if (/^[yu]/.test(韻母)) 韻母 = 'o' + 韻母;
  }
  if (is`合口` && !/^[uo]/.test(韻母)) 韻母 = 'w' + 韻母;
  if (is`入聲`) 韻母 = 韻母
    .replace('ng', 'k')
    .replace('n', 't')
    .replace('m', 'p');
  return 韻母;
}

function get聲調() {
  return { 上: 'q', 去: 'h' }[音韻地位.聲] || '';
}

return get聲母() + get韻母() + get聲調();
