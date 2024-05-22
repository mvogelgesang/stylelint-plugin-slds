const stylelint = require("stylelint");

const ruleName = "plugin/rule1";
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: (prop) => `Expected "${prop}" to be a specific value.`,
});

const rule = (primaryOption) => {
  return (root, result) => {
    root.walkDecls((decl) => {
      if (decl.prop === "color" && decl.value !== primaryOption) {
        stylelint.utils.report({
          message: messages.expected(decl.prop),
          node: decl,
          result,
          ruleName,
        });
      }
    });
  };
};

module.exports = stylelint.createPlugin(ruleName, rule);
