const stylelint = require("stylelint");

const ruleName = "stylelint-plugin-slds/no-lwc-custom-properties";
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: (prop) => `Unexpected "--lwc custom property" within selector "${prop}". Replace with "slds" or "dxp" equivalents.`,
});

const rule = (primaryOption) => {
  return (root, result) => {
    root.walkDecls((decl) => {
      if (decl.prop.startsWith("--lwc-")) {
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
