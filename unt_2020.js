/* unt 切韻擬音 2020 版
 * https://zhuanlan.zhihu.com/p/305516512
 *
 * 説明
 * 以下內容為生成 unt 切韻擬音的函數體
 * 函數接受音韻地位，返回對應的 unt 切韻擬音
 */

const is = (x) => 音韻地位.屬於(x);

// 一些开关
const 见系非三等用小舌音 = true;
const 晓母非三等用小舌音 = true;
const 知组声母用卷舌塞音 = false; // 打开：ʈ，关闭：tɹ。默认关闭
const 支鱼虞韵用概念音值 = false; // 包括钟韵
const 三子韵腹用概念元音 = false;
const 二等元音用双下横线 = false; // 打开：双下横线 a̳ (U+0333)，关闭：下等号 a͇ (U+0347)。默认关闭，但 Times New Roman 把这两个附加符号弄反了
const 歌系韵腹用前低元音 = false;
const 豪韵韵腹用半低元音 = true;
const 覃韵韵腹用半低元音 = true;
const 清韵韵腹用次低元音 = true;
const 庄组臻摄用舌冠韵腹 = true; // 包括合口“率”小韵
const 侯韵韵腹用二合元音 = true;
const 通江宕摄用小舌韵尾 = true;
const 祭泰夬废用龈后韵尾 = true; // 打开：ɹ；关闭：j
const 声调符号用五度标记 = true;
const 精组高元音省略介音 = true; // “踪”打开：tsʉɔɴ˦˧，关闭：tsɹʉɔɴ˦˧。因为会导致拼写太长，默认打开

function getConsonant() {
	if (is('幫母')) return 'p';
	if (is('滂母')) return 'pʰ';
	if (is('並母')) return 'b';
	if (is('明母')) return 'm';
	if (is('端母')) return 't';
	if (is('透母')) return 'tʰ';
	if (is('定母')) return 'd';
	if (is('泥母')) return 'n';
	if (is('知母')) return 知组声母用卷舌塞音 ? 'ʈ' : 'tɹ';
	if (is('徹母')) return 知组声母用卷舌塞音 ? 'ʈʰ' : 'tɹʰ';
	if (is('澄母')) return 知组声母用卷舌塞音 ? 'ɖ' : 'dɹ';
	if (is('孃母')) return 知组声母用卷舌塞音 ? 'ɳ' : 'nɹ';
	if (is('精母')) return 'ts';
	if (is('清母')) return 'tsʰ';
	if (is('從母')) return 'dz';
	if (is('心母')) return 's';
	if (is('邪母')) return 'z';
	if (is('莊母')) return 'tʂ';
	if (is('初母')) return 'tʂʰ';
	if (is('崇母')) return 'dʐ';
	if (is('生母')) return 'ʂ';
	if (is('俟母')) return 'ʐ';
	if (is('章母')) return 'tɕ';
	if (is('昌母')) return 'tɕʰ';
	if (is('常母')) return 'dʑ';
	if (is('書母')) return 'ɕ';
	if (is('船母')) return 'ʑ';
	if (is('見母')) return is('三等') || !见系非三等用小舌音 ? 'k' : 'q';
	if (is('溪母')) return is('三等') || !见系非三等用小舌音 ? 'kʰ' : 'qʰ';
	if (is('羣母')) return is('三等') || !见系非三等用小舌音 ? 'ɡ' : 'ɢ';
	if (is('疑母')) return is('三等') || !见系非三等用小舌音 ? 'ŋ' : 'ɴ';
	if (is('影母')) return 'ʔ';
	if (is('曉母')) return is('三等') || !晓母非三等用小舌音 ? 'h' : 'χ';
	if (is('匣母')) return is('三等') || !晓母非三等用小舌音 ? 'ɦ' : 'ʁ';
	if (is('云母')) return 'ɹ';
	if (is('以母')) return 'j';
	if (is('來母')) return 'l';
	if (is('日母')) return 'ɲ';
	throw new Error('无辅音规则');
}

function getInitial() {
	let result = getConsonant();
	if (is('合口') && !is('幫組')) {
		result += 'ʷ';
		result = result.replace('ʰʷ', 'ʷʰ');
		result = result.replace('jʷ', 'ɥ');
	}
	return result;
}

let is前元音韵 = is('支脂祭眞諄臻仙宵麻庚清蒸幽侵鹽韻');

function getMedial() {
	if (!is('三等')) return '';
	if (is('莊章組 或 以云日母')) return '';
	if (is('知組')) return 知组声母用卷舌塞音 ? 'ɹ' : '';
	if (is('來母')) return 'ɹ';
	if (is('端精組')) {
		if (is前元音韵) return is('合口') ? 'ɥ' : 'j';
		return 'ɹ';
	}
	// 其余是钝音
	if (is('重紐A類 或 諄清麻清幽韻')) return is('合口') ? 'ɥ' : 'j';
	if (is('重紐B類 或 臻庚蒸韻')) return 'ɹ';
	if (is('幫組')) return 'β';
	return is('合口') ? 'ɥ̈' : 'j̈';
}

function getRhyme() {
	// 通摄
	if (is('東韻')) return 'uɴ';
	if (is('冬韻')) return 'oɴ';
	if (is('鍾韻')) return 支鱼虞韵用概念音值 ? 'ʉəɴ' : 'ʉɔɴ';
	// 江摄
	if (is('江韻')) return 'o͇ɴ';
	// 止摄
	if (is('支韻')) return 支鱼虞韵用概念音值 ? 'iə' : 'iɛ';
	if (is('脂韻')) return 'i';
	if (is('之韻')) return 'ɨ';
	if (is('微韻')) return 'ɪi';
	// 遇摄
	if (is('魚韻')) return 支鱼虞韵用概念音值 ? 'ɨə' : 'ɨɜ';
	if (is('虞韻')) return 支鱼虞韵用概念音值 ? 'ʉə' : 'ʉɔ';
	if (is('模韻')) return 'o';
	// 蟹摄
	if (is('齊韻')) return 'ej';
	if (is('祭廢韻')) return 'ɜɹ';
	if (is('泰韻')) return 'ɑɹ';
	if (is('佳韻')) return 'e͇';
	if (is('皆韻')) return 'e͇j';
	if (is('夬韻')) return 'a͇ɹ';
	if (is('咍韻')) return 'əj';
	if (is('灰韻')) return 'oj';
	// 臻摄
	if (is('眞諄臻欣文韻')) return 'ɪn';
	if (is('元韻')) return 'ɜn';
	if (is('痕韻')) return 'ən';
	if (is('魂韻')) return 'on';
	// 山摄
	if (is('寒桓韻')) return 'ɑn';
	if (is('刪韻')) return 'a͇n';
	if (is('山韻')) return 'e͇n';
	if (is('先韻')) return 'en';
	if (is('仙韻')) return 'ɜn';
	// 效摄
	if (is('蕭韻')) return 'ew';
	if (is('宵韻')) return 'ɜw';
	if (is('肴韻')) return 'e͇w';
	if (is('豪韻')) return 豪韵韵腹用半低元音 ? 'ʌw' : 'ɑw';
	// 果摄
	if (is('歌戈韻')) return 'ɑ';
	// 假摄
	if (is('麻韻 二等')) return 'a͇';
	if (is('麻韻 三等')) return 'a';
	// 宕摄
	if (is('陽唐韻')) return 'ɑɴ';
	// 梗摄
	if (is('庚韻 二等')) return 'a͇ŋ';
	if (is('庚韻 三等')) return 'aŋ';
	if (is('耕韻')) return 'e͇ŋ';
	if (is('清韻')) return 清韵韵腹用次低元音 ? 'ɐŋ' : 'ɜŋ'; 
	if (is('青韻')) return 'eŋ';
	// 曾摄
	if (is('蒸韻')) return 'iŋ';
	if (is('登韻')) return 'əŋ';
	// 流摄
	if (is('尤韻')) return 'u';
	if (is('侯韻')) return 侯韵韵腹用二合元音 ? 'ɘu' : 'u';
	if (is('幽韻')) return 'iu';
	// 深摄
	if (is('侵韻')) return 'ɪm';
	// 咸摄
	if (is('覃韻')) return 覃韵韵腹用半低元音 ? 'ʌm' : 'əm';
	if (is('談韻')) return 'ɑm';
	if (is('鹽嚴凡韻')) return 'ɜm';
	if (is('添韻')) return 'em';
	if (is('咸韻')) return 'e͇m';
	if (is('銜韻')) return 'a͇m';
	throw new Error('无韵基规则');
}

// TODO: split nucleus and coda

function getTone() {
	const is清 = is('幫滂端透知徹精清心莊初生章昌書見溪影曉母')
		, is全浊 = is('並定澄從邪崇俟常船羣匣母');
		// 次浊：明泥孃疑云以來日

	if (声调符号用五度标记) {
		if (is('平聲')) return is清 ? '˦˧' : '˨˩';
		if (is('上聲')) return !is全浊 ? '˦˥' : '˨˧';
		if (is('去聲')) return is清 ? '˥˦˥' : '˧˨˧';
		if (is('入聲')) return !is全浊 ? '˥' : '˨˩';
	} else {
		if (is('平聲')) return is清 ? ' ᷇' : ' ᷅';
		if (is('上聲')) return !is全浊 ? ' ̋' : ' ̌';
		if (is('去聲')) return is清 ? ' ̂' : ' ̏';
		if (is('入聲')) return !is全浊 ? ' ́' : ' ̀';
	}
	throw new Error('无声调规则');
}

let initial = getInitial();
let medial = getMedial();
let rhyme = getRhyme();
let tone = getTone();

if (!三子韵腹用概念元音) {
	if (rhyme.indexOf('ɪ') != -1) {
		if (is前元音韵) {
			rhyme = rhyme.replace('ɪ', 'i');
		} else {
			rhyme = rhyme.replace('ɪ', is('合口') ? 'ʉ' : 'ɨ');
		}
	} else {
		if (!is('魚韻')) {
			rhyme = rhyme.replace('ɜ', is前元音韵 ? 'e' : 'ə');
		}
		rhyme = rhyme.replace('ɐ', 'æ');
	}
}

if (二等元音用双下横线) rhyme = rhyme.replace('͇', '̳');

if (歌系韵腹用前低元音) rhyme = rhyme.replace('ɑ', 'a');

if (庄组臻摄用舌冠韵腹 && is('莊組 臻攝')) rhyme = 'ɹ̩n';

if (!通江宕摄用小舌韵尾) rhyme = rhyme.replace('ɴ', 'ŋ');

if (!祭泰夬废用龈后韵尾) rhyme = rhyme.replace('ɹ', 'j');

if (rhyme.startsWith('i') && (medial == 'j' || medial == 'ɥ')
	|| rhyme.startsWith('ɨ') && (medial == 'j̈')
	|| rhyme.startsWith('ʉ') && (medial == 'ɥ̈')) {
	medial = '';
}

if (精组高元音省略介音 && is('精組') && (rhyme.startsWith('ɨ') || rhyme.startsWith('ʉ'))) {
	medial = '';
}

if (is('入聲')) {
	if (rhyme.endsWith('m'))
		rhyme = rhyme.slice(0, -1) + 'p';
	else if (rhyme.endsWith('n'))
		rhyme = rhyme.slice(0, -1) + 't';
	else if (rhyme.endsWith('ŋ'))
		rhyme = rhyme.slice(0, -1) + 'k';
	else if (rhyme.endsWith('ɴ'))
		rhyme = rhyme.slice(0, -1) + 'q';
}

let result = initial + medial + rhyme;
result = 声调符号用五度标记 ? result + tone : tone + result;

return result;
