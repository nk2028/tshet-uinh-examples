import re


HEADER = """\
import TshetUinh from 'tshet-uinh';
import { 推導方案 } from 'tshet-uinh-deriver-tools';

const _schemata = {};

/**
 * 查詢字頭的擬音。
 * @param {string | string[]} schema 推導方案或推導方案陣列
 * @param {string} 字頭 要查詢的字頭
 * @param {Object=} 選項 選項（可選）
 * - 若 schema 為 string（單個方案），則該引數為其選項
 * - 若 schema 為列表（多個方案），則該引數為物件，屬性名為方案名，值為相應方案的選項
 * @return {(TshetUinh.資料.字頭檢索結果 & {推導結果: string | string[]})[]} 由字頭檢索到的各條目及相應推導結果
 */
export function from字頭(schema, 字頭, 選項) {
  return TshetUinh.資料.query字頭(字頭).map(條目 => ({
    ...條目,
    推導結果: schema.map
      ? schema.map(schema => _schemata[schema](選項?.[schema])(條目.音韻地位, 條目.字頭))
      : _schemata[schema](選項)(條目.音韻地位, 條目.字頭),
  }));
}"""


FILE_TEMPLATE = """\
/**
 * {title}
{comment}
 * @type {{推導方案<string>}}
 */
export const {id} = new 推導方案(function (選項, 音韻地位, 字頭) {{
{code}
}});

_schemata.{id} = {id};"""


def handle_file(filename):
    with open(f'{filename}.js') as f:
        match = re.fullmatch(r'^\s*/\* (.+?)\*/(.+)', f.read(), flags=re.DOTALL)

        name, comment = match[1].split('\n', 1)
        code = match[2]

        comment = comment.rstrip()
        code = code.strip()

        print()
        print(FILE_TEMPLATE.format(id=filename, title=name, code=code, comment=comment))


def main():
    print(HEADER)
    with open('README.md') as f:
        for match in re.finditer(r'`([a-z0-9_]+)\.js`', f.read()):
            filename = match[1]
            handle_file(filename)


if __name__ == '__main__':
    main()
