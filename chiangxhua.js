/* 推導《聲音唱和圖》擬音
 *
 * 暫無擬音說明文章，一些擬音重點在代碼中以注釋寫出
 *
 * @author unt
 */

// 代碼中的音韻表達式使用了全角半角空格用於對齊，需要進行移除
const is = (x) => 音韻地位.屬於(x.replace(/ +/g, ' ').replace(/　/g, '').trim());

if (!音韻地位) return [
  ['顯示', [3, '音位', '音值', '音位及音值']],
  ['聲調用調類表示', false], // 打開則用 ¹²³⁴ 表示（分別為平上去入），關閉則用國際音標的附加符號表示
  ['省略唇音後的w介音', true], // 僅用於音值。打開則“八”/pʕʷɐ/ -> [pa]，關閉則 /pʕʷɐ/ -> [pwa]
];

function 聲母規則() {
  if (is('幫滂母 東鍾微虞廢文元陽尤凡韻 三等')) return 'f';
  if (is('並　母 東鍾微虞廢文元陽尤凡韻 三等')) return 'v';
  if (is('明　母 　鍾微虞廢文元陽　凡韻 上聲')) return 'ˀʋ';
  if (is('明　母 　鍾微虞廢文元陽　凡韻 　　')) return 'ʋ';
  if (is('幫　母 　　')) return 'p';
  if (is('滂　母 　　')) return 'pʰ';
  if (is('並　母 仄聲')) return 'b';
  if (is('並　母 平聲')) return 'bʰ';
  if (is('明　母 上聲')) return 'ˀm';
  if (is('明　母 　　')) return 'm';
  if (is('端　母 　　')) return 't';
  if (is('透　母 　　')) return 'tʰ';
  if (is('定　母 仄聲')) return 'd';
  if (is('定　母 平聲')) return 'dʰ';
  if (is('泥孃母 上聲')) return 'ˀn';
  if (is('泥孃母 　　')) return 'n';
  if (is('知　母 　　')) return 'tɻ';
  if (is('徹　母 　　')) return 'tɻʰ';
  if (is('澄　母 仄聲')) return 'dɻ';
  if (is('澄　母 平聲')) return 'dɻʰ';
  if (is('精　母 　　')) return 'ts';
  if (is('清　母 　　')) return 'tsʰ';
  if (is('從　母 仄聲')) return 'dz';
  if (is('從　母 平聲')) return 'dzʰ';
  if (is('心　母 　　')) return 's';
  if (is('邪　母 　　')) return 'z';
  if (is('莊章母 　　')) return 'tʂ';
  if (is('初昌母 　　')) return 'tʂʰ';
  if (is('崇　母 仄聲') && '撰饌棧助寨砦乍狀驟'.includes(字頭)) return 'dʐ'; // 特例：乍
  if (is('船　母 平聲') && '晨船荼乘'.includes(字頭)) return 'dʐʰ'; // 推斷的特例
  if (is('崇常母 平聲')) return 'dʐʰ';
  if (is('生書母 　　')) return 'ʂ';
  if (is('崇常母 仄聲')) return 'ʐ';
  if (is('俟船母 　　')) return 'ʐ';
  if (is('見　母 　　')) return 'k';
  if (is('溪　母 　　')) return 'kʰ';
  if (is('羣　母 仄聲')) return 'ɡ';
  if (is('羣　母 平聲')) return 'ɡʰ';
  if (is('疑　母 上聲')) return 'ˀŋ';
  if (is('疑　母 　　')) return 'ŋ';
  if (is('曉　母 　　')) return 'x';
  if (is('云　母 　　') && '雄熊'.includes(字頭)) return 'ɣ'; // 特例：雄
  if (is('匣　母 　　') && '肴餚殽爻倄'.includes(字頭)) return ''; // 特例：爻
  if (is('匣　母 　　')) return 'ɣ';
  if (is('影　母 　　')) return 'ˀ';
  if (is('云以母 上聲')) return 'ˀ'; // 推斷
  if (is('云以母 　　')) return '';
  if (is('來　母 上聲')) return 'ˀl';
  if (is('來　母 　　')) return 'l';
  if (is('日　母 上聲')) return 'ˀɻ';
  if (is('日　母 　　')) return 'ɻ';
  throw new Error('無聲母規則');
}

function 介音規則() {
  // IV  等：j
  // III 等：ɉ
  // II  等：ʕ
  // I   等：無
  if (is('端精組 或 孃來母')) {
    if (is('泥母 咍韻 開口 上聲')) return ''; // 特例：乃。可能是因為 II 等被“嬭”小韻（中古孃母）佔據了。來母蟹攝二等僅“唻”一字，推測不影響咍泰韻 II 等化，故不考慮來母
    if (is('泥母 咍泰韻 開口')) return ''; // 據“乃”類推
    if (is('二等 或 咍泰寒覃談韻 開口')) return 'ʕ';
    if (is('一等')) return '';
    if (is('精組 止攝 開口')) return ''; // 中古後期發生 sjᵻ & sɉᵻ > sᵻ，變 I 等
    if (is('三四等')) return 'ɉ'; // 一律歸 III 等
  };
  if (is('知組 二等 或 莊組')) return 'ʕ';
  if (is('知組 三等 或 章組 或 日母')) return 'ɉ';
  // “茝、佁”之類字不作考慮
  // 其餘是鈍音和以母
  if (is('幫組 三等')) { // 處理輕唇化的韻
    if (is('微廢韻')) return 'j'; // [fi] 被列入 IV 等
    if (is('元凡韻')) return 'ʕ';
    if (is('東鍾虞文陽尤韻')) return ''; // 據現代方言推斷陽韻輕唇化後是 I 等
  }
  if (is('四等 或 重紐A類 或 以母 或 清幽韻')) return 'j'; // IV 等
  if (is('三等')) return 'ɉ'; // 其餘的切韻三等是 III 等
  if (is('二等')) return 'ʕ';
  if (is('一等')) return '';
  throw new Error('無介音規則');
}

function 唇化規則() {
  if (is('止臻攝 幫組 重紐B類')) return 'ʷ'; // 幫組 III 等推測已經發生了 ᵻ > ᵻj 的裂化（和見組合口 ᵻ > ᵻj 平行）。ᵻj III、IV 等舒聲只有合口
  if (is('幫組 流通深咸攝')) return ''; // 幫組一等除這四攝外，都算合口
  if (is('幫組 二等 梗蟹攝')) return ''; // 幫組二等這兩攝非常不像合口，不算合口
  if (is('幫組 一二等 或 合口 或 鍾虞模韻')) return 'ʷ'; // 其他一二等推測都算合口
  if (is('幫組 鍾虞文陽韻')) return 'ʷ'; // 輕唇變一等的
  if (is('幫組 元韻')) return 'ʷ'; // 輕唇變二等的（凡韻已經被排除），也是合口。因為“八”列在合口
  // 注意，咸深攝舒聲入聲都視為開口，不依原圖定義

  if (is('江韻 知莊組 或 江韻 孃來母')) return 'ʷ'; // 據《蒙古字韻》推斷，且“雙、霜”需要靠開合對立
  return '';
}

function 韻基規則() {
  // 遇攝
  if (is('遇攝 　　　　')) return 'ʊ ';
  // 止攝
  if (is('止攝 幫組 重紐B類')) return 'ᵻj'; // 幫組 III 等推測已經發生了 ᵻ > ᵻj 的裂化（和見組合口 ᵻ > ᵻj 平行）
  if (is('止攝 莊組　　')) return 'ᵻ '; // 衰、帥
  if (is('止攝 合口　　')) return 'ᵻj';
  if (is('止攝 　　　　')) return 'ᵻ '; // [i] 的音位也可分析为 jᵻj，但邵雍的分析是 jᵻ，排在 ᵻ 韻基一行
  // 蟹攝
  if (is('蟹攝 一二等　')) return 'ɐj'; // 二等今讀 [a] 的字不作考慮
  if (is('蟹攝 合口　　')) return 'ᵻj'; // 三四等合口。推斷
  if (is('蟹攝 　　　　')) return 'ᵻ '; // 三四等開口。“妻”排在 ᵻ 韻基一行，說明 [jej] 之類的音已經併入 [i]
  // 果假攝
  if (is('果假攝 　　　')) return 'ɐ ';
  // 流攝
  if (is('流攝 　　　　')) return 'ᵻw';
  // 效攝
  if (is('效攝 　　　　')) return 'ɐw';
  // 臻攝
  if (is('臻攝 幫組 重紐B類 入聲')) return 'ᵻj'; // 推測和止攝一樣 ᵻ > ᵻj（“筆”）
  if (is('元韻 　　　　')) return is('舒聲') ? 'ɐn' : 'ɐ ';
  if (is('臻攝 　　　　')) return is('舒聲') ? 'ᵻn' : 'ᵻ '; // ʊ 無入聲，推斷文韻幫組入聲韻基只能是 ᵻ。就像南昌話“骨”經歷 kut > kul > kuɨʔ > kuʔ 的演變。入聲（“紇”）韻基也推測為 ᵻ
  // 山攝
  if (is('山攝 　　　　')) return is('舒聲') ? 'ɐn' : 'ɐ ';
  // 曾梗攝
  if (is('曾梗攝 一二等')) return is('舒聲') ? 'ᵻŋ' : 'ᵻj'; // 入聲韻基為推測，因為“窄、虱”今不同韻所以韻基不能是 ᵻ
  if (is('曾梗攝 　　　')) return is('舒聲') ? 'ᵻŋ' : 'ᵻ '; // 三四等。開口入聲只能是 [i]，合口入聲也推測為 ᵻ。《蒙古字韻》中合口入聲是 ᵻj 韻基（ÿue 或 ue），但現代方言未見，不採用
  // 通攝
  if (is('通攝 　　　　')) return is('舒聲') ? 'ʊŋ' : 'ᵻw'; // ʊ 無入聲，推斷東一入聲韻基只能是 ᵻw。又推斷冬韻併入東一
  // 宕江韻
  if (is('宕江攝 　　　')) return is('舒聲') ? 'ɐŋ' : 'ɐw';
  // 深攝
  if (is('深攝 　　　　')) return is('舒聲') ? 'ᵻm' : 'ᵻʋ'; // 南昌話“骨”kul 也可以視為和“滾、棍”kun 只有聲調差別（因為 n、l 是同一音位）。這裡 ʋ 就是聲母中的微母，它有鼻音變體絲毫不奇怪
  // 咸攝
  if (is('咸攝 　　　　')) return is('舒聲') ? 'ɐm' : 'ɐʋ';
  throw new Error('無韻基規則');
}

function 聲調規則() {
  if (is('平聲 　　')) return '̀';
  if (is('上聲 全濁')) return '̌'; // 推斷全濁上已經歸陽去
  if (is('上聲 　　')) return '́';
  if (is('去聲 　　')) return '̌';
  if (is('入聲 　　')) return '̆';
  throw new Error('無聲調規則');
}

function 調類規則() {
  if (is('平聲 　　')) return '¹';
  if (is('上聲 全濁')) return '³'; // 推斷全濁上已經歸陽去
  if (is('上聲 　　')) return '²';
  if (is('去聲 　　')) return '³';
  if (is('入聲 　　')) return '⁴';
  throw new Error('無聲調規則');
}

let 聲母 = 聲母規則();
let 介音 = 介音規則();
let 唇化 = 唇化規則();
let 韻基 = 韻基規則().trim(); // 移除韻母末尾可能的空格
let 韻核 = 韻基[0];
let 韻尾 = 韻基.substring(1);
let 聲調 = 選項.聲調用調類表示 ? 調類規則() : 聲調規則();

let 音位 = '';
let 音值 = '';

if (選項.聲調用調類表示) {
  音位 = 聲母 + 介音 + 唇化 + 韻核 + 韻尾 + 聲調;
} else {
  音位 = 聲母 + 介音 + 唇化 + 韻核 + 聲調 + 韻尾;
}

if (選項.顯示 === '音位') return 音位;

// 接下來對音位應用音系規則，生成音值

// /ʊ/ 的實現與等無關，單獨處理
if (韻核 === 'ʊ' && 唇化) {
  韻核 = 'u';
}

// /ᵻ/ 和 /ɐ/ 的實現
if (介音 === 'j') { // IV 等
  if (韻核 === 'ᵻ') {
    if (韻尾 === 'ʋ' || 韻尾 === 'm') {
      韻核 = 'ɨ';
    } else if (唇化 && 'jw'.includes(韻尾)) { // 合口，且韻尾是 j、w 或無韻尾
      韻核 = 'ʉ';
    } else {
      韻核 = 'i';
    }
  } else if (韻核 === 'ɐ' && 韻尾 !== 'ŋ') { // jɐŋ 仍是 jɐŋ
    韻核 = 'ɛ';
  }
} else if (介音 === 'ɉ') { // III 等
  if (韻核 === 'ᵻ') {
    韻核 = 唇化 ? 'ʉ' : 'ɨ';
  } // III 等 /ɐ/ 就實現為 [ɐ]
} else if (介音 === 'ʕ') { // II 等
  if (韻核 === 'ᵻ') {
    if (韻尾 === 'j' || 韻尾 === 'ŋ') {
      韻核 = 'ɛ'; // 構擬音值介於 [ɛ]、[ɜ] 之間，寫 [ɛ]
    } else if (韻尾 === '') {
      if (唇化) {
        韻核 = 'ɛ';
        韻尾 = 'ɻ';
      } else {
        韻核 = 'ɻ̍';
      }
    } else {
      韻核 = 唇化 ? 'u' : 'ə'; // 同 I 等
    }
  } else if (韻核 === 'ɐ') {
    韻核 = 'a';
  }
} else { // I 等
  if (韻核 === 'ᵻ') {
    韻核 = 唇化 ? 'u' : 'ə';
    if (韻尾 === '') {
      if (is('精組') && !唇化) {
        韻核 = 'ɹ̩';
      } else {
        韻尾 = 'ɹ'; // 卒、麧
      }
    }
  } else if (韻核 === 'ɐ') {
    if (唇化) {
      if (韻尾 === 'j') {
        韻核 = 'ɵ'; // wɐj 更加高化
      } else if (韻尾 !== 'ŋ') { // wɐŋ 仍是 wɐŋ，其他的合口韻核是 ɔ
        韻核 = 'ɔ';
      }
    } else if (韻尾 === '' && !唇化) {
      韻核 = 'ʌ'; // 歌韻更加高化
    }
  }
}

if (介音[0] === 'ɉ') {
  介音 = 'j̈';
}

// 移除 ʕ，因為 II 等已由單獨的 ɛ、a 或捲舌聲母標記
if (介音 === 'ʕ') {
  介音 = '';
}

// 唇化坍縮到介音上
if (唇化) {
  if (介音[0] === 'j') {
    介音 = 介音.replace('j', 'ɥ'); // III、IV 等
  } else {
    介音 = is('幫組') && 選項.省略唇音後的w介音 ? '' : 'w'; // I、II 等直接是 w 介音，但唇音后省略
  }
}

if (選項.聲調用調類表示) {
  音值 = 聲母 + 介音 + 韻核 + 韻尾 + 聲調;
} else {
  音值 = 聲母 + 介音 + 韻核 + 聲調 + 韻尾;
}

// 移除元音同部位近音
音值 = 音值.replace('ji', 'i');
音值 = 音值.replace('j̈ɨ', 'ɨ');
音值 = 音值.replace('ɥ̈ʉ', 'ʉ');
音值 = 音值.replace('wu', 'u');

if (選項.顯示 === '音值') return 音值;

return 音位 + ' \n[' + 音值 + ']';
