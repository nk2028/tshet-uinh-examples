/* unt 切韻擬音
 * unt’s Qieyun Reconstruction
 *
 * [出處待公佈 / Source TBA]
 *
 * 過往 unt 擬音（切韻擬音 L、切韻擬音 J、切韻通俗擬音、切韻朗讀音）已移入「unt 過往擬音」推導方案，不建議使用
 * Previous versions of unt’s reconstruction have been moved to the derivation scheme “unt’s Legacy Reconstructions” and are no longer recommended for use
 *
 * @author unt
 */

/** @type { 音韻地位['屬於'] } */
const is = (...x) => 音韻地位.屬於(...x);
/** @type { 音韻地位['判斷'] } */
const when = (...x) => 音韻地位.判斷(...x);

if (!音韻地位) {
  let isZH = typeof document === 'undefined' || (document?.documentElement?.lang?.startsWith('zh') ?? true);
  let prevRTR = 選項._prevRTR ?? true;
  let prevATR = 選項._prevATR ?? false;
  let prev小舌 = 選項._prev小舌 ?? true;
  let currRTR = 選項.RTR ?? true;
  let currATR = 選項.ATR ?? false;
  let curr小舌 = 選項.小舌 ?? true;
  if (curr小舌 !== prev小舌 && !curr小舌) currRTR = false; // RTR => 見組非三等寫小舌音
  if (!currRTR && !currATR) { // RTR 和 ATR 中至少選一項
    if (currRTR !== prevRTR) currATR = true;
    else currRTR = true;
  }
  if (currRTR !== prevRTR && currRTR) curr小舌 = true; // RTR => 見組非三等寫小舌音
  return [
    ['_prevRTR', currRTR, { reset: true, hidden: true }],
    ['_prevATR', currATR, { reset: true, hidden: true }],
    ['_prev小舌', curr小舌, { reset: true, hidden: true }],

    isZH ? '非三等' : 'Type A: Divisions I, II & IV',
    ['RTR', currRTR, {
      reset: currRTR !== prevRTR,
      text: isZH ? '寫出 RTR（舌根偏後）符號' : 'Use RTR Diacritic',
      description: isZH ?
        `聲母下加├
         見組除外，因爲見組非三等已經是小舌音，無需再加 RTR 符號
         （寫出 RTR 符號時，見組非三等必寫小舌音）` :
        `Add the retracted tongue root (RTR) diacritic [├] to the initial
         Except for Type-A dorsals (見 Jiàn group), which are already uvulars and do not require additional indication for RTR
         (When applying the RTR diacritic, Type-A dorsals must be transcribed as uvulars)`,
    }],
    ['pRTR', 1, {
      hidden: !currRTR,
      text: isZH ? 'RTR 的 p' : 'RTR Diacritic on [p]',
      options: [
        { text: isZH ? '符號加在上方 p᫡' : 'Above [p᫡]', value: 'p᫡' },
        { text: isZH ? '符號加在下方 p̙' : 'Below [p̙]', value: 'p̙' },
      ],
    }],

    isZH ? '三　等' : 'Type B: Division III',
    ['ATR', currATR, {
      reset: currATR !== prevATR,
      text: isZH ? '寫出 ATR（舌根偏前）介音' : 'Use ATR Medials',
      description: isZH ?
        `鈍音聲母三等 C 類寫 ɣ 介音（代表軟腭近音 ɣ̞ = ɨ̯~ɯ̯）
         莊組三等寫 ɹ 介音
         其他銳音聲母三等寫 j 介音
         （RTR 符號和 ATR 介音至少要寫出一方）` :
        `Add advanced tongue root (ATR) medials to Division-III syllables:
         After non-coronal (grave) initials, Subdivision C: [ɣ] (representing the velar approximant [ɣ̞] = [ɨ̯~ɯ̯])
         After retroflex sibilants (莊 Zhuāng group): [ɹ]
         After other coronal (acute) initials: [j]
         (At least one of RTR and ATR must be marked)`,
    }],

    isZH ? '小舌音' : 'Uvulars',
    ['小舌', curr小舌, {
      reset: curr小舌 !== prev小舌,
      text: isZH ? '見組非三等寫小舌音' : 'Transcribe Type-A Dorsals as Uvulars',
      description: isZH ? null : 'Dorsals = 見 Jiàn group',
    }],
    ['通江宕攝音節尾寫小舌音', true, {
      hidden: !curr小舌,
      text: isZH ? null : 'Transcribe Back Dorsal Codas as Uvulars',
      description: isZH ? null : 'Back dorsal codas = codas of the 通 Tōng, 江 Jiāng, and 宕 Dàng rhyme groups',
    }],
    ['後低元音', [1, 'a', 'ɑ'], {
      hidden: !curr小舌 || 選項.通江宕攝音節尾寫小舌音 === false,
      text: isZH ? null : 'Low Back Vowel',
      description: isZH ?
        '宕攝音節尾寫小舌音時，前後低元音互補，可合併' :
        'When transcribing the 宕 Dàng rhyme group codas as uvulars, the low front and back vowels are in complementary distribution and can be merged',
    }],

    isZH ? '其　他' : 'Misc',
    ['支韻', [2, 'ie̯', 'ie', 'e'], {
      text: isZH ? null : '支 Zhī Rhyme',
    }],
    ['微韻合口', [2, 'wɨj', 'uj'], {
      text: isZH ? null : '微 Wēi Rhyme, Hékǒu 合口',
    }],
    ['聲調記號', 0, {
      text: isZH ? null : 'Tone Marks',
      options: [
        { text: isZH ? '上ˊ 去ˋ' : 'Rising [ˊ], Departing [ˋ]', value: ',\u0301,\u0300,' },
        { text: isZH ? '上ʔ 去h' : 'Rising [ʔ], Departing [h]', value: ',ʔ,h,' },
        { text: isZH ? '五度符號' : 'Chao Tone Letters', value: '˦,˦˥,˦˩,˦,˨,˨˥,˨˩,˨' }, // ...陰調, ...陽調
        { text: isZH ? '省略' : 'None', value: ',,,' },
      ],
    }],
    ['音韻地位正則化', true, {
      text: isZH ? '音韻地位正則化' : 'Phonological Position Normalization',
      description: isZH ?
        `銳音三 C₁ 韻 → 對應的 AB 韻（廢韻除外）
         銳音幽韻 → 尤韻
         明母尤韻 → 侯韻` :
        `Division-III Subdivision-C₁ rhymes following coronal (acute) initials → Corresponding Subdivision-AB rhymes (except for the 廢 Fèi rhyme)
         幽 Yōu rhyme following coronal (acute) initials → 尤 Yóu rhyme
         尤 Yóu rhyme following the initial 明 Míng → 侯 Hóu rhyme`,
    }],
    ['幫組拼ə時添加w介音', false, {
      text: isZH ?
        選項.微韻合口 === 'wɨj' ?
          '幫組拼 ɨ、ə 時添加 w 介音（蒸登韻除外）' :
          '幫組拼 ə 時添加 w 介音（登韻除外）' :
        選項.微韻合口 === 'wɨj' ?
          'Insert [w] Between Labials and [ɨ]/[ə]' :
          'Insert [w] Between Labials and [ə]',
      description: isZH ? null :
        `${選項.微韻合口 === 'wɨj' ?
          'Except for the 蒸 Zhēng and 登 Dēng rhymes' :
          'Except for the 登 Dēng rhyme'}
         Labials = 幫 Bāng group`,
    }],
  ];
}

function 音韻地位正則化() {
  function 調整(表達式, 調整屬性) { if (is(表達式)) 音韻地位 = 音韻地位.調整(調整屬性); }
  [['微', '脂'], ['殷文', '真'], ['元', '仙'], ['嚴凡', '鹽']]
    .forEach(([C1, AB]) => 調整(`銳音 ${C1}韻`, `${AB}韻`));
  調整('銳音 幽韻', `尤韻 開合中立 ${is`端組` ? '四等' : ''}`);
  調整('明母 尤韻', '侯韻 一等 不分類');
}

function get聲母() {
  if (is`云母 開口 非 (深咸攝 入聲)`) return ''; // 云母開口爲零聲母，但煜、曄小韻（視爲“合口”）除外
  return {
    幫: 'p p̙', 滂: 'pʰ p̙ʰ', 並: 'b b̙', 明: 'm m̙',
    端: '  t̙', 透: '   t̙ʰ', 定: '  d̙', 泥: '  n̙', 來: 'l l̙',
    知: 'ʈ  ', 徹: 'ʈʰ   ', 澄: 'ɖ  ', 孃: 'ɳ  ',
    見: 'k q', 溪: 'kʰ qʰ', 羣: 'ɡ  ', 疑: 'ŋ ɴ', 曉: 'x χ', 匣: 'ʁ', 云: 'w',
    影: 'ʔ ʔ̙',
    精: 'ts t̙s̙', 清: 'tsʰ t̙s̙ʰ', 從: 'dz d̙z̙', 心: 's s̙', 邪: 'z',
    莊: 'tʂ   ', 初: 'tʂʰ    ', 崇: 'dʐ   ', 生: 'ʂ  ', 俟: 'ʐ',
    章: 'tɕ   ', 昌: 'tɕʰ    ', 常: 'dʑ   ', 書: 'ɕ  ', 船: 'ʑ', 日: 'ɲ', 以: 'j',
  }[音韻地位.母].trim().split(' ').at(is`三等` - 1);
}

function get介音() {
  let 類介音 = { A: 'j', B: 'ɹ' }[音韻地位.類] ?? '';
  let 呼介音 = is`合口 非 云母` ? 'w' : '';
  return 類介音 + 呼介音;
}

function get音節核尾() {
  let [韻列表, 核] = [
    ['脂　│　　　│幽　│　　│　　│真臻　│侵　　', 'i'],
    ['之　│微　　│　　│蒸　│　　│殷　　│　　　', 'ɨ'],
    ['尤侯│＿＿＿│＿＿│＿＿│東＿│文＿＿│＿＿＿', 'u'],
    ['支　│齊祭　│蕭宵│青　│　　│先仙　│鹽添　', 'e'],
    ['佳　│皆　　│　　│耕　│　　│山　　│咸　　', 'eˤ'],
    ['魚　│灰咍廢│豪　│登　│　　│元魂痕│覃嚴凡', 'ə'],
    ['虞模│　　　│　　│　　│冬鍾│　　　│　　　', 'o'],
    ['＿＿│＿＿＿│＿＿│＿＿│江＿│＿＿＿│＿＿＿', 'oˤ'],
    ['麻　│夬　　│肴　│庚清│　　│刪　　│銜　　', is`二等` ? 'aˤ' : 'a'],
    ['歌　│泰　　│　　│　　│陽唐│寒　　│談　　', 'ɑ'],
  ].find(e => e[0].includes(音韻地位.韻));
  let 尾 = ['', ...'jwŋɴnm'][韻列表.split('│').findIndex(e => e.includes(音韻地位.韻))];
  if (is`入聲`) 尾 = { ŋ: 'k', ɴ: 'q', n: 't', m: 'p' }[尾];
  return { 核, 尾 };
}

function get聲調() {
  return 選項.聲調記號.split(',').at('平上去入'.indexOf(音韻地位.聲) - is`全濁` * 4);
}

function get音節() {
  const 音節 = {
    聲母: get聲母(),
    介音: get介音(),
    ...get音節核尾(),
    聲調: get聲調(),
  };
  if (!選項.RTR) 音節.聲母 = 音節.聲母.replace('̙', '');
  if (is`幫滂母`) 音節.聲母 = 音節.聲母.replace('p̙', 選項.pRTR);
  if (選項.ATR) 音節.介音 = when([
    ['C類', 'ɣ'],
    ['莊組 三等', 'ɹ'],
    ['銳音 三等 非 以母', 'j'],
    ['', ''],
  ]) + 音節.介音;
  const 小舌音替換字典 = { q: 'k', qʰ: 'kʰ', ɴ: 'ŋ', χ: 'x', ʁ: 'ɣ' };
  if (!選項.小舌) 音節.聲母 = 小舌音替換字典[音節.聲母] ?? 音節.聲母;
  if (!選項.小舌 || !選項.通江宕攝音節尾寫小舌音) 音節.尾 = 小舌音替換字典[音節.尾] ?? 音節.尾;
  else if (音節.核 === 'ɑ') 音節.核 = 選項.後低元音;
  if (is`支韻`) 音節.核 = 選項.支韻;
  if (is`微韻 非 開口`) 音節.核 = 選項.微韻合口.slice(-2, -1);
  if (選項.幫組拼ə時添加w介音 && ['ɨ', 'ə'].includes(音節.核) && is`幫組 非 曾攝`) 音節.介音 += 'w';

  if (is`四等` && 音節.核 !== 'e') 音節.介音 = 'j' + 音節.介音; // 爹小韻
  if (音節.核[0] === 'i') 音節.介音 = 音節.介音.replace('j', '');
  if (音節.核[0] === 'ɨ') 音節.介音 = 音節.介音.replace('ɣ', '');
  if (['u', 'o'].includes(音節.核[0])) 音節.介音 = 音節.介音.replace('w', '');
  音節.首 = 音節.聲母 + 音節.介音;
  音節.韻基 = 音節.核 + 音節.尾;
  音節.帶調韻基 = 選項.聲調記號.includes('\u0301') ?
    音節.核.slice(0, 1) + 音節.聲調 + 音節.核.slice(1) + 音節.尾 :
    音節.核 + 音節.尾 + 音節.聲調;
  音節.韻母 = 音節.介音 + 音節.韻基;
  音節.帶調韻母 = 音節.介音 + 音節.帶調韻基;
  return 音節;
}

if (選項.音韻地位正則化) 音韻地位正則化();
const 音節 = get音節();
return 音節.聲母 + 音節.帶調韻母;
