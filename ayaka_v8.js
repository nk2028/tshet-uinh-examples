/* 綾香思考音系
 * https://ayaka.shn.hk/v8/
 *
 * 説明
 * 以下內容為生成綾香思考音系的函數體
 * 函數接受音韻地位，返回對應的綾香思考音系拼音
 */

/* 1. 開關 */

const 開關 = {};

開關.假名 = false; // 開啓：機 キ 關閉：機 ki
開關.ヰヱヲ小假名 = true; // 開啓：迥 ク𛅥ィ 關閉：迥 クヱィ。僅當開啓假名時生效。
開關.片假名 = true; // 開啓：機 キ 關閉：機 き。僅當開啓假名時生效。
開關.日本式羅馬字 = true; // 開啓：地 ti 關閉：地 chi。僅當關閉假名時生效。
開關.歷史性音變 = false; // 開啓：宙 チウ tiu 關閉：宙 チュウ tyuu。
開關.綾香的音變 = true; // 開啓：愁 ス su 關閉：愁 スウ suu。僅當關閉歷史性音變時生效，因「充」字演化方向不同。
開關.聲調 = true;

/* 2. 輔助函數 */

const 假名表 = {
  a:  'ア', i:  'イ', u:  'ウ', e:  'エ', o:  'オ',
  ka: 'カ', ki: 'キ', ku: 'ク', ke: 'ケ', ko: 'コ',
  ga: 'ガ', gi: 'ギ', gu: 'グ', ge: 'ゲ', go: 'ゴ',
  sa: 'サ', si: 'シ', su: 'ス', se: 'セ', so: 'ソ',
  za: 'ザ', zi: 'ジ', zu: 'ズ', ze: 'ゼ', zo: 'ゾ',
  ta: 'タ', ti: 'チ', tu: 'ツ', te: 'テ', to: 'ト',
  da: 'ダ', di: 'ヂ', du: 'ヅ', de: 'デ', do: 'ド',
  na: 'ナ', ni: 'ニ', nu: 'ヌ', ne: 'ネ', no: 'ノ',
  pa: 'ハ', pi: 'ヒ', pu: 'フ', pe: 'ヘ', po: 'ホ',
  ba: 'バ', bi: 'ビ', bu: 'ブ', be: 'ベ', bo: 'ボ',
  ma: 'マ', mi: 'ミ', mu: 'ム', me: 'メ', mo: 'モ',
  ya: 'ヤ',           yu: 'ユ',           yo: 'ヨ',
  ra: 'ラ', ri: 'リ', ru: 'ル', re: 'レ', ro: 'ロ',
  wa: 'ワ', wi: 'ヰ',           we: 'ヱ', wo: 'ヲ',
};

const 拗音表 = {
  wya: 'ヰャ', wyo: 'ヰョ',
  ya: 'ャ', yu: 'ュ', yo: 'ョ',
  wa: 'ヮ', wi: '𛅤', we: '𛅥', wo: '𛅦',
};

const 韻尾表 = {
  '': '', i: 'イ', u: 'ウ',
  m: 'ム', n: 'ン', ng: 'ゥ', // ng: 'ィ',
  p: 'フ', t: 'ツ', k: 'ク', // k: 'キ',
};

function roma2kata(s) {
  const r = /^([kgsztdnpbmyrw]?w??[yw]?)([aiueo])([ptkmngiu]*)$/g;
  const match = r.exec(s);
  if (match == null) {
    throw new Error(`無法轉換為假名：${s}`);
  }
  const { 1: 韻頭, 2: 主要元音, 3: 韻尾 } = match;
  let 假名韻尾 = 韻尾表[韻尾];
  if (主要元音 === 'e') {
    if (韻尾 === 'k') 假名韻尾 = 'キ';
    if (韻尾 === 'ng') 假名韻尾 = 'ィ';
  }
  if (韻頭.length <= 1) {
    return 假名表[韻頭 + 主要元音] + 假名韻尾;
  }
  const 填充元音 = 韻頭[1] === 'w' ? 'u' : 'i'; // 韻頭[1] 只可能為 w 或 y，由 regex 限制
  return 假名表[韻頭[0] + 填充元音] + 拗音表[韻頭.slice(1) + 主要元音] + 假名韻尾;
}

function kata2hira(s) {
  const diff = 'ぁ'.charCodeAt(0) - 'ァ'.charCodeAt(0);
  return [...s].map((c) => {
    if (c === '𛅤') return '𛅐';
    if (c === '𛅥') return '𛅑';
    if (c === '𛅦') return '𛅒';
    return String.fromCharCode(c.charCodeAt(0) + diff);
  }).join('');
}

function small2large(s) {
  return [...s].map((c) => {
    if (c === '𛅤') return 'ヰ';
    if (c === '𛅥') return 'ヱ';
    if (c === '𛅦') return 'ヲ';
    return c;
  }).join('');
}

/* 3. 推導規則 */

const is = (x) => 音韻地位.屬於(x);

const is脣音 = is('幫組');
const is舌齒 = is('端知精莊章組 或 來日母');
const is牙喉 = !is脣音 && !is舌齒;
const is舒聲 = is('舒聲');
const is清 = is('幫滂端透知徹精清心莊初生章昌書見溪影曉母');
const is全濁 = is('並定澄從邪崇俟船常羣匣母');

function 聲母規則() {
  if (is('幫滂並母')) return 'p';
  if (is('明母')) {
    if (is('梗攝') && !is('庚耕青韻 入聲')) return 'm';
    return 'b';
  }
  if (is('端透定知徹澄母')) return 't';
  if (is('泥孃母')) {
    if (is('梗攝')) return 'n';
    return 'd';
  }
  if (is('來母')) return 'r';
  if (is('精清從心邪莊初崇生俟章昌船書常母')) return 's';
  if (is('日母')) return 'z';
  if (is('見溪羣曉匣母')) return 'k';
  if (is('疑母')) return 'g';
  if (is('影云以母')) return '';
  throw new Error('無聲母規則');
}

function 韻母規則() {
  if (is('東韻 一等 或 冬韻')) return 'ong';
  if (is('東韻 三等')) {
    if (is('幫滂並母')) return is舒聲 ? 'ong' : 'uk';
    if (is('明母')) return 'ong';
    if (is('精莊章組')) return 'yung';
    if (is舌齒) return is舒聲 ? 'yung' : 'ik';
    if (is('影母')) return is舒聲 ? 'yung' : 'wik';
    if (is牙喉) return is舒聲 ? 'yung' : 'ik';
  }
  if (is('鍾韻')) {
    if (is脣音) return 'ong';
    if (is舌齒 || is牙喉) return 'yong';
  }
  if (is('江韻')) return 'ang';
  if (is('支脂微韻 開口 或 之韻')) return 'i';
  if (is('支脂微韻 合口')) {
    if (is脣音) return 'i';
    if (is舌齒) return 'ui';
    if (is牙喉) return 'wi';
  }
  if (is('模韻')) {
    if (is('影母')) return 'wo';
    return 'o';
  }
  if (is('魚韻')) {
    if (is('莊組')) return 'o';
    if (is舌齒 || is牙喉) return 'yo';
  }
  if (is('虞韻')) {
    if (is脣音) return 'u';
    if (is('來母 或 莊組')) return 'u';
    if (is('知組')) return 'yuu';
    if (is舌齒) return 'yu';
    if (is('以母')) return 'yu';
    if (is牙喉) return 'u';
  }
  if (is('泰佳皆夬韻 開口 或 咍韻')) return 'ai';
  if (is('泰佳皆夬韻 合口 或 灰韻')) return 'wai';
  if (is('祭廢齊韻 開口')) return 'ei';
  if (is('祭齊韻 合口')) return 'wei';
  if (is('廢韻 合口')) return 'wai';
  if (is('痕魂韻')) return 'on';
  if (is('眞韻 開口 或 臻欣韻')) return 'in';
  if (is('元韻 開口')) return 'en';
  if (is('眞韻 合口')) {
    if (is('來母')) return 'in';
    if (is('莊組')) return is舒聲 ? 'on' : 'it';
    if (is舌齒) return is舒聲 ? 'yun' : 'ot';
    if (is牙喉) return 'win';
  }
  if (is('文韻 合口')) return 'un';
  if (is('元韻 合口')) {
    if (is脣音) return 'an';
    if (is牙喉) return 'wen';
  }
  if (is('寒刪山韻 開口')) return 'an';
  if (is('寒刪山韻 合口')) return 'wan';
  if (is('仙先韻 開口')) return 'en';
  if (is('仙先韻 合口')) return 'wen';
  if (is('豪韻')) {
    if (is脣音) return 'ou';
    if (is舌齒 || is牙喉) return 'au';
  }
  if (is('肴韻')) return 'au';
  if (is('宵蕭韻')) return 'eu';
  if (is('歌韻 開口 一等 或 麻韻 開口 二等')) return 'a';
  if (is('歌韻 合口 一等 或 麻韻 合口 二等 或 歌韻 合口 三等')) return 'wa';
  if (is('歌韻 開口 三等 或 麻韻 開口 三等')) return 'ya';
  if (is('唐韻 開口')) return 'ang';
  if (is('唐韻 合口')) return 'wang';
  if (is('陽韻 開口')) {
    if (is脣音) return 'ang';
    if (is('莊組')) return 'ang';
    if (is舌齒) return 'yang';
    if (is牙喉) return 'yang';
  }
  if (is('陽韻 合口')) {
    if (is脣音 || is舌齒) return 'ang';
    if (is('影云母')) return 'wang';
    if (is牙喉) return 'wyang';
  }
  if (is('庚韻 開口 二等 或 耕韻 開口 二等')) {
    if ([...'牲狌猩生甥笙貹鉎鼪'].includes(字頭)) return 'eng';
    return 'ang';
  }
  if (is('庚韻 合口 二等 或 耕韻 合口 二等')) return 'wang';
  if (is('庚韻 開口 三等 或 清青韻 開口')) return 'eng';
  if (is('庚韻 合口 三等 或 清青韻 合口')) return 'weng';
  if (is('登韻')) return 'ong';
  if (is('蒸韻 開口')) {
    if (is('莊組')) return 'ong';
    return 'yong';
  }
  if (is('蒸韻 合口')) {
    if (is脣音 || is舌齒) return 'yong';
    if (is('影云母')) return 'yong';
    if (is牙喉) return 'wyong';
  }
  if (is('侯韻')) return 'ou';
  if (is('尤韻')) {
    if (is('幫滂並母')) return 'uu';
    if (is('明母')) return 'ou';
    if (is('莊組')) return 'uu';
    if (is舌齒) return 'iu';
    if (is牙喉) return 'iu';
  }
  if (is('幽韻')) return 'iu';
  if (is('侵韻')) return 'im';
  if (is('覃談咸銜韻')) return 'am';
  if (is('鹽嚴添韻')) return 'em';
  if (is('凡韻')) {
    if (is脣音) return 'am';
    if (is舌齒 || is牙喉) return 'em';
  }
  throw new Error('無韻母規則');
}

function 聲調規則() {
  if (is清) {
    if (is('平聲')) return 'ˉ';
    if (is('上聲')) return 'ˊ';
    if (is('去聲')) return 'ˋ';
    if (is('入聲')) {
      if (is('通梗曾深攝 或 眞諄臻文欣痕韻') || (is('魂韻') && is牙喉)) return 'ˉ';
      return 'ˇ';
    }
  } else {
    if (is全濁 && is('上聲')) return 'ˇ'; // 全濁上變去
    if (is('上聲')) return 'ˊ';
    if (is('平去入聲')) return 'ˇ';
  }
  throw new Error('無聲調規則');
}

let 聲母 = 聲母規則();
let 韻母 = 韻母規則();
let 聲調 = !開關.聲調 ? '' : 聲調規則();

if (is('入聲')) {
  if (韻母.endsWith('m')) 韻母 = `${韻母.slice(0, -1)}p`;
  else if (韻母.endsWith('n')) 韻母 = `${韻母.slice(0, -1)}t`;
  else if (韻母.endsWith('ng')) 韻母 = `${韻母.slice(0, -2)}k`;
}

if (韻母.startsWith('w') && (!is牙喉 || is('重紐A類 或 以母'))) 韻母 = 韻母.slice(1);

/* 4. 音變規則 */

if (開關.歷史性音變) 開關.綾香的音變 = false; // 二者不可同時開啓

if (開關.歷史性音變) {
  if (韻母.startsWith('w')) 韻母 = 韻母.slice(1); // 園 wen -> en
  if (韻母.endsWith('p')) 韻母 = `${韻母.slice(0, -1)}u`; // 鄴 gep -> geu
  else if (韻母.endsWith('m')) 韻母 = `${韻母.slice(0, -1)}n`; // 南 dam -> dan
  else if (韻母.endsWith('eng')) 韻母 = `${韻母.slice(0, -2)}i`; // 生 seng -> sei
  else if (韻母.endsWith('ng')) 韻母 = `${韻母.slice(0, -2)}u`; // 相 syang -> syau
}

if (開關.歷史性音變 || 開關.綾香的音變) {
  if (韻母.endsWith('au')) 韻母 = `${韻母.slice(0, -2)}ou`; // 高 kau -> kou
  else if (韻母.endsWith('iu')) 韻母 = `${韻母.slice(0, -2)}yuu`; // 宙 tiu -> tyuu
  else if (韻母.endsWith('eu')) 韻母 = `${韻母.slice(0, -2)}you`; // 遙 eu -> you
  else if (韻母.endsWith('ang')) 韻母 = `${韻母.slice(0, -3)}ong`; // 相 syang -> syong
}

if (開關.綾香的音變) {
  if (韻母 === 'uu') 韻母 = `${韻母.slice(0, -1)}`; // 愁 suu -> su
  else if (韻母.endsWith('yung')) 韻母 = `${韻母.slice(0, -1)}`; // 窮 kyung -> kyun
}

if (開關.假名) {
  let 聲韻 = roma2kata(`${聲母}${韻母}`);
  if (!開關.ヰヱヲ小假名) 聲韻 = small2large(聲韻);
  if (!開關.片假名) 聲韻 = kata2hira(聲韻);
  return `${聲韻}${聲調}`;
}

if (開關.歷史性音變 || 開關.綾香的音變) {
  if (聲母 === 'p') 聲母 = 'h'; // 甫 pu -> hu
}

if (開關.歷史性音變) {
  if (韻母.endsWith('t')) 韻母 = `${韻母}u`; // 遏 at -> atu
  else if (韻母.endsWith('ek')) 韻母 = `${韻母}i`; // 席 sek -> seki
  else if (韻母.endsWith('k')) 韻母 = `${韻母}u`; // 澤 tak -> taku
}

if (開關.綾香的音變) {
  if (聲母 === 'r') 聲母 = 'l'; // 籟 rai -> lai
  if (韻母.endsWith('t')) 韻母 = `${韻母.slice(0, -1)}s`; // 遏 at -> as
  else if (韻母.endsWith('p')) 韻母 = `${韻母.slice(0, -1)}f`; // 鄴 gep -> gef
}

if (開關.日本式羅馬字) return `${聲母}${韻母}${聲調}`;

if (開關.歷史性音變 || 開關.綾香的音變) {
  if (聲母 === 's' && 韻母.startsWith('i')) 聲母 = 'sh'; // 四 si -> shi
  else if (聲母 === 'z' && 韻母.startsWith('i')) 聲母 = 'j'; // 人 zin -> jin
  else if (聲母 === 't' && 韻母.startsWith('i')) 聲母 = 'ch'; // 地 ti -> chi
  else if (聲母 === 't' && 韻母.startsWith('u')) 聲母 = 'ts'; // 追 tui -> tsui
  else if (聲母 === 'h' && 韻母.startsWith('u')) 聲母 = 'f'; // 甫 hu -> fu
}

if (開關.歷史性音變) {
  if (聲母 === 's' && 韻母.startsWith('y')) { 聲母 = 'sh'; 韻母 = 韻母.slice(1); } // 相 syou -> shou
  else if (聲母 === 'z' && 韻母.startsWith('y')) { 聲母 = 'j'; 韻母 = 韻母.slice(1); } // 仍 zyou -> jou
  else if (聲母 === 't' && 韻母.startsWith('y')) { 聲母 = 'ch'; 韻母 = 韻母.slice(1); } // 兆 tyou -> chou
  else if (聲母 === 'd' && 韻母.startsWith('i')) 聲母 = 'j'; // 膩 di -> ji
  else if (聲母 === 'd' && 韻母.startsWith('y')) { 聲母 = 'j'; 韻母 = 韻母.slice(1); } // 紐 dyuu -> juu
  if (韻母.endsWith('tu')) 韻母 = `${韻母.slice(0, -1)}su`; // 遏 atu -> atsu
}

if (開關.綾香的音變) {
  if (韻母 !== 'yuu' && 韻母 !== 'yun') {
    if (聲母 === 's' && 韻母.startsWith('y')) { 聲母 = 'sh'; 韻母 = 韻母.slice(1); } // 相 syong -> shong
    else if (聲母 === 't' && 韻母.startsWith('y')) { 聲母 = 'ch'; 韻母 = 韻母.slice(1); } // 兆 tyou -> chou
  }
  if (聲母 === 'z' && 韻母.startsWith('y')) { 聲母 = 'j'; 韻母 = 韻母.slice(1); } // 仍 zyong -> jong
}

return `${聲母}${韻母}${聲調}`;
