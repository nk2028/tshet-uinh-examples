import { readdirSync } from 'node:fs';
import util from 'node:util';

import { 資料, 音韻地位 } from 'tshet-uinh';
import * as TshetUinhExamples from '../dist/index.js';

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
  ['ayaka_v8', 'seu'],
  ['yec_en_hua', 'A'],
];

const directorySchemata = new Set(readdirSync('.').flatMap(file => file !== (file = file.replace(/\.js$/, '')) && !file.endsWith('.config') ? [file] : []));
const nonExistentSchemata = new Set();

let passed = 0;
let total = 0;
for (const [schema, expected] of testCases) {
  if (!(schema in TshetUinhExamples)) {
    nonExistentSchemata.add(schema);
    continue;
  }

  console.log(`Testing: ${schema}`);
  total++;
  try {
    const deriver = TshetUinhExamples[schema]();
    Array.from(資料.iter音韻地位(), deriver); // Ensure no error is thrown from all 音韻地位
    const result = deriver(地位);
    if (result === expected) {
      passed++;
    } else {
      console.log(
        `  Expected ${util.inspect(expected)}, got ${util.inspect(result)}`
      );
    }
  } catch (e) {
    console.log(`  Error thrown: ${util.inspect(e)}`);
  }

  directorySchemata.delete(schema);
}

console.log(`${passed}/${total} tests passed.`);
if (directorySchemata.size || nonExistentSchemata.size || passed < total) {
  if (directorySchemata.size) console.log('The following schemata are untested:', directorySchemata);
  if (nonExistentSchemata.size) console.log('There are test cases for the following schemata but they are missing:', nonExistentSchemata);
  process.exit(1);
}
