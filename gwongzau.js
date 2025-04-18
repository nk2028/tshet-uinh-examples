/* 推導廣州話
 *
 * https://ayaka.shn.hk/teoi/
 *
 * @author Ayaka
 */

/** @type { 音韻地位['屬於'] } */
const is = (...x) => 音韻地位.屬於(...x);
/** @type { 音韻地位['判斷'] } */
const when = (...x) => 音韻地位.判斷(...x);

if (!音韻地位) return [];

if (is`云母 通攝 舒聲`) 音韻地位 = 音韻地位.調整('匣母', ['匣母三等']);

function 聲母規則() {
  return when([
    ['幫滂並母 C類', 'f'],
    ['幫母 或 並母 仄聲', 'b'],
    ['滂母 或 並母 平聲', 'p'],
    ['明母', 'm'],

    ['端母 或 定母 仄聲', 'd'],
    ['透母 或 定母 平聲', 't'],
    ['泥孃母', 'n'],
    ['來母', 'l'],

    ['精莊知章母 或 從崇俟邪澄母 仄聲', 'z'], // 精莊組濁音塞擦音多於擦音（下同）
    ['清初徹昌母 或 從崇俟邪澄母 平聲', 'c'],
    ['心生常書船母', 's'], // 章組濁音擦音多於塞擦音

    ['見母 或 羣母 仄聲', 'g'],
    ['羣母 平聲', 'k'],
    ['疑母', 'ng'], // 細音為 j，詳後

    ['溪曉母', 'h'], // 溪母多數擦化；三四等拼 a 元音部分韻母時為 j/w，詳後
    ['匣母', [
      ['合口 或 (遇攝 一等)', 'j'], // 拼展脣或後元音時為 w，詳後
      ['', 'h'],
    ]],
    ['影云以日母', [
      ['三四等', 'j'], // 拼展脣或後元音時為 w，詳後
      ['', ''],
    ]],
  ], '無聲母規則');
}

function 韻母規則() {
  return when([
    ['通攝', 'ung'],

    ['止攝', [
      ['脣音', 'ei'],
      ['開口 (端組 或 孃來母 或 見溪羣曉母)', 'ei'],
      ['開口', 'i'],
      ['合口 舌齒音', 'eoi'],
      ['合口 牙喉音', 'ai'],
    ]],

    ['遇攝', [
      ['三四等', [
        ['幫滂並母', 'u'],
        ['明母', 'ou'],
        ['莊組', 'o'],
        ['端精組 或 孃來母 或 見溪羣曉母', 'eoi'],
        ['', 'yu'],
      ]],
      ['一等', [
        ['脣音 或 舌齒音', 'ou'],
        ['疑母', ''],
        ['牙喉音', 'u'],
      ]],
    ]],

    ['蟹攝', [
      ['廢韻 平上聲 章組', 'oi'], // 參照「茝」coi2
      ['合口 銳音', 'eoi'], // 含以母
      ['三四等', 'ai'],
      ['二等 或 泰韻 開口 (端組 或 來母)', 'aai'],
      ['一等', [
        ['開口 或 疑母', 'oi'],
        ['', 'ui'],
      ]],
    ]],

    ['臻攝', [
      ['三四等', [
        ['合口 舌齒音', 'eon'],
        ['', 'an'],
      ]],
      ['一等', [
        ['脣音', 'un'],
        ['合口 (端組 或 來母)', 'eon'],
        ['合口 精組', 'yun'],
        ['', 'an'],
      ]],
    ]],

    ['山攝', [
      ['二等 或 脣音 C類', 'aan'],
      ['三四等', [
        ['開口 或 脣音', 'in'],
        ['合口', 'yun'],
      ]],
      ['一等', [
        ['開口 舌齒音', 'aan'],
        ['開口 牙喉音', 'on'],
        ['合口 舌齒音', 'yun'],
        ['合口 牙喉音 或 脣音', 'un'],
      ]],
    ]],

    ['效攝', [
      ['三四等', 'iu'],
      ['二等', 'aau'],
      ['一等', 'ou'],
    ]],

    ['果假攝', [
      ['三四等', [
        ['脣音 C類', 'o'],
        ['開口 或 脣音', 'e'],
        ['合口', 'oe'],
      ]],
      ['二等', 'aa'],
      ['一等', 'o'],
    ]],

    ['宕江攝', [
      ['三四等', [
        ['脣音 C類 或 開口 莊組 或 合口', 'ong'],
        ['', 'oeng'],
      ]],
      ['二等 舌齒音', 'oeng'],
      ['一二等', 'ong'],
    ]],

    ['梗曾攝', [
      ['一二等 或 梗攝 莊組', [ // 文 ang、白 aang，兩者勢均，推導音依文讀
        ['庚韻 二等 (來母 或 端組)', 'aang'], // 唯來母「冷」向無 lang 音例，故例外，端組亦從之
        ['', 'ang'],
      ]],
      ['三四等', 'ing'],
    ]],

    ['流攝', [
      ['四等 端組 或 幽韻 幫滂並母', 'iu'], // 「丟」「彪」「淲」
      ['', 'au'],
    ]],

    ['深攝', 'am'], // -m 拼脣音時為 -n，詳後，下同

    ['咸攝', [
      ['二等 或 脣音 C類', 'aam'],
      ['三四等', 'im'],
      ['一等 脣舌齒音', 'aam'], // 脣音僅僻字，如「姏」maan4
      ['一等 牙喉音', 'om'], // -om 併入 -am，但影響陰入分化，詳後
    ]],
  ], '無韻母規則');
}

function 聲調規則() {
  return when([
    ['清音', [
      ['平聲', '1'],
      ['上聲', '2'],
      ['去入聲', '3'], // 中入於短元音為 1（陰入），詳後
    ]],
    ['濁音', [
      ['平聲', '4'],
      ['上聲 次濁', '5'],
      ['上聲 全濁 或 去入聲', '6'],
    ]]
  ], '無聲調規則');
}

function is短元音(韻母) {
  if (['am', 'an', 'ang', 'eon', 'ing', 'ung'].includes(韻母)) return true;
  if (['aam', 'aan', 'im', 'in', 'om', 'on', 'ong', 'oeng', 'un', 'yun'].includes(韻母)) return false;
  throw new Error('無長短元音規則：' + 韻母);
}

let 聲母 = 聲母規則();
let 韻母 = 韻母規則();
let 聲調 = 聲調規則();

// ng 拼細音時為 j
const is細音 = ['eo', 'i', 'oe', 'u', 'yu'].some(x => 韻母.startsWith(x));
if (聲母 === 'ng' && is細音) 聲母 = 'j';

// 三四等清調 h 拼 a 元音部分韻母時為 j/w
if (聲母 === 'h' && ['au', 'an', 'am'].includes(韻母) && is`清音 三四等 非 (臻攝 開口 入聲) 非 (臻攝 合口 舒聲)`) {
  聲母 = 'j';
}

// 陰入分化
if (is`入聲` && 聲調 === '3' && is短元音(韻母)) 聲調 = '1';

// 合口
if (is`合口 或 模韻` && !['eo', 'oe', 'yu'].some(x => 韻母.startsWith(x))) {
  if ((聲母 === 'g' || 聲母 === 'k') && !韻母.startsWith('u')) 聲母 += 'w';
  else if (聲母 === 'h' && !韻母.startsWith('i')) 聲母 = 'f';
  else if (聲母 === 'j' || 聲母 === '') 聲母 = 'w';
}

// -om 併入 -am
if (韻母 === 'om') 韻母 = 'am';

// m 韻尾在聲母為脣音時為 n
if (is`脣音` && 韻母.endsWith('m')) 韻母 = 韻母.slice(0, -1) + 'n';

if (is`入聲`) {
  if (韻母.endsWith('m')) 韻母 = 韻母.slice(0, -1) + 'p';
  else if (韻母.endsWith('n')) 韻母 = 韻母.slice(0, -1) + 't';
  else if (韻母.endsWith('ng')) 韻母 = 韻母.slice(0, -2) + 'k';
}

return 聲母 + 韻母 + 聲調;
