const stylelint = require("stylelint");

const ruleName = "stylelint-plugin-slds/rule2";
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: "Expected no !important declarations.",
});

const rule = () => {
  return (root, result) => {
    root.walkDecls((decl) => {
      if (decl.important) {
        stylelint.utils.report({
          message: messages.expected,
          node: decl,
          result,
          ruleName,
        });
      }
    });
  };
};

module.exports = stylelint.createPlugin(ruleName, rule);
