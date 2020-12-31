/* 綾香思考音系
 * https://ayaka.shn.hk/v8/
 *
 * 説明
 * 以下內容為生成綾香思考音系的函數體
 * 函數接受音韻地位，返回對應的綾香思考音系拼音
 */

/* 1. 開關 */

const 開關 = {};

開關.假名 = false;
開關.ヰヱヲ小假名 = true; // 僅當開啓假名時生效
開關.歷史性音變 = true;
開關.綾香的音變 = true;
開關.聲調 = true;

if (開關.綾香的音變) {
	開關.歷史性音變 = false; // 當開啓綾香的音變時，關閉歷史性音變，因「充」字演化方向不同
}

/* 2. 輔助函數 */

ROMA_MAP = {
	'a':  'ア', 'i':  'イ', 'u':  'ウ', 'e':  'エ', 'o':  'オ',
	'ka': 'カ', 'ki': 'キ', 'ku': 'ク', 'ke': 'ケ', 'ko': 'コ',
	'ga': 'ガ', 'gi': 'ギ', 'gu': 'グ', 'ge': 'ゲ', 'go': 'ゴ',
	'sa': 'サ', 'si': 'シ', 'su': 'ス', 'se': 'セ', 'so': 'ソ',
	'za': 'ザ', 'zi': 'ジ', 'zu': 'ズ', 'ze': 'ゼ', 'zo': 'ゾ',
	'ta': 'タ', 'ti': 'チ', 'tu': 'ツ', 'te': 'テ', 'to': 'ト',
	'da': 'ダ', 'di': 'ヂ', 'du': 'ヅ', 'de': 'デ', 'do': 'ド',
	'na': 'ナ', 'ni': 'ニ', 'nu': 'ヌ', 'ne': 'ネ', 'no': 'ノ',
	'ha': 'ハ', 'hi': 'ヒ', 'hu': 'フ', 'he': 'ヘ', 'ho': 'ホ',
	'ba': 'バ', 'bi': 'ビ', 'bu': 'ブ', 'be': 'ベ', 'bo': 'ボ',
	'ma': 'マ', 'mi': 'ミ', 'mu': 'ム', 'me': 'メ', 'mo': 'モ',  
	'ya': 'ヤ',             'yu': 'ユ',             'yo': 'ヨ',
	'ra': 'ラ', 'ri': 'リ', 'ru': 'ル', 're': 'レ', 'ro': 'ロ',
	'wa': 'ワ', 'wi': 'ヰ',             'we': 'ヱ', 'wo': 'ヲ',
}

ROMA_韻尾 = {
	'': '',
	'p': 'フ', 't': 'ツ', 'k': 'ク', // 'g': 'キ',
	'm': 'ム', 'n': 'ン', 'ng': 'ゥ', // 'ng': 'ィ',
	'i': 'イ', 'u': 'ウ',
}

ROMA_拗音 = {
	'wya': 'ヰャ', 'wyo': 'ヰョ',
	'ya': 'ャ', 'yu': 'ュ', 'yo': 'ョ',
	'wa': 'ヮ', 'wi': '𛅤', 'we': '𛅥', 'wo': '𛅦',
}

function roma2kana(s) {
	const r = /^([kgsztdnhbmyrw]?w??[yw]?)([aiueo])([ptkmngiu]*)$/g;
	const match = r.exec(s);
	if (match == null) {
		throw new Error(`無法轉換為假名：${s}`);
	}
	const { 1: 韻頭, 2: 主要元音, 3: 韻尾 } = match;
	let 假名韻尾 = ROMA_韻尾[韻尾];
	if (主要元音 === 'e') {
		if (韻尾 === 'k') 假名韻尾 = 'キ';
		if (韻尾 === 'ng') 假名韻尾 = 'ィ';
	}
	if (韻頭.length <= 1) {
		return ROMA_MAP[韻頭 + 主要元音] + 假名韻尾;
	}
	填充元音 = 韻頭[1] === 'w' ? 'u' : 'i'; // 韻頭[1] can only be 'w' or 'y', restricted by the regex
	return ROMA_MAP[韻頭[0] + 填充元音] + ROMA_拗音[韻頭.substr(1) + 主要元音] + 假名韻尾;
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
	if (is('幫滂並母')) return 'h';
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
	if (is('眞韻 合口')) return 'win';
	if (is('諄韻')) {
		if (is('來母')) return 'in';
		if (is('莊組')) return is舒聲 ? 'on' : 'it';
		if (is舌齒) return is舒聲 ? 'yun' : 'ot';
		if (is牙喉) return 'in';
	}
	if (is('文韻 合口')) return 'un';
	if (is('元韻 合口')) {
		if (is脣音) return 'an';
		if (is牙喉) return 'wen';
	}
	if (is('寒韻 或 刪山韻 開口')) return 'an';
	if (is('桓韻 或 刪山韻 合口')) return 'wan';
	if (is('仙先韻 開口')) return 'en';
	if (is('仙先韻 合口')) return 'wen';
	if (is('豪韻')) {
		if (is脣音) return 'ou';
		if (is舌齒 || is牙喉) return 'au';
	}
	if (is('肴韻')) return 'au';
	if (is('宵蕭韻')) return 'eu';
	if (is('歌韻 或 麻韻 開口 二等')) return 'a';
	if (is('戈韻 合口 一等 或 麻韻 合口 二等 或 戈韻 合口 三等')) return 'wa';
	if (is('戈韻 開口 三等 或 麻韻 開口 三等')) return 'ya';
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
	if (is清) { // 全清、次清
		if (is('平聲')) return 'ˉ';
		if (is('上聲')) return 'ˊ';
		if (is('去聲')) return 'ˇ';
		if (is全濁 && is('入聲')) return 'ˇ';
		if (is('入聲')) return 'ˉ'; // 次濁入歸陰入
	} else {
		if (is全濁 && is('上聲')) return 'ˇ'; // 全濁上變去
		if (is('上聲')) return 'ˊ';
		if (is('平去入聲')) return 'ˇ';
	}
	throw new Error('無聲調規則');
}

let 聲母 = 聲母規則();
let 韻母 = 韻母規則();
let 聲調 = 聲調規則();

if (is('入聲')) {
	if (韻母.endsWith('m')) 韻母 = `${韻母.slice(0, -1)}p`;
	else if (韻母.endsWith('n')) 韻母 =`${韻母.slice(0, -1)}t`;
	else if (韻母.endsWith('ng')) 韻母 = `${韻母.slice(0, -2)}k`;
}

if (!開關.聲調) 聲調 = '';

if (韻母.startsWith('w') && (!is牙喉 || is('重紐A類 或 以母'))) 韻母 = 韻母.substr(1);

if (開關.歷史性音變 || 開關.綾香的音變) {
	if (韻母.endsWith('au')) 韻母 = `${韻母.slice(0, -3)}ou`; // 高 kau -> kou
	else if (韻母.endsWith('ang')) 韻母 = `${韻母.slice(0, -3)}ong`; // 相 syang -> syong
	else if (韻母.endsWith('eu')) 韻母 = `${韻母.slice(0, -2)}you`; // 遙 eu -> you
}

if (開關.歷史性音變) {
	if (韻母.startsWith('w')) 韻母 = 韻母.substr(1); // 園 wen -> en
	if (韻母 === 'iu') 韻母 = 'yuu'; // 宙 tiu -> tyuu
	if (韻母.endsWith('ep')) 韻母 = `${韻母.slice(0, -2)}you`; // 鄴 gep -> gyou
	else if (韻母.endsWith('m')) 韻母 = `${韻母.slice(0, -1)}n`; // 南 dam -> dan
	else if (韻母.endsWith('eng')) 韻母 = `${韻母.slice(0, -2)}i`; // 生 seng -> sei
	else if (韻母.endsWith('ng')) 韻母 = `${韻母.slice(0, -2)}u`; // 窮 kyung -> kyuu
}

if (開關.綾香的音變) {
	if (韻母.endsWith('yung')) 韻母 = `${韻母.slice(0, -1)}`; // 窮 kyung -> kyun
	if (韻母 === 'uu') 韻母 = `${韻母.slice(0, -1)}`; // 愁 suu -> su
}

if (開關.假名) {
	const s = roma2kana(`${聲母}${韻母}`) + 聲調;
	if (!開關.ヰヱヲ小假名) {
		return s.replace('𛅤', 'ヰ').replace('𛅥', 'ヱ').replace('𛅦', 'ヲ');
	}
	return s;
}

if (開關.歷史性音變 || 開關.綾香的音變) {
	if (聲母 === 'h' && 韻母.startsWith('u')) 聲母 = 'f'; // 不 hut -> fut
	else if (聲母 === 't' && 韻母.startsWith('i')) 聲母 = 'ch'; // 地 ti -> chi
	else if (聲母 === 't' && 韻母.startsWith('u')) 聲母 = 'ts';
	else if (聲母 === 'z' && 韻母.startsWith('i')) 聲母 = 'j'; // 人 zin -> jin
}

if (開關.歷史性音變) {
	if (聲母 === 'd' && 韻母.startsWith('i')) 聲母 = 'j'; // 膩 di -> ji
	else if (聲母 === 't' && 韻母.startsWith('y')) { 聲母 = 'ch'; 韻母 = 韻母.substr(1); } // 柱 tyuu -> chuu
	else if (聲母 === 's' && 韻母.startsWith('y')) { 聲母 = 'sh'; 韻母 = 韻母.substr(1); } // 相 syou -> shou
	else if (聲母 === 'z' && 韻母.startsWith('y')) { 聲母 = 'j'; 韻母 = 韻母.substr(1); } // 仍 zyou -> jou
	if (韻母.endsWith('t')) 韻母 = `${韻母}su`; // 遏 at -> atsu
	else if (韻母.endsWith('ek')) 韻母 = `${韻母}i`; // 席 sek -> seki
	else if (韻母.endsWith('k')) 韻母 = `${韻母}u`; // 澤 tak -> taku
}

if (開關.綾香的音變) {
	if (聲母 === 'r') 聲母 = 'l';
	else if (聲母 === 't' && 韻母.startsWith('y')) 聲母 = 'c'; // 柱 tyuu -> cyuu
	if (韻母.endsWith('t')) 韻母 = `${韻母.slice(0, -1)}s`; // 遏 at -> as
	else if (韻母.endsWith('p')) 韻母 = `${韻母.slice(0, -1)}f`; // 鄴 gep -> gef
}

return `${聲母}${韻母}${聲調}`;
