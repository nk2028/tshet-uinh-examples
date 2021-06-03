import re

print("import Qieyun from 'qieyun';")
print()


def handle_file(filename):
    with open(f'{filename}.js') as f:
        match = re.fullmatch(r'^/\* (.+?)\*/(.+)', f.read(), flags=re.DOTALL)

        name, comment = match[1].split('\n', 1)
        code = match[2]

        comment = comment.rstrip()
        code = code.strip()

        print('/**')
        print(' * ' + name)
        print(comment)
        print(' * @param {Qieyun.音韻地位} 音韻地位 切韻音系音韻地位')
        print(' * @param {string} 字頭 字頭')
        print(' * @param {Object} 選項 選項')
        print(' * @return {string} 音韻地位對應的' + name)
        print(' */')
        print('export function ' + filename + '(音韻地位, 字頭, 選項) {')
        print(code)
        print('}')
        print()


def main():
    with open('README.md') as f:
        for match in re.finditer(r'`([a-z0-9_]+)\.js`', f.read()):
            filename = match[1]
            handle_file(filename)


if __name__ == '__main__':
    main()
