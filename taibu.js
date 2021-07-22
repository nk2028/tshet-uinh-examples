/* 推導大埔話(百侯聲)
 *
 * 音系及IPA標法見：https://zhuanlan.zhihu.com/p/349914674
 * 拼音方案見：https://zhuanlan.zhihu.com/p/350459791
 * 
 * @author 以成
 */

const is = (x) => 音韻地位.屬於(x);

if (!音韻地位) return [
  ['文白讀', [3, '文上白下', '僅白讀', '僅文讀']],
  ['音標', [1, '客家語拼音方案 (臺灣客拼)', '國際音標 (IPA)']],
  ['標調方式', [1, '數字調號', '符號調號', '數字調值', '折線調值']]
];

function 聲母規則(白讀) {
  if (is('幫母')) {
    if (is('東韻 三等 或 鍾微虞廢文元陽尤凡韻') && !白讀) return 'f';
    return 'b';
  }
  if (is('滂母')) {
    if (is('東韻 三等 或 鍾微虞廢文元陽尤凡韻') && !白讀) return 'f';
    return 'p';
  }
  if (is('並母')) {
    if (is('東韻 三等 或 鍾微虞廢文元陽尤凡韻') && !白讀) return 'f';
    return 'p';
  }
  if (is('明母')) {
    if (is('東韻 三等 或 鍾微虞廢文元陽尤凡韻') && !白讀) return 'v';
    return 'm';
  }

  if (is('端母')) return 'd';
  if (is('透母')) return 't';
  if (is('定母')) return 't';
  if (is('泥母')) return 'n';
  if (is('來母')) return 'l';

  if (is('知母')) return is('二等') ? 'z' : 'zh';
  if (is('徹母')) return is('二等') ? 'c' : 'ch';
  if (is('澄母')) return is('二等') ? 'c' : 'ch';
  if (is('孃母')) return 'n';

  if (is('精母')) return 'z';
  if (is('清母')) return 'c';
  if (is('從母')) return 'c';
  if (is('心母')) return 's';
  if (is('邪母')) {
    if (is('支脂之微韻 去聲')) return 'c';
    if (is('魚虞模東冬鍾侵韻 平聲')) return 'c';
    if (is('侯尤幽麻韻')) return 'c';
    return 's';
  }

  if (is('莊母')) return 'z';
  if (is('初母')) return 'c';
  if (is('崇母')) return 'c';
  if (is('生母')) return 's';
  if (is('俟母')) return 'c';

  if (is('章母')) return 'zh';
  if (is('昌母')) return 'ch';
  if (is('常母')) return 'sh';
  if (is('書母')) return 'sh';
  if (is('船母')) return 'sh';
  if (is('日母')) return 'ng';

  if (is('見母')) return 'g';
  if (is('溪母')) return 'k';
  if (is('羣母')) return 'k';
  if (is('疑母')) return 'ng';

  if (is('曉母')) {
    if (is('合口')) return 'f';
    if (is('三四等')) return 'x';
    return 'h';
  }
  if (is('匣母')) {
    if (is('合口 或 東模韻')) return 'f';
    if (is('開口 四等')) return 'x';
    return 'h';
  }
  if (is('影母')) {
    if (is('合口')) return 'v';
    if (is('三四等')) return 'rh';
    return '';
  }
  if (is('云母')) {
    if (is('東韻')) return 'x';
    if (is('支脂之微唐陽韻 或 魚虞模韻 平聲')) return 'v';
    return 'rh';
  }
  if (is('以母')) {
    if (is('支脂之微韻 合口')) return 'v';
    return 'rh';
  }

  throw new Error('無聲母規則');
}

function 韻母規則(白讀) {
  // 通攝
  if (is('東冬鍾韻')) {
    if (is('三等 精莊見影組')) return 'iung';
    if (is('孃來日母')) return 'iung';
    return 'ung';
  }

  // 江攝
  if (is('江韻')) {
    if (is('莊組')) return 'ung';
    return 'ong';
  }

  // 止攝
  if (is('支脂韻 幫組')) return 'i'; // 例外：美費，ui
  if (is('微韻 幫組')) return 'ui';
  if (is('支脂之微韻 開口')) {
    if (is('孃母')) return 'i';
    if (is('知精莊章組')) return 'ii'; // 除孃母，例外：知姊死四，i
    if (is('影云以母')) return 'ii';
    return 'i';
  }
  if (is('支脂之微韻 合口')) return 'ui'; // 例外：炊吹衰睡，oi

  // 遇攝
  if (is('虞韻 幫組')) return 'u';
  if (is('魚虞韻 孃來日曉母')) return 'i';
  if (is('魚虞韻 知章組')) return 'u'; // 除孃母
  if (is('魚虞韻 精見組')) return 'i';
  if (is('魚虞韻 莊組')) return 'ii';
  if (is('魚虞韻 影云以母')) return 'ii';
  if (is('模韻')) return 'u'; // 例外：蜈梧吾吳午五伍，零韻母

  // 蟹攝
  if (is('齊祭韻 幫組')) return 'i';
  if (is('齊韻 開口')) {
    if (is('影組')) return 'i';
    return 白讀 ? 'ei' : 'i'; // 例外：梯，oi
  } else if (is('齊韻 合口')) {
    return 'ui';
  }
  if (is('祭韻 開口')) {
    if (is('知章組')) return 'ii';
    return 'i';
  } else if (is('祭韻 合口')) {
    if (is('精莊組')) return 白讀 ? 'ioi' : 'ei';
    return 白讀 ? 'oi' : 'ui';
  }
  if (is('泰韻 幫組')) return 'ui';
  if (is('泰韻 開口')) {
    if (is('見影組')) return 'oi';
    return 'ai';
  } else if (is('泰韻 合口')) {
    if (is('見組')) return 'uai';
    return 'ui';
  }
  if (is('佳韻 幫組')) return 'ai';
  if (is('佳韻 開口')) {
    if (is('影組')) return 'ei';
    return 'ai';
  } else if (is('佳韻 合口')) {
    if (is('見組')) return 'ua';
    if (is('影組')) return 'a';
  }
  if (is('皆夬韻 幫組')) return 'ai';
  if (is('皆夬韻 開口')) {
    return 'ai';
  } else if (is('皆夬韻 合口')) {
    if (is('見組')) return 'uai';
    if (is('影組')) return 白讀 ? 'oi' : 'ai';
  }
  if (is('咍韻')) return 白讀 ? 'oi' : 'ai';
  if (is('灰廢韻')) return 白讀 ? 'oi' : 'ui';

  // 臻攝
  if (is('眞韻 見組')) return 白讀 ? 'iun' : 'in';
  if (is('眞韻 幫組')) return 白讀 ? 'en' : 'in';
  if (is('眞韻 開口')) {
    if (is('日母')) return 白讀 ? 'iun' : 'in';
    return 'in';
  } else if (is('眞韻 合口')) {
    if (is('來母')) return 白讀 ? 'iun' : 'in';
    return 'un';
  }
  if (is('臻韻')) return 'en';
  if (is('文韻')) {
    if (is('見組')) return 'iun';
    if (is('曉母')) return 'iun';
    return 'un';
  }
  if (is('欣韻')) {
    if (is('見組')) return 'iun';
    if (is('影組')) return 'in';
  }
  if (is('魂韻')) return 'un';
  if (is('痕韻')) {
    if (is('端組')) return 'un';
    return 'en';
  }

  // 山攝
  if (is('寒韻 幫組')) return 'an';
  if (is('寒韻 開口')) {
    if (is('見影組')) return 'on';
    return 'an'; // 例外：餐，on
  } else if (is('寒韻 合口')) {
    if (is('見組')) return 'uan';
    if (is('影組')) return 'an';
    return 'on';
  }
  if (is('刪山韻 幫組')) return 'an'; // 例外：慢，een；八捌，eed
  if (is('刪山韻 開口')) {
    if (is('見組')) return 'ien';
    if (is('影組')) return 'een';
    return 'an';
  } else if (is('刪山韻 合口')) {
    if (is('見組')) return 'uan';
    if (is('影組')) return 'an';
    return 'on';
  }
  if (is('仙韻 幫組')) return 'ien';
  if (is('仙韻 開口')) {
    if (is('知章組')) return 'een';
    if (is('影云以母')) return 'een';
    return 'ien';
  } else if (is('仙韻 合口')) {
    if (is('知章組')) return 'on';
    if (is('見組')) return 'ien';
    if (is('影云以母')) return 'een';
    if (is('精莊組 入聲')) return 'ied';
    return 'ion';
  }
  if (is('先韻 幫組')) return 白讀 ? 'een' : 'ien';
  if (is('先韻 開口')) {
    if (is('端組')) return 'een';
    if (is('來影母')) return 'een';
    return 'ien';
  } else if (is('先韻 合口')) {
    if (is('影母')) return 'een';
    return 'ien';
  }
  if (is('元韻')) {
    if (is('幫組')) return 'an'; // 例外：飯，on
    if (is('影云母')) return 'een'; // 例外：冤園遠，ien
    return 'ien';
  }

  // 效攝
  if (is('豪韻')) return 'ou'; // 例外：熬靠考袍，au
  if (is('肴韻')) return 'au';
  if (is('宵韻')) {
    if (is('知章影組')) return 'au';
    if (is('以母')) return 'au';
    return 'iau';
  }
  if (is('蕭韻')) {
    if (is('端組')) return 'eeu';
    if (is('來影母')) return 'eeu';
    return 'iau';
  }

  // 果攝
  if (is('歌韻 一等')) return 'ou';
  if (is('歌韻 三等')) return 'iau';

  // 假攝
  if (is('麻韻 幫組')) return 'a';
  if (is('麻韻 二等 開口')) return 'a';
  if (is('麻韻 二等 合口')) {
    if (is('影組')) return 'a';
    return 'ua';
  }
  if (is('麻韻 三等')) {
    if (is('知章組')) return 'a';
    if (is('以母')) return 'a';
    return 'ia';
  }

  // 宕攝
  if (is('唐韻 幫組')) return 'ong';
  if (is('唐韻 開口')) return 'ong';
  if (is('唐韻 合口 見組')) return 'uong';
  if (is('唐韻 合口 影組')) return 'ong';
  if (is('陽韻 幫組')) return 白讀 ? 'iong' : 'ong';
  if (is('陽韻 開口')) {
    if (is('知莊章組')) return 'ong';
    if (is('影以母')) return 'ong';
    return 'iong';
  } else if (is('陽韻 合口')) {
    if (is('見組')) return 'uong';
    if (is('影組')) return 'ong';
  }

  // 梗攝
  if (is('庚韻 二等 幫組')) return 白讀 ? 'ang' : 'en';
  if (is('庚韻 二等 開口')) return 白讀 ? 'ang' : 'en';
  if (is('庚韻 二等 合口')) {
    if (is('影組')) return 白讀 ? 'ang' : 'en';
    return 白讀 ? 'uang' : 'uen';
  }
  if (is('庚韻 三等 幫組')) return 白讀 ? 'iang' : 'in'; // 例外：盟，en
  if (is('庚韻 三等 開口')) {
    if (is('影母')) return 白讀 ? 'ang' : 'in';
    return 白讀 ? 'iang' : 'in'; // 例外：省，en
  }
  if (is('庚韻 三等 合口')) {
    if (is('曉母')) return 'iung';
    if (is('云母')) return 白讀 ? 'ung' : 'un';
    return 白讀 ? 'iung' : 'in';
  }
  if (is('耕韻')) return 白讀 ? 'ang' : 'en'; // 例外：拼莖，in
  if (is('清韻')) {
    if (is('知章組')) return 白讀 ? 'ang' : 'in';
    if (is('影以母')) return 白讀 ? 'ang' : 'in';
    return 白讀 ? 'iang' : 'in'; // 例外：碧，ed
  }
  if (is('青韻 幫組')) return 'in';
  if (is('青韻 精組')) return 白讀 ? 'iang' : 'in';
  if (is('青韻 端見組 舒聲')) return 'en';
  if (is('青韻 端見組 入聲')) return 'id';
  if (is('青韻 來母 舒聲')) return 'en';
  if (is('青韻 來母 入聲')) return 'id';
  if (is('青韻 影組')) return 'in';

  // 曾攝
  if (is('蒸韻')) {
    if (is('莊組')) return 'en';
    return 'in';
  }
  if (is('登韻')) return 'en'; // 例外：國，ued

  // 流攝
  if (is('侯韻')) return 'eu';
  if (is('尤幽韻')) return 'iu';

  // 深攝
  if (is('侵韻')) {
    if (is('莊組')) return 'em';
    return 'im';
  }

  // 咸攝
  if (is('覃談咸銜凡韻')) return 'am'; // 例外：鹹，eem；減，iam；夾插，iab
  if (is('鹽嚴韻')) {
    if (is('孃母')) return 'eem';
    if (is('知章組')) return 'am'; // 除孃母
    if (is('影云以母')) return 'am';
    return 'iam'; // 例外：驗，eem
  }
  if (is('添韻')) {
    if (is('端組')) return 'eem';
    if (is('來影母')) return 'eem';
    return 'iam';
  }

  throw new Error('無韻母規則');
}

function 聲調規則(白讀) {
  if (is('平聲')) return is('全清 或 次清') ? '1' : '2';
  if (is('上聲') && 白讀) return is('次濁 或 全濁') ? '1' : '3';
  if (is('上聲') && !白讀) return is('全清 或 次清 或 次濁') ? '3' : '5';
  if (is('去聲')) return '5';
  if (is('入聲')) return is('全清 或 次清') ? '7' : '8';

  throw new Error('無聲調規則');
}

function 聲母處理(聲母, 韻母) {
  // 無聲母時自動補全 v
  if (聲母 === '' && 韻母.startsWith('u')) 聲母 = 'v';
  // 日母後接洪音爲 rh
  if (is('日母') && !韻母.startsWith('i')) 聲母 = 'rh';
  return 聲母;
}

function 韻母處理(韻母) {
  // m 韻尾在聲母爲脣音時爲 n
  if (is('幫組') && 韻母.endsWith('m')) 韻母 = 韻母.slice(0, -1) + 'n';
  // 替換入聲韻尾
  if (is('入聲')) {
    if (韻母.endsWith('m')) 韻母 = 韻母.slice(0, -1) + 'b';
    else if (韻母.endsWith('n')) 韻母 = 韻母.slice(0, -1) + 'd';
    else if (韻母.endsWith('ng')) 韻母 = 韻母.slice(0, -2) + 'g';
  }
  return 韻母;
}

// 依選項分別推導
let 白讀音, 文讀音 = null;

function 根據規則推導讀音(白讀) {
  let 讀音 = {
    韻母: '',
    聲母: '',
    聲調: ''
  };
  讀音.韻母 = 韻母處理(韻母規則(白讀));
  讀音.聲母 = 聲母處理(聲母規則(白讀), 讀音.韻母);
  讀音.聲調 = 聲調規則(白讀);
  return 讀音;
}

if (選項.文白讀 === '僅白讀') {
  白讀音 = 根據規則推導讀音(true);
} else if (選項.文白讀 === '僅文讀') {
  文讀音 = 根據規則推導讀音(false);
} else if (選項.文白讀 === '文上白下') {
  白讀音 = 根據規則推導讀音(true);
  文讀音 = 根據規則推導讀音(false);
}

// K++ 轉 IPA
function 客拼轉IPA(讀音){
  const 轉換結果 = {
    韻母: '',
    聲母: '',
    聲調: ''
  };
  const 輔音韻尾正則匹配 = `(n[ng]?|[mbdgh])$`;
  const 首元音正則匹配 = `^(ii|i|u|[aeo][reo]?)`;
  const 轉換聲母 = {
    'm': 'm', 'n': 'n', 'ng': 'ŋ',
    'b': 'p', 'd': 't', 'g': 'k',
    'p': 'pʰ', 't': 'tʰ', 'k': 'kʰ', 
    's': 's', 'sh': 'ʃ', 'x': 'ɕ',
    'z': 'ts', 'zh': 'tʃ',
    'c': 'tsʰ', 'ch': 'tʃʰ',
    'rh': 'ʒ',
    'f': 'f', 'h': 'h', 'v': 'v',
    'l': 'l', '': ''
  };
  const 轉換元音 = {
    'i': 'i', 'ii': 'ɨ', 'u': 'u',
    'oo': 'o',
    'er': 'ə',
    'e': 'ɛ', 'o': 'ɔ',
    'ee': 'æ',
    'a': 'a',
    'm': 'm̩', 'ng': 'ŋ̍'
  };
  const 轉換輔音韻尾 = {
    'm': 'm', 'n': 'n', 'ng': 'ŋ',
    'b': 'p', 'd': 't', 'g': 'k'
  };
  // 提取輔音韻尾
  let 輔音韻尾 = 讀音.韻母.match(輔音韻尾正則匹配) === null ? 
                '' :
                讀音.韻母.match(輔音韻尾正則匹配)[0];
  // 提取元音們
  let 元音們 = 輔音韻尾 !== '' ? 讀音.韻母.slice(0, -輔音韻尾.length) : 讀音.韻母;
  // 預先處理：按韻尾分別處理 u、o 元音
  if (輔音韻尾 === 'ng' || 輔音韻尾 === 'g') {
    if (元音們 === 'u') {
      元音們 = 'oo';
    } else if (元音們 === 'iu') {
      元音們 = 'ioo';
    }
  }
  if (元音們 === 'ou') {
    元音們 = 'oou';
  }
  // 將元音們逐個轉換
  let 轉換後的元音們 = [];
  while (元音們.length !== 0) {
    let 當前元音 = 元音們.match(首元音正則匹配)[0];
    轉換後的元音們.push(轉換元音[當前元音]);
    元音們 = 元音們.slice(當前元音.length);
  }
  轉換後的元音們 = 轉換後的元音們.join('');
  // 轉換韻尾
  轉換後的輔音韻尾 = 轉換輔音韻尾[輔音韻尾];
  // 善後處理：按聲母分別處理舌尖韻母
  if (轉換後的元音們 === 'ɨ') {
    if (讀音.聲母 === 'z' || 讀音.聲母 === 'c' || 讀音.聲母 === 's') {
      轉換後的元音們 = 'ɿ';
    } else {
      轉換後的元音們 = 'ʅ';
    }
  }
  // 將結果拼合成韻母
  轉換結果.韻母 = 轉換後的元音們 + (輔音韻尾 !== '' ? 轉換後的輔音韻尾 : '');
  // 轉換聲母
  轉換結果.聲母 = 轉換聲母[讀音.聲母];
  // 轉換聲調
  轉換結果.聲調 = 讀音.聲調;

  return 轉換結果;
}

if (選項.音標 === '國際音標 (IPA)') {
  白讀音 = 白讀音 ? 客拼轉IPA(白讀音) : null;
  文讀音 = 文讀音 ? 客拼轉IPA(文讀音) : null;
}

// 轉換標調方式
function 轉換標調方式(讀音, 標調方式){
  const 轉換結果 = 讀音;
  const 轉換爲符號調號 = {
    '1': 'ˊ',
    '2': 'ˇ',
    '3': '^',
    '5': 'ˋ',
    '7': '^',
    '8': 'ˋ'
  };
  const 轉換爲數字調值 = {
    '1': '⁴⁵',
    '2': '²²⁴',
    '3': '³¹',
    '5': '⁵¹',
    '7': '³²',
    '8': '⁵'
  };
  const 轉換爲折線調值 = {
    '1': '˦˥',
    '2': '˨˨˦',
    '3': '˧˩',
    '5': '˥˩',
    '7': '˧˨',
    '8': '˥'
  };
  if (標調方式 === '符號調號') {
    轉換結果.聲調 = 轉換爲符號調號[讀音.聲調];
  } else if (標調方式 === '數字調值') {
    轉換結果.聲調 = 轉換爲數字調值[讀音.聲調];
  } else if (標調方式 === '折線調值') {
    轉換結果.聲調 = 轉換爲折線調值[讀音.聲調];
  }

  return 轉換結果;
}

if (
    選項.標調方式 === '符號調號' ||
    選項.標調方式 === '數字調值' ||
    選項.標調方式 === '折線調值'
  ) {
  白讀音 = 轉換標調方式(白讀音, 選項.標調方式);
  文讀音 = 轉換標調方式(文讀音, 選項.標調方式);
}

// 返回結果
const 白讀音結果 = 白讀音 ? 白讀音.聲母 + 白讀音.韻母 + 白讀音.聲調 : null;
const 文讀音結果 = 文讀音 ? 文讀音.聲母 + 文讀音.韻母 + 文讀音.聲調 : null;
let 結果 = null;

if (選項.文白讀 === '僅白讀') {
  結果 = 白讀音結果;
} else if (選項.文白讀 === '僅文讀') {
  結果 = 文讀音結果;
} else if (選項.文白讀 === '文上白下') {
  if (文讀音結果 === 白讀音結果) {
    結果 = 文讀音結果;
  } else {
    結果 = 文讀音結果 + '\n' + 白讀音結果;
  }
}

return 結果;
