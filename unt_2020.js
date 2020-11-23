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
const 支鱼虞韵用渐央元音 = false; // 包括钟韵
const 三子韵核用底层表达 = false;
const 二等元音用双下横线 = false; // 打开：双下横线 a̳ (U+0333)，关闭：下等号 a͇ (U+0347)。默认关闭，但 Times New Roman 把这两个附加符号弄反了
const 歌系韵核用前低元音 = false;
const 豪韵韵核用半低元音 = true;
const 覃韵韵核用半低元音 = true;
const 清韵韵核用次低元音 = true;
const 庄组臻摄用舌冠韵核 = true; // 包括合口“率”小韵
const 侯韵韵核用二合元音 = true;
const 通江宕摄用小舌韵尾 = true;
const 祭泰夬废用龈后韵尾 = true; // 打开：ɹ；关闭：j
const 声调符号用五度标记 = true;
const 声调附加符标韵核上 = true; // 关闭：标在音节前

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

function getCoda() {
	if (is('通江宕攝') && 通江宕摄用小舌韵尾) return is('入聲') ? 'q' : 'ɴ';
	if (is('通江宕梗曾攝')) return is('入聲') ? 'k' : 'ŋ';
	if (is('深咸攝')) return is('入聲') ? 'p' : 'm';
	if (is('微韻')) return 'i'; // 为了方便，把微韵拆成 i 韵尾
	if (is('蟹攝')) {
		if (is('佳韻')) return '';
		if (is('祭泰夬廢韻') && 祭泰夬废用龈后韵尾) return 'ɹ';
		return 'j';
	}
	if (is('臻山攝')) return is('入聲') ? 't' : 'n';
	if (is('效攝')) return 'w';
	return '';
}

function getVowel() {
	if (is('脂　蒸　　　韻')) return 'i';
	if (is('之　　　　　韻')) return 'ɨ';
	if (is('尤東　　　　韻')) return 'u';
	if (is('佳耕咸皆山　韻')) return 'e͇';
	if (is('　青添齊先蕭韻')) return 'e';
	if (is('　登覃咍痕　韻')) return 'ə';
	if (is('模冬　灰魂　韻')) return 'o';
	if (is('麻庚銜夬刪肴韻 二等')) return 'a͇';
	if (is('麻庚　　　　韻 三等')) return 'a';
	if (is('歌陽談泰寒豪韻')) return 'ɑ';
	if (is('戈唐　　桓　韻')) return 'ɑ';

	if (is('江韻')) return 'o͇';
	if (is('微侵眞諄臻欣文韻')) return 'ɪ';
	if (is('清鹽嚴凡祭廢仙元宵韻')) return 'ɜ';

	if (is('幽韻')) return 'iu';
	if (is('侯韻')) return 侯韵韵核用二合元音 ? 'ɘu' : 'u';
	if (is('支韻')) return 支鱼虞韵用渐央元音 ? 'iə' : 'iɛ';
	if (is('魚韻')) return 支鱼虞韵用渐央元音 ? 'ɨə' : 'ɨɜ';
	if (is('虞鍾韻')) return 支鱼虞韵用渐央元音 ? 'ʉə' : 'ʉɔ';

	throw new Error('无元音规则');
}

function getNucleus() {
	if (is('清韻') && 清韵韵核用次低元音) return 'ɐ';
	if (is('覃韻') && 覃韵韵核用半低元音) return 'ʌ';
	if (is('豪韻') && 豪韵韵核用半低元音) return 'ʌ';
	if (is('莊組 臻攝') && 庄组臻摄用舌冠韵核) return 'ɹ̩';
	return getVowel();
}

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
		if (is('平聲')) return is清 ? '᷇' : '᷅';
		if (is('上聲')) return !is全浊 ? '̋' : '̌';
		if (is('去聲')) return is清 ? '̂' : '̏';
		if (is('入聲')) return !is全浊 ? '́' : '̀';
	}
	throw new Error('无声调规则');
}

let initial = getInitial();
let medial = getMedial();
let nucleus = getNucleus();
let coda = getCoda();
let tone = getTone();

if (!三子韵核用底层表达) {
	if (nucleus == 'ɪ') {
		nucleus = is前元音韵 ? 'i' : is('合口') ? 'ʉ' : 'ɨ';
	} else if (nucleus == 'ɜ') {
		nucleus = is前元音韵 ? 'e' : 'ə';
	} else if (nucleus == 'ɐ') {
		nucleus = 'æ';
	}
}

if (二等元音用双下横线) nucleus = nucleus.replace('͇', '̳');

if (歌系韵核用前低元音) nucleus = nucleus.replace('ɑ', 'a');

if (nucleus.startsWith('i') && (medial == 'j' || medial == 'ɥ')
	|| nucleus.startsWith('ɨ') && (medial == 'j̈')
	|| nucleus.startsWith('ʉ') && (medial == 'ɥ̈')) {
	medial = '';
}

if (精组高元音省略介音 && is('精組') && (nucleus.startsWith('ɨ') || nucleus.startsWith('ʉ'))) {
	medial = '';
}

if (声调符号用五度标记) return initial + medial + nucleus + coda + tone;
if (声调附加符标韵核上) return initial + medial + nucleus + tone + coda;
return ' ' + tone + initial + medial + nucleus + coda;
