# Stylelint Plugin - SLDS

A [Stylelint] plugin to help teams identify antipatterns and deprecated practices in LWC stylesheets. Plugin is an implementation of many of the rules found in [SLDS Architecture Update](https://help.salesforce.com/s/articleView?id=001622574&type=1) (released April 2024).

- [Stylelint Plugin - SLDS](#stylelint-plugin---slds)
  - [Installation](#installation)
    - [Configuration](#configuration)
    - [Run](#run)
  - [Rules](#rules)
    - [No LWC Custom Properties](#no-lwc-custom-properties)
    - [No SDS Custom Properties](#no-sds-custom-properties)
    - [No SLDS Class Overrides](#no-slds-class-overrides)

## Installation

`npm i --save-dev stylelint @mvogelgesang/stylelint-plugin-slds`

### Configuration

Add a `.stylelintrc.json` file to your project root directory.

Update with the following:

```json

  {
    "plugins": ["@mvogelgesang/stylelint-plugin-slds"],
    "rules": {
      "stylelint-plugin-slds/no-lwc-custom-properties":true, 
      "stylelint-plugin-slds/no-sds-custom-properties": true,
      "stylelint-plugin-slds/no-slds-class-overrides": true
    }
  }
```

### Run

Update package.json to include a new `stylelint` command. This can also be chained with other linting checks.

```json
{
  "scripts": {
    "stylelint": "stylelint --config .stylelintrc.json force-app/main/default/lwc/**/*.css",
  },
}
```

## Rules

### No LWC Custom Properties

[https://help.salesforce.com/s/articleView?id=001622574&type=1](https://help.salesforce.com/s/articleView?id=001622574&type=1)

### No SDS Custom Properties

[https://help.salesforce.com/s/articleView?id=001622574&type=1](https://help.salesforce.com/s/articleView?id=001622574&type=1)

### No SLDS Class Overrides

[https://developer.salesforce.com/docs/platform/lwc/guide/create-components-css-antipatterns.html#anti-pattern-overriding-slds-classes](https://developer.salesforce.com/docs/platform/lwc/guide/create-components-css-antipatterns.html#anti-pattern-overriding-slds-classes)
