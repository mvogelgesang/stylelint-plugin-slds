const stylelint = require("stylelint");
const { configBasedir } = require("./setup");

const config = {
  plugins: ["./src"],
  rules: {
    "stylelint-plugin-slds/no-slds-class-overrides": true,
  },
};

test("no slds class overrides", async () => {
  const result = await stylelint.lint({
    code: ".slds-button { color: red; }",
    config,
    configBasedir,
  });

  const warnings = result.results[0].warnings;
  expect(warnings).toHaveLength(1);
  expect(warnings[0].text).toBe(`Overriding slds-* classes found within selector ".slds-button". This practice is discouraged and can have unintended consequences in later releases. 
  
  If the rule was over-zealous in this instance, you can turn off the rule for this line by adding /* stylelint-disable no-slds-class-overrides */ above the selector. (stylelint-plugin-slds/no-slds-class-overrides)`);
});
