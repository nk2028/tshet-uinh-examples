/* 音韻地位
 *
 * @author unt
 */

const sextupleKeys = ['母', '呼', '等', '類', '韻', '聲'];
if (選項._六元組全選) sextupleKeys.forEach(k => 選項[k] = true);
if (選項._六元組全不選) sextupleKeys.forEach(k => 選項[k] = false);
const keys = Object.keys(選項).filter(k => !k.startsWith('_'));
const checkedKeys = keys.filter(k => 選項[k]);
const checkedSextupleKeys = checkedKeys.filter(k => sextupleKeys.includes(k));

if (!音韻地位) return [
  '整體',
  ['描述|音韻地位描述', true],
  ['簡略描述|音韻地位簡略描述\n不推薦', false],
  '單項',
  ['母|聲母', false],
  ['呼', false],
  ['等\n切韻等', false],
  ['類', false],
  ['韻|韻系\n平賅上去入', false],
  ['聲|聲調', false],
  ['_六元組全選|六項全選', false, { hidden: checkedSextupleKeys.length === 6, reset: true }],
  ['_六元組全不選|六項全不選', false, { hidden: checkedSextupleKeys.length === 0, reset: true }],
  '更多',
  ['組|聲母組', false],
  ['音|五音', false],
  ['清濁', false],
  ['韻別|韻母陰陽入', false],
  // ['表達式|音韻地位表達式', false],
  '對應韻圖音系屬性',
  ['字母|三十六字母', false],
  ['韻圖等', false],
  ['攝', false],
  '',
  ['_分隔符|多個屬性間的連接符', ',', { hidden: checkedKeys.length < 2 }],
];

return checkedKeys.map(k => 音韻地位[k]).join(選項._分隔符);
