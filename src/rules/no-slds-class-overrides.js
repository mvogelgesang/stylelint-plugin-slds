const stylelint = require("stylelint");

const ruleName = "stylelint-plugin-slds/no-slds-class-overrides";
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: (prop) => `Overriding slds-* classes found within selector "${prop}". This practice is discouraged and can have unintended consequences in later releases. 
  
  If the rule was over-zealous in this instance, you can turn off the rule for this line by adding /* stylelint-disable no-slds-class-overrides */ above the selector.`,
});

const rule = (primaryOption) => {
  return (root, result) => {
    root.walkRules((rule) => {
      if (rule.selector.startsWith(".slds-")) {
        stylelint.utils.report({
          message: messages.expected(rule.selector),
          line: rule.source.start.line,
          result,
          ruleName,
        });
      }
    });
  };
};

module.exports = stylelint.createPlugin(ruleName, rule);
