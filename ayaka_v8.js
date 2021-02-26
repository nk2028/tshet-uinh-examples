/* 綾香思考音系
 * https://ayaka.shn.hk/v8/
 *
 * 説明
 * 以下內容為生成綾香思考音系的函數體
 * 函數接受音韻地位，返回對應的綾香思考音系拼音
 */

// 1. 開關

const 開關 = {
  // '平假名': 地 ち
  // '片假名': 地 チ
  // '日本式羅馬字': 地 ti
  // '平文式羅馬字': 地 chi
  書寫系統: '日本式羅馬字',

  // true: 迥 ク𛅥ィ
  // false: 迥 クヱィ
  // 僅當開啓假名時生效
  ヰヱヲ小假名: true,

  // null: 宙 チウ tiu；南 ダム dam；愁 スウ suu
  // '日語': 宙 チュウ tyuu；南 ダン dan；愁 スウ suu
  // '綾香': 宙 チュウ tyuu；南 ダム dam；愁 ス su
  音變: '綾香',

  // null: 無聲調
  // '漢音八聲': 八聲家的聲調
  // '綾香': 綾香的聲調
  聲調: '綾香',
};

// 2. 輔助函數

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
  const r = /^([kgsztdnpbmyrw]?w??[yw]?)([aiueo])([ptkmngiu]*)$/g; // 將音節分為韻頭、主要元音及韻尾
  const match = r.exec(s);
  if (match == null) {
    throw new Error('無法轉換為假名：' + s);
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
  const 填充元音 = 韻頭[1] === 'w' ? 'u' : 'i'; // 韻頭[1] 只能為 w 或 y
  return 假名表[韻頭[0] + 填充元音] + 拗音表[韻頭.slice(1) + 主要元音] + 假名韻尾;
}

function kata2hira(s) {
  const diff = 'ぁ'.charCodeAt(0) - 'ァ'.charCodeAt(0);
  return [...s].map((c) => {
    switch (c) {
      case '𛅤': return '𛅐';
      case '𛅥': return '𛅑';
      case '𛅦': return '𛅒';
      default: return String.fromCharCode(c.charCodeAt(0) + diff);
    }
  }).join('');
}

function small2large(s) {
  return [...s].map((c) => {
    switch (c) {
      case '𛅤': return 'ヰ';
      case '𛅥': return 'ヱ';
      case '𛅦': return 'ヲ';
      default: return c;
    }
  }).join('');
}

// 3. 推導規則

const is = (x) => 音韻地位.屬於(x);

function 聲母規則() {
  // 幫組
  if (is('幫滂並母')) return 'p';
  if (is('明母')) return is('梗攝') && !is('庚耕青韻 入聲') ? 'm' : 'b';

  // 端組、來母
  if (is('端透定母')) return 't';
  if (is('泥母')) return is('梗攝') ? 'n' : 'd';
  if (is('來母')) return 'r';

  // 知組
  if (is('知徹澄母')) return 't';
  if (is('孃母')) return is('梗攝') ? 'n' : 'd';

  // 精組
  if (is('精清從心邪母')) return 's';

  // 莊組
  if (is('莊初崇生俟母')) return 's';

  // 章組、日母
  if (is('章昌船書常母')) return 's';
  if (is('日母')) return 'z';

  // 見組
  if (is('見溪羣母')) return 'k';
  if (is('疑母')) return 'g';

  // 影組、以母
  if (is('影母')) return '';
  if (is('曉匣母')) return 'k';
  if (is('云以母')) return '';

  throw new Error('無聲母規則');
}

function 韻母規則() {
  // 通攝
  if (is('東韻 一等')) return 'ong';
  if (is('東韻 三等 幫滂並母')) return is('舒聲') ? 'ong' : 'uk';
  if (is('東韻 三等 明母')) return 'ong';
  if (is('東韻 三等 精莊章組')) return 'yung';
  if (is('東韻 三等 舌齒音')) return is('舒聲') ? 'yung' : 'ik';
  if (is('東韻 三等 影母')) return is('舒聲') ? 'yung' : 'wik';
  if (is('東韻 三等 牙喉音')) return is('舒聲') ? 'yung' : 'ik';
  if (is('冬韻')) return 'ong';
  if (is('鍾韻 脣音')) return 'ong';
  if (is('鍾韻')) return 'yong';

  // 江攝
  if (is('江韻')) return 'ang';

  // 止攝
  if (is('支脂之微韻 脣音')) return 'i';
  if (is('支脂之微韻 開口')) return 'i';
  if (is('支脂之微韻 合口 舌齒音')) return 'ui';
  if (is('支脂之微韻 合口 牙喉音')) return 'wi';

  // 遇攝
  if (is('魚韻 莊組')) return 'o';
  if (is('魚韻 舌齒音')) return 'yo';
  if (is('魚韻 牙喉音')) return 'yo';
  if (is('虞韻 脣音')) return 'u';
  if (is('虞韻 來母')) return 'u';
  if (is('虞韻 知組')) return 'yuu';
  if (is('虞韻 莊組')) return 'u';
  if (is('虞韻 舌齒音')) return 'yu';
  if (is('虞韻 以母')) return 'yu';
  if (is('虞韻 牙喉音')) return 'u';
  if (is('模韻 幫組')) return 'o';
  if (is('模韻 舌齒音')) return 'o';
  if (is('模韻 影母')) return 'wo';
  if (is('模韻 牙喉音')) return 'o';

  // 蟹攝
  if (is('祭齊韻 脣音')) return 'ei';
  if (is('祭齊韻 開口')) return 'ei';
  if (is('祭齊韻 合口')) return 'wei';
  if (is('泰佳皆夬韻 脣音')) return 'ai';
  if (is('泰佳皆夬韻 開口')) return 'ai';
  if (is('泰佳皆夬韻 合口')) return 'wai';
  if (is('灰韻')) return 'wai';
  if (is('咍韻')) return 'ai';
  if (is('廢韻 脣音')) return 'ei';
  if (is('廢韻 開口')) return 'ei';
  if (is('廢韻 合口')) return 'wai';

  // 臻攝
  if (is('眞韻 脣音')) return 'in';
  if (is('眞韻 開口')) return 'in';
  if (is('眞韻 合口 來母')) return 'in';
  if (is('眞韻 合口 莊組')) return is('舒聲') ? 'on' : 'it';
  if (is('眞韻 合口 舌齒音')) return is('舒聲') ? 'yun' : 'ot';
  if (is('眞韻 合口 云母')) return 'win';
  if (is('眞韻 合口 牙喉音')) return 'in';
  if (is('臻韻')) return 'in';
  if (is('文韻')) return 'un';
  if (is('欣韻')) return 'in';
  if (is('元韻 脣音')) return 'an';
  if (is('元韻 開口')) return 'en';
  if (is('元韻 合口')) return 'wen';
  if (is('魂痕韻')) return 'on';

  // 山攝
  if (is('寒刪山韻 脣音')) return 'an';
  if (is('寒刪山韻 開口')) return 'an';
  if (is('寒刪山韻 合口')) return 'wan';
  if (is('仙先韻 脣音')) return 'en';
  if (is('仙先韻 開口')) return 'en';
  if (is('仙先韻 合口')) return 'wen';

  // 效攝
  if (is('蕭宵韻')) return 'eu';
  if (is('肴韻')) return 'au';
  if (is('豪韻 脣音')) return 'ou';
  if (is('豪韻 舌齒音')) return 'au';
  if (is('豪韻 牙喉音')) return 'au';

  // 果攝
  if (is('歌韻 一等 脣音')) return 'a';
  if (is('歌韻 一等 開口')) return 'a';
  if (is('歌韻 一等 合口')) return 'wa';
  if (is('歌韻 三等 開口')) return 'ya';
  if (is('歌韻 三等 合口')) return 'wa';

  // 假攝
  if (is('麻韻 二等 脣音')) return 'a';
  if (is('麻韻 二等 開口')) return 'a';
  if (is('麻韻 二等 合口')) return 'wa';
  if (is('麻韻 三等 脣音')) return 'ya';
  if (is('麻韻 三等 開口')) return 'ya';

  // 宕攝
  if (is('陽韻 脣音')) return 'ang';
  if (is('陽韻 開口 莊組')) return 'ang';
  if (is('陽韻 開口 舌齒音')) return 'yang';
  if (is('陽韻 開口 牙喉音')) return 'yang';
  if (is('陽韻 合口 舌齒音')) return 'ang';
  if (is('陽韻 合口 影云母')) return 'wang';
  if (is('陽韻 合口 牙喉音')) return 'wyang';
  if (is('唐韻 脣音')) return 'ang';
  if (is('唐韻 開口')) return 'ang';
  if (is('唐韻 合口')) return 'wang';

  // 梗攝
  if (is('庚韻 二等 脣音')) return 'ang';
  if (is('庚韻 二等 開口')) return 'ang';
  if (is('庚韻 二等 合口')) return 'wang';
  if (is('庚韻 三等 脣音')) return 'eng';
  if (is('庚韻 三等 開口')) return 'eng';
  if (is('庚韻 三等 合口')) return 'weng';
  if (is('耕韻')) return 'wang';
  if (is('清青韻 脣音')) return 'eng';
  if (is('清青韻 開口')) return 'eng';
  if (is('清青韻 合口')) return 'weng';

  // 曾攝
  if (is('蒸韻 脣音')) return 'yong';
  if (is('蒸韻 開口 莊組')) return 'ong';
  if (is('蒸韻 開口 舌齒音')) return 'yong';
  if (is('蒸韻 開口 牙喉音')) return 'yong';
  if (is('蒸韻 合口 影云母')) return 'yong';
  if (is('蒸韻 合口 牙喉音')) return 'wyong';
  if (is('登韻')) return 'ong';

  // 流攝
  if (is('尤韻 幫滂並母')) return 'uu';
  if (is('尤韻 明母')) return 'ou';
  if (is('尤韻 莊組')) return 'uu';
  if (is('尤韻 舌齒音')) return 'iu';
  if (is('尤韻 牙喉音')) return 'iu';
  if (is('侯韻')) return 'ou';
  if (is('幽韻')) return 'iu';

  // 深攝
  if (is('侵韻')) return 'im';

  // 咸攝
  if (is('覃談韻')) return 'am';
  if (is('鹽添嚴韻')) return 'em';
  if (is('咸銜凡韻')) return 'am';

  throw new Error('無韻母規則');
}

function 聲調規則() {
  if (開關.聲調 === '漢音八聲') {
    if (!is('全濁')) {
      if (is('平聲')) return '꜀';
      if (is('上聲')) return '꜂';
      if (is('去聲')) return '꜄';
      if (is('入聲')) return '꜆';
    } else {
      if (is('平聲')) return '꜁';
      if (is('上聲')) return '꜃';
      if (is('去聲')) return '꜅';
      if (is('入聲')) return '꜇';
    }
    throw new Error('無聲調規則');
  } else if (開關.聲調 === '綾香') {
    if (is('全清 或 次清')) {
      if (is('平聲')) return 'ˉ';
      if (is('上聲')) return 'ˊ';
      if (is('去聲')) return 'ˋ';
      if (is('入聲')) return is('通梗曾深攝 或 眞臻文欣痕韻 或 魂韻 牙喉音') ? 'ˉ' : 'ˇ';
    } else {
      if (is('平聲')) return 'ˇ';
      if (is('上聲')) return is('全濁') ? 'ˇ' : 'ˊ';
      if (is('去聲')) return 'ˇ';
      if (is('入聲')) return 'ˇ';
    }
    throw new Error('無聲調規則');
  }
  return '';
}

let 聲母 = 聲母規則();
let 韻母 = 韻母規則();
let 聲調 = 聲調規則();

if (is('入聲')) {
  if (韻母.endsWith('m')) 韻母 = 韻母.slice(0, -1) + 'p';
  else if (韻母.endsWith('n')) 韻母 = 韻母.slice(0, -1) + 't';
  else if (韻母.endsWith('ng')) 韻母 = 韻母.slice(0, -2) + 'k';
}

if (韻母.startsWith('w') && (!is('牙喉音') || is('重紐A類 或 以母'))) 韻母 = 韻母.slice(1);

// 4. 音變規則

if (開關.音變 === '日語') {
  if (韻母.startsWith('w')) 韻母 = 韻母.slice(1); // 園 wen -> en

  if (韻母.endsWith('p')) 韻母 = 韻母.slice(0, -1) + 'u'; // 鄴 gep -> geu
  else if (韻母.endsWith('m')) 韻母 = 韻母.slice(0, -1) + 'n'; // 南 dam -> dan
  else if (韻母.endsWith('eng')) 韻母 = 韻母.slice(0, -2) + 'i'; // 生 seng -> sei
  else if (韻母.endsWith('ng')) 韻母 = 韻母.slice(0, -2) + 'u'; // 相 syang -> syau
}

if (['日語', '綾香'].includes(開關.音變)) {
  if (韻母.endsWith('au')) 韻母 = 韻母.slice(0, -2) + 'ou'; // 高 kau -> kou
  else if (韻母.endsWith('iu')) 韻母 = 韻母.slice(0, -2) + 'yuu'; // 宙 tiu -> tyuu
  else if (韻母.endsWith('eu')) 韻母 = 韻母.slice(0, -2) + 'you'; // 遙 eu -> you
  else if (韻母.endsWith('ang')) 韻母 = 韻母.slice(0, -3) + 'ong'; // 相 syang -> syong
}

if (開關.音變 === '綾香') {
  if (韻母 === 'uu') 韻母 = 韻母.slice(0, -1); // 愁 suu -> su
  else if (韻母.endsWith('yung')) 韻母 = 韻母.slice(0, -1); // 窮 kyung -> kyun
}

let 聲韻;

if (['平假名', '片假名'].includes(開關.書寫系統)) {
  聲韻 = roma2kata(聲母 + 韻母);
  if (!開關.ヰヱヲ小假名) 聲韻 = small2large(聲韻);
  if (開關.書寫系統 === '平假名') 聲韻 = kata2hira(聲韻);
} else {
  if (['日語', '綾香'].includes(開關.音變)) {
    if (聲母 === 'p') 聲母 = 'h'; // 甫 pu -> hu
  }

  if (開關.音變 === '日語') {
    if (韻母.endsWith('t')) 韻母 = 韻母 + 'u'; // 遏 at -> atu
    else if (韻母.endsWith('ek')) 韻母 = 韻母 + 'i'; // 席 sek -> seki
    else if (韻母.endsWith('k')) 韻母 = 韻母 + 'u'; // 澤 tak -> taku
  }

  if (開關.音變 === '綾香') {
    if (聲母 === 'r') 聲母 = 'l'; // 籟 rai -> lai
    if (韻母.endsWith('t')) 韻母 = 韻母.slice(0, -1) + 's'; // 遏 at -> as
    else if (韻母.endsWith('p')) 韻母 = 韻母.slice(0, -1) + 'f'; // 鄴 gep -> gef

    if (韻母.endsWith('eng')) 韻母 = 韻母.slice(0, -3) + 'ein'; // 傾 keng -> kein
    else if (韻母.endsWith('ong')) 韻母 = 韻母.slice(0, -3) + 'oun'; // 同 tong -> toun
  }

  if (開關.書寫系統 === '平文式羅馬字') {
    if (['日語', '綾香'].includes(開關.音變)) {
      if (聲母 === 's' && 韻母.startsWith('i')) 聲母 = 'sh'; // 四 si -> shi
      else if (聲母 === 'z' && 韻母.startsWith('i')) 聲母 = 'j'; // 人 zin -> jin
      else if (聲母 === 't' && 韻母.startsWith('i')) 聲母 = 'ch'; // 地 ti -> chi
      else if (聲母 === 't' && 韻母.startsWith('u')) 聲母 = 'ts'; // 追 tui -> tsui
      else if (聲母 === 'h' && 韻母.startsWith('u')) 聲母 = 'f'; // 甫 hu -> fu
      else if (聲母 === 's' && 韻母.startsWith('y')) { 聲母 = 'sh'; 韻母 = 韻母.slice(1); } // 小 syou -> shou
      else if (聲母 === 'z' && 韻母.startsWith('y')) { 聲母 = 'j'; 韻母 = 韻母.slice(1); } // 繞 zyou -> jou
      else if (聲母 === 't' && 韻母.startsWith('y')) { 聲母 = 'ch'; 韻母 = 韻母.slice(1); } // 兆 tyou -> chou
    }

    if (開關.音變 === '日語') {
      if (聲母 === 'd' && 韻母.startsWith('i')) 聲母 = 'j'; // 膩 di -> ji
      else if (聲母 === 'd' && 韻母.startsWith('y')) { 聲母 = 'j'; 韻母 = 韻母.slice(1); } // 紐 dyuu -> juu

      if (韻母.endsWith('tu')) 韻母 = 韻母.slice(0, -1) + 'su'; // 遏 atu -> atsu
    }
  }

  聲韻 = 聲母 + 韻母;
}

return [...'꜀꜁꜂꜃'].includes(聲調) ? 聲調 + 聲韻 : 聲韻 + 聲調;
