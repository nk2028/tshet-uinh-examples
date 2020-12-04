/* unt 切韵拟音 J
 * 音系规则和代码实现 - https://zhuanlan.zhihu.com/p/305516512
 * 语音描写和拟音说明 - https://zhuanlan.zhihu.com/p/313005024
 *
 * 帮助
 * 以下内容为生成 unt 切韵拟音 J 的函数体
 * 函数接受音韵地位，返回对应的 unt 切韵拟音 J
 */

const is = (x) => 音韻地位.屬於(x);

/** 目录
一、流程控制开关
二、区别性特征
三、音韵地位对应音位（及其代码实现）
四、音系规则（及其代码实现）
五、后处理（及其代码实现）
*/

/** 一、开关

开关用 < > 写出。
*/


const 见系非三等用小舌音 = true;                       // k→q/_。默认打开
const 匣母非三等用小舌音 = true && 见系非三等用小舌音; // ɣ→ʁ。默认打开，需要上一条打开才起效
const 晓母非三等用小舌音 = true && 匣母非三等用小舌音; // h→χ。默认打开，需要上一条打开才起效
const 知组声母用卷舌塞音 = false;                      // 打开：二等 ʈ、三等 ʈɹ，关闭：tɹ。默认关闭
const 支鱼虞韵用渐央元音 = true;                       // iə→iɛ。默认打开
const 三子韵核用专属元音 = false;
const 二等元音用双下横线 = false; // 打开：双下横线 a̳ (U+0333)，关闭：下等号 a͇ (U+0347)。默认关闭，但 Times New Roman 把这两个附加符号弄反了
const 歌系韵核用前低元音 = false;
const 豪覃韵核用半低元音 = true;
const 豪韵韵核归中元音 = true;
const 清韵韵核用次低元音 = true;
const 庄组臻摄用舌冠韵核 = true; // 包括合口“率”小韵
const 侯韵韵核用二合元音 = true;
const 通江宕摄用小舌韵尾 = true;
const 祭泰夬废用龈后韵尾 = true; // 打开：ɹ；关闭：j
const 声调符号用五度标记 = true;
const 声调附加符标韵核上 = true; // 关闭：标在音节前
const 精组高元音省略介音 = true; // “踪”打开：tsʉɔɴ˦˧，关闭：tsɹʉɔɴ˦˧。因为会导致拼写太长，默认打开

// 二、开关

/**
辅音的特征
[±voi]: voice 带声
[±sg]:  spread glottis 展声门
响音性 sonorant
连续性 continuant
延缓除阻 delayed release
[labial]：唇
coronal]：舌冠
dorsal]：舌面
round]：圆唇
anterior
stop 塞（occlusive）
*/

function getInitialWithoutRounding() {
//  不送气清阻音［全清］          送气清阻音［次清］            浊阻音［全浊］                浊响音［次浊］
//  −voi, −sg, −son               −voi, +sg, −son               +voi, −sg, −son               +voi, −sg, +son
	if (is('幫母')) return 'p'  ; if (is('滂母')) return 'pʰ' ; if (is('並母')) return 'b'  ; if (is('明母')) return 'm'  ; // +stop, −fric; LAB            双唇塞音  ［帮组/唇音］
	                            ;                             ;                             ; /*(帮组三 C 介音 ------ β)*/; // −stop, −fric; LAB            双唇近音
	if (is('端母')) return 't'  ; if (is('透母')) return 'tʰ' ; if (is('定母')) return 'd'  ; if (is('泥母')) return 'n'  ; // +stop, −fric; COR, +ant      齿龈塞音  ［端组/舌头音］
	if (is('精母')) return 'ts' ; if (is('清母')) return 'tsʰ'; if (is('從母')) return 'dz' ;                             ; // +stop, +fric; COR, +ant      齿龈塞擦音［精组/齿头音］
	if (is('心母')) return 's'  ;                             ; if (is('邪母')) return 'z'  ;                             ; // −stop, +fric; COR, +ant      齿龈擦音  ［精组/齿头音］
	                            ;                             ;                             ; if (is('來母')) return 'l'  ; // −stop, −fric; COR, +ant      齿龈近音  ［来母/半舌音］
	if (is('知母')) return 'tɹ' ; if (is('徹母')) return 'tɹʰ'; if (is('澄母')) return 'dɹ' ; if (is('孃母')) return 'nɹ' ; // +stop, −fric; COR, −ant, +r  卷舌塞音  ［知组/舌上音］
	if (is('莊母')) return 'tʂ' ; if (is('初母')) return 'tʂʰ'; if (is('崇母')) return 'dʐ' ;                             ; // +stop, +fric; COR, −ant, +r  卷舌塞擦音［庄组/正齿音］
	if (is('生母')) return 'ʂ'  ;                             ; if (is('俟母')) return 'ʐ'  ;                             ; // −stop, +fric; COR, −ant, +r  卷舌擦音  ［庄组/正齿音］
	                            ;                             ;                             ; /* 钝音三 B 介音 ------ ɹ */; // −stop, −fric; COR, −ant, +r  龈后近音
	                            ;                             ;                             ; if (is('日母')) return 'ɲ'  ; // +stop, −fric; COR, −ant, −r  龈腭擦音  ［日母/半齿音］
	if (is('章母')) return 'tɕ' ; if (is('昌母')) return 'tɕʰ'; if (is('常母')) return 'dʑ' ;                             ; // +stop, +fric; COR, −ant, −r  龈腭塞擦音［章组/正齿音］
	if (is('書母')) return 'ɕ'  ;                             ; if (is('船母')) return 'ʑ'  ;                             ; // −stop, +fric; COR, −ant, −r  龈腭擦音  ［章组/正齿音］
	                            ;                             ;                             ; if (is('以母')) return 'j'  ; // −stop, −fric; COR, −ant, −r  硬腭近音  ［以母/喉音］
	if (is('見母')) return 'k'  ; if (is('溪母')) return 'kʰ' ; if (is('羣母')) return 'ɡ'  ; if (is('疑母')) return 'ŋ'  ; // +stop, −fric; DOR (+high)    软腭前塞音［见组/牙音］
	                            ;                             ; if (is('匣云母')) return 'ɣ';                             ; // −stop, +fric; DOR (+high)    软腭前擦音［影组/喉音］
	                            ;                             ;                             ; /* 见系三 C 介音 ------ j̈ */; // −stop, −fric; DOR (+high)    软腭前近音
	/*(见母非三等 --------- q)  ;   (溪母非三等 --------- qʰ) ;                             ;   (疑母非三等 --------- ɴ)*/; // +stop, −fric; DOR (−high)    软腭后塞音
	/*(晓母非三等 --------- χ)  ;                             ;   (匣母 --------------- ʁ)*/;                             ; // −stop, +fric; DOR (−high)    软腭后擦音
	if (is('影母')) return 'ʔ'  ;                             ;                             ;                             ; // +stop, −fric                 喉塞音    ［影组/喉音］
	if (is('曉母')) return 'h'  ;                             ;                             ;                             ; // −stop, +fric                 喉擦音    ［影组/喉音］
	// 注意 [h]［晓母三等］理论上是 [+sg]，但本方案为了和“全清”对应，算作 [−sg]

	throw new Error('无辅音规则');
}

const is全清 = is('幫端精心知莊生章書見影曉母'); // [−voi, −sg, −son]
const is次清 = is('滂透清　徹初　昌　溪　　母'); // [−voi, +sg, −son]
const is全浊 = is('並定從邪澄崇俟常船羣　匣母'); // [+voi, −sg, −son]
const is次浊 = is('明泥來　孃　　日以疑云　母'); // [+voi, −sg, +son]
const is清 = is全清 || is次清;
// 注意云母已按推导后的结果 [ɹ] 算入次浊

const is锐前 = is('端精組 或 來母 一二四等');           // [COR, +ant]
const is锐后 = is('知莊章組 或 日以母'); // [COR, −ant]
const is锐 = is锐前 || is锐后 || is('來母');                         // [COR]
// 注意来母按推导后只有非三等 [l] 算入锐前，但三等 [lɹ] 也不算入锐后

/**
没有开合对立的韵母一般视为开口，但虞韵视为鱼韵对应的合口；平行地，钟韵也视为合口
*/

function getInitial() {
	let result = getInitialWithoutRounding();
	if (is('合口 或 鍾韻') && !is('幫組')) { // [+rnd]
		result += 'ʷ';
		result = result.replace('ʰʷ', 'ʷʰ');
	} // else [−rnd]
	return result;
}

function velarToUvular(consonant) {
	switch (consonant[0]) {
		case 'k': return 'q' + consonant.substring(1);
		case 'ɡ': return 'ɢ' + consonant.substring(1);
		case 'ŋ': return 'ɴ' + consonant.substring(1);
		case 'ɣ': return 'ʁ' + consonant.substring(1);
	}
	return consonant;
}

function getGlide() {
	if (is('云母 灰韻')) return 'ɹ'; // “倄”小韵

	// 一二四等无介音
	if (!is('三等')) return '';

	// 锐音声母三等介音一律用 /ɹ/
	if (is锐) return 'ɹ';

	// 钝音声母分三 A、B、C
	// 蒸韵帮组和合口归三 B，“抑𡊁”二字也归三 B，其余归三 A
	// 云母前元音韵归三 B
	if (is('重紐B類 或 庚臻韻')) return 'ɹ';
	if (is('幫組 蒸韻 或 合口 蒸韻') || '抑𡊁'.includes(字頭)) return 'ɹ';
	if (is('云母 支脂祭眞諄臻仙宵麻庚清蒸幽侵鹽韻')) return 'ɹ';
	if (is('重紐A類 或 麻蒸清諄幽韻')) return 'j';
	return 'j̈'; // 三 C
}

/**
             i  ɨ (ʉ) u  ɪ  +high, −low
       e͇  œ͇  e  ə     o  ɜ  −high, −low
       a͇        a           −high, +low
divII  +  +
front        +  −  −  −
back         −  −  −  +
round  −  +  −  −  +  +
tense  +  +  +  +  +  +  −
*/

function getNucleus() {
	// 三子韵及其对应的三寅韵是松元音
	// 韵尾: m     j   n         w
	if (is('侵　　微　眞諄臻欣文　韻')) return 'ɪ';     // +high, −tense
	if (is('鹽嚴凡祭廢仙　　元　宵韻')) return 'ɜ'; // −high, −tense

	// 三丑韵及其对应的三寅韵，以及非三等韵是紧元音
	// 脂韵、尤韵的韵基也可分别视为 /ɪj/、/ɪw/，这里从简，直接视为紧元音 /i/、/u/
	// 韵尾:   ŋ m j n w
	if (is('脂蒸　　　幽韻')) return 'i'; // +high, −low, +front, −back, −rnd, +tense
	if (is('之　　　　　韻')) return 'ɨ'; // +high, −low, −front, −back, −rnd, +tense
	if (is('尤東　　　侯韻')) return 'u'; // +high, −low, −front, +back, +rnd, +tense
	if (is('佳耕咸皆山　韻')) return 'e͇'; // −high, −low, +divII,        −rnd, +tense
	if (is('　江　　　　韻')) return 'œ͇'; // −high, −low, +divII,        +rnd, +tense
	if (is('　青添齊先蕭韻')) return 'e'; // −high, −low, +front, −back, −rnd, +tense
	if (is('　登覃咍痕豪韻')) return 'ə'; // −high, −low, +front, −back, −rnd, +tense
	if (is('模冬　灰魂　韻')) return 'o'; // −high, −low, +front, −back, −rnd, +tense
	if (is('麻庚銜夬刪肴韻 二等')) return 'a͇';
	                                      // −high, +low, +divII,        −rnd, +tense
	if (is('麻庚　　　　韻 三等') ||
		is('歌唐談泰寒　韻') ||
		is('戈　　　桓　韻')) return 'a'; // −high, +low, −front, −back, −rnd, +tense

	// 二合元音
	if (is('支韻')) return 'iə';     // +front, −back, −rnd, +tense
	if (is('魚虞鍾韻')) return 'ɨə'; // −front, −back, −rnd, +tense
	if (is('清韻')) return 'ia';     // +front, −back, −rnd, +tense
	if (is('陽韻')) return 'ɨa';     // +front, −back, −rnd, +tense

	throw new Error('无元音规则');
}

function getCoda() {
	if (is('通江宕梗曾攝')) return is('入聲') ? 'k' : 'ŋ';
	if (is('深咸攝'))       return is('入聲') ? 'p' : 'm';
	if (is('臻山攝'))       return is('入聲') ? 't' : 'n';
	if (is('佳韻'))         return ''; // 从蟹摄中排除无韵尾的佳韵
	if (is('微韻 或 蟹攝')) return 'j';
	if (is('幽韻 或 效攝')) return 'w';
	return '';
}

/**
为了简单，声调无视音系规则，直接生成
*/
function getTone() {
	if (声调符号用五度标记) {
		if (is('平聲')) return is清    ? '˦˧' : '˨˩';
		if (is('上聲')) return !is全浊 ? '˦˥' : '˨˧';
		if (is('去聲')) return is清    ? '˥˦˥' : '˧˨˧';
		if (is('入聲')) return !is全浊 ? '˥' : '˨˩';
	} else {
		if (is('平聲')) return is清    ? '᷇' : '᷅';
		if (is('上聲')) return !is全浊 ? '̋' : '̌';
		if (is('去聲')) return is清    ? '̂' : '̏';
		if (is('入聲')) return !is全浊 ? '́' : '̀';
	}
	throw new Error('无声调规则');
}

let initial = getInitial();
let glide = getGlide();
let nucleus = getNucleus();
let coda = getCoda();
let tone = getTone();

// 四、音系规则及其代码实现

/**
(1)  介音在非前锐音（卷舌音［知庄组］和龈后/腭音［章组和日以母］）后被声母吸收而删除
     G -> ∅ / [COR, −ant]__
*/
if (is('知莊章組 或 日以母')) glide = '';

/**
(2)  舌面介音被唇音或唇化声母同化［帮组或合口三 A、C］
     j -> ɥ / [+rnd]__
     j̈ -> ɥ̈ / [+rnd]__
          β / [LAB]__
*/
if (initial.includes('ʷ')) {
	glide = glide.replace('j', 'ɥ');
} else if (is('幫組')) {
	if (glide == 'j̈') glide = 'β';
}

/**
(3)  唇化的声母 j 实现为 ɥ［以母合口］
     jʷ -> ɥ
*/
if (initial == 'jʷ') initial = 'ɥ';

/**
(4)  j 韵尾在低元音和中松元音后［祭泰夬废］实现为 ɹ
     j -> ɹ / {[+low], [−high, −tense]}__
*/
if (nucleus.includes('a') || nucleus == 'ɜ') {
	if (coda == 'j') coda = 'ɹ';
}

/**
(5)  松元音的前后被前接辅音的锐钝同化
     ɪ -> i / [COR]__
          ɨ / 其他环境
     ɜ -> e / [COR]__
          ə / 其他环境
*/
if ([...'ɹjɥ'].includes(glide) || is锐) {
	if (nucleus == 'ɪ') nucleus = 'i';
	if (nucleus == 'ɜ') nucleus = 'e';
} else {
	if (nucleus == 'ɪ') nucleus = 'ɨ';
	if (nucleus == 'ɜ') nucleus = 'ə';
}

/**
(6)  二合元音的后滑音（off-glide）部分被元音的前后同化 <>
     ə -> ɛ / [+front]__
       -> ɜ / [−front]__
*/
if (nucleus == 'iə') nucleus = 'iɛ';
if (nucleus == 'ɨə') nucleus = 'ɨɜ';

/**
(7)  一等韵的韵核 /a/ 实现为 [ɑ]
     三等韵的韵核 /a/ 在 i 后［清韵］实现为 [æ]；
					  在其他锐音后实现为 [a]，但锐音是唇化［戈三合］的除外
	                  在钝音后［歌戈阳韵］实现为 [ɑ]
     a -> æ / i__
	   -> a / {[COR, +ant, −rnd]G, [COR, −ant]}__
       -> ɑ / 其他环境
*/
if (nucleus == 'ia') nucleus = 'iæ';
if (nucleus == 'ɨa') nucleus = 'ɨɑ';
if (nucleus == 'a') {
	nucleus = 'ɑ';
	if (is锐 && glide && !initial.includes('ʷ') || is锐后 || !is锐 && [...'ɹjɥ'].includes(glide)) {
		if ('ŋk'.includes(coda)) nucleus = 'a'; // 音系规则本来不限制韵尾，但章组谈韵有“㶒譫”两小韵，需要归到 ɑ，所以在这里过滤
	}
}

/**
(8)  央高元音被唇音或唇化声母同化（包括二合元音 ɨɜ -> ʉɜ［虞韵］）
     ɨ -> ʉ / {[LAB], [+rnd]}__
*/
if (initial.includes('ʷ') || initial == 'ɥ' || glide == 'β') {
	nucleus = nucleus.replace('ɨ', 'ʉ');
}

/**
(9)  卷舌咝音和龈韵尾之间的 i 舌冠化为 ɹ̩（［庄组真臻欣韵开口］） <>
     i -> ɹ̩ / [卷舌, +fric, −rnd]__[COR]
*/
if (is('莊組') && !initial.includes('ʷ') && [...'nt'].includes(coda)) {
	if (nucleus == 'i') nucleus = 'ɹ̩';
}

/**
(10) 央中元音在唇音或唇化韵尾前实现为后元音（［豪覃韵］）<>
     ə -> ʌ / 非G__{[LAB], [+rnd]}
*/
if (!glide && [...'mpw'].includes(coda)) {
	if (nucleus == 'ə') nucleus = 'ʌ';
}

/**
(11) ［𠑆𦑣䎎小韵］
     e -> ə / [COR, +ant, +rnd]G__[LAB]
*/
if (is锐 && initial.includes('ʷ') && [...'mp'].includes(coda)) {
	if (nucleus == 'e') nucleus = 'ə';
}

/**
(12) 齿龈阻音［端精组］后的介音接前元音时被同化（唇化时可选）
     G -> j / [COR, +ant, −son, −rnd]__[+front]
          ɥ / [COR, +ant, −son, +rnd]__[+front] <>
*/
if (is锐前 && 'ieæa'.includes(nucleus[0])) {
	if (!initial.includes('ʷ')) {
		if (glide) glide = 'j';
	} else if (false) {
		if (glide) glide = 'ɥ';
	}
}

/**
(13) i 在唇音或唇化声母和软腭韵尾之间［蒸幽韵］增生 ɹ 滑音（可选）
     G -> ɹ / {[LAB], [+rnd]}__i[DOR]
*/
if ((initial.includes('ʷ') || glide == 'β') && nucleus == 'i' && [...'ŋkw'].includes(coda)) {
	glide = 'ɹ';
}

/**
(14) 接介音的 ɣ［云母］实现为 ɹ <>
     ɣG -> ɹ
     ɣʷG -> ɹʷ
*/
if (initial.includes('ɣ') && glide) {
	initial = initial.replace('ɣ', 'ɹ'); // ɹ 视为声母
	glide = '';
}

/**
(15) 软腭音直接后接元音时［见系和匣母非三等］实现为软腭后音
     [软腭] -> [软腭后] / __V
*/
if (!glide) {
	initial = velarToUvular(initial);
}

/**
(16) h 直接后接元音时［晓母非三等］实现为软腭后音
     h -> χ / __V
*/
if (!glide) {
	initial = initial.replace('h', 'χ');
}

/**
(17) 后元音后的软腭韵尾［通江宕摄］实现为软腭后音
     [DOR] -> [+back] / {[+round], [+low, +back]}__
*/
if ('ʉuoœ'.includes(nucleus[0]) || nucleus.includes('ɑ')) {
	coda = velarToUvular(coda);
}

/**
(18) 钝音声母和无介音齿/龈声母后的 u［侯韵］裂化
     u -> u / [COR, −ant]__#
	      ɘu / 其他__#
*/
if (nucleus == 'u' && !coda) {
	nucleus = 'ɘu';
	if (is锐后 || is('云母') || glide) nucleus = 'u';
}

/**
(19) 高元音+半元音［微幽韵］实现为二合元音
     j -> i / [+high]__
     w -> u / [+high]__
*/
if ('iɨʉuɪ'.includes(nucleus)) {
	if (coda == 'j') coda = 'i';
	if (coda == 'w') coda = 'u';
}

/**
(20) 移除与韵核同部位介音
     [DOR, +son] -> ∅ / C__[+high, −back]
*/
if ('iɨʉ'.includes(nucleus[0])) {
	if (['j', 'ɥ', 'j̈', 'ɥ̈'].includes(glide)) glide = '';
}

/**
(21) 齿龈音［端精组］非后高元音省略介音
     {j, ɥ} -> ∅ / [COR, +ant, −son]__[+high, +front, −back]
	 G      -> ∅ / [COR, +ant, −son]__[+high, −front, −back]
*/
if (is锐前) {
	if (nucleus[0] == 'i' && [...'jɥ'].includes(glide))	glide = '';
	if ('ɨʉ'.includes(nucleus[0])) glide = '';
}

/**
后处理

(1)  知组声母用卷舌塞音
7.介音用元音
3.中元音写半低
2.ɑ写成a歌系韵核用前低元音
6.二等替换双下横线
5.二等用hook
8.韵尾用元音
声调不分阴阳

*/

if (二等元音用双下横线) {
	nucleus = nucleus.replace('͇', '̳');
}

if (歌系韵核用前低元音) {
	nucleus = nucleus.replace('ɑ', 'a');
}



if (声调符号用五度标记) return initial + glide + nucleus + coda + tone;

if (声调附加符标韵核上) return initial + glide + nucleus + tone + coda;

// 需要用无中断空格，否则位于行首的空格可能被浏览器忽略
return '\xA0' + tone + initial + glide + nucleus + coda;
