/* 切韻拼音
 *
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
  // 爲了方便推導，對韻類稍作調整
  const 韻 = when([
    ['蒸韻 B類', '冰'],
    ['東韻 三等', '終'],
    ['清韻', '庚'],
    ['陽韻', '唐'],
    ['臻韻', '真'],
    ['凡韻', '嚴'],
    ['', 音韻地位.韻],
  ]);
  const 韻到韻尾 = [
    ['脂之尤侯 　佳　模　 支魚虞 麻歌', ''],
    ['冰蒸終東 青耕登冬江 　　鍾 庚唐', 'ng', 'k'],
    ['　微微　 齊皆咍灰　 祭廢廢 夬泰', 'j'],
    ['真殷文　 先山痕魂　 仙元元 刪寒', 'n', 't'],
    ['幽　　　 蕭　　　　 宵　　 肴豪', 'w'],
    ['侵　　　 添咸　覃　 鹽嚴嚴 銜談', 'm', 'p'],
  ];
  const 元音列表 = [
    'i',       'y',  'u', 'ou',
    'e', 'ee', 'eo', 'o', 'oeu',
    'e',       'yo', 'uo',
         'ae', 'a',
  ];

  let 匹配行 = 韻到韻尾.find(行 => 行[0].includes(韻));
  let 元音 = 元音列表[匹配行[0].replace(/ /g, '')[is`開口` ? 'indexOf' : 'lastIndexOf'](韻)];
  let 韻尾 = 匹配行[1 + is`入聲`];

  // 元音 a 添加三等介音（一般是 C 類）
  if (is`三等` && 元音 === 'a') {
    // A類見於「𩦠」小韻
    元音 = (is`A類` ? 'i' : is`開口` ? 'y' : 'u') + 元音;
  }
  // 前元音添加三等 A、B 介音
  if (
    (is`三等` && ['i', 'e', 'ae'].includes(元音)) ||
    (元音 === 'ae' && is`端組 四等`)
  ) {
    if (is`B類 或 莊組`) {
      元音 = (is`合口` ? 'u' : 'y') + 元音;
    } else if (元音 !== 'i') {
      // 拼莊組以外的銳音一律視爲 A 類（同《切韻》清韻、《廣韻》諄韻的獨立條件）
      元音 = 'i' + 元音;
    }
  }
  // 添加合口介音
  if (is`合口` && !['u', 'o'].includes(元音[0])) {
    元音 = 'w' + 元音;
  }
  return 元音 + 韻尾;
}

function get聲調() {
  return { 上: 'q', 去: 'h' }[音韻地位.聲] || '';
}

return get聲母() + get韻母() + get聲調();
