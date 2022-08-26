import re

# TODO `from字頭` should not use a single 選項 for all schemata.
# Instead it should allow options set for each schema.

HEADER = '''\
import Qieyun from 'qieyun';
import { 推導方案 } from 'tshet-uinh-deriver-tools';

const _schemata = {};
const _defaultDerivers = {};

/**
 * 查詢字頭的擬音。
 * @param {string | string[]} schema 推導方案或推導方案陣列
 * @param {string} 字頭 要查詢的字頭
 * @param {Object=} 選項 選項（可選）
 * @return {(Qieyun.資料.字頭檢索結果 & {擬音: string | string[]})[]} 音韻地位、解釋、音韻地位對應的擬音或擬音陣列
 */
export function from字頭(schema, 字頭, 選項) {
  return Qieyun.資料.query字頭(字頭).map(result => ({
    ...result,
    擬音: schema.map
      ? schema.map(schema => _schemata[schema](選項)(result.音韻地位, result.字頭))
      : _schemata[schema](選項)(result.音韻地位, result.字頭),
  }));
}

function _perform(name, derive, 地位, 字頭, 選項) {
  if (選項 != null) {
    throw new Error(`Specifying 選項 directly is no longer supported, use ${name}.schema(選項)(地位, 字頭?) instead`);
  }
  return derive(地位, 字頭);
}'''


FILE_TEMPLATE = '''\
_schemata.{id} = new 推導方案(function (選項, 音韻地位, 字頭) {{
{code}
}});

_defaultDerivers.{id} = _schemata.{id}();

/**
 * {title}
{comment}
 * @param {{Qieyun.音韻地位}} 音韻地位 切韻音系音韻地位
 * @param {{string=}} 字頭 字頭（可選）
 * @param {{undefined=}} 舊選項參數 已棄用，請用 `<方案名>.方案(選項)(音韻地位, 字頭?)` 代替
 * @return {{string}} 音韻地位對應的{title}
 * @property {{推導方案<string>}} schema 推導方案，可用於指定推導選項、獲取方案詳細資訊等
 */
export function {id}(音韻地位, 字頭, 舊選項參數) {{
  return _perform("{id}", _defaultDerivers.{id}, 音韻地位, 字頭, 舊選項參數);
}}
/** @type {{推導方案<string>}} */
{id}.schema = _schemata.{id}'''


def handle_file(filename):
    with open(f'{filename}.js') as f:
        match = re.fullmatch(r'^\s*/\* (.+?)\*/(.+)',
                             f.read(), flags=re.DOTALL)

        name, comment = match[1].split('\n', 1)
        code = match[2]

        comment = comment.rstrip()
        code = code.strip()

        print()
        print(FILE_TEMPLATE.format(id=filename,
              title=name, code=code, comment=comment))


def main():
    print(HEADER)
    with open('README.md') as f:
        for match in re.finditer(r'`([a-z0-9_]+)\.js`', f.read()):
            filename = match[1]
            handle_file(filename)


if __name__ == '__main__':
    main()
