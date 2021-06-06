import re

print('''import Qieyun from 'qieyun';

const schemas = {};

function perform(input, 音韻地位, 字頭, 選項) {
  音韻地位 = 音韻地位 instanceof Qieyun.音韻地位 ? 音韻地位 : null;
  字頭 = typeof 字頭 === 'string' ? 字頭 : null;
  選項 = typeof 選項 === 'object' ? 選項 : {};
  try {
    const 選項模板 = input(null, null, null);
    選項模板.forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (!(選項 && key in 選項 && value.slice(1).includes(選項[key])))
          選項[key] =
            value[
              typeof value[0] === 'number' &&
              value[0] >= 1 &&
              value[0] < value.length
                ? value[0]
                : +!value.slice(1).includes(value[0])
            ];
      } else {
        if (!(選項 && key in 選項 && typeof 選項[key] === typeof value))
          選項[key] = value;
      }
    });
  } catch (err) {
    選項 = {};
  }
  return input(音韻地位, 字頭, 選項);
}

/**
 * 查詢字頭的擬音。
 * @param {string} schema 推導方案
 * @param {string} 字頭 要查詢的字頭
 * @param {Object=} 選項 選項（可選）
 * @return {{音韻地位: Qieyun.音韻地位, 解釋: string, 擬音: string}[]} 音韻地位、解釋、音韻地位對應的擬音
 *//**
 * 查詢字頭的擬音。
 * @param {string[]} schema 推導方案陣列
 * @param {string} 字頭 要查詢的字頭
 * @param {Object=} 選項 選項（可選）
 * @return {{音韻地位: Qieyun.音韻地位, 解釋: string, 擬音: string[]}[]} 音韻地位、解釋、音韻地位對應的擬音陣列
 */
export function from字頭(schema, 字頭, 選項) {
  Qieyun.query字頭(字頭).map(result => ({
    ...result,
    擬音: schema.map
      ? schema.map(schema => perform(schemas[schema], result.音韻地位, result.字頭, 選項))
      : perform(schemas[schema], result.音韻地位, result.字頭, 選項),
  }));
}
''')


def handle_file(filename):
    with open(f'{filename}.js') as f:
        match = re.fullmatch(r'^/\* (.+?)\*/(.+)', f.read(), flags=re.DOTALL)

        name, comment = match[1].split('\n', 1)
        code = match[2]

        comment = comment.rstrip()
        code = code.strip()

        print(f'schemas.{filename} = function (音韻地位, 字頭, 選項) {{')
        print(code)
        print(f'}};')
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
        print(f'  return perform(schemas.{filename}, 音韻地位, 字頭, 選項);')
        print(f'}}')
        print()


def main():
    with open('README.md') as f:
        for match in re.finditer(r'`([a-z0-9_]+)\.js`', f.read()):
            filename = match[1]
            handle_file(filename)


if __name__ == '__main__':
    main()
