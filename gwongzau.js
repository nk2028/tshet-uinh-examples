/* 推導廣州音 (Beta)
 *
 * 説明
 * 以下內容為生成推導廣州音的函數體
 * 函數接受音韻地位，返回對應的推導廣州音
 */

const is = (x) => 音韻地位.屬於(x);

function 聲母規則() {
	if (is('幫母')) {
		if (is('東韻 三等 或 鍾微虞廢文元陽尤凡韻')) return 'f';
		return 'b';
	}
	if (is('滂母')) {
		if (is('東韻 三等 或 鍾微虞廢文元陽尤凡韻')) return 'f';
		return 'p';
	}
	if (is('並母')) {
		if (is('東韻 三等 或 鍾微虞廢文元陽尤凡韻')) return 'f';
		if (is('平聲')) return 'p';
		return 'b';
	}
	if (is('明母')) return 'm';

	if (is('端母')) return 'd';
	if (is('透母')) return 't';
	if (is('定母')) {
		if (is('平聲')) return 't';
		return 'd';
	}
	if (is('泥孃母')) return 'n';
	if (is('來母')) return 'l';

	if (is('知精邪莊俟章母')) return 'z';  // 邪母：z > c ≈ s
	if (is('徹清初昌母')) return 'c';
	if (is('澄從崇母')) {
		if (is('平聲')) return 'c';
		return 'z';
	}
	if (is('心生常書船母')) return 's';

	if (is('見母')) return 'g';
	if (is('溪母')) return 'h';  // 溪母：h+f >> k
	if (is('羣母')) {
		if (is('平聲')) return 'k';
		return 'g';
	}
	if (is('疑母')) return 'ng';

	if (is('影云母')) {
		if (is('三四等 開口')) return 'j';  // 合口 w-
		return '';
	}
	if (is('曉匣母')) return 'h';  // 曉匣母：h+f >> w
	if (is('日以母')) {
		if (is('三四等')) return 'j';
		return '';
	}

	throw new Error('無聲母規則');
}

function 韻母規則() {
	const is脣音 = is('幫組');
	const is舌齒 = is('端知精莊章組 或 來日母');
	const is牙喉 = !is脣音 && !is舌齒;

	// 通攝
	if (is('東冬鍾韻')) return 'ung';

	// 江攝
	if (is('江韻')) {
		if (is舌齒) return 'oeng';
		return 'ong';
	}

	// 止攝
	if (is('支脂之韻 開口')) {
		if (is('幫端組 或 來孃見溪羣曉匣母')) return 'ei';
		return 'i';
	}
	if (is('微韻 開口')) {
		if (is('幫組 或 見溪羣曉匣母')) return 'ei';
		if (is舌齒) return null;
		return 'i';
	}
	if (is('支脂韻 合口')) {
		if (is脣音) return 'ei';
		if (is舌齒) return 'eoi';
		return 'ai';
	}
	if (is('微韻 合口')) {
		if (is脣音) return 'ei';
		if (is舌齒) return null;
		return 'ai';
	}

	// 遇攝
	if (is('模韻')) {
		if (is脣音 || is舌齒) return 'ou';
		if (is('疑母')) return '';
		return 'u';
	}
	if (is('魚虞韻')) {
		if (is('幫滂並母')) return 'u';
		if (is('明母')) return 'ou';
		if (is('端精組 或 來孃見溪羣曉匣母')) return 'eoi';
		if (is('莊組')) return 'o';
		return 'yu';
	}

	// 蟹攝
	if (is('咍韻')) {
		if (is脣音) return 'ui';
		return 'oi';
	}
	if (is('泰韻 開口')) {
		if (is脣音) return 'ui';
		if (is舌齒) return 'aai';
		return 'oi';
	}
	if (is('泰韻 合口') || is('灰韻')) {
		if (is脣音) return 'ui';
		if (is舌齒) return 'eoi';
		if (is('疑母')) return 'oi';
		return 'ui';
	}
	if (is('蟹攝 二等 開口')) return 'aai';
	if (is('蟹攝 二等 合口')) {
		if (is舌齒) return 'eoi';
		return 'aai';
	}
	if (is('蟹攝 三四等 開口')) return 'ai';
	if (is('蟹攝 三四等 合口')) {
		if (is舌齒) return 'eoi';
		return 'ai';
	}

	// 臻攝
	if (is('痕韻')) return 'an';
	if (is('魂韻')) {
		if (is脣音) return 'un';
		if (is舌齒) return 'yun';
		return 'an';
	}
	if (is('元韻 開口')) {
		if (is脣音) return 'aan';
		if (is舌齒) return null;
		return 'in';
	}
	if (is('元韻 合口')) {
		if (is脣音) return 'aan';
		if (is舌齒) return null;
		return 'yun';
	}
	if (is('文欣韻')) return 'an';
	if (is('眞韻 開口')) {
		if (is('端精組 或 來母')) return 'eon';
		return 'an';
	}
	if (is('眞韻 合口')) {
		if (is牙喉) return 'an';
		return null;
	}
	if (is('臻韻')) return 'an';
	if (is('諄韻')) {
		if (is舌齒) return 'eon';
		return 'an';
	}

	// 山攝
	if (is('寒韻')) {
		if (is舌齒) return 'aan';
		return 'on';
	}
	if (is('桓韻')) {
		if (is舌齒) return 'yun';
		return 'un';
	}
	if (is('刪山韻')) return 'aan';
	if (is('仙先韻 開口')) return 'in';
	if (is('仙先韻 合口')) {
		if (is脣音) return 'in';
		return 'yun';
	}

	// 效攝
	if (is('豪韻')) return 'ou';
	if (is('肴韻')) return 'aau';
	if (is('宵蕭韻')) return 'iu';

	// 果攝
	if (is('歌戈韻 一等')) return 'o';
	if (is('戈韻 三等 開口')) return 'e';
	if (is('戈韻 三等 合口')) {
		if (is脣音) return 'e';
		return 'oe';
	}

	// 假攝
	if (is('麻韻 二等')) return 'aa';
	if (is('麻韻 三等')) return 'e';

	// 宕攝
	if (is('唐韻')) return 'ong';
	if (is('陽韻 開口')) {
		if (is脣音 || is('莊組')) return 'ong';
		return 'oeng';
	}
	if (is('陽韻 合口')) return 'ong';

	// 梗攝
	if (is('梗攝 二等')) return 'ang';
	if (is('梗攝 三四等')) return 'ing';

	// 曾攝
	if (is('登韻')) return 'ang';
	if (is('蒸韻')) return 'ing';

	// 流攝
	if (is('尤侯幽韻')) return 'au';

	// 深攝
	if (is('侵韻')) return 'am';  // 脣音 -n，詳後

	// 咸攝
	if (is('覃談凡韻')) {
		if (is牙喉) return 'am';
		return 'aam';  // 脣音 -n，詳後
	}
	if (is('咸銜韻')) return 'aam';  // 脣音 -n，詳後
	if (is('鹽添嚴韻')) return 'im';  // 脣音 -n，詳後

	throw new Error('無韻母規則');
}

function 聲調規則() {
	if (is('幫滂端透知徹精清心莊初生章昌書見溪影曉母')) {  // 全清、次清
		if (is('平聲')) return '1';
		if (is('上聲')) return '2';
		if (is('去聲')) return '3';
		if (is('入聲')) return 'x';  // 據元音長短判斷，詳後
	} else {
		if (is('平聲')) return '4';
		if (is('並定澄從邪崇俟船常羣匣母 上聲')) return '6';  // 全濁上變去
		if (is('上聲')) return '5';
		if (is('去聲')) return '6';
		if (is('入聲')) return '6';
	}
	throw new Error('無聲調規則');
}

let 聲母 = 聲母規則();
let 韻母 = 韻母規則();
let 聲調 = 聲調規則();

if (韻母 == null) {
	throw new Error('該音韻地位有音無字，無法判斷');
}

if (is('入聲')) {
	if (韻母.endsWith('m')) 韻母 = 韻母.slice(0, -1) + 'p';
	else if (韻母.endsWith('n')) 韻母 = 韻母.slice(0, -1) + 't';
	else if (韻母.endsWith('ng')) 韻母 = 韻母.slice(0, -2) + 'k';
}

if (聲調 === 'x') {
	const is長元音 = {
		'aap': true, 'aat': true,
		'ak': false, 'ap': false, 'at': false,
		'eot': false,
		'ik': false, 'ip': true, 'it': true,
		'oek': true, 'ok': true, 'ot': true,
		'uk': false, 'ut': true,
		'yut': true
	}[韻母];
	if (is長元音 == null) {
		throw new Error('無法判斷元音長短：' + 韻母);
	}
	聲調 = is長元音 ? '3' : '1';
}

if (is('合口') && (韻母.startsWith('a') || 韻母.startsWith('i') || (韻母.startsWith('o') && !韻母.startsWith('oe')))) {
	if (聲母 === 'g') 聲母 = 'gw';
	if (聲母 === 'k') 聲母 = 'kw';
	if (聲母 === '') 聲母 = 'w';
}

if (is('合口') && 聲母 === 'h' && !(韻母.startsWith('eo') || 韻母.startsWith('oe') || 韻母.startsWith('yu'))) {
	聲母 = 'f';
}

if (聲母 === 'h' && 韻母 === 'u') {
	聲母 = 'f';
}

if (聲母 === 'ng' && (韻母.startsWith('i') || 韻母.startsWith('u') || 韻母.startsWith('oe') || 韻母.startsWith('yu'))) {
	聲母 = '';
}

if (聲母 === '' && (韻母.startsWith('i') || 韻母.startsWith('oe') || 韻母.startsWith('yu'))) {
	聲母 = 'j';
}

if (聲母 === '' && ['u', 'ui', 'un', 'ut'].includes(韻母)) {
	聲母 = 'w';
}

if (['b', 'p', 'm', 'f'].includes(聲母)) {
	if (韻母.endsWith('m')) 韻母 = 韻母.slice(0, -1) + 'n';
	else if (韻母.endsWith('p')) 韻母 = 韻母.slice(0, -1) + 't';
}

return 聲母 + 韻母 + 聲調;
