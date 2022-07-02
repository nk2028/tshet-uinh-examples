import re

print('''import Qieyun from 'qieyun';

const schemas = {};

/**
 * 查詢字頭的擬音。
 * @param {string | string[]} schema 推導方案或推導方案陣列
 * @param {string} 字頭 要查詢的字頭
 * @param {Object=} 選項 選項（可選）
 * @return {{音韻地位: Qieyun.音韻地位, 解釋: string, 擬音: string | string[]}[]} 音韻地位、解釋、音韻地位對應的擬音或擬音陣列
 */
export function from字頭(schema, 字頭, 選項) {
  return Qieyun.資料.query字頭(字頭).map(result => ({
    ...result,
    擬音: schema.map
      ? schema.map(schema => schemas[schema](result.音韻地位, result.字頭, 選項))
      : schemas[schema](result.音韻地位, result.字頭, 選項),
  }));
}''')


def handle_file(filename):
    with open(f'{filename}.js') as f:
        match = re.fullmatch(r'^/\* (.+?)\*/(.+)', f.read(), flags=re.DOTALL)

        name, comment = match[1].split('\n', 1)
        code = match[2]

        comment = comment.rstrip()
        code = code.strip()

        print()
        print(
            f'schemas.{filename} = Qieyun.推導方案.建立(function (音韻地位, 字頭, 選項) {{')
        print(code)
        print(f'}});')
        print()
        print('/**')
        print(' * ' + name)
        print(comment)
        print(' * @param {Qieyun.音韻地位} 音韻地位 切韻音系音韻地位')
        print(' * @param {string=} 字頭 字頭（可選）')
        print(' * @param {Object=} 選項 選項（可選）')
        print(' * @return {string} 音韻地位對應的' + name)
        print(' */')
        print(f'export function {filename}(音韻地位, 字頭, 選項) {{')
        print(f'  return schemas.{filename}(音韻地位, 字頭, 選項);')
        print(f'}}')


def main():
    with open('README.md') as f:
        for match in re.finditer(r'`([a-z0-9_]+)\.js`', f.read()):
            filename = match[1]
            handle_file(filename)


if __name__ == '__main__':
    main()
