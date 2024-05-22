const stylelint = require("stylelint");
const { configBasedir } = require("./setup");

const config = {
  plugins: ["./src"],
  rules: {
    "stylelint-plugin-slds/no-lwc-custom-properties": true,
  },
};

test("no lwc custom properties declarations", async () => {
  const result = await stylelint.lint({
    code: ":root { --lwc-c-button-color-background: #0b5cab; }",
    config,
    configBasedir,
  });
  const warnings = result.results[0].warnings;
  expect(warnings).toHaveLength(1);
  expect(warnings[0].text).toBe(`Unexpected "--lwc custom property" within selector "--lwc-c-button-color-background". Replace with "slds" or "dxp" equivalents. (stylelint-plugin-slds/no-lwc-custom-properties)`);
});
