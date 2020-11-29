const is = (x) => 音韻地位.屬於(x);

const is脣音 = is('幫組');
const is舌齒 = is('端知精莊章組 或 來日母');
const is牙喉 = !is脣音 && !is舌齒;

function 聲母規則() {
	if (is('幫母')) {
		if (is('合口 三等')) return 'f';
		return 'b';
	}
	if (is('滂母')) {
		if (is('合口 三等')) return 'f';
		return 'p';
	}
	if (is('並母')) {
		if (is('合口 三等')) return 'f';
		if (is('平上聲')) return 'p';
		return 'b';
	}
	if (is('明母')) return 'm';

	if (is('端母')) return 'd';
	if (is('透母')) return 't';
	if (is('定母')) {
		if (is('平上聲')) return 't';
		return 'd';
	}
	if (is('泥母')) return 'n';

	if (is('知母')) return 'z';
	if (is('徹母')) return 'c';
	if (is('澄母')) {
		if (is('平上聲')) return 'c';
		return 'z';
	}
	if (is('孃母')) return 'n';

	if (is('精母')) return 'z';
	if (is('清母')) return 'c';
	if (is('從母')) {
		if (is('平上聲')) return 'c';
		return 'z';
	}
	if (is('心母')) return 's';
	if (is('邪母')) return 's';

	if (is('莊母')) return 'z';
	if (is('初母')) return 'c';
	if (is('崇母')) {
		if (is('平上聲')) return 'c';
		return 'z';
	}
	if (is('生母')) return 's';
	if (is('俟母')) return 'z';

	if (is('章母')) return 'z';
	if (is('昌母')) return 'c';
	if (is('常母')) {
		if (is('平上聲')) return 'c';
		return 'z';
	}
	if (is('書母')) return 's';
	if (is('船母')) return 'z';

	if (is('見母')) return 'g';
	if (is('溪母')) return 'k';
	if (is('羣母')) {
		if (is('平上聲')) return 'k';
		return 'g';
	}
	if (is('疑母')) return 'ng';

	if (is('影母')) {
		if (is('三等')) return 'j';
		return '';
	}
	if (is('曉母')) return 'h';
	if (is('匣母')) return 'h';
	if (is('云母')) return 'j';
	if (is('以母')) return 'j';
	if (is('來母')) return 'l';
	if (is('日母')) return 'j';

	throw new Error('無聲母規則');
}

function 韻母規則() {
	// 通攝
	if (is('東冬鍾韻')) return 'ung';

	// 江攝
	if (is('江韻')) {
		if (is舌齒) return 'oeng';
		return 'ong';
	}

	// 止攝
	if (is('支脂之韻 開口')) {
		if (is('幫端組 或 來見溪羣曉匣母')) return 'ei';
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
		if (is('端精組 或 來見溪羣曉匣母')) return 'eoi';
		if (is('知章組 或 日疑影云以母')) return 'yu';
		return 'o';  // 莊組
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
	if (is('戈韻 三等 合口')) return 'oe';

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
	if (is('侵韻')) {
		if (is脣音) return 'an';
		return 'am';
	}

	// 咸攝
	if (is('覃談凡韻')) {
		if (is脣音) return 'aan';
		if (is舌齒) return 'aam';
		return 'am';
	}
	if (is('咸銜韻')) {
		if (is脣音) return 'aan';
		return 'aam';
	}
	if (is('鹽添嚴韻')) {
		if (is脣音) return 'in';
		return 'im';
	}

	throw new Error('無韻母規則');
}

function 聲調規則() {
	if (is('幫滂端透知徹精清心莊初生章昌書見溪影曉母')) {  // 全清、次清
		if (is('平聲')) return '1';
		if (is('上聲')) return '2';
		if (is('去聲')) return '3';
		if (is('入聲 深臻曾通攝')) return '1';
		if (is('入聲')) return '3';
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

const 合口介音 = is('合口') &&
	(聲母.startsWith('g') || 聲母.startsWith('k')) &&
	(韻母.startsWith('a') || 韻母.startsWith('i') || 韻母.startsWith('o')) ? 'w' : '';

if (聲母 == 'ng' && (韻母.startsWith('i') || 韻母.startsWith('yu'))) {
	聲母 = 'j';  // ng- 聲母不接細音
}

if (聲母 == '' && (韻母.startsWith('i') || 韻母.startsWith('yu'))) {
	聲母 = 'j';
}

if (is('入聲')) {
	if (韻母.endsWith('m')) {
		韻母 = 韻母.slice(0, -1) + 'p';
	} else if (韻母.endsWith('n')) {
		韻母 = 韻母.slice(0, -1) + 't';
	} else if (韻母.endsWith('ng')) {
		韻母 = 韻母.slice(0, -2) + 'k';
	}
}

return 聲母 + 合口介音 + 韻母 + 聲調;
