const stylelint = require("stylelint");
const { configBasedir } = require("./setup");

const config = {
  plugins: ["./src"],
  rules: {
    "plugin/rule2": true,
  },
};

test("no !important declarations", async () => {
  const result = await stylelint.lint({
    code: "a { color: red !important; }",
    config,
    configBasedir,
  });
  const warnings = result.results[0].warnings;
  expect(warnings).toHaveLength(1);
  expect(warnings[0].text).toBe("Expected no !important declarations. (plugin/rule2)");
});
