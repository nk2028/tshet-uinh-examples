import stylisticJs from '@stylistic/eslint-plugin-js';

export default [
  {
    languageOptions: {
      sourceType: 'script',
      globals: {
        TshetUinh: 'readonly',
        音韻地位: 'writable',
        字頭: 'writable',
        選項: 'readonly',
        require: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          globalReturn: true,
          impliedStrict: true,
        },
      },
    },
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    rules: {
      'no-constant-binary-expression': 'error',
      'no-debugger': 'error',
      'no-dupe-class-members': 'error',
      'no-dupe-else-if': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-self-assign': 'error',
      'no-self-compare': 'error',
      'no-setter-return': 'error',
      'no-undef': 'error',
      'no-unexpected-multiline': 'error',
      'no-unreachable': 'error',
      'no-unreachable-loop': 'error',
      'no-unused-private-class-members': 'error',
      'no-unused-vars': ['error', { varsIgnorePattern: '^(is|when)$' }],
      'no-useless-assignment': 'error',
      'no-useless-backreference': 'error',
      'default-case-last': 'error',
      'eqeqeq': 'error',
      'grouped-accessor-pairs': 'error',
      'logical-assignment-operators': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-empty-function': 'error',
      'no-empty-static-block': 'error',
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-extra-boolean-cast': 'error',
      'no-extra-label': 'error',
      'no-global-assign': 'error',
      'no-label-var': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-object-constructor': 'error',
      'no-sequences': 'error',
      'no-shadow': 'error',
      'no-shadow-restricted-names': 'error',
      'no-throw-literal': 'error',
      'no-undefined': 'error',
      'no-unneeded-ternary': 'error',
      'no-unused-expressions': 'error',
      'no-unused-labels': 'error',
      'no-useless-call': 'error',
      'no-useless-catch': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-concat': 'error',
      'no-useless-constructor': 'error',
      'no-useless-escape': 'error',
      'no-useless-return': 'error',
      'no-var': 'error',
      'no-void': 'error',
      'object-shorthand': 'error',
      'operator-assignment': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-exponentiation-operator': 'error',
      'prefer-numeric-literals': 'error',
      'prefer-object-has-own': 'error',
      'prefer-object-spread': 'error',
      'prefer-regex-literals': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'strict': ['error', 'never'],
      'symbol-description': 'error',

      '@stylistic/js/array-bracket-spacing': 'error',
      '@stylistic/js/arrow-parens': ['error', 'as-needed'],
      '@stylistic/js/arrow-spacing': 'error',
      '@stylistic/js/block-spacing': 'error',
      '@stylistic/js/comma-spacing': 'error',
      '@stylistic/js/comma-style': 'error',
      '@stylistic/js/computed-property-spacing': 'error',
      '@stylistic/js/dot-location': ['error', 'property'],
      '@stylistic/js/eol-last': 'error',
      '@stylistic/js/function-call-spacing': 'error',
      '@stylistic/js/generator-star-spacing': ['error', 'after'],
      '@stylistic/js/indent': ['error', 2, { SwitchCase: 1, ArrayExpression: 'off', ObjectExpression: 'off' }],
      '@stylistic/js/key-spacing': 'error',
      '@stylistic/js/keyword-spacing': 'error',
      '@stylistic/js/new-parens': 'error',
      '@stylistic/js/no-extra-semi': 'error',
      '@stylistic/js/no-floating-decimal': 'error',
      '@stylistic/js/no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
      '@stylistic/js/no-tabs': 'error',
      '@stylistic/js/no-trailing-spaces': 'error',
      '@stylistic/js/no-whitespace-before-property': 'error',
      '@stylistic/js/object-curly-spacing': ['error', 'always'],
      '@stylistic/js/operator-linebreak': ['error', 'after'],
      '@stylistic/js/padded-blocks': ['error', 'never'],
      '@stylistic/js/quote-props': ['error', 'consistent'],
      '@stylistic/js/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/js/rest-spread-spacing': 'error',
      '@stylistic/js/semi': 'error',
      '@stylistic/js/semi-spacing': 'error',
      '@stylistic/js/semi-style': 'error',
      '@stylistic/js/space-before-blocks': 'error',
      '@stylistic/js/space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
      '@stylistic/js/space-in-parens': 'error',
      '@stylistic/js/space-infix-ops': 'error',
      '@stylistic/js/space-unary-ops': 'error',
      '@stylistic/js/spaced-comment': 'error',
      '@stylistic/js/switch-colon-spacing': 'error',
      '@stylistic/js/template-curly-spacing': 'error',
      '@stylistic/js/template-tag-spacing': 'error',
      '@stylistic/js/yield-star-spacing': 'error',
    },
  },
  {
    files: ['eslint.config.js', '*/**/*.js'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        TshetUinh: 'off',
        音韻地位: 'off',
        字頭: 'off',
        選項: 'off',
        require: 'off',
        console: 'readonly',
        process: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {},
      },
    },
  },
];
