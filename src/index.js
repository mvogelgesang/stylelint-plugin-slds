const rules = require("./rules");

module.exports = [
     rules.noLwcCustomProperties,
     rules.noSdsCustomProperties,
     rules.noSldsClassOverrides
];