export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce using tagged template with the `is` function',
    },
    fixable: 'code',
    schema: [],
  },
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.name === 'is') {
          const arg = node.arguments[0];
          if (arg && (arg.type === 'TemplateLiteral' || (arg.type === 'Literal' && typeof arg.value === 'string'))) {
            context.report({
              node,
              message: 'Use tagged template with the `is` function.',
              fix(fixer) {
                if (arg.type === 'TemplateLiteral') {
                  return fixer.replaceText(node, `is${context.getSourceCode().getText(arg)}`);
                }
                if (arg.type === 'Literal' && typeof arg.value === 'string') {
                  return fixer.replaceText(node, `is\`${
                    arg.raw.slice(1, -1).replace(/\\(('|")|.)|`|\$\{/g, (match, escaped, quote) => quote || `\\${escaped || match}`)
                  }\``);
                }
                return null;
              },
            });
          }
        }
      },
    };
  },
};
