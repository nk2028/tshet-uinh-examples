/* unt 切韻朗讀音
 *
 * https://zhuanlan.zhihu.com/p/58227457
 *
 * @author Ayaka
 */

const is = (x) => 音韻地位.屬於(x);

function 聲母規則() {
  if (is('幫母')) return 'p';
  if (is('滂母')) return 'pʰ';
  if (is('並母')) return 'b';
  if (is('明母')) return 'm';
  if (is('端母')) return 't';
  if (is('透母')) return 'tʰ';
  if (is('定母')) return 'd';
  if (is('泥母')) return 'n';
  if (is('知母')) return 'ʈ';
  if (is('徹母')) return 'ʈʰ';
  if (is('澄母')) return 'ɖ';
  if (is('孃母')) return 'ɳ';
  if (is('精母')) return 't͡s';
  if (is('清母')) return 't͡sʰ';
  if (is('從母')) return 'd͡z';
  if (is('心母')) return 's';
  if (is('邪母')) return 'z';
  if (is('莊母')) return 't͡ʂ';
  if (is('初母')) return 't͡ʂʰ';
  if (is('崇母')) return 'd͡ʐ';
  if (is('生母')) return 'ʂ';
  if (is('俟母')) return 'ʐ';
  if (is('章母')) return 't͡ɕ';
  if (is('昌母')) return 't͡ɕʰ';
  if (is('常母')) return 'd͡ʑ';
  if (is('書母')) return 'ɕ';
  if (is('船母')) return 'ʑ';
  if (is('見母')) return is('三等') ? 'k' : 'q';
  if (is('溪母')) return is('三等') ? 'kʰ' : 'qʰ';
  if (is('羣母')) return is('三等') ? 'ɡ' : 'ɢ';
  if (is('疑母')) return is('三等') ? 'ŋ' : 'ɴ';
  if (is('影母')) return 'ʔ';
  if (is('曉母')) return is('三等') ? 'h' : 'χ';
  if (is('匣母')) return is('三等') ? 'ɦ' : 'ʁ';
  if (is('云母')) return '';
  if (is('以母')) return 'j';
  if (is('來母')) return 'l';
  if (is('日母')) return 'ɲ';
  throw new Error('無聲母規則');
}

function 韻母規則() {
  // 通攝
  if (is('東韻 一等')) return 'uŋʷ';
  if (is('東韻 三等')) return 'ẅuŋʷ';
  if (is('冬韻')) return 'oŋʷ';
  if (is('鍾韻')) return 'ẅɔŋʷ';
  // 江攝
  if (is('江韻')) return 'ɻæŋʷ';
  // 止攝
  if (is('支韻 合口')) return 'ʳɥɛ';
  if (is('支韻')) return 'ʳjɛ';
  if (is('脂韻 合口')) return 'ʳɥi';
  if (is('脂韻')) return 'ʳi';
  if (is('之韻')) return 'ɨ';
  if (is('微韻 開口')) return 'ɨj';
  if (is('微韻')) return 'ẅɨj';
  // 遇攝
  if (is('魚韻')) return 'j̈ə';
  if (is('虞韻')) return 'ẅɔ';
  if (is('模韻')) return 'o';
  // 蟹攝
  if (is('齊韻 合口')) return 'wej';
  if (is('齊韻')) return 'ej';
  if (is('祭韻 合口')) return 'ʳɥɛjɕ';
  if (is('祭韻')) return 'ʳjɛjɕ';
  if (is('泰韻 合口')) return 'wɑjɕ';
  if (is('泰韻')) return 'ɑjɕ';
  if (is('佳韻 合口')) return 'wɻæ';
  if (is('佳韻')) return 'ɻæ';
  if (is('皆韻 合口')) return 'wɻæj';
  if (is('皆韻')) return 'ɻæj';
  if (is('夬韻 合口')) return 'wɻajɕ';
  if (is('夬韻')) return 'ɻajɕ';
  if (is('咍韻')) return 'ɐj';
  if (is('灰韻')) return 'wɔ̞j';
  if (is('廢韻 開口')) return 'j̈əjɕ';
  if (is('廢韻')) return 'ẅəjɕ';
  // 臻攝
  if (is('眞韻 合口')) return 'ʳɥin';
  if (is('眞韻')) return 'ʳin';
  if (is('臻韻')) { // [^1]
    if (is('平入聲')) return 'ɻi˞n';
    if (is('上聲')) return 'ɨn';
    if (is('去聲')) return 'ɻin';
  }
  if (is('欣韻')) return 'ɨn';
  if (is('文韻')) return 'ẅun';
  if (is('元韻 開口')) return 'j̈ən';
  if (is('元韻')) return 'ẅən';
  if (is('痕韻')) return 'ɘn';
  if (is('魂韻')) return 'won';
  // 山攝
  if (is('寒韻 開口')) return 'ɑn';
  if (is('寒韻')) return 'wɑn';
  if (is('刪韻 合口')) return 'wɻan';
  if (is('刪韻')) return 'ɻan';
  if (is('山韻 合口')) return 'wɻæn';
  if (is('山韻')) return 'ɻæn';
  if (is('仙韻 合口')) return 'ʳɥɛn';
  if (is('仙韻')) return 'ʳjɛn';
  if (is('先韻 合口')) return 'wen';
  if (is('先韻')) return 'en';
  // 效攝
  if (is('蕭韻')) return 'ew';
  if (is('宵韻')) return 'ʳjɛw';
  if (is('肴韻')) return 'ɻaw';
  if (is('豪韻')) return 'ɑw';
  // 果攝
  if (is('歌韻 一等 開口')) return 'ɑ';
  if (is('歌韻 一等')) return 'wɑ';
  if (is('歌韻 三等 開口')) return 'j̈ɑ';
  if (is('歌韻 三等')) return 'ẅɑ';
  // 假攝
  if (is('麻韻 二等 合口')) return 'wɻa';
  if (is('麻韻 二等')) return 'ɻa';
  if (is('麻韻 三等')) return 'ja';
  // 宕攝
  if (is('陽韻 開口')) return 'j̈ɐŋ';
  if (is('陽韻')) return 'ẅɐŋ';
  if (is('唐韻 合口')) return 'wɑŋ';
  if (is('唐韻')) return 'ɑŋ';
  // 梗攝
  if (is('庚韻 二等 合口')) return 'wɻaɲ';
  if (is('庚韻 二等')) return 'ɻaɲ';
  if (is('庚韻 三等 合口')) return 'ɻɥaɲ';
  if (is('庚韻 三等')) return 'ɻjaɲ';
  if (is('耕韻 合口')) return 'wɻæɲ';
  if (is('耕韻')) return 'ɻæɲ';
  if (is('清韻 合口')) return 'ɥɛɲ';
  if (is('清韻')) return 'ʳjɛɲ'; // [^2]
  if (is('青韻 合口')) return 'weɲ';
  if (is('青韻')) return 'eɲ';
  // 曾攝
  if (is('蒸韻 合口')) return 'ʳɥiŋ'; // [^2]
  if (is('蒸韻')) return 'ʳiŋ'; // [^2]
  if (is('登韻 合口')) return 'wɘŋ';
  if (is('登韻')) return 'ɘŋ';
  // 流攝
  if (is('尤韻')) return 'ɥ̈u';
  if (is('侯韻')) { // 根據設定，侯韻幫組為 u，其他為 ɘu
    if (is('幫組')) return 'u';
    return 'ɘu';
  }
  if (is('幽韻')) return 'ɥÿ';
  // 深攝
  if (is('侵韻')) return 'ʳim';
  // 咸攝
  if (is('覃韻')) return 'ɐm';
  if (is('談韻')) return 'ɑm';
  if (is('鹽韻')) return 'ʳjɛm';
  if (is('添韻')) return 'em';
  if (is('咸韻')) return 'ɻæm';
  if (is('銜韻')) return 'ɻam';
  if (is('嚴韻')) return 'j̈əm';
  if (is('凡韻')) return 'ẅɞm';
  throw new Error('無韻母規則');
}

function 聲調規則() {
  if (is('平聲')) return is('全清 或 次清') ? '˦' : '˨˩';
  if (is('上聲')) return !is('全濁') ? '˦˦˥' : '˨˨˧';
  if (is('去聲')) return is('全清 或 次清') ? '˥˩' : '˧˩˨';
  if (is('入聲')) return !is('全濁') ? '˥' : '˨˩';
  throw new Error('無聲調規則');
}

let 聲母 = 聲母規則();
let 韻母 = 韻母規則();
let 聲調 = 聲調規則();

// 處理重紐 [^3]
if (韻母.startsWith('ʳ')) {
  if (is('知莊組')) {
    韻母 = `ɻ${韻母.slice(1)}`; // 無重紐對立，認定為重紐B類
  } else if (is('端精章組 或 以來日母')) {
    韻母 = 韻母.slice(1); // 無重紐對立，認定為重紐A類
  } else if (is('重紐A類')) {
    韻母 = 韻母.slice(1); // 有重紐對立，默認為重紐A類
  } else {
    韻母 = `ɻ${韻母.slice(1)}`; // 有重紐對立，重紐B類
  }
}

// 處理脣音
if (is('幫組')) {
  // 除三等C类外，其他韵母与帮组p相拼时均为开口（不含 [ʷ] 成分）。
  if (韻母.startsWith('ɥ') && !韻母.startsWith('ɥ̈')) {
    韻母 = `j${韻母.slice(1)}`;
  } else if (韻母.startsWith('w') && !韻母.startsWith('ẅ')) {
    韻母 = 韻母.slice(1);
  // 三等C类与帮组p相拼时是ɥ̈，即 [ÿ] 对应的半元音。[^4]
  } if (is('三等') && 韻母.startsWith('ẅ')) {
    韻母 = `ɥ̈${韻母.slice(2)}`;
  }
}

// 調整 ɻ、w 的顺序 [^5]
if (韻母.startsWith('wɻ') && is('知莊組')) {
  韻母 = `ɻw${韻母.slice(2)}`;
}

// 以母簡化拼式
// 總結：以母三A/三B，以 j 或 ɥ 起始時，省略聲母
if (is('以母 三等 支脂祭眞仙宵臻麻清庚蒸侵鹽韻') && (韻母.startsWith('j') || 韻母.startsWith('ɥ'))) {
  聲母 = '';
}

// 處理入聲韻
if (is('入聲')) {
  if (韻母.endsWith('m')) {
    韻母 = `${韻母.slice(0, -1)}p`;
  } else if (韻母.endsWith('n')) {
    韻母 = `${韻母.slice(0, -1)}t`;
  } else if (韻母.endsWith('ɲ')) {
    韻母 = `${韻母.slice(0, -1)}c`;
  } else if (韻母.endsWith('ŋ')) {
    韻母 = `${韻母.slice(0, -1)}k`;
  } else if (韻母.endsWith('ŋʷ')) {
    韻母 = `${韻母.slice(0, -2)}kʷ`;
  }
}

// 當没有聲母，韻母以 ɨ 起始時，添加聲母 j̈
if (聲母 === '' && 韻母 === 'ɨ') {
  聲母 = 'j̈';
}

return 聲母 + 韻母 + 聲調;

/*
[^1]: 臻韵ɻi˞n的韵腹i˞带有r色彩，同时像三等B类介音ɻj一样，这个i˞没有那么靠前（见图2）。这就像大埔方言（客家话）的“真”[tʃ˞i˞n]（[t͡ʃ] = [t͡ʂ̻]）[20]一样。臻韵ɻi˞n只出现于庄组t͡ʂ的平声和入声后，与上声和去声的真B开ɻin、欣韵ɨn互补，实际上它的韵腹只是i在卷舌声母和舌冠（coronal）韵尾n的共同影响下产生的强r色彩变体，而且可以看作一种声调变韵；但根据元音分韵原则，我们必须承认臻韵ɻi˞n的独立性。这里的“ɻ”对标音来说完全是多余的（见介音第8c条），但保留“ɻ”能使它的前两个字符“ɻi”符合三等B类韵母的拼写，因此保留。
庄组t͡ʂ上声和去声的真B开ɻin、欣韵ɨn（包括“𧤛”t͡ʂɨn˦˦˥、“龀”t͡ʂʰɨn˦˦˥、“浕”d͡ʐɻin˨˨˧、“榇”t͡ʂʰɻin˥˩ 4个小韵。两个韵母在庄组t͡ʂ后没有对立）可以遵照《广韵》的归韵，不一定也要读成臻韵ɻi˞n。

[^2]: 谆韵ɥin、清开jɛɲ、蒸韵ɻiŋ虽无重纽对立（表2中无下划线），但实际上有跨A、B两类的情况：谆韵ɥin、清开jɛɲ与知ʈ、庄t͡ʂ组相拼时是B类（如“椿”ʈʰɻɥin˦、“贞”ʈɻjɛɲ˦），蒸韵ɻiŋ与精t͡s、章t͡ɕ组和日ɲ、以j母相拼时是A类（如“仍”ɲiŋ˨˩）。

[^3]:  “ʳ”代表该韵有重纽对立：B类在“ʳ”的位置有ɻ介音，A类无ɻ介音。
为节省空间，A、B两类韵母写在同一格中。

[^4]: [ÿ]（= [ɨᵝ]）是央高不突出圆唇元音，与央高突出圆唇元音 [ʉ] 的圆唇类型不同。突出圆唇（protruded rounding）元音的双唇外凸，露出嘴唇的内侧，由内唇（endolabial）参与调音；不突出圆唇（compressed rounding）元音的双唇收敛，不露出内唇，由外唇（exolabial）参与调音，可视为元音与双唇近音 [β̞] 的双重调音。
［这个不突出唇化的近音ɥ̈与帮组p调音部位相同，在后世导致声母（塞）擦化，即轻唇化（见声母第4b条）。］

[^5]: 卷舌音后的二等合口介音写成ɻw，体现ɻ和卷舌声母的一体性
卷舌音（即知ʈ、庄t͡ʂ组）
*/
