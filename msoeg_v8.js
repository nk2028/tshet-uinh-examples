/* msoeg 中古擬音 V8
 *
 * https://zhuanlan.zhihu.com/p/145409852
 *
 * @author unt
 */

/** @type { 音韻地位['屬於'] } */
const is = (...x) => 音韻地位.屬於(...x);
/** @type { 音韻地位['判斷'] } */
const when = (...x) => 音韻地位.判斷(...x);

let isIPA = 選項.音標體系 !== 'MPA';
let 音標體系changed = 選項._last音標體系 && 選項._last音標體系 !== 選項.音標體系;
let mpaRevoked = false; // 用於在用戶選擇放棄使用 MPA 時刷新選項列表的內容
if (音標體系changed && 選項.音標體系 === 'MPA') {
  const message = '請注意 MPA 不是國際音標，其中諸多符號不可按國際音標理解，容易引起誤會。在公共場合使用 MPA 後果自負！\n\n確認使用 MPA？';
  if (!confirm(message)) { // eslint-disable-line no-undef
    isIPA = true;
    音標體系changed = false;
    mpaRevoked = true;
  }
}

if (!音韻地位) return [
  ['_last音標體系', [1, !mpaRevoked && 選項.音標體系 || '國際音標'], { hidden: true }],
  ['音標體系', [1, '國際音標', 'MPA'], {
    reset: mpaRevoked,
    description: [
      '擬音中用到的 MPA（即 msoeg 音標）與國際音標對照',
      // 詳見 https://zhuanlan.zhihu.com/p/710982203
      '(1)\u2002腭噝音（章組）[tɕ] MPA 作 ⟨tç⟩',
      '(2)\u2002r 化元音記號 [◌˞\u2006] MPA 作 ⟨◌̣⟩',
      '(3)\u2002[i ɯ̯ ɯ u ɛ ɔ a] 對應的 r 化元音 MPA 作 ⟨ị ɨ̣ ɯ̣ ụ ɜ̣ ɞ̣ ạ⟩',
      '(4)\u2002[o̯]（實即 [ȗ̙]）MPA 作 ⟨ᵒ⟩',
      '此外，擬音中的 MPA ⟨ɯ/u、ɤ/o、ʌ/ɔ、ɑ⟩ 是非前元音，⟨ɛ、ɜ̣/ɞ̣、ʌ/ɔ⟩ 是中元音，這裏保留 MPA 原貌',
    ].join('\n'),
  }],
  ['r化元音記號|r 化元音記號\n知乎文章用下加點\n韻鑒用 r 音鉤\n「r 化」原文稱「捲舌」', [
    isIPA ? 1 : 3,
    { text: 'r 音鉤（帶空隙）◌˞', value: '\u02DE\u2006' },
    { text: 'r 音鉤（無空隙）◌˞', value: '\u02DE' },
    { text: '下加點 ◌̣', value: '\u0323' },
  ].slice(0, isIPA ? 3 : 4), { reset: 音標體系changed }],
  ['通江宕攝韻尾|\n知乎文章用 ŋʷ/kʷ\n韻鑒用 ɴ/q', [3, 'ŋ/k', 'ŋʷ/kʷ', 'ɴ/q']],
  ['聲調記號|\n上標的 ʔ Unicode 未收，這裏以 ˀ 代替',
    [1, '上ʔ 去h', '上ˀ 去ʰ'].filter((_, i) => isIPA || i !== 1),
    { reset: 音標體系changed },
  ],
  ['顯示高級選項', false],

  選項.顯示高級選項 ? '高級選項' : '',
  ['保留非三等ʶ記號|保留非三等 ʶ 記號\nʶ 不是標準國際音標，代表舌根偏後',
    false, { hidden: !選項.顯示高級選項 }],
  ['章組|\n知乎文章和韻鑒用腭噝音',
    [2, '齦後噝音 tʃ', isIPA ? '腭噝音 tɕ' : '腭噝音 tç'], { hidden: !選項.顯示高級選項 }],
  ['莊三韻母起始|\n知乎文章用 r 化元音\n韻鑒用 ɻ\n這裏默認用普通的三等起始（B 類或 C 類）',
    [1, '普通', 'r 化元音', 'ɻ'], { hidden: !選項.顯示高級選項 }],
  ['覺韻|\n知乎文章和韻鑒用低元音\n這裏默認用中元音，與江韻一致',
    [1, '中元音', '低元音'], { hidden: !選項.顯示高級選項 }],
  ['庚三清|\n知乎文章和韻鑒用低元音',
    [2, '中元音', '低元音'], { hidden: !選項.顯示高級選項 }],
  ['宕攝入聲附加|\n知乎文章和韻鑒用 ⁽ʷ⁾\n這裏默認省略',
    [1, '無', '⁽ʷ⁾', 'ʷ'], { hidden: !選項.顯示高級選項 || 選項.通江宕攝韻尾?.includes('ʷ') }],
];

function get聲母_默認拼寫() {
  // 五十一聲類 + 俟母
  const 普通聲母字典 = {
    幫: 'p', 滂: 'pʰ', 並: 'b', 明: 'm',
    知: 'ʈ', 徹: 'ʈʰ', 澄: 'ɖ', 孃: 'ɳ', 來: 'ɭ',
    見: 'k', 溪: 'kʰ', 羣: 'ɡ', 疑: 'ŋ', 云: 'w',
    影: 'ʔ', 曉: 'x',
    精: 'ts', 清: 'tsʰ', 從: 'dz', 心: 's', 邪: 'z',
    莊: 'tʂ', 初: 'tʂʰ', 崇: 'dʐ', 生: 'ʂ', 俟: 'ʐ',
    章: 'tɕ', 昌: 'tɕʰ', 常: 'dʑ', 書: 'ɕ', 船: 'ʑ', 日: 'ɲ', 以: 'j',
  };
  const 非三等聲母字典 = {
    幫: 'pʶ', 滂: 'pʶʰ', 並: 'bʶ', 明: 'mʶ',
    端: 'tʶ', 透: 'tʶʰ', 定: 'dʶ', 泥: 'nʶ', 來: 'lʶ',
    見: 'q', 溪: 'qʰ', 疑: 'ɴ',
    影: 'ʔʶ', 曉: 'χ', 匣: 'ʁ',
    精: 'tsʶ', 清: 'tsʶʰ', 從: 'dzʶ', 心: 'sʶ',
  };
  if (is`云母 開口 非 侵鹽韻`) return 'ɰ';
  if (is`以母 合口 或 以母 東鍾虞韻`) return 'ɥ';
  if (is`三等 或 來母 二等 非 庚韻`) return 普通聲母字典[音韻地位.母] || 非三等聲母字典[音韻地位.母];
  return 非三等聲母字典[音韻地位.母] || 普通聲母字典[音韻地位.母];
}

function get聲母() {
  let 聲母 = get聲母_默認拼寫();
  if (選項.章組.includes('ʃ')) {
    聲母 = 聲母.replace('ɕ', 'ʃ').replace('ʑ', 'ʒ');
  } else if (選項.章組.includes('ç')) {
    聲母 = 聲母.replace('ɕ', 'ç').replace('ʑ', 'ʝ');
  }
  if (!選項.保留非三等ʶ記號) {
    聲母 = 聲母.replace('ʶ', '');
  }
  return 聲母;
}

function get韻母() {
  let 韻母 = when([
    ['之韻', 'ɯ'], ['支韻', 'e'], ['魚韻', 'ɤ'], ['虞模韻', 'o'],
    ['佳韻', 'ɜ̣'],
    ['麻韻 三四等', 'a'], ['麻韻', 'ạ'], ['歌韻', 'ɑ'],

    [選項.庚三清 === '中元音' && '庚清韻 三等', 'ɛŋ'],
    [選項.覺韻 === '低元音' && '江韻 入聲', 'ɑ̣ɴ'],
    ['蒸韻', 'ɯŋ'], ['東韻', 'uɴ'], ['鍾韻', 'oɴ'],
    ['青韻', 'ɛŋ'], ['耕韻', 'ɜ̣ŋ'], ['登韻', 'ʌŋ'], ['冬韻', 'ɔɴ'], ['江韻', 'ɞ̣ɴ'],
    ['庚清韻 (三四等 或 端組 或 來母)', 'aŋ'], ['庚清韻', 'ạŋ'], ['陽唐韻', 'ɑɴ'],

    ['脂韻', 'ii'], ['微韻', 'ɯi'],
    ['齊祭韻', 'ɛi'], ['皆韻', 'ɜ̣i'], ['灰咍廢韻', 'ʌi'],
    ['夬韻', 'ại'], ['泰韻', 'ɑi'],

    ['真臻韻', 'in'], ['殷韻', 'ɯn'], ['文韻', 'un'],
    ['先仙韻', 'ɛn'], ['山韻', 'ɜ̣n'], ['元魂痕韻', 'ʌn'],
    ['刪韻', 'ạn'], ['寒韻', 'ɑn'],

    ['幽韻', 'iu'], ['尤侯韻', 'uu'],
    ['蕭宵韻', 'ɛu'],
    ['肴韻', 'ạu'], ['豪韻', 'ɑu'],

    ['侵韻', 'im'],
    ['鹽添韻', 'ɛm'], ['咸韻', 'ɜ̣m'], ['嚴凡韻', 'ʌm'], ['覃韻', 'ɔm'],
    ['銜韻', 'ạm'], ['談韻', 'ɑm'],
  ]);

  // 等類記號
  if (is`三等` || is`四等` && 韻母.startsWith('a')) {
    if (韻母.startsWith('ɯ') && is`銳音 或 蒸韻 AB類`) 韻母 = 'i' + 韻母;
    else if (/^[eɛa]/.test(韻母)) 韻母 = 'i' + 韻母;
    else if (/^[ɤʌɑ]/.test(韻母)) 韻母 = 'ɯ' + 韻母;
    else if (韻母.startsWith('o')) 韻母 = 'u' + 韻母;

    if (韻母.startsWith('i') && is`B類 非 幽韻`) {
      // 幽韻知乎原文和韻鑒僅 A 類
      // 其中，支宵侵的重紐三等開口歸 C 類
      韻母 = 韻母.replace('i', is`支宵韻 或 侵韻 見影組 非 云母` ? 'ɯ' : 'ị');
    }

    if (is`莊組`) {
      韻母 = 韻母.replace(/^i/, 'ị'); // 莊組 AB 類歸 B 類
      if (選項.莊三韻母起始 === 'r 化元音') {
        韻母 = 韻母.replace(/^(.)̣?(.*)/, '$1̣$2');
        韻母 = 韻母.replace(/ị(?!e)|ɯ̣(?!ɤ)/, 'ɨ̣'); // ABC 類的起始都等同於二等的 ɨ̣，支魚韻除外
      } else if (選項.莊三韻母起始 === 'ɻ') {
        韻母 = 韻母.replace(/(ị|^ɯ(?!ɤ))?/, 'ɻ'); // 以其他元音起始的則直接前加 ɻ，魚韻除外
      }
    }
  } else {
    if (韻母.startsWith('u')) 韻母 = 'ᵒ' + 韻母;
  }

  // 開合記號
  if (韻母.startsWith('ɯ')) {
    if (is`合口 或 幫組 非 支宵侵韻`) 韻母 = 韻母.replace('ɯ', 'u');
  } else {
    if (is`合口 非 云以母`) 韻母 = 韻母.replace(/(ɻ?)(.*)/, '$1ʷ$2').replace('ʷu', 'u');
  }

  if (isIPA) 韻母 = 韻母
    .replace('ɨ̣', 'ɯ̣')
    .replace('ɜ̣', 'ɛ̣').replace('ɞ̣', 'ɔ̣')
    .replace('ᵒ', 'o̯');
  韻母 = 韻母
    .replace('ii', 'i').replace('uu', 'u')
    .replace('̣', 選項.r化元音記號)
    .replace('ɴ', 選項.通江宕攝韻尾.split('/')[0]);
  if (is`入聲`) 韻母 = 韻母
    .replace('m', 'p')
    .replace('n', 't')
    .replace('ŋ', 'k')
    .replace('ɴ', 'q');
  if (is`江攝 入聲` && !韻母.endsWith('ʷ') && 選項.覺韻 === '低元音') 韻母 += 'ʷ';
  if (is`宕攝 入聲` && !韻母.endsWith('ʷ')) 韻母 += 選項.宕攝入聲附加.replace('無', '');
  return 韻母;
}

function get聲調() {
  if (is`平入聲`) return '';
  return 選項.聲調記號.split(' ')[+is`去聲`].slice(1);
}

return get聲母() + get韻母() + get聲調();
