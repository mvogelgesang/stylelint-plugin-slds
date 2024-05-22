const stylelint = require("stylelint");

const ruleName = "stylelint-plugin-slds/no-sds-custom-properties";
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: (prop) => `Unexpected "--sds custom property" within selector "${prop}". Replace with "slds" equivalent. See https://github.com/mvogelgesang/stylelint-plugin-slds/#no-sds-custom-properties.`,
});

const rule = (primaryOption) => {
  return (root, result) => {
    root.walkDecls((decl) => {
      if (decl.prop.startsWith("--sds-")) {
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
