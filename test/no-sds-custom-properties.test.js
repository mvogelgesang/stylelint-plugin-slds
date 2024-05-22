const stylelint = require("stylelint");
const { configBasedir } = require("./setup");

const config = {
  plugins: ["./src"],
  rules: {
    "stylelint-plugin-slds/no-sds-custom-properties": true,
  },
};

test("no sds custom properties declarations", async () => {
  const result = await stylelint.lint({
    code: ":root { --sds-c-button-color-background: #0b5cab; }",
    config,
    configBasedir,
  });
  const warnings = result.results[0].warnings;
  expect(warnings).toHaveLength(1);
  expect(warnings[0].text).toBe(`Unexpected "--sds custom property" within selector "--sds-c-button-color-background". Replace with "slds" equivalent. See https://github.com/mvogelgesang/stylelint-plugin-slds/#no-sds-custom-properties. (stylelint-plugin-slds/no-sds-custom-properties)`);
});
