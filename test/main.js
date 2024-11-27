import util from 'node:util';

import { 資料, 音韻地位 } from 'tshet-uinh';
import * as TshetUinhExamples from '../index.js';

const 地位 = 音韻地位.from描述('書開三宵上');

const testCases = [
  ['tupa', 'sjiewq'],
  ['baxter', 'syewX'],
  ['karlgren', 'ɕi̯ɛu꞉'],
  ['wangli', '꜂ɕĭɛu'],
  ['panwuyun', 'ɕiᴇu˧˥'],
  ['unt', 'ɕéw'],
  ['msoeg_v8', 'ɕiɛuʔ'],
  ['mid_tang', 'ɕɛ́w'],
  ['n_song', 'ɕjɛ́w'],
  ['mongol', 'ꡮꡠꡓ'],
  ['zhongyuan', 'ʂjɛw³'],
  // ['fanwan', 'shiu2'],
  ['putonghua', 'shǎo'],
  ['gwongzau', 'siu2'],
  ['zaonhe', 'sɔ̄'],
  ['langjin', 'shǎo'],
  ['ayaka_v8', 'seu'],
  ['yec_en_hua', 'A'],
];

let passed = 0;
let total = 0;
for (const [schema, expected] of testCases) {
  console.log(`Testing: ${schema}`);
  total++;
  try {
    const deriver = TshetUinhExamples[schema]();
    Array.from(資料.iter音韻地位(), deriver); // Ensure no error is thrown from all 音韻地位
    const result = deriver(地位);
    if (result === expected) {
      passed += 1;
    } else {
      console.log(
        `  Expected ${util.inspect(expected)}, got ${util.inspect(result)}`
      );
    }
  } catch (e) {
    console.log(`  Error thrown: ${util.inspect(e)}`);
  }
}

console.log(`${passed}/${total} test(s) passed.`);
process.exit(passed === total ? 0 : 1);
