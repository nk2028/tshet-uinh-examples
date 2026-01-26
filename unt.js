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
  /* global document */
  let isZH = typeof document === 'undefined' || (document.documentElement?.lang?.startsWith('zh') ?? true);
  let prevRTR = 選項._prevRTR ?? true;
  let prevATR = 選項._prevATR ?? false;
  let currRTR = 選項.RTR ?? true;
  let currATR = 選項.ATR ?? false;
  if (!currRTR && !currATR) { // RTR 和 ATR 中至少選一項
    if (currRTR !== prevRTR) currATR = true;
    else currRTR = true;
  }
  return [
    ['_prevRTR', currRTR, { reset: true, hidden: true }],
    ['_prevATR', currATR, { reset: true, hidden: true }],

    isZH ? '非三等' : 'Type A: Divisions I, II & IV',
    ['RTR', currRTR, {
      reset: currRTR !== prevRTR,
      text: isZH ? '寫出 RTR（舌根偏後）符號' : 'Use RTR Diacritic',
      description: isZH ?
        `聲母下加├
         * 見組（以及曉匣母）非三等寫小舌音時，則不額外添加 RTR 符號` :
        `Add the retracted tongue root (RTR) diacritic [├] to the initial
         * When transcribing Type-A dorsal initials (見 Jiàn group, 曉 Xiǎo, and 匣 Xiá) as uvulars, the RTR diacritic is unnecessary and will not be added`,
    }],
    ['字母有降部時的RTR', 1, {
      hidden: !currRTR,
      text: isZH ? '字母有降部時 RTR 符號加在' : 'For Symbols with Descenders Place RTR Diacritic',
      options: [
        { text: isZH ? '上方，如 p᫡' : 'Above, e.g. [p᫡]', value: '᫡' },
        { text: isZH ? '下方，如 p̙' : 'Below, e.g. [p̙]', value: '̙' },
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
         * RTR 符號和 ATR 介音至少要寫出一方` :
        `Add advanced tongue root (ATR) medials to Division-III syllables:
         - After non-coronal (grave) initials, Subdivision C: [ɣ] (representing the velar approximant [ɣ̞] = [ɨ̯~ɯ̯])
         - After retroflex sibilant initials (莊 Zhuāng group): [ɹ]
         - After other coronal (acute) initials: [j]
         * At least one of RTR and ATR must be marked`,
    }],

    isZH ? '小舌音' : 'Uvulars',
    ['見組非三等寫小舌音', true, {
      text: isZH ? null : 'Transcribe Type-A Dorsal Initials as Uvulars',
      description: isZH ? '也包括曉匣母非三等' : 'Type-A dorsal initials = 見 Jiàn group, 曉 Xiǎo, and 匣 Xiá',
    }],
    ['通江宕攝音節尾寫小舌音', true, {
      text: isZH ? null : 'Transcribe Back Dorsal Codas as Uvulars',
      description: isZH ? '代表靠後的舌面音' : 'Back dorsal codas = codas of the 通 Tōng, 江 Jiāng, and 宕 Dàng rhyme groups',
    }],
    ['後低元音', [1, 'a', 'ɑ'], {
      hidden: 選項.通江宕攝音節尾寫小舌音 === false,
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
  let 聲母 = {
    幫: 'p', 滂: 'pʰ', 並: 'b', 明: 'm',
    端: 't', 透: 'tʰ', 定: 'd', 泥: 'n', 來: 'l',
    知: 'ʈ', 徹: 'ʈʰ', 澄: 'ɖ', 孃: 'ɳ',
    見: 'k', 溪: 'kʰ', 羣: 'ɡ', 疑: 'ŋ', 曉: 'x', 匣: 'ɣ', 云: 'w',
    影: 'ʔ',
    精: 'ts', 清: 'tsʰ', 從: 'dz', 心: 's', 邪: 'z',
    莊: 'tʂ', 初: 'tʂʰ', 崇: 'dʐ', 生: 'ʂ', 俟: 'ʐ',
    章: 'tɕ', 昌: 'tɕʰ', 常: 'dʑ', 書: 'ɕ', 船: 'ʑ', 日: 'ɲ', 以: 'j',
  }[音韻地位.母];
  if (is`(幫端精見影組 或 來母) 非 三等`) {
    聲母 = [...聲母].map(c => c === 'ʰ' ? c : c + '̙').join('');
  }
  return 聲母;
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
  if (選項.見組非三等寫小舌音) 音節.聲母 = { k̙: 'q', k̙ʰ: 'qʰ', ŋ̙: 'ɴ', x̙: 'χ', ɣ̙: 'ʁ' }[音節.聲母] ?? 音節.聲母;
  if (!選項.RTR) 音節.聲母 = 音節.聲母.replace('̙', '');
  if (['p', 'ŋ', 'ɣ'].includes(音節.聲母[0])) 音節.聲母 = 音節.聲母.replace('̙', 選項.字母有降部時的RTR);
  if (選項.ATR) 音節.介音 = when([
    ['C類', 'ɣ'],
    ['莊組 三等', 'ɹ'],
    ['銳音 三等 非 以母', 'j'],
    ['', ''],
  ]) + 音節.介音;
  if (!選項.通江宕攝音節尾寫小舌音) 音節.尾 = { q: 'k', qʰ: 'kʰ', ɴ: 'ŋ', χ: 'x', ʁ: 'ɣ' }[音節.尾] ?? 音節.尾;
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
