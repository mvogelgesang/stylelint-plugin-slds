const rules = require("./rules");

// module.exports = {
//   rules: {
//     "plugin/rule1": rules.rule1.rule,
//     "plugin/rule2": rules.rule2.rule,
//   },
// };

module.exports = [
     rules.rule1,
     rules.rule2,
     rules.noLwcCustomProperties,
     rules.noSdsCustomProperties,
     rules.noSldsClassOverrides
];