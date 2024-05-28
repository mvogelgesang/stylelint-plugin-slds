# Stylelint Plugin - SLDS

A [Stylelint](https://stylelint.io/) plugin to help teams identify antipatterns and deprecated practices in LWC stylesheets. Plugin is an implementation of many of the rules found in [SLDS Architecture Update](https://help.salesforce.com/s/articleView?id=001622574&type=1) (released April 2024).

Linting for HTML files is provided by the [Salesforce Extension Pack (Expanded)](https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode-expanded) for VSCode which helps identify outdated classes and their replacements.

- [Stylelint Plugin - SLDS](#stylelint-plugin---slds)
  - [Installation](#installation)
    - [Configuration](#configuration)
    - [Run](#run)
    - [Additional Considerations](#additional-considerations)
  - [Rules](#rules)
    - [No LWC Custom Properties](#no-lwc-custom-properties)
      - [Example - LWC Custom Property Override](#example---lwc-custom-property-override)
    - [No SDS Custom Properties](#no-sds-custom-properties)
      - [Example - SDS Custom Property Override](#example---sds-custom-property-override)
    - [No SLDS Class Overrides](#no-slds-class-overrides)
      - [Example - LWC Component with SLDS Class Override](#example---lwc-component-with-slds-class-override)
      - [Example - Div with SLDS Classes](#example---div-with-slds-classes)

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

### Additional Considerations

You can enable additional Stylelint rule that come with the base Stylelint package. Some of these rules may conflict with Salesforce Lightning Design System patterns and practices and would not necessarily indicate that an anti-pattern is being used.

## Rules

### No LWC Custom Properties

> **Use of --lwc custom properties.** In the Summer ’24 release, the --lwc custom properties still work in Lightning pages and Experience Cloud sites.
>
> - However, in Lightning pages, we strongly encourage you to replace --lwc custom properties during the Summer ’24 release with --slds styling hooks to avoid regressions when they’re removed in a future release.
>
> - In Experience Cloud LWR sites, when referencing  --lwc custom properties, we strongly encourage you to replace them with --dxp,  --slds-c, or --slds-g-color styling hooks. If you’re setting --lwc custom properties, you don’t need to take any action at this time. See  –dxp Styling Hooks.

[Reference](https://help.salesforce.com/s/articleView?id=001622574&type=1)

#### Example - LWC Custom Property Override

<details>
<summary>Before</summary>

```css
:host {
  --lwc-fontSize3: 2rem;
}
```

```html
<lightning-card title="Hello" >
  <p class="slds-var-p-horizontal_small">The footer on this card has had a CSS override applied using the lwc custom property rather than slds.</p>
  <p slot="footer">Card Footer</p>
</lightning-card>
```

</details>

<details>
<summary>After</summary>

```css

:host {
  --slds-c-card-footer-font-size: 3rem;
}
```

```html
<lightning-card title="Hello" >
  <p class="slds-var-p-horizontal_small">The footer on this card now uses the slds custom property as a replacement for lwc.</p>
  <p slot="footer">Card Footer</p>
</lightning-card>
```

</details>

### No SDS Custom Properties

> **Use of unsupported --sds- styling hooks.** Styling hooks were introduced as a beta feature in Winter ’21, using the --sds- namespace as described in the release note [Customize Components with Lightning Design System Styling Hooks (Beta)](http://sfdc.co/stylehooks-beta). In Spring ’22 styling hooks became generally available, with the namespace changed to –-slds- as described in the release note [Customize Components with Lightning Design System Styling Hooks (Generally Available)](http://sfdc.co/stylehooks-ga).

[Reference](https://help.salesforce.com/s/articleView?id=001622574&type=1)

#### Example - SDS Custom Property Override

In this example, the component referenced legacy `--sds-` custom properties. Custom property references should be updated to their `--slds-` equivalents. [https://www.lightningdesignsystem.com/platforms/lightning/styling-hooks/#Styling-Hooks-What-Are-Styling-Hooks](https://www.lightningdesignsystem.com/platforms/lightning/styling-hooks/#Styling-Hooks-What-Are-Styling-Hooks)

<details>
<summary>Before</summary>

```css
:host {
  --sds-c-button-brand-color-background: #BB00FF;
  --sds-c-button-brand-color-background-hover: #8700B8;
  --sds-c-button-brand-color-border: #BB00FF;
  --sds-c-button-brand-color-border-hover: #8700B8;
}
```

```html
<lightning-button
  variant="brand"
  label="Overridden Styles"
  title="Looks like a link"
></lightning-button>
```

</details>

<details>
<summary>After</summary>

```css

:host {
  --slds-c-button-brand-color-background: #BB00FF;
  --slds-c-button-brand-color-background-hover: #8700B8;
  --slds-c-button-brand-color-border: #BB00FF;
  --slds-c-button-brand-color-border-hover,: #8700B8;
}
```

```html
<lightning-button
  variant="brand"
  label="Overridden Styles"
  title="Looks like a link"
></lightning-button>
```

</details>

### No SLDS Class Overrides

[Anti-Patterns for Component Styling](https://developer.salesforce.com/docs/platform/lwc/guide/create-components-css-antipatterns.html#anti-pattern-overriding-slds-classes)

#### Example - LWC Component with SLDS Class Override

In this example, an inherent class is having a value overwritten within the stylesheet by changing the background color to green. The **risk** with this example is that Salesforce may remove or change the name of the `.slds-card` class which would break the background color customization. The best way to accomplish the same result is to update the `--slds-c-card-color-background` css custom property.
<details>
<summary>Before</summary>

```css
.slds-card {
  background-color: green;
}
```

```html
<lightning-card>
  <h1 slot="title">My Card</h1>
  <p>I am the body</p>
  <div slot="footer">
    <p>I am the footer</p>
  </div>
</lightning-card>
```
</details>

<details>
<summary>After</summary>

```css
:host {
  --slds-c-card-color-background: green;
}
```

```html
<lightning-card>
  <h1 slot="title">My Card</h1>
  <p>I am the body</p>
  <div slot="footer">
    <p>I am the footer</p>
  </div>
```
</details>

#### Example - Div with SLDS Classes

Here, a div is implementing properties from the `slds-panel__footer` class and the `background` property was overridden with the value of the `--slds-g-color-neutral-base-95` custom property. While the **risk** is small when compared to the prior example, adding an additional class makes the background color change more explicit within the HTML.

<details>
<summary>Before</summary>

```css
.slds-panel__footer {
  background: var(--slds-g-color-neutral-base-95, #f3f3f3);
}
```

```html
<div class="slds-panel__footer" >
    <slot name="footer" onslotchange={handleFooterSlotChange}></slot>
</div>
```
</details>

<details>
<summary>After</summary>

```css
.custom-background {
  background: var(--slds-g-color-neutral-base-95, #f3f3f3);
}
```

```html
<div class="slds-panel__footer custom-background" >
    <slot name="footer" onslotchange={handleFooterSlotChange}></slot>
</div>
```

</details>