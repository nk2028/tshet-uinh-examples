/* 白一平轉寫
 * Baxter, H. William, and Laurent Sagart. Old Chinese: A New Reconstruction. Oxford University Press, 2014.
 *
 * 説明
 * 以下內容為生成白一平轉寫的函數體
 * 函數接受音韻地位，返回對應的白一平轉寫
 */

const 開關 = {
  版本: '2014',
};

const is = (x) => 音韻地位.屬於(x);

const 聲母 = {
  幫: 'p',   滂: 'ph',   並: 'b',   明: 'm',
  端: 't',   透: 'th',   定: 'd',   泥: 'n',  來: 'l',
  知: 'tr',  徹: 'trh',  澄: 'dr',  孃: 'nr',
  精: 'ts',  清: 'tsh',  從: 'dz',                     心: 's',  邪: 'z',
  莊: 'tsr', 初: 'tsrh', 崇: 'dzr',                    生: 'sr', 俟: 'zr',
  章: 'tsy', 昌: 'tsyh', 常: 'dzy', 日: 'ny',          書: 'sy', 船: 'zy', 以: 'y',
  見: 'k',   溪: 'kh',   羣: 'g',   疑: 'ng',
  影: "'",   曉: 'x',    匣: 'h',                                          云: 'h',
}[音韻地位.母];

const 含多個等的韻 = '東歌麻庚';

let 韻母 = {
  // 一等韻
  東一: 'uwng',
  冬: 'owng',
  模: 'u',
  泰: 'aj',
  灰: 'oj',
  咍: 'oj',
  魂: 'on',
  痕: 'on',
  寒: 'an',
  豪: 'aw',
  歌一: 'a',
  唐: 'ang',
  登: 'ong',
  侯: 'uw',
  覃: 'om',
  談: 'am',

  // 二等韻
  江: 'aewng',
  佳: 'ea',
  皆: 'eaj',
  夬: 'aej',
  刪: 'aen',
  山: 'ean',
  肴: 'aew',
  麻二: 'ae',
  庚二: 'aeng',
  耕: 'eang',
  咸: 'eam',
  銜: 'aem',

  // 四等韻
  齊: 'ej',
  先: 'en',
  蕭: 'ew',
  青: 'eng',
  添: 'em',

  // 三等陰聲韻
  支: 'je',
  脂: 'ij',
  之: 'i',
  微: 'j+j',
  魚: 'jo',
  虞: 'ju',
  祭: 'jej',
  廢: 'joj',
  宵: 'jew',
  歌三: 'ja',
  麻三: 'jae',
  尤: 'juw',
  幽: 'jiw',

  // 三等陽聲韻
  東三: 'juwng',
  鍾: 'jowng',
  眞: 'in',
  臻: 'in',
  文: 'jun',
  欣: 'j+n',
  元: 'jon',
  仙: 'jen',
  陽: 'jang',
  庚三: 'jaeng',
  清: 'jeng',
  蒸: 'ing',
  侵: 'im',
  鹽: 'jem',
  嚴: 'jaem',
  凡: 'jom',
}[音韻地位.韻 + ([...含多個等的韻].includes(音韻地位.韻) ? 音韻地位.等 : '')];

if (is('章組 或 日以母') && 韻母.startsWith('j')) {
  韻母 = 韻母.slice(1); // 章組或日以母只與三等韻相拼，省去韻母起始的 j
}

if (is('重紐A類')) {
  if (韻母.startsWith('j')) 韻母 = 'ji' + 韻母.slice(1);
  else 韻母 = 'j' + 韻母;
}

if (is('合口 或 灰魂韻') && !is('文凡韻')) {
  if (韻母.startsWith('j')) 韻母 = 'jw' + 韻母.slice(1);
  else 韻母 = 'w' + 韻母;
}

if (is('入聲')) {
  if (韻母.endsWith('m')) 韻母 = 韻母.slice(0, -1) + 'p';
  else if (韻母.endsWith('n')) 韻母 = 韻母.slice(0, -1) + 't';
  else if (韻母.endsWith('ng')) 韻母 = 韻母.slice(0, -2) + 'k';
}

const 聲調 = {
  上: 'X',
  去: 'H',
}[音韻地位.聲] || '';

return 聲母 + 韻母 + 聲調;
