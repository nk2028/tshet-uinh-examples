import { appendFileSync, existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';

writeFileSync('./dist/index.js', /* js */ `\
import TshetUinh from 'tshet-uinh';
import { 推導方案 } from 'tshet-uinh-deriver-tools';

export function from字頭(schema, 字頭, 選項) {
  return TshetUinh.資料.query字頭(字頭).map(條目 => {
    if (Array.isArray(schema)) (條目.推導結果 = schema.map((schema, i) => _schemata[schema](Array.isArray(選項) && 選項[i] || 選項?.[schema])(條目.音韻地位, 條目.字頭))).forEach((推導結果, i) => 條目.推導結果[schema[i]] = 推導結果);
    else 條目.推導結果 = _schemata[schema](選項)(條目.音韻地位, 條目.字頭);
    return 條目;
  });
}
`);

writeFileSync('./dist/index.d.ts', /* ts */`\
import TshetUinh from 'tshet-uinh';
import { 推導方案 } from 'tshet-uinh-deriver-tools';

type 推導選項 = Readonly<Record<string, unknown>> | undefined;
interface 字頭檢索及推導結果<T extends Schema | readonly Schema[]> extends TshetUinh.資料.檢索結果 {
  推導結果: T extends readonly Schema[] ? { -readonly [K in keyof T]: string } & { -readonly [K in T[number]]: string } : string;
}

/**
 * 查詢字頭的擬音。
 * @param schema - 推導方案或推導方案陣列
 * @param 字頭 - 要查詢的字頭
 * @param 選項 - 選項（可選）
 * - 若 \`schema\` 為字串（單個方案），則該引數為其選項
 * - 若 \`schema\` 為字串列表（多個方案），則該引數亦為列表，元素為相應方案的選項
 * @return 由字頭檢索到的各條目及相應推導結果
 * - 若 \`schema\` 為字串，傳回結果中的 \`推導結果\` 屬性為字串
 * - 若 \`schema\` 為字串列表，傳回結果中的 \`推導結果\` 屬性亦為字串列表
 */
export function from字頭<const T extends Schema | readonly Schema[]>(
  schema: T,
  字頭: string,
  選項?: T extends readonly Schema[] ? { readonly [K in keyof T]?: 推導選項 } | { readonly [K in T[number]]?: 推導選項 } : 推導選項,
): 字頭檢索及推導結果<T>[];
`);

const directoryFiles = new Set(readdirSync('.').filter(file => file.endsWith('.js') && !file.endsWith('.config.js')));
const nonExistentFiles = new Set();

const readmeContent = readFileSync('README.md', 'utf-8');
const files = readmeContent.matchAll(/`(([a-z0-9_]+)\.js)`/g);
const schemata = [];

for (const [, file, schema] of files) {
  if (!existsSync(file)) {
    nonExistentFiles.add(file);
    continue;
  }

  const content = readFileSync(file, 'utf-8');
  const [, description, code] = content.match(/^\/\*(.+?)\*\/(.+)$/s);

  appendFileSync('./dist/index.js', /* js */ `
export const ${schema} = new 推導方案(function (選項, 音韻地位, 字頭) {
${code.trim()}
});
`);

  appendFileSync('./dist/index.d.ts', /* ts */ `
/**
 * ${description.trim()}
 */
export const ${schema}: 推導方案<string>;
`);

  schemata.push(schema);
  directoryFiles.delete(file);
}

appendFileSync('./dist/index.js', /* js */ `
const _schemata = { ${schemata.join(', ')} };
`);

appendFileSync('./dist/index.d.ts', /* ts */ `
type Schema = '${schemata.join("' | '")}';
`);

if (directoryFiles.size || nonExistentFiles.size) {
  if (directoryFiles.size) console.error('The following files are missing from README.md:', directoryFiles);
  if (nonExistentFiles.size) console.error('The following files are listed in README.md but do not exist:', nonExistentFiles);
  process.exit(1);
}
