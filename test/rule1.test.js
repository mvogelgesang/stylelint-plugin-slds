const stylelint = require("stylelint");
const { configBasedir } = require("./setup");
const plugin =require("./../src/");
const config = {
  plugins: [plugin],
  rules: {
    "stylelint-plugin-slds/rule1": [true],
  },
};

test("color should be expected-value", async () => {
  const result = await stylelint.lint({
    code: "a { color: unexpected-value; }",
    config,
    configBasedir,
  });
  const warnings = result.results[0].warnings;
  expect(warnings).toHaveLength(1);
  expect(warnings[0].text).toBe('Expected "color" to be a specific value. (stylelint-plugin-slds/rule1)');
});
