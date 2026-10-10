---
layout: doc
title: $addModalSelect[]
translation_key: docs
category: "Components & Interactions"
function_name: addModalSelect
syntax: $addModalSelect[type;label;description;customId;(placeholder);(minValues);(maxValues);(required);(disabled)]
description: Adds a select menu (Components V2) to the modal being built. Options are added with $addSelectMenuOption[] for the "string" type.
---

# $addModalSelect[] — Modal Select Menu

`$addModalSelect[]` adds a select menu to the modal being built with `$newModal[]`. For a `string` menu, options are added afterwards with `$addSelectMenuOption[]`.

## Syntax

```
$addModalSelect[type;label;description;customId;(placeholder);(minValues);(maxValues);(required);(disabled)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `type` | Yes | — | Menu type, as read by the component parser: `string`, `user`, `role`, `mentionable`, `channel`, `category` or `voice`. |
| `label` | Yes | — | Text displayed above the menu. |
| `description` | Yes | — | Description under the label. May be left empty (`;;`). |
| `customId` | Yes | — | Identifier of the menu; also used as the first argument of `$addSelectMenuOption[]`. |
| `placeholder` | No | empty | Placeholder text. |
| `minValues` | No | `1` | Minimum number of selections (integer from 0 to 25). |
| `maxValues` | No | `1` | Maximum number of selections (integer from 1 to 25). |
| `required` | No | `yes` | `yes`/`true` or `no`/`false`. |
| `disabled` | No | `no` | `yes`/`true` or `no`/`false`. |

## Return value

Returns an empty string. The menu is added to the current modal; its value is read with `$input[customId]`.

## Errors

- Without a prior `$newModal[]`, the engine creates a default modal (ID `modal`, title `Modal`) to receive the input.
- `required`/`disabled` values other than yes/no/true/false and out-of-range numbers are errors.
- When the modal is sent, it must contain 1 to 5 inputs (text displays count as inputs).

## Examples

### Dropdown menu with options

```bdfd
$newModal[pref_modal;Preferences]
$addModalSelect[string;Language;;language;Choose your language...;1;1;yes]
$addSelectMenuOption[language;French;fr;French language]
$addSelectMenuOption[language;English;en;English language]
$addSelectMenuOption[language;Spanish;es;Spanish language]
```

### Optional menu

```bdfd
$newModal[survey_modal;Survey]
$addModalTextDisplay[Bonus question (optional):]
$addModalSelect[string;Operating system;;os;Select your OS;1;1;no]
$addSelectMenuOption[os;Windows;win;]
$addSelectMenuOption[os;macOS;mac;]
$addSelectMenuOption[os;Linux;linux;]
```

## Notes

- `$addSelectMenuOption[]` needs at least 4 arguments (`menuId;label;value;description`, the description may be empty); the first one is the `customId` of the menu.
- Only `string` menus accept options (otherwise: "Only string selects take options.").
- A select menu supports at most 25 options.
- `$newModal[]` takes the modal ID first, then its title.
